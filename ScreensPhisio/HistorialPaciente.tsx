import React, { useCallback, useEffect, useRef, useState } from "react";
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
  TextInput,
  Animated,
  RefreshControl,
} from "react-native";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import stylesHistorial from "../styles/stylesHistorial";
import Icon from "react-native-vector-icons/FontAwesome";
import IconFoundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  FAB,
  Portal,
  PaperProvider,
  ActivityIndicator,
  Dialog,
} from "react-native-paper";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { BACKEND_URL } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Define your route params structure here. This is an example.
type RouteParams = {
  params: {
    paciente: {
      id: string;
      nombre: string;
      imagenPerfil: string;
      apellidos: string;
      fechaNacimiento: string;
      sexo: string;
      ubicacion: string;
      proximaCita: string;
      numeroContacto: string;
      mail: string;
      tipo: string;
      horaCita: string;
    };
  };
};

// Función para procesar los datos
const procesarDatosCitas = (progresion: any, admiteMusculo: boolean) => {
  // Extraer las fechas para los labels

  const labels = admiteMusculo
    ? Object.keys(progresion)
        .map((detalle) => {
          const info = progresion[detalle];
          const date = new Date(info.fecha);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0"); // Añadir ceros a la izquierda si es necesario
          const day = String(date.getDate()).padStart(2, "0"); // Añadir ceros a la izquierda si es necesario
          return `${year}/${month}/${day}`;
        })
        .flat()
    : progresion.map((registro) => {
        const date = new Date(registro.fecha);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Añadir ceros a la izquierda si es necesario
        const day = String(date.getDate()).padStart(2, "0"); // Añadir ceros a la izquierda si es necesario
        return `${year}/${month}/${day}`; // Formato YYYY/MM/DD
      });
  // Extraer los valores para el dataset
  const data = admiteMusculo
    ? Object.keys(progresion)
        .map((detalle) => {
          const info = progresion[detalle];
          return info.map((registro) => registro.rango);
        })
        .flat()
    : progresion.map((registro) => registro.rango);

  return {
    labels,
    datasets: [{ data }],
  };
};

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
  const [openContacts, setOpenContacts] = useState(false);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [Fecha1, setFecha1] = useState("");
  const [Fecha2, setFecha2] = useState("");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<any[]>([]);
  const [fisioterapeutas, setFisioterapeutas] = useState<any[]>([]);
  const [expedientes, setExpedientes] = useState<
    {
      id: string;
      date: string;
      hour: string;
      url: string;
    }[]
  >([]);

  const [sinExpedientes, setSinExpedientes] = useState(false);
  const changeSinExpedientes = () => setSinExpedientes(!sinExpedientes);
  const [errorExpedientes, setErrorExpedientes] = useState(false);
  const changeErrorExpedientes = () => setErrorExpedientes(!errorExpedientes);
  const [errorEscalas, setErrorEscalas] = useState(false);
  const changeErrorEscalas = () => setErrorEscalas(!errorEscalas);
  const [compartir, setCompartir] = useState(false);
  const changeCompartir = () => setCompartir(!compartir);

  const [refreshing, setRefreshing] = useState(false);

  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;

  const [datosGrafico, setDatosGrafico] = useState<any[]>([]);
  const [anchoGrafico, setAnchoGrafico] = useState(0);
  const [width, setWidth] = useState(0);

  const screenWidth = Dimensions.get("window").width;

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

      togglePicker1();
      setFecha1(
        currentDate.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      );
    } else {
      togglePicker1();
    }
  };

  const onChange2 = ({ type }: { type: string }, selectedDate: any) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      togglePicker2();
      setFecha2(
        currentDate.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      );
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

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/expedientes/${paciente.id}/${paciente.tipo}`
      );

      if (response.data.code == 204) {
        changeSinExpedientes();
        return;
      }

      if (!response.data.expedientes) {
        changeSinExpedientes();
        return;
      }

      console.log(response.data.expedientes);
      const transformedExpedientes = response.data.expedientes.map(
        (expediente: any) => {
          const date = expediente.createdAt.split("T");
          return {
            id: expediente.id,
            date: date[0],
            hour: date[1].substring(0, 5),
            url: expediente.url,
          };
        }
      );

      setExpedientes(transformedExpedientes);
    } catch (error) {
      console.error("Error fetching expedientes:", error);
      changeErrorExpedientes();
    } finally {
      closeSearch();
    }
  };

  const getScales = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/escala/${paciente.id}/${paciente.tipo}`
      );

      //

      setData(response.data.resultados);
      setDatosGrafico(
        data.map((item) =>
          procesarDatosCitas(item.progresion, item.admiteMusculo)
        )
      );
      setAnchoGrafico(
        datosGrafico.reduce(
          (max, item) => Math.max(max, item.labels.length),
          0
        ) * 50
      );
      setWidth(Math.max(screenWidth, anchoGrafico * 1.5));
    } catch (error) {
      console.error("Error fetching scales:", error);
      changeErrorEscalas();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getScales();
  }, []);

  //funciones para modal de compartir perfil
  const openShare = () => {
    getContacts();
    setModalShare(true);
  };

  const closeShare = () => {
    setModalShare(false);
  };

  const handleShareProfile = async () => {
    const response = await axios.post(`${BACKEND_URL}/paciente/compartir`, {
      fisioterapeutaId: userID,
      contactos: selectedContacts,
      pacienteId: paciente.id,
    });

    if (response.data.code == 201) {
      changeCompartir();
    }

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
    closeDelete();
  };

  const openWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?phone=${
      paciente.numeroContacto
    }}&text=tu%20cita%20es%20el%20${encodeURIComponent(paciente.proximaCita)}`;
    Linking.openURL(url).catch((err: any) =>
      console.error("Error al abrir WhatsApp", err)
    );
  };

  const [containerWidth, setContainerWidth] = useState(0); // Ancho del contenedor
  const [textWidth, setTextWidth] = useState(0); // Ancho del texto
  const scrollX = useRef(new Animated.Value(0)).current; // Animación del desplazamiento

  useEffect(() => {
    if (textWidth > containerWidth) {
      startScrolling(); // Inicia el desplazamiento si el texto es más ancho que el contenedor
    }
  }, [textWidth, containerWidth]);

  const startScrolling = () => {
    Animated.loop(
      Animated.timing(scrollX, {
        toValue: -(textWidth - containerWidth), // Desplaza hasta el final visible
        duration: 10000, // Duración ajustable
        useNativeDriver: true,
      })
    ).start();
  };

  useEffect(() => {
    const savePacienteData = async () => {
      if (paciente) {
        try {
          await AsyncStorage.setItem("pacienteId", paciente.id);
          await AsyncStorage.setItem("pacienteTipo", paciente.tipo);
        } catch (error) {
          console.error("Error saving paciente data", error);
        }
      }
    };

    savePacienteData();
  }, [paciente]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await getScales();

    // Simula una recarga de datos
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [userID, setUserID] = useState<string | null>(null);

  const getUserID = async () => {
    const id = await AsyncStorage.getItem("idSesion");

    setUserID(id);
  };

  useFocusEffect(
    useCallback(() => {
      getUserID();
    }, [])
  );

  const getContacts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/contactos/${userID}`);

      setFisioterapeutas(response.data.contactos);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <PaperProvider>
      <SafeAreaView style={stylesHistorial.container}>
        <View
          style={stylesHistorial.datosPaciente}
          onLayout={(event) =>
            setContainerWidth(event.nativeEvent.layout.width)
          }
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              color: "black",
              textAlign: "center",
            }}
          >
            {" "}
            {(paciente.nombre + " " + paciente.apellidos).toUpperCase()}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View style={stylesHistorial.viewpaciente}>
              {paciente.imagenPerfil ? (
                <Image
                  source={{ uri: paciente.imagenPerfil }}
                  style={{
                    alignItems: "flex-end",
                    width: windowWidth * 0.19,
                    height: windowHeight * 0.095,
                    borderRadius: 100,
                    marginLeft: 30,
                  }}
                />
              ) : (
                <Icon
                  name="user-circle"
                  size={70}
                  color="#000"
                  style={{
                    alignItems: "flex-end",
                    width: windowWidth * 0.19,
                    height: windowHeight * 0.095,
                    marginLeft: 30,
                    borderRadius: 100,
                  }}
                />
              )}
            </View>
            <View
              style={{ alignItems: "flex-start", marginTop: 5, marginLeft: 15 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  padding: 2,
                }}
              >
                <Icon
                  name="calendar"
                  size={20}
                  color="#000"
                  style={{ marginRight: 10 }}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {paciente.proximaCita == "Sin cita"
                    ? "Sin cita programada"
                    : paciente.proximaCita}
                </Text>
                {paciente.proximaCita == "Sin cita" ? null : (
                  <>
                    <Icon
                      name="clock-o"
                      size={20}
                      color="#000"
                      style={{ marginLeft: 10 }}
                    />
                    <Text> {paciente.horaCita}</Text>
                  </>
                )}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  padding: 2,
                  overflow: "hidden",
                }}
              >
                <Icon
                  name="map-marker"
                  size={20}
                  color="#000"
                  style={{ marginRight: 5 }}
                />
                <View style={{ overflow: "hidden" }}>
                  <Animated.Text
                    style={{ transform: [{ translateX: scrollX }], width: 200 }}
                    onLayout={(event) =>
                      setTextWidth(event.nativeEvent.layout.width)
                    }
                  >
                    {paciente.ubicacion}
                  </Animated.Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  padding: 2,
                }}
              >
                <Icon
                  name="phone"
                  size={20}
                  color="#000"
                  style={{ marginRight: 5 }}
                />
                <Text> {paciente.numeroContacto}</Text>
              </View>
              {paciente.mail == "" ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    padding: 2,
                  }}
                >
                  <MaterialCommunityIcons
                    name="account-off"
                    size={20}
                    color="#000"
                  />
                  <Text
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Usuario sin cuenta
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    padding: 2,
                  }}
                >
                  <MaterialCommunityIcons name="email" size={20} color="#000" />
                  <Text> {paciente.mail}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        <View style={stylesHistorial.menuPaciente}>
          <ScrollView
            style={stylesHistorial.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
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
                    style={{ paddingTop: 5 }}
                    onPress={togglePicker1}
                  >
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
                    style={{ paddingTop: 5 }}
                    onPress={togglePicker2}
                  >
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

            {expedientes.map((expediente) => (
              <TouchableOpacity
                key={expediente.id}
                style={stylesHistorial.containerPdf}
                onPress={() =>
                  navigation.navigate("VisualizarPdf", { url: expediente.url })
                }
              >
                <Icon name="file-text-o" size={50} color="#000" />
                <View style={{ paddingLeft: 15 }}>
                  <Text>
                    Fecha de creación: {expediente.date}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

            {data.map((scale, index) =>
              Object.keys(scale.progresion).length > 0 ||
              scale.progresion.length > 0 ? (
                <React.Fragment key={index}>
                  {scale.admiteMusculo ? (
                    Object.keys(scale.progresion).map((detalle) => {
                      return (
                        <View>
                          <Text
                            style={{
                              fontSize: 20,
                              textAlign: "center",
                              marginVertical: 10,
                            }}
                          >
                            {scale.name} {detalle}
                          </Text>

                          <ScrollView horizontal={true}>
                            <LineChart
                              data={{
                                labels: scale.progresion[detalle].map(
                                  (registro) => {
                                    const date = new Date(registro.fecha);
                                    const year = date
                                      .getFullYear()
                                      .toString()
                                      .substring(2, 4);
                                    const month = String(
                                      date.getMonth() + 1
                                    ).padStart(2, "0");
                                    const day = String(date.getDate()).padStart(
                                      2,
                                      "0"
                                    );

                                    return `${day}/${month}/${year}`;
                                  }
                                ),
                                datasets: [
                                  {
                                    data: scale.progresion[detalle].map(
                                      (registro) => registro.rango
                                    ),
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
                                color: (opacity = 1) =>
                                  `rgba(255, 255, 255, ${opacity})`,
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
                        </View>
                      );
                    })
                  ) : (
                    <View>
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
                            labels: scale.progresion.map((registro) => {
                              const date = new Date(registro.fecha);
                              const year = date
                                .getFullYear()
                                .toString()
                                .substring(2, 4);
                              const month = String(
                                date.getMonth() + 1
                              ).padStart(2, "0");
                              const day = String(date.getDate()).padStart(
                                2,
                                "0"
                              );

                              return `${day}/${month}/${year}`;
                            }),
                            datasets: [
                              {
                                data: scale.progresion.map(
                                  (registro) => registro.rango
                                ),
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
                            color: (opacity = 1) =>
                              `rgba(255, 255, 255, ${opacity})`,
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
                    </View>
                  )}
                </React.Fragment>
              ) : (
                <View></View>
              )
            )}
          </ScrollView>

          {/* Modal para compartir paciente */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalShare}
            onRequestClose={closeShare}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Compartir perfil del paciente
                </Text>

                <DropDownPicker
                  setValue={(val) => setSelectedContacts(val)}
                  value={selectedContacts}
                  open={openContacts}
                  placeholder="Selecciona los contactos"
                  style={{
                    marginVertical: 5,
                  }}
                  setOpen={setOpenContacts}
                  multiple={true}
                  mode="BADGE"
                  items={fisioterapeutas.map((contact) => ({
                    label: contact.nombre,
                    value: contact.id,
                    Icon: () => (
                      <Image
                        style={{ width: 30, height: 30, borderRadius: 25 }}
                        source={{
                          uri: contact.imagenPerfil,
                        }}
                      />
                    ),
                  }))}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={closeShare}
                  >
                    <Text style={styles.textStyle}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonSearch]}
                    onPress={handleShareProfile}
                  >
                    <Text style={styles.textStyle}>Compartir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* Modal para eliminar paciente */}
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
        </View>
        <Portal>
          <FAB.Group
            open={open}
            visible
            icon={open ? "menu-down" : "plus"}
            backdropColor="rgba(0, 0, 0, 0.5)"
            color="#000"
            fabStyle={{ backgroundColor: "#FFF" }}
            actions={[
              {
                icon: "plus",
                label: "Agregar escala",
                labelStyle: { color: "white" },
                style: { backgroundColor: "#FFF" },
                color: "#000",
                onPress: () => navigation.navigate("CrearEscala"),
              },
              {
                icon: "file-document-edit",
                label: "Nuevo Expediente",
                labelStyle: { color: "white" },
                style: { backgroundColor: "#FFF" },
                color: "#000",
                onPress: () =>
                  navigation.navigate("CrearExpediente", { paciente }),
              },
              {
                icon: "email",
                label: "Enviar Mensaje",
                labelStyle: { color: "white" },
                style: { backgroundColor: "#FFF" },
                color: "#000",
                onPress: () => openWhatsApp(),
              },
              {
                icon: "share",
                label: "Compartir",
                labelStyle: { color: "white" },
                style: { backgroundColor: "#FFF" },
                color: "#000",
                onPress: () => openShare(),
              },
              {
                icon: "delete",
                label: "Eliminar paciente",
                labelStyle: { color: "white" },
                style: { backgroundColor: "#FFF" },
                color: "#000",
                onPress: () => openDelete(),
              },
              {
                icon: "angle-acute",
                label: "ver Autoevaluaciones",
                labelStyle: { color: "white" },
                style: { backgroundColor: "#FFF" },
                color: "#000",
                onPress: () => navigation.navigate("AutoEvaluaciones"),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
              }
            }}
          />
        </Portal>

        <Dialog visible={sinExpedientes} onDismiss={changeSinExpedientes}>
          <Dialog.Icon icon="alert" size={50} />
          <Dialog.Title style={styles.dialogTitle}>
            Surgio un error!
          </Dialog.Title>
          <Dialog.Content>
            <Text style={{ alignSelf: "center" }}>
              No se encontraron expedientes
            </Text>
            <TouchableOpacity
              onPress={changeSinExpedientes}
              style={{ alignSelf: "center", paddingTop: 30 }}
            >
              <Text style={{ fontSize: 20 }}>Aceptar</Text>
            </TouchableOpacity>
          </Dialog.Content>
        </Dialog>

        <Dialog visible={errorExpedientes} onDismiss={changeErrorExpedientes}>
          <Dialog.Icon icon="alert" size={50} />
          <Dialog.Title style={styles.dialogTitle}>
            Surgio un error!
          </Dialog.Title>
          <Dialog.Content>
            <Text style={{ alignSelf: "center" }}>
              Ocurrió un error al buscar los expedientes
            </Text>
            <TouchableOpacity
              onPress={changeErrorExpedientes}
              style={{ alignSelf: "center", paddingTop: 30 }}
            >
              <Text style={{ fontSize: 20 }}>Aceptar</Text>
            </TouchableOpacity>
          </Dialog.Content>
        </Dialog>

        <Dialog visible={errorEscalas} onDismiss={changeErrorEscalas}>
                  <Dialog.Icon icon="alert" size={50} />
                  <Dialog.Title style={styles.dialogTitle}>
                    Surgio un error!
                  </Dialog.Title>
                  <Dialog.Content>
                    <Text style={{ alignSelf: "center" }}>
                      Ocurrió un error al buscar las escalas
                    </Text>
                    <TouchableOpacity
                      onPress={changeErrorEscalas}
                      style={{ alignSelf: "center", paddingTop: 30 }}
                    >
                      <Text style={{ fontSize: 20 }}>Aceptar</Text>
                    </TouchableOpacity>
                  </Dialog.Content>
                </Dialog>

                <Dialog visible={errorEscalas} onDismiss={changeErrorEscalas}>
                  <Dialog.Icon icon="check-circle" size={50} />
                  <Dialog.Title style={styles.dialogTitle}>
                    Hecho!
                  </Dialog.Title>
                  <Dialog.Content>
                    <Text style={{ alignSelf: "center" }}>
                    Paciente compartido correctamente
                    </Text>
                    <TouchableOpacity
                      onPress={changeErrorEscalas}
                      style={{ alignSelf: "center", paddingTop: 30 }}
                    >
                      <Text style={{ fontSize: 20 }}>Aceptar</Text>
                    </TouchableOpacity>
                  </Dialog.Content>
                </Dialog>

      </SafeAreaView>
    </PaperProvider>
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
  container: {
    overflow: "hidden", // Asegura que el texto no se desborde
    height: 50, // Altura fija para la visualización
    justifyContent: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#002245",
  },
  dialogTitle: {
    textAlign: "center",
  },
});
