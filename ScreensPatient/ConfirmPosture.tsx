import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import { NavigationProp } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import stylesHistorial from "../styles/stylesHistorial";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type RouteParams = {
  params: {
    imageSource: {
      uri: string;
    };
    exercise: string;
    instructions: string;
    title: string
  };
};

// Suponiendo que este es tu componente
const ConfirmPosture = ({
  navigation,
  route,
}: {
  route: RouteProp<RouteParams, "params">;
  navigation: NavigationProp<any>;
}) => {
  const { imageSource, exercise, instructions, title } = route.params;

  return (
    <SafeAreaView style={stylesHistorial.container}>
      <View style={stylesHistorial.containerRegistro}>
        <Text style={styles.title}>{ title }</Text>
        <Image
          source={imageSource}
          style={styles.gifStyle}
        />
        <View style={styles.boxFlex}>
          <MaterialCommunityIcons name="help-circle" size={35}></MaterialCommunityIcons>
          <Text style={styles.subtitle}>
            ¿Qué debo hacer?
          </Text>
        </View>

        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
      <TouchableOpacity
        style={stylesHistorial.button}
        onPress={() => navigation.navigate("CamaraImagen", { exercise })}
      >
        <Text style={stylesHistorial.buttonText}>Evaluar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "black",
    fontWeight: 'bold',
    textAlign: "center",
    marginVertical: 20
  },
  gifStyle: {
    width: 200,
    height: 250,
    resizeMode: "contain",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  boxFlex: {
    flexDirection: 'column',  
    alignItems: 'center', 
    marginVertical: 10, 
    padding: 8
  },
  instructions: {
    fontSize: 15,
    textAlign: "justify",
    marginHorizontal: 13
  }
});

export default ConfirmPosture;
