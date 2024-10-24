import React, { useState } from "react";
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
import { RadioButton } from "react-native-paper";

export default function BradenMetric({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const windowHeight = Dimensions.get("window").height;

  const [Sensorial, setSensorial] = useState("");
  const [Humedad, setHumedad] = useState("");
  const [Actividad, setActividad] = useState("");
  const [Movilidad, setMovilidad] = useState("");
  const [Nutricion, setNutricion] = useState("");
  const [Friccion, setFriccion] = useState("");

  const [result, setResult] = useState<number | null>(null);

  function getSeverityMessage(sum: number | null): string {
    if (sum === null) return "";
    if (sum <= 12) return "Riesgo de UPP Alto";
    if (sum == 13 || sum == 14) return "Riesgo de UPP Moderado";
    if (sum >= 15 && sum <= 18) return "Riesgo de UPP Leve";
    return "";
  }

  function evaluate() {
    const sum =
      parseFloat(Sensorial) +
      parseFloat(Humedad) +
      parseFloat(Actividad) +
      parseFloat(Movilidad) +
      parseFloat(Nutricion) +
      parseFloat(Friccion);
    setResult(sum);
    console.log("Sum of values:", sum);
  }

  const allFieldsFilled = () => {
    return Sensorial.trim() !== "" && Humedad.trim() !== "" && Actividad.trim() !== "" && Movilidad.trim() !== "" && Nutricion.trim() !== "" && Friccion.trim() !== "";
  };

  const canSaveResult = () => {
    return result !== null;
  };

  function saveResult() {
    console.log("Save result");
  }

  return (
    <View style={[stylesMain.container, {alignItems: "center"}]}>
      <SafeAreaView style={stylesMain.datosMetricas}>
        <ScrollView style={stylesMain.scrollMetrics}>
          <View style={[stylesMain.ContainerInput, { height: 1430 }]}>
            <Text
              style={[
                stylesMain.metricTitle,
                { fontSize: 18, alignSelf: "center" },
              ]}
            >
              Percepcion Sensorial
            </Text>
            <RadioButton.Group
              onValueChange={(newValue) => setSensorial(newValue)}
              value={Sensorial}
            >
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="1" color="white" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>
                  Completamente Limitada
                </Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="2" color="white" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>Muy Limitada</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="3" color="white" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>ligeramente limitada</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="4" color="white" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>sin limitaciones</Text>
              </View>
            </RadioButton.Group>

            <Text
              style={[
                stylesMain.metricTitle,
                { fontSize: 18, alignSelf: "center" },
              ]}
            >
              Exposicion A la Humedad
            </Text>

            <RadioButton.Group
              onValueChange={(newValue) => setHumedad(newValue)}
              value={Humedad}
            >
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="1" color="white" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>
                  Constantemente Humeda
                </Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="2" color="white" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>A menudo Humeda</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="3" color="white" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>Ocasionalmente Humeda</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="4" color="white" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>Raramente Humeda</Text>
              </View>
            </RadioButton.Group>

            <Text
              style={[
                stylesMain.metricTitle,
                { fontSize: 18, alignSelf: "center" },
              ]}
            >
              Actividad
            </Text>

            <RadioButton.Group
              onValueChange={(newValue) => setActividad(newValue)}
              value={Actividad}
            >
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="1" color="white" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>
                  Encamado/a
                </Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="2" color="white" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>En silla</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="3" color="white" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>Deambula ocasionalmente</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="4" color="white" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>Deambula frecuentemente</Text>
              </View>
            </RadioButton.Group>

            <Text
              style={[
                stylesMain.metricTitle,
                { fontSize: 18, alignSelf: "center" },
              ]}
            >
              Movilidad
            </Text>

            <RadioButton.Group
              onValueChange={(newValue) => setMovilidad(newValue)}
              value={Movilidad}
            >
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="1" color="white" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>
                  Completamente inmovil
                </Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="2" color="white" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>Muy Limitada</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="3" color="white" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>ligeramente limitada</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="4" color="white" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>sin limitaciones</Text>
              </View>
            </RadioButton.Group>

            <Text
              style={[
                stylesMain.metricTitle,
                { fontSize: 18, alignSelf: "center" },
              ]}
            >
              Nutricion
            </Text>

            <RadioButton.Group
              onValueChange={(newValue) => setNutricion(newValue)}
              value={Nutricion}
            >
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="1" color="white" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>
                  Muy pobre
                </Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="2" color="white" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>Muy Limitada</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="3" color="white" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>ligeramente limitada</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="4" color="white" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>sin limitaciones</Text>
              </View>
            </RadioButton.Group>

            <Text
              style={[
                stylesMain.metricTitle,
                { fontSize: 18, alignSelf: "center" },
              ]}
            >
              Friccion y cizallamiento
            </Text>

            <RadioButton.Group
              onValueChange={(newValue) => setFriccion(newValue)}
              value={Friccion}
            >
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="1" color="white" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>
                  problema
                </Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="2" color="white" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>problema potencial</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="3" color="white" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>no existe problema aparente</Text>
              </View>
            </RadioButton.Group>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center",
                marginTop: 20,
                width: 100,
              }}
              onPress={evaluate}
              disabled={!allFieldsFilled()}
            >
              <Text style={[stylesMain.metricTitle, { fontSize: 20 }]}>
                Evaluar
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[stylesMain.resultsMetrics, { height: windowHeight * 0.3 }]}
          >
            <Text style={{ marginBottom: 1, fontSize: 24, color: "white" }}>
              Resultado
            </Text>
            <Text style={{ marginBottom: 1, fontSize: 20, color: "white" }}>
              {result == null ? "" : `${result}`}
            </Text>
            <Text style={{ marginBottom: 1, fontSize: 20, color: "white" }}>
              {getSeverityMessage(result)}
            </Text>
            <Text style={{ marginBottom: 1, fontSize: 24, color: "white" }}>
              Ejercicios Recomendados
            </Text>
            <Text style={{ marginBottom: 1, fontSize: 20, color: "white" }}>
              Ejercicio 1
            </Text>
            <TouchableOpacity
              style={{ paddingTop: 20, alignSelf: "center" }}
              onPress={saveResult}
              disabled={!canSaveResult()}
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
