import React, { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  StyleSheet,
  Alert,
  Dimensions,
  Keyboard,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import stylesHistorial from "../styles/stylesHistorial";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import stylesMain from "../styles/stylesMain";
import {
  Divider,
  TextInput,
  TouchableRipple,
  Searchbar,
  Button,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL, MAPS_API } from "@env";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { SelectList } from "react-native-dropdown-select-list";

const { width, height } = Dimensions.get("window");

const PerfilFisio = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [userID, setUserID] = useState<string | null>(null);
  const [userRol, setUserRol] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [modalContraseña, setModalContraseña] = useState(false);
  const [modalPago, setModalPago] = useState(false);
  const [ModalMaps, setModalMaps] = useState(false);
  const [email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [tel, setTel] = useState("");
  const [consultorio, setConsultorio] = useState("");
  const [numCard, setNumCard] = useState("");
  const [expCard, setExpCard] = useState("");
  const [CVC, setCVC] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [ModalLogout, setModalLogout] = useState(false);
  const [authCode, setAuthCode] = useState(["", "", "", "", ""]);
  const [modalAuth, setModalAuth] = useState(false);
  const inputRefs = useRef<any[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [showConfirmRequirements, setShowConfirmRequirements] = useState(false);
  const [ShowRequirements, setShowRequirements] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const map = useRef<MapView | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [initialLat, setInitialLat] = useState<number | undefined>(undefined);
  const [initialLng, setInitialLng] = useState<number | undefined>(undefined);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setInitialLat(location.coords.latitude);
      setInitialLng(location.coords.longitude);
    })();
  }, []);

  useEffect(() => {

  })

  const data = [
    { key: "1", value: "15 minutos" },
    { key: "2", value: "30 minutos" },
    { key: "3", value: "1 hora" },
    { key: "4", value: "Personalizada" },
  ];

  // console.log("Latitud: ", initialLat);
  // console.log("Longitud: ", initialLng);

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const INITIAL_POSITION =
    initialLat && initialLng
      ? {
          latitude: initialLat,
          longitude: initialLng,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }
      : undefined;

  const requirements = [
    {
      label: "Debe contener entre 8 a 16 caracteres.",
      isValid: password.length >= 8 && password.length <= 16,
    },
    {
      label: "Debe contener mínimo 1 minúscula.",
      isValid: /[a-z]/.test(password),
    },
    {
      label: "Debe contener mínimo 1 mayúscula.",
      isValid: /[A-Z]/.test(password),
    },
    { label: "Debe contener mínimo 1 número.", isValid: /\d/.test(password) },
  ];

  const confirmRequirements = [
    {
      label: "¡Las contraseñas no coinciden!",
      isValid: confirmPassword === password,
    },
  ];

  const handleAuthCodeChange = (index: number, value: string) => {
    const newAuthCode = [...authCode];
    newAuthCode[index] = value;
    setAuthCode(newAuthCode);

    if (value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const verifyAuthCode = async () => {
    const enteredCode = authCode.join("");
    const response = await axios.post(
      `${BACKEND_URL}/verificar-codigo-recuperacion`,
      {
        codigo: enteredCode,
        destinatario: email,
      }
    );

    if (response.data.code === 404) {
      Alert.alert(
        "Error",
        "Error al verificar el código de autenticación, reenvíe el correo de verificación"
      );
      return false;
    }
    if (response.data.code === 403) {
      Alert.alert(
        "Error",
        "El código de autenticación ha expirado, reenvíe el correo de verificación"
      );
      return false;
    }
    if (response.data.code === 401) {
      Alert.alert("Error", "Código de autenticación incorrecto");
      return false;
    }
    if (response.data.code === 200) {
      setModalAuth(false);
      setAuthCode(["", "", "", "", ""]);
      openModalContraseña();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const reSendEmail = async () => {
    const response = await axios.post(
      `${BACKEND_URL}/enviar-correo-recuperacion`,
      {
        destinatario: email,
      }
    );

    if (response.data.code === 500) {
      Alert.alert("Error", "No se pudo enviar el correo de verificación");
      return false;
    }

    setIsButtonDisabled(true);
    setTimeLeft(60);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current!);
          setIsButtonDisabled(false);
          return 60;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const sendEmail = async () => {
    const response = await axios.post(
      `${BACKEND_URL}/enviar-correo-recuperacion`,
      {
        destinatario: email,
      }
    );

    if (response.data.code === 500) {
      Alert.alert("Error", "No se pudo enviar el correo de verificación");
      return false;
    }
    if (response.data.code === 404) {
      Alert.alert("Error", "Correo no registrado");
      return false;
    }

    setIsButtonDisabled(true);
    setTimeLeft(60);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current!);
          setIsButtonDisabled(false);
          return 60;
        }
        return prevTime - 1;
      });
    }, 1000);

    setModalAuth(true);
  };

  const getUserID = async () => {
    const id = await AsyncStorage.getItem("idSesion");
    const rol = (await AsyncStorage.getItem("tipoUsuario")) || "";
    setUserID(id);
    setUserRol(rol);
  };

  const takeInfo = async () => {
    if (userID) {
      const response = await axios.get(
        `${BACKEND_URL}/obtener-info-usuario/${userID}/${userRol}`
      );

      if (response.data.code === 500) {
        console.log("Error en la petición");
        return;
      }

      return response.data;
    }
  };

  const fetchData = async () => {
    const datosDelServidor = await takeInfo();
    if (datosDelServidor) {
      setName(datosDelServidor.fisioterapeuta.nombre);
      setApellido(datosDelServidor.fisioterapeuta.apellido);
      setEmail(datosDelServidor.fisioterapeuta.correo);
      setTel(datosDelServidor.fisioterapeuta.telefono);
      setConsultorio(datosDelServidor.fisioterapeuta.location);
      setTime(datosDelServidor.fisioterapeuta.tiempoConsulta);
      setImage(await AsyncStorage.getItem("photoPerfil"));
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserID();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      if (userID && userRol) {
        fetchData();
      }
    }, [userID, userRol])
  );

  const toggleLogout = () => {
    setModalLogout(!ModalLogout);
  };

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate("login");
  };

  const openModalPago = () => setModalPago(true);
  const closeModalPago = () => setModalPago(false);

  const changePago = () => {
    console.log("Datos de pago: ", numCard, expCard, CVC);
    closeModalPago();
  };

  const openModalContraseña = () => setModalContraseña(true);
  const closeModalContraseña = () => setModalContraseña(false);

  const changeContraseña = async () => {
    const response = await axios.post(`${BACKEND_URL}/recuperar-password`, {
      email: email,
      password: password,
      tipoUsuario: userRol,
    });

    if (response.data.code === 404) {
      Alert.alert("Error", "No se encontró el usuario");
      return false;
    }
    if (response.data.code === 500) {
      Alert.alert("Error", "Error al cambiar la contraseña");
      return false;
    }
    if (response.data.code === 201) {
      Alert.alert("Éxito", "Contraseña cambiada con éxito");
      closeModalContraseña();
      return false;
    }
  };

  const validatePassword = () => {
    return (
      password.length >= 8 &&
      password.length <= 16 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      password === confirmPassword
    );
  };

  const saveImage = async (photo: any) => {
    if (!photo) return;
    try {
      const formData = new FormData();
      const imageBlob = {
        uri: photo,
        type: "image/jpg", // o el tipo de imagen que sea
        name: "photo.jpg",
      } as any;

      formData.append("image", await imageBlob);
      formData.append("id", userID!);
      formData.append("userType", userRol);

      // Imprime el contenido de FormData para verificar
      console.log("FormData content:");
      console.log("image:", imageBlob);
      console.log("formData:", formData);

      const response = await axios.post(
        BACKEND_URL + "/actualizar-imagen-perfil",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Éxito Datos actualizados correctamente");
      console.log("Respuesta del servidor:", response.data);
      await AsyncStorage.setItem("photoPerfil", photo);
    } catch (error) {
      console.error(error);
      console.log(" Ocurrió un error al actualizar los datos");
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("result:", result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      saveImage(result.assets[0].uri);
    }
  };

  const SaveChanges = async () => {
    const response = await axios.post(BACKEND_URL + "/actualizar-usuario", {
      id: userID,
      userType: userRol,
      nombre: Name,
      apellido: apellido,
      phone: tel,
      location: consultorio,
      tiempoConsulta: time,
    });

    if (response.data.code === 500) {
      Alert.alert("Error", "Error al guardar los cambios");
      return false;
    }
    if (response.data.code === 404) {
      Alert.alert("Error", "No se encontró el usuario");
      return false;
    }
    if (response.data.code === 201) {
      Alert.alert("Éxito", "Cambios guardados con éxito");
      navigation.goBack();
      return true;
    }
  };

  {
    /* Modal para ubicacion */
  }
  const toggleMaps = () => {
    setModalMaps(!ModalMaps);
  };

  const searchPlaces = async () => {
    if (!searchQuery.trim().length) return;

    const googleApisUrl =
      "https://maps.googleapis.com/maps/api/place/textsearch/json";
    const input = searchQuery.trim();
    const location = `${initialLat}, ${initialLng} &radius=2`;
    const url = `${googleApisUrl}?query=${input}&location=${location}&key=${MAPS_API}`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      // console.log(json);
      if (json && json.results) {
        const coords: LatLng[] = [];
        for (const item of json.results) {
          // console.log(item);
          coords.push({
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
          });
        }
        setResults(json.results);
        console.log(results);
        if (coords.length) {
          map.current?.fitToCoordinates(coords, {
            edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
            animated: true,
          });
          Keyboard.dismiss();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveLocation = async () => {
    setConsultorio(selectedLocation ?? "");
    setSearchQuery("");
    console.log("Consultorio: ", selectedLocation);
    toggleMaps();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["rgba(44,189,191,0.8)", "transparent"]}
        style={styles.gradient}
      />
      <View
        style={[
          stylesHistorial.containerRegistro,
          { flex: 1, alignItems: "center", justifyContent: "center" },
        ]}
      >
        <ScrollView style={stylesHistorial.scrollViewRegistro}>
          <View
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#000",
                height: 50,
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              {"Editar perfil"}
            </Text>
          </View>

          <View
            style={{ marginTop: 5, marginBottom: 20, alignItems: "center" }}
          >
            <TouchableRipple
              style={{
                height: 150,
                width: 150,
                borderRadius: 200,
                overflow: "hidden",
              }}
              onPress={pickImage}
              borderless
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{
                    flex: 1,
                    width: 150,
                    height: 150,
                    borderRadius: 200,
                    alignSelf: "center",
                  }}
                />
              ) : (
                <Icon
                  name="user-circle"
                  size={150}
                  color="#000000"
                  style={{
                    width: 150,
                    height: 150,
                  }}
                />
              )}
            </TouchableRipple>
          </View>

          <View style={styles.infoContainer}>
            <TextInput
              mode="outlined"
              label="Nombre(s)"
              style={styles.input}
              value={Name}
              onChangeText={setName}
              outlineColor="#002245"
              activeOutlineColor="#002245"
              textColor="#002245"
              left={<TextInput.Icon style={{ marginTop: 10 }} icon="account" />}
            />

            <TextInput
              mode="outlined"
              label="Apellidos"
              style={styles.input}
              value={apellido}
              onChangeText={setApellido}
              outlineColor="#002245"
              activeOutlineColor="#002245"
              textColor="#002245"
              left={<TextInput.Icon style={{ marginTop: 10 }} icon="account" />}
            />

            <TextInput
              mode="outlined"
              label="Correo Electrónico"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              outlineColor="#002245"
              activeOutlineColor="#002245"
              disabled={true}
              left={<TextInput.Icon style={{ marginTop: 10 }} icon="email" />}
            />

            <TextInput
              mode="outlined"
              label="Teléfono"
              style={styles.input}
              value={tel}
              onChangeText={setTel}
              outlineColor="#002245"
              activeOutlineColor="#002245"
              keyboardType="numeric"
              maxLength={10}
              left={<TextInput.Icon style={{ marginTop: 10 }} icon="phone" />}
            />

            <TextInput
              mode="outlined"
              label="Consultorio"
              style={styles.input}
              value={consultorio}
              outlineColor="#002245"
              activeOutlineColor="#002245"
              readOnly={true}
              textAlign= "left"
              left={
                <TextInput.Icon style={{ marginTop: 10 }} icon="map-marker" />
              }
              right={
                <TextInput.Icon
                  style={{ marginTop: 14 }}
                  icon="border-color"
                  onPress={toggleMaps}
                />
              }
            />

          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={{ ...styles.btn, ...styles.btnSave }}
              onPress={SaveChanges}
            >
              <View>
                <Text
                  style={{
                    ...styles.buttonOptionText,
                    ...styles.textColorSave,
                  }}
                >
                  Guardar cambios
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ ...styles.btn, ...styles.btnChangePass }}
              onPress={sendEmail}
            >
              <View>
                <Text
                  style={{
                    ...styles.buttonOptionText,
                    ...styles.textColorChangePass,
                  }}
                >
                  Cambiar contraseña
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ ...styles.btn, ...styles.btnChangePayment }}
              onPress={openModalPago}
            >
              <Text
                style={{
                  ...styles.buttonOptionText,
                  ...styles.textColorChangePayment,
                }}
              >
                Cambiar método de pago
              </Text>
            </TouchableOpacity>

            <Divider style={{ marginTop: 20, marginBottom: 15 }} bold />

            <TouchableOpacity
              style={{ ...styles.btn, ...styles.btnChangePayment }}
              onPress={() => navigation.goBack()}
            >
              <Text
                style={{
                  ...styles.buttonOptionText,
                  ...styles.textColorChangePayment,
                }}
              >
                Volver
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ ...styles.btn, ...styles.btnLogout }}
              onPress={toggleLogout}
            >
              <Text
                style={{
                  ...styles.buttonOptionText,
                  ...styles.textColorLogout,
                }}
              >
                Cerrar Sesión
              </Text>
            </TouchableOpacity>
          </View>

          {/* Modal de autenticación */}
          <Modal
            visible={modalAuth}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalAuth(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Introduzca el código de autenticación
                </Text>
                <Text style={{ marginBottom: 20 }}>
                  Revisa tu correo, te hemos enviado un código de verificación
                </Text>
                <View style={styles.codeContainer}>
                  {authCode.map((code: string, index: number) => (
                    <TextInput
                      mode="outlined"
                      key={index}
                      value={code}
                      onChangeText={(value: string) =>
                        handleAuthCodeChange(index, value)
                      }
                      outlineColor="#c5cae9"
                      activeOutlineColor="#c5cae9"
                      style={styles.codeInput}
                      maxLength={1}
                      keyboardType="numeric"
                      ref={(ref: any) => (inputRefs.current[index] = ref)}
                    />
                  ))}
                </View>
                <TouchableOpacity
                  onPress={reSendEmail}
                  disabled={isButtonDisabled}
                >
                  <Text
                    style={
                      isButtonDisabled ? styles.disabledText : styles.resendText
                    }
                  >
                    {isButtonDisabled
                      ? `Reenviar código (${timeLeft}s)`
                      : "Reenviar código"}
                  </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={styles.btnCancelar}
                    onPress={() => setModalAuth(false)}
                  >
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={verifyAuthCode}
                  >
                    <Text style={styles.buttonText}>Ingresar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* Modal para cambiar contraseña */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalContraseña}
            onRequestClose={closeModalContraseña}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Cambiar contraseña</Text>
                <TextInput
                  mode="outlined"
                  label="Contraseña nueva"
                  style={stylesMain.TextInputPerfil}
                  value={confirmPassword}
                  onFocus={() => setShowRequirements(true)}
                  onBlur={() => setShowRequirements(false)}
                  onChangeText={setConfirmPassword}
                  outlineColor="#c5cae9"
                  activeOutlineColor="#c5cae9"
                />
                {ShowRequirements && (
                  <View style={{ marginVertical: 1 }}>
                    {requirements.map(
                      (req, index) =>
                        !req.isValid && (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                            key={index}
                          >
                            <View style={styles.dot} />
                            <Text
                              style={{
                                color: "#FF0000",
                                fontSize: 12,
                                fontWeight: "bold",
                                textShadowColor: "#000",
                                textShadowRadius: 10,
                              }}
                            >
                              {req.label}
                            </Text>
                          </View>
                        )
                    )}
                  </View>
                )}
                <TextInput
                  mode="outlined"
                  label="Confirmar contraseña"
                  style={stylesMain.TextInputPerfil}
                  value={password}
                  onFocus={() => setShowConfirmRequirements(true)}
                  onBlur={() => setShowConfirmRequirements(false)}
                  onChangeText={setPassword}
                  outlineColor="#c5cae9"
                  activeOutlineColor="#c5cae9"
                />
                {showConfirmRequirements && (
                  <View style={{ marginVertical: 1 }}>
                    {confirmRequirements.map(
                      (req, index) =>
                        !req.isValid && (
                          <Text
                            key={index}
                            style={{
                              color: "#CC0000",
                              fontSize: 12,
                              fontWeight: "bold",
                              textShadowColor: "#000",
                              textShadowRadius: 10,
                            }}
                          >
                            {req.label}
                          </Text>
                        )
                    )}
                  </View>
                )}
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.btnClose]}
                    onPress={closeModalContraseña}
                  >
                    <Text style={styles.textStyle}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.btnSearch]}
                    onPress={() => {
                      if (validatePassword()) {
                        changeContraseña();
                      } else {
                        Alert.alert(
                          "Error",
                          "La contraseña no cumple con los requisitos mínimos o no coinciden"
                        );
                      }
                    }}
                  >
                    <Text style={styles.textStyle}>Guardar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* modal de Datos Bancarios */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalPago}
            onRequestClose={closeModalPago}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Cambiar método de pago</Text>
                <TextInput
                  mode="outlined"
                  label="Número de tarjeta"
                  style={stylesMain.TextInputPerfil}
                  value={numCard}
                  onChangeText={setNumCard}
                  outlineColor="#c5cae9"
                  activeOutlineColor="#c5cae9"
                  keyboardType="numeric"
                  maxLength={16}
                />
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    mode="outlined"
                    label="Expiración"
                    style={[stylesMain.TextInputPerfil, { width: "65%" }]}
                    value={expCard}
                    onChangeText={setExpCard}
                    outlineColor="#c5cae9"
                    activeOutlineColor="#c5cae9"
                    keyboardType="numeric"
                    maxLength={5}
                  />
                  <TextInput
                    mode="outlined"
                    label="CVC"
                    style={[
                      stylesMain.TextInputPerfil,
                      { marginLeft: 15, width: "25%" },
                    ]}
                    value={CVC}
                    onChangeText={setCVC}
                    outlineColor="#c5cae9"
                    activeOutlineColor="#c5cae9"
                    keyboardType="numeric"
                    maxLength={3}
                  />
                </View>
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.btnClose]}
                    onPress={closeModalPago}
                  >
                    <Text style={styles.textStyle}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.btnSearch]}
                    onPress={changePago}
                  >
                    <Text style={styles.textStyle}>Guardar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>

      {/* Modal de Confirmación de Cierre de Sesión */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalLogout}
        onRequestClose={toggleLogout}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              ¿Seguro que quieres salir de tu sesión?
            </Text>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={[styles.button, styles.btnClose]}
                onPress={toggleLogout}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.btnSearch]}
                onPress={logout}
              >
                <Text style={styles.textStyle}>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para ubicacion */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalMaps}
        onRequestClose={toggleMaps}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalViewMaps}>
            <MapView
              ref={map}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={INITIAL_POSITION}
            >
              {results.length
                ? results.map((item, i) => {
                    const coord: LatLng = {
                      latitude: item.geometry.location.lat,
                      longitude: item.geometry.location.lng,
                    };
                    return (
                      <Marker
                        key={`search-item-${i}`}
                        coordinate={coord}
                        title={item.name}
                        description=""
                        onSelect={() =>
                          setSelectedLocation(item.formatted_address)
                        }
                      />
                    );
                  })
                : null}
            </MapView>
            <Searchbar
              placeholder="Buscar Direccion"
              onChangeText={(query) => {
                setSearchQuery(query);
              }}
              onEndEditing={searchPlaces}
              value={searchQuery}
              style={{
                position: "absolute",
                top: 20,
                margin: 10,
                width: 350,
                backgroundColor: "#FFF",
                borderColor: "black",
                borderWidth: 1,
                alignSelf: "center",
                maxWidth: "90%",
              }}
            />
            <TouchableOpacity
              style={[styles.button, styles.btnCloseMaps]}
              onPress={toggleMaps}
            >
              <Text style={styles.textStyle}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.btnSaveMaps]}
              onPress={saveLocation}
            >
              <Text style={styles.textStyle}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de cambiar tiempo de consulta */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalLogout}
        onRequestClose={toggleLogout}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              ¿Seguro que quieres salir de tu sesión?
            </Text>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={[styles.button, styles.btnClose]}
                onPress={toggleLogout}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.btnSearch]}
                onPress={logout}
              >
                <Text style={styles.textStyle}>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#002245",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  btnClose: {
    backgroundColor: "#f44336",
  },
  btnSearch: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  codeInput: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    backgroundColor: "white",
  },
  disabledText: {
    color: "#B0BEC5",
    marginBottom: 20,
  },
  resendText: {
    color: "#3F51B5",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  btnCancelar: {
    backgroundColor: "#f44336",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#c5cae9",
    marginRight: 5,
    marginTop: 3,
  },

  infoContainer: {
    display: "flex",
    justifyContent: "center",
  },

  btn: {
    borderRadius: 30,
    padding: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },

  buttonsContainer: {
    padding: 10,
  },

  buttonOptionText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },

  btnSave: {
    backgroundColor: "#002245",
    borderColor: "#000",
    borderWidth: 1,
  },

  btnChangePass: {
    backgroundColor: "#165DA5",
    borderColor: "#000",
    borderWidth: 1,
  },

  btnChangePayment: {
    backgroundColor: "#ECECEC",
    borderColor: "#000",
    borderWidth: 1,
  },

  btnLogout: {
    backgroundColor: "#FF3333",
    borderColor: "#000",
    borderWidth: 1,
  },

  textColorSave: {
    color: "#FFF",
  },

  textColorChangePass: {
    color: "#FFF",
  },

  textColorChangePayment: {
    color: "#000",
  },

  textColorLogout: {
    color: "#FFF",
  },

  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  btnCloseMaps: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#f44336",
  },
  btnSaveMaps: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#2196F3",
  },
  modalViewMaps: {
    width: "90%",
    height: "95%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default PerfilFisio;
