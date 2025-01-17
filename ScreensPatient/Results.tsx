import React, {useRef, useEffect, useState} from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Animated
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import stylesHistorial from "../styles/stylesHistorial";
import { RouteProp } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Dialog } from "react-native-paper";

// Suponiendo que este es tu componente
const Results = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}) => {
  const { results } = route.params as { results: any };
  const border = useRef(new Animated.Value(1)).current; 
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {

    const parpadeo = Animated.loop(
      Animated.sequence([
        Animated.timing(border, {
          toValue: 0,  
          duration: 500,  
          useNativeDriver: true,  
        }),
        Animated.timing(border, {
          toValue: 1,  
          duration: 500,  
          useNativeDriver: true,
        }),
      ])
    );
    
    parpadeo.start();

    return () => parpadeo.stop();
  }, [border]);

  const interpolatedBorderColor = border.interpolate({
    inputRange: [0, 1],
    outputRange: ['#808080', '#FFFFFF'], 
  });

  return (
    <SafeAreaView style={stylesHistorial.container}>
      <View style={styles.rowView}>
        <FontAwesome5 name="tasks" size={30} color="#FFF" style={styles.titleIcon}></FontAwesome5>
        <Text style={[styles.title]}>
            Resultados de la evaluación
        </Text>
      </View>
      <View style={stylesHistorial.containerRegistro}>
        <ScrollView>
          
            <TouchableOpacity style={styles.rowView} onPress={() => { setDialogVisible(true) }}>
              <MaterialCommunityIcons name="angle-acute" size={30} color="#000" style={styles.textIcon}></MaterialCommunityIcons>
              <Animated.Text style={[styles.textAngle, {fontWeight: 'bold', borderColor: interpolatedBorderColor, borderWidth: 2 }]}>
                  {results.angulo} °
              </Animated.Text>
              <Feather name="info" size={15} color="#000" style={styles.iconInfo}></Feather>
            </TouchableOpacity>

          <Text style={styles.textSubtitle}>Recomendaciones:</Text>
          <Text style={styles.text}>{results.recomendacion}</Text>
        </ScrollView>
      </View>

      <View style={styles.rowView}>
        <FontAwesome name="warning" size={15} color="#FFF" ></FontAwesome>
        <Text style={[styles.textWarning, styles.underlineText]}>FisioApp</Text>
        <Text style={styles.textWarning}>puede cometer errores. Solo se debe usar como</Text>
        <Text style={[styles.textWarning, {marginLeft: 2, fontWeight: 'bold'}]}>referencia.</Text>
      </View>
      
      <View style={styles.rowView}>
        <FontAwesome name="info" size={15} color="#FFF" ></FontAwesome>
        <Text style={styles.textWarning}>Para más Información de click</Text>
        <Text style={[styles.textWarning, {marginLeft: 2, fontWeight: 'bold'}]}>aquí.</Text>
      </View>

      <TouchableOpacity
        style={[stylesHistorial.button, { marginTop: 0, backgroundColor: "#04ADBF", }]}
        onPress={() => {
          navigation.navigate("VerExpedientePaciente");
        }}
      >
        <View style={styles.rowView}>
          <MaterialIcons style={{ marginRight: 10 }} name="arrow-back" size={28} color={'white'}/>
          <Text style={styles.backButtonText}>Volver</Text>
        </View>
      </TouchableOpacity>

      <Dialog visible={dialogVisible} onDismiss={() => { setDialogVisible(false)}}>
      <Dialog.Icon icon={() => <MaterialCommunityIcons name="information" size={50}/>} />
      <Dialog.Title style={styles.dialogTitle}>Información de la evaluación</Dialog.Title>
        <Dialog.Content>
          <Text style={{ alignSelf: "center" }}>
            El resultado muestra los grados que se obtuvieron desde - lugar - hasta el punto final del ejercicio (incluyendo su recorrido).
          </Text>
          <TouchableOpacity
            onPress={() => { setDialogVisible(false) }}
            style={{ alignSelf: "center", paddingTop: 30 }}
          >
            <Text style={{ fontSize: 20 }}> Aceptar </Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>
    </SafeAreaView>

  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: "black",
    textAlign: "justify",
    margin: 20,
  },
  textAngle: {
    fontSize: 24,
    color: "black",
    textAlign: "center",
    marginTop: 20,
  },
  textWarning: {
    fontSize: 10,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    marginLeft: 5,
  },
  underlineText: {
    textDecorationLine: "underline",
    marginRight: -2,
  },
  textSubtitle: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  dialogTitle: {
    textAlign: "center",
  },
  titleIcon: {
    marginTop: 22,
    marginRight: 20,
  },
  textIcon: {
    marginTop: 22,
    marginRight: 10,
  },
  iconInfo: {
    marginTop: 28,
    marginLeft: 10,
  },
  rowView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20
  }
});

export default Results;
