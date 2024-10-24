import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import stylesMain from "../styles/stylesMain";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { Searchbar } from "react-native-paper";
import { BACKEND_URL } from "@env";
import useDebounce from "../Functions/useDebounce";
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

// Suponiendo que este es tu componente
const BuscarPacientes = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [userID, setUserID] = useState<string | null>(null);
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

  const searchPatients = async () => {
    if (debouncedSearchQuery !== "" && debouncedSearchQuery.length > 2) {
      const response = await axios.post(
        BACKEND_URL +
          "/buscar-pacientes",
        {
          searchQuery,
        }
      );
      //console.log(response.data);
      return response.data || [];
    }
  };

  const addPatient = async (id: any) => {
    try {
      //console.log("ID del paciente:", id); // Verifica que el ID se pase correctamente
      const response = await axios.post(
        BACKEND_URL + "/vincular-paciente",
        {
          idFisio: Number(userID),
          idPaciente: Number(id), // Asegúrate de que el ID sea un número
        }
      );
      console.log("registrado");
      //console.log(id);
      navigation.navigate("mainFisio");
    } catch (error) {
      console.error(error);
    }
  };

  // Simulación de la carga de datos desde el servidor
  useEffect(() => {
    const fetchData = async () => {
      const datosDelServidor = await searchPatients();
      setPacientes(datosDelServidor);
    };

    const getUserID = async () => {
      const id = await AsyncStorage.getItem('idSesion');
      setUserID(id);
    };

    getUserID();

    fetchData();
  }, [debouncedSearchQuery]);

  //console.log(pacientes);

  return (
    <SafeAreaView style={stylesMain.container}>
      <Searchbar
        placeholder="Buscar paciente"
        onChangeText={(query) => {
          setSearchQuery(query);
        }}
        value={searchQuery}
        style={{
          margin: 10,
          width: 350,
          backgroundColor: "#FFF",
          borderColor: "black",
          borderWidth: 1,
          alignSelf: "center",
          maxWidth: windowWidth * 0.9,
        }}
      />
      <ScrollView style={stylesMain.scrollView}>
        {pacientes && pacientes.length > 0 ? (
          pacientes.map((paciente) => (
            <TouchableOpacity
              key={paciente.id}
              style={[
                stylesMain.datosFisio,
                { height: windowHeight * 0.15, width: windowWidth * 0.9 },
              ]}
              onPress={() => addPatient(paciente.id)}
            >
              <View style={stylesMain.casillaPerfilPaciente}>
                {paciente.imagenPerfil ? (
                  <Image
                    source={{ uri: paciente.imagenPerfil }}
                    style={[stylesMain.imagenpaciente, { marginTop: 20 }]}
                  />
                ) : (
                  <Icon
                    name="user-circle"
                    size={70}
                    color="#000"
                    style={[stylesMain.imagenpaciente, { marginTop: 20 }]}
                  />
                )}
                <View>
                  <Text style={stylesMain.datosPacienteMenuFisio}>
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
    </SafeAreaView>
  );
};

export default BuscarPacientes;
