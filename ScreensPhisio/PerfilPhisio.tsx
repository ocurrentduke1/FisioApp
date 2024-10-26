import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  StyleSheet,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import stylesHistorial from "../styles/stylesHistorial";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/SimpleLineIcons";
import stylesMain from "../styles/stylesMain";
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PerfilPhisio = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [image, setImage] = useState<string | null>(null);
    //declaracion de modales
    const [modalName, setModalName] = useState(false);
    const [modalContraseña, setModalContraseña] = useState(false);
    const [modalTel, setModalTel] = useState(false);
    const [modalConsultorio, setModalConsultorio] = useState(false);
    const [modalPago, setModalPago] = useState(false);
    const [Name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [consultorio, setConsultorio] = useState("");
    const [numCard, setNumCard] = useState("");
    const [expCard, setExpCard] = useState("");
    const [CVC, setCVC] = useState("");
    const [pastPassword, setPastPassword] = useState("");
    const [password, setPassword] = useState("");
    const [ModalLogout, setModalLogout] = useState(false);

    const toggleLogout = () => {
      setModalLogout(!ModalLogout);
    };
    const logout = async () => {
      await AsyncStorage.multiRemove(["idSesion", "expiracion", "tipoUsuario"]);
      navigation.navigate("login");
    }
  
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
  
    //declaracion de modal Tel
    const openModalTel = () => {
      setModalTel(true);
    };
    const closeModalTel = () => {
      setModalTel(false);
    };
    const changeTel = () => {
      console.log("Telefono: ", tel);
      closeModalTel();
    };

    //declaracion de modal Consultorio
    const openModalConsultorio = () => {
      setModalConsultorio(true);
    };
    const closeModalConsultorio = () => {
      setModalConsultorio(false);
    };
    const changeConsultorio = () => {
      console.log("consultorio: ", consultorio);
      closeModalConsultorio();
    };

    //declaracion de modal Pago
    const openModalPago = () => {
      setModalPago(true);
    };
    const closeModalPago = () => {
      setModalPago(false);
    };
    const changePago = () => {
      console.log("Datos de pago: ", numCard, expCard, CVC);
      closeModalPago();
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
                  mode = "outlined"
                  label = "Nombre"
                    style={stylesMain.TextInputPerfil}
                    value={Name}
                    onChangeText={(value) => setName(value)}
                    outlineColor="#c5cae9"
                    activeOutlineColor="#c5cae9"
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
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalTel}
              onRequestClose={closeModalTel}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Cambiar Telefono de contacto</Text>
                  <TextInput
                  mode = "outlined"
                  label = "Telefono"
                    style={stylesMain.TextInputPerfil}
                    value={tel}
                    onChangeText={(value) => setTel(value)}
                    outlineColor="#c5cae9"
                    activeOutlineColor="#c5cae9"
                    keyboardType="numeric"
                    maxLength={10}
                  />
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={closeModalTel}
                    >
                      <Text style={styles.textStyle}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonSearch]}
                      onPress={changeTel}
                    >
                      <Text style={styles.textStyle}>Guardar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
  
            <TouchableOpacity style={{paddingVertical: 10, borderTopWidth: 2, borderColor: '#BDBDBD', paddingHorizontal: 10}}
            onPress={openModalTel}>
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
                  mode = "outlined"
                  label = "Contraseña anterior"
                    style={stylesMain.TextInputPerfil}
                    value={pastPassword}
                    onChangeText={(value) => setPastPassword(value)}
                    outlineColor="#c5cae9"
                    activeOutlineColor="#c5cae9"
                  />
                  <TextInput
                  mode = "outlined"
                  label = "Contraseña nueva"
                    style={stylesMain.TextInputPerfil}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    outlineColor="#c5cae9"
                    activeOutlineColor="#c5cae9"
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
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalConsultorio}
              onRequestClose={closeModalConsultorio}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Cambiar Consultorio</Text>
                  <TextInput
                  mode = "outlined"
                  label = "Consultorio"
                    style={stylesMain.TextInputPerfil}
                    value={consultorio}
                    onChangeText={(value) => setConsultorio(value)}
                    outlineColor="#c5cae9"
                    activeOutlineColor="#c5cae9"
                  />
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={closeModalConsultorio}
                    >
                      <Text style={styles.textStyle}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonSearch]}
                      onPress={changeConsultorio}
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
              onPress={openModalConsultorio}
            >
              <Text style={stylesHistorial.buttonText}>
                Consultorio (opcional)
              </Text>
            </TouchableOpacity>
  
            {/* Boton de Datos Bancarios */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalPago}
              onRequestClose={closeModalPago}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Cambiar Metodo de pago</Text>
                  <TextInput
                  mode = "outlined"
                  label = "Numero de tarjeta"
                    style={stylesMain.TextInputPerfil}
                    value={tel}
                    onChangeText={(value) => setNumCard(value)}
                    outlineColor="#c5cae9"
                    activeOutlineColor="#c5cae9"
                    keyboardType="numeric"
                    maxLength={16}
                  />
                  <View style={{flexDirection: "row"}}>
                  <TextInput
                  mode = "outlined"
                  label = "Expiracion"
                    style={[stylesMain.TextInputPerfil, {width: "65%"}]}
                    value={tel}
                    onChangeText={(value) => setExpCard(value)}
                    outlineColor="#c5cae9"
                    activeOutlineColor="#c5cae9"
                    keyboardType="numeric"
                    maxLength={5}
                  />
                  <TextInput
                  mode = "outlined"
                  label = "CVC"
                    style={[stylesMain.TextInputPerfil, {marginLeft: 15, width: "25%"}]}
                    value={tel}
                    onChangeText={(value) => setCVC(value)}
                    outlineColor="#c5cae9"
                    activeOutlineColor="#c5cae9"
                    keyboardType="numeric"
                    maxLength={3}
                  />
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={closeModalPago}
                    >
                      <Text style={styles.textStyle}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonSearch]}
                      onPress={changePago}
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
                borderBottomWidth: 2,
                borderTopWidth: 2,
                borderColor: "#BDBDBD",
                paddingHorizontal: 10,
              }}
              onPress={openModalPago}
            >
              <Text style={stylesHistorial.buttonText}>Metodos de pago</Text>
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
              <Text style={[stylesHistorial.buttonText, {paddingLeft: 10}]}>Cerrar Sesion</Text>
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
                  <Text style={styles.textStyle}>Cerrar sesion</Text>
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

export default PerfilPhisio;