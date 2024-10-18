import React, { useState } from "react";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import stylesHistorial from "../styles/stylesHistorial";
import { printToFileAsync } from "expo-print";
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from "react-native-dropdown-select-list";
import { RadioButton } from 'react-native-paper';
import { randomUUID } from 'expo-crypto';
import axios from "axios";
import { BACKEND_URL } from "@env";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CrearExpediente = ({ navigation }: { navigation: NavigationProp<any> }) => {

  const [showPicker, setShowPicker] = useState(false);
  const [showBirthdayPicker, setShowBirthdayPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const toggleBirthdayPicker = () => {
    setShowBirthdayPicker(!showBirthdayPicker);
  };

  const onChange = ({ type }: { type: string }, selectedDate: any) => {
    if(type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if(Platform.OS === "android"){
        toggleDatePicker();
        setFechaCreacion(currentDate.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })); 
      }
    }else{
      toggleDatePicker();
    }
  };

  const onChangeBirthday = ({ type }: { type: string }, selectedDate: any) => {
    if(type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if(Platform.OS === "android"){
        toggleBirthdayPicker();
        setnacimiento(currentDate.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })); 
      }
    }else{
      toggleBirthdayPicker();
    }
  };

  const [nombre, setNombre] = useState("");
  const [apellidos, setapellidos] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [edad, setedad] = useState("");
  const [sexo, setsexo] = useState("");
  const [nacimiento, setnacimiento] = useState("");
  const [telefono, settelefono] = useState("");
  const [correo, setcorreo] = useState("");
  const [peso, setpeso] = useState("");
  const [estatura, setestatura] = useState("");
  const [imc, setimc] = useState("");
  const [frecuencia, setfrecuencia] = useState("");
  const [presion, setpresion] = useState("");
  const [temperatura, settemperatura] = useState("");
  const [cancerH, setcancerH] = useState("");
  const [obesidadH, setobesidadH] = useState("");
  const [htaH, sethtaH] = useState("");
  const [diabetesH, setdiabetesH] = useState("");
  const [osteopH, setosteopH] = useState("");
  const [cardioH, setcardioH] = useState("");
  const [cancerP, setcancerP] = useState("");
  const [obesidadP, setobesidadP] = useState("");
  const [htaP, sethtaP] = useState("");
  const [diabetesP, setdiabetesP] = useState("");
  const [osteopP, setosteopP] = useState("");
  const [cardioP, setcardioP] = useState("");
  const [cirugias, setcirugias] = useState("");
  const [trauma, settrauma] = useState("");
  const [Hospitalizacion, setHospitalizacion] = useState("");
  const [congenitas, setcongenitas] = useState("");
  const [Pactual, setPactual] = useState("");
  const [Dprevio, setDprevio] = useState("");
  const [Tprevio, setTprevio] = useState("");
  const [Ddolor, setDdolor] = useState("");
  const [EVA, setEVA] = useState("");
  const [Observaciones, setObservaciones] = useState("");
  const [farmacos, setfarmacos] = useState("");
  const [FechaCreacion, setFechaCreacion] = useState("");
  const [tabaquismo, settabaquismo] = useState("");
  const [frecuenciaT, setfrecuenciaT] = useState("");
  const [alcoholismo, setalcoholismo] = useState("");
  const [frecuenciaA, setfrecuenciaA] = useState("");
  const [Otras, setOtras] = useState("");
  const [Fotras, setFotras] = useState("");
  const [ejercicio, setejercicio] = useState("");
  const [frecuenciaE, setfrecuenciaE] = useState("");
  const [alimentacion, setalimentacion] = useState("");
  const [hidratacion, sethidratacion] = useState("");
  const [ocupacion, setocupacion] = useState("");
  const [ActividadesR, setActividadesR] = useState("");
  const [HorasAR, setHorasAR] = useState("");
  const [lesionAnatomica, setlesionAnatomica] = useState("");
  const [EMM, setEMM] = useState("");
  const [PruebasE, setPruebasE] = useState("");
  const [valoracionPostural, setvaloracionPostural] = useState("");
  const [Palpacion, setPalpacion] = useState("");
  const [DiagnosticoFisio, setDiagnosticoFisio] = useState("");
  const [ObjetivoG, setObjetivoG] = useState("");
  const [ObjetivoE, setObjetivoE] = useState("");

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
    frecuencia: frecuencia,
    presion: presion,
    temperatura: temperatura,
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
    Ddolor: Ddolor,
    EVA: EVA,
    Observaciones: Observaciones,
    farmacos: farmacos,
    FechaCreacion: FechaCreacion,
    tabaquismo: tabaquismo,
    frecuenciaT: frecuenciaT,
    alcoholismo: alcoholismo,
    frecuenciaA: frecuenciaA,
    Otras: Otras,
    Fotras: Fotras,
    ejercicio: ejercicio,
    frecuenciaE: frecuenciaE,
    alimentacion: alimentacion,
    hidratacion: hidratacion,
    ocupacion: ocupacion,
    ActividadesR: ActividadesR,
    HorasAR: HorasAR,
    lesionAnatomica: lesionAnatomica,
    EMM: EMM,
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
              <th>Peso (Kg)</th>
              <td>${peso}</td>
              <th>Estatura (Cm)</th>
              <td>${estatura}</td>
              <th>IMC</th>
              <td colspan="2">${imc}</td>
            </tr>
            <tr>
              <th> Frecuencia cardiaca</th>
              <td>${frecuencia}</td>
              <th>Presión arterial</th>
              <td>${presion}</td>
              <th>Temperatura (C°)</th>
              <td colspan="2">${temperatura}</td>
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
              <th>Descripcion de dolor</th>
              <td colspan="4">${Ddolor}</td>
              <td colspan="2"> EVA: ${EVA}</td>
            </tr>
            <tr>
              <th>Observaciones</th>
              <td colspan="6">${Observaciones}</td>
            </tr>
            <tr>
              <th>Farmacos prescritos y no presc.</th>
              <td colspan="4">${farmacos}</td>
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
            <th> Otras</th>
            <td colspan="2">${Otras} ${Fotras}</td>
          </tr>
          <tr>
            <th>Ejercicio</th>
            <td colspan="3">${ejercicio}</td>
            <th>Frecuencia</th>
            <td colspan="3">${frecuenciaE}</td>
          </tr>
          <tr>
            <th>Alimentación</th>
            <td colspan="7">${alimentacion}</td>
          </tr>
          <tr>
            <th>Hidratacion</th>
            <td colspan="7">${hidratacion}</td>
          </tr>
          <tr>
            <th>Ocupacion</th>
            <td colspan="7">${ocupacion}</td>
          </tr>
          <tr>
            <th>Actividades Repetitivas</th>
            <td colspan="5">${ActividadesR}</td>
            <th>Horas</th>
            <td>${HorasAR}</td>
          </tr>
        </table>




        <h3 style="text-align: center; margin-top: 100px;">Exploracion Física</h3>
        <table>
          <tr>
            <th style="width: auto;">Sitio anatomico de lesion</th>
            <td colspan="2">${lesionAnatomica}</td>
          </tr>
          <tr>
            <th style="width: 25%;">EMM</th>
            <td>${EMM}</td>
          </tr>
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
    // let generatePdf = async () => {
    //     const file = await printToFileAsync({
    //         html: html,
    //         base64: false,
    //     });

    //     await shareAsync(file.uri);
    // };
    let generatePdf = async () => {
      try {
          // Genera el archivo PDF
          const file = await printToFileAsync({
              html: html,
              base64: false,
          });
          const uuid = randomUUID();
  
          // Lee el archivo como base64
          const response = await fetch(file.uri);
          const blob = await response.blob();
          const base64Data = await blobToBase64(blob);
  
          // Envía el archivo PDF al servidor usando axios
          const result = await axios.post(BACKEND_URL + '', {
              fileName: uuid + '.pdf',
              fileData: base64Data,
          }, {
              headers: {
                  'Content-Type': 'application/json',
              },
          });
  
          if (result.status === 200) {
              console.log('Archivo PDF enviado exitosamente');
          } else {
              console.error('Error al enviar el archivo PDF');
          }
      } catch (error) {
          console.error('Error en generatePdf:', error);
      }
  };
  
  // Función auxiliar para convertir Blob a Base64
  const blobToBase64 = (blob: Blob) => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
      });
  };

    const SexData = [
      { key: "1", value: "Masculino" },
      { key: "2", value: "Femenino" },
    ];

  return (
    <SafeAreaView style={{display: "flex",
      flex: 1,
      //backgroundColor: "#2196F3",
      alignItems: "center",
      justifyContent: "flex-start",}}>
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
          <TouchableOpacity
          onPress={toggleDatePicker}>
        <TextInput //textbox ingresar correo
          value={FechaCreacion}
          style={stylesHistorial.input}
          placeholder="Fecha de Creacion"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setFechaCreacion(value)}
          editable={false}
          onPressIn={toggleDatePicker}
        />
        </TouchableOpacity>

        <TextInput //textbox ingresar correo
          value={nombre}
          style={stylesHistorial.input}
          placeholder="Nombre(s)"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setNombre(value)}
        />
        <TextInput //textbox ingresar correo
          value={apellidos}
          style={stylesHistorial.input}
          placeholder="Apellidos"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setapellidos(value)}
        />
        <TextInput //textbox ingresar correo
          value={estadoCivil}
          style={stylesHistorial.input}
          placeholder="Estado Civil"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setEstadoCivil(value)}
        />
        <TextInput //textbox ingresar correo
          value={edad}
          style={stylesHistorial.input}
          placeholder="Edad"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          keyboardType="numeric"
          onChangeText={(value) => setedad(value)}
        />
        <SelectList
          setSelected={(val: string) => {
            setsexo(val);
          }}
          data={SexData}
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
            marginTop: 30,
            borderColor: "#c5cae9",
            borderLeftWidth: 0,
            borderTopWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 2,
            
          }}
          placeholder="Sexo"
          
        />
        {showBirthdayPicker && (
          <DateTimePicker
          mode="date"
          display="spinner"
          value={date} // Provide a value prop with the current date or a specific date
          onChange={onChangeBirthday}
          />
        )}
        <TouchableOpacity
          onPress={toggleBirthdayPicker}>
        <TextInput //textbox ingresar correo
          value={nacimiento}
          style={stylesHistorial.input}
          placeholder="Fecha de Nacimiento"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setnacimiento(value)}
          editable={false}
        />
        </TouchableOpacity>
        <TextInput //textbox ingresar correo
          value={telefono}
          style={stylesHistorial.input}
          keyboardType="numeric"
          placeholder="Telefono"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => settelefono(value)}
        />
        <TextInput //textbox ingresar correo
          value={correo}
          style={stylesHistorial.input}
          placeholder="Correo"
          keyboardType="email-address"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setcorreo(value)}
        />
        <TextInput //textbox ingresar correo
          value={peso}
          style={stylesHistorial.input}
          placeholder="Peso (Kg)"
          keyboardType="numeric"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setpeso(value)}
        />
        <TextInput //textbox ingresar correo
          value={estatura}
          style={stylesHistorial.input}
          placeholder="Estatura (cm)"
          keyboardType="numeric"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setestatura(value)}
        />
        <TextInput //textbox ingresar correo
          value={imc}
          style={stylesHistorial.input}
          placeholder="IMC"
          keyboardType="numeric"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setimc(value)}
        />
        <TextInput //textbox ingresar correo
          value={frecuencia}
          style={stylesHistorial.input}
          placeholder="Frecuencia Cardiaca"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setfrecuencia(value)}
        />
        <TextInput //textbox ingresar correo
          value={presion}
          style={stylesHistorial.input}
          placeholder="Presion Arterial"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setpresion(value)}
        />
        <TextInput //textbox ingresar correo
          value={temperatura}
          style={stylesHistorial.input}
          placeholder="Temperatura (C°)"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          keyboardType="numeric"
          onChangeText={(value) => settemperatura(value)}
        />
        <Text style={styles.title}>Antecedentes Hereditarios</Text>

        <View>
          <Text style={styles.label}>¿Tiene antecedentes de cáncer?</Text>
          <RadioButton.Group
            onValueChange={newValue => setcancerH(newValue)}
            value={cancerH}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              color="white"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              color="white"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View>
          <Text style={styles.label}>¿Tiene antecedentes de obecidad?</Text>
          <RadioButton.Group
            onValueChange={newValue => setobesidadH(newValue)}
            value={obesidadH}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              color="white"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              color="white"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View>
          <Text style={styles.label}>¿Tiene antecedentes de HTA?</Text>
          <RadioButton.Group
            onValueChange={newValue => sethtaH(newValue)}
            value={htaH}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              color="white"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              color="white"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View>
          <Text style={styles.label}>¿Tiene antecedentes de diabetes?</Text>
          <RadioButton.Group
            onValueChange={newValue => setdiabetesH(newValue)}
            value={diabetesH}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              color="white"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              color="white"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View>
          <Text style={styles.label}>¿Tiene antecedentes de Osteoporosis?</Text>
          <RadioButton.Group
            onValueChange={newValue => setosteopH(newValue)}
            value={osteopH}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              color="white"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              color="white"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View>
          <Text style={styles.label}>¿Tiene antecedentes de cardiovasculares?</Text>
          <RadioButton.Group
            onValueChange={newValue => setcardioH(newValue)}
            value={cardioH}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              color="white"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              color="white"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>

        <Text style={styles.title}>Antecedentes Patologicos</Text>
        
        <View>
          <Text style={styles.label}>¿Tiene antecedentes de cáncer?</Text>
          <RadioButton.Group
            onValueChange={newValue => setcancerP(newValue)}
            value={cancerP}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              color="white"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              color="white"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View>
          <Text style={styles.label}>¿Tiene antecedentes de obecidad?</Text>
          <RadioButton.Group
            onValueChange={newValue => setobesidadP(newValue)}
            value={obesidadP}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              color="white"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              color="white"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View>
          <Text style={styles.label}>¿Tiene antecedentes de HTA?</Text>
          <RadioButton.Group
            onValueChange={newValue => sethtaP(newValue)}
            value={htaP}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              color="white"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              color="white"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View>
          <Text style={styles.label}>¿Tiene antecedentes de diabetes?</Text>
          <RadioButton.Group
            onValueChange={newValue => setdiabetesP(newValue)}
            value={diabetesP}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              color="white"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no" 
              color="white"
              uncheckedColor="#BDBDBD"/>
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View>
          <Text style={styles.label}>¿Tiene antecedentes de Osteoporosis?</Text>
          <RadioButton.Group
            onValueChange={newValue => setosteopP(newValue)}
            value={osteopP}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              color="white"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              color="white"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View>
          <Text style={styles.label}>¿Tiene antecedentes de cardiovasculares?</Text>
          <RadioButton.Group
            onValueChange={newValue => setcardioP(newValue)}
            value={cardioP}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="si"
              color="white"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>Sí</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="no"
              color="white"
              uncheckedColor="#BDBDBD" />
              <Text style={styles.label}>No</Text>
            </View>
          </RadioButton.Group>
        </View>
        <TextInput //textbox ingresar correo
          value={cirugias}
          style={stylesHistorial.input}
          placeholder="Cirugias"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setcirugias(value)}
        />
        <TextInput //textbox ingresar correo
          value={trauma}
          style={stylesHistorial.input}
          placeholder="Trauma(s)"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => settrauma(value)}
        />
        <TextInput //textbox ingresar correo
          value={Hospitalizacion}
          style={stylesHistorial.input}
          placeholder="Hospitalizacione(s)"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setHospitalizacion(value)}
        />
        <TextInput //textbox ingresar correo
          value={congenitas}
          style={stylesHistorial.input}
          placeholder="Enfermedades congenitas"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setcongenitas(value)}
        />
        <TextInput //textbox ingresar correo
          value={Pactual}
          style={stylesHistorial.input}
          placeholder="Padecimiento actual"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setPactual(value)}
        />
        <TextInput //textbox ingresar correo
          value={Dprevio}
          style={stylesHistorial.input}
          placeholder="Diagnostico previo"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setDprevio(value)}
        />
        <TextInput //textbox ingresar correo
          value={Tprevio}
          style={stylesHistorial.input}
          placeholder="Tratamiento previo"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setTprevio(value)}
        />
        <TextInput //textbox ingresar correo
          value={Ddolor}
          style={stylesHistorial.input}
          placeholder="Descripcion de dolor"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setDdolor(value)}
        />
        <TextInput //textbox ingresar correo
          value={EVA}
          style={stylesHistorial.input}
          placeholder="EVA"
          keyboardType="numeric"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setEVA(value)}
        />
        <TextInput //textbox ingresar correo
          value={Observaciones}
          style={stylesHistorial.input}
          placeholder="Observaciones"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setObservaciones(value)}
        />
        <TextInput //textbox ingresar correo
          value={farmacos}
          style={stylesHistorial.input}
          placeholder="Farmacos prescritos y no prescritos"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setfarmacos(value)}
        />
        <Text style={styles.title}>Habitos</Text>
        <TextInput //textbox ingresar correo
          value={tabaquismo}
          style={stylesHistorial.input}
          placeholder="Tabaquismo"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => settabaquismo(value)}
        />
        <TextInput //textbox ingresar correo
          value={frecuenciaT}
          style={stylesHistorial.input}
          placeholder="Frecuencia"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setfrecuenciaT(value)}
        />
        <TextInput //textbox ingresar correo
          value={alcoholismo}
          style={stylesHistorial.input}
          placeholder="Alcoholismo"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setalcoholismo(value)}
        />
        <TextInput //textbox ingresar correo
          value={frecuenciaA}
          style={stylesHistorial.input}
          placeholder="Frecuencia"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setfrecuenciaA(value)}
        />
        <TextInput //textbox ingresar correo
          value={Otras}
          style={stylesHistorial.input}
          placeholder="Otros Habitos"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setOtras(value)}
        />
        <TextInput //textbox ingresar correo
          value={Fotras}
          style={stylesHistorial.input}
          placeholder="Frecuencia"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setFotras(value)}
        />
        <TextInput //textbox ingresar correo
          value={ejercicio}
          style={stylesHistorial.input}
          placeholder="Ejercicio"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setejercicio(value)}
        />
        <TextInput //textbox ingresar correo
          value={frecuenciaE}
          style={stylesHistorial.input}
          placeholder="Frecuencia"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setfrecuenciaE(value)}
        />
        <TextInput //textbox ingresar correo
          value={alimentacion}
          style={stylesHistorial.input}
          placeholder="Alimentacion"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setalimentacion(value)}
        />
        <TextInput //textbox ingresar correo
          value={hidratacion}
          style={stylesHistorial.input}
          placeholder="Hidratacion"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => sethidratacion(value)}
        />
        <TextInput //textbox ingresar correo
          value={ocupacion}
          style={stylesHistorial.input}
          placeholder="Ocupacion"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setocupacion(value)}
        />
        <TextInput //textbox ingresar correo
          value={ActividadesR}
          style={stylesHistorial.input}
          placeholder="Actividades Repetitivas"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setActividadesR(value)}
        />
        <TextInput //textbox ingresar correo
          value={HorasAR}
          style={stylesHistorial.input}
          placeholder="Horas"
          keyboardType="numeric"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setHorasAR(value)}
        />
        <TextInput //textbox ingresar correo
          value={lesionAnatomica}
          style={stylesHistorial.input}
          placeholder="Lesion Anatomica"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setlesionAnatomica(value)}
        />
        <TextInput //textbox ingresar correo
          value={EMM}
          style={stylesHistorial.input}
          placeholder="EMM"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setEMM(value)}
        />
        <TextInput //textbox ingresar correo
          value={PruebasE}
          style={stylesHistorial.input}
          placeholder="Pruebas Especificas"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setPruebasE(value)}
        />
        <TextInput //textbox ingresar correo
          value={valoracionPostural}
          style={stylesHistorial.input}
          placeholder="Valoracion Postural"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setvaloracionPostural(value)}
        />
        <TextInput //textbox ingresar correo
          value={Palpacion}
          style={stylesHistorial.input}
          placeholder="Palpacion"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setPalpacion(value)}
        />
        <TextInput //textbox ingresar correo
          value={DiagnosticoFisio}
          style={stylesHistorial.input}
          placeholder="Diagnostico Fisico"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setDiagnosticoFisio(value)}
        />
        <TextInput //textbox ingresar correo
          value={ObjetivoG}
          style={stylesHistorial.input}
          placeholder="Objetivo General"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setObjetivoG(value)}
        />
        <TextInput //textbox ingresar correo
          value={ObjetivoE}
          style={stylesHistorial.input}
          placeholder="Objetivo Especifico"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          onChangeText={(value) => setObjetivoE(value)}
        />
      </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity style={stylesHistorial.button}
      onPress={generatePdf}>
        <Text style={stylesHistorial.buttonText}>Guardar Expediente</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00BCD4",
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
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: "white",
  },
  title: {
    fontSize: 22, fontWeight: "bold", alignSelf: "center", color: "white", paddingTop: 20
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
export default CrearExpediente;
