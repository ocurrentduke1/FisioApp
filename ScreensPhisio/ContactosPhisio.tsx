import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import stylesMain from "../styles/stylesMain";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { FAB, ActivityIndicator } from "react-native-paper";
import { runOnJS, useSharedValue, withSpring } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { BACKEND_URL } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Suponiendo que este es tu componente
const ContactosPhisio = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const [userID, setUserID] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserID = async () => {
    const id = await AsyncStorage.getItem("idSesion");
    console.log("Fetched UserID:", id); // Verifica que el ID se obtenga correctamente
    setUserID(id);
  };

  useFocusEffect(
    useCallback(() => {
      getUserID();
    }, [])
  );
  // Estado que almacena los datos de los pacientes
  const [contacts, setContacts] = useState<
    {
      id: string;
      nombre: string;
      imagenPerfil?: string;
      consultorio?: string;
      correo: string;
      telefono: string;
      fechaAgregado: string;
    }[]
  >([]);

  const getContacts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/contactos/${userID}`);
      setContacts(response.data.contactos);

      console.log("Contacts:", response.data.contactos);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
      useCallback(() => {
        if (userID) {
          getContacts();
        }
      }, [userID])
    );

  const translateX = useSharedValue(0);

  const handleGestureEnd = useCallback(
    (event) => {
      if (navigation && navigation.navigate) {
        if (event.translationX > 50) {
          navigation.navigate("metricsSelector");
        } else if (event.translationX < -50) {
          navigation.navigate("calendar");
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
    <SafeAreaView style={stylesMain.container}>
      <ImageBackground
        source={require("../assets/logo_blanco.png")}
        resizeMode="contain"
        style={styles.image}
        imageStyle={{ opacity: 0.5 }}
      >
          <View style={{ flex: 1 }}>
          <ScrollView style={stylesMain.scrollView}>
            {contacts && contacts.length > 0 ? (
              contacts.map((contacto, index) => (
                <TouchableOpacity
                key={index}
                style={{
                  ...stylesMain.datosFisio,
                }}
                onPress={() =>
                  navigation.navigate("PacientesCompartidos", { contacto })
                }
              >
                <View
                  style={{
                    ...stylesMain.casillaPerfilPaciente,
                  }}
                >
                  {contacto.imagenPerfil ? (
                    <View>
                      <Image
                        source={{ uri: contacto.imagenPerfil }}
                        style={stylesMain.imagenpaciente}
                      />
                    </View>
                  ) : (
                    <View>
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
                      {contacto.nombre}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        width: 400,
                      }}
                    >
                      {contacto.consultorio ? (
                        <>
                          <Icon
                            name="map-marker"
                            size={20}
                            color="#000"
                            style={stylesMain.datosPacienteMenuFisio}
                          />
                          <Text
                            style={{ marginLeft: 5, marginTop: 7 }}
                            numberOfLines={1}
                          >
                            {contacto.consultorio}
                          </Text>
                        </>
                      ) : (
                        <Text></Text>
                      )}
                    </View>

                    <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      width: 400,
                    }}>
                      <Icon
                        name="envelope"
                        size={20}
                        color="#000"
                        style={stylesMain.datosPacienteMenuFisio}
                      />
                      <Text style={{ marginLeft: 5, marginTop: 7 }}>
                        {contacto.correo}
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
          </View>
        <FAB
          icon="account-plus"
          color="#000"
          style={styles.fab}
          onPress={() => navigation.navigate("BuscarContactos")}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFF",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#002245",
  },
  flexViewCenter: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
  titleText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ContactosPhisio;
