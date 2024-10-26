import { StatusBar } from "expo-status-bar";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  Modal,
  StyleSheet,
  Button,
} from "react-native";
import stylesLogin from "./styles/stylesLogin";
import { NavigationProp } from "@react-navigation/native";
import { BACKEND_URL } from "@env";
import JWT, { SupportedAlgorithms } from 'expo-jwt';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-paper";

export function Login({ navigation }: { navigation: NavigationProp<any> }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);
  const [authCode, setAuthCode] = useState(['', '', '', '', '']);
  const [modalAuth, setModalAuth] = useState(false);
  const inputRefs = useRef<any[]>([]);

  // useEffect(() => {
  //   const checkExpiration = async () => {
  //     const exp = Number(await AsyncStorage.getItem("expiracion"));
  //     console.log("expiracion", await AsyncStorage.multiGet(["expiracion", "idSesion", "tipoUsuario"]));
  //     if (exp) {
  //       const expDate = new Date(exp * 1000);
  //       if (expDate < new Date()) {
  //         await AsyncStorage.removeItem("idSesion");
  //         await AsyncStorage.removeItem("expiracion");

  //         navigation.navigate("login");
  //         return;
  //       }
  //       const tipoUsuario = await AsyncStorage.getItem("tipoUsuario");
  //       navigation.navigate(tipoUsuario === "fisioterapeuta" ? "mainFisio" : "mainPaciente");
  //     }
  //   };

  //   checkExpiration();
  // }, []);

  const LoginData = {
    email: email,
    password: password,
  };

  const loggin = async () => {
    try {
      const response = await axios.post(BACKEND_URL + "/login", {
        email,
        password,
      });

      if (response.data.code == 404 || response.data.code == 500) {
        Alert.alert("Correo o contraseña incorrectos");
        return;
      }

      const { key, token } = response.data;

      const jwtDecode = JWT.decode(token, key);
      await AsyncStorage.setItem("idSesion", jwtDecode.id.toString());
      await AsyncStorage.setItem("tipoUsuario", jwtDecode.tipoUsuario);
      if (jwtDecode?.exp) {
        await AsyncStorage.setItem("expiracion", jwtDecode.exp.toString());
      }

      console.log("jwt local: ", JSON.stringify(jwtDecode));
      console.log("jwt servidor", response.data);

      navigation.navigate(
        jwtDecode.tipoUsuario === "fisioterapeuta"
          ? "mainFisio"
          : "mainPaciente"
      );
    } catch (error) {
      console.error(error);
    }
  };

  // const loggin = () => {
  //   if (
  //     (email === "Fisio" && password === "123") ||
  //     (email === "fisio" && password === "123")
  //   ) {
  //     if(auth){
  //       navigation.navigate("mainFisio");
  //     }else{
  //       setModalAuth(true);
  //     }
      
  //   } else if (email === "p" && password === "123") {
  //     if(auth){
  //       navigation.navigate("mainPaciente");
  //     }else{
  //       setModalAuth(true);
  //     }
      
  //   } else {
  //     Alert.alert("Correo o contraseña incorrectos");
  //   }
  // };

  const handleAuthCodeChange = (index: number, value: string) => {
    const newAuthCode = [...authCode];
    newAuthCode[index] = value;
    setAuthCode(newAuthCode);

    if (value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const verifyAuthCode = () => {
    const enteredCode = authCode.join('');
    if (enteredCode === '12345') {
      setModalAuth(false);
      setAuth(true);
      navigation.navigate("mainFisio");
    } else {
      Alert.alert("Código de autenticación incorrecto");
    }
  };

  //console.log(BACKEND_URL + '/login');

  const validateData = () => {
    if (email === "" || password === "") {
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

      <View style={stylesLogin.datos}>
        <TextInput
          mode="outlined"
          label="Correo Electrónico"
          value={email}
          onChangeText={(text) => setEmail(text)}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          style={stylesLogin.TextInput}
        />
        <TextInput //textbox ingresar Contraseña
          mode="outlined"
          value={password}
          label= "Contraseña"
          onChangeText={(value) => setPassword(value)}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          style={stylesLogin.TextInput}
          secureTextEntry={!showPassword}
          right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"}
          onPress={() => setShowPassword(!showPassword)}/>}
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
          }}
        >
          {" "}
          Olvide mi contraseña
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
            <Text style={styles.modalText}>Introduzca el código de autenticación</Text>
            <View style={styles.codeContainer}>
                {authCode.map((code: string, index: number) => (
                <TextInput
                  mode = "outlined"
                  key={index}
                  value={code}
                  onChangeText={(value: string) => handleAuthCodeChange(index, value)}
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
            <View style={{flexDirection: "row"}}>
            <TouchableOpacity style={styles.Cancelbutton} onPress={() => setModalAuth(false)}>
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
            loggin();
          } else {
            alert("Datos incompletos");
          }
        }}
        disabled={!validateData()}
      >
        <Text style={{ fontSize: 16, color: "white" }}>Iniciar sesion</Text>
      </TouchableOpacity>

      <TouchableOpacity //boton de registrar cuenta
        style={stylesLogin.Secondarybutton}
        onPress={() => navigation.navigate("registrar")}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Registrar</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  codeInput: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: '#3F51B5',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  Cancelbutton: {
    backgroundColor: "#f44336",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});
