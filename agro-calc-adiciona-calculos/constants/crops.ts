export interface Spacing { row: number; plant: number }
export interface NPK { N: number; P: number; K: number }
export interface Crop {
  id: string;
  name: string;
  spacing: Spacing;
  npk: NPK;
  yieldKgPerPlant: number;
  videoId: string;
  cycleDays?: number;
}
export const crops: Crop[] = [
  { id: "milho", name: "Milho", spacing: { row: 0.7, plant: 0.25 }, npk: { N: 100, P: 60, K: 40 }, yieldKgPerPlant: 0.2, videoId: "dQw4w9WgXcQ" },
  { id: "feijao", name: "Feijão", spacing: { row: 0.5, plant: 0.15 }, npk: { N: 20, P: 70, K: 40 }, yieldKgPerPlant: 0.015, videoId: "dQw4w9WgXcQ" },
  { id: "melancia", name: "Melancia", spacing: { row: 2.0, plant: 1.0 }, npk: { N: 80, P: 60, K: 90 }, yieldKgPerPlant: 3, videoId: "dQw4w9WgXcQ" },
  { id: "cheiroverde", name: "Cheiro‑verde", spacing: { row: 0.3, plant: 0.1 }, npk: { N: 50, P: 40, K: 30 }, yieldKgPerPlant: 0.05, videoId: "dQw4w9WgXcQ" },
  { id: "abobora", name: "Abóbora", spacing: { row: 2.5, plant: 1.5 }, npk: { N: 60, P: 40, K: 70 }, yieldKgPerPlant: 4, videoId: "dQw4w9WgXcQ" },
  { id: "macaxeira", name: "Macaxeira", spacing: { row: 1.0, plant: 0.8 }, npk: { N: 50, P: 60, K: 80 }, yieldKgPerPlant: 2.5, videoId: "dQw4w9WgXcQ" },
  { id: "tomate", name: "Tomate", spacing: { row: 1.0, plant: 0.5 }, npk: { N: 150, P: 90, K: 200 }, yieldKgPerPlant: 4, videoId: "dQw4w9WgXcQ" },
  { id: "batatadoce", name: "Batata‑doce", spacing: { row: 0.9, plant: 0.3 }, npk: { N: 50, P: 60, K: 100 }, yieldKgPerPlant: 1.2, videoId: "dQw4w9WgXcQ" },
];