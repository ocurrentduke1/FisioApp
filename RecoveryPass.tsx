import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import stylesLogin from "./styles/stylesLogin";
import { NavigationProp } from "@react-navigation/native";

export function RecoveryPass({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={stylesLogin.container}>
      <Image
        style={stylesLogin.image}
        source={require("./assets/logoFisioApp.png")}
      />

      <View style={stylesLogin.datos}>
        <TextInput //textbox ingresar correo
          style={stylesLogin.input}
          placeholder="Correo Electronico"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          keyboardType="email-address"
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
        style={stylesLogin.buttonRecovery}
        onPress={() =>
          Alert.alert(
            "Recuperar contraseña",
            "El correo a sido enviado, revisa tu bandeja de entrada o spam."
          )
        }
      >
        <Text style={{ color: "#FFFFFF", fontSize: 17 }}>Recuperar contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity //boton de registrar cuenta
        style={stylesLogin.SecondarybuttonRegistrar}
        onPress={() => navigation.navigate("login")} // Función que se ejecuta cuando se presiona el botón
      >
        <Text style={{ color: "#FFFFFF", fontSize: 17 }}>Regresar</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}
