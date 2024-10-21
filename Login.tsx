import { StatusBar } from "expo-status-bar";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  Platform,
} from "react-native";
import stylesLogin from "./styles/stylesLogin";
import { NavigationProp } from "@react-navigation/native";
import { BACKEND_URL } from "@env";
import JWT, { SupportedAlgorithms } from "expo-jwt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-paper";

export function Login({ navigation }: { navigation: NavigationProp<any> }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginData = {
    email: email,
    password: password,
  };

  // const loggin = async () => {
  //   try {
  //     const response = await axios.post(BACKEND_URL + "/login", {
  //       email,
  //       password,
  //     });
  //     // const { key } = response.data;

  //     // JWT.encode({ foo: "bar" }, key, { algorithm: SupportedAlgorithms.HS512 });
  //     // //Aquí puedes almacenar el token de forma segura
  //     // await AsyncStorage.setItem("jwt", key);
  //     // Alert.alert("Login successful");
  //     // console.log(key);
  //     // console.log(response.data);

  //     if (response.data.code == 404 || response.data.code == 500) {
  //       Alert.alert("Correo o contraseña incorrectos");
  //       return;
  //     }
  //     const idSesion = response.data.id;
  //     //const idSesion = "1";
  //     await AsyncStorage.setItem("idSesion", idSesion);
  //     //console.log(idSesion + " LOGIN");

  //     //navigation.navigate( 'mainFisio' );
  //     navigation.navigate(
  //       response.data.tipoUsuario === "fisioterapeuta"
  //         ? "mainFisio"
  //         : "mainPaciente"
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const loggin = () => {
    if (
      (email === "Fisio" && password === "123") ||
      (email === "fisio" && password === "123")
    ) {
      navigation.navigate("mainFisio");
    } else if (email === "p" && password === "123") {
      // loggin();
      navigation.navigate("mainPaciente");
    } else {
      Alert.alert("Correo o contraseña incorrectos");
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
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={{ width: 300, marginBottom: 10, paddingTop: 10 }}
        />
        <TextInput //textbox ingresar Contraseña
          mode="outlined"
          value={password}
          label= "Password"
          onChangeText={(value) => setPassword(value)}
          style={{ width: 300, marginBottom: 10, paddingTop: 10 }}
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
