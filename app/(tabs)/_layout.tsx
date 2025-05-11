import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "#fff",
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Início", tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="Principal"
        options={{ title: "Histórico", tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="Calculos"
        options={{ title: "Cálculos", tabBarIcon: ({ color, size }) => <Ionicons name="calculator" color={color} size={size} /> }}
      />
    </Tabs>
  );
}