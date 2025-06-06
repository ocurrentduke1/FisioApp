import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import stylesMain from "../styles/stylesMain";
import { RadioButton, TextInput } from "react-native-paper";

export default function DanielsMetric() {

  const [pacienteId, setPacienteId] = useState<string | null>(null);
    const [pacienteTipo, setPacienteTipo] = useState<string | null>(null);

  const name = "Daniels modificado";

  const [muscle, setMuscle] = useState("");
  const [side, setSide] = useState("");
  const [state, setState] = useState("");
  const [result, setResult] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const getPacienteData = async () => {
        try {
          const id = await AsyncStorage.getItem("pacienteId");
          const tipo = await AsyncStorage.getItem("pacienteTipo");
          console.log("Fetched Paciente ID:", id);
          console.log("Fetched Paciente Tipo:", tipo);
          setPacienteId(id);
          setPacienteTipo(tipo);
        } catch (error) {
          console.error("Error fetching paciente data", error);
        }
      };

      getPacienteData();
    }, [])
  );

  const evaluate = async () => {
    const response = await axios.post(`${BACKEND_URL}/escala`, {
      idPaciente: pacienteId,
      tipoPaciente: pacienteTipo,
      name: name,
      value: state,
      muscle: muscle.trim().toLowerCase(),
      side: side,
    });

    console.log(response.data);

    setResult(
      `${muscle}, Lado: ${side}\nNivel de valoración: ${state}\nRecomendación: ${response.data.info.recomendacion.sugerencias}`
    );
  };

  const allFieldsFilled = () => {
    return muscle.trim() !== "" && side.trim() !== "" && state.trim() !== "";
  };

  useEffect(() => {
    setIsButtonDisabled(!allFieldsFilled());
    setSaveButtonDisabled(!canSaveResult());
  }, [muscle, side, state, result]);

  const canSaveResult = () => {
    return result !== null && result.trim() !== "";
  };

  return (
    <View style={[stylesMain.container, { alignItems: "center" }]}>
      <SafeAreaView style={stylesMain.datosMetricas}>
        <ScrollView style={stylesMain.scrollMetrics}>
          <View style={[stylesMain.ContainerInput, { paddingBottom: 20 }]}>
            <TextInput
              mode="outlined"
              label="Zona a evaluar"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              value={muscle}
              style={[stylesMain.InputMetrics, { marginTop: 20 }]}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              onChangeText={(value) => setMuscle(value)}
            />

            <View>
              <Text style={[stylesMain.metricTitle, { fontSize: 18 }]}>
              ¿Qué lado se va a evaluar?
              </Text>
              <RadioButton.Group
                onValueChange={(newValue) => setSide(newValue)}
                value={side}
              >
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="Izquierdo" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>Izquierdo</Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="Derecho" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>Derecho</Text>
                </View>
              </RadioButton.Group>
            </View>


            <View>
              <Text style={[stylesMain.metricTitle, { fontSize: 18 }]}>
              Estado del músculo o grupo evaluado.
              </Text>
              <RadioButton.Group
                onValueChange={(newValue) => setState(newValue)}
                value={state}
              >
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="0" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                  Parálisis total o ausencia de movimiento.
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="1" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                  Contracción mínima visible, pero sin movimiento
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="2" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                  Contracción escasa, con movimiento, pero inexistente con resistencia
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="3" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                  Contracción regular negativa, con movimiento parcial y liberación gradual desde la posición de prueba
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="4" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                  Contracción regular, con movimiento parcial y con la gravedad como única resistencia
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="5" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                  Contracción regular positiva, con movimiento completo, pero solo en contra de la gravedad
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="6" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                  Contracción buena negativa o regular, con movimiento completo contra la gravedad y con la aplicación de resistencia mínima
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="7" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                  Contracción buena, con movimiento completo contra la gravedad y con la aplicación de resistencia Moderada
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="8" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                  Contracción buena positiva, con movimiento completo contra la gravedad y con la aplicación de resistencia fuerte
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="9" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                  Contracción normal, con movimiento completo contra la gravedad y con la aplicación de resistencia máxima
                  </Text>
                </View>
              </RadioButton.Group>
            </View>

            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignSelf: "center",
                paddingVertical: 20,
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
            style={[stylesMain.resultsMetrics, { paddingBottom: 20 }]}
          >
            {result == null  ? (
              <View />
            ) : (
              <View>
                <Text style={{ marginBottom: 1, fontSize: 24, color: "#000", paddingTop: 20, paddingLeft: 10 }}>
                              Resultado
                            </Text>
                <Text style={{ marginBottom: 1, fontSize: 18, color: "#000", paddingLeft: 10 }}>
                  {result}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
