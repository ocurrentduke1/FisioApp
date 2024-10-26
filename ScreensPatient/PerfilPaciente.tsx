import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Modal,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import stylesHistorial from "../styles/stylesHistorial";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/SimpleLineIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PerfilPaciente = ({ navigation }: { navigation: NavigationProp<any> }) => {
  
  const [image, setImage] = useState<string | null>(null);
  const [ModalLogout, setModalLogout] = useState(false);

    const toggleLogout = () => {
      setModalLogout(!ModalLogout);
    };
    const logout = async () => {
      await AsyncStorage.multiRemove(["idSesion", "expiracion", "tipoUsuario"]);
      navigation.navigate("login");
    }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={stylesHistorial.container}>
      <View
        style={[
          stylesHistorial.containerRegistro,
          { flex: 1, alignItems: "center", justifyContent: "center" },
        ]}
      >
        <ScrollView style={stylesHistorial.scrollViewRegistro}>
          <View
            style={{
              marginVertical: 20,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                height: 150,
                width: 150,
              }}
              onPress={pickImage}
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{
                    flex: 1,
                    width: 150,
                    borderRadius: 200,
                    alignSelf: "center",
                  }}
                />
              ) : (
                <Icon name="user-circle" size={120} color="#000" style={{alignSelf: 'center'}} />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{paddingVertical: 10, borderTopWidth: 2, borderColor: '#BDBDBD', paddingHorizontal: 10}}>
            <Text style={stylesHistorial.buttonText}>Nombre del usuario</Text>
          </TouchableOpacity>
          <View
            style={{
              paddingVertical: 10,
              borderTopWidth: 2,
              borderColor: "#BDBDBD",
              paddingHorizontal: 10,
            }}
          >
            <Text style={stylesHistorial.buttonText}>Correo Electronico</Text>
          </View>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              borderTopWidth: 2,
              borderBottomWidth: 2,
              borderColor: "#BDBDBD",
              paddingHorizontal: 10,
            }}
          >
            <Text style={stylesHistorial.buttonText}>telefono</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingVertical: 10, borderTopWidth: 2, borderBottomWidth:2,  borderColor: '#BDBDBD', paddingHorizontal: 10}}>
            <Text style={stylesHistorial.buttonText}>Contraseña</Text>
          </TouchableOpacity>
          <View
            style={{
              paddingVertical: 10,
              borderTopWidth: 2,
              borderBottomWidth: 2,
              borderColor: "#BDBDBD",
              paddingHorizontal: 10,
            }}
          >
            <Text style={stylesHistorial.buttonText}>Edad</Text>
          </View>
          <View
            style={{
              paddingVertical: 10,
              borderTopWidth: 2,
              borderBottomWidth: 2,
              borderColor: "#BDBDBD",
              paddingHorizontal: 10,
            }}
          >
            <Text style={stylesHistorial.buttonText}>Sexo</Text>
          </View>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              borderTopWidth: 2,
              borderBottomWidth: 2,
              borderColor: "#BDBDBD",
              paddingHorizontal: 10,
            }}
          >
            <Text style={stylesHistorial.buttonText}>Domicilio</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={{
                paddingVertical: 10,
                borderBottomWidth: 2,
                borderColor: "#BDBDBD",
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center"
              }}
              onPress={toggleLogout}
            >
              <Icon2 name="logout" size={20} color={"#000"}/>
              <Text style={stylesHistorial.buttonText}>Cerrar Sesion</Text>
            </TouchableOpacity>
        </ScrollView>
      </View>
      <Modal
          animationType="slide"
          transparent={true}
          visible={ModalLogout}
          onRequestClose={toggleLogout}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                ¿Seguro que quieres salir de tu sesion?
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={toggleLogout}
                >
                  <Text style={styles.textStyle}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSearch]}
                  onPress={logout}
                >
                  <Text style={styles.textStyle}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    width: 200,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#f44336",
  },
  buttonSearch: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PerfilPaciente;
