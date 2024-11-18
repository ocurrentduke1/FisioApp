import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Switch, Touchable, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import stylesMain from '../styles/stylesMain';
import stylesHistorial from '../styles/stylesHistorial';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AshwortMetric from '../ScreensMetrics/AshwortMetric';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SelectorMetricas({ navigation }: { navigation: NavigationProp<any> }){

  const [visible, setVisible] = useState<string | null>(null);
  const [metricas, setMetricas] = useState({
    ashwort: false,
    barthel: false,
    braden: false,
    daniels: false,
    glasgow: false,
    godet: false,
    seidel: false,
    tinetti: false,
  });

  useEffect(() => {
    const fetchVisible = async () => {
      const visible = await AsyncStorage.getItem('metricas');
      if (visible == null) {
        setMetricas({
          ashwort: true,
          barthel: true,
          braden: true,
          daniels: true,
          glasgow: true,
          godet: true,
          seidel: true,
          tinetti: true,
        });
      } else {
        setMetricas(JSON.parse(visible));
      }
      setVisible(visible);
      console.log("visible", visible);
    };
    fetchVisible();
  }, []);

  const guardarEnAsyncStorage = async (metricas: any) => {
    try {
      const jsonValue = JSON.stringify(metricas);
      await AsyncStorage.setItem('metricas', jsonValue);
      console.log('Datos guardados en AsyncStorage');
      console.log(jsonValue);
    } catch (e) {
      console.error('Error guardando en AsyncStorage', e);
    }
  };

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

  guardarEnAsyncStorage(metricas);
  console.log(metricas); // Reemplazar con una llamada a tu API
};

  return (
    <View style={[stylesMain.container, {alignItems: "center"}]}>
      <View style={stylesMain.datosMetricas}>
    <SafeAreaView>
      <ScrollView style={stylesMain.formatMetrics}>
      <View style={ stylesMain.metricsEnabler}>
        <Text style={{color: "#fff"}}>
        Escala de Ashwort
       </Text>
       <Switch value={metricas.ashwort} onValueChange={() => toggleMetrica('ashwort')}/>
        </View>
        <View style={ stylesMain.metricsEnabler}>
        <Text style={{color: "#fff"}}>
        Escala de Barthel
       </Text>
       <Switch value={metricas.barthel} onValueChange={() => toggleMetrica('barthel')}/>
        </View>
        <View style={ stylesMain.metricsEnabler}>
        <Text style={{color: "#fff"}}>
        Escala de Braden
       </Text>
       <Switch value={metricas.braden} onValueChange={() => toggleMetrica('braden')}/>
        </View>
        <View style={ stylesMain.metricsEnabler}>
       <Text style={{color: "#fff"}}>
       Escala Daniels modificada
       </Text>
       <Switch value={metricas.daniels} onValueChange={() => toggleMetrica('daniels')} />
        </View>
        <View style={ stylesMain.metricsEnabler}>
        <Text style={{color: "#fff"}}>
        Escala de Glasgow
       </Text>
       <Switch value={metricas.glasgow} onValueChange={() => toggleMetrica('glasgow')}/>
        </View>
        <View style={ stylesMain.metricsEnabler}>
       <Text style={{color: "#fff"}}>
       Escala o signo de Godet
       </Text>
       <Switch value={metricas.godet} onValueChange={() => toggleMetrica('godet')}/>
        </View>
        <View style={ stylesMain.metricsEnabler}>
       <Text style={{color: "#fff"}}>
       Escala de Seidel o ROTS
       </Text>
       <Switch value={metricas.seidel} onValueChange={() => toggleMetrica('seidel')}/>
        </View>
        <View style={ stylesMain.metricsEnabler}>
        <Text style={{color: "#fff"}}>
        Escala Tinetti
       </Text>
       <Switch value={metricas.tinetti} onValueChange={() => toggleMetrica('tinetti')}/>
        </View>
        <TouchableOpacity style={{
          backgroundColor: "#00BCD4",
          alignItems: "center",
          paddingVertical: 20,
          paddingEnd: windowHeight * 0.115,
          paddingStart: windowHeight * 0.115,
          borderRadius: 20,
          marginTop: 100,
          marginHorizontal: 1,
          shadowColor: "#000",
          shadowOffset: { width: 2, height: 16 }, // Desplazamiento de la sombra hacia abajo
          shadowOpacity: 0.5, // Reducir la opacidad para suavizar la sombra
          shadowRadius: 6, // Aumentar el radio para suavizar la sombra
          elevation: 6, // Elevación de la sombra
        }} onPress={enviarAlServidor}>
        <Text style={[stylesHistorial.buttonText, { color:"#FFF"}]}>Guardar</Text>
          </TouchableOpacity> 
      </ScrollView>
    </SafeAreaView>
    </View>
    </View>
  );
}