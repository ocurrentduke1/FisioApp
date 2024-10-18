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
        onPress={() => navigation.navigate("ConfirmPosture", {imageUrl: "https://imgs.search.brave.com/CwCIEPcb1CtGs5AAtqcqbYfIWH8vOFivD4d7FfzXqH4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YmFyY2Vsb25hcXVp/cm9wcmFjdGljLmVz/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE3/LzA5L2FsdGVyYWNp/b25lcy1jdXJ2YXMt/Y29sdW1uYS5qcGcu/d2VicA", Posture: "procesar_curvatura_espalda"})}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#FFFFFF",
            textAlign: "center",
            paddingTop: 10,

          }}
        >Evaluacion de Curvatura de espalda</Text>

        <Image
          source={{uri: "https://imgs.search.brave.com/CwCIEPcb1CtGs5AAtqcqbYfIWH8vOFivD4d7FfzXqH4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YmFyY2Vsb25hcXVp/cm9wcmFjdGljLmVz/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE3/LzA5L2FsdGVyYWNp/b25lcy1jdXJ2YXMt/Y29sdW1uYS5qcGcu/d2VicA", }}
          style={{width: 200, height: 100}}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={stylesMain.opcPatient}
        onPress={() => navigation.navigate("ConfirmPosture", {imageUrl: "https://imgs.search.brave.com/Np-bJbJDddwgKIRv0fJi66-LLk5tqN8CrsE5COCLqig/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWpv/cmNvbnNhbHVkLmFz/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMS8wMi90aXBv/cy1waWVybmFzLmpw/Zz9hdXRvPXdlYnAm/cXVhbGl0eT02MCZ3/aWR0aD0xOTIwJmNy/b3A9MTY6OSxzbWFy/dCxzYWZl", Posture: "procesar_curvatura_piernas"})}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#FFFFFF",
            textAlign: "center",
            paddingTop: 10,
          }}
        >Evaluacion de Desviacion de piernas</Text>
        <Image
          source={{uri: "https://imgs.search.brave.com/Np-bJbJDddwgKIRv0fJi66-LLk5tqN8CrsE5COCLqig/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWpv/cmNvbnNhbHVkLmFz/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMS8wMi90aXBv/cy1waWVybmFzLmpw/Zz9hdXRvPXdlYnAm/cXVhbGl0eT02MCZ3/aWR0aD0xOTIwJmNy/b3A9MTY6OSxzbWFy/dCxzYWZl"}}
          style={{width: 200, height: 100}}
        />
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}
