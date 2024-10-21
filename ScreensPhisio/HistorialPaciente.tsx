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
  Platform,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import stylesHistorial from "../styles/stylesHistorial";
import Icon from "react-native-vector-icons/FontAwesome";
import IconFoundation from "react-native-vector-icons/Foundation";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";
import DateTimePicker from "@react-native-community/datetimepicker";

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
const anchoGrafico =
  datosGrafico.reduce((max, item) => Math.max(max, item.labels.length), 0) * 50;
const screenWidth = Dimensions.get("window").width;
const width = Math.max(screenWidth, anchoGrafico);

export default function HistorialPaciente({
  route,
  navigation,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<RouteParams, "params">;
}) {
  const [modalSearch, setModalSearch] = useState(false);
  const [modalShare, setModalShare] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [showPicker1, setShowPicker1] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [date, setDate] = useState(new Date());
  const [Fecha1, setFecha1] = useState("");
  const [Fecha2, setFecha2] = useState("");
  const [selected, setSelected] = React.useState([]);
  const [value, setValue] = useState("");
  const options = [
    { label: "Agregar expediente", value: "CrearExpediente" },
    { label: "Agregar escala", value: "CrearEscala" },
    { label: "Compartir perfil", value: "CompartirPerfil" },
    { label: "Eliminar paciente", value: "EliminarPaciente" },
    // Agrega más opciones según sea necesario
  ];
  const paciente = route.params.paciente;

  const togglePicker1 = () => {
    setShowPicker1(!showPicker1);
  };
  const togglePicker2 = () => {
    setShowPicker2(!showPicker2);
  };

  const onChange1 = ({ type }: { type: string }, selectedDate: any) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        togglePicker1();
        setFecha1(
          currentDate.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        );
      }
    } else {
      togglePicker1();
    }
  };

  const onChange2 = ({ type }: { type: string }, selectedDate: any) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        togglePicker2();
        setFecha2(
          currentDate.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        );
      }
    } else {
      togglePicker2();
    }
  };

  //funciones para modal de busqueda
  const openSearch = () => {
    setModalSearch(true);
  };

  const closeSearch = () => {
    setModalSearch(false);
  };

  const handleSearch = () => {
    // Lógica para manejar la búsqueda
    console.log("Buscar:", Fecha1, Fecha2);
    closeSearch();
  };

  //funciones para modal de compartir perfil
  const openShare = () => {
    setModalShare(true);
  };

  const closeShare = () => {
    setModalShare(false);
  };

  const handleShareProfile = () => {
    console.log("Compartir perfil");
    closeShare();
  };

  //funciones para modal de eliminar paciente
  const openDelete = () => {
    setModalDelete(true);
  };

  const closeDelete = () => {
    setModalDelete(false);
  };

  const handleDeletePatient = () => {
    console.log("Eliminar paciente");
    closeDelete();
  };

  const handleChange = (item: { label: string; value: string }) => {
    if (item.value === "CompartirPerfil") {
      openShare();
    } else if (item.value === "EliminarPaciente") {
      openDelete();
    } else {
      navigation.navigate(item.value);
    }
    setValue(item.value);
  };

  const openWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?phone=${
      paciente.numeroContacto
    }}&text=tu%20cita%20es%20el%20${encodeURIComponent(paciente.proximaCita)}`;
    Linking.openURL(url).catch((err: any) =>
      console.error("Error al abrir WhatsApp", err)
    );
  };

  return (
    <SafeAreaView style={stylesHistorial.container}>
      <View style={stylesHistorial.datosPaciente}>
        <View style={stylesHistorial.viewpaciente}>
          {paciente.imagenPerfil ? (
            <Image
              source={{ uri: paciente.imagenPerfil }}
              style={{
                alignItems: "flex-end",
                width: windowWidth * 0.19,
                height: windowHeight * 0.095,
                borderRadius: 100,
                marginLeft: -30,
              }}
            />
          ) : (
            <Icon
              name="user-circle"
              size={70}
              color="#FFFFFF"
              style={{
                alignItems: "flex-end",
                width: windowWidth * 0.19,
                height: windowHeight * 0.095,
                marginLeft: -30,
                borderRadius: 100,
              }}
            />
          )}
          <Text
            style={{
              marginLeft: -40,
              alignSelf: "flex-start",
              color: "black",
              fontWeight: "bold",
            }}
          >
            {" "}
            {paciente.nombre}
          </Text>
          <Text
            style={{
              marginLeft: -40,
              alignSelf: "flex-start",
              color: "black",
              fontWeight: "bold",
            }}
          >
            {" "}
            {paciente.apellidos}
          </Text>
        </View>
        <View style={{ alignItems: "flex-start", paddingTop: 20 }}>
          <Text style={{ marginLeft: 10, color: "black" }}>
            proxima cita: {paciente.proximaCita}
          </Text>
          <Text style={{ marginLeft: 10, color: "black" }}>
            localidad: {paciente.ubicacion}
          </Text>
          <View>
            <Text style={{ marginLeft: 10, color: "black" }}>
              {paciente.numeroContacto}
            </Text>
          </View>
          <Text style={{ marginLeft: 10, color: "black" }}>
            correo@direccion.com
          </Text>
          <Dropdown
            data={options}
            labelField="label"
            valueField="value"
            value={value}
            onChange={handleChange}
            style={stylesHistorial.dropdown} // Ajusta el estilo del dropdown aquí
            renderRightIcon={() => (
              <Icon name="ellipsis-h" size={20} color="black" />
            )} // Usa el icono de tres puntos aquí
            containerStyle={stylesHistorial.dropdownContainer} // Ajusta el estilo del contenedor aquí
          />
        </View>
      </View>
      <View style={stylesHistorial.menuPaciente}>
        <ScrollView style={stylesHistorial.scrollView}>
          <TouchableOpacity
            style={stylesHistorial.containerPdf}
            onPress={openSearch}
          >
            <IconFoundation name="page-search" size={50} color="#000" />
            <View style={{ paddingLeft: 10 }}>
              <Text>Buscar Expedientes</Text>
            </View>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalSearch}
            onRequestClose={closeSearch}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Buscar Expedientes</Text>
                <TouchableOpacity 
                style={{paddingTop: 5}}
                onPress={togglePicker1}>
                  {showPicker1 && (
                    <DateTimePicker
                      mode="date"
                      display="spinner"
                      value={date} // Provide a value prop with the current date or a specific date
                      onChange={onChange1}
                    />
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="Desde"
                    value={Fecha1}
                    onChangeText={setFecha1}
                    editable={false}
                  />
                </TouchableOpacity>
                {showPicker2 && (
                  <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date} // Provide a value prop with the current date or a specific date
                    onChange={onChange2}
                  />
                )}
                <TouchableOpacity 
                style={{paddingTop: 5}}
                onPress={togglePicker2}>
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
                    onPress={closeSearch}
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
          <TouchableOpacity
            style={stylesHistorial.containerPdf}
            onPress={() => navigation.navigate("VisualizarPdf")}
          >
            <Icon name="file-text-o" size={50} color="#000" />
            <View style={{ paddingLeft: 5 }}>
              <Text>Fecha de creacion:</Text>
              <Text>Evaluacion realizada</Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity style={{ flex: 1 }}> */}
          {data.map((scale, index) => (
            <View key={index}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  marginVertical: 10,
                }}
              >
                {scale.name}
              </Text>
              <ScrollView horizontal={true}>
                <LineChart
                  data={{
                    labels: scale.citas.map((cita) => cita.fecha),
                    datasets: [
                      {
                        data: scale.citas.map((cita) => cita.rango),
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
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
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

        {/* Modal para eliminar paciente */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalShare}
          onRequestClose={() => {
            setModalShare(!modalShare);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text>Compartir perfil del paciente</Text>
              <Button
                title="Cerrar"
                onPress={() => {
                  // Aquí puedes manejar la acción de compartir el perfil
                  setModalShare(false);
                }}
              />
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalDelete}
          onRequestClose={closeDelete}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                ¿Seguro que quieres eliminar este perfil?
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={closeDelete}
                >
                  <Text style={styles.textStyle}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSearch]}
                  onPress={handleDeletePatient}
                >
                  <Text style={styles.textStyle}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* Modal para eliminar paciente */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
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
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    width: 200,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#f44336",
  },
  buttonSearch: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
