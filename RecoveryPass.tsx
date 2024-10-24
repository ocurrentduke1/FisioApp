import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import stylesLogin from "./styles/stylesLogin";
import { NavigationProp } from "@react-navigation/native";
import { TextInput } from "react-native-paper";

export function RecoveryPass({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [email, setEmail] = useState("");

  const validateInput = () => {
    if (email === "") {
      return false;
    }else{
      return true;
    }
  }

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

      <TouchableOpacity //boton de recuperar contraseña
        style={[stylesLogin.button, { paddingHorizontal: 70}]}
        onPress={() =>
          Alert.alert(
            "Recuperar contraseña",
            "El correo a sido enviado, revisa tu bandeja de entrada o spam."
          )
        }
        disabled={!validateInput()}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 17 }}>Recuperar contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity //boton de registrar cuenta
        style={[stylesLogin.Secondarybutton, { paddingHorizontal: 115 }]}
        onPress={() => navigation.navigate("login")} // Función que se ejecuta cuando se presiona el botón
      >
        <Text style={{ color: "#FFFFFF", fontSize: 17 }}>Regresar</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}
