import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CreditCardView,
  CreditCardInput,
  LiteCreditCardInput,
  CreditCardFormData,
  CreditCardFormField,
  ValidationState,
} from "react-native-credit-card-input";
import stylesLogin from "./styles/stylesLogin";
import { NavigationProp } from "@react-navigation/native";

export default function RegistrarTarjeta({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  // const [publishableKey, setPublishableKey] = useState('');

  // const fetchPublishableKey = async () => {
  //   const key = await fetchKey(); // fetch key from your server here
  //   setPublishableKey(key);
  // };

  // useEffect(() => {
  //   fetchPublishableKey();
  // }, []);

  const [useLiteInput, setUseLiteInput] = useState(false);

  const [focusedField, setFocusedField] = useState<CreditCardFormField>();

  const [formData, setFormData] = useState<CreditCardFormData>();

  return (
    // <StripeProvider
    //   publishableKey={publishableKey}
    //   merchantIdentifier="merchant.identifier" // required for Apple Pay
    //   urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    // >
    <View style={s.container}>
    <ScrollView>
      <Switch
        style={s.switch}
        onValueChange={(v) => {
          setUseLiteInput(v);
          setFormData(undefined);
        }}
        value={useLiteInput}
      />

      <CreditCardView
        focusedField={focusedField}
        type={formData?.values.type}
        number={formData?.values.number}
        expiry={formData?.values.expiry}
        cvc={formData?.values.cvc}
        style={s.cardView}
      />

      {useLiteInput ? (
        <LiteCreditCardInput
          autoFocus
          style={s.cardInput}
          onChange={setFormData}
          onFocusField={setFocusedField}
          placeholders={{
            number: "Número de tarjeta",
            expiry: "MM/YY",
            cvc: "CVC",
          }}
        />
      ) : (
        <CreditCardInput
          autoFocus
          style={s.cardInput}
          onChange={setFormData}
          onFocusField={setFocusedField}
          labels={{
            number: "Número de tarjeta",
            expiry: "MM/YY",
            cvc: "CVC/CCV",
          }}
          labelStyle={{ color: "white" }}
          placeholders={{
            number: "1234 5678 1234 5678",
            expiry: "MM/YY",
            cvc: "CVC",
          }}
        />
      )}

    </ScrollView>

    <TouchableOpacity //boton de inicio de sesion
        style={[stylesLogin.button, { paddingHorizontal: 115,  }]}
        onPress={() => {
          navigation.navigate("login");
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Siguiente</Text>
      </TouchableOpacity>

      <TouchableOpacity //boton de registrar cuenta
        style={[stylesLogin.Secondarybutton, { paddingHorizontal: 115 }]}
        onPress={() => navigation.navigate("registrarPersonales")} // Función que se ejecuta cuando se presiona el botón
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Regresar</Text>
      </TouchableOpacity>
    </View>
    // </StripeProvider>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#002245",
  },
  switch: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  cardView: {
    alignSelf: "center",
    marginTop: 15,
  },
  cardInput: {
    marginTop: 15,
    borderColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  infoContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: "#dfdfdf",
    borderRadius: 5,
  },
  info: {
    fontFamily: Platform.select({
      ios: "Courier",
      android: "monospace",
      web: "monospace",
    }),
  },
});
