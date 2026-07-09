export interface GalleryVisual {
  year: number; // e.g. 2025  (0 = not set yet)
  month: number; // 1–12       (0 = not set yet)
  description: string; // e.g. "Lisbon, Portugal"
  file: string; // filename in src/assets/digital/ or src/assets/analog/
}

export const visuals: GalleryVisual[] = [
  // { year: 2024, month: 9, description: "Mountain ridge", file: "digital-01.jpg" },
];
