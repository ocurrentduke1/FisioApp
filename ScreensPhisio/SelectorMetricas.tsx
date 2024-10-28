import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Switch, Touchable, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import stylesMain from '../styles/stylesMain';
import stylesHistorial from '../styles/stylesHistorial';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SelectorMetricas({ navigation }: { navigation: NavigationProp<any> }){
// Paso 1 y 2: Definir e inicializar el estado
const [metricas, setMetricas] = useState({
  daniels: true,
  glasgow: true,
  eva: true,
  seidel: true,
  ashwort: true,
  tinetti: true,
  borg: true,
  barthel: true,
  braden: true,
  godet: true,
});

// Paso 3: Crear un método para cambiar el estado
const toggleMetrica = (metrica: keyof typeof metricas) => {
  setMetricas(prevMetricas => ({
    ...prevMetricas,
    [metrica]: !prevMetricas[metrica],
  }));
};

// Paso 5: Método para enviar los valores al servidor (implementación básica)
const enviarAlServidor = () => {
  // Aquí iría tu lógica para enviar los datos al servidor, por ejemplo:

  
  console.log(metricas); // Reemplazar con una llamada a tu API
};

  return (
    <View style={[stylesMain.container, {alignItems: "center"}]}>
      <View style={stylesMain.datosMetricas}>
    <SafeAreaView>
      <ScrollView style={stylesMain.formatMetrics}>
        <View style={ stylesMain.metricsEnabler}>
       <Text>
       Escala Daniels modificada
       </Text>
       <Switch value={metricas.daniels} onValueChange={() => toggleMetrica('daniels')} />
        </View>
        <View style={ stylesMain.metricsEnabler}>
        <Text>
        Escala de Glasgow
       </Text>
       <Switch value={metricas.glasgow} onValueChange={() => toggleMetrica('glasgow')}/>
        </View>
        <View style={ stylesMain.metricsEnabler}>
        <Text>
        EVA (Escala Visual Analógica)
       </Text>
       <Switch value={metricas.eva} onValueChange={() => toggleMetrica('eva')}/>
        </View>
        <View style={ stylesMain.metricsEnabler}>
       <Text>
       Escala de Seidel o ROTS
       </Text>
       <Switch value={metricas.seidel} onValueChange={() => toggleMetrica('seidel')}/>
        </View>
        <View style={ stylesMain.metricsEnabler}>
        <Text>
        Escala de Ashwort
       </Text>
       <Switch value={metricas.ashwort} onValueChange={() => toggleMetrica('ashwort')}/>
        </View>
        <View style={ stylesMain.metricsEnabler}>
        <Text>
        Escala Tinetti
       </Text>
       <Switch value={metricas.tinetti} onValueChange={() => toggleMetrica('tinetti')}/>
        </View>
        <View style={ stylesMain.metricsEnabler}>
       <Text>
       Escala de Borg
       </Text>
       <Switch value={metricas.borg} onValueChange={() => toggleMetrica('borg')}/>
        </View>
        <View style={ stylesMain.metricsEnabler}>
        <Text>
        Escala de Barthel
       </Text>
       <Switch value={metricas.barthel} onValueChange={() => toggleMetrica('barthel')}/>
        </View>
        <View style={ stylesMain.metricsEnabler}>
        <Text>
        Escala de Braden
       </Text>
       <Switch value={metricas.braden} onValueChange={() => toggleMetrica('braden')}/>
        </View>
        <View style={ stylesMain.metricsEnabler}>
       <Text>
       Escala o signo de Godet
       </Text>
       <Switch value={metricas.godet} onValueChange={() => toggleMetrica('godet')}/>
        </View>
        <TouchableOpacity style={{
          backgroundColor: "#00BCD4",
          alignItems: "center",
          paddingVertical: 20,
          paddingEnd: windowHeight * 0.115,
          paddingStart: windowHeight * 0.115,
          borderRadius: 20,
          marginTop: 100,
          marginBottom: 20,
          marginHorizontal: 1,
          shadowColor: "#000",
          shadowOffset: { width: 2, height: 16 }, // Desplazamiento de la sombra hacia abajo
          shadowOpacity: 0.5, // Reducir la opacidad para suavizar la sombra
          shadowRadius: 6, // Aumentar el radio para suavizar la sombra
          elevation: 6, // Elevación de la sombra
        }} onPress={enviarAlServidor}>
        <Text style={stylesHistorial.buttonText}>Guardar</Text>
          </TouchableOpacity> 
      </ScrollView>
    </SafeAreaView>
    </View>
    </View>
  );
}