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

  const name = "Daniels modificada";

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
      muscle: muscle,
      side: side,
    });

    console.log(response.data);

    setResult(
      ` ${muscle}, Lado: ${side},\n nivel de valoracion: ${state}, Recomendacion: ${response.data.info.recomendacion.sugerencias}`
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

  function saveResult() {
    if (canSaveResult()) {
      console.log(muscle,",",  side,",", state);
      //saveResultToDB();
      alert("Resultado guardado");

      setMuscle("");
      setSide("");
      setState("");
      setResult("");
    }
  }
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
                  <RadioButton value="0" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                    Paralisis Total o ausencia de movimiento
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="1" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                    Contraccion minima visible, pero sin movimiento
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="2" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                    Contraccion escasa, con movimiento, pero inexistente con
                    resistencia
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="3-" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                    Contraccion regular negativa, con movimiento parcial y
                    liberacion gradual desde la posicion de prueba
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="3" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                    Contraccion regular, con movimiento parcial y con la
                    gravedad como unica resistencia
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="3+" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                    Contraccion regular positiva, con movimiento completo, pero
                    solo en contra de la gravedad
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="4-" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                    Contraccion buena negativa o regular, con movimiento
                    completo contra la gravedad y con la aplicacion de
                    resistencia minima
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="4" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                    Contraccion buena, con movimiento completo contra la
                    gravedad y con la aplicacion de resistencia Moderada
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="4+" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                    Contraccion buena positiva, con movimiento completo contra
                    la gravedad y con la aplicacion de resistencia fuerte
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="5" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                    Contraccion normal, con movimiento completo contra la
                    gravedad y con la aplicacion de resistencia maxima
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
                <Text style={{ marginBottom: 1, fontSize: 24, color: "#000" }}>
                  Resultado
                </Text>
                <Text style={{ marginBottom: 1, fontSize: 18, color: "#000" }}>
                  {result}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={{ paddingVertical: 20, alignSelf: "center" }}
              onPress={saveResult}
              disabled={saveButtonDisabled}
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
