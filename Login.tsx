import { StatusBar } from "expo-status-bar";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Modal,
  StyleSheet,
} from "react-native";
import stylesLogin from "./styles/stylesLogin";
import { NavigationProp } from "@react-navigation/native";
import { BACKEND_URL } from "@env";
import JWT from "expo-jwt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dialog, TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

export function Login({ navigation }: { navigation: NavigationProp<any> }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authCode, setAuthCode] = useState(["", "", "", "", ""]);
  const [modalAuth, setModalAuth] = useState(false);
  const inputRefs = useRef<any[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [correoIncorrecto, setCorreoIncorrecto] = React.useState(false);
  const changeCorreoIncorrecto = () => setCorreoIncorrecto(!correoIncorrecto);
  const [verificarAuth, setVerificarAuth] = React.useState(false);
  const changeVerificarAuth = () => setVerificarAuth(!verificarAuth);
  const [codigoExpirado, setCodigoExpirado] = React.useState(false);
  const changeCodigoExpirado = () => setCodigoExpirado(!codigoExpirado);
  const [codigoIncorrecto, setCodigoIncorrecto] = React.useState(false);
  const changeCodigoIncorrecto = () => setCodigoIncorrecto(!codigoIncorrecto);
  const [correoNoEnviado, setCorreoNoEnviado] = React.useState(false);
  const changeCorreoNoEnviado = () => setCorreoNoEnviado(!correoNoEnviado);

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
      BACKEND_URL + "/verificar-login-codigo",
      {
        codigo: enteredCode,
        destinatario: email,
      },
      {
        headers: { "User-Agent": Platform.OS + "/" + Platform.Version },
      }
    );


    if (response.data.code == 404) {
      changeVerificarAuth();
      return false;
    }
    if (response.data.code == 403) {
      changeCodigoExpirado();
      return false;
    }
    if (response.data.code == 401) {
      changeCodigoIncorrecto();
      return false;
    }
    if (response.data.code == 200) {
      loggin();
      setModalAuth(false);
      setAuthCode(["", "", "", "", ""]);
    }
  };

  {
    /* Reenviar correo de verificación */
  }
  const reSendEmail = async () => {
    const response = await axios.post(
      BACKEND_URL + "/enviar-correo-verificacion",
      {
        destinatario: email,
      }
    );


    if (response.data.code == 500) {
      changeCorreoNoEnviado();
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

  useEffect(() => {
    const checkExpiration = async () => {
      const exp = Number(await AsyncStorage.getItem("expiracion"));

      if (exp) {
        const expDate = new Date(exp * 1000);
        if (expDate < new Date()) {
          await AsyncStorage.removeItem("idSesion");
          await AsyncStorage.removeItem("expiracion");

          navigation.navigate("login");
          return;
        }
        const tipoUsuario = await AsyncStorage.getItem("tipoUsuario");
        navigation.navigate(
          tipoUsuario === "fisioterapeuta"
            ? "mainFisio"
            : "VerExpedientePaciente"
        );
      }
    };

    checkExpiration();
  }, []);

  const LoginData = {
    email: email,
    password: password,
  };

  const loggin = async () => {
    try {
      console.log(BACKEND_URL);
      const response = await axios.post(
        BACKEND_URL + "/login",
        {
          email,
          password,
        },
        {
          headers: { "User-Agent": Platform.OS + "/" + Platform.Version },
        }
      );


      if (response.data.code == 404 || response.data.code == 500) {
        changeCorreoIncorrecto();
        return;
      }

      if (response.data.code == 401) {
        setModalAuth(true);
      }

      if (response.data.code == 200) {
        const { key, token } = response.data;
const jwtDecode = JWT.decode(token, key);
await AsyncStorage.setItem("idSesion", jwtDecode.id.toString());
await AsyncStorage.setItem("tipoUsuario", jwtDecode.tipoUsuario);
const imageBuffer = jwtDecode.base64Image;
const uri = `data:image/${jwtDecode.extension};base64,${imageBuffer}`;
await AsyncStorage.setItem("photoPerfil", uri);
if (jwtDecode?.exp) {
await AsyncStorage.setItem("expiracion", jwtDecode.exp.toString());
}

        navigation.navigate(
          jwtDecode.tipoUsuario === "fisioterapeuta"
            ? "mainFisio"
            : "VerExpedientePaciente"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const validateData = () => {
    if (email === "" || password === "") {
      return false;
    } else {
      return true;
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <View style={stylesLogin.container}>
      <Image
        style={stylesLogin.image}
        source={require("./assets/logoFisioApp.png")}
      />
      <LinearGradient
        colors={["rgba(44,189,191,0.8)", "transparent"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradient}
      />
      <View style={stylesLogin.datos}>
        <Text
          style={{
            color: "#FFF",
            height: 50,
            textShadowColor: "#000",
            textShadowRadius: 20,
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          {"Bienvenido de nuevo"}
        </Text>
        <TextInput
          mode="outlined"
          label="Correo Electrónico"
          value={email}
          onChangeText={(text) => setEmail(text)}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          keyboardType="email-address"
          style={stylesLogin.TextInput}
          left={<TextInput.Icon style={{ marginTop: 30 }} icon="email" />}
        />
        <TextInput //textbox ingresar Contraseña
          mode="outlined"
          value={password}
          label="Contraseña"
          onChangeText={(value) => setPassword(value)}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          style={stylesLogin.TextInput}
          secureTextEntry={!showPassword}
          left={<TextInput.Icon style={{ marginTop: 30 }} icon="lock" />}
          right={
            <TextInput.Icon
              style={{
                marginTop: 20,
              }}
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
      </View>
      <TouchableOpacity // boton de recuperar contraseña
        onPress={() => navigation.navigate("recuperarContraseña")}
      >
        <Text
          style={{
            textDecorationLine: "underline",
            paddingTop: 20,
            height: 60,
            color: "#FFFFFF",
            fontSize: 17,
            fontWeight: "bold",
            textShadowColor: "#D0680E",
            textShadowRadius: 20,
          }}
        >
          {" "}
          ¿Olvidaste tu contraseña?
        </Text>
      </TouchableOpacity>

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

      <TouchableOpacity //boton de inicio de sesion
        style={stylesLogin.button}
        onPress={() => {
          if (validateData()) {
            if (!validateEmail(email)) {
              changeCorreoIncorrecto();
              return false;
            }
            loggin();
          } else {
            alert("Datos incompletos");
          }
        }}
        disabled={!validateData()}
      >
        <Text style={{ fontSize: 16, color: "white" }}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity //boton de registrar cuenta
        style={stylesLogin.Secondarybutton}
        onPress={() => navigation.navigate("registrar")}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Registrar</Text>
      </TouchableOpacity>

      {/* Dialogo de correo incorrecto*/}
      <Dialog visible={correoIncorrecto} onDismiss={changeCorreoIncorrecto}>
        <Dialog.Icon icon="alert" size={50} />
        <Dialog.Title style={styles.dialogTitle}>Surgio un error!</Dialog.Title>
        <Dialog.Content>
          <Text style={{ alignSelf: "center" }}>
            Correo o contraseña incorrectos
          </Text>
          <TouchableOpacity
            onPress={changeCorreoIncorrecto}
            style={{ alignSelf: "center", paddingTop: 30 }}
          >
            <Text style={{ fontSize: 20 }}>Aceptar</Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>

      {/* Dialogo de error al verificar*/}
      <Dialog visible={verificarAuth} onDismiss={changeVerificarAuth}>
        <Dialog.Icon icon="alert" size={50} />
        <Dialog.Title style={styles.dialogTitle}>Surgio un error!</Dialog.Title>
        <Dialog.Content>
          <Text style={{ alignSelf: "center" }}>
            Error al verificar el código de autenticación, reenvíe el correo de
            verificación
          </Text>
          <TouchableOpacity
            onPress={changeVerificarAuth}
            style={{ alignSelf: "center", paddingTop: 30 }}
          >
            <Text style={{ fontSize: 20 }}>Aceptar</Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>

      {/* Dialogo de codigo expirado*/}
      <Dialog visible={codigoExpirado} onDismiss={changeCodigoExpirado}>
        <Dialog.Icon icon="alert" size={50} />
        <Dialog.Title style={styles.dialogTitle}>Surgio un error!</Dialog.Title>
        <Dialog.Content>
          <Text style={{ alignSelf: "center" }}>
            El código de autenticación ha expirado, reenvíe el correo de
            verificación
          </Text>
          <TouchableOpacity
            onPress={changeCodigoExpirado}
            style={{ alignSelf: "center", paddingTop: 30 }}
          >
            <Text style={{ fontSize: 20 }}>Aceptar</Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>

      {/* Dialogo de codigo incorrecto */}
      <Dialog visible={codigoIncorrecto} onDismiss={changeCodigoIncorrecto}>
        <Dialog.Icon icon="alert" size={50} />
        <Dialog.Title style={styles.dialogTitle}>Surgio un error!</Dialog.Title>
        <Dialog.Content>
          <Text style={{ alignSelf: "center" }}>
            Codigo de autenticación incorrecto
          </Text>
          <TouchableOpacity
            onPress={changeCodigoIncorrecto}
            style={{ alignSelf: "center", paddingTop: 30 }}
          >
            <Text style={{ fontSize: 20 }}>Aceptar</Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>

      {/* Dialogo de codigo incorrecto */}
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

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
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
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
  },
  dialogTitle: {
    textAlign: "center",
  },
});
