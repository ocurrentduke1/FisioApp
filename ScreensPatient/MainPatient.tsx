import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import stylesMain from '../styles/stylesMain';
import Icon from "react-native-vector-icons/FontAwesome";

export default function MainPatient({ navigation }: { navigation: NavigationProp<any> }){

  return (
    <View style={[stylesMain.container, {alignItems: "center"}]}>     
    <TouchableOpacity style={stylesMain.opcPatient}
     onPress={() => navigation.navigate('EvaluacionVideo')}>
      <Text style={stylesMain.buttonText}>Evaluacion de video</Text>
      <Icon name="video-camera" size={150} color="#FFFFFF" />
      {/* <Image
          style={stylesMain.image}
          source={require("./assets/video-camara-alt.png")}
        /> */}
      </TouchableOpacity>
      <TouchableOpacity style={stylesMain.opcPatient}
     onPress={() => navigation.navigate('EvaluacionImagen')}>
      <Text style={stylesMain.buttonText}>Evaluacion de imagen</Text>
      <Icon name="camera" size={140} color="#FFFFFF"/>
      {/* <Image
          style={stylesMain.image}
          source={require("./assets/imagen.png")}
        /> */}
      </TouchableOpacity>

      <TouchableOpacity style={stylesMain.opcPatient}
       onPress={() => navigation.navigate('Expediente')}>
        <Text style={stylesMain.buttonText}>Expediente</Text>
        <Icon name="file-text-o" size={150} color="#FFFFFF" />
        {/* <Image
          style={stylesMain.image}
          source={require("./assets/documento-firmado.png")}
        /> */}
      </TouchableOpacity>
    <StatusBar style="auto" />
    </View>
  );
}