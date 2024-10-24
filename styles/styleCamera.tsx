import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({

  //Estilos camara
  permission: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    // backgroundColor: "#2196F3",
    backgroundColor: "#4971ac",
    alignItems: "center",
    justifyContent: "center",
    ...StyleSheet.absoluteFillObject,
  },
  mainContainer: {
    flex: 1,
    width: width - 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cameraContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  footer: {
    height: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    bottom: 5,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  PressableButton : {
    top: 250,
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
  },
  ViewPressable: {
    width: 85,
    height: 85,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  PressableView: {
    width: 72,
    height: 72,
    borderRadius: 50,
  },
  flipCamera: {
    width: 40,
    height: 40,
    bottom: 200,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 50,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
  },
  turn: {
    width: 40,
    height: 40,
    bottom: 180,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 50,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
  },
  CronoView: {
    width: 60,
    height: 30,
    bottom: 230,
    backgroundColor: "rgba(222,0,0,0.4)",
    borderRadius: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});