import React, { useCallback, useState } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import {
  Snackbar
} from "react-native-paper";

import { SafeAreaView } from "react-native-safe-area-context";
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
  const [showSnackbar, setShowSnackbar] = useState(false);
  const onDismissSnackBar = () => setShowSnackbar(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

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

      formData.append("file", videoBlob);
      formData.append("exercise", exercise);
      formData.append("idPaciente", userID!);
      formData.append("type", 'video');

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
      <Snackbar
        visible={showSnackbar}
        onDismiss={onDismissSnackBar}
        >
        {snackbarMessage}
      </Snackbar>
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
