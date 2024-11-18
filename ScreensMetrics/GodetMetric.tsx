import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import stylesMain from "../styles/stylesMain";
import { RadioButton, TextInput } from "react-native-paper";

export default function GodetMetric({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const windowHeight = Dimensions.get("window").height;

  const [muscle, setMuscle] = useState("");
  const [side, setSide] = useState("");
  const [state, setState] = useState("");
  const [result, setResult] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const evaluate = () => {
    let message = "";
    switch (state) {
      case "1":
        message =
          " Fóvea ligera, desaparece rapidamente, sin distorcion detectable.";
        break;
      case "2":
        message =
          " Fóvea mas profunda, no hay distorcion detectable, desaparece en 10 a 15 segundos.";
        break;
      case "3":
        message =
          " Fovea profunda, dura mas de 1 minuto, distorcion detectable.";
        break;
      case "4":
        message =
          " Fóvea muy profunda, dura mas de 2 minutos, distorcion marcada.";
        break;
    }

    setResult(
      ` ${muscle}, Lado: ${side}, Estado: ${message}, nivel de valoracion: ${state}`
    );
  };

  const allFieldsFilled = () => {
    return muscle.trim() !== "" && side.trim() !== "" && state.trim() !== "";
  };

  useEffect(() => {
    setIsButtonDisabled(!allFieldsFilled());
  }, [muscle, side, state]);

  const canSaveResult = () => {
    return result !== null && result.trim() !== "";
  };

  function saveResult() {
    console.log("Save result");
  }
  return (
    <View style={[stylesMain.container, { alignItems: "center" }]}>
      <SafeAreaView style={stylesMain.datosMetricas}>
        <ScrollView style={stylesMain.scrollMetrics}>
          <View style={[stylesMain.ContainerInput, { height: 520 }]}>
            <TextInput
              mode="outlined"
              label="Zona a evaluar"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              value={muscle}
              style={[stylesMain.InputMetrics, { marginTop: 20 }]}
              placeholder="Zona a evaluar"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              onChangeText={(value) => setMuscle(value)}
            />

            <View>
              <Text style={[stylesMain.metricTitle, { fontSize: 18 }]}>
                ¿Que lado se va a evaluar?
              </Text>
              <RadioButton.Group
                onValueChange={(newValue) => setSide(newValue)}
                value={side}
              >
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="izquierdo" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>Izquierdo</Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="derecho" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>Derecho</Text>
                </View>
              </RadioButton.Group>
            </View>

            <View>
              <Text style={[stylesMain.metricTitle, { fontSize: 18 }]}>
                Estado del musculo o grupo evaluado
              </Text>
              <RadioButton.Group
                onValueChange={(newValue) => setState(newValue)}
                value={state}
              >
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="1" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                    Fóvea ligera, desaparece rapidamente.
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="2" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                    Fóvea mas profunda, no hay distorcion detectable, desaparece
                    en 10 a 15 segundos.
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="3" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                    Fóvea profunda, dura mas de 1 minuto, distorcion detectable.
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="4" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                    Fóvea muy profunda, dura mas de 2 minutos, distorcion
                    marcada.
                  </Text>
                </View>
              </RadioButton.Group>
            </View>

            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignSelf: "center",
                paddingTop: 10,
              }}
              onPress={evaluate}
              disabled={isButtonDisabled}
            >
              <Text style={[stylesMain.metricTitle, { fontSize: 20 }]}>
                Evaluar
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={[stylesMain.resultsMetrics, { height: windowHeight * 0.35 }]}
          >
            <Text style={{ marginBottom: 1, fontSize: 24, color: "#000" }}>
              Resultado
            </Text>
            <Text style={{ marginBottom: 1, fontSize: 18, color: "#000" }}>
              {result == null ? "" : `${result}`}
            </Text>
            <Text style={{ marginBottom: 1, fontSize: 24, color: "#000" }}>
              Ejercicios Recomendados
            </Text>
            <Text style={{ marginBottom: 1, fontSize: 20, color: "#000" }}>
              Ejercicio 1
            </Text>
            <TouchableOpacity
              style={{ paddingTop: 10, alignSelf: "center" }}
              onPress={saveResult}
              disabled={!canSaveResult}
            >
              <Text style={[stylesMain.metricTitle, { fontSize: 20 }]}>
                Guardar Resultado
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
