import { FlatList, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { crops } from "../../constants/crops";
import { getResult } from "../../utils/storage";   // <- troquei loadResult por getResult
import { Colors } from "../../constants/Colors";
import { Link } from "expo-router";

export default function PrincipalTab() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const results = await Promise.all(
        crops.map(c => getResult<any>(c.id))       // <- usa getResult
      );
      const merged = crops
        .map((c, i) => ({ crop: c, result: results[i] }))
        .filter(r => r.result);
      setData(merged);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <Text>Sem cálculos salvos.</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.crop.id}
          renderItem={({ item }) => (
            <Link
              href={{ pathname: "/result/[cropId]", params: { cropId: item.crop.id } }}
              asChild
            >
              <TouchableOpacity style={styles.card}>
                <Text style={styles.cardText}>
                  {item.crop.name}: {item.result.yieldKg?.toFixed(1)} kg estimados
                </Text>
              </TouchableOpacity>
            </Link>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: Colors.background },
  card: { backgroundColor: "#fff", padding: 12, marginVertical: 6, borderRadius: 8 },
  cardText: { color: Colors.primary },
});
