import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import stylesLogin from "./styles/stylesLogin";
import { TextInput } from "react-native-paper";

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
    <SafeAreaView style={stylesLogin.container}>
      <Text style={{ fontSize: 30, color: "#FFFFFF" }}> Registrar cuenta</Text>
      <Image
        style={stylesLogin.imageRegistrar}
        source={require("./assets/logoFisioApp.png")}
      />

      <View style={stylesLogin.datosRegistrar}>
        <TextInput 
          mode = "outlined"
          style={stylesLogin.TextInput}
          label="Correo Electrónico"
          keyboardType="email-address"
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput //textbox telefono
          mode = "outlined"
          style={stylesLogin.TextInput}
          label="Número de teléfono"
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          keyboardType="numeric"
          maxLength={10}
          onChangeText={(text) => setPhone(text)}
          value={phone}
        />
          <TextInput
            mode = "outlined"
            style={stylesLogin.TextInput}
            label = "Contraseña"
            outlineColor="#c5cae9"
            activeOutlineColor="#c5cae9"
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text)}
            value={password}
            right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"}
          onPress={() => setShowPassword(!showPassword)}/>}
          />
        
        
          <TextInput
          mode = "outlined"
          label = "Confirmar contraseña"
            style={stylesLogin.TextInput}
            outlineColor="#c5cae9"
            activeOutlineColor="#c5cae9"
            secureTextEntry={!ShowConfirm}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            right ={<TextInput.Icon icon={ShowConfirm ? "eye-off" : "eye"} onPress={() => setShowConfirm(!ShowConfirm)}/>}
          />
        
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00BCD4",
    width: windowWidth * 0.8,
    borderRadius: 25,
    marginBottom: 20,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 16 },
    shadowOpacity: 0.5, 
    shadowRadius: 6, 
    elevation: 8,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: "white",
  },
  title: {
    fontSize: 22, fontWeight: "bold", alignSelf: "center", color: "white", paddingTop: 20
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
