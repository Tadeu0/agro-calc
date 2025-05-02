import AsyncStorage from "@react-native-async-storage/async-storage";

const key = (id: string) => `AgroCalc@result:${id}`;

/* salvar */
export async function saveResult(id: string, data: unknown) {
  await AsyncStorage.setItem(key(id), JSON.stringify(data));
}

/* carregar (async) */
export async function getResult<T = any>(id: string): Promise<T | null> {
  const json = await AsyncStorage.getItem(key(id));
  return json ? JSON.parse(json) : null;
}
