import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@env";
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
import { RadioButton, TextInput } from "react-native-paper";
import { RouteProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

// Define your route params structure here. This is an example.
type RouteParams = {
  params: {
    paciente: {
      id: string;
      nombre: string;
      imagenPerfil: string;
      apellidos: string;
      fechaNacimiento: string;
      sexo: string;
      ubicacion: string;
      proximaCita: string;
      numeroContacto: string;
      mail: string;
      tipo: string;
      horaCita: string;
    };
  };
};

export default function AshwortMetric({
  route,
  navigation,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<RouteParams, "params">;
}) {
  const windowHeight = Dimensions.get("window").height;

  const datapaciente = route.params.paciente;

  console.log(datapaciente);

  const [userID, setUserID] = useState<string | null>(null);

  const [muscle, setMuscle] = useState("");
  const [side, setSide] = useState("");
  const [state, setState] = useState("");
  const [result, setResult] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const name = "Ashwort";

  const getUserID = async () => {
    const id = await AsyncStorage.getItem("idSesion");
    console.log("Fetched UserID:", id); // Verifica que el ID se obtenga correctamente
    setUserID(id);
  };

  useFocusEffect(
      useCallback(() => {
        getUserID();
      }, [])
    );

    const sendToServer = async () => {
      const response = await axios.post(
        `${BACKEND_URL}/verificar-codigo-recuperacion`,
        {
          id: datapaciente.id,
          fisioId: userID,
          escala: name,
          valor: state,
        }
      );

      if (response.data.code === 200) {
        
      }
    };

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
    <View style={[stylesMain.container, { alignItems: "center" }]}>
      <SafeAreaView style={stylesMain.datosMetricas}>
        <ScrollView style={stylesMain.scrollMetrics}>
          <View style={[stylesMain.ContainerInput, { height: 630 }]}>
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
                    sin aumento en tono muscular
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="1" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                    aumento leve, resistencia minima al final del rango
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="1+" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                    aumento leve, resistencia minima durante el resto del rango
                    de movimiento
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="2" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                    aumento pronunciado, la parte afectada se mueve con
                    facilidad
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="3" uncheckedColor="#BDBDBD" />
                  <Text style={stylesMain.metricText}>
                    aumento considerable, el movimiento pasivo es dificil
                  </Text>
                </View>
                <View style={stylesMain.radioButtonContainer}>
                  <RadioButton value="4" uncheckedColor="#BDBDBD" />
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
            <Text style={{ marginBottom: 1, fontSize: 24, color: "#000" }}>
              Resultado
            </Text>
            <Text style={{ marginBottom: 1, fontSize: 18, color: "#000" }}>
              {result == null ? "" : `${result}`}
            </Text>
            <Text style={{ marginBottom: 1, fontSize: 24, color: "#000" }}>
              Ejercicios Recomendados
            </Text>
            <Text style={{ marginBottom: 1, fontSize: 20, color: "#000" }}>
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
