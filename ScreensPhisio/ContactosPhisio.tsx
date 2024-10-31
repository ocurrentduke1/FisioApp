import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import stylesMain from "../styles/stylesMain";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { FAB } from 'react-native-paper';

// Suponiendo que este es tu componente
const ContactosPhisio = ({ navigation }: { navigation: NavigationProp<any> }) => {
  // Estado que almacena los datos de los pacientes
  const [pacientes, setPacientes] = useState<
    {
      nombre: string;
      apellidos: string;
      pacientesCompartidos: string;

      imagenPerfil?: string;
    }[]
  >([]);

  // Simulación de la carga de datos desde el servidor
  useEffect(() => {
    // Aquí deberías hacer la petición al servidor para obtener los datos de los pacientes
    // y luego actualizar el estado `pacientes` con esos datos
    // Por ahora, vamos a simularlo con datos de ejemplo
    const datosDelServidor = [
      {
        nombre: "Juan",
        apellidos: "Pérez",
        pacientesCompartidos: "juan, ana, maria,",
        imagenPerfil:
          "https://imgs.search.brave.com/8ExXYVb8oTB9fWM1IvIH-QRrnpIM5ifHCiXrTuchK-I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aXN0b2NrcGhvdG8u/Y29tL3Jlc291cmNl/cy9pbWFnZXMvSG9t/ZVBhZ2UvRm91clBh/Y2svQzItUGhvdG9z/LWlTdG9jay0xMzU2/MTk3Njk1LmpwZw",
        rangoDaniels: 3,
        },
      {
        nombre: "Ana",
        apellidos: "Gómez",
        pacientesCompartidos: "juan, ana, maria,",
      },
      {
        nombre: "Ana",
        apellidos: "Gómez",
        pacientesCompartidos: "juan, ana, maria",
      },
      {
        nombre: "Ana",
        apellidos: "Gómez",
        pacientesCompartidos: "juan, ana, maria",
      },
      {
        nombre: "Ana",
        apellidos: "Gómez",
        pacientesCompartidos: "juan, ana, maria",
      },
      // Añade más pacientes según sea necesario
    ];

    setPacientes(datosDelServidor);
  }, []);

  return (
    <SafeAreaView style={stylesMain.container}>
      <ImageBackground source={require("../assets/logo_blanco.png")} resizeMode="contain" style={styles.image} imageStyle={{opacity: 0.5}}>
      <ScrollView style={stylesMain.scrollView}>
        {pacientes.map((paciente, index) => (
          <TouchableOpacity
            key={index}
            style={stylesMain.datosFisio}
             onPress={() => navigation.navigate("PacientesCompartidos", {paciente})}
          >
            <View style={stylesMain.casillaPerfilPaciente}>
            {paciente.imagenPerfil ? (
                <Image
                  source={{ uri: paciente.imagenPerfil }}
                  style={stylesMain.imagenpaciente}
                />
              ) : (
                <Icon name="user-circle" size={70} color="#000" style={stylesMain.imagenpaciente} />
              )}
              <View style={{flexWrap: "wrap", justifyContent: "flex-start",}}>
                <Text style={stylesMain.datosPacienteMenuFisio}>
                   {paciente.nombre} {paciente.apellidos}
                </Text>
                <Text style={stylesMain.datosPacienteMenuFisio}>
                  Compartidos: {paciente.pacientesCompartidos}
                </Text>
                {/* <Text style={stylesMain.datosPacienteMenuFisio}>
                   {paciente.}
                </Text> */}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FAB
    icon="account-plus"
    color="#000"
    
    style={styles.fab}
    onPress={() => navigation.navigate("BuscarContactos")}
  />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFF",
  },
});


export default ContactosPhisio;
