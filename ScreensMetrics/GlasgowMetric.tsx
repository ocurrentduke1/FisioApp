import React, { useCallback, useState } from "react";
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
  Dimensions,
} from "react-native";
import stylesMain from "../styles/stylesMain";
import { TextInput } from "react-native-paper";


export default function GlasgowMetric() {
    const [pacienteId, setPacienteId] = useState<string | null>(null);
    const [pacienteTipo, setPacienteTipo] = useState<string | null>(null);

  const [valueOcular, setValueOcular] = useState("");
  const [valueVerbal, setValueVerbal] = useState("");
  const [valueMotriz, setValueMotriz] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [state, setState] = useState("");

  const name = "Glasgow";

  const evaluate = async () => {

    await sendSeverity();

      sendSeverity();

      console.log("State2:", state);

    const response = await axios.post(`${BACKEND_URL}/escala`, {
      idPaciente: pacienteId,
      tipoPaciente: pacienteTipo,
      name: name,
      value: state,
    });

    console.log(response.data.info.recomendacion.sugerencias);

    setMessage(
      `nivel de valoracion: ${result} Recomendacion: ${response.data.info.recomendacion.sugerencias}`
    );
  };

  const sendSeverity = async () => {
    const sum =
      parseFloat(valueOcular) +
      parseFloat(valueVerbal) +
      parseFloat(valueMotriz);
    setResult(sum);
    console.log("Sum of values:", sum);

    if (sum === null) return null;
    if (sum < 9 ) {
      setState("1");
    };
    if (sum >= 9 && sum < 14){
      setState("2");
    };
    if (sum == 14 || sum == 15){
      setState("3");
    };

    console.log("State:", state);
  }

  const allFieldsFilled = () => {
    return (
      valueOcular.trim() !== "" &&
      valueVerbal.trim() !== "" &&
      valueMotriz.trim() !== ""
    );
  };

  const canSaveResult = () => {
    return result !== null;
  };

  function saveResult() {
    console.log("Save result");
  }

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
  
  return (
    <View style={[stylesMain.container, { alignItems: "center" }]}>
      <SafeAreaView style={stylesMain.datosMetricas}>
        <ScrollView style={stylesMain.scrollMetrics}>
          <View
            style={[stylesMain.ContainerInput, { paddingBottom: 20 }]}
          >
            <Text style={stylesMain.metricTitle}>Evaluacion Ocular</Text>
            <Text style={stylesMain.metricText}>1-No Responde</Text>
            <Text style={stylesMain.metricText}>2-Respuesta al Dolor</Text>
            <Text style={stylesMain.metricText}>
              3-Respuesta por orden verbal
            </Text>
            <Text style={stylesMain.metricText}>4-Respuesta Espontanea</Text>
            <TextInput
              mode="outlined"
              label="De 1 a 4"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              value={valueOcular}
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(value) => setValueOcular(value)}
            />
            <Text style={stylesMain.metricTitle}>Evaluacion Verbal</Text>
            <Text style={stylesMain.metricText}>1-No Responde</Text>
            <Text style={stylesMain.metricText}>2-Sonidos Incomprensibles</Text>
            <Text style={stylesMain.metricText}>3-Palabras Inapropiadas</Text>
            <Text style={stylesMain.metricText}>4-Desorientado y Hablando</Text>
            <Text style={stylesMain.metricText}>5-Orientado y conversando</Text>
            <TextInput
              mode="outlined"
              label="De 1 a 5"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              value={valueVerbal}
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(value) => setValueVerbal(value)}
            />
            <Text style={stylesMain.metricTitle}>Evaluacion Motora</Text>
            <Text style={stylesMain.metricText}>1-No Responde</Text>
            <Text style={stylesMain.metricText}>
              2-Extension de Estremidades
            </Text>
            <Text style={stylesMain.metricText}>
              3-Flexion Anormal de Extremidades
            </Text>
            <Text style={stylesMain.metricText}>4-Retirada y Flexion</Text>
            <Text style={stylesMain.metricText}>5-Localiza el Dolor</Text>
            <Text style={stylesMain.metricText}>6-Obedece a orden Verban</Text>
            <TextInput
              mode="outlined"
              label="De 1 a 6"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              value={valueMotriz}
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(value) => setValueMotriz(value)}
            />
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignSelf: "center",
                paddingTop: 10,
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
            style={[stylesMain.resultsMetrics, { paddingBottom: 20}]}
          >
            <Text style={{ marginBottom: 1, fontSize: 24, color: "#000" }}>
              Resultado
            </Text>
            <Text style={{ marginBottom: 1, fontSize: 20, color: "#000" }}>
              {message}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
