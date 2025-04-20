export type Spacing = {
  betweenRows: number;     // metro
  betweenPlants: number;   // metro
};


export const calcArea = (length: number, width: number) => length * width; // m²
export const calcVolume = (area: number, depth: number) => area * depth;   // m³
export const calcDosageTotal = (areaM2: number, doseKgHa: number) =>
  (areaM2 / 10_000) * doseKgHa; // total kg
export const calcDensity = (s: Spacing) =>
  1 / (s.betweenRows * s.betweenPlants); // plantas por m²
export const calcYield = (area: number, density: number, kgPerPlant: number) =>
  area * density * kgPerPlant; // kg
export const calcRevenue = (yieldKg: number, priceKg: number) => yieldKg * priceKg;
export const calcCost = (areaM2: number, costHa: number) => (areaM2 / 10_000) * costHa;
export const calcProfit = (revenue: number, cost: number) => revenue - cost;
export const forecastHarvest = (plantDate: Date, cycleDays: number) =>
  new Date(plantDate.getTime() + cycleDays * 86_400_000); // ms em um dia
