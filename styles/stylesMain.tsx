import { StyleSheet, Dimensions } from "react-native";

// Obtén las dimensiones de la ventana
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#00bcd4",
    backgroundColor: "#4971ac",
    justifyContent: "flex-start", // Alinea los elementos verticalmente al principio
  },
  scrollView: {
    marginTop: 0,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#000",
  },
  image: {
    width: 170, // Ancho de la imagen
    height: 140, // Alto de la imagen
    resizeMode: "contain",
    marginTop: 10, // Modo de redimensionamiento de la imagen
  },
  opcPatient: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    width: windowWidth * 0.8,
    height: windowHeight * 0.25,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
  },
  datosFisio: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "flex-start",
    width: windowWidth * 0.8,
    height: windowHeight * 0.2,
    borderRadius: 25,
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
  },
  button: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingVertical: 20,
    paddingEnd: windowHeight * 0.115,
    paddingStart: windowHeight * 0.115,
    borderRadius: 20,
    marginTop: 20,
    marginHorizontal: windowWidth * 0.1,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
  casillaPerfilPaciente: {
    alignItems: "flex-start",
    flexDirection: "row",
    width: windowWidth * 0.7,
    // width: 300,
    height: windowHeight * 0.2,
    // height: 100,
  },
  imagenpaciente: {
    alignItems: "flex-end",
    width: windowWidth * 0.19,
    height: windowHeight * 0.095,
    marginTop: 30,
    borderRadius: 100,
  },
  datosPacienteMenuFisio: {
    alignItems: "flex-start",
    flexDirection: "column",
    marginTop: 10,
    marginLeft: 20,
    color: "#000",
    fontSize: 15,
    flexWrap: "wrap",
  },
  //styles for metrics selector
  //
  //
  formatMetrics: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.8,
    marginTop: 0,
    borderColor: "#000",
    // borderWidth: 1,
  },
  datosMetricas: {
    alignItems: "center",
    justifyContent: "flex-start", // Alinea los elementos verticalmente al principio
    width: windowWidth * 0.8,
    borderRadius: 25,
    flexShrink: 1,
  },
  metricsEnabler: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  metricText: {
    marginTop: 5,
    color: "#FFFFFF",
  },
  metricTitle: {
    fontWeight: "bold",
    marginTop: 5,
    color: "#FFFFFF",
    paddingTop: 10,
  },
  exersiceTitle: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 24
  },
  ContainerInput: {
    backgroundColor: "#00bcd4",
    justifyContent: "flex-start",
    width: windowWidth * 0.9,
    borderRadius: 25,
    marginVertical: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
  },

  InputMetrics: {
    width: "96%",
    borderBottomWidth: 2,
    borderColor: "#BDBDBD",
    paddingTop: 10,
    paddingHorizontal: 10,
    color: "#FFFFFF",
    fontSize: 20,
  },

  scrollMetrics: {
    display: "flex",
    width: windowWidth * 0.9,
    height: windowHeight * 1,
  },

  resultsMetrics: {
    backgroundColor: "#00bcd4",
    width: windowWidth * 0.9,
    borderRadius: 25,
    marginVertical: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingRight: 30
  },

  /*





  estilos con react native paper





   */

  TextInputPerfil: {
    width: 250,
    marginBottom: 10,
    paddingTop: 10,
    backgroundColor: "white",
    
  },
});