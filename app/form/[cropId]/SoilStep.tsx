import React, { useContext } from "react";
import { View, TextInput,Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, router } from "expo-router";
import { WizardContext } from "./_layout";
import { Colors } from "../../../constants/Colors";

const pick = <T extends string>(options: { label: string; value: T }[]) => options;

const TEXTURES   = pick([{ label: "Arenoso", value: "sand" }, { label: "Misto", value: "loam" }, { label: "Argiloso", value: "clay" }]);
const SOIL_COLORS = pick([{ label: "Clara", value: "light" }, { label: "Avermelhada", value: "red" }, { label: "Escura", value: "dark" }]);
const YEARS_PAST  = pick([{ label: "Nunca", value: "never" }, { label: "> 3 anos", value: "gt3" }, { label: "1–3 anos", value: "btw1_3" }, { label: "< 1 ano", value: "lt1" }]);

export default function SoilStep() {
  const { cropId } = useLocalSearchParams<{ cropId: string }>();
  const { soil, setSoil } = useContext(WizardContext);

  const PickerField = <T extends string>({ label, name, data }: { label: string; name: keyof typeof soil; data: { label: string; value: T }[] }) => (
    <View style={{ marginTop: 16 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={soil[name] as string} onValueChange={v => setSoil({ [name]: v })}>
          {data.map(opt => <Picker.Item key={opt.value} label={opt.label} value={opt.value} />)}
        </Picker>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>2/3 – Análise de solo ({cropId})</Text>

      <PickerField label="Textura do solo" name="texture" data={TEXTURES} />
      <PickerField label="Cor do solo (seco)" name="soilColor" data={SOIL_COLORS} />
      <PickerField label="Última calagem" name="lastLiming" data={YEARS_PAST} />
      <PickerField label="Última adubação P–K" name="lastPK" data={YEARS_PAST} />

      <Text style={styles.label}>Preço do calcário (R$/t)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={soil.priceLime ?? ""}
        onChangeText={v => setSoil({ priceLime: v })}
      />


      <View style={styles.rowBtn}>
        <TouchableOpacity style={styles.outlined} onPress={router.back}>
          <Text style={styles.outlinedText}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push("./CultureStep")}>
          <Text style={styles.buttonText}>Próximo</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, flexGrow: 1 },
  title: { fontSize: 20, fontWeight: "bold", color: Colors.primary },
  label: { color: Colors.primary },
  pickerWrapper: { borderWidth: 1, borderColor: Colors.primary, borderRadius: 8 },
  button: { backgroundColor: Colors.primary, padding: 16, borderRadius: 8, flex: 0.45 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  rowBtn: { flexDirection: "row", justifyContent: "space-between", marginTop: 32 },
  outlined: { borderWidth: 1, borderColor: Colors.primary, padding: 16, borderRadius: 8, flex: 0.45 },
  outlinedText: { color: Colors.primary, textAlign: "center", fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: Colors.primary, borderRadius: 8, padding: 8, marginTop: 4 },

});
