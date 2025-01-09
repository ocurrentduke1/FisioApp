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
import { TextInput } from "react-native-paper";

export default function TinettiMetric() {
    const [pacienteId, setPacienteId] = useState<string | null>(null);
    const [pacienteTipo, setPacienteTipo] = useState<string | null>(null);

  const name = "Tinetti";

  const [inputValues, setInputValues] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
    input7: "",
    input8: "",
    input9: "",
    input10: "",
    input11: "",
    input12: "",
    input13: "",
    input14: "",
    input15: "",
    input16: "",
    input17: "",
    input18: "",
    input19: "",
    input20: "",
  });

  const [result, setResult] = useState<number | null>(null);
    const [message, setMessage] = useState<string>("");
    const [state, setState] = useState("");

    const evaluate = async () => {

      await sendSeverity();
  
        console.log("State2:", state);
  
      const response = await axios.post(`${BACKEND_URL}/escala`, {
        idPaciente: pacienteId,
        tipoPaciente: pacienteTipo,
        name: name,
        value: state,
      });
  
      console.log(response.data.info.recomendacion.sugerencias);
  
      setMessage(
        `Nivel de valoración: ${result}\nRecomendación: ${response.data.info.recomendacion.sugerencias}`
      );
    };

    const accionEvaluar = async () => {
        await sendSeverity()
      }
    
      useEffect(() => {
          if(state !== '') {
            evaluate();
          }
        }, [state]);

    const sendSeverity = async () => {
      const sum = Object.values(inputValues).reduce((acc, curr) => {
        const num = parseFloat(curr);
        return acc + (isNaN(num) ? 0 : num);
      }, 0);
      setResult(sum);

      if (sum === null) return null;
    if (sum < 19) {
      setState("1");
    }
    if (sum >= 19 && sum <= 24) {
      setState("2");
    }
    if (sum > 24) {
      setState("3");
    }

    console.log("State:", state);
    }

  const handleInputChange = (name: string, value: string) => {
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const allFieldsFilled = () => {
    return Object.values(inputValues).every((value) => value.trim() !== "");
  };

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
          <Text style={stylesMain.exersiceTitle}>Evaluacion de equilibrio</Text>
          <View style={[stylesMain.ContainerInput, { paddingBottom: 30 }]}>
            <Text style={stylesMain.metricTitle}>1.Equilibrio sentado</Text>
            <Text style={stylesMain.metricText}>
              0-Se recuesta o resbala de la silla
            </Text>
            <Text style={stylesMain.metricText}>1-estable y seguro</Text>
            <TextInput
              mode="outlined"
              label="De 0 a 1"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              value={inputValues.input1}
              onChangeText={(value) => handleInputChange("input1", value)}
            />
            <Text style={stylesMain.metricTitle}>2.Se levanta</Text>
            <Text style={stylesMain.metricText}>0-incapaz sin ayuda</Text>
            <Text style={stylesMain.metricText}>
              1-capaz pero usa los brazos
            </Text>
            <Text style={stylesMain.metricText}>
              2-capaz sin usar los brazos
            </Text>
            <TextInput
              mode="outlined"
              label="De 0 a 2"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              value={inputValues.input2}
              onChangeText={(value) => handleInputChange("input2", value)}
            />
            <Text style={stylesMain.metricTitle}>3.intenta levantarse</Text>
            <Text style={stylesMain.metricText}>0-incapaz sin ayuda</Text>
            <Text style={stylesMain.metricText}>
              1-Capaz pero requiere mas de un intento
            </Text>
            <Text style={stylesMain.metricText}>
              2-capaz en un solo intento
            </Text>
            <TextInput
              mode="outlined"
              label="De 0 a 2"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              value={inputValues.input3}
              onChangeText={(value) => handleInputChange("input3", value)}
            />
            <Text style={stylesMain.metricTitle}>
              4.Equilibrio inmediato de pie (15s)
            </Text>
            <Text style={stylesMain.metricText}>
              0-inestable (vacila o se balancea)
            </Text>
            <Text style={stylesMain.metricText}>
              1-Estable con bastos o apoyo
            </Text>
            <Text style={stylesMain.metricText}>2- estable sin apoyo</Text>
            <TextInput
              mode="outlined"
              label="De 0 a 2"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              style={stylesMain.InputMetrics}
              keyboardType="numeric"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              value={inputValues.input4}
              onChangeText={(value) => handleInputChange("input4", value)}
            />
            <Text style={stylesMain.metricTitle}>5.Equilibrio de pie</Text>
            <Text style={stylesMain.metricText}>0-inestable</Text>
            <Text style={stylesMain.metricText}>
              1-Estable con baston o abre los pies
            </Text>
            <Text style={stylesMain.metricText}>
              2-estable sin apoyo y los talones cerrados
            </Text>
            <TextInput
              mode="outlined"
              label="De 0 a 2"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              style={stylesMain.InputMetrics}
              keyboardType="numeric"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              value={inputValues.input5}
              onChangeText={(value) => handleInputChange("input5", value)}
            />
            <Text style={stylesMain.metricTitle}>
              6.Tocado(de pie, se le empuja levemente por el esternon 3 veces)
            </Text>
            <Text style={stylesMain.metricText}>0-Comienza a caer</Text>
            <Text style={stylesMain.metricText}>1-Vacila o se agarra</Text>
            <Text style={stylesMain.metricText}>2-Estable</Text>
            <TextInput
              mode="outlined"
              label="De 0 a 2"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              style={stylesMain.InputMetrics}
              keyboardType="numeric"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              value={inputValues.input6}
              onChangeText={(value) => handleInputChange("input6", value)}
            />
            <Text style={stylesMain.metricTitle}>7.Ojos cerrados (de pie)</Text>
            <Text style={stylesMain.metricText}>0-Inestable</Text>
            <Text style={stylesMain.metricText}>1-Estable</Text>
            <TextInput
              mode="outlined"
              label="De 0 a 1"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              style={stylesMain.InputMetrics}
              keyboardType="numeric"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              value={inputValues.input7}
              onChangeText={(value) => handleInputChange("input7", value)}
            />
            <Text style={stylesMain.metricTitle}>8.giro de 360°</Text>
            <Text style={stylesMain.metricText}>0-Pasos discontinuos</Text>
            <Text style={stylesMain.metricText}>1-Pasos continuos</Text>
            <TextInput
              mode="outlined"
              label="De 0 a 1"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              style={stylesMain.InputMetrics}
              keyboardType="numeric"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              value={inputValues.input8}
              onChangeText={(value) => handleInputChange("input8", value)}
            />
            <Text style={stylesMain.metricText}>0-InEstable</Text>
            <Text style={stylesMain.metricText}>1-Estable</Text>
            <TextInput
              mode="outlined"
              label="De 0 a 1"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              style={stylesMain.InputMetrics}
              keyboardType="numeric"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              value={inputValues.input9}
              onChangeText={(value) => handleInputChange("input9", value)}
            />
            <Text style={stylesMain.metricTitle}>9.Sentandose</Text>
            <Text style={stylesMain.metricText}>
              0-Inseguro, mide mal la distancia y cae sobre la silla
            </Text>
            <Text style={stylesMain.metricText}>1-Usa las manos</Text>
            <Text style={stylesMain.metricText}>2-Seguro</Text>
            <TextInput
              mode="outlined"
              label="De 0 a 2"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              style={stylesMain.InputMetrics}
              keyboardType="numeric"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              value={inputValues.input10}
              onChangeText={(value) => handleInputChange("input10", value)}
            />
          </View>

          <Text style={stylesMain.exersiceTitle}>Evaluacion de marcha</Text>

          <View style={[stylesMain.ContainerInput, { paddingBottom: 20 }]}>
            <Text style={stylesMain.metricTitle}>1.Inicio de marcha</Text>
            <Text style={stylesMain.metricText}>
              0-Vacila o varios intentos para empezar
            </Text>
            <Text style={stylesMain.metricText}>1-sin vacilacion</Text>
            <TextInput
              mode="outlined"
              label="De 0 a 1"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              value={inputValues.input11}
              onChangeText={(value) => handleInputChange("input11", value)}
            />

            <Text style={stylesMain.metricTitle}>
              2.Longitud y altura del paso
            </Text>
            <Text style={[stylesMain.metricText, { paddingVertical: 5 }]}>
              a) Balanceo del pie derecho
            </Text>
            <Text style={stylesMain.metricText}>
              0-no sobrepasa el pie izquierdo
            </Text>
            <Text style={stylesMain.metricText}>
              1-sobrepasa el pie izquierdo
            </Text>
            <TextInput
              mode="outlined"
              label="De 0 a 1"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              value={inputValues.input12}
              onChangeText={(value) => handleInputChange("input12", value)}
            />
            <Text style={[stylesMain.metricText, { paddingTop: 10 }]}>
              0-no se levanta completamente del piso
            </Text>
            <Text style={stylesMain.metricText}>
              1-se levanta completamente del piso
            </Text>
            <TextInput
              mode="outlined"
              label="De 0 a 1"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              value={inputValues.input13}
              onChangeText={(value) => handleInputChange("input13", value)}
            />

            <Text style={[stylesMain.metricText, { paddingVertical: 5 }]}>
              b) Balanceo del pie izquierdo
            </Text>
            <Text style={stylesMain.metricText}>
              0-no sobrepasa el pie derecho
            </Text>
            <Text style={stylesMain.metricText}>
              1-sobrepasa el pie derecho
            </Text>
            <TextInput
              mode="outlined"
              label="De 0 a 1"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              value={inputValues.input14}
              onChangeText={(value) => handleInputChange("input14", value)}
            />
            <Text style={[stylesMain.metricText, { paddingTop: 10 }]}>
              0-no se levanta completamente del piso
            </Text>
            <Text style={stylesMain.metricText}>
              1-se levanta completamente del piso
            </Text>
            <TextInput
              mode="outlined"
              label="De 0 a 1"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              value={inputValues.input15}
              onChangeText={(value) => handleInputChange("input15", value)}
            />
            <Text style={stylesMain.metricTitle}>3.Simetria de paso</Text>
            <Text style={stylesMain.metricText}>
              0-Longitud del paso derecho desigual al izquierdo
            </Text>
            <Text style={stylesMain.metricText}>
              1-Pasos derechos e izquierdos iguales
            </Text>
            <TextInput
              mode="outlined"
              label="De 0 a 1"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              value={inputValues.input16}
              onChangeText={(value) => handleInputChange("input16", value)}
            />
            <Text style={stylesMain.metricTitle}>
              4.Continuidad de los pasos
            </Text>
            <Text style={stylesMain.metricText}>
              0-Discontinuidad de los pasos
            </Text>
            <Text style={stylesMain.metricText}>
              1-Continuidad de los pasos
            </Text>
            <TextInput
              mode="outlined"
              label="De 0 a 1"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              value={inputValues.input17}
              onChangeText={(value) => handleInputChange("input17", value)}
            />
            <Text style={stylesMain.metricTitle}>5.Pasos</Text>
            <Text style={stylesMain.metricText}>0-Desviacion marcada</Text>
            <Text style={stylesMain.metricText}>
              1-Desviacion moderada o usa ayuda
            </Text>
            <Text style={stylesMain.metricText}>
              2-En linea recta sin ayuda
            </Text>
            <TextInput
              mode="outlined"
              label="De 0 a 2"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              value={inputValues.input18}
              onChangeText={(value) => handleInputChange("input18", value)}
            />
            <Text style={stylesMain.metricTitle}>6.Tronco</Text>
            <Text style={stylesMain.metricText}>
              0-Balanceo marcado o usa ayuda
            </Text>
            <Text style={stylesMain.metricText}>
              1-sin balanceo pero flexiona rodillas, espalda o abre los brazos
            </Text>
            <Text style={stylesMain.metricText}>
              2-sin balanceo, sin flexion y sin ayuda
            </Text>
            <TextInput
              mode="outlined"
              label="De 0 a 2"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              value={inputValues.input19}
              onChangeText={(value) => handleInputChange("input19", value)}
            />
            <Text style={stylesMain.metricTitle}>7.Posicion al caminar</Text>
            <Text style={stylesMain.metricText}>0-Talones separados</Text>
            <Text style={stylesMain.metricText}>
              1-Talones casi se tocan al caminar
            </Text>
            <TextInput
              mode="outlined"
              label="De 0 a 1"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              value={inputValues.input20}
              onChangeText={(value) => handleInputChange("input20", value)}
            />
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center",
                marginTop: 20,
                width: 100,
              }}
              onPress={accionEvaluar}
              disabled={!allFieldsFilled()}
            >
              <Text style={[stylesMain.metricTitle, { fontSize: 20 }]}>
                Evaluar
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
              {message}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
