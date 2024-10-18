import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import stylesMain from "../styles/stylesMain";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";

// Suponiendo que este es tu componente
const PacientesCompartidos = ({ navigation }: { navigation: NavigationProp<any> }) => {
  // Estado que almacena los datos de los pacientes
  const [pacientes, setPacientes] = useState<
    {
      nombre: string;
      apellidos: string;
      proximaCita: string;
      ubicacion: string;
      imagenPerfil?: string;
      numeroContacto: string;
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
        proximaCita: "2023-04-15",
        ubicacion: "Ciudad Central",
        imagenPerfil:
          "https://imgs.search.brave.com/8ExXYVb8oTB9fWM1IvIH-QRrnpIM5ifHCiXrTuchK-I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aXN0b2NrcGhvdG8u/Y29tL3Jlc291cmNl/cy9pbWFnZXMvSG9t/ZVBhZ2UvRm91clBh/Y2svQzItUGhvdG9z/LWlTdG9jay0xMzU2/MTk3Njk1LmpwZw",
        rangoDaniels: 3,
        numeroContacto: "3322112278",
      },
      {
        nombre: "Ana",
        apellidos: "Gómez",
        proximaCita: "2023-04-20",
        ubicacion: "Ciudad Norte",
        numeroContacto: "1234567890",
      },
      {
        nombre: "Ana",
        apellidos: "Gómez",
        proximaCita: "2023-04-20",
        ubicacion: "Ciudad Norte",
        numeroContacto: "0987654321",
      },
      {
        nombre: "Ana",
        apellidos: "Gómez",
        proximaCita: "2023-04-20",
        ubicacion: "Ciudad Norte",
        numeroContacto: "5555555555", 
      },
      {
        nombre: "Ana",
        apellidos: "Gómez",
        proximaCita: "2023-04-20",
        ubicacion: "Ciudad Norte",
        numeroContacto: "9999999999", 
      },
      // Add more patients as needed
    ];

    setPacientes(datosDelServidor);
  }, []);

  return (
    <SafeAreaView style={stylesMain.container}>
      <ScrollView style={stylesMain.scrollView}>
        {pacientes.map((paciente, index) => (
          <TouchableOpacity
            key={index}
            style={stylesMain.datosFisio}
            onPress={() => navigation.navigate("HistorialPaciente", {paciente})}
          >
            <View style={stylesMain.casillaPerfilPaciente}>
            {paciente.imagenPerfil ? (
                <Image
                  source={{ uri: paciente.imagenPerfil }}
                  style={stylesMain.imagenpaciente}
                />
              ) : (
                <Icon name="user-circle" size={70} color="#FFFFFF" style={stylesMain.imagenpaciente} />
              )}
              <View>
                <Text style={stylesMain.datosPacienteMenuFisio}>
                   {paciente.nombre} {paciente.apellidos}
                </Text>
                <Text style={stylesMain.datosPacienteMenuFisio}>
                  proxima cita: {paciente.proximaCita}
                </Text>
                <Text style={stylesMain.datosPacienteMenuFisio}>
                  localidad: {paciente.ubicacion}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
};

export default PacientesCompartidos;
