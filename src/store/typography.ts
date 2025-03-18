import { create } from "zustand";
import { Platform, Unit } from "../types";
import { PROGRESSIVE_SCALES } from "../types";

const DEFAULT_STATE = {
  platform: "desktop" as Platform,
  baseSize: 16,
  scaleRatio: PROGRESSIVE_SCALES[2].value,
  bodySettings: {
    family: "Inter",
    weight: "400",
    letterSpacing: "0em",
    lineHeight: "1.6",
    color: "#222222",
    backgroundColor: "#FFFFFF",
    textTransform: "none",
    fontStyle: "normal",
    textDecoration: "none",
    textAlign: "left",
    fontSmoothing: "auto",
    textSizeAdjust: "100%",
    fontFeatureSettings: "normal",
  },
  headingSettings: {
    family: "inherit",
    weight: "700",
    letterSpacing: "-0.022em",
    lineHeight: "1.15",
    color: "inherit",
    backgroundColor: "inherit",
    textTransform: "none",
    fontStyle: "normal",
    textDecoration: "none",
    textAlign: "left",
    fontSmoothing: "inherit",
    textSizeAdjust: "inherit",
    fontFeatureSettings: "inherit",
  },
  previewText: "",
  truncateText: true,
  maxLines: 1,
  unit: "PX" as Unit,
};

interface FontSettings {
  family: string;
  weight: string;
  lineHeight: string;
  letterSpacing: string;
  color: string;
  backgroundColor: string;
}

interface TypographyState {
  platform: Platform;
  baseSize: number;
  scaleRatio: number;
  bodySettings: FontSettings;
  headingSettings: FontSettings;
  previewText: string;
  truncateText: boolean;
  maxLines: number;
  unit: Unit;
  setPlatform: (platform: Platform) => void;
  setBaseSize: (size: number) => void;
  setScaleRatio: (ratio: number) => void;
  setBodySettings: (settings: Partial<FontSettings>) => void;
  setHeadingSettings: (settings: Partial<FontSettings>) => void;
  setPreviewText: (text: string) => void;
  setTruncateText: (truncate: boolean) => void;
  setMaxLines: (lines: number) => void;
  setUnit: (unit: Unit) => void;
  resetAll: () => void;
}

export const useTypographyStore = create<TypographyState>((set) => ({
  ...DEFAULT_STATE,

  setPlatform: (platform) => set({ platform }),
  setBaseSize: (baseSize) => set({ baseSize }),
  setScaleRatio: (scaleRatio) => set({ scaleRatio }),
  setBodySettings: (settings) =>
    set((state) => ({
      bodySettings: { ...state.bodySettings, ...settings },
    })),
  setHeadingSettings: (settings) =>
    set((state) => ({
      headingSettings: { ...state.headingSettings, ...settings },
    })),
  setPreviewText: (previewText) => set({ previewText }),
  setTruncateText: (truncateText) =>
    set({ truncateText, maxLines: truncateText ? 1 : undefined }),
  setMaxLines: (maxLines) => set({ maxLines }),
  setUnit: (unit) => set({ unit }),
  resetAll: () => set(DEFAULT_STATE),
}));
