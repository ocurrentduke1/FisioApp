import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import stylesMain from "../styles/stylesMain";

export default function EvaluacionVideo({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  return (
    <View style={[stylesMain.container, {alignItems: "center"}]}>
      <ScrollView style={stylesMain.scrollView}>
      <TouchableOpacity
        style={stylesMain.opcPatient}
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/flexionHombro.gif"), exercise: "flexionHombro", port: "5004"})}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#000",
            textAlign: "center",
            paddingTop: 10,
            fontWeight: "bold",
          }}
        >
          flexion de Hombro
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={stylesMain.opcPatient}
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/extensionHombro.gif"), exercise: "extensionHombro", port: "5005" })}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#000",
            textAlign: "center",
            paddingTop: 10,
            fontWeight: "bold",
          }}
        >
          extension de Hombro
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={stylesMain.opcPatient}
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/abduccionHombro.gif"), exercise: "abduccionHombro", port: "5007" })}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#000",
            textAlign: "center",
            paddingTop: 10,
            fontWeight: "bold",
          }}
        >
          abduccion de Hombro
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={stylesMain.opcPatient}
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/aduccionHombro.gif"), exercise: "aduccionHombro", port: "5006" })}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#000",
            textAlign: "center",
            paddingTop: 10,
            fontWeight: "bold",
          }}
        >
          aduccion de Hombro
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={stylesMain.opcPatient}
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/extensionFlexionCodo.gif"), exercise: "extensionCodo", port: "5010" })}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#000",
            textAlign: "center",
            paddingTop: 10,
            fontWeight: "bold",
          }}
        >
          extension de Codo
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={stylesMain.opcPatient}
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/extensionFlexionCodo.gif"), exercise: "flexionCodo", port: "5009" })}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#000",
            textAlign: "center",
            paddingTop: 10,
            fontWeight: "bold",
          }}
        >
          flexion de Codo
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={stylesMain.opcPatient}
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/flexionCadera.gif"), exercise: "flexionCadera", port: "5011" })}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#000",
            textAlign: "center",
            paddingTop: 10,
            fontWeight: "bold",
          }}
        >
          flexion de Cadera
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={stylesMain.opcPatient}
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/extensionCadera.gif"), exercise: "extensionCadera", port: "5012" })}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#000",
            textAlign: "center",
            paddingTop: 10,
            fontWeight: "bold",
          }}
        >
          extension de Cadera
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={stylesMain.opcPatient}
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/abduccionCadera.gif"), exercise: "abduccionCadera", port: "5014" })}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#000",
            textAlign: "center",
            paddingTop: 10,
            fontWeight: "bold",
          }}
        >
          abduccion de Cadera
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={stylesMain.opcPatient}
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/aduccionCadera.gif"), exercise: "aduccionCadera", port: "5013" })}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#000",
            textAlign: "center",
            paddingTop: 10,
            fontWeight: "bold",
          }}
        >
          aduccion de Cadera
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={stylesMain.opcPatient}
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/flexionRodilla.gif"), exercise: "flexionRodilla", port: "5001" })}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#000",
            textAlign: "center",
            paddingTop: 10,
            fontWeight: "bold",
          }}
        >
          flexion de Rodilla
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={stylesMain.opcPatient}
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/extensionRodilla.gif"), exercise: "extensionRodilla", port: "5002" })}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#000",
            textAlign: "center",
            paddingTop: 10,
            fontWeight: "bold",
          }}
        >
          extension de Rodilla
        </Text>
      </TouchableOpacity>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}
