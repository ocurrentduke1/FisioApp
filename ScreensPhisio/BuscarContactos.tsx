import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import stylesMain from "../styles/stylesMain";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { Searchbar } from "react-native-paper";
import { BACKEND_URL } from "@env";
import useDebounce from "../Functions/useDebounce";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const BuscarContactos = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [userID, setUserID] = useState<string | null>(null);
  // Estado que almacena los datos de los pacientes
  const [contacts, setContacts] = useState<
    {
      id: string;
      nombre: string;
      imagenPerfil?: string;
      consultorio?: string;
    }[]
  >([]);

  const searchPatients = async () => {
    if (debouncedSearchQuery !== "" && debouncedSearchQuery.length > 2) {
      const response = await axios.get(
        `${BACKEND_URL}/contactos/buscar/${debouncedSearchQuery}`
      );
      console.log(response.data.fisioterapeutas);
      return response.data.fisioterapeutas || [];
    }
  };

  const addPatient = async (id: any) => {
    try {
      const response = await axios.post(BACKEND_URL + "/contactos", {
        fisioterapeutaId: Number(userID),
        contactoId: Number(id), 
      });

      if(response.data.code == 400) {
        Alert.alert("Contacto ya existente", "El contacto ya ha sido añadido anteriormente");
        return;
      }

      if(response.data.code == 201) {
        Alert.alert("Contacto añadido", "El contacto ha sido añadido correctamente");
        navigation.navigate("mainFisio");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const datosDelServidor = await searchPatients();
      setContacts(datosDelServidor);
    };

    const getUserID = async () => {
      const id = await AsyncStorage.getItem("idSesion");
      setUserID(id);
    };

    getUserID();

    fetchData();
  }, [debouncedSearchQuery]);

  //console.log(pacientes);

  return (
    <SafeAreaView style={stylesMain.container}>
      <Searchbar
        placeholder="Buscar"
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
        {contacts && contacts.length > 0 ? (
          contacts.map((contacto) => (
            <TouchableOpacity
              key={contacto.id}
              style={stylesMain.datosFisio}
              onPress={() => addPatient(contacto.id)}
            >
              <View style={stylesMain.casillaPerfilPaciente}>
                {contacto.imagenPerfil ? (
                  <Image
                    source={{ uri: contacto.imagenPerfil }}
                    style={stylesMain.imagenpaciente}
                  />
                ) : (
                  <Icon
                    name="user-circle"
                    size={70}
                    color="#000"
                    style={stylesMain.imagenpaciente}
                  />
                )}
                <View
                  style={{ flexWrap: "wrap", justifyContent: "flex-start" }}
                >
                  <Text style={stylesMain.datosPacienteMenuFisio}>
                    {contacto.nombre}
                  </Text>
                  <Text style={stylesMain.datosPacienteMenuFisio}>
                    Consultorio: {contacto.consultorio}
                  </Text>
                  {/* <Text style={stylesMain.datosPacienteMenuFisio}>
                              {paciente.}
                            </Text> */}
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

export default BuscarContactos;
