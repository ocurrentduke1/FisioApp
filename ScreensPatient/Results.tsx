import React, {} from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
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
        <ScrollView>
        <Text style={[styles.Text, {fontWeight: "bold"}]}>Resultados de la evaluación</Text>
        <Text style={styles.Text}>Angulo respecto a la cadera: {results.angulo}</Text>

        <Text style={styles.Text}>Recomendación de tratamiento</Text>
        <Text style={styles.Text}>{results.recomendacion}</Text>
        </ScrollView>
      </View>
      <TouchableOpacity
        style={[stylesHistorial.button, { marginTop: 0, backgroundColor: "#04ADBF", }]}
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
  dialogTitle: {
    textAlign: "center",
  },
});

export default Results;
