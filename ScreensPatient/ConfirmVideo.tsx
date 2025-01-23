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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ActivityIndicator, Dialog } from "react-native-paper";

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

  const { video, exercise } = route.params as {
    video: string;
    exercise: string;
  };
  const [userID, setUserID] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const getUserID = async () => {
    const id = await AsyncStorage.getItem("idSesion");
    setUserID(id);
  };

  useFocusEffect(
    useCallback(() => {
      getUserID();
    }, [])
  );

  const sendVideoToServer = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      const videoBlob = {
        uri: video,
        type: "video/mp4",
        name: "video.mp4",
      } as any;

      formData.append("video", videoBlob);
      formData.append("exercise", exercise);
      formData.append("idPaciente", userID!);

      const response = await axios.post(
        BACKEND_URL + "/obtener-postura-video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        navigation.navigate("Results", { results: response.data });
        return;
      }

      throw new Error("No se pudo enviar el video");
    } catch (error) {
      setDialogVisible(true);
      setLoading(false);
      console.error(error);
    }finally {
      setLoading(false);
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

        <View style={styles.rowView}>
          <FontAwesome name="warning" size={15} color="#FFF"></FontAwesome>
          <Text style={[styles.textWarning, styles.underlineText]}>
            FisioApp
          </Text>
          <Text style={styles.textWarning}>
            puede cometer errores. Solo se debe usar como
          </Text>
          <Text
            style={[styles.textWarning, { marginLeft: 2, fontWeight: "bold" }]}
          >
            referencia.
          </Text>
        </View>

        <View style={styles.detect}>
          <TouchableOpacity
            style={styles.pressable}
            onPress={sendVideoToServer}
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
        </View>
      </SafeAreaView>
      <Dialog
        visible={dialogVisible}
        onDismiss={() => {
          setDialogVisible(false);
        }}
      >
        <Dialog.Icon icon={() => <FontAwesome name="warning" size={50} />} />
        <Dialog.Title style={styles.dialogTitle}>
          Error al analizar el video
        </Dialog.Title>
        <Dialog.Content>
          <Text style={{ alignSelf: "center" }}>
            El video no pudo ser analizado, esto puede deberse a que no
            proporcionó una correcta forma del ejercicio o el servicio este
            temporalmente deshabilitado. Por favor, intentelo de nuevo, más
            tarde.
          </Text>
          <TouchableOpacity
            onPress={() => {
              setDialogVisible(false);
            }}
            style={{ alignSelf: "center", paddingTop: 30 }}
          >
            <Text style={{ fontSize: 20 }}> Aceptar </Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#002245",
  },
  rowView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
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
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#99BF0F",
    borderRadius: 10,
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
    fontWeight: "bold",
  },
  dialogTitle: {
    textAlign: "center",
  },
});
