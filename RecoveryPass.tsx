import { StatusBar } from "expo-status-bar";
import axios from "axios";
import React, { Component, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import stylesLogin from "./styles/stylesLogin";
import { NavigationProp } from "@react-navigation/native";
import { Dialog, TextInput } from "react-native-paper";
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
  const [sinUsuario, setSinUsuario] = React.useState(false);
  const changeSinUsuario = () => setSinUsuario(!sinUsuario);
  const [cambiarContrasena, setCambiarContrasena] = React.useState(false);
  const changeCambiarContrasena = () => setCambiarContrasena(!cambiarContrasena);
  const [verificarAuth, setVerificarAuth] = React.useState(false);
  const changeVerificarAuth = () => setVerificarAuth(!verificarAuth);
  const [codigoExpirado, setCodigoExpirado] = React.useState(false);
  const changeCodigoExpirado = () => setCodigoExpirado(!codigoExpirado);
  const [codigoIncorrecto, setCodigoIncorrecto] = React.useState(false);
  const changeCodigoIncorrecto = () => setCodigoIncorrecto(!codigoIncorrecto);
  const [correoNoEnviado, setCorreoNoEnviado] = React.useState(false);
  const changeCorreoNoEnviado = () => setCorreoNoEnviado(!correoNoEnviado);
  const [correoNoRegistrado, setCorreoNoRegistrado] = React.useState(false);
  const changeNoRegistrado = () => setCorreoNoRegistrado(!correoNoRegistrado);
  const [correoNoValido, setCorreoNoValido] = React.useState(false);
  const changeNoValido = () => setCorreoNoValido(!correoNoValido);
  const [contrasenaInvalida, setContrasenaInvalida] = React.useState(false);
  const changeContrasenaInvalida = () => setContrasenaInvalida(!contrasenaInvalida);

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
      changeSinUsuario();
      return false;
    }
    if (response.data.code == 500) {
      changeCambiarContrasena();
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
      setTipoUsuario(response.data.tipoUsuario);
      setModalAuth(false);
      setAuthCode(["", "", "", "", ""]);
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

    if (response.data.code == 500) {
      changeCorreoNoEnviado();
      return false;
    }
    if (response.data.code == 404) {
      changeNoRegistrado();
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
            changeNoValido();
          } else {
            sendEmail();
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
                    changeContrasenaInvalida();
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

      {/* Dialogo de codigo incorrecto */}
      <Dialog visible={sinUsuario} onDismiss={changeSinUsuario}>
        <Dialog.Icon icon="alert" size={50} />
        <Dialog.Title style={styles.dialogTitle}>Surgio un error!</Dialog.Title>
        <Dialog.Content>
          <Text style={{alignSelf: "center"}}>no se encontro el usuario</Text>
          <TouchableOpacity onPress={changeSinUsuario} style={{alignSelf: "center", paddingTop: 30}} >
            <Text style={{fontSize: 20}}>Aceptar</Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>

      {/* Dialogo de codigo incorrecto */}
      <Dialog visible={cambiarContrasena} onDismiss={changeCambiarContrasena}>
        <Dialog.Icon icon="alert" size={50} />
        <Dialog.Title style={styles.dialogTitle}>Surgio un error!</Dialog.Title>
        <Dialog.Content>
          <Text style={{alignSelf: "center"}}>Error al cambiar la contraseña</Text>
          <TouchableOpacity onPress={changeCambiarContrasena} style={{alignSelf: "center", paddingTop: 30}} >
            <Text style={{fontSize: 20}}>Aceptar</Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>

      {/* Dialogo de error al verificar*/}
      <Dialog visible={verificarAuth} onDismiss={changeVerificarAuth}>
        <Dialog.Icon icon="alert" size={50} />
        <Dialog.Title style={styles.dialogTitle}>Surgio un error!</Dialog.Title>
        <Dialog.Content>
          <Text style={{alignSelf: "center"}}>Error al verificar el código de autenticación, reenvíe el correo de verificación</Text>
          <TouchableOpacity onPress={changeVerificarAuth} style={{alignSelf: "center", paddingTop: 30}} >
            <Text style={{fontSize: 20}}>Aceptar</Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>

      {/* Dialogo de codigo expirado*/}
      <Dialog visible={codigoExpirado} onDismiss={changeCodigoExpirado}>
        <Dialog.Icon icon="alert" size={50} />
        <Dialog.Title style={styles.dialogTitle}>Surgio un error!</Dialog.Title>
        <Dialog.Content>
          <Text style={{alignSelf: "center"}}>El código de autenticación ha expirado, reenvíe el correo de verificación</Text>
          <TouchableOpacity onPress={changeCodigoExpirado} style={{alignSelf: "center", paddingTop: 30}} >
            <Text style={{fontSize: 20}}>Aceptar</Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>

      {/* Dialogo de codigo incorrecto */}
      <Dialog visible={codigoIncorrecto} onDismiss={changeCodigoIncorrecto}>
        <Dialog.Icon icon="alert" size={50} />
        <Dialog.Title style={styles.dialogTitle}>Surgio un error!</Dialog.Title>
        <Dialog.Content>
          <Text style={{alignSelf: "center"}}>Codigo de autenticación incorrecto</Text>
          <TouchableOpacity onPress={changeCodigoIncorrecto} style={{alignSelf: "center", paddingTop: 30}} >
            <Text style={{fontSize: 20}}>Aceptar</Text>
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

            {/* Dialogo de codigo incorrecto */}
            <Dialog visible={correoNoRegistrado} onDismiss={changeNoRegistrado}>
              <Dialog.Icon icon="alert" size={50} />
              <Dialog.Title style={styles.dialogTitle}>Surgio un error!</Dialog.Title>
              <Dialog.Content>
                <Text style={{ alignSelf: "center" }}>
                Correo no registrado
                </Text>
                <TouchableOpacity
                  onPress={changeNoRegistrado}
                  style={{ alignSelf: "center", paddingTop: 30 }}
                >
                  <Text style={{ fontSize: 20 }}>Aceptar</Text>
                </TouchableOpacity>
              </Dialog.Content>
            </Dialog>

            {/* Dialogo de codigo incorrecto */}
            <Dialog visible={correoNoValido} onDismiss={changeNoValido}>
              <Dialog.Icon icon="alert" size={50} />
              <Dialog.Title style={styles.dialogTitle}>Surgio un error!</Dialog.Title>
              <Dialog.Content>
                <Text style={{ alignSelf: "center" }}>
                Correo no valido
                </Text>
                <TouchableOpacity
                  onPress={changeNoValido}
                  style={{ alignSelf: "center", paddingTop: 30 }}
                >
                  <Text style={{ fontSize: 20 }}>Aceptar</Text>
                </TouchableOpacity>
              </Dialog.Content>
            </Dialog>

            {/* Dialogo de codigo incorrecto */}
            <Dialog visible={contrasenaInvalida} onDismiss={changeContrasenaInvalida}>
              <Dialog.Icon icon="alert" size={50} />
              <Dialog.Title style={styles.dialogTitle}>Surgio un error!</Dialog.Title>
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
  dialogTitle: {
    textAlign: 'center',
  },
});
