import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import stylesMain from "../styles/stylesMain";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "@env";
import axios from "axios";
import { ActivityIndicator,} from "react-native-paper";

type VerifiedIconProps = {
  display: boolean;
};

type RouteParams = {
  params: {
    contacto: {
      id: string;
      nombre: string;
      imagenPerfil: string;
      consultorio: string;
    };
  };
};

// Suponiendo que este es tu componente
const PacientesCompartidos = ({ 
  route,
  navigation 
}: { 
  navigation: NavigationProp<any>
  route: RouteProp<RouteParams, "params">;
}) => {
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

    const contacto = route.params.contacto;
    const [userID, setUserID] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const getUserID = async () => {
      const id = await AsyncStorage.getItem("idSesion");
      console.log("Fetched UserID:", id); // Verifica que el ID se obtenga correctamente
      setUserID(id);
    };

    const getPacientes = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/pacientes/${userID}/${contacto.id}`);


      } catch (error) {
        console.error("Error fetching pacientes:", error);
      } finally {
        setLoading(false);
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
            getPacientes();
          }
        }, [userID])
      );

      if (loading) {
          return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
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
      <ScrollView style={stylesMain.scrollView}>
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
                        ))) : (
                        <Text></Text>
                      )}

      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

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

export default PacientesCompartidos;
