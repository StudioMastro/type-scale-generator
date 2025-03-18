export type TextTransform =
  | "none"
  | "uppercase"
  | "lowercase"
  | "capitalize"
  | "inherit";
export type FontStyle = "normal" | "italic" | "inherit";
export type TextDecoration =
  | "none"
  | "underline"
  | "line-through"
  | "overline"
  | "inherit";
export type TextAlign = "left" | "center" | "right" | "justify" | "inherit";
export type FontSmoothing =
  | "auto"
  | "none"
  | "antialiased"
  | "subpixel-antialiased"
  | "inherit";

export interface FontSettings {
  family: string;
  weight: string;
  lineHeight: string;
  letterSpacing: string;
  color: string;
  backgroundColor: string;
  textTransform?: TextTransform;
  fontStyle?: FontStyle;
  textDecoration?: TextDecoration;
  textAlign?: TextAlign;

  // Proprietà specifiche per iOS
  fontSmoothing?: FontSmoothing;
  textSizeAdjust?: string;

  // Proprietà specifiche per Android
  fontFeatureSettings?: string;
}

export interface GoogleFont {
  family: string;
  variants: string[];
  category: string;
  files?: Record<string, string>;
  lastModified?: string;
  version?: string;
}

export interface GoogleFontsResponse {
  kind: string;
  items: GoogleFont[];
}
