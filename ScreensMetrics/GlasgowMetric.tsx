import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import stylesMain from "../styles/stylesMain";

export default function GlasgowMetric({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [valueOcular, setValueOcular] = useState("");
  const [valueVerbal, setValueVerbal] = useState("");
  const [valueMotriz, setValueMotriz] = useState("");
  const [result, setResult] = useState<number | null>(null);

  function evaluate() {
    const sum =
      parseFloat(valueOcular) +
      parseFloat(valueVerbal) +
      parseFloat(valueMotriz);
    setResult(sum);
    console.log("Sum of values:", sum);
  }

  const allFieldsFilled = () => {
    return valueOcular.trim() !== '' && valueVerbal.trim() !== '' && valueMotriz.trim() !== '';
  };

  const canSaveResult = () => {
    return result !== null;
  };

  function getSeverityMessage(sum: number | null): string {
    if (sum === null ) return "";
    if (sum <= 5) return "Severidad Baja";
    if (sum <= 10) return "Severidad Moderada";
    return "Severidad Alta";
  }

  function saveResult() {
    console.log("Save result");
  }
  return (
    <View style={stylesMain.containerMetrics}>
      <SafeAreaView style={stylesMain.datosMetricas}>
        <ScrollView
          style={stylesMain.scrollMetrics}
        >
          <View
            style={[stylesMain.ContainerInput, {height: windowHeight * 0.85,}]}
          >
            <Text style={stylesMain.metricTitle}>Evaluacion Ocular</Text>
            <Text style={stylesMain.metricText}>1-No Responde</Text>
            <Text style={stylesMain.metricText}>2-Respuesta al Dolor</Text>
            <Text style={stylesMain.metricText}>3-Respuesta por orden verbal</Text>
            <Text style={stylesMain.metricText}>4-Respuesta Espontanea</Text>
            <TextInput
              value={valueOcular}
              style={stylesMain.InputMetrics}
              placeholder="De 1 a 4"
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
              value={valueVerbal}
              style={stylesMain.InputMetrics}
              placeholder="De 1 a 5"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(value) => setValueVerbal(value)}
            />
            <Text style={stylesMain.metricTitle}>Evaluacion Motora</Text>
            <Text style={stylesMain.metricText}>1-No Responde</Text>
            <Text style={stylesMain.metricText}>2-Extension de Estremidades</Text>
            <Text style={stylesMain.metricText}>3-Flexion Anormal de Extremidades</Text>
            <Text style={stylesMain.metricText}>4-Retirada y Flexion</Text>
            <Text style={stylesMain.metricText}>5-Localiza el Dolor</Text>
            <Text style={stylesMain.metricText}>6-Obedece a orden Verban</Text>
            <TextInput
              value={valueMotriz}
              style={stylesMain.InputMetrics}
              placeholder="De 1 a 6"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(value) => setValueMotriz(value)}
            />
            <TouchableOpacity style={{ justifyContent: "center", alignSelf: "center", paddingTop: 10 }}
            onPress={evaluate} disabled={!allFieldsFilled()}>
              <Text style={[stylesMain.metricTitle, { fontSize: 20}]}>Evaluar</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[stylesMain.resultsMetrics,{height: windowHeight * 0.3,}]}
          >
            <Text style={{ marginBottom: 1, fontSize: 24, color: "white"}}>Resultado</Text>
            <Text style={{ marginBottom: 1, fontSize: 20, color: "white"}}>
            {result == null ? "" :  `${result}`}
            </Text>
            <Text style={{ marginBottom: 1, fontSize: 20, color: "white"}}>
              {getSeverityMessage(result)}
            </Text>
            <Text style={{ marginBottom: 1, fontSize: 24, color: "white"}}>
              Ejercicios Recomendados
            </Text>
            <Text style={{ marginBottom: 1, fontSize: 20, color: "white"}}>Ejercicio 1</Text>
            <TouchableOpacity style={{paddingTop: 10, alignSelf: 'center'}} onPress={saveResult} disabled={!canSaveResult}>
              <Text style={[stylesMain.metricTitle, { fontSize: 20}]}>Guardar Resultado</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
