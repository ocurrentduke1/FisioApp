import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import stylesMain from "../styles/stylesMain";
import { NavigationProp, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { RouteProp } from "@react-navigation/native";
import { BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Suponiendo que este es tu componente
export default function MainPhisio({
  route,navigation,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}) {
  const [userID, setUserID] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const sendnotification = async () => {
    axios.get(BACKEND_URL + "/test-notificaciones");
  }

  // Estado que almacena los datos de los pacientes
  const [pacientes, setPacientes] = useState<
    {
      id: string;
      nombre: string;
      apellidos: string;
      proximaCita: string;
      ubicacion: string;
      imagenPerfil?: string;
      numeroContacto: string;
    }[]
  >([]);



  const takePatients = async () => {
    if (userID) {
      const response = await axios.post(
        BACKEND_URL + "/obtener-pacientes",
        {
          idFisio: Number(userID),
        }
      );
      console.log("UserID:", userID);
      console.log("Response data:", response.data);
      return response.data || [];
    }
  };

  const getUserID = async () => {
    const id = await AsyncStorage.getItem('idSesion');
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

  // useEffect(() => {
  //  // Funcion para obtener ID de la sesion
  //   const getUserID = async () => {
  //     const id = await AsyncStorage.getItem('idSesion');
  //     setUserID(id);
  //   };
  //   getUserID();

  //   const datosDelServidor = [
  //     {
  //       id: "1",
  //       nombre: "Juan",
  //       apellidos: "Pérez",
  //       proximaCita: "2023-04-15",
  //       ubicacion: "Ciudad Central",
  //       imagenPerfil:
  //         "https://imgs.search.brave.com/8ExXYVb8oTB9fWM1IvIH-QRrnpIM5ifHCiXrTuchK-I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aXN0b2NrcGhvdG8u/Y29tL3Jlc291cmNl/cy9pbWFnZXMvSG9t/ZVBhZ2UvRm91clBh/Y2svQzItUGhvdG9z/LWlTdG9jay0xMzU2/MTk3Njk1LmpwZw",
  //       numeroContacto: "1234567890",
  //       },
  //   ];
  //   setPacientes(datosDelServidor);
  // }, []);

  return (
    <SafeAreaView style={stylesMain.container}>
      <ImageBackground source={require("../assets/logo_blanco.png")} resizeMode="contain" style={styles.image} imageStyle={{opacity: 0.5}}>
      <ScrollView style={stylesMain.scrollView}>
        <TouchableOpacity
          style={stylesMain.button}
          onPress={toggleModal}
        >
          <Icon name="plus-circle" size={50} color="#000" />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  toggleModal();
                  navigation.navigate("BuscarPaciente");
                }}
              >
                <Text style={styles.buttonText}>Buscar Paciente</Text>
              </TouchableOpacity>
              <View style={{ margin: 10 }} />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  toggleModal();
                  navigation.navigate("RegistrarNuevoPaciente");
                }}
              >
                <Text style={styles.buttonText}>Registrar Paciente</Text>
              </TouchableOpacity>
              <View style={{ margin: 10 }} />
              <TouchableOpacity style={styles.Cancelbutton} onPress={sendnotification}>
                <Text style={styles.buttonText}>Notificacion</Text>
              </TouchableOpacity>
              <View style={{ margin: 10 }} />
              <TouchableOpacity style={styles.Cancelbutton} onPress={toggleModal}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

{pacientes && pacientes.length > 0 ? (
      pacientes.map((paciente, index) => (
        <TouchableOpacity
          key={index}
          style={stylesMain.datosFisio}
          onPress={() =>
            navigation.navigate("HistorialPaciente", { paciente })
          }
        >
          <View style={stylesMain.casillaPerfilPaciente}>
            {paciente.imagenPerfil ? (
              <Image
                source={{ uri: paciente.imagenPerfil }}
                style={stylesMain.imagenpaciente}
              />
            ) : (
              <Icon name="user-circle" size={70} color="#000" style={stylesMain.imagenpaciente} />
            )}
            <View>
              <Text style={[stylesMain.datosPacienteMenuFisio, { fontWeight: 'bold' }]}>
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
      ))
    ) : (
      <Text></Text>
    )}
      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: windowWidth * 0.8,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: '#3F51B5',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
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
    justifyContent: 'center',
  },
});


