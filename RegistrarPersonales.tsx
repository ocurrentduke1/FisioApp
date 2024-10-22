import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import axios from "axios";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  Button,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { BACKEND_URL } from "@env";
import stylesLogin from "./styles/stylesLogin";
import { TextInput } from "react-native-paper";

export default function RegistrarPersonales({
  route,navigation,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}) {

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [selected, setSelected] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [age, setAge] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [sex, setSex] = useState<string | null>(null);

  const { registerData } = route.params as { registerData: any };
  
  const registerDataPhisio = {
    ...registerData,
    nombre: nombre,
    apellido: apellido,
  };
  const registerDataPatient = {
    ...registerData,
    nombre: nombre,
    apellido: apellido,
    domicilio: address,
    edad: age,
    sexo: sex
  };

  // const registerUser = async () => {
  //   const route =
  //     selected === "fisioterapeuta"
  //       ? "/registrar-fisioterapeuta"
  //       : "/registrar-paciente";
  //   if (selected === "fisioterapeuta") {
  //     navigation.navigate("registrarTarjeta", {
  //       registerDataPhisio: registerDataPhisio,
  //     });
  //   } else if (selected === "paciente") {
  //     const response = await axios.post(
  //       BACKEND_URL + route,
  //       registerDataPatient,
  //       {
  //         headers: { "Access-Control-Allow-Origin": "*" },
  //       }
  //     );
  //     if (response.data.code == 400) {
  //       console.log(response.data);
  //       Alert.alert("Correo ya registrado");
  //       return;
  //     }
  //     console.log(response.data);
  //     Alert.alert("Cuenta creada exitosamente");
  //     navigation.navigate("login");
  //   }
  // };

  const registerUser = async () => {
    if (selected === "paciente") {
      console.log("Registrando paciente");
      console.log(registerDataPatient);
      navigation.navigate("Login", {
        registerDataPatient: registerDataPatient,
      });
    } else {
      console.log("Registrando fisioterapeuta");
      console.log(registerDataPhisio);
      navigation.navigate("registrarTarjeta", {
        registerDataPhisio: registerDataPhisio,
      });
    }
  };

  const data = [
    { key: "1", value: "fisioterapeuta" },
    { key: "2", value: "paciente" },
  ];

  const dataSex = [
    { key: "1", value: "Masculino" },
    { key: "2", value: "Femenino" },
    { key: "3", value: "Otro" },
  ];
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleRegister = async (val: string) => {
    if (val === "paciente") {
      toggleModal();
    }
  };

  const handlePatientRegister = async () => {
    const registerData = {
      age,
      address,
      sex,
      // Otros datos necesarios
    };
    toggleModal();
  };

  const validateInputs = () => {
    if (!nombre || !apellido || !selected) {
      return false;
    }

    if (selected === "paciente") {
      if (!address || !age || !sex || !nombre || !apellido || !selected) {
        return false;
      }
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
        <TextInput //textbox ingresar correo
          mode= "outlined"
          label = "Nombre(s)"
          style={stylesLogin.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={setNombre}
        />
        <TextInput //textbox ingresar correo
          mode= "outlined"
          label = "Apellidos"
          style={stylesLogin.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={setApellido}
        />
        <SelectList
          setSelected={(val: string) => {
            setSelected(val);
            handleRegister(val);
          }}
          data={data}
          save="value"
          dropdownItemStyles={{
            backgroundColor: "#FFFFFF",
            width: 300,
            height: 50,
            borderBottomWidth: 1,
            borderBottomColor: "#000000",
            justifyContent: "center",
            alignItems: "center",
          }}
          dropdownStyles={{
            backgroundColor: "#FFFFFF",
            width: 300,
            height: 110,
          }}
          boxStyles={{
            backgroundColor: "#FFFFFF",
            width: 300,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
          placeholder="Selecciona tu rol en la app"
        />

        <Modal visible={isModalVisible} transparent={true}>
          <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <View
            style={{
              backgroundColor: "white",
              width: "80%",
              height: "60%",
              padding: 20,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>Registrar Paciente</Text>
            <TextInput
              mode= "outlined"
              label = "Edad"
              value={age}
              onChangeText={setAge}
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              keyboardType="numeric"
              style={stylesLogin.TextInput}
            />
            <TextInput
            mode= "outlined"
              label="Domicilio"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              value={address}
              onChangeText={setAddress}
              style={stylesLogin.TextInput}
            />
            <SelectList
              setSelected={(val: string) => {
                setSex(val);
              }}
              data={dataSex}
              save="value"
              dropdownItemStyles={{
                backgroundColor: "#FFFFFF",
                width: 300,
                height: 50,
                borderBottomWidth: 1,
                borderBottomColor: "#000000",
                justifyContent: "center",
                alignItems: "center",
              }}
              dropdownStyles={{
                backgroundColor: "#FFFFFF",
                width: 300,
                height: 110,
              }}
              boxStyles={{
                backgroundColor: "#FFFFFF",
                width: 300,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
              }}
              placeholder="Selecciona tu sexo"
            />
            <TouchableOpacity //boton de registrar cuenta
              style={{
                width: "100%",
                padding: 15,
                backgroundColor: "#00bcd4",
                borderRadius: 20,
                alignItems: "center",
                marginVertical: 10,
              }}
              onPress={handlePatientRegister} // Función que se ejecuta cuando se presiona el botón
            >
              <Text style={{ color: "#FFFFFF", fontSize: 16 }}>
                Registrar Datos
              </Text>
            </TouchableOpacity>
            <Button title="Cerrar" onPress={toggleModal} />
          </View>
          </View>
        </Modal>
      </View>

      <TouchableOpacity //boton de inicio de sesion
        style={stylesLogin.buttonRegistrar}
        onPress={() => {
          registerUser();
        }}
        disabled={!validateInputs()}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Siguiente</Text>
      </TouchableOpacity>

      <TouchableOpacity //boton de registrar cuenta
        style={stylesLogin.SecondarybuttonRegistrar}
        onPress={() => navigation.navigate("registrar")} // Función que se ejecuta cuando se presiona el botón
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Regresar</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}


