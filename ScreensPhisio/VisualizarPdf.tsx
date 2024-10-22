import React, { Component } from 'react';
import { View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

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
        backgroundColor: 'red',
        borderRadius: 50,
        width: 50,
        height: 50,
    },
  });

export default VisualizarPdf;