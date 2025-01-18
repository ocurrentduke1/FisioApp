import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import stylesMain from "../styles/stylesMain";

export default function EvaluacionImagen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  return (
    <View style={[stylesMain.container, { alignItems: "center", justifyContent: "center" }]}>
      <ImageBackground
              source={require("../assets/logo_blanco.png")}
              resizeMode="contain"
              style={styles.image}
              imageStyle={{ opacity: 0.5 }}
            >
      <TouchableOpacity
        style={stylesMain.opcPatient}
        onPress={() =>
          navigation.navigate("ConfirmPosture", {
            imageSource: require("../assets/lateral.png"),
            exercise: "curvatura_Espalda",
            instructions: "Debes estar de pie, de lado y con la espalda lo mas recta posible. Debes tener los brazos a los lados del cuerpo y las piernas juntas. La imagen debe ser tomada de lado.",
          })
        }
      >
        <Text
          style={{
            fontSize: 20,
            color: "#000",
            textAlign: "center",
            paddingTop: 10,
            fontWeight: "bold",
            paddingHorizontal: 10,
          }}
        >
          Evaluación de Curvatura de espalda
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={stylesMain.opcPatient}
        onPress={() =>
          navigation.navigate("ConfirmPosture", {
            imageSource: require("../assets/frontal.png"),
            exercise: "curvatura_Piernas",
            instructions: "Debes estar de pie, de frente y con la espalda lo mas recta posible. Debes tener los brazos a los lados del cuerpo y las piernas juntas. La imagen debe ser tomada de frente.",
          })
        }
      >
        <Text
          style={{
            fontSize: 20,
            color: "#000",
            textAlign: "center",
            paddingTop: 10,
            fontWeight: "bold",
            paddingHorizontal: 10,
          }}
        >
          Evaluación de desviación de piernas
        </Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
});