import { FlatList, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { crops } from "../../constants/crops";
import { Colors } from "../../constants/Colors";

export default function HomeTab() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={crops}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({ pathname: "/form/[cropId]/AreaStep", params: { cropId: item.id } })
            }
          >
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Termos de uso continua usando Link, pois a rota é estática conhecida */}
      <Text
        style={styles.terms}
        onPress={() => router.push("/terms")}
      >
        Termos de Uso
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: Colors.background },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  cardText: { fontSize: 18, color: Colors.primary },
  terms: { marginTop: 24, textAlign: "center", color: Colors.primary },
});
