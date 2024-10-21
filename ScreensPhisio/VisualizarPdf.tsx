import { View, Text, StyleSheet, SafeAreaView} from "react-native";

const styles = StyleSheet.create({
    webview: {
        flex: 1,
        borderWidth: 5,
        borderColor: "1893f8"
    }
});

export default function VisualizarPdf(){

    return(
        <SafeAreaView>
            <Text>Visualizar PDF</Text>
        </SafeAreaView>
    )
}