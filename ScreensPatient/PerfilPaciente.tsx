import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import stylesHistorial from "../styles/stylesHistorial";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";

const PerfilPaciente = ({ navigation }: { navigation: NavigationProp<any> }) => {
  
  const [image, setImage] = useState<string | null>(null);

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
                <Icon name="user-circle" size={120} color="#FFFFFF" style={{alignSelf: 'center'}} />
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PerfilPaciente;
