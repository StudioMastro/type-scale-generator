export interface FontSettings {
  family: string;
  weight: string;
  lineHeight: string;
  letterSpacing: string;
  color: string;
  backgroundColor: string;
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