import { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
} from 'react-native';
import {
  CreditCardView,
  CreditCardInput,
  LiteCreditCardInput,
  CreditCardFormData,
  CreditCardFormField,
  ValidationState,
} from 'react-native-credit-card-input';

export default function RegistrarTarjeta() {

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
    <ScrollView contentContainerStyle={s.container}>
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
          placeholders={{ number: 'Número de tarjeta', expiry: 'MM/YY', cvc: 'CVC' }}

        />
      ) : (
        <CreditCardInput
          autoFocus
          style={s.cardInput}
          onChange={setFormData}
          onFocusField={setFocusedField}
          labels={{ number: 'Número de tarjeta', expiry: 'MM/YY', cvc: 'CVC/CCV' }}
          labelStyle={{ color: 'white' }}
          placeholders={{ number: '1234 5678 1234 5678', expiry: 'MM/YY', cvc: 'CVC' }}
        />
      )}

    </ScrollView>
    // </StripeProvider>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    marginHorizontal: 'auto',
    borderRadius: 10,
    marginTop: 60,
    backgroundColor: '#FFFFFF',
  },
  switch: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  cardView: {
    alignSelf: 'center',
    marginTop: 15,
  },
  cardInput: {
    marginTop: 15,
    borderColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  infoContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#dfdfdf',
    borderRadius: 5,
  },
  info: {
    fontFamily: Platform.select({
      ios: 'Courier',
      android: 'monospace',
      web: 'monospace',
    }),
  },
});