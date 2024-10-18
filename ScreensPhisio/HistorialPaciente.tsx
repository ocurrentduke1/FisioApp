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
  TextInput,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import stylesHistorial from "../styles/stylesHistorial";
import Icon from "react-native-vector-icons/FontAwesome";
import IconFoundation from "react-native-vector-icons/Foundation";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Define your route params structure here. This is an example.
type RouteParams = {
  params: {
    paciente: {
      nombre: string;
      imagenPerfil: string;
      apellidos: string;
      fechaNacimiento: string;
      sexo: string;
      ubicacion: string;
      proximaCita: string;
      numeroContacto: string;
    };
  };
};

const data = [
  {
    name: "Escala Daniels",
    citas: [
      { fecha: "2024-04-15", rango: 3 },
      { fecha: "2024-04-16", rango: 5 },
      { fecha: "2024-04-17", rango: 7 },
      { fecha: "2024-04-18", rango: 2 },
      { fecha: "2024-04-19", rango: 4 },
    ],
  },
  {
    name: "Escala de dolor",
    citas: [
      { fecha: "2024-04-15", rango: 2 },
      { fecha: "2024-04-16", rango: 3 },
      { fecha: "2024-04-17", rango: 4 },
      { fecha: "2024-04-18", rango: 5 },
      { fecha: "2024-04-19", rango: 6 },
    ],
  },
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

const datosGrafico = data.map((item) => procesarDatosCitas(item.citas));
const anchoGrafico = datosGrafico.reduce((max, item) => Math.max(max, item.labels.length), 0) * 50;
const screenWidth = Dimensions.get("window").width;
const width = Math.max(screenWidth, anchoGrafico);

export default function HistorialPaciente({
  route,
  navigation,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<RouteParams, "params">;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [Fecha1, setFecha1] = useState('');
  const [Fecha2, setFecha2] = useState('');
  const [modalSearch, setModalSearch] = useState(false);
  const { paciente } = route.params;
  const [value, setValue] = useState("");
  const options = [
    { label: "Agregar expediente", value: "CrearExpediente" },
    { label: "Agregar escala", value: "CrearEscala" },
    { label: "Compartir perfil", value: "CompartirPerfil" },
    { label: "Eliminar paciente", value: "EliminarPaciente" },
    // Agrega más opciones según sea necesario
  ];

  const openModal = () => {
    setModalSearch(true);
  };

  const closeModal = () => {
    setModalSearch(false);
  };

  const handleSearch = () => {
    // Lógica para manejar la búsqueda
    console.log('Buscar:', Fecha1, Fecha2);
    closeModal();
  };

  const handleShareProfile = () => {
    setModalVisible(true);
  };

  const handleChange = (item: { label: string; value: string }) => {
    if (item.value === 'CompartirPerfil') {
      handleShareProfile();
    } else {
      navigation.navigate(item.value);
    }
    setValue(item.value);
  };

  const openWhatsApp = () => {
    const url = "https://api.whatsapp.com/send?phone=523322112278&text=tu%20cita%20es%20el%20${encodeURIComponent(proximaCita)}";
    Linking.openURL(url).catch((err: any) => console.error("Error al abrir WhatsApp", err));
  };

  return (
    <SafeAreaView style={stylesHistorial.container}>
      <View style={stylesHistorial.datosPaciente}>
        <View style={stylesHistorial.viewpaciente}>
          {paciente.imagenPerfil ? (
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
              )}
          <Text style={{ marginLeft: -40, alignSelf: 'flex-start', color: "white", fontWeight: "bold" }}> {paciente.nombre}</Text>
          <Text style={{ marginLeft: -40, alignSelf: 'flex-start', color: "white", fontWeight: "bold" }}> {paciente.apellidos}</Text>
        </View>
        <View style={{ alignItems: "flex-start", paddingTop: 20 }}>
          <Text style={{ marginLeft: 10, color: "white" }}>proxima cita: {paciente.proximaCita}</Text>
          <Text style={{ marginLeft: 10, color: "white" }}>localidad: {paciente.ubicacion}</Text>
          <TouchableOpacity onPress={openWhatsApp}>
          <Text style={{ marginLeft: 10, color: "white" }}>{paciente.numeroContacto}</Text>
          </TouchableOpacity>
          <Text style={{ marginLeft: 10, color: "white" }}>correo@direccion.com</Text>
          <Dropdown
            data={options}
            labelField="label"
            valueField="value"
            value={value}
            onChange={handleChange}
            style={stylesHistorial.dropdown} // Ajusta el estilo del dropdown aquí
            renderRightIcon={() => (
              <Icon name="ellipsis-h" size={20} color="white" />
            )} // Usa el icono de tres puntos aquí
            containerStyle={stylesHistorial.dropdownContainer} // Ajusta el estilo del contenedor aquí
          />
        </View>
      </View>
      <View style={stylesHistorial.menuPaciente}>
        <ScrollView style={stylesHistorial.scrollView}>
          <TouchableOpacity
            style={stylesHistorial.containerPdf}
            onPress={openModal}>
            <IconFoundation name="page-search" size={50} color="#000" />
            <View style={{ paddingLeft: 10 }}>
              <Text>Buscar Expedientes</Text>
            </View>
          </TouchableOpacity>
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalSearch}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Buscar Expedientes</Text>
              <TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Desde"
                value={Fecha1}
                onChangeText={setFecha1}
                editable={false}
              />
              </TouchableOpacity>
              <TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Hasta"
                value={Fecha2}
                onChangeText={setFecha2}
                editable={false}
              />
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={closeModal}
                >
                  <Text style={styles.textStyle}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSearch]}
                  onPress={handleSearch}
                >
                  <Text style={styles.textStyle}>Buscar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
          {/* <TouchableOpacity
            style={stylesHistorial.containerPdf}
            onPress={() => navigation.navigate("VerExpedientePaciente")}
          >
            <Icon name="file-text-o" size={50} color="#000" />
            <View style={{ paddingLeft: 5 }}>
              <Text>Fecha de creacion:</Text>
              <Text>Evaluacion realizada</Text>
            </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity style={{ flex: 1 }}> */}
          {data.map((scale, index) => (
          <View key={index}>
            <Text style={{ fontSize: 20, textAlign: 'center', marginVertical: 10 }}>
              {scale.name}
            </Text>
          <ScrollView horizontal={true}>
            <LineChart
              data={{
                labels: scale.citas.map(cita => cita.fecha),
                datasets: [
                  {
                    data: scale.citas.map(cita => cita.rango),
                  },
                ],
              }}
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
          </View>
        ))}
        </ScrollView>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text>Compartir perfil del paciente</Text>
            <Button
              title="Cerrar"
              onPress={() => {
                // Aquí puedes manejar la acción de compartir el perfil
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: 200,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#f44336',
  },
  buttonSearch: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});