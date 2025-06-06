import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Dimensions,
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
import { ActivityIndicator, Dialog,} from "react-native-paper";
import stylesHistorial from "../styles/stylesHistorial";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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
      correo: string;
      telefono: string;
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
    const [loading, setLoading] = useState(true);
    const [userID, setUserID] = useState<string | null>(null);
    const [errorPacientes, setErrorPacientes] = useState(false);
    const changeErrorPacientes = () => setErrorPacientes(!errorPacientes);

    const getPacientes = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/paciente/compartidos/${userID}/${contacto.id}`);
        
        console.log("Fetched UserID:", userID);
        console.log("Fetched pacientes:", response.data.pacientes);
        if(response.data.code == 500 ){
          console.log("No se encontraron pacientes");
          changeErrorPacientes();
          return;
        }
      
        setPacientes(response.data.pacientesCompartidos);

      } catch (error) {
        console.error("Error fetching pacientes:", error);
      } finally {
        setLoading(false);
      }
    };

    useFocusEffect(
          useCallback(() => {
            if (userID) {
              getPacientes();
            }
          }, [userID])
        );

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

      if (loading) {
          return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
          );
        }

  return (
    <SafeAreaView style={stylesHistorial.container}>
      <ImageBackground
                source={require("../assets/logo_blanco.png")}
                resizeMode="contain"
                style={styles.image}
                imageStyle={{ opacity: 0.5 }}
              >
                <View
          style={stylesHistorial.datosPaciente}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              color: "black",
              textAlign: "center",
            }}
          >
            {(contacto.nombre).toUpperCase()}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View style={stylesHistorial.viewpaciente}>
              {contacto.imagenPerfil ? (
                <Image
                  source={{ uri: contacto.imagenPerfil }}
                  style={{
                    alignItems: "flex-end",
                    width: windowWidth * 0.19,
                    height: windowHeight * 0.100,
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
                  <Text
                    style={{ width: 200 }}
                  >
                    {contacto.consultorio}
                  </Text>
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
                <Text> {contacto.telefono}</Text>
              </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    padding: 2,
                  }}
                >
                  <MaterialCommunityIcons name="email" size={20} color="#000" />
                  <Text> {contacto.correo}</Text>
                </View>

            </View>
          </View>
        </View>
      <View style={[stylesMain.flexViewCenter, { marginTop: 20 }]}>
        <FontAwesome6 name="users" size={30} color="#FFF" />
        <Text style={stylesMain.commonPatientsTitle}>
          Pacientes en común
        </Text>
      </View>
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

      <Dialog visible={errorPacientes} onDismiss={changeErrorPacientes}>
          <Dialog.Icon icon="alert" size={50} />
          <Dialog.Title style={styles.dialogTitle}>
            Surgio un error!
          </Dialog.Title>
          <Dialog.Content>
            <Text style={{ alignSelf: "center" }}>
            intentelo de nuevo más tarde
            </Text>
            <TouchableOpacity
              onPress={changeErrorPacientes}
              style={{ alignSelf: "center", paddingTop: 30 }}
            >
              <Text style={{ fontSize: 20 }}>Aceptar</Text>
            </TouchableOpacity>
          </Dialog.Content>
        </Dialog>

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
  dialogTitle: {
    textAlign: "center",
  },
});

export default PacientesCompartidos;
