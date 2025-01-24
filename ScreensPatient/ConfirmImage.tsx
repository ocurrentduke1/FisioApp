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

import {
  Snackbar
} from "react-native-paper";

import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ActivityIndicator } from "react-native-paper";

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

  const { image, exercise } = route.params as {
    image: string;
    exercise: string;
  };
  const [userID, setUserID] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const onDismissSnackBar = () => setShowSnackbar(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

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

  const sendImageToServer = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      const imageBlob = {
        uri: image,
        type: "image/jpg", // o el tipo de imagen que sea
        name: "photo.jpg",
      } as any;

      formData.append("file", imageBlob);
      formData.append("exercise", exercise);
      formData.append("idPaciente", userID!);
      formData.append("type", 'imagen');

      const response = await axios.post(
        BACKEND_URL + "/analizar-postura",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.code === 200) {
        navigation.navigate("Results", { 
          results: response.data,
        });
        return;
      } 

      if (response.data.code === 400) {
        setSnackbarMessage(response.data.message);
        setShowSnackbar(true);
        return;
      } 

      throw new Error(response.data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator
                animating={loading}
                size="small"
                color="white"
              />
            ) : (
              <>
                <MaterialIcons name="image-search" size={24} color="white" />
                <Text style={styles.text}>Analizar</Text>
              </>
            )}
          </TouchableOpacity>
          <Snackbar
            visible={showSnackbar}
            onDismiss={onDismissSnackBar}
            >
            {snackbarMessage}
          </Snackbar>
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
    borderRadius: 10,
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
    fontWeight: "bold",
  },
});
