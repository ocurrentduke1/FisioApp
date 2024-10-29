import React, { } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import stylesHistorial from "../styles/stylesHistorial";

type RouteParams = {
  params: {
    imageSource: {
      uri: string;
    };
    exercise: string;
    port: string;
  };
};

// Suponiendo que este es tu componente
const ConfirmPosture = ({
  navigation, route,
}: {
  route: RouteProp<RouteParams, "params">;
  navigation: NavigationProp<any>;
}) => {
  
  const { imageSource } = route.params;
  const { exercise } = route.params;
  const { port } = route.params;

  console.log(port);
  console.log(exercise)
  console.log(imageSource)

  return (
    <SafeAreaView style={stylesHistorial.container}>
      <View style={stylesHistorial.containerRegistro}>
        <Text style={styles.Text}>Ejemplo de realizacion de postura</Text>
        <Image
          source={imageSource} // Asegúrate de cambiar la ruta al lugar correcto donde tienes tu GIF
          style={styles.gifStyle}
        />
        <Text style={{color: "black"}}>
          Instrucciones para la realizacion de la postura y su visualizacion
        </Text>
      </View>
      <TouchableOpacity
        style={stylesHistorial.button}
        onPress={() => navigation.navigate("CamaraImagen", { exercise, port })}
      >
        <Text style={stylesHistorial.buttonText}>Evaluar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Text: {
    fontSize: 24,
    color: "black",
    textAlign: "center",
  },
  gifStyle: {
    // Estilos para tu GIF
    width: 200, // Ancho del GIF
    height: 250, // Alto del GIF
    resizeMode: "contain",
  },
});

export default ConfirmPosture;
