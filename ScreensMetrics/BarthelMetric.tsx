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

export default function BarthelMetric() {
  const [pacienteId, setPacienteId] = useState<string | null>(null);
  const [pacienteTipo, setPacienteTipo] = useState<string | null>(null);

  const [result, setResult] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [state, setState] = useState("");

  const name = "Barthel";

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

  const sendSeverity = async () => {

    const sum =
      parseFloat(fields.comer) +
      parseFloat(fields.traslado) +
      parseFloat(fields.aseo) +
      parseFloat(fields.retrete) +
      parseFloat(fields.banarse) +
      parseFloat(fields.desplazarse) +
      parseFloat(fields.escaleras) +
      parseFloat(fields.vestirse) +
      parseFloat(fields.controlHeces) +
      parseFloat(fields.controlOrina);
    setResult(sum);
    console.log("Sum of values:", sum);

    if (sum >= 0 && sum <= 24) {
      setState("1");
    }
    if (sum >= 25 && sum <= 49) {
      setState("2");
    }
    if (sum >= 50 && sum <= 74) {
      setState("3");
    }
    if (sum >= 75 && sum <= 90) {
      setState("4");
    }
    if (sum >= 91 && sum <= 100) {
      setState("5");
    }

    console.log("State:", state);
  }

  const [fields, setFields] = useState({
    comer: "",
    traslado: "",
    aseo: "",
    retrete: "",
    banarse: "",
    desplazarse: "",
    escaleras: "",
    vestirse: "",
    controlHeces: "",
    controlOrina: "",
  });

  const allFieldsFilled = () => {
    return Object.values(fields).every((field) => field.trim() !== "");
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
            <Text style={stylesMain.metricTitle}>Actividad: Comer</Text>
            <Text style={stylesMain.metricText}>0-Incapaz</Text>
            <Text style={stylesMain.metricText}>
            1. Necesita ayuda para cortar, extender mantequilla, usar condimentos, etc.
            </Text>
            <Text style={stylesMain.metricText}>
            2. Independiente (la comida al alcance de la mano).
            </Text>
            <TextInput
              mode="outlined"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              label="De 0 a 10"
              value={fields.comer}
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(text) => setFields({ ...fields, comer: text })}
            />
            <Text style={stylesMain.metricTitle}>
              Actividad: Trasladarse entre la silla y la cama
            </Text>
            <Text style={stylesMain.metricText}>
            0. Incapaz, no se mantiene sentado.
            </Text>
            <Text style={stylesMain.metricText}>
            1. Necesita ayuda importante (1 persona entrenada o 2 personas), puede estar sentado.
            </Text>
            <Text style={stylesMain.metricText}>
            2. Necesita algo de ayuda (pequeña ayuda física o verbal).
            </Text>
            <Text style={stylesMain.metricText}>3-Independiente</Text>
            <TextInput
              mode="outlined"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              label="De 0 a 15"
              value={fields.traslado}
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(text) => setFields({ ...fields, traslado: text })}
            />
            <Text style={stylesMain.metricTitle}>Actividad: Aseo personal</Text>
            <Text style={stylesMain.metricText}>0. Necesita ayuda</Text>
            <Text style={stylesMain.metricText}>
            1. Independiente para lavarse la cara, las manos, los dientes, peinarse y afeitarse.
            </Text>
            <TextInput
              mode="outlined"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              label="De 0 a 5"
              value={fields.aseo}
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(text) => setFields({ ...fields, aseo: text })}
            />
            <Text style={stylesMain.metricTitle}>
              Actividad: Uso del retrete
            </Text>
            <Text style={stylesMain.metricText}>0. Dependiente</Text>
            <Text style={stylesMain.metricText}>
              1. Necesita poca ayuda, pero puede hacer algo solo
            </Text>
            <Text style={stylesMain.metricText}>
              2. Independiente (entrar, salir, limpiarse, vestirse)
            </Text>
            <TextInput
              mode="outlined"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              label="De 0 a 10"
              value={fields.retrete}
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(text) => setFields({ ...fields, retrete: text })}
            />
            <Text style={stylesMain.metricTitle}>
              Actividad: Bañarse o ducharse
            </Text>
            <Text style={stylesMain.metricText}>0. Dependiente</Text>
            <Text style={stylesMain.metricText}>
              1. Independiente para bañarse o ducharse
            </Text>
            <TextInput
              mode="outlined"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              label="De 0 a 5"
              value={fields.banarse}
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(text) => setFields({ ...fields, banarse: text })}
            />
            <Text style={stylesMain.metricTitle}>Actividad: Desplazarse</Text>
            <Text style={stylesMain.metricText}>0. Inmovil</Text>
            <Text style={stylesMain.metricText}>
            1. Independiente en silla de ruedas en 50 m o menos.
            </Text>
            <Text style={stylesMain.metricText}>
            2. Anda con pequeña ayuda de una persona (física o verbal).
            </Text>
            <Text style={stylesMain.metricText}>
            3. Independiente al menos 50 m, con cualquier tipo de muleta, excepto andador.
            </Text>
            <TextInput
              mode="outlined"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              label="De 0 a 15"
              value={fields.desplazarse}
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(text) =>
                setFields({ ...fields, desplazarse: text })
              }
            />
            <Text style={stylesMain.metricTitle}>
              Actividad: Subir y bajar escaleras
            </Text>
            <Text style={stylesMain.metricText}>0. Incapaz</Text>
            <Text style={stylesMain.metricText}>
            1. Necesita ayuda física o verbal, puede llevar cualquier tipo de muleta.
            </Text>
            <Text style={stylesMain.metricText}>
              2. Independiente para subir y bajar
            </Text>
            <TextInput
              mode="outlined"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              label="De 0 a 10"
              value={fields.escaleras}
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(text) => setFields({ ...fields, escaleras: text })}
            />
            <Text style={stylesMain.metricTitle}>
              Actividad: vestirse y desvestirse
            </Text>
            <Text style={stylesMain.metricText}>0. Dependiente</Text>
            <Text style={stylesMain.metricText}>
              1. Necesita ayuda, puede hacer aproximadamente la mitad, sin ayuda
            </Text>
            <Text style={stylesMain.metricText}>
              2. Independiente, incluyendo botones, cremalleras, cordones, etc.
            </Text>
            <TextInput
              mode="outlined"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              label="De 0 a 10"
              value={fields.vestirse}
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(text) => setFields({ ...fields, vestirse: text })}
            />
            <Text style={stylesMain.metricTitle}>
              Actividad: Control de heces
            </Text>
            <Text style={stylesMain.metricText}>
              0-Incontinente (o necesita suministro de enema)
            </Text>
            <Text style={stylesMain.metricText}>
              1-Accidente excepcional (1/semana)
            </Text>
            <Text style={stylesMain.metricText}>2-Continente</Text>
            <TextInput
              mode="outlined"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              label="De 0 a 10"
              value={fields.controlHeces}
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(text) =>
                setFields({ ...fields, controlHeces: text })
              }
            />
            <Text style={stylesMain.metricTitle}>
              Actividad: Control de orina
            </Text>
            <Text style={stylesMain.metricText}>
              0-Incontinente, o sondado incapaz de cambiarse la bolsa
            </Text>
            <Text style={stylesMain.metricText}>
              1-accidente excepcional (maximo 1/24hrs)
            </Text>
            <Text style={stylesMain.metricText}>
              2-continente, durante al menos 7 dias
            </Text>
            <TextInput
              mode="outlined"
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              label="De 0 a 10"
              value={fields.controlOrina}
              style={stylesMain.InputMetrics}
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(text) =>
                setFields({ ...fields, controlOrina: text })
              }
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
