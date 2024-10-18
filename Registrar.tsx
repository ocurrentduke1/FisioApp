import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import stylesLogin from "./styles/stylesLogin";

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

  const registerData = {
    email: email,
    phone: phone,
    password: password,
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

  return (
    <View style={stylesLogin.container}>
      <Text style={{ fontSize: 30, color: "#FFFFFF" }}> Registrar cuenta</Text>
      <Image
        style={stylesLogin.imageRegistrar}
        source={require("./assets/logoFisioApp.png")}
      />

      <View style={stylesLogin.datosRegistrar}>
        <TextInput 
          style={stylesLogin.inputRegistrar} //estilo de la caja de texto
          placeholder="Correo Electronico"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput //textbox telefono
          style={stylesLogin.inputRegistrar}
          placeholder="Telefono"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          keyboardType="numeric"
          maxLength={10}
          onChangeText={(text) => setPhone(text)}
          value={phone}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={stylesLogin.inputContrasena}
            placeholder="Contraseña"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <Icon
            name={showPassword ? "eye" : "eye-slash"}
            size={30}
            color="#FFFFFF"
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={stylesLogin.inputContrasena}
            placeholder="Confirmar contraseña"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
            secureTextEntry={!ShowConfirm}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
          />
          <Icon
            name={ShowConfirm ? "eye" : "eye-slash"}
            size={30}
            color="#FFFFFF"
            onPress={() => setShowConfirm(!ShowConfirm)}
          />
          
        </View>
        <View style= {{alignItems: 'flex-start', width: 280, marginTop: 15}}>
        <Text style={{fontSize: 12, color: '#FFFFFF', textAlign: 'justify'}}>
        Debe contener las siguientes características:
        </Text>
        <Text style={{fontSize: 12, color: '#FFFFFF', textAlign: 'justify'}}>
        - Contener 8-16 caracteres
        </Text>
        <Text style={{fontSize: 12, color: '#FFFFFF', textAlign: 'justify'}}>
        - Contener mínimo 1 minúscula
        </Text>
        <Text style={{fontSize: 12, color: '#FFFFFF', textAlign: 'justify'}}>
        - Contener mínimo 1 mayúscula
        </Text>
        <Text style={{fontSize: 12, color: '#FFFFFF', textAlign: 'justify'}}>
        - Contener mínimo 1 número
        </Text>
        </View>
      </View>
      <TouchableOpacity //boton de inicio de sesion
        style={stylesLogin.buttonRegistrar}
        onPress={() => {
          if (validateData()) {
            if (validatePassword()) {
              console.log(registerData);
              navigation.navigate('registrarPersonales', { registerData: registerData });
              //console.log(registerData);
            } else {
              Alert.alert(
                "Error",
                "La contraseña no cumple con los requisitos minimos o no coinciden"
              );
            }
            // if (!validateEmail(email)) {
            //   Alert.alert("Error", "Correo electrónico no válido");
            // }
            // if(phone.length < 10){
            //   Alert.alert("Error", "Número de teléfono no válido")
            // }
          } else {
            Alert.alert(
              "Error",
              "Los datos ingresados no coinciden o no son correctos"
            );
          }
        }}
        disabled={!validateData()}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Siguiente</Text>
      </TouchableOpacity>

      <TouchableOpacity //boton de registrar cuenta
        style={stylesLogin.SecondarybuttonRegistrar}
        onPress={() => navigation.navigate("login")} 
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Regresar</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}
