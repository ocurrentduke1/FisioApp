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

export default function BarthelMetric({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [result, setResult] = useState<number | null>(null);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

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

  function evaluate() {
    const sum =
      parseFloat(fields.comer) +
      parseFloat(fields.traslado) +
      parseFloat(fields.aseo)+
      parseFloat(fields.retrete) +
      parseFloat(fields.banarse) +
      parseFloat(fields.desplazarse) +
      parseFloat(fields.escaleras) +
      parseFloat(fields.vestirse) +
      parseFloat(fields.controlHeces) +
      parseFloat(fields.controlOrina);
    setResult(sum);
    console.log("Sum of values:", sum);
  }

  const allFieldsFilled = () => {
    return Object.values(fields).every(field => field.trim() !== '');
  };

  const canSaveResult = () => {
    return result !== null;
  };

  function getSeverityMessage(sum: number | null): string {
    if (sum === null) return "";
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
        <ScrollView style={stylesMain.scrollMetrics}>
          <View style={[stylesMain.ContainerInput, { height: 1730 }]}>
            <Text style={stylesMain.metricTitle}>Actividad: Comer</Text>
            <Text style={stylesMain.metricText}>0-Incapaz</Text>
            <Text style={stylesMain.metricText}>
              1-Necesita ayuda para cortar, extender mantequilla, usar
              condimentos, etc.
            </Text>
            <Text style={stylesMain.metricText}>
              2-Independiente(la comida al alcance de la mano)
            </Text>
            <TextInput
              value={fields.comer}
              style={stylesMain.InputMetrics}
              placeholder="De 0 a 2"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(text) => setFields({ ...fields, comer: text })}
            />
            <Text style={stylesMain.metricTitle}>
              Actividad: Trasladarse entre la silla y la cama
            </Text>
            <Text style={stylesMain.metricText}>
              0-Incapaz, no se mantiene sentado
            </Text>
            <Text style={stylesMain.metricText}>
              1-Necesita ayuda importante (1 persona entrenada o 2 personas),
              puede estar sentado
            </Text>
            <Text style={stylesMain.metricText}>
              2-Necesita algo de ayuda (pequeña ayuda fisica o verbal)
            </Text>
            <Text style={stylesMain.metricText}>3-Independiente</Text>
            <TextInput
              value={fields.traslado}
              style={stylesMain.InputMetrics}
              placeholder="De 0 a 3"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(text) => setFields({ ...fields, traslado: text })}
            />
            <Text style={stylesMain.metricTitle}>Actividad: Aseo personal</Text>
            <Text style={stylesMain.metricText}>0-Necesita ayuda</Text>
            <Text style={stylesMain.metricText}>
              1-Independiente para lavarse cara, manos, dientes, peinarse y
              afeitarse
            </Text>
            <TextInput
              value={fields.aseo}
              style={stylesMain.InputMetrics}
              placeholder="De 0 a 1"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(text) => setFields({ ...fields, aseo: text })}
            />
            <Text style={stylesMain.metricTitle}>
              Actividad: Uso del retrete
            </Text>
            <Text style={stylesMain.metricText}>0-Dependiente</Text>
            <Text style={stylesMain.metricText}>
              1-Necesita poca ayuda, pero puede hacer algo solo
            </Text>
            <Text style={stylesMain.metricText}>
              2-Independiente (entrar, salir, limpiarse, vestirse)
            </Text>
            <TextInput
              value={fields.retrete}
              style={stylesMain.InputMetrics}
              placeholder="De 0 a 2"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(text) => setFields({ ...fields, retrete: text })}
            />
            <Text style={stylesMain.metricTitle}>
              Actividad: Bañarse o ducharse
            </Text>
            <Text style={stylesMain.metricText}>0-Dependiente</Text>
            <Text style={stylesMain.metricText}>
              1-Independiente para bañarse o ducharse
            </Text>
            <TextInput
              value={fields.banarse}
              style={stylesMain.InputMetrics}
              placeholder="De 0 a 1"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(text) => setFields({ ...fields, banarse: text })}
            />
            <Text style={stylesMain.metricTitle}>Actividad: Desplazarse</Text>
            <Text style={stylesMain.metricText}>0-Inmovil</Text>
            <Text style={stylesMain.metricText}>
              1-Independiente en silla de ruedas en 50m o menos
            </Text>
            <Text style={stylesMain.metricText}>
              2-Anda con pequeña ayuda de una persona(Fisica o verbal)
            </Text>
            <Text style={stylesMain.metricText}>
              3-Independiente al menos 50m, con cualquier tipo de muleta,
              excepto andador
            </Text>
            <TextInput
              value={fields.desplazarse}
              style={stylesMain.InputMetrics}
              placeholder="De 0 a 3"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(text) => setFields({ ...fields, desplazarse: text })}
            />
            <Text style={stylesMain.metricTitle}>
              Actividad: Subir y bajar escaleras
            </Text>
            <Text style={stylesMain.metricText}>0-Incapaz</Text>
            <Text style={stylesMain.metricText}>
              1-Necesita ayuda fisica o verbal, puede llevar cualquier tipo de
              muleta
            </Text>
            <Text style={stylesMain.metricText}>
              2-Independiente para subir y bajar
            </Text>
            <TextInput
              value={fields.escaleras}
              style={stylesMain.InputMetrics}
              placeholder="De 0 a 2"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(text) => setFields({ ...fields, escaleras: text })}
            />
            <Text style={stylesMain.metricTitle}>
              Actividad: vestirse y desvestirse
            </Text>
            <Text style={stylesMain.metricText}>0-Dependiente</Text>
            <Text style={stylesMain.metricText}>
              1-Necesita ayuda, puede hacer aproximadamente la mitad, sin ayuda
            </Text>
            <Text style={stylesMain.metricText}>
              2-Independiente, incluyendo botones, cremalleras, cordones, etc.
            </Text>
            <TextInput
              value={fields.vestirse}
              style={stylesMain.InputMetrics}
              placeholder="De 0 a 2"
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
              value={fields.controlHeces}
              style={stylesMain.InputMetrics}
              placeholder="De 0 a 2"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(text) => setFields({ ...fields, controlHeces: text })}
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
              value={fields.controlOrina}
              style={stylesMain.InputMetrics}
              placeholder="De 0 a 2"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              keyboardType="numeric"
              onChangeText={(text) => setFields({ ...fields, controlOrina: text })}
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
            style={[stylesMain.resultsMetrics, { height: windowHeight * 0.3 }]}
          >
            <Text style={{ marginBottom: 1, fontSize: 24, color: "white" }}>
              Resultado
            </Text>
            <Text style={{ marginBottom: 1, fontSize: 20, color: "white" }}>
              {result == null ? "" : `${result}`}
            </Text>
            <Text style={{ marginBottom: 1, fontSize: 20, color: "white" }}>
              {getSeverityMessage(result)}
            </Text>
            <Text style={{ marginBottom: 1, fontSize: 24, color: "white" }}>
              Ejercicios Recomendados
            </Text>
            <Text style={{ marginBottom: 1, fontSize: 20, color: "white" }}>
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
