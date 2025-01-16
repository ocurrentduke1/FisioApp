import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import stylesMain from "../styles/stylesMain";

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
                instructions:"Debes estar de pie, de frente con los brazos a los lados del cuerpo y mover el brazo seleccionado hacia el frente y arriba hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
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
              }}
            >
              Flexión de hombro
            </Text>
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
            <Text
              style={{
                fontSize: 20,
                color: "#000",
                textAlign: "center",
                paddingTop: 10,
                fontWeight: "bold",
              }}
            >
              Extensión de hombro
            </Text>
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
            <Text
              style={{
                fontSize: 20,
                color: "#000",
                textAlign: "center",
                paddingTop: 10,
                fontWeight: "bold",
              }}
            >
              Abducción de hombro
            </Text>
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
            <Text
              style={{
                fontSize: 20,
                color: "#000",
                textAlign: "center",
                paddingTop: 10,
                fontWeight: "bold",
              }}
            >
              Aducción de hombro
            </Text>
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
            <Text
              style={{
                fontSize: 20,
                color: "#000",
                textAlign: "center",
                paddingTop: 10,
                fontWeight: "bold",
              }}
            >
              Extensión de codo
            </Text>
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
            <Text
              style={{
                fontSize: 20,
                color: "#000",
                textAlign: "center",
                paddingTop: 10,
                fontWeight: "bold",
              }}
            >
              Flexión de codo
            </Text>
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
            <Text
              style={{
                fontSize: 20,
                color: "#000",
                textAlign: "center",
                paddingTop: 10,
                fontWeight: "bold",
              }}
            >
              Flexión de cadera
            </Text>
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
            <Text
              style={{
                fontSize: 20,
                color: "#000",
                textAlign: "center",
                paddingTop: 10,
                fontWeight: "bold",
              }}
            >
              Extensión de cadera
            </Text>
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
            <Text
              style={{
                fontSize: 20,
                color: "#000",
                textAlign: "center",
                paddingTop: 10,
                fontWeight: "bold",
              }}
            >
              Abducción de cadera
            </Text>
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
            <Text
              style={{
                fontSize: 20,
                color: "#000",
                textAlign: "center",
                paddingTop: 10,
                fontWeight: "bold",
              }}
            >
              Aducción de cadera
            </Text>
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
            <Text
              style={{
                fontSize: 20,
                color: "#000",
                textAlign: "center",
                paddingTop: 10,
                fontWeight: "bold",
              }}
            >
              Flexión de rodilla
            </Text>
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
            <Text
              style={{
                fontSize: 20,
                color: "#000",
                textAlign: "center",
                paddingTop: 10,
                fontWeight: "bold",
              }}
            >
              Extensión de rodilla
            </Text>
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
});
