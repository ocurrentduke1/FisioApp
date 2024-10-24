import React, { Component } from 'react';
import { View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from "react-native-vector-icons/MaterialIcons";

class VisualizarPdf extends Component {
  render() {

    const pdfUrl = 'https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf';
    const googleDocsUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`;

    return (
        <View style={{ flex: 1 }}>
          <WebView
            source={{ uri: googleDocsUrl }}
            style={{ flex: 1 }}
          />
          <TouchableOpacity
            onPress={() => console.log('Download')}
            style={styles.button}
            >
              <Icon name='download' size={40} color={"000"}/>
            </TouchableOpacity>
        </View>
      );
  }
}

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

export default VisualizarPdf;