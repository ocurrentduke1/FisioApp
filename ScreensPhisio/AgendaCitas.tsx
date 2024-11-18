import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from "react-native";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { Agenda } from "react-native-calendars";
import { FAB } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/Foundation";
import { TextInput } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Swipeable } from "react-native-gesture-handler";
import { SelectList } from "react-native-dropdown-select-list";
import { Animated } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "@env";
import axios from "axios";

export default function AgendaCitas({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [userID, setUserID] = useState<string | null>(null);

  const obtenerCitas = async () => {
    if (userID) {
      const response = await axios.get(`${BACKEND_URL}/citas/${userID}`);

      if (response.data.code == 500) {
        Alert.alert("Error al encontrar citas");
        return;
      }

      return response.data.citas || [];
    }
  };

  const getUserID = async () => {
    const id = await AsyncStorage.getItem("idSesion");
    console.log("Fetched UserID:", id); // Verifica que el ID se obtenga correctamente
    setUserID(id);
  };

  const fetchData = async () => {
    const datosDelServidor = await obtenerCitas();
    setCitas(datosDelServidor);
  };

  useFocusEffect(
    useCallback(() => {
      getUserID();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      if (userID) {
        fetchData();
      }
    }, [userID])
  );

  useEffect(() => {
    // Funcion para obtener ID de la sesion
    const getUserID = async () => {
      const id = await AsyncStorage.getItem("idSesion");
      setUserID(id);
    };
    getUserID();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [showPicker1, setShowPicker1] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patient, setPatient] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [citas, setCitas] = useState<
    {
      nombre: string;
      apellido: string;
      proximaCita: string;
      hora: string;
      ubicacion: string;
      imagenPerfil?: string;
    }[]
  >([]);

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const data = [
    { key: "1", value: "10:30" },
    { key: "2", value: "11:00" },
    { key: "3", value: "11:30" },
    { key: "4", value: "12:00" },
    { key: "5", value: "12:30" },
    { key: "6", value: "13:00" },
  ];

  const dataPatients = [
    { key: "1", value: "juan" },
    { key: "2", value: "ramon" },
    { key: "3", value: "maria" },
    { key: "4", value: "juana" },
    { key: "5", value: "carmen" },
    { key: "6", value: "gerardo" },
  ];

  const dataUbicacion = [
    { key: "1", value: "Cita a domicilio" },
    { key: "2", value: "Cita en clinica" },
    { key: "3", value: "ubicacion personalizada" },
  ];

  const togglePicker1 = () => {
    setShowPicker1(!showPicker1);
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

  //funciones para modal de eliminar
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

  const handleSaveAppointment = () => {
    console.log(`cita creada`);
    console.log(`Fecha: ${selectedDate}`);
    console.log(`Paciente: ${patient}`);
    console.log(`Lugar: ${location}`);
    console.log(`Hora: ${time}`);
    setModalAdd(false);
    setLocation("");
    setPatient("");
    setTime("");
  };

  const handleDateTimeChange = () => {
    console.log(`Fecha actualizada a: ${selectedDate}`);
    console.log(`Hora actualizada a: ${selectedTime}`);
    setModalVisible(false);
  };

  {
    /* metodos para crear fecha*/
  }

  const onChange1 = ({ type }: { type: string }, selectedDate: any) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        togglePicker1();
        setNewDate(
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

  const transformarDatosParaAgenda = () => {
    if (Array.isArray(citas) && citas.length > 0) {
      return citas.reduce((acc: { [key: string]: any }, cita) => {
        const { proximaCita, nombre, apellido, ubicacion, imagenPerfil, hora } =
          cita;

        const transformedCita = {
          name: `${nombre} ${apellido}`,
          hora: hora,
          location: ubicacion,
          image: imagenPerfil,
          date: proximaCita,
        };

        if (acc[proximaCita]) {
          acc[proximaCita].push(transformedCita);
        } else {
          acc[proximaCita] = [transformedCita];
        }

        return acc;
      }, {});
    }

    return {};
  };

  const handleDayPress = (day: {
    dateString: React.SetStateAction<string>;
  }) => {
    setSelectedDate(day.dateString);
  };

  {
    /* metodos para editar fecha*/
  }
  const handleEditPress = (appointment) => {
    setSelectedAppointment(appointment); // Guarda toda la información de la cita
    setSelectedDate(appointment.date); // Extrae la fecha
    setSelectedTime(appointment.hora); // Extrae la hora
    setModalVisible(true); // Abre el modal de edición
  };

  const validateDataRegister = () => {
    if (location === "" || patient === "" || time === "") {
      return false;
    } else {
      return true;
    }
  };

  const renderRightActions = (progress, dragX, item) => {
    const translateX = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[styles.rightAction, { transform: [{ translateX }] }]}
      >
        <TouchableOpacity style={styles.removeAction} onPress={openDelete}>
          <Icon2 name="calendar-remove" size={30} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editAction}
          onPress={() => handleEditPress(item)}
        >
          <Icon2 name="calendar-edit" size={30} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.expedientAction}
          onPress={() => navigation.navigate("HistorialPaciente")}
        >
          <Icon3 name="page-search" size={30} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={transformarDatosParaAgenda()}
        selected={selectedDate}
        renderEmptyData={() => 
          <Animated.View style={{
            flex: 1,
            justifyContent: "center",
            alignSelf: 'center',
          }}>
            <Icon name="calendar-check-o" size={150} style={{
              opacity: .8,
              alignSelf: 'center',
            }}></Icon>
            <Text style={{
              marginTop: 20,
              fontWeight: 'bold',
              fontSize: 25
            }}>¡Sin citas programadas!</Text>
          </Animated.View>
        }
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
            date: string;
          },
          isFirst: any
        ) => (
          <GestureHandlerRootView>
            <Swipeable
              containerStyle={styles.itemContainer}
              friction={2}
              enableTrackpadTwoFingerGesture
              renderRightActions={(progress, dragX) =>
                renderRightActions(progress, dragX, item)
              }
              onSwipeableOpen={() => {}}
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    marginHorizontal: 10,
                    paddingRight: 10,
                    paddingTop: 10,
                  }}
                >
                  {item.image ? (
                    <Image
                      source={{
                        uri: item.image,
                      }}
                      style={{ width: 50, height: 50, borderRadius: 25 }}
                    />
                  ) : (
                    <Icon name="user-circle" size={50} color="#000" />
                  )}
                </View>
                <View>
                  <Text style={{ fontWeight: "bold" }}> {item.name}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      padding: 2,
                    }}
                  >
                    <Icon name="map-marker" size={20} color="#000" />
                    <Text> {item.location}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      padding: 2,
                    }}
                  >
                    <Icon
                      name="clock-o"
                      size={18}
                      color="#000"
                      style={{ marginRight: 2 }}
                    />
                    <Text> {item.hora}</Text>
                  </View>
                </View>
              </View>
            </Swipeable>
          </GestureHandlerRootView>
        )}
        onDayPress={handleDayPress}
      />

      {/* Modal para editar una cita */}
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
              value={selectedDate || ""}
              onChangeText={setSelectedDate}
              editable={false}
            />
            <TouchableOpacity style={{ padding: 10 }} onPress={togglePicker1}>
              {showPicker1 && (
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={date} // Provide a value prop with the current date or a specific date
                  onChange={onChange1}
                />
              )}
              <TextInput
                mode="outlined"
                outlineColor="#c5cae9"
                activeOutlineColor="#c5cae9"
                label="Nueva Fecha"
                style={styles.input}
                value={newDate}
                onChangeText={setSelectedDate}
                readOnly={true}
              />
            </TouchableOpacity>
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
              style={[styles.input, {height: 20}]}
              value={selectedDate}
              onChangeText={setSelectedDate}
              editable={false}
            />
            <SelectList
              setSelected={(val: string) => {
                setPatient(val);
              }}
              data={dataPatients}
              save="value"
              search={false}
              dropdownItemStyles={{
                backgroundColor: "#FFFFFF",
                width: "auto",
                height: 50,
                borderBottomWidth: 1,
                borderBottomColor: "#000000",
                justifyContent: "center",
                alignItems: "center",
              }}
              dropdownStyles={{
                backgroundColor: "#FFFFFF",
                width: "auto",
                height: 110,
              }}
              boxStyles={{
                backgroundColor: "#FFFFFF",
                width: 200,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                margin: 5,
              }}
              placeholder="Selecciona un paciente"
            />

            <SelectList
              setSelected={(val: string) => {
                setLocation(val);
              }}
              data={dataUbicacion}
              save="value"
              search={false}
              dropdownItemStyles={{
                backgroundColor: "#FFFFFF",
                width: "auto",
                height: 50,
                borderBottomWidth: 1,
                borderBottomColor: "#000000",
                justifyContent: "center",
                alignItems: "center",
              }}
              dropdownStyles={{
                backgroundColor: "#FFFFFF",
                width: "auto",
                height: 110,
              }}
              boxStyles={{
                backgroundColor: "#FFFFFF",
                width: 200,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                margin: 5,
              }}
              placeholder="Ubicacion de cita"
            />

            <SelectList
              setSelected={(val: string) => {
                setTime(val);
              }}
              data={data}
              save="value"
              search={false}
              dropdownItemStyles={{
                backgroundColor: "#FFFFFF",
                width: "auto",
                height: 50,
                borderBottomWidth: 1,
                borderBottomColor: "#000000",
                justifyContent: "center",
                alignItems: "center",
              }}
              dropdownStyles={{
                backgroundColor: "#FFFFFF",
                width: "auto",
                height: 110,
              }}
              boxStyles={{
                backgroundColor: "#FFFFFF",
                width: 200,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                margin: 5,
              }}
              placeholder="Selecciona una hora"
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
                disabled={!validateDataRegister()}
              >
                <Text style={styles.textStyle}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal para eliminar cita */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDelete}
        onRequestClose={closeDelete}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              ¿Seguro que quieres eliminar esta fecha?
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
    width: 200,
    color: "black",
    backgroundColor: "white",
    paddingHorizontal: 10,
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
    flexDirection: "column", // Alineación de los elementos internos en fila
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
    backgroundColor: "#2cbdbf",
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
  rightAction: {
    width: 90,
  },
  removeAction: {
    backgroundColor: "#f44336",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  editAction: {
    backgroundColor: "#0058b3",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  expedientAction: {
    backgroundColor: "#8dc40d",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  separator: {
    width: "100%",
    borderTopWidth: 1,
  },
  swipeable: {
    height: 50,

    alignItems: "center",
  },
});
