import React, { } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import stylesHistorial from "../styles/stylesHistorial";
import { RadioButton } from "react-native-paper";

type RouteParams = {
  params: {
    gifSource: {
      uri: string;
    };
    exercise: string;
    port: string;
  };
};

// Suponiendo que este es tu componente
const ConfirmExercise = ({
  route,navigation,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<RouteParams, "params">;
}) => {
  const [side, setSide] = React.useState("Derecha");

  const { gifSource } = route.params;
  const { exercise } = route.params;
  const { port } = route.params;
  //const { Instructions } = route.params;
  console.log(port)

  return (
    <SafeAreaView style={stylesHistorial.container}>
      <View style={stylesHistorial.containerRegistro}>
        <Text style={styles.Text}>Ejemplo de realizacion de ejercicio</Text>
        <View style={styles.gifContainer}>
        <Image
          source={gifSource} 
          style={styles.gifStyle}
        />
        </View>
        <RadioButton.Group
            onValueChange={newValue => setSide(newValue)}
            value={side}
          >
            <View style={styles.radioGroupContainer}>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="Izquierda"/>
              <Text >Izquierdo</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="Derecha" />
              <Text >Derecho</Text>
            </View>
            </View>
          </RadioButton.Group>
        <Text style={{color: "black", paddingHorizontal: 10, paddingTop: 10}}>
          Instrucciones para la realizacion del ejercicio y su visualizacion
        </Text>
      </View>
      <TouchableOpacity
        style={stylesHistorial.button}
        onPress={() => navigation.navigate("CamaraVideo", {exercise: exercise + side}) }
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
    paddingTop: 20,
  },
  gifStyle: {
    // Estilos para tu GIF
    width: 200, // Ancho del GIF
    height: 250, // Alto del GIF
    resizeMode: "contain",
  },
  gifContainer: {
    width: 200,
    height: 250,
    marginTop: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioGroupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default ConfirmExercise;
