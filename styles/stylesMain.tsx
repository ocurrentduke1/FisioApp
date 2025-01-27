import { StyleSheet, Dimensions } from "react-native";

// Obtén las dimensiones de la ventana
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#00bcd4",
    // backgroundColor: "#4971ac",
    backgroundColor: "#002245",
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
    width: windowWidth * 0.9,
    height: windowHeight * 0.20,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
    overflow: 'hidden',
    paddingRight: 55
  },
  datosFisio: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "flex-start",
    width: windowWidth * 0.8,
    height: windowHeight * 0.13,
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
    alignSelf: "flex-start",
    marginTop: 13,
    width: windowWidth * 0.19,
    height: windowHeight * 0.095,
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
    borderColor: "#000",
  },
  
  metricsEnabler: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  InputMetrics: {
    width: "96%",
    paddingTop: 10,
    paddingHorizontal: 10,
    fontSize: 20,
    backgroundColor: "#FFF",
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

  /*





  estilos escalas





   */
  datosMetricas: {
    alignItems: "center",
    justifyContent: "flex-start", // Alinea los elementos verticalmente al principio
    width: windowWidth * 0.8,
    borderRadius: 25,
    flexShrink: 1,
  },
  scrollMetrics: {
    display: "flex",
    width: windowWidth * 0.9,
    height: windowHeight * 1,
  },
  ContainerInput: {
    backgroundColor: "#FFF",
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
  metricTitle: {
    fontWeight: "bold",
    marginTop: 5,
    color: "#000",
    paddingTop: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingRight: 30
  },
  metricText: {
    marginTop: 5,
    color: "#000",
  },
  resultsMetrics: {
    backgroundColor: "#FFF",
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
  exersiceTitle: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 24,
    color: "#FFF",
  },
  metricasTitle: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: "center",
    marginBottom: 20,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 300,
  },
  flexViewStart: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: "row",
    marginLeft: 10,
    flexWrap: 'wrap'
  },
  textEscala: {
    fontSize: 18,
    color: 'white',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  iconEscalas: {
    marginTop: 3,
    marginRight: 10
  },
  metricasDescription: {
    fontSize: 15,
    color: 'white',
    textAlign: "justify",
  }
});