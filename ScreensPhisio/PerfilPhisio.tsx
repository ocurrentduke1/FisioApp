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
  Platform,
  Alert,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import stylesHistorial from "../styles/stylesHistorial";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/SimpleLineIcons";
import stylesMain from "../styles/stylesMain";
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "@env";
import { useFocusEffect } from "@react-navigation/native";

const PerfilPhisio = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [userID, setUserID] = useState<string | null>(null);
  const [userRol, setUserRol] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  //declaracion de modales
  const [modalContraseña, setModalContraseña] = useState(false);
  const [modalPago, setModalPago] = useState(false);
  const [email, setEmail] = useState("");
  const [Name, setName] = useState("");
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

  const requirements = [
    {
      label: "Debe contener entre 8 a 16 caracteres.",
      isValid: password.length >= 8 && password.length <= 16,
    },
    { label: "Debe contener mínimo 1 minúscula.", isValid: /[a-z]/.test(password) },
    { label: "Debe contener mínimo 1 mayúscula.", isValid: /[A-Z]/.test(password) },
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

  {
    /* Función para verificar el código de autenticación */
  }
  const verifyAuthCode = async () => {
    const enteredCode = authCode.join("");
    const response = await axios.post(
      BACKEND_URL + "/verificar-codigo-recuperacion",
      {
        codigo: enteredCode,
        destinatario: email,
      },
    );

    console.log(response.data);

    if (response.data.code == 404) {
      Alert.alert(
        "Error",
        "Error al verificar el código de autenticación, reenvíe el correo de verificación"
      );
      return false;
    }
    if (response.data.code == 403) {
      Alert.alert(
        "Error",
        "El código de autenticación ha expirado, reenvíe el correo de verificación"
      );
      return false;
    }
    if (response.data.code == 401) {
      Alert.alert("Error", "Codigo de autenticación incorrecto");
      return false;
    }
    if (response.data.code == 200) {
      setModalAuth(false);
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

  {
    /* Reenviar correo de verificación */
  }
  const reSendEmail = async () => {
    const response = await axios.post(
      BACKEND_URL + "/enviar-correo-recuperacion",
      {
        destinatario: email,
      }
    );

    console.log("enviado");

    if (response.data.code == 500) {
      Alert.alert("Error", "No se pudo enviar el correo de verificación");
      return false;
    }

    setIsButtonDisabled(true);
    setTimeLeft(60);

    // Iniciar el temporizador
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
      BACKEND_URL + "/enviar-correo-recuperacion",
      {
        destinatario: email,
      }
    );

    console.log("enviado");

    if (response.data.code == 500) {
      Alert.alert("Error", "No se pudo enviar el correo de verificación");
      return false;
    }
    if (response.data.code == 404) {
      Alert.alert("Error", "Correo no registrado");
      return false;
    }

    setModalAuth(true);
  };

  const getUserID = async () => {
    const id = await AsyncStorage.getItem("idSesion");
    const rol = await AsyncStorage.getItem("tipoUsuario");
    console.log("Fetched UserID:", id);
    console.log("Fetched rol:", rol);
    setUserID(id);
    setUserRol(rol);
  };

  const takeInfo = async () => {
    if (userID) {
      const response = await axios.get(
        BACKEND_URL + `/obtener-info-usuario/${userID}/${userRol}`
      );

      if (response.data.code == 500) {
        console.log("Error en la peticion");
        return;
      }

      console.log("Response data:", response.data);
      return response.data;
    }
  };

  const fetchData = async () => {
    const datosDelServidor = await takeInfo();
    setName(datosDelServidor.fisioterapeuta.nombre);
    setEmail(datosDelServidor.fisioterapeuta.correo);
    setTel(datosDelServidor.fisioterapeuta.telefono);
    setConsultorio(datosDelServidor.fisioterapeuta.consultorio);

    console.log("Datos del servidor: ", datosDelServidor);
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
    await AsyncStorage.multiRemove(["idSesion", "expiracion", "tipoUsuario"]);
    navigation.navigate("login");
  };

  const changeName = () => {
    const response = axios.post(BACKEND_URL + "/editar-nombre", {
      idFisio: Number(userID),
      nombre: Name,
    });
    console.log("nombre: ", Name);
  };

  const changeTel = () => {
    const response = axios.post(BACKEND_URL + "/editar-nombre", {
      idFisio: Number(userID),
      telefono: tel,
    });
    console.log("Telefono: ", tel);
  };

  const changeConsultorio = () => {
    const response = axios.post(BACKEND_URL + "/editar-consultorio", {
      idFisio: Number(userID),
      consultorio: consultorio,
    });
    console.log("consultorio: ", consultorio);
  };

  //declaracion de modal Pago
  const openModalPago = () => {
    setModalPago(true);
  };
  const closeModalPago = () => {
    setModalPago(false);
  };
  const changePago = () => {
    console.log("Datos de pago: ", numCard, expCard, CVC);
    closeModalPago();
  };

  // declaracion de modal Contraseña
  const openModalContraseña = () => {
    setModalContraseña(true);
  };
  const closeModalContraseña = () => {
    setModalContraseña(false);
  };
  const changeContraseña = async () => {
    const response = await axios.post(BACKEND_URL + "/recuperar-password", {
      email: email,
      password: password,
      tipoUsuario: userRol,
    });

    if (response.data.code == 404) {
      Alert.alert("Error", "no se encontro el usuario");
      return false;
    }
    if (response.data.code == 500) {
      Alert.alert("Error", "Error al cambiar la contraseña");
      return false;
    }
    if (response.data.code == 201) {
      Alert.alert("Exito", "Contraseña cambiada con exito");
      closeModalContraseña();
      return false;
    }
  };
  const validatePassword = () => {
    if (
      password.length <= 8 ||
      password.length >= 16 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      password !== confirmPassword
    ) {
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={stylesHistorial.container}>
      <View
        style={[
          stylesHistorial.containerRegistro,
          { flex: 1, alignItems: "center", justifyContent: "center" },
        ]}
      >
        <ScrollView style={stylesHistorial.scrollViewRegistro}>
          <View
            style={{
              marginVertical: 20,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                height: 150,
                width: 150,
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
                  size={120}
                  color="#000000"
                  style={{ alignSelf: "center" }}
                />
              )}
            </TouchableOpacity>
          </View>

          <View style={{ paddingVertical: 10 }}>
            <TextInput
              mode="flat"
              label="Correo Electronico"
              style={stylesMain.TextInputPerfil}
              value={email}
              onChangeText={(value) => setEmail(value)}
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              disabled={true}
            />
          </View>
          <TextInput
            mode="flat"
            label="Nombre"
            style={stylesMain.TextInputPerfil}
            value={Name}
            onChangeText={(value) => setName(value)}
            outlineColor="#c5cae9"
            activeOutlineColor="#c5cae9"
          />

          <TextInput
            mode="flat"
            label="Telefono"
            style={stylesMain.TextInputPerfil}
            value={tel}
            onChangeText={(value) => setTel(value)}
            outlineColor="#c5cae9"
            activeOutlineColor="#c5cae9"
            keyboardType="numeric"
            maxLength={10}
          />

          {/*modal de autenticacion */}
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
                      // Asigna la referencia a cada TextInput
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
                      isButtonDisabled ? styles.disabledtext : styles.resendtext
                    }
                  >
                    {isButtonDisabled
                      ? `Reenviar código (${timeLeft}s)`
                      : "Reenviar código"}
                  </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={styles.Cancelbutton}
                    onPress={() => setModalAuth(false)}
                  >
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      verifyAuthCode();
                    }}
                  >
                    <Text style={styles.buttonText}>Ingresar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

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
                  onChangeText={(value) => setConfirmPassword(value)}
                  outlineColor="#c5cae9"
                  activeOutlineColor="#c5cae9"
                />
                {ShowRequirements && (
            <View style={{ marginVertical: 1 }}>
              {requirements.map(
                (req, index) =>
                  !req.isValid && (
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                      <View style={styles.dot} />
                      <Text key={index} style={{
                        color: "#FF0000", 
                        fontSize: 12,
                        fontWeight: 'bold',
                        textShadowColor: '#000',
                        textShadowRadius: 10,   
                      }}>
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
                  onChangeText={(value) => setPassword(value)}
                  outlineColor="#c5cae9"
                  activeOutlineColor="#c5cae9"
                />
                {showConfirmRequirements && (
            <View style={{ marginVertical: 1 }}>
              {confirmRequirements.map(
                (req, index) =>
                  !req.isValid && (
                    <Text key={index} style={{ 
                      color: "#CC0000", 
                      fontSize: 12,
                      fontWeight: 'bold',
                      textShadowColor: '#000',
                      textShadowRadius: 10,   
                    }}>
                      {req.label}
                    </Text>
                  )
              )}
            </View>
          )}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={closeModalContraseña}
                  >
                    <Text style={styles.textStyle}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonSearch]}
                    onPress={() => {
                      if (validatePassword()) {
                        changeContraseña();
                      } else {
                        Alert.alert(
                          "Error",
                          "La contraseña no cumple con los requisitos minimos o no coinciden"
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
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              borderTopWidth: 2,
              borderColor: "#BDBDBD",
              paddingHorizontal: 10,
            }}
            onPress={sendEmail}
          >
            <Text style={stylesHistorial.buttonText}>Cambiar contraseña</Text>
          </TouchableOpacity>
          <TextInput
            mode="flat"
            label="Consultorio"
            style={stylesMain.TextInputPerfil}
            value={consultorio}
            onChangeText={(value) => setConsultorio(value)}
            outlineColor="#c5cae9"
            activeOutlineColor="#c5cae9"
          />

          {/* Boton de Datos Bancarios */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalPago}
            onRequestClose={closeModalPago}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Cambiar Metodo de pago</Text>
                <TextInput
                  mode="outlined"
                  label="Numero de tarjeta"
                  style={stylesMain.TextInputPerfil}
                  value={tel}
                  onChangeText={(value) => setNumCard(value)}
                  outlineColor="#c5cae9"
                  activeOutlineColor="#c5cae9"
                  keyboardType="numeric"
                  maxLength={16}
                />
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    mode="outlined"
                    label="Expiracion"
                    style={[stylesMain.TextInputPerfil, { width: "65%" }]}
                    value={tel}
                    onChangeText={(value) => setExpCard(value)}
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
                    value={tel}
                    onChangeText={(value) => setCVC(value)}
                    outlineColor="#c5cae9"
                    activeOutlineColor="#c5cae9"
                    keyboardType="numeric"
                    maxLength={3}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={closeModalPago}
                  >
                    <Text style={styles.textStyle}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonSearch]}
                    onPress={changePago}
                  >
                    <Text style={styles.textStyle}>Guardar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              borderBottomWidth: 2,
              borderTopWidth: 2,
              borderColor: "#BDBDBD",
              paddingHorizontal: 10,
            }}
            onPress={openModalPago}
          >
            <Text style={stylesHistorial.buttonText}>
              Cambiar metodo de pago
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              borderBottomWidth: 2,
              borderColor: "#BDBDBD",
              paddingHorizontal: 10,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
            onPress={toggleLogout}
          >
            <Icon2 name="logout" size={20} color={"#000"} />
            <Text style={[stylesHistorial.buttonText, { paddingLeft: 10 }]}>
              Cerrar Sesion
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalLogout}
        onRequestClose={toggleLogout}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              ¿Seguro que quieres salir de tu sesion?
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
                <Text style={styles.textStyle}>Cerrar sesion</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    width: 200,
    height: 40,
    borderColor: "#ccc",
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
  disabledtext: {
    color: "#B0BEC5",
    marginBottom: 20,
  },
  resendtext: {
    color: "#3F51B5",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  Cancelbutton: {
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
    backgroundColor: '#c5cae9', 
    marginRight: 5,
    marginTop: 3,
  },
});

export default PerfilPhisio;
