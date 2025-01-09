import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@env";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import stylesMain from "../styles/stylesMain";
import { RadioButton, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function AshwortMetric() {

  const [pacienteId, setPacienteId] = useState<string | null>(null);
  const [pacienteTipo, setPacienteTipo] = useState<string | null>(null);

  const [muscle, setMuscle] = useState("");
  const [side, setSide] = useState("");
  const [state, setState] = useState("");
  const [result, setResult] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const name = "Ashworth";

  useFocusEffect(
    useCallback(() => {
      const getPacienteData = async () => {
        try {
          const id = await AsyncStorage.getItem("pacienteId");
          const tipo = await AsyncStorage.getItem("pacienteTipo");
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

    setResult(
      `${muscle}, Lado: ${side}\nNivel de valoración: ${state}\nRecomendación: ${response.data.info.recomendacion.sugerencias}`
    );
  };

  const allFieldsFilled = () => {
    return muscle.trim() !== "" && side.trim() !== "" && state.trim() !== "";
  };

  useEffect(() => {
    setIsButtonDisabled(!allFieldsFilled());
  }, [muscle, side, state]);

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
              placeholder="Zona a evaluar"
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
              Estado del músculo o grupo evaluado
              </Text>
              <RadioButton.Group
                onValueChange={(newValue) => setState(newValue)}
                value={state}
              >
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="0" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                  Sin aumento en tono muscular
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="1" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                  Aumento leve, resistencia mínima al final del rango
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="2" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                  Aumento leve, resistencia mínima durante el resto del rango de movimiento
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="3" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                  Aumento pronunciado, la parte afectada se mueve con facilidad
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="4" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                  Aumento considerable, el movimiento pasivo es difícil.
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="5" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                  La parte afectada está rígida, en extensión y flexión.
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
                Calcular
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={[stylesMain.resultsMetrics, { paddingBottom: 20 }]}
          >
            <Text style={{ marginBottom: 1, fontSize: 24, color: "#000", paddingTop: 20, paddingLeft: 10 }}>
              Resultado
            </Text>
            <Text style={{ marginBottom: 1, fontSize: 18, color: "#000", paddingLeft: 10 }}>
              {result}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
