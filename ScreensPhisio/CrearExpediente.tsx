import React, { useCallback, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";

import {
  TouchableRipple,
  Snackbar,
  List
} from "react-native-paper";

import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import stylesHistorial from "../styles/stylesHistorial";
import { printToFileAsync } from "expo-print";
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from "react-native-dropdown-select-list";
import { Dialog, RadioButton } from 'react-native-paper';
import { randomUUID } from 'expo-crypto';
import axios from "axios";
import { BACKEND_URL } from "@env";
import { TextInput } from "react-native-paper";
import * as FileSystem from 'expo-file-system';
import { RouteProp } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import Slider from '@react-native-community/slider';
import { debounce } from 'lodash';  
import { FontAwesome6 } from "@expo/vector-icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Clipboard from 'expo-clipboard';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type RouteParams = {
  params: {
    paciente: {
      id: string; 
      nombre: string;
      imagenPerfil: string;
      apellidos: string;
      fechaNacimiento: string;
      genero: string;
      ubicacion: string;
      proximaCita: string;
      numeroContacto: string;
      mail: string;
      tipo: string;
    };
  };
};

const CrearExpediente = ({ 
  route, navigation 
}: { 
  navigation: NavigationProp<any> 
  route: RouteProp<RouteParams, "params">;
}) => {

  const paciente = route.params.paciente;

  const fetchData = async () => {
    if(paciente){
      setNombre(paciente.nombre);
      setapellidos(paciente.apellidos);
      setnacimiento(paciente.fechaNacimiento);
      setSexo(paciente.genero);
      settelefono(paciente.numeroContacto);
      setcorreo(paciente.mail);
    }
  };

  const takeDate = async () => {
    const date = new Date();
    setFechaCreacion(date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }));
  };

  useFocusEffect(
      useCallback(() => {
        if (paciente) {
          fetchData();
          takeDate();
        }
      }, [paciente])
    );

  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  //console.log(paciente);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }: { type: string }, selectedDate: any) => {
    if(type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

        toggleDatePicker();
        setFechaCreacion(currentDate.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })); 

    }else{
      toggleDatePicker();
    }
  };

  const calcularIMC = (peso: number, estaturaCm: number) => {
    const estaturaM = estaturaCm / 100; // Convertir cm a metros
    const imc = peso / (estaturaM * estaturaM); // Calcular IMC
    return imc.toFixed(2); // Devolver el IMC con dos decimales
  };

  const handlePesoChange = (value: string) => {
    setpeso(value);
    if (estatura) {
      const imcCalculado = calcularIMC(parseFloat(value), parseFloat(estatura));
      setimc(imcCalculado);
    }
  };
  
  const handleEstaturaChange = (value: string) => {
    setestatura(value);
    if (peso) {
      const imcCalculado = calcularIMC(parseFloat(peso), parseFloat(value));
      setimc(imcCalculado);
    }
  };

  const [evaValue, setEvaValue] = useState(0);

  const handleEvaValueChange = useCallback(
    debounce((newValue: number) => {
      setEvaValue(newValue);
    }, 50),
    [evaValue]
  );

  const getEvaColor = (): string => {
    const colors = {
      0: '#A8E6CF',
      1: '#A8E6CF',
      2: '#FFD54F',
      3: '#FFD54F',
      4: '#FFB74D',
      5: '#FFB74D',
      6: '#FF7043',
      7: '#FF7043',
      8: '#F44336',
      9: '#F44336',
      10: '#D32F2F',
    };

    return colors[evaValue] || '#000000';
  };

  const getEvaIcon = () => {
    const icons = {
      0: 'face-grin-stars',
      1: 'face-smile-beam',
      2: 'face-smile',
      3: 'face-grimace',
      4: 'face-meh',
      5: 'face-meh',
      6: 'face-sad-tear',
      7: 'face-sad-tear',
      8: 'face-sad-cry',
      9: 'face-sad-cry',
      10: 'face-tired',
    };

    return icons[evaValue] || 'face-meh-blank';
  }

  const [nombre, setNombre] = useState("");
  const [apellidos, setapellidos] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [sexo, setSexo] = useState("");
  const [nacimiento, setnacimiento] = useState("");
  const edad = calcularEdad(nacimiento.substring(0, 10));
  const [telefono, settelefono] = useState("");
  const [correo, setcorreo] = useState("");
  const [peso, setpeso] = useState("");
  const [estatura, setestatura] = useState("");
  const [imc, setimc] = useState("");
  const [cancerH, setcancerH] = useState(false);
  const [obesidadH, setobesidadH] = useState(false);
  const [htaH, sethtaH] = useState(false);
  const [diabetesH, setdiabetesH] = useState(false);
  const [osteopH, setosteopH] = useState(false);
  const [cardioH, setcardioH] = useState(false);
  const [cancerP, setcancerP] = useState(false);
  const [obesidadP, setobesidadP] = useState(false);
  const [htaP, sethtaP] = useState(false);
  const [diabetesP, setdiabetesP] = useState(false);
  const [osteopP, setosteopP] = useState(false);
  const [cardioP, setcardioP] = useState(false);
  const [cirugias, setcirugias] = useState("");
  const [trauma, settrauma] = useState("");
  const [Hospitalizacion, setHospitalizacion] = useState("");
  const [congenitas, setcongenitas] = useState("");
  const [Pactual, setPactual] = useState("");
  const [Dprevio, setDprevio] = useState("");
  const [Tprevio, setTprevio] = useState("");
  const [EVA, setEVA] = useState(1);
  const [Observaciones, setObservaciones] = useState("");
  const [farmacos, setfarmacos] = useState("");
  const [FechaCreacion, setFechaCreacion] = useState("");
  const [tabaquismo, settabaquismo] = useState(false);
  const [frecuenciaT, setfrecuenciaT] = useState("");
  const [alcoholismo, setalcoholismo] = useState(false);
  const [frecuenciaA, setfrecuenciaA] = useState("");
  const [Otras, setOtras] = useState("");
  const [ejercicio, setejercicio] = useState(false);
  const [frecuenciaE, setfrecuenciaE] = useState("");
  const [ocupacion, setocupacion] = useState("");
  const [PruebasE, setPruebasE] = useState("");
  const [valoracionPostural, setvaloracionPostural] = useState("");
  const [Palpacion, setPalpacion] = useState("");
  const [DiagnosticoFisio, setDiagnosticoFisio] = useState("");
  const [ObjetivoG, setObjetivoG] = useState("");
  const [ObjetivoE, setObjetivoE] = useState("");
  const [ExpedienteCreado, setExpedienteCreado] = useState(false);
  const changeExpedienteCreado = () => setExpedienteCreado(!ExpedienteCreado);
  const [isPhoneCopied, setIsPhoneCopied] = useState(false);
  const onDismissPhoneSnackBar = () => setIsPhoneCopied(false);
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const onDismissEmailSnackBar = () => setIsEmailCopied(false);

  const DataPDF = {
    nombre: nombre,
    apellidos: apellidos,
    estadoCivil: estadoCivil,
    edad: edad,
    sexo: sexo,
    nacimiento: nacimiento,
    telefono: telefono,
    correo: correo,
    peso: peso,
    estatura: estatura,
    imc: imc,
    cancerH: cancerH,
    obesidadH: obesidadH,
    htaH: htaH,
    diabetesH: diabetesH,
    osteopH: osteopH,
    cardioH: cardioH,
    cancerP: cancerP,
    obesidadP: obesidadP,
    htaP: htaP,
    diabetesP: diabetesP,
    osteopP: osteopP,
    cardioP: cardioP,
    cirugias: cirugias,
    trauma: trauma,
    Hospitalizacion: Hospitalizacion,
    congenitas: congenitas,
    Pactual: Pactual,
    Dprevio: Dprevio,
    Tprevio: Tprevio,
    EVA: EVA,
    Observaciones: Observaciones,
    farmacos: farmacos,
    FechaCreacion: FechaCreacion,
    tabaquismo: tabaquismo,
    frecuenciaT: frecuenciaT,
    alcoholismo: alcoholismo,
    frecuenciaA: frecuenciaA,
    Otras: Otras,
    ejercicio: ejercicio,
    frecuenciaE: frecuenciaE,
    ocupacion: ocupacion,
    PruebasE: PruebasE,
    valoracionPostural: valoracionPostural,
    Palpacion: Palpacion,
    DiagnosticoFisio: DiagnosticoFisio,
    ObjetivoG: ObjetivoG,
    ObjetivoE: ObjetivoE,
  };

    const html = `
    <html>
      <head>
        <title>Expediente</title>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          h1 {
            color: #333;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid #333;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }

          tr, thead {
            border: 1px solid #333;
            padding: 8px;
            
          }
        </style>
      </head>
      <body>
        <table>
            <thead> 
              <tr>
                <th colspan="7", style="background-color: white; text-align: center;">Historia Clínica</th> 
              </tr>
            </thead>
            <tr>
              <th>Nombre</th>
              <td colspan="4">${nombre} ${apellidos}</td>
              <th>Estado civil</th>
              <td>${estadoCivil}</td>
            </tr>
            <tr>
              <th>Edad</th>
              <td>${edad}</td>
              <th>Sexo</th>
              <td>${sexo}</td>
              <th>fecha de nacimiento</th>
              <td colspan="2">${nacimiento}</td>
            </tr>
            <tr>
              <th>Contacto</th>
              <td colspan="3">${telefono}</td>
              <td colspan="3">${correo}</td>
            </tr>
            <tr>
              <th>Peso</th>
              <td>${peso}</td>
              <th>Estatura</th>
              <td>${estatura}</td>
              <th>IMC</th>
              <td colspan="2">${imc}</td>
            </tr>
            <tr>
              <th rowspan="2">Antecedentes Hereditarios</th>
              <th>Cancer</th>
              <th>Obesidad</th>
              <th>HTA</th>
              <th>Diabetes</th>
              <th>Osteop.</th>
              <th>Cardio</th>
              </tr>
            <tr>
              <td>${cancerH}</td>
              <td>${obesidadH}</td>
              <td>${htaH}</td>
              <td>${diabetesH}</td>
              <td>${osteopH}</td>
              <td>${cardioH}</td>
            </tr>
            <tr>
              <th rowspan="2">Antecedentes Patologicos</th>
              <th>Cancer</th>
              <th>Obesidad</th>
              <th>HTA</th>
              <th>Diabetes</th>
              <th>Osteop.</th>
              <th>Cardio</th>
              </tr>
            <tr>
              <td>${cancerP}</td>
              <td>${obesidadP}</td>
              <td>${htaP}</td>
              <td>${diabetesP}</td>
              <td>${osteopP}</td>
              <td>${cardioP}</td>
            </tr>
            <tr>
              <th>Cirugias</th>
              <td colspan="6">${cirugias}</td>
            </tr>
            <tr>
              <th>Trauma</th>
              <td colspan="6">${trauma}</td>
            </tr>
            <tr>
              <th>Hospitalizacion</th>
              <td colspan="6">${Hospitalizacion}</td>
            </tr>
            <tr>
              <th>Enfermedadees congenitas</th>
              <td colspan="6">${congenitas}</td>
            </tr>
            <tr>
              <th>Padecimiento actual</th>
              <td colspan="6">${Pactual}</td>
            </tr>
            <tr>
              <th>Diagnostico previo</th>
              <td colspan="6">${Dprevio}</td>
            </tr>
            <tr>
              <th>Tratamiento previo</th>
              <td colspan="6">${Tprevio}</td>
            </tr>
            <tr>
              <th>Observaciones</th>
              <td colspan="6">${Observaciones}</td>
            </tr>
            <tr>
              <th>Farmacos prescritos y no presc.</th>
              <td colspan="6">${farmacos}</td>
            </tr>
            <tr>
              <th>Escala EVA</th>
              <td colspan="4"> EVA: ${EVA}</td>
              <th>Fecha de creacion</th>
              <td>${FechaCreacion}</td>
            </tr>
        </table>
        <h3 style="text-align: center;">Habitos</h3>
        <table>
          <tr>
            <th>Tabaquismo</th>
            <th>Frecuencia</th>
            <td>${tabaquismo} ${frecuenciaT}</td>
            <th>Alcoholismo</th>
            <th>Frecuencia</th>
            <td>${alcoholismo} ${frecuenciaA}</td>
            <th>Ejercicio</th>
            <td colspan="3">${ejercicio} ${frecuenciaE}</td>
          </tr>
          <tr>
            <th> Otras Toxicomanias</th>
            <td colspan="7">${Otras}</td>
          </tr>
          <tr>
            <th>Ocupacion</th>
            <td colspan="7">${ocupacion}</td>
          </tr>
        </table>




        <h3 style="text-align: center; margin-top: 100px;">Exploracion Física</h3>
        <table>
          <tr>
            <th  style="width: 25%;">Pruebas especificas</th>
            <td>${PruebasE}</td>
          </tr>
          <tr>
            <th>Valoracion Postural</th>
            <td colspan="2">${valoracionPostural}</td>
          </tr>
          <tr>
            <th>Palpacion</th>
            <td colspan="2">${Palpacion}</td>
          </tr>
          <tr>
            <th>Diagnostico Fisio</th>
            <td colspan="2">${DiagnosticoFisio}</td>
          </tr>
          <tr>
            <th>Objetivo General</th>
            <td colspan="2">${ObjetivoG}</td>
          </tr>
          <tr>
            <th>Objetivos Especificos</th>
            <td colspan="2">${ObjetivoE}</td>
          </tr>
        </table>
        </body>
        </html>
        `;

    let generatePdf = async () => {
      try {
          // Genera el archivo PDF
          const file = await printToFileAsync({
              html: html,
          });
          const uuid = randomUUID();
          // Lee el archivo como base64
          const fileData = await FileSystem.readAsStringAsync(file.uri, {
            encoding: FileSystem.EncodingType.Base64, 
          });

          let formData = new FormData();
          const pdfBlob = {
              uri: file.uri,
              name: uuid + 'pdf',
              type: 'application/pdf',
          } as any;
          formData.append('expediente', await pdfBlob);
          formData.append('idPaciente', paciente.id);
          formData.append('tipo', paciente.tipo);
  
          // Envía el archivo PDF al servidor usando axios
          const result = await axios.post(BACKEND_URL + '/expediente', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });

          //navigation.goBack();

          changeExpedienteCreado();
  
      } catch (error) {
          console.error('Error en generatePdf:', error);
      }
  };

    const CivilData = [
      { key: "1", value: "Soltero (a)" },
      { key: "2", value: "Casado (a)" },
      { key: "3", value: "Divorciado (a)" },
      { key: "4", value: "Viudo (a)" },
    ];

    const frecuenciasT = [
      { key: "1", value: "1-5 cigarros por dia" },
      { key: "2", value: "6-10 cigarros por dia" },
      { key: "3", value: "11-20 cigarros por dia" },
      { key: "4", value: "21-30 cigarros por dia" },
      { key: "5", value: "Mas de 30 cigarros por dia" },
    ];

    const frecuenciasA = [
      { key: "1", value: "una vez al mes" },
      { key: "2", value: "2-4 veces al mes" },
      { key: "3", value: "2-3 veces por semana" },
      { key: "4", value: "4 o mas veces por semana" },
    ];

    const frecuenciasE = [
      { key: "1", value: "1-2 veces por semana" },
      { key: "2", value: "3-4 veces por semana" },
      { key: "3", value: "5-6 veces por semana" },
      { key: "4", value: "7 veces por semana" },
    ];

    const validarDatos = () => {
      if (
        !FechaCreacion ||
        !nombre ||
        !apellidos ||
        !estadoCivil ||
        !edad ||
        !sexo ||
        !nacimiento ||
        !telefono ||
        !correo ||
        !peso ||
        !estatura ||
        !imc ||
        !cirugias ||
        !trauma ||
        !Hospitalizacion ||
        !congenitas ||
        !Pactual ||
        !Dprevio ||
        !Tprevio ||
        !Observaciones ||
        !farmacos ||
        !ocupacion ||
        !DiagnosticoFisio ||
        !ObjetivoE
      ) {
        return false;
      }
      return true;
    };

  function calcularEdad(fechaNacimiento: string): string {
  
    const fechaNacimientoDate = new Date(fechaNacimiento); // Los meses en JavaScript son 0-indexed (enero es 0)
    const fechaActual = new Date();
  
    let age = fechaActual.getFullYear() - fechaNacimientoDate.getFullYear();
    
    // Verificamos si el cumpleaños de este año ya pasó o no
    const mesActual = fechaActual.getMonth();
    const diaActual = fechaActual.getDate();

    const mes = fechaNacimientoDate.getMonth();
    const dia = fechaNacimientoDate.getDay();
  
    if (mesActual < mes - 1 || (mesActual === mes - 1 && diaActual < dia)) {
      age--;
    }
  
    const yearsType = age > 1 ? ' años' : ' año';

    const edadCalculada = age + yearsType;

    return edadCalculada;
  }

  async function copyPhone(): Promise<void> {
    try {
      await Clipboard.setStringAsync(telefono);
      setIsPhoneCopied(true); 
      setTimeout(() => setIsPhoneCopied(false), 1000); 
    } catch (error) {
      console.error("Error al copiar al portapapeles", error);
    }
  }

  async function copyEmail(): Promise<void> {
    try {
      await Clipboard.setStringAsync(correo);
      setIsEmailCopied(true); 
      setTimeout(() => setIsEmailCopied(false), 1000); 
    } catch (error) {
      console.error("Error al copiar al portapapeles", error);
    }
  }

  return (
    <SafeAreaView style={stylesHistorial.container}>
      
      <View style={[styles.flexViewCenter, { marginBottom: 20, marginTop: -15 }]}>
        <FontAwesome5 name="file-medical-alt" size={30} color="#FFF"></FontAwesome5>

        <Text style={[styles.titleText, { marginLeft: 20 }]}>
          ¡Crea un nuevo expediente!
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={200}
        style={styles.container}
      >
      <ScrollView style={stylesHistorial.scrollViewRegistro}>

        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date} // Provide a value prop with the current date or a specific date
            onChange={onChange}
          />
        )}

        <List.Subheader style={{ fontSize: 18, alignSelf: 'center', fontWeight: 'bold' }}>Información general</List.Subheader>

        <View style={styles.flexViewStart}>
          <FontAwesome5 name="hospital-user" size={18} color="#000"></FontAwesome5>

          <Text style={{ marginLeft: 10 }}>
            { nombre + ' ' + apellidos }
          </Text>
        </View>

        <View style={styles.flexViewStart}>
          <FontAwesome5 name="birthday-cake" size={18} color="#000"></FontAwesome5>

          <Text style={{ marginLeft: 10 }}>
            { new Date(nacimiento.substring(0, 10)).toLocaleDateString() }
          </Text>
        </View>

        <View style={styles.flexViewStart}>
          <FontAwesome5 name="user-clock" size={18} color="#000"></FontAwesome5>

          <Text style={{ marginLeft: 10 }}>
            { calcularEdad(nacimiento.substring(0, 10)) }
          </Text>
        </View>

        <View style={styles.flexViewStart}>
          <Foundation name={sexo === 'Masculino' ? "male-symbol" : 'female-symbol'} size={23} color="#000"></Foundation>

          <Text style={{ marginLeft: 10 }}>
            { sexo }
          </Text>
        </View>

        <View style={styles.flexViewStart}>
          <FontAwesome5 name="phone-alt" size={18} color="#000"></FontAwesome5>

          <Text style={{ marginLeft: 10 }}>
            { telefono }
          </Text>
          
          <TouchableRipple
              style={{
                height: 25,
                width: 25,
                marginLeft: 10,
                borderRadius: 25,
                overflow: "hidden",
                justifyContent: 'center', 
                alignItems: 'center',    
                marginTop: -2 
              }}
              onPress={() => copyPhone()}
              borderless
            >
              <Feather name="copy" size={18} color="#000" />
            </TouchableRipple>
        </View>

        <View style={styles.flexViewStart}>
          <MaterialCommunityIcons name="email" size={18} color="#000"></MaterialCommunityIcons>

          <Text style={{ marginLeft: 10 }}>
            { correo }
          </Text>
          
          <TouchableRipple
              style={{
                height: 25,
                width: 25,
                marginLeft: 10,
                borderRadius: 25,
                overflow: "hidden",
                justifyContent: 'center', 
                alignItems: 'center',    
                marginTop: -2 
              }}
              onPress={() => copyEmail()}
              borderless
            >
              <Feather name="copy" size={18} color="#000" />
            </TouchableRipple>
        </View>

        <SelectList
          setSelected={(val: string) => {
            setEstadoCivil(val);
          }}
          data={CivilData}
          save="value"
          dropdownItemStyles={{
            backgroundColor: "#FFFFFF",
            width: "100%",
            height: 50,
            borderBottomWidth: 1,
            borderBottomColor: "#000000",
            justifyContent: "center",
            alignItems: "center",
          }}
          dropdownStyles={{
            backgroundColor: "#FFFFFF",
            width: "96%",
            height: 110,
          }}
          boxStyles={{
            // backgroundColor: "#FFFFFF",
            width: "96%",
            height: 50,
            alignItems: "center",
            borderColor: "#c5cae9",
            borderLeftWidth: 0,
            borderTopWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 2,
            
          }}
          search={false}
          placeholder="Estado Civil *"
        />

        <List.Subheader style={{ fontSize: 18, alignSelf: 'center', fontWeight: 'bold' }}>Evaluación Corporal</List.Subheader>

        <TextInput
          mode = "outlined"
          label={"Peso (Kg) *"}
          value={peso}
          style={[stylesHistorial.TextInput, { width: windowWidth * 0.7}]}
          keyboardType="numeric"
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={handlePesoChange}
          left={<TextInput.Icon style={{ marginTop: 30 }} icon={() => <MaterialCommunityIcons name="weight-kilogram" size={30} />} />}
        />
        <TextInput
          mode = "outlined"
          label={"Estatura (Cm) *"}
          value={estatura}
          style={[stylesHistorial.TextInput, { width: windowWidth * 0.7}]}
          keyboardType="numeric"
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={handleEstaturaChange}
          left={<TextInput.Icon style={{ marginTop: 30 }} icon={() => <FontAwesome5 name="ruler" size={20} />} />}
        />

        <View style={styles.flexViewCenter}>
          <FontAwesome5 name="balance-scale" size={20} color="#000" style={{ marginTop: 4 }}></FontAwesome5>

          <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold' }}>
            I.M.C:
          </Text>
          <Text style={{ marginLeft: 10, fontSize: 20 }}>
            { imc == '' ? '-' : imc }
          </Text>
        </View>

        <List.Subheader style={{ fontSize: 18, alignSelf: 'center', fontWeight: 'bold' }}>Antecedentes hereditarios</List.Subheader>

        <View>
          <Text style={styles.label}>¿Tiene antecedentes de cáncer?</Text>
          <RadioButton.Group
            onValueChange={newValue => setcancerH(newValue === "si")}
            value={cancerH ? "si" : "no"}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si" 
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View>
          <Text style={styles.label}>¿Tiene antecedentes de obesidad?</Text>
          <RadioButton.Group
            onValueChange={newValue => setobesidadH(newValue === "si")}
            value={obesidadH ? "si" : "no"}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View>
          <Text style={styles.label}>¿Tiene antecedentes de HTA?</Text>
          <RadioButton.Group
            onValueChange={newValue => sethtaH(newValue === "si")}
            value={htaH ? "si" : "no"}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View>
          <Text style={styles.label}>¿Tiene antecedentes de diabetes?</Text>
          <RadioButton.Group
            onValueChange={newValue => setdiabetesH(newValue === "si")}
            value={diabetesH ? "si" : "no"}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View>
          <Text style={styles.label}>¿Tiene antecedentes de osteoporosis?</Text>
          <RadioButton.Group
            onValueChange={newValue => setosteopH(newValue === "si")}
            value={osteopH ? "si" : "no"}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View>
          <Text style={styles.label}>¿Tiene antecedentes cardiovasculares?</Text>
          <RadioButton.Group
            onValueChange={newValue => setcardioH(newValue === "si")}
            value={cardioH ? "si" : "no"}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>

        <List.Subheader style={{ fontSize: 18, alignSelf: 'center', fontWeight: 'bold' }}>Antecedentes patológicos</List.Subheader>

        <View>
          <Text style={styles.label}>¿Tiene antecedentes de cáncer?</Text>
          <RadioButton.Group
            onValueChange={newValue => setcancerP(newValue === "si")}
            value={cancerP ? "si" : "no"}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View>
          <Text style={styles.label}>¿Tiene antecedentes de obesidad?</Text>
          <RadioButton.Group
            onValueChange={newValue => setobesidadP(newValue === "si")}
            value={obesidadP ? "si" : "no"}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View>
          <Text style={styles.label}>¿Tiene antecedentes de HTA?</Text>
          <RadioButton.Group
            onValueChange={newValue => sethtaP(newValue === "si")}
            value={htaP ? "si" : "no"}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View>
          <Text style={styles.label}>¿Tiene antecedentes de diabetes?</Text>
          <RadioButton.Group
            onValueChange={newValue => setdiabetesP(newValue === "si")}
            value={diabetesP ? "si" : "no"}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no" 
              uncheckedColor="#BDBDBD"/>
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View>
          <Text style={styles.label}>¿Tiene antecedentes de osteoporosis?</Text>
          <RadioButton.Group
            onValueChange={newValue => setosteopP(newValue === "si")}
            value={osteopP ? "si" : "no"}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View>
          <Text style={styles.label}>¿Tiene antecedentes cardiovasculares?</Text>
          <RadioButton.Group
            onValueChange={newValue => setcardioP(newValue === "si")}
            value={cardioP ? "si" : "no"}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>

        <List.Subheader style={{ fontSize: 18, alignSelf: 'center', fontWeight: 'bold' }}>Información médica</List.Subheader>

        <TextInput
          mode="outlined"
          label={"Cirugías *"}
          value={cirugias}
          style={[stylesHistorial.TextInput, { width: windowWidth * 0.7}]}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setcirugias(value)}
          multiline
          left={<TextInput.Icon style={{ marginTop: 30 }} icon={() => <Fontisto name="surgical-knife" size={20} />} />}
        />
        <TextInput
          mode="outlined"
          label={"Trauma(s) *"}
          value={trauma}
          style={[stylesHistorial.TextInput, { width: windowWidth * 0.7}]}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => settrauma(value)}
          multiline
          left={<TextInput.Icon style={{ marginTop: 30 }} icon={() => <FontAwesome6 name="hand-fist" size={20} />} />}
        />
        <TextInput
          mode="outlined"
          label={"Hospitalizacione(s) *"}
          value={Hospitalizacion}
          style={[stylesHistorial.TextInput, { width: windowWidth * 0.7}]}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setHospitalizacion(value)}
          multiline
          left={<TextInput.Icon style={{ marginTop: 30 }} icon={() => <FontAwesome6 name="hospital" size={20} />} />}
        />
        <TextInput
          mode="outlined"
          label={"Enfermedades congénitas *"}
          value={congenitas}
          style={[stylesHistorial.TextInput, { width: windowWidth * 0.7}]}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setcongenitas(value)}
          multiline
          left={<TextInput.Icon style={{ marginTop: 30 }} icon={() => <FontAwesome6 name="viruses" size={20} />} />}
        />
        <TextInput
          mode="outlined"
          label={"Padecimiento actual *"}
          value={Pactual}
          style={[stylesHistorial.TextInput, { width: windowWidth * 0.7}]}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setPactual(value)}
          multiline
          left={<TextInput.Icon style={{ marginTop: 30 }} icon={() => <FontAwesome6 name="stethoscope" size={20} />} />}
          />
        <TextInput
          mode="outlined"
          label={"Diagnostico previo *"}
          value={Dprevio}
          style={[stylesHistorial.TextInput, { width: windowWidth * 0.7}]}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setDprevio(value)}
          multiline
          left={<TextInput.Icon style={{ marginTop: 30 }} icon={() => <FontAwesome6 name="file-medical" size={20} />} />}
          />
        <TextInput
          mode="outlined"
          label={"Tratamiento previo *"}
          value={Tprevio}
          style={[stylesHistorial.TextInput, { width: windowWidth * 0.7}]}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setTprevio(value)}
          multiline
          left={<TextInput.Icon style={{ marginTop: 30 }} icon={() => <FontAwesome6 name="pills" size={20} />} />}
        />

        <List.Subheader style={{ fontSize: 18, alignSelf: 'center', fontWeight: 'bold' }}>Escala E.V.A.</List.Subheader>

        <View style={styles.contentView}>
          <View style={styles.flexViewCenter}>
            <View
              style={{
                position: 'absolute',
                left: -20,
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                width: 40,
                borderRadius: 20,
                backgroundColor: getEvaColor(),
                zIndex: -1000,
              }}
            >
              <FontAwesome6 name={getEvaIcon()} size={30} color="#fff" />
            </View>
            <Slider
              minimumValue={0}
              maximumValue={10}
              step={1}
              value={evaValue}
              onValueChange={handleEvaValueChange}
              minimumTrackTintColor={getEvaColor()}
              maximumTrackTintColor="#ccc"
              thumbTintColor={getEvaColor()}
              style={{ width: '100%', height: 40 }}
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: getEvaColor() }}>
              {evaValue}
            </Text>
          </View>

        </View>
        <TextInput
          mode="outlined"
          label={"Observaciones *"}
          value={Observaciones}
          style={[stylesHistorial.TextInput, { width: windowWidth * 0.7}]}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          multiline
          onChangeText={(value) => setObservaciones(value)}
          left={<TextInput.Icon style={{ marginTop: 30 }} icon={() => <MaterialCommunityIcons name="account-details" size={25} />} />}
        />

        <TextInput
          mode="outlined"
          label={"Fármacos Rx y OTC *"}
          value={farmacos}
          style={[stylesHistorial.TextInput, { width: windowWidth * 0.7}]}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setfarmacos(value)}
          left={<TextInput.Icon style={{ marginTop: 30 }} icon={() => <FontAwesome6 name="hand-holding-medical" size={20} />} />}
        />


        <List.Subheader style={{ fontSize: 18, alignSelf: 'center', fontWeight: 'bold' }}>Hábitos</List.Subheader>


        <View>
          <View style={styles.flexViewStart}>
            <MaterialCommunityIcons name="cigar" size={25} color="#000"></MaterialCommunityIcons>

            <Text style={[styles.label, { marginLeft: 10, marginTop: 5 }]}>
              Tabaquismo
            </Text>
          </View>
          <RadioButton.Group
            onValueChange={newValue => settabaquismo(newValue === "si")}
            value={tabaquismo ? "si" : "no"}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <SelectList
          setSelected={(val: string) => {
            setfrecuenciaT(val);
          }}
          data={frecuenciasT}
          save="value"
          dropdownItemStyles={{
            backgroundColor: "#FFFFFF",
            width: "100%",
            height: 50,
            borderBottomWidth: 1,
            borderBottomColor: "#000000",
            justifyContent: "center",
            alignItems: "center",
          }}
          dropdownStyles={{
            backgroundColor: "#FFFFFF",
            width: "96%",
            height: 110,
          }}
          boxStyles={{
            width: "96%",
            height: 50,
            alignItems: "center",
            marginTop: 5,
            borderColor: "#c5cae9",
            borderLeftWidth: 0,
            borderTopWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 2,
            
          }}
          placeholder="Frecuencia"
          search={false}
        />
        <View style={{ marginTop: 20 }}>
          <View style={styles.flexViewStart}>
            <FontAwesome5 name="beer" size={20} color="#000"></FontAwesome5>

            <Text style={[styles.label, { marginLeft: 10 }]}>
              Alcoholismo
            </Text>
          </View>
          <RadioButton.Group
            onValueChange={newValue => setalcoholismo(newValue === "si")}
            value={alcoholismo ? "si" : "no"}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <SelectList
          setSelected={(val: string) => {
            setfrecuenciaA(val);
          }}
          data={frecuenciasA}
          save="value"
          dropdownItemStyles={{
            backgroundColor: "#FFFFFF",
            width: "100%",
            height: 50,
            borderBottomWidth: 1,
            borderBottomColor: "#000000",
            justifyContent: "center",
            alignItems: "center",
          }}
          dropdownStyles={{
            backgroundColor: "#FFFFFF",
            width: "96%",
            height: 110,
          }}
          boxStyles={{
            // backgroundColor: "#FFFFFF",
            width: "96%",
            height: 50,
            alignItems: "center",
            marginTop: 5,
            borderColor: "#c5cae9",
            borderLeftWidth: 0,
            borderTopWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 2,
            
          }}
          placeholder="Frecuencia"
          search={false}
        />

        <TextInput
          mode="outlined"
          label={"Otras toxicomanias *"}
          value={Otras}
          style={[stylesHistorial.TextInput, { width: windowWidth * 0.7, marginTop: 10}]}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          multiline
          onChangeText={(value) => setOtras(value)}
          left={<TextInput.Icon style={{ marginTop: 30 }} icon={() => <MaterialCommunityIcons name="mushroom-outline" size={25} />} />}
        />
        <View>
          <View style={styles.flexViewStart}>
            <MaterialCommunityIcons name="weight-lifter" size={22} color="#000"></MaterialCommunityIcons>

            <Text style={[styles.label, { marginLeft: 10 }]}>
              Actividad fisica
            </Text>
          </View>
          <RadioButton.Group
            onValueChange={newValue => setejercicio (newValue === "si")}
            value={ejercicio ? "si" : "no"}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <SelectList
          setSelected={(val: string) => {
            setfrecuenciaE(val);
          }}
          data={frecuenciasE}
          save="value"
          dropdownItemStyles={{
            backgroundColor: "#FFFFFF",
            width: "100%",
            height: 50,
            borderBottomWidth: 1,
            borderBottomColor: "#000000",
            justifyContent: "center",
            alignItems: "center",
          }}
          dropdownStyles={{
            backgroundColor: "#FFFFFF",
            width: "96%",
            height: 110,
          }}
          boxStyles={{
            // backgroundColor: "#FFFFFF",
            width: "96%",
            height: 50,
            alignItems: "center",
            marginTop: 5,
            borderColor: "#c5cae9",
            borderLeftWidth: 0,
            borderTopWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 2,
            
          }}
          placeholder="Frecuencia"
          search={false}
        />
        <TextInput
          mode="outlined"
          label={"Ocupación *"}
          value={ocupacion}
          style={[stylesHistorial.TextInput, { width: windowWidth * 0.7, marginTop: 10}]}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          multiline
          onChangeText={(value) => setocupacion(value)}
          left={<TextInput.Icon style={{ marginTop: 30 }} icon={() => <FontAwesome5 name="hard-hat" size={20} />} />}
        />
        <TextInput
          mode="outlined"
          label={"Pruebas Especificas"}
          value={PruebasE}
          style={[stylesHistorial.TextInput, { width: windowWidth * 0.7}]}
          outlineColor="#c5cae9"
          multiline
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setPruebasE(value)}
          left={<TextInput.Icon style={{ marginTop: 30 }} icon={() => <FontAwesome5 name="flask" size={20} />} />}
        />
        <TextInput
          mode="outlined"
          label={"Valoración Postural"}
          value={valoracionPostural}
          style={[stylesHistorial.TextInput, { width: windowWidth * 0.7}]}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          multiline
          onChangeText={(value) => setvaloracionPostural(value)}
          left={<TextInput.Icon style={{ marginTop: 30 }} icon={() => <Ionicons name="body-sharp" size={25} />} />}
          />
        <TextInput
          mode="outlined"
          label={"Palpación"}
          value={Palpacion}
          style={[stylesHistorial.TextInput, { width: windowWidth * 0.7}]}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          multiline
          onChangeText={(value) => setPalpacion(value)}
          left={<TextInput.Icon style={{ marginTop: 30 }} icon={() => <FontAwesome5 name="hand-paper" size={20} />} />}
          />
        <TextInput
          mode="outlined"
          label={"Diagnostico Físico *"}
          value={DiagnosticoFisio}
          style={[stylesHistorial.TextInput, { width: windowWidth * 0.7}]}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          multiline
          onChangeText={(value) => setDiagnosticoFisio(value)}
          left={<TextInput.Icon style={{ marginTop: 30 }} icon={() => <FontAwesome5 name="file-medical-alt" size={20} />} />}
          />
        <TextInput
          mode="outlined"
          label={"Objetivo General"}
          value={ObjetivoG}
          style={[stylesHistorial.TextInput, { width: windowWidth * 0.7}]}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          multiline
          onChangeText={(value) => setObjetivoG(value)}
          left={<TextInput.Icon style={{ marginTop: 30 }} icon={() => <MaterialCommunityIcons name="bullseye-arrow" size={25} />} />}
          />
        <TextInput
          mode="outlined"
          label={"Objetivo Especifico*"}
          value={ObjetivoE}
          style={[stylesHistorial.TextInput, { width: windowWidth * 0.7}]}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setObjetivoE(value)}
          multiline
          left={<TextInput.Icon style={{ marginTop: 30 }} icon={() => <MaterialCommunityIcons name="bullseye" size={25} />} />}
        />
      </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity style={stylesHistorial.button}
      onPress={generatePdf}
      disabled={!validarDatos()}>
        <Text style={stylesHistorial.buttonText}>Guardar información</Text>
      </TouchableOpacity>

      <Dialog visible={ExpedienteCreado} onDismiss={changeExpedienteCreado}>
          <Dialog.Icon icon="check-circle" size={50} />
          <Dialog.Title style={styles.dialogTitle}>
            Hecho!
          </Dialog.Title>
          <Dialog.Content>
            <Text style={{ alignSelf: "center" }}>
            El expediente ha sido creado exitosamente
            </Text>
            <TouchableOpacity
              onPress={changeExpedienteCreado}
              style={{ alignSelf: "center", paddingTop: 30 }}
            >
              <Text style={{ fontSize: 20 }}>Aceptar</Text>
            </TouchableOpacity>
          </Dialog.Content>
        </Dialog>

      <Snackbar
        visible={isPhoneCopied}
        onDismiss={onDismissPhoneSnackBar}
        >
        ¡Teléfono copiado al portapapeles!
      </Snackbar>

      <Snackbar
        visible={isEmailCopied}
        onDismiss={onDismissEmailSnackBar}
        >
        ¡Correo copiado al portapapeles!
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    width: windowWidth * 0.8,
    height: windowHeight * 0.75,
    borderRadius: 25,
    marginBottom: 20,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 16 },
    shadowOpacity: 0.5, 
    shadowRadius: 6, 
    elevation: 8,
  },
  trackStyle: {
    height: 5,
    backgroundColor: '#d3d3d3',
  },
  label: {
    fontSize: 16,
    color: "#000",
  },
  title: {
    fontSize: 22, fontWeight: "bold", alignSelf: "center", color: "#000", paddingTop: 20
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dialogTitle: {
    textAlign: "center",
  },
  contentView: {
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  thumbStyle: {
    height: 30, 
    width: 30,
    backgroundColor: '#6200ee',
    borderRadius: 30 / 2,
  },
  iconContainer: {
    bottom: 15, right: 15
  },
  flexViewCenter: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: "row",
  },
  flexViewStart: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: "row",
    marginBottom: 10
  },
  titleText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
export default CrearExpediente;
