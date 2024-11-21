import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer, useNavigation, useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator} from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import "react-native-gesture-handler";
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
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { GestureHandlerRootView, Gesture, GestureDetector, PanGestureHandler } from "react-native-gesture-handler";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

enableScreens();

export default function App() {
  const Stack = createNativeStackNavigator();
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
        }}
        >
          <PatientTabs.Screen 
            name="menu Principal" 
            component={MainPatient}
            options={{
              title: "Inicio" , 
              tabBarIconStyle: {width: 100},
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} iconName="home" />,
              tabBarLabel: ({ focused }) => (
                <Animated.Text
                  style={{
                    color: focused ? '#000' : '#FFF',
                    fontSize: focused ? 14 : 12,
                    fontWeight: focused ? 'bold' : 'normal',
                  }}
                >
                  Inicio
                </Animated.Text>
              ),
              tabBarStyle: { backgroundColor: "#002245" },
              tabBarBadgeStyle: { backgroundColor: "#FFFFFF" },
              tabBarActiveBackgroundColor: "#34e1e3",  
              tabBarLabelStyle: {
                fontSize: 12,
                color: "white",
                fontWeight: "bold"         
              }
            }}
          />
          <PatientTabs.Screen
            name="PerfilPaciente"
            component={PerfilPaciente}
            options={{ 
              title: "Perfil",
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} iconName="user" />,
              tabBarLabel: ({ focused }) => (
                <Animated.Text
                  style={{
                    color: focused ? '#000' : '#FFF',
                    fontSize: focused ? 14 : 12,
                    fontWeight: focused ? 'bold' : 'normal',
                  }}
                >
                  Perfil
                </Animated.Text>
              ),
              tabBarStyle: { backgroundColor: "#002245" },
              tabBarActiveBackgroundColor: "#34e1e3",  
              tabBarLabelStyle: {
                fontSize: 12,
                color: "white",
                fontWeight: "bold"         
              },
            }}
          
          />
          
      </PatientTabs.Navigator>
    )
  }

  function TabBarIcon({ focused, iconName }) {
    const scale = useSharedValue(1); 
    
    scale.value = withTiming(focused ? 1.4 : 1, {
      duration: 500,
      easing: Easing.ease,
    });
  
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });
  
    return (
      <Animated.View style={animatedStyle}>
        <Icon name={iconName} size={23} color={ focused ? '#000' : '#FFF'} />
      </Animated.View>
    );
  }
  
  function TabsFisio() {  
    return (
      <GestureHandlerRootView>
        <FisioTabs.Navigator
          initialRouteName="menu Principal"
          screenOptions={{
            headerShown: false,              
          }}
    
          >
        <FisioTabs.Screen 
            name="menu Principal" 
            component={MainPhisio}
            options={{
              title: "Inicio" , 
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} iconName="home" />,
              tabBarLabel: ({ focused }) => (
                <Animated.Text
                  style={{
                    color: focused ? '#000' : '#FFF',
                    fontSize: focused ? 14 : 12,
                    fontWeight: focused ? 'bold' : 'normal',
                  }}
                >
                  Inicio
                </Animated.Text>
              ),
              tabBarStyle: { backgroundColor: "#002245" },
              tabBarBadgeStyle: { backgroundColor: "#FFFFFF" },
              tabBarActiveBackgroundColor: "#34e1e3",  
              tabBarLabelStyle: {
                fontSize: 12,
                color: "white",
                fontWeight: "bold"         
              }
            }}
        />
        <FisioTabs.Screen
            name="Selector de Escalas"
            component={SelectorMetricas}
            options={{ 
              title: "Escalas",
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} iconName="bar-chart" />,
              tabBarLabel: ({ focused }) => (
                <Animated.Text
                  style={{
                    color: focused ? '#000' : '#FFF',
                    fontSize: focused ? 14 : 12,
                    fontWeight: focused ? 'bold' : 'normal',
                  }}
                >
                  Escalas
                </Animated.Text>
              ),
              tabBarStyle: { backgroundColor: "#002245" },
              tabBarBadgeStyle: { backgroundColor: "#FFFFFF" },
              tabBarActiveBackgroundColor: "#34e1e3",  
              tabBarLabelStyle: {
                fontSize: 12,
                color: "white",
                fontWeight: "bold"         
              }
            }}
        />
        <FisioTabs.Screen
            name="Contactos Fisioterapeutas"
            component={ContactosPhisio}
            options={{ 
              title: "Contactos",
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} iconName="address-book" />,
              tabBarLabel: ({ focused }) => (
                <Animated.Text
                  style={{
                    color: focused ? '#000' : '#FFF',
                    fontSize: focused ? 14 : 12,
                    fontWeight: focused ? 'bold' : 'normal',
                  }}
                >
                  Contactos
                </Animated.Text>
              ),
              tabBarStyle: { backgroundColor: "#002245" },
              tabBarBadgeStyle: { backgroundColor: "#FFFFFF" },
              tabBarActiveBackgroundColor: "#34e1e3",  
              tabBarLabelStyle: {
                fontSize: 12,
                color: "white",
                fontWeight: "bold"         
              }
            }}
        />
        <FisioTabs.Screen
            name="Agenda de citas"
            component={AgendaCitas}
            options={{ 
              title: "Agenda",
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} iconName="calendar" />,
              tabBarLabel: ({ focused }) => (
                <Animated.Text
                  style={{
                    color: focused ? '#000' : '#FFF',
                    fontSize: focused ? 14 : 12,
                    fontWeight: focused ? 'bold' : 'normal',
                  }}
                >
                  Agenda
                </Animated.Text>
              ),
              tabBarBadge: '3',
              tabBarBadgeStyle: {
                color: 'white',
                backgroundColor: 'red',            
              },
              tabBarStyle: { backgroundColor: "#002245" },
              tabBarActiveBackgroundColor: "#34e1e3",  
              tabBarLabelStyle: {
                fontSize: 12,
                color: "white",
                fontWeight: "bold"         
              }
            }}
        />
        <FisioTabs.Screen
            name="PerfilFisio"
            component={PerfilPhisio}
            options={{ 
              title: "Perfil",
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} iconName="user" />,
              tabBarLabel: ({ focused }) => (
                <Animated.Text
                  style={{
                    color: focused ? '#000' : '#FFF',
                    fontSize: focused ? 14 : 12,
                    fontWeight: focused ? 'bold' : 'normal',
                  }}
                >
                  Perfil
                </Animated.Text>
              ),
              tabBarStyle: { backgroundColor: "#002245" },
              tabBarActiveBackgroundColor: "#34e1e3",  
              tabBarLabelStyle: {
                fontSize: 12,
                color: "white",
                fontWeight: "bold"         
              },
            }}
          />
        </FisioTabs.Navigator>
      </GestureHandlerRootView>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{
          headerStyle: { backgroundColor: "#073E75" },
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
          options={{ headerShown: false, gestureEnabled: true, gestureDirection: 'horizontal' }}
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