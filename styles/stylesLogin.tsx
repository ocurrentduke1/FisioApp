import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#303f9f",
    // backgroundColor: "#03045E",
    backgroundColor: "#1e5099",
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
  imageRegistrar: {
    width: 180, 
    height: 180, 
    resizeMode: "contain",
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
  Secondarybutton: {
    backgroundColor: "#3F51B5",
    paddingVertical: 20,
    paddingHorizontal: 120,
    marginHorizontal: 10,
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

  /*
  estilos con react native paper
  */

  TextInput: {
    width: 300,
    marginBottom: 10,
    paddingTop: 10,
    backgroundColor: "white",
  },
});
