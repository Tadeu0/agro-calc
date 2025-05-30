// app/form/[cropId]/CultureStep.tsx  — versão sem chave dinâmica
import React, { useContext, useState } from "react";
import {
  ScrollView, Text, TextInput, TouchableOpacity,
  StyleSheet, Platform, View
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, router } from "expo-router";
import { WizardContext } from "./_layout";
import { useCrop } from "../../../hooks/useCrops";
import * as Calc from "../../../utils/calculators";
import { saveResult } from "../../../utils/storage";
import { scheduleAdubacaoReminder } from "../../../utils/reminders";
import { Colors } from "../../../constants/Colors";

export default function CultureStep() {
  const { cropId } = useLocalSearchParams<{ cropId: string }>();
  const crop = useCrop(cropId!);
  const { area, soil, culture, setCulture } = useContext(WizardContext);
  const [showPicker, setShowPicker] = useState(false);

  if (!crop) return null;

  /* ---------- finalizar ---------- */
  /* ---------- finalizar ---------- */
  const handleFinish = async () => {
    /* ---------- 1. Conversão segura ---------- */
    const len         = parseFloat(area.length)      || 0;
    const wid         = parseFloat(area.width)       || 0;
    const dep         = parseFloat(area.depth)       || 0;
    const dose        = parseFloat(area.doseKgHa)    || 0;   // kg/ha
    const costHa      = parseFloat(area.costHa)      || 0;   // R$/ha (mao-de-obra + máquinas)
    const priceKg     = parseFloat(area.priceKg)     || 0;   // preço venda
    const priceFert   = parseFloat(area.priceFert)   || 0;   // R$/kg fertilizante
    const priceLime   = parseFloat(soil.priceLime)   || 0;   // R$/t calcário
    const seedUnit    = parseFloat(culture.seedUnit) || 0;   // g por 1000 sementes ou R$/muda
  
    const rowSp   = parseFloat(culture.rowSpacing)   || 0;   // m
    const pltSp   = parseFloat(culture.plantSpacing) || 0;   // m
    const cycle   = parseInt(culture.cycleDays)      || 0;
  
    /* ---------- 2. Validação mínima ---------- */
    if (!len || !wid || !rowSp || !pltSp) {
      alert("Preencha comprimento, largura e espaçamentos.");
      return;
    }
  
    try {
      /* ---------- 3. Cálculos principais ---------- */
      const areaM2   = Calc.calcArea(len, wid);
      const volume   = Calc.calcVolume(areaM2, dep);
      const density  = Calc.calcDensity({ betweenRows: rowSp, betweenPlants: pltSp });
      const npkTot   = Calc.calcDosageTotal(areaM2, dose);        // kg fertilizante total
      const yieldKg  = Calc.calcYield(areaM2, density, crop.yieldKgPerPlant);
      const revenue  = Calc.calcRevenue(yieldKg, priceKg);
      const baseCost = Calc.calcCost(areaM2, costHa);             // custo/ha -> custo área
  
      const lime     = Calc.calcCalagemSimplificada(soil);        // t/ha
      const costFert = npkTot * priceFert;                        // R$
      const costLime = lime * (areaM2 / 10_000) * priceLime;      // converte t/ha p/ área
      const plants   = density * areaM2;
      const seedCost = seedUnit ? (seedUnit / 1000) * plants : 0; // se peso 1000 sementes (kg)
  
      const totalCost = baseCost + costFert + costLime + seedCost;
      const profit    = Calc.calcProfit(revenue, totalCost);
      const costPerKg = totalCost / (yieldKg || 1);
      const marginPct = (profit / (revenue || 1)) * 100;
      const harvest   = Calc.forecastHarvest(culture.plantDate, cycle);
  
      /* ---------- 4. Monta resultado ---------- */
      const result = {
        areaM2,
        volume,
        density,
        plants,
        npkTot,
        lime,
        yieldKg,
        revenue,
        baseCost,
        costFert,
        costLime,
        seedCost,
        totalCost,
        costPerKg,
        profit,
        marginPct,
        harvest,
        meta: { ...area, ...soil, ...culture },
      };
  
      /* ---------- 5. Salva e navega ---------- */
      await saveResult(crop.id, result);
      scheduleAdubacaoReminder(crop.name);
      router.replace(`../../result/${crop.id}`);   // ../.. sai de /form/[cropId]/
    } catch (err) {
      console.error(err);
      alert("Erro ao calcular ou salvar. Confira os valores.");
    }
  };
  


  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>3/3 – Cultura & meta ({crop.name})</Text>

      <Text style={styles.label}>Meta de produtividade (kg/ha)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={culture.targetYield ?? ""}
        onChangeText={v => setCulture({ targetYield: v })}
      />

      <Text style={styles.label}>Espaçamento entre linhas (m)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={culture.rowSpacing ?? ""}
        onChangeText={v => setCulture({ rowSpacing: v })}
      />

      <Text style={styles.label}>Espaçamento entre plantas (m)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={culture.plantSpacing ?? ""}
        onChangeText={v => setCulture({ plantSpacing: v })}
      />

      <Text style={styles.label}>Peso de 1 000 sementes (g) ou preço da muda (R$)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={culture.seedUnit ?? ""}
        onChangeText={v => setCulture({ seedUnit: v })}
      />


      {/* ---- Date picker ---- */}
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <Text style={styles.dateLabel}>
          Data de plantio: {culture.plantDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={culture.plantDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, d) => {
            setShowPicker(false);
            d && setCulture({ plantDate: d });
          }}
        />
      )}

      <Text style={styles.label}>Ciclo da cultura (dias)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={culture.cycleDays ?? ""}
        onChangeText={v => setCulture({ cycleDays: v })}
      />

      {/* ---- botões ---- */}
      <View style={styles.rowBtn}>
        <TouchableOpacity style={styles.outlined} onPress={router.back}>
          <Text style={styles.outlinedText}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleFinish}>
          <Text style={styles.buttonText}>Finalizar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  container: { padding: 24, flexGrow: 1 },
  title: { fontSize: 20, fontWeight: "bold", color: Colors.primary },
  label: { marginTop: 16, color: Colors.primary },
  input: { borderWidth: 1, borderColor: Colors.primary, borderRadius: 8, padding: 8, marginTop: 4 },
  dateLabel: { marginTop: 16, color: Colors.primary, textDecorationLine: "underline" },
  button: { backgroundColor: Colors.primary, padding: 16, borderRadius: 8, flex: 0.45 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  rowBtn: { flexDirection: "row", justifyContent: "space-between", marginTop: 32 },
  outlined: { borderWidth: 1, borderColor: Colors.primary, padding: 16, borderRadius: 8, flex: 0.45 },
  outlinedText: { color: Colors.primary, textAlign: "center", fontWeight: "bold" },
});
