import React, {useRef, useState} from "react";
import {
  StyleSheet,
  Animated,
  ImageBackground,
  View,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp } from "@react-navigation/native";
import { ListItem, Icon } from '@rneui/themed';

// Suponiendo que este es tu componente
const AutoEvaluaciones = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}) => {
  const border = useRef(new Animated.Value(1)).current; 
  const [dialogVisible, setDialogVisible] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handlePress = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const list2 = [
    {
      fecha: "12/12/2021",
      angulo: "90°",
      descripcion: "Se ha logrado un avance en la flexión de la rodilla",
    },
    {
      fecha: "13/12/2021",
      angulo: "100°",
      descripcion: "Se ha logrado un avance en la flexión de la rodilla",
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
                source={require("../assets/logo_blanco.png")}
                resizeMode="contain"
                style={styles.image}
                imageStyle={{ opacity: 0.5 }}
              >
                <View style={{ flex: 1 }}>
      {list2.map((l, i) => (
      <Animated.View style={{ width: "90%", margin: 10, padding: 10, borderRadius: 10, opacity: border}}>
      <ListItem.Accordion
  content={
    <>
      <Icon name="align-horizontal-left" size={30} />
      <ListItem.Content>
        <ListItem.Title>{l.fecha}</ListItem.Title>
      </ListItem.Content>
    </>
  }
  isExpanded={expandedIndex === i}
  onPress={() => handlePress(i)}
>
    <ListItem key={i} onPress={() => console.log(l.angulo)} bottomDivider>
      <Icon name="bar-chart" size={30} />
      <ListItem.Content>
        <ListItem.Title>{l.angulo}</ListItem.Title>
        <ListItem.Subtitle>{l.descripcion}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
</ListItem.Accordion>
</Animated.View>
))}
</View>
</ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    // backgroundColor: "#00BCD4",
    backgroundColor: "#002245",
    // Alinea los elementos verticalmente al principio
  },
  text: {
    fontSize: 18,
    color: "black",
    textAlign: "justify",
    margin: 20,
  },
  textAngle: {
    fontSize: 24,
    color: "black",
    textAlign: "center",
    marginTop: 20,
  },
  textWarning: {
    fontSize: 10,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    marginLeft: 5,
  },
  underlineText: {
    textDecorationLine: "underline",
    marginRight: -2,
  },
  textSubtitle: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  dialogTitle: {
    textAlign: "center",
  },
  titleIcon: {
    marginTop: 22,
    marginRight: 20,
  },
  textIcon: {
    marginTop: 22,
    marginRight: 10,
  },
  iconInfo: {
    marginTop: 28,
    marginLeft: 10,
  },
  rowView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});

export default AutoEvaluaciones;
