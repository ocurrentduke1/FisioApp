import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import stylesMain from "../styles/stylesMain";
import { Image } from 'expo-image'; 

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
            title: 'Curvatura de espalda',
            instructions: "Debes estar de pie, de lado y con la espalda lo mas recta posible. Debes tener los brazos a los lados del cuerpo y las piernas juntas. La imagen debe ser tomada de lado.",
          })
        }
      >
        <View style={styles.boxFlex}>
          <Image
            source={require("../assets/lateral.png")}
            style={styles.imageExamples}
          />

          <View style={styles.textContainer}>
            <Text style={styles.titleText}>Curvatura de espalda</Text>
            <Text style={styles.descriptionText}>
              La curvatura de la espalda se refiere a las curvas naturales de la columna vertebral (cervical, torácica y lumbar), 
              que son esenciales para mantener el equilibrio. Una curvatura adecuada es crucial para una postura saludable y para evitar dolores o lesiones en la columna.
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={stylesMain.opcPatient}
        onPress={() =>
          navigation.navigate("ConfirmPosture", {
            imageSource: require("../assets/frontal.png"),
            exercise: "curvatura_Piernas",
            title: 'Desviación de piernas',
            instructions: "Debes ponerte de pie, manteniendo la espalda lo más recta posible y mirando hacia adelante. Los brazos deben estar a los lados del cuerpo y las piernas juntas. Asegúrate de que la imagen se tome desde el frente, a la altura de tus hombros.",
          })
        }
      >
        <View style={styles.boxFlex}>
          <Image
            source={require("../assets/frontal.png")}
            style={styles.imageExamples}
          />

          <View style={styles.textContainer}>
            <Text style={styles.titleText}>Desviación de piernas</Text>
            <Text style={styles.descriptionText}>
              La curvatura de las piernas se refiere a la forma natural o modificada de las piernas, 
              que puede influir en la postura y el movimiento. Es importante para mantener un alineamiento 
              adecuado al caminar, correr o estar de pie, y puede ser evaluada para identificar problemas en la postura o desequilibrios musculares.
            </Text>
          </View>
        </View>
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
  boxFlex: {
    flexDirection: 'row',  
    alignItems: 'flex-start', 
    marginBottom: 10, 
  },
  textContainer: {
    flexDirection: 'column',
  },
  titleText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: 10
  },
  descriptionText: {
    fontSize: 13,
    color: '#000',
    flexWrap: 'wrap'
  },
  hintText: {
    marginTop: 3, 
    fontStyle: 'italic', 
    marginLeft: 3, 
    textDecorationLine: 'underline'
  },
  imageExamples: {
    width: 40,
    height: 120,
    marginTop: 30,
    marginLeft: 50,
    marginRight: 10,
  },
});