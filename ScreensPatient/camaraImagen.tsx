import { CameraView, FlashMode, CameraType } from 'expo-camera'
import { useRef, useState } from "react";
import {
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import styleCamera from '../styles/styleCamera';


export default function CamaraImagen({
  navigation, route,
}: {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any>;
}) {
  const [type, setType] = useState<CameraType>('back')
  const [flash, setFlash] = useState<FlashMode>('off')
  const cameraRef = useRef<CameraView>(null)
  const [image, setImage] = useState<string | null>(null); // Update the type of the image state variable
  const [cameraReady, setCameraReady] = useState<boolean>(false)

  const { Posture } = route.params as { Posture: string };
  const onCameraReady = async () => {
    setCameraReady(true)
  }

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current?.takePictureAsync({});
        console.log(data);
        setImage(data!.uri);
        navigation.navigate("ConfirmImage", { image: data!.uri, Posture });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const turnOnOffFlash = () => {
    setFlash((flash) => (flash === 'off' ? 'on' : 'off'))
   }

  const flipCamera = () => {
    setType((type) => (type === 'back' ? 'front' : 'back'))
   }

  return (
    <View style={styleCamera.container}>
      <SafeAreaView>
        <View style={[styleCamera.mainContainer, { top: 20 }]}>
          <View style={[styleCamera.cameraContainer]}>
            <CameraView
              style={{
                flex: 1,
                justifyContent: "center",
              }}
              facing={type}
              flash={flash}
              ref={cameraRef}
              onCameraReady={onCameraReady}
            >
              <TouchableOpacity
                style={styleCamera.flipCamera}
                onPress={flipCamera}
              >
                <FontAwesome6 name="arrows-rotate" size={25} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styleCamera.turn}
                onPress={turnOnOffFlash}
              >
                {flash === "off" ? (
                  <Ionicons name="flash-off" size={25} color="white" />
                ) : (
                  <Ionicons name="flash" size={25} color="white" />
                )}
              </TouchableOpacity>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={styleCamera.PressableButton}
                  onPress={takePicture}
                >
                  <View
                    style={styleCamera.ViewPressable}
                  >
                    <View
                      style={[styleCamera.PressableView, { backgroundColor: "white" }]}
                    ></View>
                  </View>
                </TouchableOpacity>
              </View>
            </CameraView>
          </View>

          <View style={[styleCamera.footer]}></View>
        </View>
      </SafeAreaView>
    </View>
  );
}