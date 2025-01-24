import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import stylesMain from "../styles/stylesMain";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Image } from 'expo-image'; 

export default function EvaluacionVideo({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  return (
    <View style={[stylesMain.container, { alignItems: "center", }]}>
      <ImageBackground
        source={require("../assets/logo_blanco.png")}
        resizeMode="contain"
        style={styles.image}
        imageStyle={{ opacity: 0.5 }}
      >
        <ScrollView style={[stylesMain.scrollView, {marginTop: 50}]}>
        <TouchableOpacity
          style={stylesMain.opcPatient}
          onPress={() =>
            navigation.navigate("ConfirmExercise", {
              gifSource: require("../assets/gifs/flexionHombro.gif"),
              exercise: "flexion_Hombro_",
              instructions:
                "Debes estar de pie, de frente con los brazos a los lados del cuerpo y mover el brazo seleccionado hacia el frente y arriba hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
            })
          }
        >
          <View style={styles.boxFlex}>
            <Image
              source={require("../assets/gifs/flexionHombro.gif")}
              style={styles.gifsExamples}
            />

            <View style={styles.textContainer}>
              <Text style={styles.titleText}>Flexión de hombro</Text>
              <Text style={styles.descriptionText}>
                La flexión de hombro es el movimiento en el que el brazo se mueve hacia
                adelante, acercándose al frente del cuerpo. Involucra principalmente el
                deltoides anterior y el pectoral mayor.
              </Text>
              <View style={[styles.boxFlex, { marginTop: 10 }]}>
                <MaterialCommunityIcons name="swap-horizontal-circle" size={25} color="#000"></MaterialCommunityIcons>
                <Text style={[styles.descriptionText, styles.hintText]}>¡Puede realizarse para ambas extremidades!</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>


          <TouchableOpacity
            style={stylesMain.opcPatient}
            onPress={() =>
              navigation.navigate("ConfirmExercise", {
                gifSource: require("../assets/gifs/extensionHombro.gif"),
                exercise: "extension_Hombro_",
                instructions:"Debes estar de pie, de lado, con los brazos a los lados del cuerpo y mover el brazo seleccionado hacia atrás hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
              })
            }
          >
            <View style={styles.boxFlex}>
              <Image
                source={require("../assets/gifs/extensionHombro.gif")}
                style={styles.gifsExamples}
              />

              <View style={styles.textContainer}>
                <Text style={styles.titleText}>Extensión de hombro</Text>
                <Text style={styles.descriptionText}>
                La extensión de hombro es el movimiento en el que el brazo se lleva hacia atrás desde una posición neutra, 
                alejándose del frente del cuerpo. Es importante para acciones como empujar o nadar.

                </Text>
                <View style={[styles.boxFlex, { marginTop: 10 }]}>
                  <MaterialCommunityIcons name="swap-horizontal-circle" size={25} color="#000"></MaterialCommunityIcons>
                  <Text style={[styles.descriptionText, styles.hintText]}>¡Puede realizarse para ambas extremidades!</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesMain.opcPatient}
            onPress={() =>
              navigation.navigate("ConfirmExercise", {
                gifSource: require("../assets/gifs/abduccionHombro.gif"),
                exercise: "abduccion_Hombro_",
                instructions:"Debes estar de pie, de frente, con los brazos a los lados del cuerpo y mover el brazo seleccionado hacia un lado hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
              })
            }
          >
            <View style={styles.boxFlex}>
              <Image
                source={require("../assets/gifs/abduccionHombro.gif")}
                style={styles.gifsExamples}
              />

              <View style={styles.textContainer}>
                <Text style={styles.titleText}>Abducción de hombro</Text>
                <Text style={styles.descriptionText}>
                La abducción de hombro es el movimiento fundamental para actividades como levantar objetos hacia un lado, estiramientos, y ejercicios físicos, 
                además de ser clave para evaluar la movilidad y funcionalidad del hombro.
                </Text>
                <View style={[styles.boxFlex, { marginTop: 10 }]}>
                  <MaterialCommunityIcons name="swap-horizontal-circle" size={25} color="#000"></MaterialCommunityIcons>
                  <Text style={[styles.descriptionText, styles.hintText]}>¡Puede realizarse para ambas extremidades!</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesMain.opcPatient}
            onPress={() =>
              navigation.navigate("ConfirmExercise", {
                gifSource: require("../assets/gifs/aduccionHombro.gif"),
                exercise: "aduccion_Hombro_",
                instructions:"Debes estar de pie, de frente, con los brazos a los lados del cuerpo y mover el brazo seleccionado hacia el centro del cuerpo hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
              })
            }
          >
            <View style={styles.boxFlex}>
              <Image
                source={require("../assets/gifs/aduccionHombro.gif")}
                style={styles.gifsExamples}
              />

              <View style={styles.textContainer}>
                <Text style={styles.titleText}>Aducción de hombro</Text>
                <Text style={styles.descriptionText}>
                  La aducción de hombro es el movimiento esencial para actividades como cruzar los brazos o manipular objetos cercanos al tronco, 
                  además de evaluar la funcionalidad y control del hombro.
                </Text>
                <View style={[styles.boxFlex, { marginTop: 10 }]}>
                  <MaterialCommunityIcons name="swap-horizontal-circle" size={25} color="#000"></MaterialCommunityIcons>
                  <Text style={[styles.descriptionText, styles.hintText]}>¡Puede realizarse para ambas extremidades!</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesMain.opcPatient}
            onPress={() =>
              navigation.navigate("ConfirmExercise", {
                gifSource: require("../assets/gifs/extensionFlexionCodo.gif"),
                exercise: "extension_Codo_",
                instructions:"Debes estar de pie, de lado con el brazo seleccionado estirado hacia el frente y flexionar el codo hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
              })
            }
          >
            <View style={styles.boxFlex}>
              <Image
                source={require("../assets/gifs/extensionFlexionCodo.gif")}
                style={styles.gifsExamples}
              />

              <View style={styles.textContainer}>
                <Text style={styles.titleText}>Extensión de codo</Text>
                <Text style={styles.descriptionText}>
                La extensión de codo es el movimiento que endereza el brazo al aumentar el ángulo entre el antebrazo y el brazo, 
                siendo esencial para empujar objetos, lanzar, realizar ejercicios físicos y evaluar la fuerza y movilidad de la articulación del codo.
                </Text>
                <View style={[styles.boxFlex, { marginTop: 10 }]}>
                  <MaterialCommunityIcons name="swap-horizontal-circle" size={25} color="#000"></MaterialCommunityIcons>
                  <Text style={[styles.descriptionText, styles.hintText]}>¡Puede realizarse para ambas extremidades!</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesMain.opcPatient}
            onPress={() =>
              navigation.navigate("ConfirmExercise", {
                gifSource: require("../assets/gifs/extensionFlexionCodo.gif"),
                exercise: "flexion_Codo_",
                instructions:"Debes estar de pie, de lado con el brazo seleccionado flexionado hacia el frente y estirar el codo hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
              })
            }
          >
            <View style={styles.boxFlex}>
              <Image
                source={require("../assets/gifs/extensionFlexionCodo.gif")}
                style={styles.gifsExamples}
              />

              <View style={styles.textContainer}>
                <Text style={styles.titleText}>Flexión de codo</Text>
                <Text style={styles.descriptionText}>
                  La flexión de codo es el movimiento que dobla el brazo, disminuyendo el ángulo entre el antebrazo y el brazo, 
                  y es crucial para actividades como levantar objetos, realizar ejercicios de fuerza, 
                  y evaluar la movilidad y fuerza de la articulación del codo.
                </Text>
                <View style={[styles.boxFlex, { marginTop: 10 }]}>
                  <MaterialCommunityIcons name="swap-horizontal-circle" size={25} color="#000"></MaterialCommunityIcons>
                  <Text style={[styles.descriptionText, styles.hintText]}>¡Puede realizarse para ambas extremidades!</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesMain.opcPatient}
            onPress={() =>
              navigation.navigate("ConfirmExercise", {
                gifSource: require("../assets/gifs/flexionCadera.gif"),
                exercise: "flexion_Cadera_",
                instructions:"Debes estar acostado boca arriba con las piernas estiradas y flexionar la pierna seleccionada hacia el pecho hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
              })
            }
          >
            <View style={styles.boxFlex}>
              <Image
                source={require("../assets/gifs/flexionCadera.gif")}
                style={styles.gifsExamples}
              />

              <View style={styles.textContainer}>
                <Text style={styles.titleText}>Flexión de cadera</Text>
                <Text style={styles.descriptionText}>
                  La flexión de cadera es el movimiento en el que el muslo se acerca al tronco, 
                  disminuyendo el ángulo entre la pierna y el torso, y es esencial para actividades como caminar, 
                  correr, sentarse y levantarse, así como para evaluar la movilidad y fuerza de la cadera.
                </Text>
                <View style={[styles.boxFlex, { marginTop: 10 }]}>
                  <MaterialCommunityIcons name="swap-horizontal-circle" size={25} color="#000"></MaterialCommunityIcons>
                  <Text style={[styles.descriptionText, styles.hintText]}>¡Puede realizarse para ambas extremidades!</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesMain.opcPatient}
            onPress={() =>
              navigation.navigate("ConfirmExercise", {
                gifSource: require("../assets/gifs/extensionCadera.gif"),
                exercise: "extension_Cadera_",
                instructions:"Debes estar acostado boca abajo con las piernas estiradas y elevar la pierna seleccionada hacia arriba hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
              })
            }
          >
            <View style={styles.boxFlex}>
              <Image
                source={require("../assets/gifs/extensionCadera.gif")}
                style={styles.gifsExamples}
              />

              <View style={styles.textContainer}>
                <Text style={styles.titleText}>Extensión de cadera</Text>
                <Text style={styles.descriptionText}>
                  La extensión de cadera es el movimiento en el que el muslo se aleja del tronco, 
                  aumentando el ángulo entre la pierna y el torso, y es fundamental para actividades como caminar, 
                  correr y levantarse de una posición sentada, además de evaluar la funcionalidad de la cadera.
                </Text>
                <View style={[styles.boxFlex, { marginTop: 10 }]}>
                  <MaterialCommunityIcons name="swap-horizontal-circle" size={25} color="#000"></MaterialCommunityIcons>
                  <Text style={[styles.descriptionText, styles.hintText]}>¡Puede realizarse para ambas extremidades!</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesMain.opcPatient}
            onPress={() =>
              navigation.navigate("ConfirmExercise", {
                gifSource: require("../assets/gifs/abduccionCadera.gif"),
                exercise: "abduccion_Cadera_",
                instructions:"Debe estar de pie, de frente, si lo requiere puede apoyarse de una silla o pared y elevar la pierna seleccionada hacia un lado hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
              })
            }
          >
            <View style={styles.boxFlex}>
              <Image
                source={require("../assets/gifs/abduccionCadera.gif")}
                style={styles.gifsExamples}
              />

              <View style={styles.textContainer}>
                <Text style={styles.titleText}>Abducción de cadera</Text>
                <Text style={styles.descriptionText}>
                  La abducción de cadera es el movimiento en el que la pierna se aleja del cuerpo hacia un lado, 
                  y es importante para actividades como caminar, correr, mantener el equilibrio y realizar ejercicios de fortalecimiento, 
                  además de evaluar la movilidad y estabilidad de la cadera.
                </Text>
                <View style={[styles.boxFlex, { marginTop: 10 }]}>
                  <MaterialCommunityIcons name="swap-horizontal-circle" size={25} color="#000"></MaterialCommunityIcons>
                  <Text style={[styles.descriptionText, styles.hintText]}>¡Puede realizarse para ambas extremidades!</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesMain.opcPatient}
            onPress={() =>
              navigation.navigate("ConfirmExercise", {
                gifSource: require("../assets/gifs/aduccionCadera.gif"),
                exercise: "aduccion_Cadera_",
                instructions:"Debe estar de pie, de frente, si lo requiere puede apoyarse de una silla o pared y elevar la pierna seleccionada hacia el centro del cuerpo hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
              })
            }
          >
            <View style={styles.boxFlex}>
              <Image
                source={require("../assets/gifs/aduccionCadera.gif")}
                style={styles.gifsExamples}
              />

              <View style={styles.textContainer}>
                <Text style={styles.titleText}>Aducción de cadera</Text>
                <Text style={styles.descriptionText}>
                  La aducción de cadera es el movimiento en el que la pierna se acerca al cuerpo desde una posición lateral, 
                  y es esencial para actividades como caminar, correr, mantener el equilibrio y realizar ejercicios de fortalecimiento, 
                  además de evaluar la estabilidad y funcionalidad de la cadera.
                </Text>
                <View style={[styles.boxFlex, { marginTop: 10 }]}>
                  <MaterialCommunityIcons name="swap-horizontal-circle" size={25} color="#000"></MaterialCommunityIcons>
                  <Text style={[styles.descriptionText, styles.hintText]}>¡Puede realizarse para ambas extremidades!</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesMain.opcPatient}
            onPress={() =>
              navigation.navigate("ConfirmExercise", {
                gifSource: require("../assets/gifs/flexionRodilla.gif"),
                exercise: "flexion_Rodilla_",
                instructions:"Debe estar de pie, de lado, con la pierna seleccionada flexionada hacia atrás y elevar el talón hacia los glúteos hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
              })
            }
          >
            <View style={styles.boxFlex}>
              <Image
                source={require("../assets/gifs/flexionRodilla.gif")}
                style={styles.gifsExamples}
              />

              <View style={styles.textContainer}>
                <Text style={styles.titleText}>Flexión de rodilla</Text>
                <Text style={styles.descriptionText}>
                  La flexión de rodilla es el movimiento que dobla la pierna, disminuyendo el ángulo entre el muslo y la pantorrilla, 
                  y es fundamental para actividades como caminar, correr, saltar, agacharse y levantarse, además de evaluar la movilidad y fuerza de la rodilla.
                </Text>
                <View style={[styles.boxFlex, { marginTop: 10 }]}>
                  <MaterialCommunityIcons name="swap-horizontal-circle" size={25} color="#000"></MaterialCommunityIcons>
                  <Text style={[styles.descriptionText, styles.hintText]}>¡Puede realizarse para ambas extremidades!</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesMain.opcPatient}
            onPress={() =>
              navigation.navigate("ConfirmExercise", {
                gifSource: require("../assets/gifs/extensionRodilla.gif"),
                exercise: "extension_Rodilla_",
                instructions:"Debe estar sentado, de lado y elevar la pierna seleccionada hacia arriba hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
              })
            }
          >
            <View style={styles.boxFlex}>
              <Image
                source={require("../assets/gifs/extensionRodilla.gif")}
                style={styles.gifsExamples}
              />

              <View style={styles.textContainer}>
                <Text style={styles.titleText}>Extensión de rodilla</Text>
                <Text style={styles.descriptionText}>
                  La extensión de rodilla es el movimiento en el que la pierna se endereza, aumentando el ángulo entre el muslo y la pantorrilla, 
                  y es esencial para actividades como caminar, correr, saltar y mantener el equilibrio, 
                  además de evaluar la estabilidad y funcionalidad de la rodilla.
                </Text>
                <View style={[styles.boxFlex, { marginTop: 10 }]}>
                  <MaterialCommunityIcons name="swap-horizontal-circle" size={25} color="#000"></MaterialCommunityIcons>
                  <Text style={[styles.descriptionText, styles.hintText]}>¡Puede realizarse para ambas extremidades!</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
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
  gifsExamples: {
    width: 60,
    height: 120,
    marginTop: 10,
    marginLeft: 45,
    marginRight: 10,
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
  }
});
