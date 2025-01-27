import React, { Component, useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Touchable, TouchableOpacity, Dimensions } from 'react-native';
import { Switch } from "react-native-paper";
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import stylesMain from '../styles/stylesMain';
import stylesHistorial from '../styles/stylesHistorial';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import { LinearGradient } from "expo-linear-gradient";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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
  guardarEnAsyncStorage(metricas);
};


const translateX = useSharedValue(0);

const handleGestureEnd = useCallback((event) => {
  if(navigation && navigation.navigate) {
    if (event.translationX > 50) {
        navigation.navigate('mainMenuFisio');
    } else if (event.translationX < -50) {
        navigation.navigate('contactsFisio');
    }
  }

  translateX.value = withSpring(0, { damping: 20 });
}, [navigation, translateX]);

  return (
    <View style={[stylesMain.container, {alignItems: "center"}]}>
      <LinearGradient
        colors={["transparent", "rgba(44,189,191,0.8)"]}
        style={stylesMain.gradient}
      />
      <View style={stylesMain.datosMetricas}>
        <SafeAreaView>
          <View style={[stylesMain.flexViewStart, {marginTop: 70}]}>
              <MaterialCommunityIcons style={stylesMain.iconEscalas} name="tune-variant" size={40} color="#FFF"></MaterialCommunityIcons>
              <Text style={stylesMain.metricasTitle}>Gestor de escalas</Text>
          </View>
          <Text style={stylesMain.metricasDescription}>¡Aquí puedes personalizar las escalas que más utilices! Esto dependerá de tu forma de trabajo, siente libre de cambiarlas cuando quieras.</Text>
          <ScrollView style={stylesMain.formatMetrics}>
            <View style={ stylesMain.metricsEnabler}>
              <View style={stylesMain.flexViewStart}>
                <Octicons style={stylesMain.iconEscalas} name="dot-fill" size={18} color="#FFF"></Octicons>
                <Text style={stylesMain.textEscala}>Escala de Ashwort</Text>
              </View>
              <Switch color="#99BF0F" value={metricas.ashwort} onValueChange={() => toggleMetrica('ashwort')}/>
            </View>
            <View style={ stylesMain.metricsEnabler}>
              <View style={stylesMain.flexViewStart}>
                <Octicons style={stylesMain.iconEscalas} name="dot-fill" size={18} color="#FFF"></Octicons>
                <Text style={stylesMain.textEscala}>Escala de Barthel</Text>
              </View>
              <Switch color="#99BF0F" value={metricas.barthel} onValueChange={() => toggleMetrica('barthel')}/>
            </View>
            <View style={ stylesMain.metricsEnabler}>
              <View style={stylesMain.flexViewStart}>
                <Octicons style={stylesMain.iconEscalas} name="dot-fill" size={18} color="#FFF"></Octicons>
                <Text style={stylesMain.textEscala}>Escala de Braden</Text>
              </View>
              <Switch color="#99BF0F" value={metricas.braden} onValueChange={() => toggleMetrica('braden')}/>
            </View>
            <View style={ stylesMain.metricsEnabler}>
              <View style={stylesMain.flexViewStart}>
                <Octicons style={stylesMain.iconEscalas} name="dot-fill" size={18} color="#FFF"></Octicons>
                <Text style={stylesMain.textEscala}>Escala Daniels modificada</Text>
              </View>
              <Switch color="#99BF0F" value={metricas.daniels} onValueChange={() => toggleMetrica('daniels')} />
            </View>
            <View style={ stylesMain.metricsEnabler}>
              <View style={stylesMain.flexViewStart}>
                <Octicons style={stylesMain.iconEscalas} name="dot-fill" size={18} color="#FFF"></Octicons>
                <Text style={stylesMain.textEscala}>Escala de Glasgow</Text>
              </View>
              <Switch color="#99BF0F" value={metricas.glasgow} onValueChange={() => toggleMetrica('glasgow')}/>
            </View>
            <View style={ stylesMain.metricsEnabler}>
              <View style={stylesMain.flexViewStart}>
                <Octicons style={stylesMain.iconEscalas} name="dot-fill" size={18} color="#FFF"></Octicons>
                <Text style={stylesMain.textEscala}>Escala o signo de Godet</Text>
              </View>
              <Switch color="#99BF0F" value={metricas.godet} onValueChange={() => toggleMetrica('godet')}/>
            </View>
            <View style={ stylesMain.metricsEnabler}>
              <View style={stylesMain.flexViewStart}>
                <Octicons style={stylesMain.iconEscalas} name="dot-fill" size={18} color="#FFF"></Octicons>
                <Text style={stylesMain.textEscala}>Escala de Seidel o ROTS</Text>
              </View>
              <Switch color="#99BF0F" value={metricas.seidel} onValueChange={() => toggleMetrica('seidel')}/>
            </View>
            <View style={ stylesMain.metricsEnabler}>
              <View style={stylesMain.flexViewStart}>
                <Octicons style={stylesMain.iconEscalas} name="dot-fill" size={18} color="#FFF"></Octicons>
                <Text style={stylesMain.textEscala}>Escala Tinetti</Text>
              </View>
              <Switch color="#99BF0F" value={metricas.tinetti} onValueChange={() => toggleMetrica('tinetti')}/>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
      <TouchableOpacity 
        style={{
          backgroundColor: "#00BCD4",
          alignItems: "center",
          paddingVertical: 20,
          paddingEnd: windowHeight * 0.05,
          paddingStart: windowHeight * 0.05,
          borderRadius: 20,
          marginHorizontal: 1,
          shadowColor: "#000",
          shadowOffset: { width: 2, height: 16 },
          shadowOpacity: 0.5,
          shadowRadius: 6,
          elevation: 7,
          marginVertical: 50
        }} 
        onPress={enviarAlServidor}
        >
          <View style={stylesMain.flexViewStart}>
            <MaterialCommunityIcons style={{marginRight: 10}} name="content-save-cog" size={25} color="#FFF"></MaterialCommunityIcons>
            <Text style={[stylesHistorial.buttonText, { color:"#FFF"}]}>Guardar</Text>
          </View>
      </TouchableOpacity> 
    </View>
  );
}