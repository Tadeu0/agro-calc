import React from "react";
import { useLocalSearchParams, router } from "expo-router";
import {
  ScrollView, View, Text, TextInput,
  TouchableOpacity, StyleSheet, Platform
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useCrop } from "../../hooks/useCrops";
import * as C from "../../utils/calculators";
import { saveResult } from "../../utils/storage";
import { scheduleAdubacaoReminder } from "../../utils/reminders";
import { Colors } from "../../constants/Colors";

export default function FormScreen() {
  const { cropId } = useLocalSearchParams<{ cropId: string }>();
  const crop = useCrop(cropId!);

  const [length, setLength] = React.useState("");
  const [width, setWidth] = React.useState("");
  const [depth, setDepth] = React.useState("0.3");           // default 30 cm
  const [doseKgHa, setDoseKgHa] = React.useState("");
  const [costHa, setCostHa] = React.useState("");
  const [priceKg, setPriceKg] = React.useState("");
  const [plantDate, setPlantDate] = React.useState(new Date());
  const [cycleDays, setCycleDays] = React.useState(
    String(crop?.cycleDays ?? 120)
  );
  const [showPicker, setShowPicker] = React.useState(false);

  if (!crop) return null;

  const handleCalc = () => {
    const len = Number(length);
    const wid = Number(width);
    const dep = Number(depth);
    const dose = Number(doseKgHa);
    const cost = Number(costHa);
    const price = Number(priceKg);
    const cycle = Number(cycleDays);

    const area = C.calcArea(len, wid);
    const volume = C.calcVolume(area, dep);
    const density = C.calcDensity({
      betweenRows: crop.spacing?.row ?? 0,
      betweenPlants: crop.spacing?.plant ?? 0,
    });
    const npkTotal = C.calcDosageTotal(area, dose);
    const totalYield = C.calcYield(area, density, crop.yieldKgPerPlant);
    const revenue = C.calcRevenue(totalYield, price);
    const totalCost = C.calcCost(area, cost);
    const profit = C.calcProfit(revenue, totalCost);
    const harvestDate = C.forecastHarvest(plantDate, cycle);

    const result = {
      area, volume, npkTotal, density, totalYield,
      revenue, totalCost, profit, harvestDate
    };

    saveResult(crop.id, result);
    scheduleAdubacaoReminder(crop.name);
    router.push(`/result/${crop.id}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{crop.name} – Formulário</Text>

      {/* --- Dimensões --- */}
      <Field label="Comprimento (m)" value={length} setValue={setLength} />
      <Field label="Largura (m)" value={width} setValue={setWidth} />
      <Field label="Profundidade (m)" value={depth} setValue={setDepth} />

      {/* --- Insumos & custos --- */}
      <Field label="Dose de insumo (kg/ha)" value={doseKgHa} setValue={setDoseKgHa} />
      <Field label="Custo total (R$/ha)" value={costHa} setValue={setCostHa} />

      {/* --- Receita --- */}
      <Field label="Preço de venda (R$/kg)" value={priceKg} setValue={setPriceKg} />

      {/* --- Data e ciclo --- */}
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <Text style={styles.dateLabel}>
          Data de plantio: {plantDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={plantDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, d) => {
            setShowPicker(false);
            d && setPlantDate(d);
          }}
        />
      )}
      <Field label="Ciclo da cultura (dias)" value={cycleDays} setValue={setCycleDays} />

      {/* --- Botões --- */}
      <TouchableOpacity style={styles.button} onPress={handleCalc}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// pequeno componente de input para evitar repetição
function Field({ label, value, setValue }: { label: string; value: string; setValue: (v: string) => void }) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={value}
        onChangeText={setValue}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, flexGrow: 1 },
  title: { fontSize: 22, fontWeight: "bold", color: Colors.primary },
  label: { marginTop: 16, color: Colors.primary },
  input: {
    borderWidth: 1, borderColor: Colors.primary,
    borderRadius: 8, padding: 8, marginTop: 4
  },
  dateLabel: { marginTop: 16, color: Colors.primary, textDecorationLine: "underline" },
  button: {
    backgroundColor: Colors.primary, padding: 16,
    borderRadius: 8, marginTop: 32
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
