import React, { useState } from "react";
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
import { TextInput } from "react-native-paper";

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
    <SafeAreaView style={stylesHistorial.container}>
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
        <TextInput
          mode = "outlined"
          label={"Fecha de Creacion"}
          value={FechaCreacion}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setFechaCreacion(value)}
          editable={false}
          onPressIn={toggleDatePicker}
        />
        </TouchableOpacity>

        <TextInput
          mode = "outlined"
          label={"Nombre(s)"}
          value={nombre}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setNombre(value)}
        />
        <TextInput
          mode = "outlined"
          label={"Apellidos"}
          value={apellidos}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setapellidos(value)}
        />
        <TextInput
          mode = "outlined"
          label={"Estado Civil"}
          value={estadoCivil}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setEstadoCivil(value)}
        />
        <TextInput
          mode = "outlined"
          label={"Edad"}
          value={edad}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
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
        <TextInput
          mode = "outlined"
          label={"Fecha de Nacimiento"}
          value={nacimiento}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setnacimiento(value)}
          editable={false}
        />
        </TouchableOpacity>
        <TextInput
          mode = "outlined"
          label={"Telefono"}
          value={telefono}
          style={stylesHistorial.TextInput}
          keyboardType="numeric"
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => settelefono(value)}
        />
        <TextInput
          mode = "outlined"
          label={"Correo"}
          value={correo}
          style={stylesHistorial.TextInput}
          keyboardType="email-address"
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setcorreo(value)}
        />
        <TextInput
          mode = "outlined"
          label={"Peso (Kg)"}
          value={peso}
          style={stylesHistorial.TextInput}
          keyboardType="numeric"
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setpeso(value)}
        />
        <TextInput
          mode = "outlined"
          label={"Estatura (cm)"}
          value={estatura}
          style={stylesHistorial.TextInput}
          keyboardType="numeric"
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setestatura(value)}
        />
        <TextInput
          mode = "outlined"
          label={"IMC"}
          value={imc}
          style={stylesHistorial.TextInput}
          keyboardType="numeric"
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setimc(value)}
        />
        <TextInput
          mode = "outlined"
          label={"Frecuencia Cardiaca"}
          value={frecuencia}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setfrecuencia(value)}
        />
        <TextInput
          mode = "outlined"
          label={"Presion Arterial"}
          value={presion}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setpresion(value)}
        />
        <TextInput
          mode = "outlined"
          label={"Temperatura (C°)"}
          value={temperatura}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
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
          <Text style={styles.label}>¿Tiene antecedentes de obecidad?</Text>
          <RadioButton.Group
            onValueChange={newValue => setobesidadH(newValue)}
            value={obesidadH}
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
            onValueChange={newValue => sethtaH(newValue)}
            value={htaH}
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
            onValueChange={newValue => setdiabetesH(newValue)}
            value={diabetesH}
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
          <Text style={styles.label}>¿Tiene antecedentes de Osteoporosis?</Text>
          <RadioButton.Group
            onValueChange={newValue => setosteopH(newValue)}
            value={osteopH}
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
          <Text style={styles.label}>¿Tiene antecedentes de cardiovasculares?</Text>
          <RadioButton.Group
            onValueChange={newValue => setcardioH(newValue)}
            value={cardioH}
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

        <Text style={styles.title}>Antecedentes Patologicos</Text>
        
        <View>
          <Text style={styles.label}>¿Tiene antecedentes de cáncer?</Text>
          <RadioButton.Group
            onValueChange={newValue => setcancerP(newValue)}
            value={cancerP}
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
          <Text style={styles.label}>¿Tiene antecedentes de obecidad?</Text>
          <RadioButton.Group
            onValueChange={newValue => setobesidadP(newValue)}
            value={obesidadP}
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
            onValueChange={newValue => sethtaP(newValue)}
            value={htaP}
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
            onValueChange={newValue => setdiabetesP(newValue)}
            value={diabetesP}
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
          <Text style={styles.label}>¿Tiene antecedentes de Osteoporosis?</Text>
          <RadioButton.Group
            onValueChange={newValue => setosteopP(newValue)}
            value={osteopP}
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
          <Text style={styles.label}>¿Tiene antecedentes de cardiovasculares?</Text>
          <RadioButton.Group
            onValueChange={newValue => setcardioP(newValue)}
            value={cardioP}
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
        <TextInput
          mode="outlined"
          label={"Cirugias"}
          value={cirugias}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setcirugias(value)}
        />
        <TextInput
          mode="outlined"
          label={"Trauma(s)"}
          value={trauma}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => settrauma(value)}
        />
        <TextInput
          mode="outlined"
          label={"Hospitalizacione(s)"}
          value={Hospitalizacion}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setHospitalizacion(value)}
        />
        <TextInput
          mode="outlined"
          label={"Enfermedades congenitas"}
          value={congenitas}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setcongenitas(value)}
        />
        <TextInput
          mode="outlined"
          label={"Padecimiento actual"}
          value={Pactual}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setPactual(value)}
        />
        <TextInput
          mode="outlined"
          label={"Diagnostico previo"}
          value={Dprevio}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setDprevio(value)}
        />
        <TextInput
          mode="outlined"
          label={"Tratamiento previo"}
          value={Tprevio}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setTprevio(value)}
        />
        <TextInput
          mode="outlined"
          label={"Descripcion de dolor"}
          value={Ddolor}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setDdolor(value)}
        />
        <TextInput
          mode="outlined"
          label={"EVA"}
          value={EVA}
          style={stylesHistorial.TextInput}
          keyboardType="numeric"
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setEVA(value)}
        />
        <TextInput
          mode="outlined"
          label={"Observaciones"}
          value={Observaciones}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setObservaciones(value)}
        />
        <TextInput
          mode="outlined"
          label={"Farmacos prescritos y no prescritos"}
          value={farmacos}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setfarmacos(value)}
        />
        <Text style={styles.title}>Habitos</Text>
        <TextInput
          mode="outlined"
          label={"Tabaquismo"}
          value={tabaquismo}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => settabaquismo(value)}
        />
        <TextInput
          mode="outlined"
          label={"Frecuencia"}
          value={frecuenciaT}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setfrecuenciaT(value)}
        />
        <TextInput
          mode="outlined"
          label={"Alcoholismo"}
          value={alcoholismo}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setalcoholismo(value)}
        />
        <TextInput
          mode="outlined"
          label={"Frecuencia"}
          value={frecuenciaA}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setfrecuenciaA(value)}
        />
        <TextInput
          mode="outlined"
          label={"Otros Habitos"}
          value={Otras}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setOtras(value)}
        />
        <TextInput
          mode="outlined"
          label={"Frecuencia"}
          value={Fotras}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setFotras(value)}
        />
        <TextInput
          mode="outlined"
          label={"Ejercicio"}
          value={ejercicio}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setejercicio(value)}
        />
        <TextInput
          mode="outlined"
          label={"Frecuencia"}
          value={frecuenciaE}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setfrecuenciaE(value)}
        />
        <TextInput
          mode="outlined"
          label={"Alimentacion"}
          value={alimentacion}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setalimentacion(value)}
        />
        <TextInput
          mode="outlined"
          label={"Hidratacion"}
          value={hidratacion}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => sethidratacion(value)}
        />
        <TextInput
          mode="outlined"
          label={"Ocupacion"}
          value={ocupacion}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setocupacion(value)}
        />
        <TextInput
          mode="outlined"
          label={"Actividades Repetitivas"}
          value={ActividadesR}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setActividadesR(value)}
        />
        <TextInput
          mode="outlined"
          label={"Horas"}
          value={HorasAR}
          style={stylesHistorial.TextInput}
          keyboardType="numeric"
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setHorasAR(value)}
        />
        <TextInput
          mode="outlined"
          label={"Lesion Anatomica"}
          value={lesionAnatomica}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setlesionAnatomica(value)}
        />
        <TextInput
          mode="outlined"
          label={"EMM"}
          value={EMM}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setEMM(value)}
        />
        <TextInput
          mode="outlined"
          label={"Pruebas Especificas"}
          value={PruebasE}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setPruebasE(value)}
        />
        <TextInput
          mode="outlined"
          label={"Valoracion Postural"}
          value={valoracionPostural}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setvaloracionPostural(value)}
        />
        <TextInput
          mode="outlined"
          label={"Palpacion"}
          value={Palpacion}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setPalpacion(value)}
        />
        <TextInput
          mode="outlined"
          label={"Diagnostico Fisico"}
          value={DiagnosticoFisio}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setDiagnosticoFisio(value)}
        />
        <TextInput
          mode="outlined"
          label={"Objetivo General"}
          value={ObjetivoG}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={(value) => setObjetivoG(value)}
        />
        <TextInput
          mode="outlined"
          label={"Objetivo Especifico"}
          value={ObjetivoE}
          style={stylesHistorial.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
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
  label: {
    fontSize: 16,
    marginVertical: 10,
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
});
export default CrearExpediente;
