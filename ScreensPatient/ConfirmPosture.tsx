import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
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
    instructions: string;
  };
};

// Suponiendo que este es tu componente
const ConfirmPosture = ({
  navigation,
  route,
}: {
  route: RouteProp<RouteParams, "params">;
  navigation: NavigationProp<any>;
}) => {
  const { imageSource } = route.params;
  const { exercise } = route.params;
  const { instructions } = route.params;

  console.log(exercise);
  console.log(imageSource);

  return (
    <SafeAreaView style={stylesHistorial.container}>
      <View style={stylesHistorial.containerRegistro}>
        <Text style={styles.Text}>Ejemplo de realización de postura</Text>
        <Image
          source={imageSource} // Asegúrate de cambiar la ruta al lugar correcto donde tienes tu GIF
          style={styles.gifStyle}
        />
        <Text style={{ color: "black" }}>
          {instructions}
        </Text>
      </View>
      <TouchableOpacity
        style={stylesHistorial.button}
        onPress={() => navigation.navigate("CamaraImagen", { exercise })}
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
