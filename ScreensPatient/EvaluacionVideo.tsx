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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/flexionHombro.gif"), exercise: "flexionHombro" })}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#FFFFFF",
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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/extensionHombro.gif"), exercise: "extensionHombro" })}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#FFFFFF",
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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/abduccionHombro.gif"), exercise: "abduccionHombro" })}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#FFFFFF",
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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/aduccionHombro.gif"), exercise: "aduccionHombro" })}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#FFFFFF",
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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/extensionFlexionCodo.gif"), exercise: "extensionCodo" })}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#FFFFFF",
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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/extensionFlexionCodo.gif"), exercise: "flexionCodo" })}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#FFFFFF",
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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/flexionCadera.gif"), exercise: "flexionCadera" })}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#FFFFFF",
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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/extensionCadera.gif"), exercise: "extensionCadera" })}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#FFFFFF",
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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/abduccionCadera.gif"), exercise: "abduccionCadera" })}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#FFFFFF",
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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/aduccionCadera.gif"), exercise: "aduccionCadera" })}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#FFFFFF",
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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/flexionRodilla.gif"), exercise: "flexionRodilla" })}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#FFFFFF",
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
        onPress={() => navigation.navigate("ConfirmExercise", { gifSource: require("../assets/gifs/extensionRodilla.gif"), exercise: "extensionRodilla" })}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#FFFFFF",
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
