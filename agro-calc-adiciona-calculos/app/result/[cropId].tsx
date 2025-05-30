import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getResult } from "../../utils/storage";      // <- assume que retorna Promise
import { Colors } from "../../constants/Colors";

type Result = {
  areaM2:    number;
  volume:    number;
  density:   number;
  npkTot:    number;
  yieldKg:   number;
  revenue:   number;
  totalCost: number;
  profit:    number;
  harvest:   string | number | Date;
  lime:      number;
  plants:    number;
  costFert:  number;
  costLime:  number;
  seedCost:  number;
  costPerKg: number;
  marginPct: number;

};

export default function ResultScreen() {
  const { cropId } = useLocalSearchParams<{ cropId: string }>();
  const router = useRouter();
  const [result, setResult] = useState<Result | null>(null);

  /* ---------- carrega resultado uma vez ---------- */
  useEffect(() => {
    if (cropId) {
      getResult<Result>(cropId).then(setResult);
    }
  }, [cropId]);

  /* ---------- nenhuma gravação encontrada ---------- */
  if (!result) {
    return (
      <View style={styles.container}>
        <Text>Nenhum resultado salvo para esta cultura.</Text>
        <TouchableOpacity style={styles.button} onPress={router.back}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* ---------- exibe resumo ---------- */
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Resumo – {cropId}</Text>

      <Row label="Área total"            value={`${result.areaM2.toFixed(2)} m²`} />
      <Row label="Volume"                value={`${result.volume.toFixed(2)} m³`} />
      <Row label="Dose total de insumo"  value={`${result.npkTot.toFixed(1)} kg`} />
      <Row label="Densidade"             value={`${result.density.toFixed(1)} pl/m²`} />
      <Row label="Produtividade"         value={`${result.yieldKg.toFixed(1)} kg`} />
      <Row label="Receita"               value={`R$ ${result.revenue.toFixed(2)}`} />
      <Row label="Custo"                 value={`R$ ${result.totalCost.toFixed(2)}`} />
      <Row label="Lucro"                 value={`R$ ${result.profit.toFixed(2)}`} />
      <Row label="Calcário recomendado"  value={`${result.lime.toFixed(1)} t/ha`} />
      <Row label="Colheita prevista"     value={new Date(result.harvest).toLocaleDateString()} />
      <Row label="Plantas totais" value={`${result.plants.toFixed(0)} un`} />
      <Row label="Custo fertilizante" value={`R$ ${result.costFert.toFixed(2)}`} />
      <Row label="Custo calcário" value={`R$ ${result.costLime.toFixed(2)}`} />
      <Row label="Custo semente/muda" value={`R$ ${result.seedCost.toFixed(2)}`} />
      <Row label="Custo por kg" value={`R$ ${result.costPerKg.toFixed(2)}`} />
      <Row label="Margem bruta" value={`${result.marginPct.toFixed(1)} %`} />


      <TouchableOpacity style={styles.button} onPress={router.back}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ---------- linha simples ---------- */
function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

/* ---------- estilos ---------- */
const styles = StyleSheet.create({
  container: { padding: 24, flexGrow: 1 },
  title:     { fontSize: 22, fontWeight: "bold", color: Colors.primary, marginBottom: 16 },
  row:       { flexDirection: "row", justifyContent: "space-between", marginVertical: 6 },
  rowLabel:  { color: Colors.primary },
  rowValue:  { fontWeight: "bold" },
  button:    { marginTop: 32, backgroundColor: Colors.primary, padding: 16, borderRadius: 8 },
  buttonText:{ color: "#fff", textAlign: "center", fontWeight: "bold" },
});
