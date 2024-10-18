import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import stylesMain from "../styles/stylesMain";
import { RadioButton } from "react-native-paper";

export default function AshwortMetric({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [muscle, setMuscle] = useState("");
  const [side, setSide] = useState("");
  const [state, setState] = useState("");
  const [result, setResult] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const evaluate = () => {
    let message = "";
    switch (state) {
      case "0":
        message = "Sin aumento de tono muscular";
        break;
      case "1":
        message =
          "aumento leve de tono muscular, minimo aumento de resistencia al movimiento pasivo en la parte afectada";
        break;
      case "1+":
        message =
          "aumento leve de tono muscular, leve aumento de resistencia al movimiento pasivo en la parte afectada";
        break;
      case "2":
        message =
          "aumento mas pronunciable de tono muscular, moderado aumento de resistencia al movimiento pasivo en la parte afectada";
        break;
      case "3":
        message =
          "aumento considerable de tono muscular, marcado aumento de resistencia al movimiento pasivo en la parte afectada";
        break;
      case "4":
        message =
          "aumento maximo de tono muscular, rigidez en flexion o extension";
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
    <View style={stylesMain.containerMetrics}>
      <SafeAreaView style={stylesMain.datosMetricas}>
        <ScrollView style={stylesMain.scrollMetrics}>
          <View style={[stylesMain.ContainerInput, { height: 630 }]}>
            <TextInput
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
                  <RadioButton
                    value="izquierdo"
                    color="white"
                    uncheckedColor="#BDBDBD"
                  />
                  <Text style={stylesMain.metricText}>Izquierdo</Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton
                    value="derecho"
                    color="white"
                    uncheckedColor="#BDBDBD"
                  />
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
                  <RadioButton
                    value="0"
                    color="white"
                    uncheckedColor="#BDBDBD"
                  />
                  <Text style={stylesMain.metricText}>
                    sin aumento en tono muscular
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton
                    value="1"
                    color="white"
                    uncheckedColor="#BDBDBD"
                  />
                  <Text style={stylesMain.metricText}>
                    aumento leve, resistencia minima al final del rango
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton
                    value="1+"
                    color="white"
                    uncheckedColor="#BDBDBD"
                  />
                  <Text style={stylesMain.metricText}>
                    aumento leve, resistencia minima durante el resto del rango
                    de movimiento
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton
                    value="2"
                    color="white"
                    uncheckedColor="#BDBDBD"
                  />
                  <Text style={stylesMain.metricText}>
                    aumento pronunciado, la parte afectada se mueve con
                    facilidad
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton
                    value="3"
                    color="white"
                    uncheckedColor="#BDBDBD"
                  />
                  <Text style={stylesMain.metricText}>
                    aumento considerable, el movimiento pasivo es dificil
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton
                    value="4"
                    color="white"
                    uncheckedColor="#BDBDBD"
                  />
                  <Text style={stylesMain.metricText}>
                    la parte afectada esta rigida, en extension y flexion
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
            <Text style={{ marginBottom: 1, fontSize: 24, color: "white" }}>
              Resultado
            </Text>
            <Text style={{ marginBottom: 1, fontSize: 18, color: "white" }}>
              {result == null ? "" : `${result}`}
            </Text>
            <Text style={{ marginBottom: 1, fontSize: 24, color: "white" }}>
              Ejercicios Recomendados
            </Text>
            <Text style={{ marginBottom: 1, fontSize: 20, color: "white" }}>
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
