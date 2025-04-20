import AsyncStorage from "@react-native-async-storage/async-storage";

const key = (id: string) => `AgroCalc@result:${id}`;


export const loadResult = async <T,>(id: string): Promise<T | null> => {
  const j = await AsyncStorage.getItem(key(id));
  return j ? JSON.parse(j) : null;
};

export const saveResult = async (id: string, data: any) =>
  AsyncStorage.setItem(`result-${id}`, JSON.stringify(data));

export const getResult = (id: string) =>
  // síncrono só para demo; no app real use versão async
  JSON.parse(global.localStorage?.getItem(`result-${id}`) ?? "null");