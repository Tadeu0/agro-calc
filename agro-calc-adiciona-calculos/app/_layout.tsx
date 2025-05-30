import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Aba principal */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Rotas fora das abas */}
      <Stack.Screen name="form/[cropId]" options={{ title: "Formulário" }} />
      <Stack.Screen name="result/[cropId]" options={{ title: "Resultado" }} />
      <Stack.Screen name="video/[cropId]" options={{ title: "Videoaula" }} />
      <Stack.Screen name="terms" options={{ title: "Termos de Uso" }} />
    </Stack>
  );
}