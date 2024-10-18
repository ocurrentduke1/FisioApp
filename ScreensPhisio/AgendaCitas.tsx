import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Button,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { Agenda } from "react-native-calendars";

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
  const openModal = () => {
    setModalAdd(true);
  };

  const closeModal = () => {
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

  useEffect(() => {
    let datosDelServidor = [
      {
        nombre: "Juan",
        apellidos: "Pérez",
        proximaCita: "2024-08-06",
        ubicacion: "Ciudad Central",
        HoraCita: "11:00",
        imagenPerfil: "https://example.com/perfil/juan.jpg",
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
              | number
              | boolean
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
              | number
              | boolean
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
              | boolean
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
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => handleEditPress()}>
                <Text>cita con: {item.name}</Text>
                <Text>localidad: {item.location}</Text>
                <Text>Hora: {item.hora}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        onDayPress={handleDayPress}
        // Puedes añadir más propiedades específicas de Agenda aquí
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text>Editar cita</Text>
          <TextInput
            style={styles.input}
            placeholder="Nueva fecha de la cita"
            value={selectedDate}
            onChangeText={setSelectedDate}
          />
          <TextInput
            style={styles.input}
            placeholder="Nueva hora de la cita"
            value={selectedTime}
            onChangeText={setSelectedTime}
          />
          <TouchableOpacity
            style={styles.buttonClose}
            onPress={handleDateTimeChange}
          >
            <Text>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonClose}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal para agregar una cita */}
      <Button title="Agregar Cita" onPress={openModal} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAdd}
        onRequestClose={() => {
          setModalVisible(!modalAdd);
        }}
      >
        <View style={styles.modalView}>
          <Text>Agregar Cita</Text>
          <TextInput
            style={styles.input}
            placeholder="Fecha"
            value={selectedDate}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Paciente"
            value={patient}
            onChangeText={setPatient}
          />
          <TextInput
            style={styles.input}
            placeholder="Lugar"
            value={location}
            onChangeText={setLocation}
          />
          <TextInput
            style={styles.input}
            placeholder="Hora"
            value={time}
            onChangeText={setTime}
          />
          <TouchableOpacity
            style={styles.buttonClose}
            onPress={handleSaveAppointment}
          >
            <Text>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonClose} onPress={closeModal}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
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
  modalView: {
    marginTop: 22,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    top: "30%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
    color: "black",
  },
  buttonClose: {
    backgroundColor: "blue",
    padding: 10,
    marginTop: 10,
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
});
