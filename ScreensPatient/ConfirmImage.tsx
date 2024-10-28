import React, { useCallback, useState } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function ConfirmImage({
  navigation,
  route,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}) {
  function closeImage() {
    navigation.goBack();
  }

  const { image, exercise } = route.params as { image: string; exercise: string };
  const [userID, setUserID] = useState<string | null>(null);

  const getUserID = async () => {
    const id = await AsyncStorage.getItem('idSesion');
    console.log("Fetched UserID:", id); // Verifica que el ID se obtenga correctamente
    setUserID(id);
  };

  useFocusEffect(
    useCallback(() => {
      getUserID();
    }, [])
  );

  const sendImageToServer = async () => {
    try {
      const formData = new FormData();
      const imageBlob = {
        uri: image,
        type: 'image/jpg', // o el tipo de imagen que sea
        name: 'photo.jpg',
      } as any;

      formData.append('image', imageBlob);
      formData.append('exercise', exercise);
      formData.append('idFisio', userID!);

      // Imprime el contenido de FormData para verificar
      console.log('FormData content:');
      console.log('image:', imageBlob);
      console.log('formData:', formData);

      const response = await axios.post(BACKEND_URL + '/obtener-postura-imagen', formData,  {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        console.log('Éxito Imagen enviada correctamente');
        console.log('Respuesta del servidor:', response.data);
        navigation.navigate("Results", { results: response.data });
      } else {
        console.log('Error No se pudo enviar la imagen');
      }
    } catch (error) {
      console.error(error);
      console.log(' Ocurrió un error al enviar la imagen');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.mainContainer}>
        <Image source={{ uri: image }} style={styles.photo} />
        <TouchableOpacity
          style={{
            position: "absolute",
            left: "5%",
            top: "6%",
          }}
          onPress={closeImage}
        >
          <Icon name="chevron-left" size={30} color="#757575" />
        </TouchableOpacity>
        <View style={styles.detect}>
          <TouchableOpacity
            style={styles.pressable}
            onPress={sendImageToServer}
          >
            <Text style={styles.text}>Evaluar</Text>
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2196F3",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    top: 20,
    flex: 1,
    width: width - 10,
  },
  photo: {
    flex: 1,
    borderRadius: 20,
  },
  detect: {
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#00BCD4",
    borderRadius: 50,
    width: 130,
    height: 50,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 16 },
    shadowOpacity: 0.5, 
    shadowRadius: 6, 
    elevation: 8,
  },
  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "400",
  },
});
