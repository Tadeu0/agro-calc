import { FlatList, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { crops } from "../../constants/crops";
import { Colors } from "../../constants/Colors";

export default function HomeTab() {
  return (
    <View style={styles.container}>
      <FlatList
        data={crops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={{ pathname: "/form/[cropId]", params: { cropId: item.id } }} asChild>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardText}>{item.name}</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
      <Link href="/terms" style={styles.terms}>Termos de Uso</Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: Colors.background },
  card: { backgroundColor: "#fff", padding: 16, marginVertical: 8, borderRadius: 8, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 3 },
  cardText: { fontSize: 18, color: Colors.primary },
  terms: { marginTop: 24, textAlign: "center", color: Colors.primary },
});