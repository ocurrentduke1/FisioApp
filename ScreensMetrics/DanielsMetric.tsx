import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import stylesMain from "../styles/stylesMain";
import { RadioButton, TextInput } from "react-native-paper";
import { RouteProp } from "@react-navigation/native";

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

export default function DanielsMetric({
  route,
  navigation,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<RouteParams, "params">;
}) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const name = "Daniels modificada";

  const datapaciente = route.params.paciente;

  console.log(datapaciente);

  const [muscle, setMuscle] = useState("");
  const [side, setSide] = useState("");
  const [state, setState] = useState("");
  const [result, setResult] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  const evaluate = () => {
    let message = "";
    switch (state) {
      case "0":
        message = "Paralisis Total o ausencia de movimiento";
        break;
      case "1":
        message = "Contraccion minima visible, pero sin movimiento";
        break;
      case "2":
        message =
          "Contraccion escasa, con movimiento, pero inexistente con resistencia";
        break;
      case "3-":
        message =
          "Contraccion regular negativa, con movimiento parcial y liberacion gradual desde la posicion de prueba";
        break;
      case "3":
        message =
          "Contraccion regular, con movimiento parcial y con la gravedad como unica resistencia";
        break;
      case "3+":
        message =
          "Contraccion regular positiva, con movimiento completo, pero solo en contra de la gravedad";
        break;
      case "4-":
        message =
          "Contraccion buena negativa o regular, con movimiento completo contra la gravedad y con la aplicacion de resistencia minima";
        break;
      case "4":
        message =
          "Contraccion buena, con movimiento completo contra la gravedad y con la aplicacion de resistencia Moderada";
        break;
      case "4+":
        message =
          "Contraccion buena positiva, con movimiento completo contra la gravedad y con la aplicacion de resistencia fuerte";
        break;
      case "5":
        message =
          "Contraccion normal, con movimiento completo contra la gravedad y con la aplicacion de resistencia maxima";
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
          <View style={[stylesMain.ContainerInput, /*{ height: 900 }*/]}>
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
            style={[stylesMain.resultsMetrics,/* { height: windowHeight * 0.35 }*/]}
          >
            {result == null  ? (
              <View />
            ) : (
              <View>
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
