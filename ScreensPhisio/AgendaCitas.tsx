import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
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
import { Animated, useWindowDimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "@env";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";

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
    setUserID(id);
  };

  const fetchData = async () => {
    const pacientes = await getPatients();
    setDataPatients(pacientes);
    
    const datosDelServidor = await obtenerCitas();
    setCitas(datosDelServidor);
    
  };

  const getPatients = async () => {
    if (userID) {
      const response = await axios.post(BACKEND_URL + "/obtener-pacientes", {
        idFisio: Number(userID),
      });

      
      return response.data || [];
    }
  };

  const getHours = async () => {
    if (userID) {
      const response = await axios.get(
        `${BACKEND_URL}/horarios-disponibles/${userID}/${new Date(selectedDate)
          .toISOString()
          .substring(0, 10)}`
      );

      
      return response.data.horarios || [];
    }
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

  useFocusEffect(
    useCallback(() => {
      if (userID) {
        getPatients();
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


  const [modalAdd, setModalAdd] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [dateTo, setDateTo] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());

  const [patient, setPatient] = useState("");
  const [openPatient, setOpenPatient] = useState(false);
  const [location, setLocation] = useState("");
  const [otherLocation, setOtherLocation] = useState(false);

  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(0);
  const [dataHours, setDataHours] = useState([]);

  const [dataPatients, setDataPatients] = useState<
    {
      id: string;
      nombre: string;
      apellidos: string;
      proximaCita: string;
      horaCita: string;
      ubicacion: string;
      imagenPerfil?: string;
      tipo: string;
    }[]
  >([]);
  
  const [citas, setCitas] = useState<
    {
      id: string;
      nombre: string;
      apellido: string;
      proximaCita: string;
      horaCita: string;
      duracion: string;
      ubicacion: string;
      imagenPerfil?: string;
      numeroContacto: string;
      tipo: string;
      mail: string;
    }[]
  >([]);

  const dataUbicacion = [
    { key: "1", value: "Cita a domicilio" },
    { key: "2", value: "Cita en clinica" },
    { key: "3", value: "ubicacion personalizada" },
  ];

  const dataDuration = [
    { key: "1", value: "30 minutos" },
    { key: "2", value: "1 hora" },
    { key: "3", value: "1 hora y 30 minutos" },
    { key: "4", value: "2 horas" },
  ];

  const transformDuration = (duration: string) => {
    if (duration == "30 minutos") {
      setDuration(0.5 * 60 * 60);
      return duration;
    } else if (duration == "1 hora") {
      setDuration(1 * 60 * 60);
    } else if (duration == "1 hora y 30 minutos") {
      setDuration(1.5 * 60 * 60);
    } else if (duration == "2 horas") {
      setDuration(2 * 60 * 60);
    }
  };

  //funciones para modal de busqueda
  const openAdd = async () => {
    const horarios = await getHours();
    setDataHours(horarios);
    setModalAdd(true);
  };

  const closeAdd = () => {
    setModalAdd(false);
  };

  //funciones para modal de eliminar
  const openDelete = (item) => {
    setDateTo(item.id);
    setModalDelete(true);
  };

  const closeDelete = () => {
    setModalDelete(false);
  };

  const transformarDatosParaAgenda = () => {
    if (Array.isArray(citas) && citas.length > 0) {
      return citas.reduce((acc: { [key: string]: any }, cita) => {
        const {
          proximaCita,
          nombre,
          apellido,
          ubicacion,
          imagenPerfil,
          horaCita,
          duracion,
          id,
          numeroContacto,
          tipo,
          mail,
        } = cita;

        const transformedCita = {
          nombre: `${nombre}`,
          apellidos: apellido,
          horaCita: horaCita,
          duracion: duracion,
          ubicacion: ubicacion,
          imagenPerfil: imagenPerfil,
          proximaCita: proximaCita,
          id: id,
          numeroContacto: numeroContacto,
          tipo: tipo,
          mail: mail,
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

  const validateDataRegister = () => {
    if (location === "" || patient === "" || time === "") {
      return false;
    } else {
      return true;
    }
  };

  const handleAddLocation = (val: string) => {
    if (val == "ubicacion personalizada") {
      setOtherLocation(true);
    } else {
      setOtherLocation(false);
    }
  };

  const RegistrarCita = async () => {
    const tiposPacientes = {
      A: 'account',
      N: 'NoAccount',
    };

    const date = new Date().toISOString().substring(0, 10);

    const idPaciente = patient.substring(0, patient.length - 1);
    const tipoPaciente = tiposPacientes[patient[patient.length - 1]] ?? null;

    if(!idPaciente && !tipoPaciente) {
      return false;
    }

    const response = await axios.post(BACKEND_URL + "/cita", {
      pacienteId: idPaciente,
      fisioterapeutaId: userID,
      fecha: date + " " + time,
      duracion: duration.toString(),
      ubicacion: location,
      type: tipoPaciente,
    });

    if (response.data.code == 400) {
      Alert.alert( "Error al registrar cita", "no se puede crear una cita con un paciente que ya tiene una cita programada");
      return;
    }


    closeAdd();
    fetchData();
    setLocation("");
    setPatient("");
    setTime("");
  };

  const CancelarCita = async () => {
    const response = await axios.delete(`${BACKEND_URL}/cita/${dateTo}`, {});

    setCitas(citas.filter((cita) => cita.id !== dateTo));

    closeDelete();
  };

  const renderRightActions = (progress, dragX, paciente) => {
    const translateX = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
      extrapolate: "clamp",
    });

    return (

      <Animated.View
        style={[styles.rightAction, { transform: [{ translateX }] }]}
      >
        <TouchableOpacity
          style={styles.removeAction}
          onPress={() => openDelete(paciente)}
        >
          <Icon2 name="calendar-remove" size={30} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.expedientAction}
          onPress={() => navigation.navigate("HistorialPaciente", { paciente })}
        >
          <Icon3 name="page-search" size={30} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Agenda
        items={transformarDatosParaAgenda()}
        selected={selectedDate}
        renderEmptyData={() => (
          <Animated.View
            style={{
              flex: 1,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Icon
              name="calendar-check-o"
              size={150}
              style={{
                opacity: 0.8,
                alignSelf: "center",
              }}
            ></Icon>
            <Text
              style={{
                marginTop: 20,
                fontWeight: "bold",
                fontSize: 25,
              }}
            >
              ¡Sin citas programadas!
            </Text>
          </Animated.View>
        )}
        renderItem={(
          item: {
            nombre:
              | string
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
              apellidos:
              | string
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
            ubicacion:
              | string
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
            horaCita:
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
            duracion:
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
            imagenPerfil: any;
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
                  {item.imagenPerfil ? (
                    <Image
                      source={{
                        uri: item.imagenPerfil,
                      }}
                      style={{ width: 50, height: 50, borderRadius: 25 }}
                    />
                  ) : (
                    <Icon name="user-circle" size={50} color="#000" />
                  )}
                </View>
                <View>
                  <Text style={{ fontWeight: "bold" }}> {`${item.nombre ?? ''} ${item.apellidos ?? ''}`}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      padding: 2,
                    }}
                  >
                    <Icon name="map-marker" size={20} color="#000" />
                    <Text> {item.ubicacion}</Text>
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
                    <Text
                      style={{ fontWeight: "bold", marginRight: 20 }}
                    > 
                      {item.horaCita}
                    </Text>

                    <Icon
                      name="hourglass-1"
                      size={14}
                      color="#000"
                      style={{ marginRight: 1, marginTop: 2 }}
                    />
                    <Text
                      style={{ fontWeight: "bold", marginRight: 20 }}
                    > 
                      {item.duracion}
                    </Text>
                  </View>
                </View>
              </View>
            </Swipeable>
          </GestureHandlerRootView>
        )}
        onDayPress={handleDayPress}
      />

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
            <Text style={styles.modalText}>¡Agenda tu cita!</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                padding: 2,
                marginBottom: 2,
              }}
            >
              <Icon name="calendar" size={20} color="#000" />
              <Text>
                {" "}
                {new Date(selectedDate).toISOString().substring(0, 10)}
              </Text>
            </View>
            <DropDownPicker
              setValue={setPatient}
              value={patient}
              open={openPatient}
              placeholder="Selecciona un paciente"
              style={{
                marginVertical: 5,
              }}
              setOpen={setOpenPatient}
              multiple={false}
              items={dataPatients.map((patient) => ({
                label: patient.nombre + " " + patient.apellidos,
                value: patient.id,
                Icon: () => (
                  <Image
                    style={{ width: 30, height: 30, borderRadius: 25 }}
                    source={{
                      uri: patient.imagenPerfil,
                    }}
                  />
                ),
              }))}
            />

            <SelectList
              setSelected={(val: string) => {
                setLocation(val);
                if (val == "ubicacion personalizada") {
                  setLocation("");
                }
                handleAddLocation(val);
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
                width: width * 0.7,
                height: 45,
                justifyContent: "center",
                alignItems: "center",
                margin: 5,
              }}
              placeholder="Ubicacion de cita"
            />

            <SelectList
              setSelected={(val: string) => {
                transformDuration(val);
              }}
              data={dataDuration}
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
                width: width * 0.7,
                height: 45,
                justifyContent: "center",
                alignItems: "center",
                margin: 5,
              }}
              placeholder="Duracion de la cita"
            />

            <SelectList
              setSelected={(val: string) => {
                setTime(val);
              }}
              data={dataHours}
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
                width: width * 0.7,
                height: 45,
                justifyContent: "center",
                alignItems: "center",
                margin: 5,
              }}
              placeholder="Selecciona una hora"
            />

            {otherLocation && (
              <TextInput
                mode="outlined"
                outlineColor="#c5cae9"
                activeOutlineColor="#c5cae9"
                label="Ubicacion"
                style={[styles.input, { width: width * 0.7 }]}
                value={location}
                onChangeText={setLocation}
              />
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={closeAdd}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonSearch]}
                onPress={RegistrarCita}
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
                onPress={CancelarCita}
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
    maxWidth: "60%",
  },
  expedientAction: {
    backgroundColor: "#0058b3",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    marginRight: 5,
    maxWidth: "60%",
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
