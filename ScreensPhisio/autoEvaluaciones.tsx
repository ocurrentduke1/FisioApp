import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Animated,
  ImageBackground,
  View,
  Text,
  ScrollView
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp } from "@react-navigation/native";
import { ListItem, Icon } from "@rneui/themed";
import { BACKEND_URL } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import UUID from 'react-native-uuid';

type RouteParams = {
  params: {
    paciente: {
      id: string;
      nombre: string;
      imagenPerfil: string;
      apellidos: string;
      fechaNacimiento: string;
      genero: string;
      ubicacion: string;
      proximaCita: string;
      numeroContacto: string;
      mail: string;
      tipo: string;
    };
  };
};

// Suponiendo que este es tu componente
const AutoEvaluaciones = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<RouteParams, "params">;
}) => {
  const border = useRef(new Animated.Value(1)).current;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState<string | null>(null);
  const [evaluaciones, setEvaluaciones] = useState({});
  let numeroListas = 0;

  const paciente = route.params?.paciente || null;

  const handlePress = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getUserID = async () => {
    try {
      const id = await AsyncStorage.getItem('idSesion');
      if (id) {
        setUserID(id);
      } else {
        console.error('No se encontró el userID en AsyncStorage');
      }
    } catch (error) {
      console.error('Error al obtener userID de AsyncStorage', error);
    }
  };

  const getEvaluaciones = async () => {
    setLoading(true);
    try {
      const id = paciente ? paciente.id : userID;

      if (!id) {
        console.error('No se pudo obtener el ID del paciente o usuario');
        return;
      }

      const response = await axios.get(`${BACKEND_URL}/historial-vision-artificial/${id}`);

      if(response.data.code === 200) {
        setEvaluaciones(response.data.historial);
      }
      
      // No tiene evaluaciones
    } catch (error) {
      console.error('Error fetching evaluations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!paciente) {
      getUserID();
    }
  }, [paciente]);

  useEffect(() => {
    if (userID || paciente) {
      getEvaluaciones();
    }
  }, [userID, paciente]);

  function obtenerIconoFactor(tipoFactor: string) {
    const iconoDefecto = () => <MaterialCommunityIcons name="angle-acute" size={30} color="#000" style={{ marginTop: -2 }}></MaterialCommunityIcons>;

    return {
      'angulo': () => <MaterialCommunityIcons name="angle-acute" size={30} color="#000" style={{ marginTop: -2 }}></MaterialCommunityIcons>,
      'distancia': () => <FontAwesome6 name="ruler" size={25} color="#000"></FontAwesome6>,
    }[tipoFactor] || iconoDefecto
  }

  function obtenerIconoTipoAnalisis(tipoAnalisis: string) {
    const iconoDefecto = () => <MaterialCommunityIcons name="camera-account" size={30} color="#000" style={{ marginTop: -4 }}></MaterialCommunityIcons>;

    return {
      'Imagen': () => <MaterialCommunityIcons name="camera-account" size={30} color="#000" style={{ marginTop: -4 }}></MaterialCommunityIcons>,
      'Video': () => <MaterialCommunityIcons name="video-box" size={30} color="#000" style={{ marginTop: -4 }}></MaterialCommunityIcons>,
    }[tipoAnalisis] || iconoDefecto
  }

  function obtenerRepresentarFactor(tipoFactor: string) {
    return {
      'angulo': '°',
      'distancia': 'cm.',
    }[tipoFactor] || '-'
  }

  function mostrarArchivo(archivo: string, exercise: string, tipoAnalisis: string) {

    if(tipoAnalisis === 'Imagen') {
      navigation.navigate('ConfirmImage', {
        image: archivo,
        exercise,
        onlyShowing: true,
      });
      return;
    }

    if(tipoAnalisis === 'Video') {
      navigation.navigate('ConfirmVideo', {
        video: archivo,
        exercise,
        onlyShowing: true,
      });
      return;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/logo_blanco.png")}
        resizeMode="contain"
        style={styles.image}
        imageStyle={{ opacity: 0.5 }}
      >
        <ScrollView style={{ flex: 1 }}>
          {
            evaluaciones && Object.keys(evaluaciones).length > 0 ? (
              Object.keys(evaluaciones).map((fecha, index) => (
                <Animated.View
                  style={{
                    width: "90%",
                    margin: 10,
                    padding: 10,
                    borderRadius: 10,
                    opacity: border,
                  }}
                >
                  <ListItem.Accordion key={index}
                    content={
                      <>
                        <MaterialCommunityIcons name="calendar-account" size={30} style={{ marginRight: 10}} />
                        <ListItem.Content>
                          <ListItem.Title style={styles.title}>{new Date(fecha).toDateString()}</ListItem.Title>
                        </ListItem.Content>
                      </>
                    }
                    isExpanded={expandedIndex === index}
                    onPress={() => handlePress(index)}
                  >
                    {
                      evaluaciones[fecha].map((evaluacion: {
                        hora: string,
                        analisis: string,
                        factor: string,
                        tipoFactor: string,
                        puntoPartida: string,
                        tipoAnalisis: string,
                        archivo: string,
                        ejercicio: string,
                      }) => {
                        const indexEvaluacion = UUID.v4();

                        return (
                          <ListItem
                            key={indexEvaluacion}
                            bottomDivider
                            onPress={() => mostrarArchivo(evaluacion.archivo, evaluacion.ejercicio, evaluacion.tipoAnalisis)} // mostrar file
                          >
                            <View>
                              <View style={styles.flexViewStart}>
                                <MaterialCommunityIcons name="human-greeting" size={30} />
                      
                                <Text style={styles.title}>
                                  { evaluacion.ejercicio }
                                </Text>
                              </View>
  
                              <View style={styles.flexViewStart}>
                                <View style={styles.flexViewStart}>
                                  <MaterialCommunityIcons name="clock-outline" size={25} />
                        
                                  <Text style={styles.subtitle}>
                                    { evaluacion.hora }
                                  </Text>
                                </View>
  
                                <View style={[styles.flexViewStart, {marginLeft: 10}]}>
                                  {obtenerIconoFactor(evaluacion.tipoFactor)()} 
                                
                                  <Text style={styles.subtitle}>
                                    {evaluacion.factor} {obtenerRepresentarFactor(evaluacion.tipoFactor)}
                                  </Text>
                                </View>
  
                                <View style={[styles.flexViewStart, {marginLeft: 10}]}>
                                  <FontAwesome5 name="exchange-alt" size={22} />
                                
                                  <Text style={styles.subtitle}>
                                    {evaluacion.puntoPartida.toLocaleUpperCase()}
                                  </Text>
                                </View>
  
                                <View style={[styles.flexViewStart, {marginLeft: 10}]}>
                                  {obtenerIconoTipoAnalisis(evaluacion.tipoAnalisis)()} 
                                  
                                </View>
                              </View>
                              <Text style={styles.analisisText}>{evaluacion.analisis}</Text>
                            </View>
  
                          </ListItem>
                        )
                      })
                    }
                  </ListItem.Accordion>
                </Animated.View>
              ))
            ) : (
              <Text>No se encontraron evaluaciones</Text>
            )
          }
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    // backgroundColor: "#00BCD4",
    backgroundColor: "#002245",
    // Alinea los elementos verticalmente al principio
  },
  text: {
    fontSize: 18,
    color: "black",
    textAlign: "justify",
    margin: 20,
  },
  textAngle: {
    fontSize: 24,
    color: "black",
    textAlign: "center",
    marginTop: 20,
  },
  textWarning: {
    fontSize: 10,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    marginLeft: 5,
  },
  underlineText: {
    textDecorationLine: "underline",
    marginRight: -2,
  },
  subtitle: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 4,
    marginLeft: 7,
  },
  title: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    marginTop: 4
  },
  dialogTitle: {
    textAlign: "center",
  },
  titleIcon: {
    marginTop: 22,
    marginRight: 20,
  },
  textIcon: {
    marginTop: 22,
    marginRight: 10,
  },
  iconInfo: {
    marginTop: 28,
    marginLeft: 10,
  },
  rowView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  analisisText: {
    textAlign: "justify",
  },
  flexViewStart: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: "row",
    marginBottom: 10,
    flexWrap: 'wrap'
  },
});

export default AutoEvaluaciones;
