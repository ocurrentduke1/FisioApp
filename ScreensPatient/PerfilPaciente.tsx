import React, { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Modal,
  Dimensions,
  Keyboard,
} from "react-native";

import {
  TouchableRipple,
} from "react-native-paper";

import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import stylesHistorial from "../styles/stylesHistorial";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL, MAPS_API } from "@env";
import { LinearGradient } from "expo-linear-gradient";
import { Divider, TextInput, Searchbar, ActivityIndicator, Dialog } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import stylesMain from "../styles/stylesMain";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");

const PerfilPaciente = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const [userID, setUserID] = useState<string | null>(null);
  const [userRol, setUserRol] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [ModalLogout, setModalLogout] = useState(false);
  const [modalContraseña, setModalContraseña] = useState(false);
  const [ModalMaps, setModalMaps] = useState(false);
  const [Name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [tel, setTel] = useState("");
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
  const [domicilio, setDomicilio] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [correoNoEnviado, setCorreoNoEnviado] = React.useState(false);
  const changeCorreoNoEnviado = () => setCorreoNoEnviado(!correoNoEnviado);
  const [correoIncorrecto, setCorreoIncorrecto] = React.useState(false);
  const changeCorreoIncorrecto = () => setCorreoIncorrecto(!correoIncorrecto);
  const [verificarAuth, setVerificarAuth] = React.useState(false);
  const changeVerificarAuth = () => setVerificarAuth(!verificarAuth);
  const [codigoExpirado, setCodigoExpirado] = React.useState(false);
  const changeCodigoExpirado = () => setCodigoExpirado(!codigoExpirado);
  const [codigoIncorrecto, setCodigoIncorrecto] = React.useState(false);
  const changeCodigoIncorrecto = () => setCodigoIncorrecto(!codigoIncorrecto);
  const [usuarioNoEncontrado, setUsuarioNoEncontrado] = React.useState(false);
  const changeUsuarioNoEncontrado = () => setUsuarioNoEncontrado(!usuarioNoEncontrado);
  const [errorContrasena, setErrorContrasena] = React.useState(false);
  const changeErrorContrasena = () => setErrorContrasena(!errorContrasena);
  const [exitoContrasena, setExitoContrasena] = React.useState(false);
  const changeExitoContrasena = () => setExitoContrasena(!exitoContrasena);
  const [errorGuardar, setErrorGuardar] = React.useState(false);
  const changeErrorGuardar = () => setErrorGuardar(!errorGuardar);
  const [exitoGuardar, setExitoGuardar] = React.useState(false);
  const changeExitoGuardar = () => setExitoGuardar(!exitoGuardar);
  const [contrasenaInvalida, setContrasenaInvalida] = React.useState(false);
  const changeContrasenaInvalida = () => setContrasenaInvalida(!contrasenaInvalida);


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

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

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

  const getUserID = async () => {
    const id = await AsyncStorage.getItem("idSesion");
    const rol = (await AsyncStorage.getItem("tipoUsuario")) || "";
    setUserID(id);
    setUserRol(rol);
  };

  const sendEmail = async () => {
    const response = await axios.post(
      `${BACKEND_URL}/enviar-correo-recuperacion`,
      {
        destinatario: email,
      }
    );

    if (response.data.code === 500) {
      changeCorreoNoEnviado();
      return false;
    }
    if (response.data.code === 404) {
      changeCorreoIncorrecto();
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
      changeVerificarAuth();
      return false;
    }
    if (response.data.code === 403) {
      changeCodigoExpirado();
      return false;
    }
    if (response.data.code === 401) {
      changeCodigoIncorrecto();
      return false;
    }
    if (response.data.code === 200) {
      setModalAuth(false);
      openModalContraseña();
    }
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
      changeUsuarioNoEncontrado();
      return false;
    }
    if (response.data.code === 500) {
      changeErrorContrasena();
      return false;
    }
    if (response.data.code === 201) {
      changeExitoContrasena();
      closeModalContraseña();
      return false;
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
      changeCorreoNoEnviado();
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

  const takeInfo = async () => {
    try {
      if (userID) {
        const response = await axios.get(
          `${BACKEND_URL}/obtener-info-usuario/${userID}/${userRol}`
        );

        console.log("Response:", response.data);
        if (response.data.code === 500) {
          console.log("Error en la petición");
          return;
        }
  
        return response.data;
      }

    }catch (error) {
      console.error(error);
      console.log("Error al obtener la información del usuario");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    const datosDelServidor = await takeInfo();
    if (datosDelServidor) {
      setName(datosDelServidor.paciente.nombre);
      setApellido(datosDelServidor.paciente.apellidos);
      setEmail(datosDelServidor.paciente.mail);
      setTel(datosDelServidor.paciente.numeroContacto);
      setEdad(datosDelServidor.paciente.fechaNacimiento);
      setSexo(datosDelServidor.paciente.genero);
      setDomicilio(datosDelServidor.paciente.ubicacion);
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
      console.log("Error No se pudieron actualizar los datos");
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
      edad: edad,
      location: domicilio,
    });

    console.log("Response:", response.data);

    if (response.data.code === 500) {
      changeErrorGuardar();
      return false;
    }
    if (response.data.code === 404) {
      changeUsuarioNoEncontrado();
      return false;
    }
    changeExitoGuardar();
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
    const location = `${initialLat}, ${initialLng} &radius=2000`;
    const url = `${googleApisUrl}?query=${input}&location=${location}&key=${MAPS_API}`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      // console.log(json);
      if (json && json.results) {
        const coords: LatLng[] = [];
        for (const item of json.results) {
          // console.log("item: ", item);
          coords.push({
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
          });
        }
        setResults(json.results);
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

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <LinearGradient
        colors={["rgba(44,189,191,0.8)", "transparent"]}
        style={styles.gradient}
      />
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={stylesHistorial.container}>
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
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Image 
              source={require("../assets/logoFisioApp.png")}
              style={styles.logo}
            />
            <Text
              style={{
                color: "#000",
                fontSize: 25,
                fontWeight: "bold",
                marginLeft: 10,
                marginTop: 6
              }}
            >
              FisioApp ®
            </Text>
          </View>

          <View
            style={{ marginTop: 5, marginBottom: 20, alignItems: "center" }}
          >
            <TouchableOpacity
              style={{
                height: 150,
                width: 150,
                borderRadius: 200,
                overflow: "hidden",
              }}
              onPress={pickImage}
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{
                    flex: 1,
                    width: 150,
                    borderRadius: 200,
                    alignSelf: "center",
                  }}
                />
              ) : (
                <Icon
                  name="user-circle"
                  size={150}
                  color="#000"
                  style={{ width: 150, height: 150 }}
                />
              )}
            </TouchableOpacity>
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

            <View style={styles.flexViewStart}>
              <MaterialCommunityIcons name="email" size={18} color="#000"></MaterialCommunityIcons>

              <Text style={{ marginLeft: 10 }}>
                { email }
              </Text>
            </View>

            <View style={styles.flexViewStart}>
              <FontAwesome5 name="birthday-cake" size={18} color="#000"></FontAwesome5>

              <Text style={{ marginLeft: 10, marginTop: 1 }}>
                { new Date(edad.substring(0, 10)).toLocaleDateString() }
              </Text>
            </View>

            <View style={styles.flexViewStart}>
              <Foundation name={sexo === 'Masculino' ? "male-symbol" : 'female-symbol'} size={23} color="#000"></Foundation>

              <Text style={{ marginLeft: 10, marginTop: 1 }}>
                { sexo }
              </Text>
            </View>

            <TouchableRipple
                borderless
                onPress={toggleMaps}
              >
                <View style={styles.flexViewStart}>
                  <MaterialCommunityIcons name="map-search" size={25} color="#000" />
                  <Text style={styles.text}>
                    {domicilio}
                  </Text>
                </View>
            </TouchableRipple>
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

            <Divider style={{ marginTop: 20, marginBottom: 5 }} bold />

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
        </ScrollView>
      </View>

      {/* Modal para cerrar sesion */}
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
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={toggleLogout}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonSearch]}
                onPress={logout}
              >
                <Text style={styles.textStyle}>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
            <TouchableOpacity onPress={reSendEmail} disabled={isButtonDisabled}>
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
              <TouchableOpacity style={styles.button} onPress={verifyAuthCode}>
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
                        style={{ flexDirection: "row", alignItems: "center" }}
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
                    changeContrasenaInvalida();
                  }
                }}
              >
                <Text style={styles.textStyle}>Guardar</Text>
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
              onPress={toggleMaps}
            >
              <Text style={styles.textStyle}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Dialog visible={correoNoEnviado} onDismiss={changeCorreoNoEnviado}>
        <Dialog.Icon icon="alert" size={50} />
        <Dialog.Title style={styles.dialogTitle}>Surgio un error!</Dialog.Title>
        <Dialog.Content>
          <Text style={{ alignSelf: "center" }}>
          No se pudo enviar el correo de verificación
          </Text>
          <TouchableOpacity
            onPress={changeCorreoNoEnviado}
            style={{ alignSelf: "center", paddingTop: 30 }}
          >
            <Text style={{ fontSize: 20 }}>Aceptar</Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>

      <Dialog visible={correoIncorrecto} onDismiss={changeCorreoIncorrecto}>
        <Dialog.Icon icon="alert" size={50} />
        <Dialog.Title style={styles.dialogTitle}>Surgio un error!</Dialog.Title>
        <Dialog.Content>
          <Text style={{ alignSelf: "center" }}>
          Correo no registrado
          </Text>
          <TouchableOpacity
            onPress={changeCorreoIncorrecto}
            style={{ alignSelf: "center", paddingTop: 30 }}
          >
            <Text style={{ fontSize: 20 }}>Aceptar</Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>

      <Dialog visible={verificarAuth} onDismiss={changeVerificarAuth}>
        <Dialog.Icon icon="alert" size={50} />
        <Dialog.Title style={styles.dialogTitle}>Surgio un error!</Dialog.Title>
        <Dialog.Content>
          <Text style={{ alignSelf: "center" }}>
          Error al verificar el código de autenticación, reenvíe el correo de verificación
          </Text>
          <TouchableOpacity
            onPress={changeVerificarAuth}
            style={{ alignSelf: "center", paddingTop: 30 }}
          >
            <Text style={{ fontSize: 20 }}>Aceptar</Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>

      <Dialog visible={codigoExpirado} onDismiss={changeCodigoExpirado}>
        <Dialog.Icon icon="alert" size={50} />
        <Dialog.Title style={styles.dialogTitle}>Surgio un error!</Dialog.Title>
        <Dialog.Content>
          <Text style={{ alignSelf: "center" }}>
          El código de autenticación ha expirado, reenvíe el correo de verificación
          </Text>
          <TouchableOpacity
            onPress={changeCodigoExpirado}
            style={{ alignSelf: "center", paddingTop: 30 }}
          >
            <Text style={{ fontSize: 20 }}>Aceptar</Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>

      <Dialog visible={codigoIncorrecto} onDismiss={changeCodigoIncorrecto}>
        <Dialog.Icon icon="alert" size={50} />
        <Dialog.Title style={styles.dialogTitle}>Surgio un error!</Dialog.Title>
        <Dialog.Content>
          <Text style={{ alignSelf: "center" }}>
          Código de autenticación incorrecto
          </Text>
          <TouchableOpacity
            onPress={changeCodigoIncorrecto}
            style={{ alignSelf: "center", paddingTop: 30 }}
          >
            <Text style={{ fontSize: 20 }}>Aceptar</Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>

      <Dialog visible={usuarioNoEncontrado} onDismiss={changeUsuarioNoEncontrado}>
        <Dialog.Icon icon="alert" size={50} />
        <Dialog.Title style={styles.dialogTitle}>Surgio un error!</Dialog.Title>
        <Dialog.Content>
          <Text style={{ alignSelf: "center" }}>
          No se encontró el usuario
          </Text>
          <TouchableOpacity
            onPress={changeUsuarioNoEncontrado}
            style={{ alignSelf: "center", paddingTop: 30 }}
          >
            <Text style={{ fontSize: 20 }}>Aceptar</Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>

      <Dialog visible={errorContrasena} onDismiss={changeErrorContrasena}>
        <Dialog.Icon icon="alert" size={50} />
        <Dialog.Title style={styles.dialogTitle}>Surgio un error!</Dialog.Title>
        <Dialog.Content>
          <Text style={{ alignSelf: "center" }}>
          Error al cambiar la contraseña
          </Text>
          <TouchableOpacity
            onPress={changeErrorContrasena}
            style={{ alignSelf: "center", paddingTop: 30 }}
          >
            <Text style={{ fontSize: 20 }}>Aceptar</Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>

      <Dialog visible={exitoContrasena} onDismiss={changeExitoContrasena}>
        <Dialog.Icon icon="check-circle" size={50} />
        <Dialog.Title style={styles.dialogTitle}>Hecho!</Dialog.Title>
        <Dialog.Content>
          <Text style={{ alignSelf: "center" }}>
          Contraseña cambiada con éxito
          </Text>
          <TouchableOpacity
            onPress={changeExitoContrasena}
            style={{ alignSelf: "center", paddingTop: 30 }}
          >
            <Text style={{ fontSize: 20 }}>Aceptar</Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>

      <Dialog visible={errorGuardar} onDismiss={changeErrorGuardar}>
        <Dialog.Icon icon="alert" size={50} />
        <Dialog.Title style={styles.dialogTitle}>Surgio un error!</Dialog.Title>
        <Dialog.Content>
          <Text style={{ alignSelf: "center" }}>
          Error al guardar los cambios
          </Text>
          <TouchableOpacity
            onPress={changeErrorGuardar}
            style={{ alignSelf: "center", paddingTop: 30 }}
          >
            <Text style={{ fontSize: 20 }}>Aceptar</Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>

      <Dialog visible={exitoGuardar} onDismiss={changeExitoGuardar}>
        <Dialog.Icon icon="check-circle" size={50} />
        <Dialog.Title style={styles.dialogTitle}>Hecho!</Dialog.Title>
        <Dialog.Content>
          <Text style={{ alignSelf: "center" }}>
          Cambios guardados con éxito
          </Text>
          <TouchableOpacity
            onPress={changeExitoGuardar}
            style={{ alignSelf: "center", paddingTop: 30 }}
          >
            <Text style={{ fontSize: 20 }}>Aceptar</Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>

      <Dialog visible={contrasenaInvalida} onDismiss={changeContrasenaInvalida}>
        <Dialog.Icon icon="alert" size={50} />
        <Dialog.Title style={styles.dialogTitle}>Hecho!</Dialog.Title>
        <Dialog.Content>
          <Text style={{ alignSelf: "center" }}>
          La contraseña no cumple con los requisitos mínimos o no coinciden
          </Text>
          <TouchableOpacity
            onPress={changeContrasenaInvalida}
            style={{ alignSelf: "center", paddingTop: 30 }}
          >
            <Text style={{ fontSize: 20 }}>Aceptar</Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#f44336",
  },
  buttonSearch: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  infoContainer: {
    display: "flex",
    justifyContent: "center",
  },
  buttonsContainer: {
    padding: 10,
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
  btnSave: {
    backgroundColor: "#002245",
    borderColor: "#000",
    borderWidth: 1,
  },
  buttonOptionText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  textColorSave: {
    color: "#FFF",
  },
  btnChangePass: {
    backgroundColor: "#165DA5",
    borderColor: "#000",
    borderWidth: 1,
  },
  textColorChangePass: {
    color: "#FFF",
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
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  btnClose: {
    backgroundColor: "#f44336",
  },
  btnSearch: {
    backgroundColor: "#2196F3",
  },
  btnChangePayment: {
    backgroundColor: "#ECECEC",
    borderColor: "#000",
    borderWidth: 1,
  },
  textColorChangePayment: {
    color: "#000",
  },
  btnLogout: {
    backgroundColor: "#FF3333",
    borderColor: "#000",
    borderWidth: 1,
  },
  textColorLogout: {
    color: "#FFF",
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#002245",
  },
  dialogTitle: {
    textAlign: "center",
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    borderRadius: 300,
  },
  flexViewStart: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 10,
    flexWrap: 'wrap'
  },
  textContainer: {
    flexDirection: 'row',         // Alinea texto y icono horizontalmente
    alignItems: 'center',         // Centra verticalmente el texto y el icono
    flex: 1,                      // Toma el espacio disponible restante
  },
  text: {
    marginLeft: 4,
    marginTop: -5,
    fontWeight: 'bold',
    flex: 1
  },
  iconContainer: {
    height: 30,
    width: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default PerfilPaciente;
