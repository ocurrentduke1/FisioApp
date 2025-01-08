import React, { useState, useCallback } from "react";
import axios from "axios";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  RefreshControl,
} from "react-native";
import stylesMain from "../styles/stylesMain";
import {
  NavigationProp,
} from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";
import { RouteProp } from "@react-navigation/native";
import { BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import {
  FAB,
  Portal,
  PaperProvider,
  ActivityIndicator,
} from "react-native-paper";
import { Gesture } from "react-native-gesture-handler";
import { runOnJS, useSharedValue, withSpring } from "react-native-reanimated";

type VerifiedIconProps = {
  display: boolean;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const windowWidth = Dimensions.get("window").width;

// Suponiendo que este es tu componente
export default function MainPhisio({
  route,
  navigation,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}) {
  const [userID, setUserID] = useState<string | null>(null);

  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const sendnotification = async () => {
    axios.get(BACKEND_URL + "/test-notificaciones");
  };

  // Estado que almacena los datos de los pacientes
  const [pacientes, setPacientes] = useState<
    {
      id: string;
      nombre: string;
      apellidos: string;
      proximaCita: string;
      horaCita: string;
      ubicacion: string;
      imagenPerfil?: string;
      numeroContacto: string;
      tipo: string;
    }[]
  >([]);

  const takePatients = async () => {
    try {
      if (userID) {
        const response = await axios.post(BACKEND_URL + "/obtener-pacientes", {
          idFisio: Number(userID),
        });
        console.log("UserID:", userID);
        console.log("Response data:", response.data);
        return response.data || [];
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await fetchData();
    console.log("Recargando datos...");
    // Simula una recarga de datos
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getUserID = async () => {
    const id = await AsyncStorage.getItem("idSesion");
    console.log("Fetched UserID:", id); // Verifica que el ID se obtenga correctamente
    setUserID(id);
  };

  const fetchData = async () => {
    const datosDelServidor = await takePatients();
    setPacientes(datosDelServidor);
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

  const translateX = useSharedValue(0);

  const handleGestureEnd = useCallback(
    (event) => {
      if (event.translationX < -50) {
        if (navigation && navigation.navigate) {
          navigation.navigate("metricsSelector");
        }
      }

      translateX.value = withSpring(0, { damping: 20 });
    },
    [navigation, translateX]
  );

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      try {
        runOnJS(handleGestureEnd)(event);
      } catch (error) {
        console.log(error.stack);
      }
    });

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <PaperProvider>
      <SafeAreaView style={stylesMain.container}>
        <ImageBackground
          source={require("../assets/logo_blanco.png")}
          resizeMode="contain"
          style={styles.image}
          imageStyle={{ opacity: 0.5 }}
        >
          {/* <GestureDetector gesture={gesture}> */}
          <View style={{ flex: 1 }}>
            <ScrollView
              style={stylesMain.scrollView}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {pacientes && pacientes.length > 0 ? (
                pacientes.map((paciente, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      ...stylesMain.datosFisio,
                    }}
                    onPress={() =>
                      navigation.navigate("HistorialPaciente", { paciente })
                    }
                  >
                    <View
                      style={{
                        ...stylesMain.casillaPerfilPaciente,
                      }}
                    >
                      {paciente.imagenPerfil ? (
                        <View>
                          <VerifiedAccountIcon
                            display={true}
                          ></VerifiedAccountIcon>
                          <Image
                            source={{ uri: paciente.imagenPerfil }}
                            style={stylesMain.imagenpaciente}
                          />
                        </View>
                      ) : (
                        <View>
                          <VerifiedAccountIcon
                            display={paciente.tipo == "account"}
                          ></VerifiedAccountIcon>
                          <Icon
                            name="user-circle"
                            size={70}
                            color="#000"
                            style={stylesMain.imagenpaciente}
                          />
                        </View>
                      )}
                      <View>
                        <Text
                          style={[
                            stylesMain.datosPacienteMenuFisio,
                            { fontWeight: "bold" },
                          ]}
                        >
                          {paciente.nombre} {paciente.apellidos}
                        </Text>

                        {paciente.proximaCita == "Sin cita" ? (
                          <View />
                        ) : (
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Icon
                              name="calendar"
                              size={20}
                              color="#000"
                              style={stylesMain.datosPacienteMenuFisio}
                            />
                            <Text
                              style={{
                                marginLeft: 5,
                                marginTop: 7,
                                fontWeight: "bold",
                              }}
                            >
                              {paciente.proximaCita}
                            </Text>
                            <Icon
                              name="clock-o"
                              size={20}
                              color="#000"
                              style={stylesMain.datosPacienteMenuFisio}
                            />
                            <Text
                              style={{
                                marginLeft: 5,
                                marginTop: 7,
                                fontWeight: "bold",
                              }}
                            >
                              {paciente.horaCita}
                            </Text>
                          </View>
                        )}

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            width: 210,
                          }}
                        >
                          <Icon
                            name="map-marker"
                            size={20}
                            color="#000"
                            style={stylesMain.datosPacienteMenuFisio}
                          />
                          <Text
                            style={{ marginLeft: 5, marginTop: 7 }}
                            ellipsizeMode="tail"
                            numberOfLines={1}
                          >
                            {paciente.ubicacion}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text></Text>
              )}
            </ScrollView>
            <Portal>
              <FAB.Group
                open={open}
                visible
                icon={open ? "menu-down" : "account-multiple-plus"}
                backdropColor="rgba(0, 0, 0, 0.5)"
                color="#000"
                fabStyle={{ backgroundColor: "#FFF" }}
                actions={[
                  {
                    icon: "account-search",
                    label: "Buscar Paciente",
                    labelStyle: { color: "white" },
                    style: { backgroundColor: "#FFF" },
                    color: "#000",
                    onPress: () => navigation.navigate("BuscarPaciente"),
                  },
                  {
                    icon: "account-plus",
                    label: "Registrar paciente",
                    labelStyle: { color: "white" },
                    style: { backgroundColor: "#FFF" },
                    color: "#000",
                    onPress: () =>
                      navigation.navigate("RegistrarNuevoPaciente"),
                  },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                  if (open) {
                  }
                }}
              />
            </Portal>
          </View>
          {/* </GestureDetector> */}
        </ImageBackground>
      </SafeAreaView>
    </PaperProvider>
  );
}

function VerifiedAccountIcon(props: VerifiedIconProps) {
  return props.display ? (
    <View>
      <Octicons
        name="verified"
        size={25}
        color="#E6E605"
        style={{
          position: "absolute",
          height: "auto",
          marginTop: 10,
          marginLeft: 45,
          zIndex: 500,
        }}
      />
      <Octicons
        name="verified"
        size={25}
        color="#000"
        style={{
          position: "absolute",
          height: "auto",
          marginTop: 10,
          marginLeft: 48,
          zIndex: 499,
        }}
      />
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: windowWidth * 0.8,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: "#3F51B5",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  Cancelbutton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#002245",
  },
});
