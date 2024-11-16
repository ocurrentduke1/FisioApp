import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  StyleSheet,
  Platform,
  Keyboard,
  Dimensions,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { BACKEND_URL, MAPS_API } from "@env";
import stylesLogin from "./styles/stylesLogin";
import { Searchbar, TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from 'expo-location';

const { width, height } = Dimensions.get("window");

export default function RegistrarPersonales({
  route,
  navigation,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [selected, setSelected] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [age, setAge] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [sex, setSex] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [ModalMaps, setModalMaps] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const map = useRef<MapView | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [initialLat, setInitialLat] = useState<number | undefined>(undefined);
  const [initialLng, setInitialLng] = useState<number | undefined>(undefined);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setInitialLat(location.coords.latitude);
      setInitialLng(location.coords.longitude);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  console.log("Latitud: ", initialLat);
  console.log("Longitud: ", initialLng);

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const INITIAL_POSITION = initialLat && initialLng ? {
    latitude: initialLat,
    longitude: initialLng,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  } : undefined;

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }: { type: string }, selectedDate: any) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        togglePicker();
        setAge(
          currentDate.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        );
      }
    } else {
      togglePicker();
    }
  };

  const { registerData } = route.params as { registerData: any };

  const registerDataPhisio = {
    ...registerData,
    nombre: nombre,
    apellido: apellido,
  };
  const registerDataPatient = {
    ...registerData,
    nombre: nombre,
    apellido: apellido,
    domicilio: address,
    edad: age,
    genero: sex,
  };

  const registerUser = async () => {
    const route =
      selected === "fisioterapeuta"
        ? "/registrar-fisioterapeuta"
        : "/registrar-paciente";
    if (selected === "fisioterapeuta") {
      const response = await axios.post(
        BACKEND_URL + route,
        registerDataPhisio,
        {
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );

      navigation.navigate("login", {
        registerDataPhisio: registerDataPhisio,
      });
    } else if (selected === "paciente") {
      const response = await axios.post(
        BACKEND_URL + route,
        registerDataPatient,
        {
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );
      if (response.data.code == 400) {
        console.log(response.data);
        Alert.alert("Correo ya registrado");
        return;
      }
      console.log(response.data);
      Alert.alert("Cuenta creada exitosamente");
      navigation.navigate("login");
    }
  };

  // const registerUser = async () => {
  //   if (selected === "paciente") {
  //     console.log("Registrando paciente");
  //     console.log(registerDataPatient);
  //     navigation.navigate("Login", {
  //       registerDataPatient: registerDataPatient,
  //     });
  //   } else {
  //     console.log("Registrando fisioterapeuta");
  //     console.log(registerDataPhisio);
  //     navigation.navigate("registrarTarjeta", {
  //       registerDataPhisio: registerDataPhisio,
  //     });
  //   }
  // };

  const data = [
    { key: "1", value: "fisioterapeuta" },
    { key: "2", value: "paciente" },
  ];

  const dataSex = [
    { key: "1", value: "Masculino" },
    { key: "2", value: "Femenino" },
    { key: "3", value: "Otro" },
  ];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleRegister = async (val: string) => {
    if (val === "paciente") {
      toggleModal();
    }
  };

  const handlePatientRegister = async () => {
    const registerData = {
      age,
      address,
      sex,
      // Otros datos necesarios
    };
    toggleModal();
  };

  const validateInputs = () => {
    if (!nombre || !apellido || !selected) {
      return false;
    }

    if (selected === "paciente") {
      if (!address || !age || !sex || !nombre || !apellido || !selected) {
        return false;
      }
    }

    return true;
  };

  {
    /* Modal para ubicacion */
  }
  const toggleMaps = () => {
    setModalMaps(!ModalMaps);
  };

  const searchPlaces = async () => {
    if(!searchQuery.trim().length) return;

    const googleApisUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json";
    const input = searchQuery.trim()
    const location = `${initialLat}, ${initialLng} &radius=2000`;
    const url = `${googleApisUrl}?query=${input}&location=${location}&key=${MAPS_API}`;

    try{
      const response = await fetch(url);
      const json = await response.json();
      // console.log(json);
      if(json && json.results){
        const coords: LatLng[] = []
        for(const item of json.results){
          console.log(item);
          coords.push({
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
          })
        }
        setResults(json.results);
        if (coords.length) {
          map.current?.fitToCoordinates(coords, {
            edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
            animated: true,
          });
          Keyboard.dismiss();
        }
      }
    } catch (error) {
      console.error(error);
  };
};

  return (
    <View style={stylesLogin.container}>
      <Text style={{ fontSize: 30, color: "#FFFFFF" }}> Registrar cuenta</Text>
      <Image
        style={[stylesLogin.image, { width: 180, height: 180 }]}
        source={require("./assets/logoFisioApp.png")}
      />

      <View style={[stylesLogin.datos, { height: 350 }]}>
        <TextInput //textbox ingresar correo
          mode="outlined"
          label="Nombre(s)"
          style={stylesLogin.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={setNombre}
        />
        <TextInput //textbox ingresar correo
          mode="outlined"
          label="Apellidos"
          style={stylesLogin.TextInput}
          outlineColor="#c5cae9"
          activeOutlineColor="#c5cae9"
          onChangeText={setApellido}
        />
        <SelectList
          setSelected={(val: string) => {
            setSelected(val);
            handleRegister(val);
          }}
          data={data}
          save="value"
          search = {false}
          dropdownItemStyles={{
            backgroundColor: "#FFFFFF",
            width: 300,
            height: 50,
            borderBottomWidth: 1,
            borderBottomColor: "#000000",
            justifyContent: "center",
            alignItems: "center",
          }}
          dropdownStyles={{
            backgroundColor: "#FFFFFF",
            width: 300,
            height: 110,
          }}
          boxStyles={{
            backgroundColor: "#FFFFFF",
            width: 300,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
          placeholder="Selecciona tu rol en la app"
        />

        <Modal visible={isModalVisible} transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                width: "80%",
                height: "70%",
                padding: 20,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20 }}>Datos de Paciente</Text>

              {showPicker && (
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={date} // Provide a value prop with the current date or a specific date
                  onChange={onChange}
                />
              )}
              <TouchableOpacity
                style={{ paddingTop: 5 }}
                onPress={togglePicker}
              >
                <TextInput
                  mode="outlined"
                  label="Edad"
                  value={age}
                  onChangeText={setAge}
                  outlineColor="#c5cae9"
                  activeOutlineColor="#c5cae9"
                  keyboardType="numeric"
                  style={stylesLogin.TextInput}
                  disabled={true}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleMaps}>
                <TextInput
                  mode="outlined"
                  label="Domicilio"
                  outlineColor="#c5cae9"
                  activeOutlineColor="#c5cae9"
                  value={address}
                  onChangeText={setAddress}
                  style={stylesLogin.TextInput}
                  disabled={true}
                />
              </TouchableOpacity>
              <SelectList
                setSelected={(val: string) => {
                  setSex(val);
                }}
                data={dataSex}
                save="value"
                search = {false}
                dropdownItemStyles={{
                  backgroundColor: "#FFFFFF",
                  width: 300,
                  height: 50,
                  borderBottomWidth: 1,
                  borderBottomColor: "#000000",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                dropdownStyles={{
                  backgroundColor: "#FFFFFF",
                  width: 300,
                  height: 110,
                }}
                boxStyles={{
                  backgroundColor: "#FFFFFF",
                  width: 300,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
                }}
                placeholder="Selecciona tu Genero"
              />
              <TouchableOpacity //boton de registrar cuenta
                style={{
                  width: "100%",
                  padding: 15,
                  backgroundColor: "#00bcd4",
                  borderRadius: 20,
                  alignItems: "center",
                  marginVertical: 10,
                }}
                onPress={handlePatientRegister} // Función que se ejecuta cuando se presiona el botón
              >
                <Text style={{ color: "#FFFFFF", fontSize: 16 }}>
                  Registrar Datos
                </Text>
              </TouchableOpacity>
              <TouchableOpacity //boton de registrar cuenta
                style={{
                  width: "100%",
                  padding: 15,
                  backgroundColor: "#3F51B5",
                  borderRadius: 20,
                  alignItems: "center",
                  marginVertical: 10,
                }}
                onPress={toggleModal} // Función que se ejecuta cuando se presiona el botón
              >
                <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <TouchableOpacity //boton de inicio de sesion
        style={[stylesLogin.button, { paddingHorizontal: 115 }]}
        onPress={() => {
          registerUser();
        }}
        disabled={!validateInputs()}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Siguiente</Text>
      </TouchableOpacity>

      <TouchableOpacity //boton de registrar cuenta
        style={[stylesLogin.Secondarybutton, { paddingHorizontal: 115 }]}
        onPress={() => navigation.navigate("registrar")} // Función que se ejecuta cuando se presiona el botón
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Regresar</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />

      {/* Modal para ubicacion */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalMaps}
        onRequestClose={toggleMaps}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalViewMaps}>
            <MapView ref={map} style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={INITIAL_POSITION}>
              {results.length ? results.map((item, i) => {
                const coord: LatLng = {
                  latitude: item.geometry.location.lat,
                  longitude: item.geometry.location.lng,
                }
                return ( <Marker key={`search-item-${i}`} coordinate={coord} title={item.name} description="" />
                );
              })
            : null}
            </MapView>
            <Searchbar
              placeholder="Buscar Direccion"
              onChangeText={(query) => {
                setSearchQuery(query);
              }}
              onEndEditing={searchPlaces}
              value={searchQuery}
              style={{
                position: "absolute",
                top: 20,
                margin: 10,
                width: 350,
                backgroundColor: "#FFF",
                borderColor: "black",
                borderWidth: 1,
                alignSelf: "center",
                maxWidth: "90%",
              }}
            />
            <TouchableOpacity
              style={[styles.button, styles.btnCloseMaps]}
              onPress={toggleMaps}
            >
              <Text style={styles.textStyle}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.btnSaveMaps]}
              onPress={toggleMaps}
            >
              <Text style={styles.textStyle}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  codeInput: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#3F51B5",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  Cancelbutton: {
    backgroundColor: "#f44336",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  btnCloseMaps: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#f44336",
  },
  btnSaveMaps: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#2196F3",
  },
  modalViewMaps: {
    width: "95%",
    height: "95%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
