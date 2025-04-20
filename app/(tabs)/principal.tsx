import { FlatList, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { crops } from "../../constants/crops";
import { loadResult } from "../../utils/storage";
import { Colors } from "../../constants/Colors";
import { Link } from "expo-router";


export default function PrincipalTab() {
  const [data, setData] = React.useState<any[]>([]);
  React.useEffect(() => {
    Promise.all(crops.map((c) => loadResult<any>(c.id))).then((arr) => {
      const merged = crops.map((c, i) => ({ crop: c, result: arr[i] })).filter((r) => r.result);
      setData(merged);
    });
  }, []);
  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <Text>Sem cálculos salvos.</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.crop.id}
          renderItem={({ item }) => (
            <Link href={{ pathname: "/result/[cropId]", params: { cropId: item.crop.id } }} asChild>
              <TouchableOpacity style={styles.card}>
                <Text style={styles.cardText}>{item.crop.name}: {item.result.totalYield} kg estimados</Text>
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