import * as React from 'react';
import { Button, Dialog, Portal } from 'react-native-paper';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
  } from "react-native";

  const [visible, setVisible] = React.useState(true);

  const changeState = () => setVisible(!visible);

const alertDialog = (title: string, content: string) => {

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={change}>
              <Dialog.Icon icon="alert" size={50} />
              <Dialog.Title style={styles.dialogTitle}>{title}</Dialog.Title>
              <Dialog.Content>
                <Text style={{alignSelf: "center"}}>{content}</Text>
                <TouchableOpacity onPress={change} style={{alignSelf: "center", paddingTop: 30}} >
                  <Text style={{fontSize: 20}}>Aceptar</Text>
                </TouchableOpacity>
              </Dialog.Content>
            </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialogTitle: {
    textAlign: 'center',
  },
});


export default alertDialog;