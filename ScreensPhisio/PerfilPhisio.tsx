import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import stylesHistorial from "../styles/stylesHistorial";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";

const PerfilPhisio = () => {
    const [image, setImage] = useState<string | null>(null);
    //declaracion de modales
    const [modalName, setModalName] = useState(false);
    const [modalContraseña, setModalContraseña] = useState(false);
    const [Name, setName] = useState("");
    const [pastPassword, setPastPassword] = useState("");
    const [password, setPassword] = useState("");
  
    //declaracion de modal Name
    const openModalName = () => {
      setModalName(true);
    };
    const closeModalName = () => {
      setModalName(false);
    };
    const changeName = () => {
      console.log("nombre: ", Name);
      closeModalName();
    };
  
    //declaracion de modal Contraseña
    const openModalContraseña = () => {
      setModalContraseña(true);
    };
    const closeModalContraseña = () => {
      setModalContraseña(false);
    };
    const changeContraseña = () => {
      console.log("contraseña anterior: ", pastPassword);
      console.log("nueva contraseña: ", password);
      closeModalContraseña();
    };
  
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
                  <Icon
                    name="user-circle"
                    size={120}
                    color="#000000"
                    style={{ alignSelf: "center" }}
                  />
                )}
              </TouchableOpacity>
            </View>
  
            {/* Boton de NOMBRE */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalName}
              onRequestClose={closeModalName}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Cambiar nombre de usuario</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Nombre del usuario"
                    value={Name}
                    onChangeText={(value) => setName(value)}
                  />
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={closeModalName}
                    >
                      <Text style={styles.textStyle}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonSearch]}
                      onPress={changeName}
                    >
                      <Text style={styles.textStyle}>Guardar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <View style={{paddingVertical: 10, borderTopWidth: 2, borderColor: '#BDBDBD', paddingHorizontal: 10}}>
              <Text style={stylesHistorial.buttonText}>Correo de usuario</Text>
            </View>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                borderTopWidth: 2,
                borderColor: "#BDBDBD",
                paddingHorizontal: 10,
              }}
              onPress={openModalName}
            >
              <Text style={stylesHistorial.buttonText}>Nombre del usuario</Text>
            </TouchableOpacity>
  
            {/* Boton de telefono */}
  
            <TouchableOpacity style={{paddingVertical: 10, borderTopWidth: 2, borderColor: '#BDBDBD', paddingHorizontal: 10}}>
              <Text style={stylesHistorial.buttonText}>Telefono</Text>
            </TouchableOpacity>
  
            {/* Boton de contraseña */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalContraseña}
              onRequestClose={closeModalContraseña}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Cambiar contraseña</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Contraseña anterior"
                    value={pastPassword}
                    onChangeText={(value) => setPastPassword(value)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Contraseña nueva"
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                  />
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={closeModalContraseña}
                    >
                      <Text style={styles.textStyle}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonSearch]}
                      onPress={changeContraseña}
                    >
                      <Text style={styles.textStyle}>Guardar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                borderTopWidth: 2,
                borderColor: "#BDBDBD",
                paddingHorizontal: 10,
              }}
              onPress={openModalContraseña}
            >
              <Text style={stylesHistorial.buttonText}>Cambiar contraseña</Text>
            </TouchableOpacity>
  
            {/* Boton de Consultorio */}
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                borderTopWidth: 2,
                borderColor: "#BDBDBD",
                paddingHorizontal: 10,
              }}
            >
              <Text style={stylesHistorial.buttonText}>
                Consultorio (opcional)
              </Text>
            </TouchableOpacity>
  
            {/* Boton de Datos Bancarios */}
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                borderBottomWidth: 2,
                borderTopWidth: 2,
                borderColor: "#BDBDBD",
                paddingHorizontal: 10,
              }}
            >
              <Text style={stylesHistorial.buttonText}>Metodos de pago</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
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

export default PerfilPhisio;