import React, { useCallback, useState } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Video } from "expo-av";
import { BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function ConfirmVideo({
  navigation,
  route,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}) {
  function closeImage() {
    navigation.goBack();
  }

  const { video, exercise, port } = route.params as { video: string, exercise: string, port: string };
  const [userID, setUserID] = useState<string | null>(null);
  console.log(port);

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

  console.log(exercise);

  const sendVideoToServer = async () => {
    try {
      const formData = new FormData();
      const videoBlob = {
        uri: video,
        type: 'video/mp4', // o el tipo de imagen que sea
        name: 'video.mp4',
      } as any;

      formData.append('video', videoBlob);
      formData.append('exercise', exercise);
      formData.append('port', port);
      formData.append('idFisio', userID!);

      // Imprime el contenido de FormData para verificar
      console.log('FormData content:');
      console.log('video:', videoBlob);
      console.log('formData:', formData);

      const response = await axios.post(BACKEND_URL + '/obtener-postura-video', formData,  {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        console.log('Éxito Video enviado correctamente');
        console.log('Respuesta del servidor:', response.data);
        navigation.navigate("Results", { results: response.data });
      } else {
        console.log('Error No se pudo enviar el video');
      }
    } catch (error) {
      console.error(error);
      console.log(' Ocurrió un error al enviar el video');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.mainContainer}>
        <Video
          source={{ uri: video }}
          style={styles.photo}
          shouldPlay
          isLooping
          useNativeControls
          isMuted={true}
        />
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
            onPress={sendVideoToServer}
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
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 6 }, 
    shadowOpacity: 0.8, 
    shadowRadius: 6, 
    elevation: 8, 
  },
  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "400",
  },
});
