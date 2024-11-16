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
import { FAB, Portal, PaperProvider } from 'react-native-paper';

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
  route,navigation,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}) {
  const [userID, setUserID] = useState<string | null>(null);

  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;

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
      // console.log("Response data:", response.data);
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

  useEffect(() => {
   // Funcion para obtener ID de la sesion
    const getUserID = async () => {
      const id = await AsyncStorage.getItem('idSesion');
      setUserID(id);
    };
    getUserID();

  }, []);

  return (
    <PaperProvider>
    <SafeAreaView style={stylesMain.container}>
      <ImageBackground source={require("../assets/logo_blanco.png")} resizeMode="contain" style={styles.image} imageStyle={{opacity: 0.5}}>
      <ScrollView style={stylesMain.scrollView}>

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
                Domicilio: {paciente.ubicacion}
              </Text>
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
          icon={open ? 'menu-down' : 'account-multiple-plus'}
          backdropColor="rgba(0, 0, 0, 0.5)"
          color="#000"
          fabStyle={{ backgroundColor: "#FFF" }}
          actions={[
            { icon: 'account-search',
              label: "Buscar Paciente",
              labelStyle: { color: "white"},
              style: { backgroundColor: '#FFF' },
              color: "#000",
               onPress: () => navigation.navigate("BuscarPaciente"),
            },
            {
              icon: 'account-plus',
              label: 'Registrar paciente',
              labelStyle: { color: "white"},
              style: { backgroundColor: '#FFF' },
              color: "#000",
              onPress: () => navigation.navigate("RegistrarNuevoPaciente"),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {

            }
          }}
        />
      </Portal>
      </ImageBackground>
    </SafeAreaView>
    </PaperProvider>
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


