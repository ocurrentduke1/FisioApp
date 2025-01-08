import React, {} from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import stylesHistorial from "../styles/stylesHistorial";
import { RouteProp } from "@react-navigation/native";

// Suponiendo que este es tu componente
const Results = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}) => {
  const { results } = route.params as { results: any };

  return (
    <SafeAreaView style={stylesHistorial.container}>
      <View style={stylesHistorial.containerRegistro}>
        <Text style={styles.Text}>Resultados de la evaluación</Text>
        <Text style={styles.Text}>{results.angulo}</Text>

        <Text style={styles.Text}>Recomendacion de tratamiento</Text>
        <Text style={styles.Text}>{results.recomendacion}</Text>
      </View>
      {/* <TouchableOpacity
        style={[stylesHistorial.button, { marginTop: 0 }]}
        onPress={SaveResults}
      >
        <Text style={stylesHistorial.buttonText}>Guardar Registro</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[stylesHistorial.button, { marginTop: 0 }]}
        onPress={() => {
          navigation.navigate("VerExpedientePaciente");
        }}
      >
        <Text style={stylesHistorial.buttonText}>Regresar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Text: {
    fontSize: 24,
    color: "black",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Results;
