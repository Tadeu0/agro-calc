import React, { useContext } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { WizardContext } from "./_layout";
import { Colors } from "../../../constants/Colors";


export default function AreaStep() {
  const { cropId } = useLocalSearchParams<{ cropId: string }>();
  const { area, setArea } = useContext(WizardContext);

  const router = useRouter();

  // helpers explícitos ─ cada campo tem seu handler
  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>1/3 – Dados da área ({cropId})</Text>

      {/* ------------ campos simples ------------ */}
      <Text style={styles.label}>Comprimento (m)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={area.length ?? ""}
        onChangeText={v => setArea({ length: v })}
      />
      
      <Text style={styles.label}>Largura (m)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={area.width ?? ""}
        onChangeText={v => setArea({ width: v })}
      />

      <Text style={styles.label}>Profundidade (m)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={area.depth ?? ""}
        onChangeText={v => setArea({ depth: v })}
      />

      <Text style={styles.label}>Dose insumo (kg/ha)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={area.doseKgHa ?? ""}
        onChangeText={v => setArea({ doseKgHa: v })}
      />

      <Text style={styles.label}>Custo total (R$/ha)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={area.costHa ?? ""}
        onChangeText={v => setArea({ costHa: v })}
      />

      <Text style={styles.label}>Preço de venda (R$/kg)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={area.priceKg ?? ""}
        onChangeText={v => setArea({ priceKg: v })}
      />

      <Text style={styles.label}>Preço do fertilizante (R$/kg)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={area.priceFert ?? ""}
        onChangeText={v => setArea({ priceFert: v })}
      />


      {/* ------------ navegação ------------ */}
      <TouchableOpacity style={styles.button} onPress={() => router.push("./SoilStep")}>
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ------------ estilos ------------ */
const styles = StyleSheet.create({
  container: { padding: 24, flexGrow: 1 },
  title: { fontSize: 20, fontWeight: "bold", color: Colors.primary },
  label: { marginTop: 16, color: Colors.primary },
  input: { borderWidth: 1, borderColor: Colors.primary, borderRadius: 8, padding: 8, marginTop: 4 },
  button: { backgroundColor: Colors.primary, padding: 16, borderRadius: 8, marginTop: 32 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
