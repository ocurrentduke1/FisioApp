import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import "react-native-gesture-handler";
import { Image, StyleSheet } from "react-native";
import { Login } from "./Login";
import Icon from "react-native-vector-icons/FontAwesome";
import { enableScreens } from "react-native-screens";
import { RecoveryPass } from "./RecoveryPass";
import Registrar from "./Registrar";
import RegistrarPersonales from "./RegistrarPersonales";
import RegistrarTarjeta from "./RegistrarTarjeta";
import MainPatient from "./ScreensPatient/MainPatient";
import CamaraImagen from "./ScreensPatient/camaraImagen";
import CamaraVideo from "./ScreensPatient/CamaraVideo";
import EvaluacionVideo from "./ScreensPatient/EvaluacionVideo";
import EvaluacionImagen from "./ScreensPatient/EvaluacionImagen";
import VerExpedientePaciente from "./ScreensPatient/VerExpedientePaciente";
import PerfilPaciente from "./ScreensPatient/PerfilPaciente";
import Results from "./ScreensPatient/Results";
import ConfirmImage from "./ScreensPatient/ConfirmImage";
import ConfirmVideo from "./ScreensPatient/ConfirmVideo";
import ConfirmExercise from "./ScreensPatient/ConfirmExersice";
import ConfirmPosture from "./ScreensPatient/ConfirmPosture";
import MainPhisio from "./ScreensPhisio/MainPhisio";
import BuscarPacientes from "./ScreensPhisio/BuscarPacientes";
import ContactosPhisio from "./ScreensPhisio/ContactosPhisio";
import AgendaCitas from "./ScreensPhisio/AgendaCitas";
import PerfilPhisio from "./ScreensPhisio/PerfilPhisio";
import HistorialPaciente from "./ScreensPhisio/HistorialPaciente";
import SelectorMetricas from "./ScreensPhisio/SelectorMetricas";
import RegistrarNuevoPaciente from "./ScreensPhisio/RegistrarNuevoPaciente";
import CrearExpediente from "./ScreensPhisio/CrearExpediente";
import PacientesCompartidos from "./ScreensPhisio/PacientesCompartidos";
import VisualizarPdf from "./ScreensPhisio/VisualizarPdf";
import AshwortMetric from "./ScreensMetrics/AshwortMetric";
import BarthelMetric from "./ScreensMetrics/BarthelMetric";
import BradenMetric from "./ScreensMetrics/BradenMetric";
import DanielsMetric from "./ScreensMetrics/DanielsMetric";
import GlasgowMetric from "./ScreensMetrics/GlasgowMetric";
import GodetMetric from "./ScreensMetrics/GodetMetric";
import SeidelMetric from "./ScreensMetrics/SeidelMetric";
import TinettiMetric from "./ScreensMetrics/TinettiMetric";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BuscarContactos from "./ScreensPhisio/BuscarContactos";
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

enableScreens();

