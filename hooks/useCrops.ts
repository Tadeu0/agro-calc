import { crops, Crop } from "../constants/crops";

export const useCrop = (id: string | undefined): Crop | undefined =>
  crops.find((c) => c.id === id);
