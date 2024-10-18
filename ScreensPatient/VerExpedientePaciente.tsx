import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
  Modal,
  StyleSheet,
  Button,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import stylesHistorial from "../styles/stylesHistorial";
import Icon from "react-native-vector-icons/FontAwesome";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


// type RouteParams = {
//   params: {
//     paciente: {
//       nombre: string;
//       imagenPerfil: string;
//       apellidos: string;
//       fechaNacimiento: string;
//       sexo: string;
//       ubicacion: string;
//       proximaCita: string;
//       numeroContacto: string;
//     };
//   };
// };

const citas = [
  {
    fecha: "2024-04-15",
    rango: 3,
  },
  {
    fecha: "2024-04-15",
    rango: 5,
  },
  {
    fecha: "2024-04-15",
    rango: 7,
  },
  {
    fecha: "2024-04-15",
    rango: 2,
  },
  {
    fecha: "2024-04-15",
    rango: 4,
  },
  {
    fecha: "2024-04-15",
    rango: 3,
  },
  {
    fecha: "2024-04-15",
    rango: 5,
  },
  {
    fecha: "2024-04-15",
    rango: 7,
  },
  {
    fecha: "2024-04-15",
    rango: 2,
  },
  {
    fecha: "2024-04-15",
    rango: 4,
  },
  {
    fecha: "2024-04-15",
    rango: 3,
  },
  {
    fecha: "2024-04-15",
    rango: 5,
  },
  {
    fecha: "2024-04-15",
    rango: 7,
  },
  {
    fecha: "2024-04-15",
    rango: 2,
  },
  {
    fecha: "2024-04-15",
    rango: 4,
  },
  // Añade más pacientes según sea necesario
];

// Función para procesar los datos
const procesarDatosCitas = (citas: any[]) => {
  // Extraer las fechas para los labels
  const labels = citas.map(
    (cita) => cita.fecha.split("-")[2] + "/" + cita.fecha.split("-")[1]
  ); // Formato DD/MM
  // Extraer los valores para el dataset
  const data = citas.map((cita) => cita.rango);

  return {
    labels,
    datasets: [{ data }],
  };
};

const datosGrafico = procesarDatosCitas(citas);
const anchoGrafico = datosGrafico.labels.length * 50;
const screenWidth = Dimensions.get("window").width;
const width = Math.max(screenWidth, anchoGrafico);

export default function VerExpedientePaciente({
  // route,
  navigation,
}: {
  navigation: NavigationProp<any>;
  // route: RouteProp<RouteParams, "params">;
}) {
  const [value, setValue] = useState("");

  return (
    <SafeAreaView style={stylesHistorial.container}>
      <View style={stylesHistorial.datosPaciente}>
        <View style={stylesHistorial.viewpaciente}>
          {/* {paciente.imagenPerfil ? (
                <Image
                  source={{ uri: paciente.imagenPerfil }}
                  style={{alignItems: "flex-end",
                    width: windowWidth * 0.19,
                    height: windowHeight * 0.095,
                    borderRadius: 100,
                    marginLeft: -30,}}
                />
              ) : (
                <Icon name="user-circle" size={70} color="#FFFFFF" style={{alignItems: "flex-end",
                  width: windowWidth * 0.19,
                  height: windowHeight * 0.095,
                  marginLeft: -30,
                  borderRadius: 100,}} />
              )} */}
              <Icon name="user-circle" size={70} color="#FFFFFF" style={{alignItems: "flex-end",
                  width: windowWidth * 0.19,
                  height: windowHeight * 0.095,
                  marginLeft: -30,
                  borderRadius: 100,}} />
          <Text style={{ marginLeft: -40, alignSelf: 'flex-start', color: "white", fontWeight: "bold" }}> jorge</Text>
          <Text style={{ marginLeft: -40, alignSelf: 'flex-start', color: "white", fontWeight: "bold" }}> perez</Text>
        </View>
        <View style={{ alignItems: "flex-start", paddingTop: 20 }}>
          <Text style={{ marginLeft: 10, color: "white" }}>proxima cita: sin definir</Text>
          <Text style={{ marginLeft: 10, color: "white" }}>localidad: guadalajara</Text>
          <View>
          <Text style={{ marginLeft: 10, color: "white" }}>3322783345</Text>
          </View>
          <Text style={{ marginLeft: 10, color: "white" }}>correo@direccion.com</Text>
        </View>
      </View>
      <View style={stylesHistorial.menuPaciente}>
        <ScrollView style={stylesHistorial.scrollView}>
          <TouchableOpacity
            style={stylesHistorial.containerPdf}
            onPress={() => navigation.navigate("VerExpedientePaciente")}
          >
            <Icon name="file-text-o" size={50} color="#000" />
            <View style={{ paddingLeft: 5 }}>
              <Text>Fecha de creacion:</Text>
              <Text>Evaluacion realizada</Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity style={{ flex: 1 }}> */}
          <ScrollView horizontal={true}>
            <LineChart
              data={datosGrafico}
              width={width} // from react-native
              height={220}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#91FFFA",
                backgroundGradientFrom: "#009688",
                backgroundGradientTo: "#4CAF50",
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForLabels: {
                  fontSize: "10", // Ajusta este valor según necesites
                },
              }}
              bezier // optional, adds a bezier curve
              style={{
                marginRight: 10,
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </ScrollView>
          {/* </TouchableOpacity> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}