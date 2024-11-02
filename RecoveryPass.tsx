import { StatusBar } from "expo-status-bar";
import axios from "axios";
import React, { Component, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import stylesLogin from "./styles/stylesLogin";
import { NavigationProp } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { BACKEND_URL } from "@env";
import stylesMain from "./styles/stylesMain";
import { LinearGradient } from "expo-linear-gradient";

const windowWidth = Dimensions.get("window").width;

export function RecoveryPass({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [email, setEmail] = useState("");
  const [modalContraseña, setModalContraseña] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [authCode, setAuthCode] = useState(["", "", "", "", ""]);
  const [modalAuth, setModalAuth] = useState(false);
  const inputRefs = useRef<any[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [showEmailRequirements, setShowEmailRequirements] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const emailRequirements = [
    {
      label: "El correo debe ser válido",
      isValid: validateEmail(email),
    },
  ];

  

  //declaracion de modal Contraseña
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
      tipoUsuario: tipoUsuario,
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
      closeModalContraseña();
      navigation.navigate("login");
      return false;
    }
  };

  const validatePassword = () => {
    if (
      password.length <= 8 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      password !== confirmPassword
    ) {
      return false;
    }
    return true;
  };

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
      setTipoUsuario(response.data.tipoUsuario);
      setModalAuth(false);
      openModalContraseña();
    }
  };

  {
    /* Función para enviar el correo de verificación */
  }
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

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const validateInput = () => {
    if (email === "") {
      return false;
    } else {
      return true;
    }
  };

  // const validateEmail = (email: string) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  return (
    <View style={stylesLogin.container}>
      <Image
        style={stylesLogin.image}
        source={require("./assets/logoFisioApp.png")}
      />
<LinearGradient
        colors={['rgba(44,189,191,0.8)', 'transparent']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradient}
      />

      <View style={stylesLogin.datos}>
        <TextInput
          mode="outlined"
          label="Correo Electrónico"
          value={email}
          onFocus={() => setShowEmailRequirements(true)}
          onBlur={() => setShowEmailRequirements(false)}
          onChangeText={(text) => setEmail(text)}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          style={stylesLogin.TextInput}
        />

        {showEmailRequirements && (
          <View style={{ marginVertical: 1 }}>
            {emailRequirements.map(
              (req, index) =>
                !req.isValid && (
                  <Text
                    key={index}
                    style={{
                      color: "#FF0000",
                      fontSize: 12,
                      fontWeight: "bold",
                      textShadowColor: "#000",
                      textShadowRadius: 6,
                    }}
                  >
                    {req.label}
                  </Text>
                )
            )}
          </View>
        )}

        <Text
          style={{
            fontSize: 16,
            marginRight: 10,
            color: "#FFFFFF",
            textAlign: "justify",
            paddingTop: 20,
          }}
        >
          Ingrese el correo Electronico de su cuenta para enviar la recuperacion
          de su contraseña
        </Text>
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
              Revisa tu correo, te hemos enviado un codigo de verificacion
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
            <TouchableOpacity onPress={reSendEmail} disabled={isButtonDisabled}>
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

      <TouchableOpacity //boton de recuperar contraseña
        style={[stylesLogin.button, { paddingHorizontal: 70 }]}
        onPress={() => {
          if (!validateEmail(email)) {
            Alert.alert("Error", "Correo electrónico no válido");
          } else {
            // if(auth){
            //   console.log(registerData);
            //   navigation.navigate('registrarPersonales', { registerData: registerData });
            //   //console.log(registerData);
            //   }else{
            //     setModalAuth(true);
            //     // sendEmail();
            //   }

            sendEmail();
            // setModalAuth(true);
          }
        }}
        disabled={!validateInput()}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 17 }}>
          Recuperar contraseña
        </Text>
      </TouchableOpacity>

      <TouchableOpacity //boton de registrar cuenta
        style={[stylesLogin.Secondarybutton, { paddingHorizontal: 115 }]}
        onPress={() => navigation.navigate("login")} // Función que se ejecuta cuando se presiona el botón
      >
        <Text style={{ color: "#FFFFFF", fontSize: 17 }}>Regresar</Text>
      </TouchableOpacity>

      {/* Boton de contraseña */}
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
              label="Contraseña Nueva"
              style={stylesMain.TextInputPerfil}
              value={password}
              onChangeText={(value) => setPassword(value)}
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
            />
            <TextInput
              mode="outlined"
              label="Confirmar Contraseña"
              style={stylesMain.TextInputPerfil}
              value={confirmPassword}
              onChangeText={(value) => setConfirmPassword(value)}
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
            />
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
                  if (!validatePassword()) {
                    Alert.alert(
                      "Error",
                      "Error al cambiar la contraseña, verifique que las contraseñas coincidan y cumplan con los requisitos"
                    );
                  } else {
                    changeContraseña();
                  }
                }}
              >
                <Text style={styles.textStyle}>Cambiar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#00BCD4",
    width: windowWidth * 0.8,
    borderRadius: 25,
    // marginBottom: 20,
    paddingBottom: 10,
    // shadowColor: "#000",
    // shadowOffset: { width: 2, height: 16 },
    // shadowOpacity: 0.5,
    // shadowRadius: 6,
    // elevation: 8,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: "white",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    color: "white",
    paddingTop: 20,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  // containerAuth: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   padding: 16,
  // },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
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
  button: {
    backgroundColor: "#3F51B5",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
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
  disabledtext: {
    color: "#B0BEC5",
    marginBottom: 20,
  },
  resendtext: {
    color: "#3F51B5",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonClose: {
    backgroundColor: "#f44336",
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonSearch: {
    backgroundColor: "#2196F3",
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200
  },
});
