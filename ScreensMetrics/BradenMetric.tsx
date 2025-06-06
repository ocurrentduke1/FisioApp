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
import { RadioButton } from "react-native-paper";

export default function BradenMetric() {

  const [pacienteId, setPacienteId] = useState<string | null>(null);
    const [pacienteTipo, setPacienteTipo] = useState<string | null>(null);

  const [Sensorial, setSensorial] = useState("");
  const [Humedad, setHumedad] = useState("");
  const [Actividad, setActividad] = useState("");
  const [Movilidad, setMovilidad] = useState("");
  const [Nutricion, setNutricion] = useState("");
  const [Friccion, setFriccion] = useState("");

  const name = "Braden";

  const [result, setResult] = useState<number | null>(null);
  const [state, setState] = useState("");
  const [message, setMessage] = useState<string>("");

  const evaluate = async () => {

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
    
    const sum =
      parseFloat(Sensorial) +
      parseFloat(Humedad) +
      parseFloat(Actividad) +
      parseFloat(Movilidad) +
      parseFloat(Nutricion) +
      parseFloat(Friccion);
    setResult(sum);
    console.log("Sum of values:", sum);

    if (sum === null) return null;
    if (sum <= 12) {
      setState("1");
    };
    if (sum == 13 || sum == 14){
      setState("2");
    };
    if (sum >= 15 && sum <= 18){
      setState("3");
    };

    console.log("State:", state);
  };

  const allFieldsFilled = () => {
    return (
      Sensorial.trim() !== "" &&
      Humedad.trim() !== "" &&
      Actividad.trim() !== "" &&
      Movilidad.trim() !== "" &&
      Nutricion.trim() !== "" &&
      Friccion.trim() !== ""
    );
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
          <View style={[stylesMain.ContainerInput, { paddingBottom: 20 }]}>
            <Text
              style={[
                stylesMain.metricTitle,
                { fontSize: 18, alignSelf: "center" },
              ]}
            >
              Percepción sensorial.
            </Text>
            <RadioButton.Group
              onValueChange={(newValue) => setSensorial(newValue)}
              value={Sensorial}
            >
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="1" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>
                  Completamente limitada
                </Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="2" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>Muy limitada.</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="3" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>ligeramente limitada</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="4" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>sin limitaciones</Text>
              </View>
            </RadioButton.Group>

            <Text
              style={[
                stylesMain.metricTitle,
                { fontSize: 18, alignSelf: "center" },
              ]}
            >
              Exposición a la humedad.
            </Text>

            <RadioButton.Group
              onValueChange={(newValue) => setHumedad(newValue)}
              value={Humedad}
            >
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="1" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>Constantemente húmeda</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="2" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>A menudo húmeda</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="3" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>Ocasionalmente húmeda.</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="4" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>Raramente húmeda.</Text>
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
                <RadioButton value="1" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>Encamado/a</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="2" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>En silla</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="3" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>
                  Deambula ocasionalmente
                </Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="4" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>
                  Deambula frecuentemente
                </Text>
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
                <RadioButton value="1" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>Completamente inmóvil.</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="2" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>Muy limitada</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="3" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>Ligeramente limitada</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="4" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>Sin limitaciones</Text>
              </View>
            </RadioButton.Group>

            <Text
              style={[
                stylesMain.metricTitle,
                { fontSize: 18, alignSelf: "center" },
              ]}
            >
              Nutrición
            </Text>

            <RadioButton.Group
              onValueChange={(newValue) => setNutricion(newValue)}
              value={Nutricion}
            >
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="1" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>Muy pobre</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="2" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>Muy limitada</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="3" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>Ligeramente limitada</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="4" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>Sin limitaciones</Text>
              </View>
            </RadioButton.Group>

            <Text
              style={[
                stylesMain.metricTitle,
                { fontSize: 18, alignSelf: "center" },
              ]}
            >
              Fricción y cizallamiento.
            </Text>

            <RadioButton.Group
              onValueChange={(newValue) => setFriccion(newValue)}
              value={Friccion}
            >
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="1" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>Problema</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="2" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>Problema potencial</Text>
              </View>
              <View style={stylesMain.radioButtonContainer}>
                <RadioButton value="3" uncheckedColor="#BDBDBD" />
                <Text style={stylesMain.metricText}>
                  No existe problema aparente
                </Text>
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
