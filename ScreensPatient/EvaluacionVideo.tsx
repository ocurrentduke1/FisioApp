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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/flexionHombro.gif"), exercise: "FlexionHombro" })}
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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/extensionHombro.gif"), exercise: "ExtensionHombro" })}
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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/abduccionHombro.gif"), exercise: "AbduccionHombro" })}
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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/aduccionHombro.gif"), exercise: "AduccionHombro" })}
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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/extensionFlexionCodo.gif"), exercise: "ExtensionCodo" })}
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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/extensionFlexionCodo.gif"), exercise: "FlexionCodo" })}
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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/flexionCadera.gif"), exercise: "FlexionCadera" })}
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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/extensionCadera.gif"), exercise: "ExtensionCadera" })}
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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/abduccionCadera.gif"), exercise: "AbduccionCadera" })}
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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/aduccionCadera.gif"), exercise: "AduccionCadera" })}
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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/flexionRodilla.gif"), exercise: "FlexionRodilla" })}
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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/extensionRodilla.gif"), exercise: "ExtensionRodilla" })}
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
