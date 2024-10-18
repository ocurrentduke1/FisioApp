import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#303f9f",
    backgroundColor: "#03045E",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },

  datos: {
    alignItems: "center",
    justifyContent: "flex-start",
    height: 250,
    width: 300,
  },

  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    borderRadius: 300,
  },
  button: {
    backgroundColor: "#00bcd4",
    paddingVertical: 20,
    paddingHorizontal: 105,
    borderRadius: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonRecovery: {
    backgroundColor: "#00bcd4",
    paddingVertical: 20,
    paddingHorizontal: 70,
    borderRadius: 20,
    marginTop: 20,
  },
  Secondarybutton: {
    backgroundColor: "#3F51B5",
    paddingVertical: 20,
    paddingHorizontal: 115,
    borderRadius: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#c5cae9",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  input: {
    width: "90%",
    borderBottomWidth: 2,
    borderColor: "#c5cae9",
    paddingTop: 50,
    paddingHorizontal: 10,
    color: "#FFFFFF",
    fontSize: 23,
  },

  // Estilos para pantallas de registro
  imageRegistrar: {
    width: 180, // Ancho de la imagen
    height: 180, // Alto de la imagen
    resizeMode: "contain", // Modo de redimensionamiento de la imagen
  },
  datosRegistrar: {
    //backgroundColor: '#FFFFFF',
    alignItems: "center",
    justifyContent: "flex-start", // Alinea los elementos verticalmente al principio
    height: 350,
    width: 300,
  },
  inputRegistrar: {
    width: "96%",
    borderBottomWidth: 2, // Solo mostrando la línea inferior
    borderColor: "#c5cae9",
    paddingTop: 30,
    paddingHorizontal: 10,
    color: "#FFFFFF",
    fontSize: 23,
  },
  inputContrasena: {
    width: "85%",
    borderBottomWidth: 2, // Solo mostrando la línea inferior
    borderColor: "#c5cae9",
    paddingTop: 30,
    paddingHorizontal: 10,
    color: "#FFFFFF",
    fontSize: 23,
  },
  SecondarybuttonRegistrar: {
    backgroundColor: "#3F51B5",
    paddingVertical: 20,
    paddingEnd: 115,
    paddingStart: 115,
    // paddingHorizontal: 115,
    borderRadius: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  buttonRegistrar: {
    backgroundColor: "#00bcd4",
    paddingVertical: 20,
    paddingEnd: 115,
    paddingStart: 115,
    // paddingHorizontal: 105,
    borderRadius: 20,
    marginTop: 20,
  },
});