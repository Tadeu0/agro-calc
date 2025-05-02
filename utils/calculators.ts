/* 
  ----------------------------------------------------------
  Todas as rotinas de cálculo usadas pelo wizard de 3 telas
  (área, solo simplificado, cultura & meta)
   ---------------------------------------------------------- */
/* ---------- Tipos básicos ---------- */
export type Spacing = {
  betweenRows: number;     // m
  betweenPlants: number;   // m
};

/* ---------- Área, volume e densidade ---------- */
export const calcArea = (length: number, width: number) => length * width;            // m²

export const calcVolume = (areaM2: number, depthM: number) => areaM2 * depthM;        // m³

/** Permite passar objeto {betweenRows, betweenPlants} ou diretamente m²/planta */
export function calcDensity(s: Spacing): number;
export function calcDensity(m2PerPlant: number): number;
export function calcDensity(arg: Spacing | number): number {
  if (typeof arg === "number") return 1 / arg;                        // plantas por m²
  return 1 / (arg.betweenRows * arg.betweenPlants);
}

/* ---------- Insumos, produtividade e finanças ---------- */
export const calcDosageTotal = (areaM2: number, doseKgHa: number) =>
  (areaM2 / 10_000) * doseKgHa;                                       // kg de insumo

export const calcYield = (areaM2: number, density: number, kgPerPlant: number) =>
  areaM2 * density * kgPerPlant;                                      // kg produzidos

export const calcRevenue = (yieldKg: number, priceKg: number) => yieldKg * priceKg;

export const calcCost = (areaM2: number, costHa: number) => (areaM2 / 10_000) * costHa;

export const calcProfit = (revenue: number, cost: number) => revenue - cost;

/* ---------- Calendário ---------- */
export const forecastHarvest = (plantDate: Date, cycleDays: number) =>
  new Date(plantDate.getTime() + cycleDays * 86_400_000);             // ms/dia

/* ---------- Calagem simplificada (solo visual) ---------- */
export function calcCalagemSimplificada({
  texture, soilColor, lastLiming
}: {
  texture: "sand" | "loam" | "clay";
  soilColor: "light" | "red" | "dark";
  lastLiming: "never" | "gt3" | "btw1_3" | "lt1";
}) {
  // dose base por textura (t/ha)
  const base = texture === "clay" ? 2.5 : texture === "loam" ? 2.0 : 1.5;

  // ajuste pela cor (proxy de matéria-orgânica/pH)
  const colorAdj =
    soilColor === "dark" ? 0.8 :     // solo escuro já tende a pH + alto
    soilColor === "red"  ? 1.0 :     // solo vermelho = referência
                                    1.1;  // solo muito claro = mais ácido

  // ajuste pela última aplicação de calcário
  const limingAdj =
    lastLiming === "never"  ? 1.2 :
    lastLiming === "gt3"    ? 1.0 :
    lastLiming === "btw1_3" ? 0.8 :
                              0.6;   // < 1 ano

  return +(base * colorAdj * limingAdj).toFixed(1);  // resultado final t/ha
}

export const costPerKg = (totalCost: number, yieldKg: number) =>
  totalCost / (yieldKg || 1);

export const marginPct = (profit: number, revenue: number) =>
  (profit / (revenue || 1)) * 100;
