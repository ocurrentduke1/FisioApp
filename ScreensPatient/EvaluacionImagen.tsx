import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import stylesMain from "../styles/stylesMain";

export default function EvaluacionImagen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  return (

    <View style={[stylesMain.container, {alignItems: "center"}]}>

      <TouchableOpacity
        style={stylesMain.opcPatient}
        onPress={() => navigation.navigate("ConfirmPosture", {imageSource: require("../assets/lateral.png"), exercise: "curvaturaEspalda", port: "5008"})}
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
        >Evaluacion de Curvatura de espalda</Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={stylesMain.opcPatient}
        onPress={() => navigation.navigate("ConfirmPosture", {imageSource: require("../assets/frontal.png"), exercise: "curvaturaPiernas", port: "5003"})}
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
        >Evaluacion de Desviacion de piernas</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}
