import React, { useEffect, useRef, useState } from "react";
import { CameraView, CameraType, Camera } from 'expo-camera'
import { NavigationProp } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import {
  Pressable,
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import styleCamera from "../styles/styleCamera";

export default function CamaraVideo({
  navigation, route,
}: {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any>;
}) {
  const [type, setType] = useState<CameraType>('back')
  const cameraRef = useRef<CameraView>(null)
  const [record, setRecord] = useState<string | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  let interval: NodeJS.Timeout | undefined;
  const [maxDuration, setMaxDuration] = useState(15);
  const [isRecording, setIsRecording] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraReady, setCameraReady] = useState<boolean>(false)

  const { exercise } = route.params as { exercise: string };
  const { port } = route.params as { port: string };

  const onCameraReady = async () => {
    setCameraReady(true)
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasPermission(status === 'granted' && audioStatus.status === 'granted');
    })();
  }, []);

  const recording = async () => {
    if (cameraRef.current) {
      if (isRecording) {
        // Si ya está grabando, detener la grabación
        cameraRef.current.stopRecording();
        clearInterval(interval); // Detener el contador de tiempo
        setIsRecording(false);
      } else {
        // Si no está grabando, iniciar la grabación
        try {
          setTimeElapsed(0); // Reinicia el contador de tiempo
          interval = setInterval(() => {
            setTimeElapsed((prevTime) => {
              if (prevTime + 1 >= maxDuration) {
                clearInterval(interval); // Detener el contador de tiempo
                cameraRef.current?.stopRecording(); // Detener la grabación
                setIsRecording(false);
              }
              return prevTime + 1;
            });
          }, 1000);
          setIsRecording(true);
          const response = await cameraRef.current.recordAsync({});
          if (response) {
            setRecord(response.uri);
            navigation.navigate('ConfirmVideo', { video: response.uri, exercise, port });
          }
          console.log(response);
        } catch (e) {
          console.log(e);
          clearInterval(interval); // Asegúrate de detener el contador si hay un error
          setIsRecording(false);
        }
      }
    }
  };

  useEffect(() => {
    return () => clearInterval(interval);
  }, []);

  // Asegúrate de limpiar el intervalo cuando el componente se desmonte
  useEffect(() => {
    return () => clearInterval(interval);
  }, []);

  //function to change the time of recording
  const turnMaxDuration = () => {
    setMaxDuration((current) => (current === 15 ? 30 : 15));
  };

  //function to change the camera type
  const flipCamera = () => {
    setType((type) => (type === 'back' ? 'front' : 'back'))
   }

  return (
    <View style={styleCamera.container}>
      <SafeAreaView>
        <View style={[styleCamera.mainContainer, { top: 20 }]}>
          <View style={[styleCamera.cameraContainer, {flexDirection: "row"}]}>
            <CameraView
            mode="video"
              style={{
                flex: 1,
                justifyContent: "center",
              }}
              facing={type}
              ref={cameraRef}
              onCameraReady={onCameraReady}
            >
              <View
                style={styleCamera.CronoView}
              >
                <Text style={{ color: "white" }}>{timeElapsed} seg</Text>
              </View>
              <TouchableOpacity
                style={styleCamera.flipCamera}
                onPress={flipCamera}
              >
                <FontAwesome6 name="arrows-rotate" size={25} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styleCamera.turn}
                onPress={turnMaxDuration}
              >
                {maxDuration === 15 ? (
                  <Text style={{ color: "white" }}>15s</Text>
                ) : (
                  <Text style={{ color: "white" }}>30s</Text>
                )}
              </TouchableOpacity>

              <View style={{ alignItems: "center" }}>
                <Pressable
                  style={styleCamera.PressableButton}
                  onPress={recording}
                >
                  <View
                    style={styleCamera.ViewPressable}
                  >
                    <View
                      style={[styleCamera.PressableView, { backgroundColor: "red" }]}
                    ></View>
                  </View>
                </Pressable>
              </View>
            </CameraView>
          </View>
          <View style={[styleCamera.footer]}></View>
        </View>
      </SafeAreaView>
    </View>
  );
}