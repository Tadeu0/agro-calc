import { ScrollView, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

export default function Terms() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Termos de Uso e Política de Privacidade</Text>
      <Text style={styles.text}>
        Este aplicativo funciona totalmente offline, armazenando dados apenas no dispositivo do usuário.
        Nenhuma informação pessoal é coletada ou transmitida. Ao utilizar o AgroCalc você concorda em utilizar os resultados apenas como referência e, sempre que possível, consultar assistência técnica profissional.
      </Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { padding: 24 },
  title: { fontSize: 20, fontWeight: "bold", color: Colors.primary },
  text: { marginTop: 16, lineHeight: 20 },
});
