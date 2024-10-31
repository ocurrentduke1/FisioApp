import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { Agenda } from "react-native-calendars";
import { FAB } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { TextInput } from "react-native-paper";

export default function AgendaCitas({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patient, setPatient] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pacientes, setPacientes] = useState<
    {
      nombre: string;
      apellidos: string;
      proximaCita: string;
      HoraCita: string;
      ubicacion: string;
      imagenPerfil?: string;
    }[]
  >([]);

  const openVisible = () => {
    setModalVisible(true);
  };

  const closeVisible = () => {
    setModalVisible(false);
  };
  //funciones para modal de busqueda
  const openAdd = () => {
    setModalAdd(true);
  };

  const closeAdd = () => {
    setModalAdd(false);
  };

  const handleSaveAppointment = () => {
    console.log(`cita creada`);
    console.log(`Fecha: ${selectedDate}`);
    console.log(`Paciente: ${patient}`);
    console.log(`Lugar: ${location}`);
    console.log(`Hora: ${time}`);
    setModalAdd(false);
  };

  {
    /* metodos para editar fecha*/
  }
  const handleEditPress = () => {
    setModalVisible(true);
  };

  const handleDateTimeChange = () => {
    console.log(`Fecha actualizada a: ${selectedDate}`);
    console.log(`Hora actualizada a: ${selectedTime}`);
    setModalVisible(false);
  };

  {
    /* metodos para crear fecha*/
  }

  useEffect(() => {
    let datosDelServidor = [
      {
        nombre: "Juan",
        apellidos: "Pérez",
        proximaCita: "2024-08-06",
        ubicacion: "Ciudad Central",
        HoraCita: "11:00",
        imagenPerfil:
          "https://imgs.search.brave.com/8ExXYVb8oTB9fWM1IvIH-QRrnpIM5ifHCiXrTuchK-I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aXN0b2NrcGhvdG8u/Y29tL3Jlc291cmNl/cy9pbWFnZXMvSG9t/ZVBhZ2UvRm91clBh/Y2svQzItUGhvdG9z/LWlTdG9jay0xMzU2/MTk3Njk1LmpwZw",
      },
      {
        nombre: "Ana",
        apellidos: "Gómez",
        proximaCita: "2024-08-12",
        HoraCita: "12:00",
        ubicacion: "Ciudad Norte",
      },
      {
        nombre: "Ana",
        apellidos: "Gómez",
        proximaCita: "2024-08-08",
        HoraCita: "13:00",
        ubicacion: "Ciudad Norte",
      },
      {
        nombre: "Ana",
        apellidos: "Gómez",
        proximaCita: "2024-08-23",
        HoraCita: "10:00",
        ubicacion: "Ciudad Norte",
      },
      // Añade más pacientes según sea necesario
    ];

    setPacientes(datosDelServidor);
  }, []);

  const transformarDatosParaAgenda = () => {
    return pacientes.reduce((acc: { [key: string]: any }, paciente) => {
      const {
        proximaCita,
        nombre,
        apellidos,
        ubicacion,
        imagenPerfil,
        HoraCita,
      } = paciente;
      const cita = {
        name: `${nombre} ${apellidos}`,
        hora: HoraCita,
        location: ubicacion,
        image: imagenPerfil,
      };

      if (acc[proximaCita]) {
        acc[proximaCita].push(cita);
      } else {
        acc[proximaCita] = [cita];
      }

      return acc;
    }, {});
  };

  const handleDayPress = (day: {
    dateString: React.SetStateAction<string>;
  }) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={transformarDatosParaAgenda()}
        
        selected={selectedDate}
        renderItem={(
          item: {
            name:
              | string
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
            location:
              | string
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
            hora:
              | string
              | number
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
            image: any;
          },
          isFirst: any
        ) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => handleEditPress()}
            >
              <View style={{ marginHorizontal: 10 }}>
                {item.image ? (
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                  />
                ) : (
                  <Icon name="user-circle" size={50} color="#000" />
                )}
              </View>
              <View>
                <Text>cita con: {item.name}</Text>
                <Text>localidad: {item.location}</Text>
                <Text>Hora: {item.hora}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        onDayPress={handleDayPress}
        // Puedes añadir más propiedades específicas de Agenda aquí
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Editar Cita</Text>
            <TextInput
              mode="outlined"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              label="Fecha Actual"
              style={styles.input}
              value={selectedDate}
              onChangeText={setSelectedDate}
              editable={false}
            />
            <TextInput
              mode="outlined"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              label="Nueva Fecha"
              style={styles.input}
              value={selectedDate}
              onChangeText={setSelectedDate}
            />
            <TextInput
              mode="outlined"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              label="Nueva Hora"
              style={styles.input}
              value={selectedTime}
              onChangeText={setSelectedTime}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={closeVisible}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonSearch]}
                onPress={handleDateTimeChange}
              >
                <Text style={styles.textStyle}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para agregar una cita */}
      <FAB
        icon="calendar-plus"
        color="#000"
        style={styles.fab}
        onPress={() => openAdd()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAdd}
        onRequestClose={closeAdd}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Agregar Cita</Text>
            <TextInput
              mode="outlined"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              label="Fecha"
              style={styles.input}
              value={selectedDate}
              onChangeText={setSelectedDate}
              editable={false}
            />
            <TextInput
              mode="outlined"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              label="Paciente"
              style={styles.input}
              value={patient}
              onChangeText={setPatient}
            />
            <TextInput
              mode="outlined"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              label="Lugar"
              style={styles.input}
              value={location}
              onChangeText={setLocation}
            />
            <TextInput
              mode="outlined"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              label="Hora"
              style={styles.input}
              value={time}
              onChangeText={setTime}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={closeAdd}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonSearch]}
                onPress={handleSaveAppointment}
              >
                <Text style={styles.textStyle}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Esto hace que el contenedor use todo el espacio disponible
    justifyContent: "flex-start", // Centra el contenido verticalmente
    alignItems: "stretch", // Centra el contenido horizontalmente
    backgroundColor: "#2196F3",
  },
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
  input: {
    height: 40,
    margin: 5,
    padding: 10,
    width: "80%",
    color: "black",
    backgroundColor: "white",
  },
  buttonClose: {
    backgroundColor: "#f44336",
  },
  textStyle: {
    color: "white",
  },
  calendarStyle: {
    width: "100%",
  },
  itemContainer: {
    backgroundColor: "white", // Color de fondo del contenedor de cada item
    margin: 10, // Margen alrededor del contenedor para separarlo de otros elementos
    borderRadius: 5, // Bordes redondeados
    padding: 10, // Espaciado interno para no pegar el contenido a los bordes
    elevation: 3, // Sombra para Android
    shadowColor: "#000", // Color de la sombra para iOS
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra para iOS
    shadowOpacity: 0.1, // Opacidad de la sombra para iOS
    shadowRadius: 3, // Radio de difuminado de la sombra para iOS
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#2196F3",
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFF",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonSearch: {
    backgroundColor: "#2196F3",
  },
});
