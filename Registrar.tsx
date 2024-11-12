import { StatusBar } from "expo-status-bar";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Modal,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import stylesLogin from "./styles/stylesLogin";
import { TextInput } from "react-native-paper";
import { BACKEND_URL } from "@env";
import { LinearGradient } from "expo-linear-gradient";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Registrar({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [ShowConfirm, setShowConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authCode, setAuthCode] = useState(["", "", "", "", ""]);
  const [modalAuth, setModalAuth] = useState(false);
  const inputRefs = useRef<any[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [ShowRequirements, setShowRequirements] = useState(false);
  const [showConfirmRequirements, setShowConfirmRequirements] = useState(false);
  const [showEmailRequirements, setShowEmailRequirements] = useState(false);

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
      BACKEND_URL + "/verificar-correo-codigo",
      {
        codigo: enteredCode,
        destinatario: email,
      }
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

    setModalAuth(false);
    navigation.navigate("registrarPersonales", {
      registerData: registerData,
    });
  };

  {
    /* Función para enviar el correo de verificación */
  }

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

  const registerData = {
    email: email,
    phone: phone,
    password: password,
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
  const validateData = () => {
    if (
      email === "" ||
      phone === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      return false;
    }
    return true;
  };

  const hasErrors = () => {
    return !email.includes("@");
  };

  const sendEmail = async () => {
    const response = await axios.post(
      BACKEND_URL + "/enviar-correo-verificacion",
      {
        destinatario: email,
      }
    );

    console.log("enviado");

    if (response.data.code == 409) {
      Alert.alert("Error", "Correo ya registrado");
      return false;
    }
    if (response.data.code == 500) {
      Alert.alert("Error", "No se pudo enviar el correo de verificación");
      return false;
    }

    setModalAuth(true);
  };

  return (
    <SafeAreaView style={stylesLogin.container}>
      <LinearGradient
        colors={['rgba(62,238,255,0.8)', 'transparent']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradient}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
        style={styles.container}
      >

        <Image
          style={[stylesLogin.image, { width: 180, height: 180 }]}
          source={require("./assets/logoFisioApp.png")}
        />
        
        <Text style={{
          color: '#FFF',
          height: 50,
          textShadowColor: '#000',
          textShadowRadius: 20,
          fontSize: 30,
          fontWeight: 'bold'
          }}>{'¡Empieza hoy mismo!'}
        </Text>


        <View style={[stylesLogin.datos, { height: 350 }]}>
          <TextInput
            mode="outlined"
            style={stylesLogin.TextInput}
            label="Correo Electrónico"
            keyboardType="email-address"
            outlineColor="#c5cae9"
            activeOutlineColor="#c5cae9"
            onFocus={() => setShowEmailRequirements(true)}
            onBlur={() => setShowEmailRequirements(false)}
            onChangeText={(text) => setEmail(text)}
            value={email}
            left={<TextInput.Icon
              style={{ marginTop: 30 }} 
              icon="email" />}
          />

          {showEmailRequirements && (
            <View style={{ marginVertical: 1 }}>
              {emailRequirements.map(
                (req, index) =>
                  !req.isValid && (
                    <Text key={index} style={{ 
                        color: "#FF0000", 
                        fontSize: 12,
                        fontWeight: 'bold',
                        textShadowColor: '#000',
                        textShadowRadius: 6,   
                      }}>
                      {req.label}
                    </Text>
                  )
              )}
            </View>
          )}


          <TextInput //textbox telefono
            mode="outlined"
            style={stylesLogin.TextInput}
            label="Número de teléfono"
            outlineColor="#c5cae9"
            activeOutlineColor="#c5cae9"
            keyboardType="numeric"
            maxLength={10}
            onChangeText={(text) => setPhone(text)}
            value={phone}
            left={<TextInput.Icon
              style={{ marginTop: 30 }} 
              icon="phone" />}
          />
          <TextInput
            mode="outlined"
            style={stylesLogin.TextInput}
            label="Contraseña"
            onFocus={() => setShowRequirements(true)}
            onBlur={() => setShowRequirements(false)}
            outlineColor="#c5cae9"
            activeOutlineColor="#c5cae9"
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text)}
            value={password}
            right={
              <TextInput.Icon
                style= {{
                  marginTop: 20,
                }}
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            left={<TextInput.Icon
              style={{ marginTop: 30 }} 
              icon="lock" />}
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
            style={stylesLogin.TextInput}
            outlineColor="#c5cae9"
            activeOutlineColor="#c5cae9"
            secureTextEntry={!ShowConfirm}
            onFocus={() => setShowConfirmRequirements(true)}
            onBlur={() => setShowConfirmRequirements(false)}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            right={
              <TextInput.Icon
                style= {{
                  marginTop: 20,
                }}
                icon={ShowConfirm ? "eye-off" : "eye"}
                onPress={() => setShowConfirm(!ShowConfirm)}
              />
            }
            left={<TextInput.Icon
              style={{ marginTop: 30 }} 
              icon="lock" />}
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

        <TouchableOpacity //boton de inicio de sesion
          style={[stylesLogin.button, { paddingHorizontal: 115 }]}
          onPress={() => {
            if (validatePassword()) {
              if (!validateEmail(email)) {
                Alert.alert("Error", "Correo electrónico no válido");
              } else {
                sendEmail();
                setModalAuth(true);
              }
            } else {
              Alert.alert(
                "Error",
                "La contraseña no cumple con los requisitos minimos o no coinciden"
              );
            }
          }}
          disabled={!validateData()}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Siguiente</Text>
        </TouchableOpacity>

        <TouchableOpacity //boton de registrar cuenta
          style={[stylesLogin.Secondarybutton, { paddingHorizontal: 110 }]}
          onPress={() => navigation.navigate("login")}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Regresar</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200
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
