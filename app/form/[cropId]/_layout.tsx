import { Stack } from "expo-router";
import React, { createContext, useState, ReactNode } from "react";

type AreaData = {
  length: string;
  width: string;
  depth: string;
  doseKgHa: string;
  costHa: string;
  priceKg: string;
  priceFert: string;
};

type SoilData = {
  texture: "sand" | "loam" | "clay";
  soilColor: "light" | "red" | "dark";
  lastLiming: "never" | "gt3" | "btw1_3" | "lt1";
  lastPK: "never" | "gt3" | "btw1_3" | "lt1";
  priceLime: string;
};

type CultureData = {
  targetYield: string;
  rowSpacing: string;
  plantSpacing: string;
  plantDate: Date;
  cycleDays: string;
  seedUnit:string;
};

type WizardContextType = {
  area: AreaData;
  soil: SoilData;
  culture: CultureData;
  setArea: (d: Partial<AreaData>) => void;
  setSoil: (d: Partial<SoilData>) => void;
  setCulture: (d: Partial<CultureData>) => void;
};

export const WizardContext = createContext<WizardContextType>({} as any);

function WizardProvider({ children }: { children: ReactNode }) {
  const [area, setAreaState] = useState<AreaData>({
    length: "", width: "", depth: "0.3", doseKgHa: "", costHa: "", priceKg: "",
    priceFert: ""});
  const [soil, setSoilState] = useState<SoilData>({
    texture: "sand", soilColor: "light", lastLiming: "never", lastPK: "never", priceLime: "",
  });
  const [culture, setCultureState] = useState<CultureData>({
    targetYield: "", rowSpacing: "", plantSpacing: "", plantDate: new Date(), cycleDays: "120",seedUnit: "kg",
  });

  return (
    <WizardContext.Provider
      value={{
        area, soil, culture,
        setArea: d => setAreaState(prev => ({ ...prev, ...d })),
        setSoil: d => setSoilState(prev => ({ ...prev, ...d })),
        setCulture: d => setCultureState(prev => ({ ...prev, ...d })),
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export default function Layout() {
  return (
    <WizardProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </WizardProvider>
  );
}
