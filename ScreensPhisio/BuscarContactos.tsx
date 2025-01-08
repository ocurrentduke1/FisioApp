import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet
} from "react-native";
import stylesMain from "../styles/stylesMain";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { Dialog, Searchbar } from "react-native-paper";
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
  const [contactoExistente, setContactoExistente] = useState(false);
  const changeContactoExistente = () => setContactoExistente(!contactoExistente);
  const [contactoAgregado, setContactoAgregado] = useState(false);
  const changeContactoAgregado = () => setContactoAgregado(!contactoAgregado);
    
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

      if (response.data.code == 400) {
        changeContactoExistente();
        return;
      }

      if (response.data.code == 201) {
        changeContactoAgregado();
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
                <View>
                  <Text
                    style={[
                      stylesMain.datosPacienteMenuFisio,
                      { fontWeight: "bold" },
                    ]}
                  >
                    {contacto.nombre}
                  </Text>
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
                      {contacto.consultorio}
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

      <Dialog visible={contactoExistente} onDismiss={changeContactoExistente}>
          <Dialog.Icon icon="alert" size={50} />
          <Dialog.Title style={styles.dialogTitle}>
            Surgio un error!
          </Dialog.Title>
          <Dialog.Content>
            <Text style={{ alignSelf: "center" }}>
            El contacto ya ha sido añadido anteriormente
            </Text>
            <TouchableOpacity
              onPress={changeContactoExistente}
              style={{ alignSelf: "center", paddingTop: 30 }}
            >
              <Text style={{ fontSize: 20 }}>Aceptar</Text>
            </TouchableOpacity>
          </Dialog.Content>
        </Dialog>

        <Dialog visible={contactoAgregado} onDismiss={changeContactoAgregado}>
          <Dialog.Icon icon="check-circle" size={50} />
          <Dialog.Title style={styles.dialogTitle}>
            Hecho!
          </Dialog.Title>
          <Dialog.Content>
            <Text style={{ alignSelf: "center" }}>
            El contacto ha sido añadido correctamente
            </Text>
            <TouchableOpacity
              onPress={changeContactoAgregado}
              style={{ alignSelf: "center", paddingTop: 30 }}
            >
              <Text style={{ fontSize: 20 }}>Aceptar</Text>
            </TouchableOpacity>
          </Dialog.Content>
        </Dialog>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dialogTitle: {
    textAlign: "center",
  },
});
export default BuscarContactos;
