import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  Dimensions,
  Keyboard,
  Modal,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import stylesHistorial from "../styles/stylesHistorial";
import { BACKEND_URL, MAPS_API } from "@env";
import axios from "axios";
import { RadioButton, Searchbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from 'expo-location';

const { width, height } = Dimensions.get("window");

// Suponiendo que este es tu componente
const RegistrarNuevoPaciente = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const [userID, setUserID] = useState<string | null>(null);
  // Estado que almacena los datos de los pacientes
  const [nombre, setNombre] = useState<string>("");
  const [apellidos, setApellidos] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [sexo, setSexo] = useState<string>("");
  const [edad, setEdad] = useState<string>("");
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [initialLat, setInitialLat] = useState<number | undefined>(undefined);
  const [initialLng, setInitialLng] = useState<number | undefined>(undefined);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const map = useRef<MapView | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [ModalMaps, setModalMaps] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const DataPatient = {
    nombre: nombre,
    apellido: apellidos,
    telefono: telefono,
    domicilio: address,
    sexo: sexo,
    edad: Number(edad),
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }: { type: string }, selectedDate: any) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

        togglePicker();
        setEdad(
          currentDate.toISOString()
        );

    } else {
      togglePicker();
    }
  };

  const isFormValid = () => {
    return (
      nombre !== "" &&
      apellidos !== "" &&
      telefono !== "" &&
      address !== "" &&
      edad !== "" &&
      sexo !== ""
    );
  };

  const RegisterPatient = async () => {
    try {
      const response = await axios.post(BACKEND_URL + "/vincular-paciente", {
        ...DataPatient,
        idFisio: Number(userID),
      });

      if (response.data.code == 500) {
        Alert.alert("Error en el servidor, intentelo mas tarde");
        return;
      }
      navigation.navigate("mainFisio");
      console.log(response.data.code);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getUserID = async () => {
      const id = await AsyncStorage.getItem("idSesion");
      setUserID(id);
    };

    getUserID();
  }, []);

  {
    /* Modal para ubicacion */
  }
  const toggleMaps = () => {
    setModalMaps(!ModalMaps);
  };

  const saveLocation = async () => {
    setAddress(selectedLocation ?? "");
    setSearchQuery("");
    console.log("domicilio: ", selectedLocation);
    toggleMaps();
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
    <SafeAreaView style={stylesHistorial.container}>
      <View
        style={[
          stylesHistorial.containerRegistro,
          { flex: 1, alignItems: "center", justifyContent: "center" },
        ]}
      >
        <ScrollView style={stylesHistorial.scrollViewRegistro}>
          <TextInput
            mode="outlined"
            label="Nombre(s)"
            value={nombre}
            style={stylesHistorial.TextInput}
            outlineColor="#c5cae9"
            activeOutlineColor="#c5cae9"
            onChangeText={(value) => setNombre(value)}
          />
          <TextInput
            mode="outlined"
            label="Apellidos"
            value={apellidos}
            style={stylesHistorial.TextInput}
            outlineColor="#c5cae9"
            activeOutlineColor="#c5cae9"
            onChangeText={(value) => setApellidos(value)}
          />
          <TextInput
            mode="outlined"
            label="Telefono"
            value={telefono}
            style={stylesHistorial.TextInput}
            outlineColor="#c5cae9"
            activeOutlineColor="#c5cae9"
            keyboardType="numeric"
            maxLength={10}
            onChangeText={(value) => setTelefono(value)}
          />
          <TouchableOpacity onPress={toggleMaps}>
          <TextInput
            mode="outlined"
            label="Domicilio"
            value={address}
            style={stylesHistorial.TextInput}
            outlineColor="#c5cae9"
            activeOutlineColor="#c5cae9"
            onChangeText={(value) => setAddress(value)}
            readOnly={true}
          />
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date} // Provide a value prop with the current date or a specific date
              onChange={onChange}
            />
          )}
          <TouchableOpacity style={{ paddingTop: 5 }} onPress={togglePicker}>
            <TextInput
              mode="outlined"
              label="Fecha de Nacimiento"
              value={edad}
              style={stylesHistorial.TextInput}
              outlineColor="#c5cae9"
              activeOutlineColor="#c5cae9"
              keyboardType="numeric"
              onChangeText={(value) => setEdad(value)}
              readOnly={true}
            />
          </TouchableOpacity>
          <View>
            <Text style={[styles.label, { color: "black" }]}>Sexo</Text>
            <RadioButton.Group
              onValueChange={(newValue) => setSexo(newValue)}
              value={sexo}
            >
              <View style={styles.radioButtonContainer}>
                <RadioButton value="Masculino" uncheckedColor="#BDBDBD" />
                <Text style={{ color: "black" }}>Masculino</Text>
              </View>
              <View style={styles.radioButtonContainer}>
                <RadioButton value="Femenino" uncheckedColor="#BDBDBD" />
                <Text style={{ color: "black" }}>Femenino</Text>
              </View>
            </RadioButton.Group>
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity
        style={stylesHistorial.button}
        onPress={RegisterPatient}
        disabled={!isFormValid()}
      >
        <Text style={stylesHistorial.buttonText}>Guardar Registro</Text>
      </TouchableOpacity>

      {/* Modal para ubicacion */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalMaps}
        onRequestClose={toggleMaps}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalViewMaps}>
          <MapView
              ref={map}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={INITIAL_POSITION}
            >
              {results.length
                ? results.map((item, i) => {
                    const coord: LatLng = {
                      latitude: item.geometry.location.lat,
                      longitude: item.geometry.location.lng,
                    };
                    return (
                      <Marker
                        key={`search-item-${i}`}
                        coordinate={coord}
                        title={item.name}
                        description=""
                        onSelect={() =>
                          setSelectedLocation(item.formatted_address)
                        }
                      />
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
              onPress={saveLocation}
            >
              <Text style={styles.textStyle}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  map: {
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "#3F51B5",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
});

export default RegistrarNuevoPaciente;
