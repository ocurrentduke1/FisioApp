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

// Suponiendo que este es tu componente
const ConfirmPosture = ({
  navigation, route,
}: {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any>;
}) => {
  
  const { imageUrl } = route.params as { imageUrl: string };
  const { Posture } = route.params as { Posture: string };

  return (
    <SafeAreaView style={stylesHistorial.container}>
      <View style={stylesHistorial.containerRegistro}>
        <Text style={styles.Text}>Ejemplo de realizacion de postura</Text>
        <Image
          source={{uri: imageUrl}} // Asegúrate de cambiar la ruta al lugar correcto donde tienes tu GIF
          style={styles.gifStyle}
        />
        <Text style={{color: "black"}}>
          Instrucciones para la realizacion de la postura y su visualizacion
        </Text>
      </View>
      <TouchableOpacity
        style={stylesHistorial.button}
        onPress={() => navigation.navigate("CamaraImagen", { Posture })}
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
    height: 200, // Alto del GIF
  },
});

export default ConfirmPosture;