export default function App() {
  const Stack = createNativeStackNavigator();
  const PatientDrawer = createDrawerNavigator();
  const FisioDrawer = createDrawerNavigator();
  const MetricsTab = createMaterialTopTabNavigator();
  const PatientTabs = createBottomTabNavigator();
  const FisioTabs = createBottomTabNavigator();

  function MyTabs() {
    
    const [visible, setVisible] = useState<string | null>(null);
    const [metricasVisibles, setMetricasVisibles] = useState({
      ashwort: true,
      barthel: true,
      braden: true,
      daniels: true,
      glasgow: true,
      godet: true,
      seidel: true,
      tinetti: true,
    });

    useEffect(() => {
      const fetchVisible = async () => {
        const visible = await AsyncStorage.getItem('metricas');
        if (visible == null) {
          setMetricasVisibles({
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
          setMetricasVisibles(JSON.parse(visible));
        }
        setVisible(visible);
        console.log("visible", visible);
      };
      fetchVisible();
    }, []);

    const tabs = [
      {
        name: "Ashwort",
        component: AshwortMetric,
        visible: metricasVisibles.ashwort,
      },
      {
        name: "Barthel",
        component: BarthelMetric,
        visible: metricasVisibles.barthel,
      },
      {
        name: "Braden",
        component: BradenMetric,
        visible: metricasVisibles.braden,
      },
      {
        name: "Daniels",
        component: DanielsMetric,
        visible: metricasVisibles.daniels,
      },
      {
        name: "Glasgow",
        component: GlasgowMetric,
        visible: metricasVisibles.glasgow,
      },
      {
        name: "Godet",
        component: GodetMetric,
        visible: metricasVisibles.godet,
      },
      {
        name: "Seidel",
        component: SeidelMetric,
        visible: metricasVisibles.seidel,
      },
      {
        name: "Tinetti",
        component: TinettiMetric,
        visible: metricasVisibles.tinetti,
      },
    ];

    return (
      <MetricsTab.Navigator
        screenOptions={{
          tabBarItemStyle: { width: 100 },
          tabBarScrollEnabled: true,
        }}
      >
        {tabs.map((tab) => (
          tab.visible && (
            <MetricsTab.Screen
              key={tab.name}
              name={tab.name}
              component={tab.component}
            />
          )
        ))}
      </MetricsTab.Navigator>
    );
  }

  function TabsPatient() {

    return (
      <PatientTabs.Navigator
      initialRouteName="mainPaciente"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#2cbdbf" },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#000",
        tabBarBadgeStyle: {backgroundColor: "#FFFFFF"},
        tabBarActiveBackgroundColor: "#34e1e3",
      }}
      >
        <PatientTabs.Screen 
        name="menu Principal" 
        component={MainPatient}
        options={{
          title: "menu principal" , 
          tabBarIconStyle: {width: 100},
          tabBarIcon: () => <Icon name="home" size={35} color={'#FFF'}/>,

      }}
        />
        <PatientTabs.Screen
        name="PerfilPaciente"
        component={PerfilPaciente}
        options={{ 
          title: "perfil",
          tabBarIcon: () => <Icon name="user" size={35} color={'#FFF'}/>,

      }}
        
        />
        
      </PatientTabs.Navigator>
    )
  }

  function TabsFisio() {
      
      return (
        <FisioTabs.Navigator
        initialRouteName="menu Principal"
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "#2cbdbf" },
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#000",
          tabBarBadgeStyle: {backgroundColor: "#FFFFFF"},
          tabBarActiveBackgroundColor: "#34e1e3",
        }}
        >
          <FisioTabs.Screen 
          name="menu Principal" 
          component={MainPhisio}
          options={{
            title: "menu principal" , 
            tabBarIconStyle: {width: 100},
            tabBarIcon: () => <Icon name="home" size={35} color={'#FFF'}/>,
        }}
          />
          <FisioTabs.Screen
          name="Selector de Escalas"
          component={SelectorMetricas}
          options={{ 
            title: "escalas",
            tabBarIcon: () => <Icon name="bar-chart" size={30} color={'#FFF'}/>,
          }}
          />
          <FisioTabs.Screen
          name="Contactos Fisioterapeutas"
          component={ContactosPhisio}
          options={{ 
            title: "contactos",
            tabBarIcon: () => <Icon name="address-book" size={30} color={'#FFF'}/>,
          }}
          />
          <FisioTabs.Screen
          name="Agenda de citas"
          component={AgendaCitas}
          options={{ 
            title: "agenda",
            tabBarIcon: () => <Icon name="calendar" size={30} color={'#FFF'}/>,
          }}
          />
          <FisioTabs.Screen
          name="PerfilFisio"
          component={PerfilPhisio}
          options={{ 
            title: "perfil",
            tabBarIcon: () => <Icon name="user" size={35} color={'#FFF'}/>,
        }}
          
          />
          
        </FisioTabs.Navigator>
      )
  }


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{
          headerStyle: { backgroundColor: "#2cbdbf" },
          headerTintColor: "#FFFFFF",
        }}
      >
        <Stack.Screen
          name="App"
          component={App}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="registrar"
          component={Registrar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="registrarPersonales"
          component={RegistrarPersonales}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="mainFisio"
          component={TabsFisio}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="recuperarContraseña"
          component={RecoveryPass}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="registrarTarjeta"
          component={RegistrarTarjeta}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="mainPaciente"
          component={TabsPatient}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="EvaluacionVideo"
          component={EvaluacionVideo}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="EvaluacionImagen"
          component={EvaluacionImagen}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="Expediente"
          component={VerExpedientePaciente}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="perfil"
          component={PerfilPhisio}
          options={{ headerShown: false, title: ""  }}
        />
        <Stack.Screen
          name="perfilPaciente"
          component={PerfilPaciente}
          options={{ headerShown: false, title: "" }}
        />
        <Stack.Screen
          name="CamaraVideo"
          component={CamaraVideo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CamaraImagen"
          component={CamaraImagen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HistorialPaciente"
          component={HistorialPaciente}
          options={{ headerShown: true, title: "" }}
        />
        <Stack.Screen
          name="RegistrarNuevoPaciente"
          component={RegistrarNuevoPaciente}
          options={{ headerShown: true, title: "" }}
        />
        <Stack.Screen
          name="VerExpedientePaciente"
          component={VerExpedientePaciente}
          options={{ headerShown: true, title: "" }}
        />
        <Stack.Screen
          name="ConfirmImage"
          component={ConfirmImage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmVideo"
          component={ConfirmVideo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Results"
          component={Results}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmExercise"
          component={ConfirmExercise}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="ConfirmPosture"
          component={ConfirmPosture}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="CrearExpediente"
          component={CrearExpediente}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="CrearEscala"
          component={MyTabs}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="PacientesCompartidos"
          component={PacientesCompartidos}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="ContactFisio"
          component={ContactosPhisio}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="BuscarPaciente"
          component={BuscarPacientes}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="VisualizarPdf"
          component={VisualizarPdf}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="BuscarContactos"
          component={BuscarContactos}
          options={{ title: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // Hacer la imagen circular
    alignSelf: "center",
  },
  // Otros estilos...
});