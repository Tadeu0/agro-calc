import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

export default function CalcCenter() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Selecione uma cultura na aba Início para realizar cálculos detalhados.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, backgroundColor: Colors.background },
  text: { textAlign: "center", color: Colors.primary, fontSize: 16 },
});