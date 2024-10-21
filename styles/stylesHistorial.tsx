import { StyleSheet, Dimensions } from "react-native";

// Obtén las dimensiones de la ventana
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#00BCD4",
    // Alinea los elementos verticalmente al principio
  },
  scrollView: {
    display: "flex",
    width: windowWidth * 0.73,
    height: windowHeight * 1,
  },
  viewpaciente: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  imagenpaciente: {
    alignSelf: "flex-start",
    marginLeft: 10,
    width: 80,
    height: 80,
    borderRadius: 20,
    borderColor: "#000000",
    borderWidth: 3,
  },
  datosPaciente: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center", // Alinea los elementos verticalmente al principio
    width: windowWidth * 0.8,
    height: windowHeight * 0.2,
    borderRadius: 25,
    marginVertical: 0,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
  menuPaciente: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    width: windowWidth * 0.8,
    height: windowHeight * 1,
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },

  dropdown: {
    height: 50,
    paddingHorizontal: 8,
    alignSelf: "flex-end",
  },
  dropdownContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    borderColor: "#000",
    borderWidth: 1,
    shadowColor: "#000",
    width: "50%",
    zIndex: 1000,
    left: "40%",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 10,
  },
  containerPdf: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 10,
  },

  //Estilos para vista de registrar nuevos pacientes

  containerRegistro: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "flex-start", // Alinea los elementos verticalmente al principio
    width: windowWidth * 0.8,
    height: windowHeight * 0.75,
    borderRadius: 25,
    marginBottom: 20,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
  input: {
    width: "96%",
    borderBottomWidth: 2, // Solo mostrando la línea inferior
    borderColor: "#c5cae9",
    paddingTop: 30,
    paddingHorizontal: 10,
    color: "#000000",
    fontSize: 20,
  },
  scrollViewRegistro: {
    display: "flex",
    width: windowWidth * 0.73,
    height: windowHeight * 1,
  },
  button: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: 20,
    marginBottom: 20,
    width: windowWidth * 0.8,
    // paddingHorizontal: 105,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonText: {
    fontSize: 20,
    color: "#000000",
  },
});
