// app/result/[cropId].tsx
import React from "react";
import { useLocalSearchParams, router } from "expo-router";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { getResult } from "../../utils/storage";
import { Colors } from "../../constants/Colors";

export default function ResultScreen() {
  const { cropId } = useLocalSearchParams<{ cropId: string }>();
  const result = getResult(cropId!); // síncrono simplificado

  if (!result) return <Text>Sem resultados salvos.</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Resultado de {cropId}</Text>

      <Row label="Área total" value={`${result.area.toFixed(2)} m²`} />
      <Row label="Volume (solo/água)" value={`${result.volume.toFixed(2)} m³`} />
      <Row label="Dose total de insumo" value={`${result.npkTotal.toFixed(1)} kg`} />
      <Row label="Densidade de plantio" value={`${result.density.toFixed(0)} plantas/m²`} />
      <Row label="Produção estimada" value={`${result.totalYield.toFixed(1)} kg`} />
      <Row label="Receita prevista" value={`R$ ${result.revenue.toFixed(2)}`} />
      <Row label="Custo total" value={`R$ ${result.totalCost.toFixed(2)}`} />
      <Row label="Lucro (Rentabilidade)" value={`R$ ${result.profit.toFixed(2)}`} />
      <Row label="Previsão de colheita" value={new Date(result.harvestDate).toLocaleDateString()} />

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, flexGrow: 1 },
  title: { fontSize: 22, fontWeight: "bold", color: Colors.primary, marginBottom: 16 },
  row: { flexDirection: "row", justifyContent: "space-between", marginVertical: 6 },
  rowLabel: { color: Colors.primary },
  rowValue: { fontWeight: "bold" },
  button: { marginTop: 32, backgroundColor: Colors.primary, padding: 16, borderRadius: 8 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
