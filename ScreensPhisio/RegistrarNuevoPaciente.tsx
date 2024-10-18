import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import stylesHistorial from "../styles/stylesHistorial";
import { BACKEND_URL } from "@env";
import axios from "axios";
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Suponiendo que este es tu componente
const RegistrarNuevoPaciente = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const [userID, setUserID] = useState<string | null>(null);
  // Estado que almacena los datos de los pacientes
  const [nombre, setNombre] = useState<string>("");
  const [apellidos, setApellidos] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [calle, setCalle] = useState<string>("");
  const [sexo, setSexo] = useState<string>("");
  const [edad, setEdad] = useState<string>("");

  const DataPatient = {
    nombre: nombre,
    apellido: apellidos,
    telefono: telefono,
    domicilio: calle,
    sexo: sexo,
    edad: Number(edad),
  };
  
  const isFormValid = () => {
    return nombre !== '' && apellidos !== '' && telefono !== '' && calle !== '' && edad !== '' && sexo !== '';
  };

  const RegisterPatient = async () => {
      try {
        const response = await axios.post(BACKEND_URL + '/vincular-paciente', {
          ...DataPatient, idFisio: Number(userID)
        });
 
       if(response.data.code == 500){
         Alert.alert("Error en el servidor, intentelo mas tarde");
         return;
       }
       navigation.navigate( 'mainFisio' );
       console.log(response.data.code);
     } catch (error) {
       console.error(error);
     }
};

useEffect(() => {

  const getUserID = async () => {
    const id = await AsyncStorage.getItem('idSesion');
    setUserID(id);
  };

  getUserID();

}, []);

  return (
    <SafeAreaView style={stylesHistorial.container}>
      <View style={[stylesHistorial.containerRegistro, {flex: 1,
    alignItems: 'center',
    justifyContent: 'center',}]}>
        <ScrollView style={stylesHistorial.scrollViewRegistro}>
          <TextInput 
          value={nombre}
            style={stylesHistorial.input}
            placeholder="Nombre(s) del paciente"
            placeholderTextColor="rgba(255, 255, 255, 0.8)"
            onChangeText={(value) => setNombre(value)}
          />
          <TextInput 
          value={apellidos}
            style={stylesHistorial.input}
            placeholder="Apellidos del paciente"
            placeholderTextColor="rgba(255, 255, 255, 0.8)"
            onChangeText={(value) => setApellidos(value)}
          />
          <TextInput 
          value={telefono}
            style={stylesHistorial.input}
            placeholder="Telefono del paciente"
            keyboardType="numeric"
            maxLength={10}
            placeholderTextColor="rgba(255, 255, 255, 0.8)"
            onChangeText={(value) => setTelefono(value)}
          />
          <TextInput 
          value={calle}
            style={stylesHistorial.input}
            placeholder="Calle y numero de casa"
            placeholderTextColor="rgba(255, 255, 255, 0.8)"
            onChangeText={(value) => setCalle(value)}
          />
          <TextInput 
          value={edad}
            style={stylesHistorial.input}
            placeholder="Edad del paciente"
            keyboardType="numeric"
            placeholderTextColor="rgba(255, 255, 255, 0.8)"
            onChangeText={(value) => setEdad(value)}
          />
          <View>
          <Text style={[styles.label, {color: "white"}]}>Sexo</Text>
          <RadioButton.Group
            onValueChange={newValue => setSexo(newValue)}
            value={sexo}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="Masculino" 
              color="white"
              uncheckedColor="#BDBDBD"/>
              <Text style={{color: "white"}}>Masculino</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="Femenino"
              color="white"
              uncheckedColor="#BDBDBD"/>
              <Text style={{color: "white"}}>Femenino</Text>
            </View>
          </RadioButton.Group>
        </View>
        </ScrollView>
      </View>
      <TouchableOpacity style={stylesHistorial.button} onPress={RegisterPatient} disabled={!isFormValid()}>
        <Text style={stylesHistorial.buttonText}>Guardar Registro</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default RegistrarNuevoPaciente;
