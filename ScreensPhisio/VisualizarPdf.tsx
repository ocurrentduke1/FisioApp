import React, { Component } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from "react-native-vector-icons/MaterialIcons";
import { RouteProp } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";

type RouteParams = {
  params: {
    url: string
  };
};

const VisualizarPdf = ({
  route,
  navigation,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<RouteParams, "params">;
}) => {

  const expediente = route.params;

  console.log(expediente.url);

  // const url = 'https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf';
  

  const googleDocsUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(expediente.url)}`;

  const downloadFile = async  () => {
    Linking.openURL(expediente.url);
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: googleDocsUrl }}
        style={{ flex: 1 }}
      />
      <TouchableOpacity
        onPress={downloadFile}
        style={styles.button}
      >
        <Icon name='download' size={40} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default VisualizarPdf;

const styles = StyleSheet.create({
    button: {
      position: 'absolute',
      bottom: 20,
      right: 20,
        backgroundColor: '#FFF',
        borderRadius: 50,
        width: 50,
        height: 50,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
  });