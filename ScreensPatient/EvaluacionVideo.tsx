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
                exercise: "flexionHombro",
                instructions:"Debes estar de pie, de frente con los brazos a los lados del cuerpo y mover el brazo seleccionado hacia el frente y arriba hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
                port: "5004",
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
              flexión de Hombro
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesMain.opcPatient}
            onPress={() =>
              navigation.navigate("ConfirmExercise", {
                gifSource: require("../assets/gifs/extensionHombro.gif"),
                exercise: "extensionHombro",
                instructions:"Debes estar de pie, de lado, con los brazos a los lados del cuerpo y mover el brazo seleccionado hacia atrás hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
                port: "5005",
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
              extensión de Hombro
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesMain.opcPatient}
            onPress={() =>
              navigation.navigate("ConfirmExercise", {
                gifSource: require("../assets/gifs/abduccionHombro.gif"),
                exercise: "abduccionHombro",
                instructions:"Debes estar de pie, de frente, con los brazos a los lados del cuerpo y mover el brazo seleccionado hacia un lado hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
                port: "5007",
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
              abducción de Hombro
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesMain.opcPatient}
            onPress={() =>
              navigation.navigate("ConfirmExercise", {
                gifSource: require("../assets/gifs/aduccionHombro.gif"),
                exercise: "aduccionHombro",
                instructions:"Debes estar de pie, de frente, con los brazos a los lados del cuerpo y mover el brazo seleccionado hacia el centro del cuerpo hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
                port: "5006",
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
              aducción de Hombro
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesMain.opcPatient}
            onPress={() =>
              navigation.navigate("ConfirmExercise", {
                gifSource: require("../assets/gifs/extensionFlexionCodo.gif"),
                exercise: "extensionCodo",
                instructions:"Debes estar de pie, de lado con el brazo seleccionado estirado hacia el frente y flexionar el codo hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
                port: "5010",
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
              extensión de Codo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesMain.opcPatient}
            onPress={() =>
              navigation.navigate("ConfirmExercise", {
                gifSource: require("../assets/gifs/extensionFlexionCodo.gif"),
                exercise: "flexionCodo",
                instructions:"Debes estar de pie, de lado con el brazo seleccionado flexionado hacia el frente y estirar el codo hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
                port: "5009",
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
              flexión de Codo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesMain.opcPatient}
            onPress={() =>
              navigation.navigate("ConfirmExercise", {
                gifSource: require("../assets/gifs/flexionCadera.gif"),
                exercise: "flexionCadera",
                instructions:"Debes estar acostado boca arriba con las piernas estiradas y flexionar la pierna seleccionada hacia el pecho hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
                port: "5011",
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
              flexión de Cadera
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesMain.opcPatient}
            onPress={() =>
              navigation.navigate("ConfirmExercise", {
                gifSource: require("../assets/gifs/extensionCadera.gif"),
                exercise: "extensionCadera",
                instructions:"Debes estar acostado boca abajo con las piernas estiradas y elevar la pierna seleccionada hacia arriba hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
                port: "5012",
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
              extensión de Cadera
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesMain.opcPatient}
            onPress={() =>
              navigation.navigate("ConfirmExercise", {
                gifSource: require("../assets/gifs/abduccionCadera.gif"),
                exercise: "abduccionCadera",
                instructions:"Debe estar de pie, de frente, si lo requiere puede apoyarse de una silla o pared y elevar la pierna seleccionada hacia un lado hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
                port: "5014",
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
              abducción de Cadera
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesMain.opcPatient}
            onPress={() =>
              navigation.navigate("ConfirmExercise", {
                gifSource: require("../assets/gifs/aduccionCadera.gif"),
                exercise: "aduccionCadera",
                instructions:"Debe estar de pie, de frente, si lo requiere puede apoyarse de una silla o pared y elevar la pierna seleccionada hacia el centro del cuerpo hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
                port: "5013",
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
              aducción de Cadera
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesMain.opcPatient}
            onPress={() =>
              navigation.navigate("ConfirmExercise", {
                gifSource: require("../assets/gifs/flexionRodilla.gif"),
                exercise: "flexionRodilla",
                instructions:"Debe estar de pie, de lado, con la pierna seleccionada flexionada hacia atrás y elevar el talón hacia los glúteos hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
                port: "5001",
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
              flexión de Rodilla
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesMain.opcPatient}
            onPress={() =>
              navigation.navigate("ConfirmExercise", {
                gifSource: require("../assets/gifs/extensionRodilla.gif"),
                exercise: "extensionRodilla",
                instructions:"Debe estar sentado, de lado y elevar la pierna seleccionada hacia arriba hasta donde se pueda permitir o hasta donde el dolor deje de ser tolerable.",
                port: "5002",
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
              extensión de Rodilla
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
