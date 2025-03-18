import React from "react";
import { TypeScale, Unit } from "../types";
import { FontSettings } from "../types/font";
import { useTypographyStore } from "../store/typography";

const FALLBACK_TEXT = "The quick brown fox jumps over the lazy dog";

interface TypeScaleDisplayProps {
  scales: TypeScale[];
  bodySettings: FontSettings;
  headingSettings: FontSettings;
  previewText: string;
  truncateText: boolean;
  maxLines: number;
  unit: Unit;
}

function formatSize(size: number, unit: Unit): string {
  switch (unit) {
    case "REM":
      return `${(size / 16).toFixed(3)}rem`;
    case "PT":
      return `${Math.round(size * 0.75)}pt`;
    case "PX":
    default:
      return `${size}px`;
  }
}

export function TypeScaleDisplay({
  scales,
  bodySettings,
  headingSettings,
  previewText,
  truncateText,
  maxLines,
  unit,
}: TypeScaleDisplayProps) {
  const displayText = previewText.trim() || FALLBACK_TEXT;
  const platform = useTypographyStore((state) => state.platform);

  return (
    <div className="w-full grid gap-4">
      {scales.map((scale) => {
        const settings =
          scale.type === "heading" ? headingSettings : bodySettings;
        const fontFamily =
          settings.family === "inherit" ? bodySettings.family : settings.family;
        const color =
          settings.color === "inherit" ? bodySettings.color : settings.color;
        const backgroundColor =
          settings.backgroundColor === "inherit"
            ? bodySettings.backgroundColor
            : settings.backgroundColor;

        const textTransform =
          settings.textTransform === "inherit"
            ? bodySettings.textTransform
            : settings.textTransform;
        const fontStyle =
          settings.fontStyle === "inherit"
            ? bodySettings.fontStyle
            : settings.fontStyle;
        const textDecoration =
          settings.textDecoration === "inherit"
            ? bodySettings.textDecoration
            : settings.textDecoration;
        const textAlign =
          settings.textAlign === "inherit"
            ? bodySettings.textAlign
            : settings.textAlign;

        const style: React.CSSProperties = {
          fontFamily,
          fontSize: formatSize(scale.size, unit),
          fontWeight: settings.weight,
          lineHeight: settings.lineHeight,
          letterSpacing: settings.letterSpacing,
          color,
          backgroundColor,
          textTransform: textTransform || "none",
          fontStyle: fontStyle || "normal",
          textDecoration: textDecoration || "none",
          textAlign: textAlign || "left",
          ...(truncateText && {
            display: "-webkit-box",
            WebkitLineClamp: maxLines,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }),
        };

        if (platform === "ios") {
          const fontSmoothing =
            settings.fontSmoothing === "inherit"
              ? bodySettings.fontSmoothing
              : settings.fontSmoothing;
          const textSizeAdjust =
            settings.textSizeAdjust === "inherit"
              ? bodySettings.textSizeAdjust
              : settings.textSizeAdjust;

          Object.assign(style, {
            WebkitFontSmoothing: fontSmoothing || "auto",
            WebkitTextSizeAdjust: textSizeAdjust || "100%",
          });
        }

        if (platform === "android") {
          const fontFeatureSettings =
            settings.fontFeatureSettings === "inherit"
              ? bodySettings.fontFeatureSettings
              : settings.fontFeatureSettings;

          Object.assign(style, {
            fontFeatureSettings: fontFeatureSettings || "normal",
          });
        }

        return (
          <div
            key={scale.element}
            className="border border-gray-200 rounded-md p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium text-gray-500">
                {scale.element}
              </div>
              <div className="text-xs text-gray-400">
                {formatSize(scale.size, unit)}
              </div>
            </div>
            <div style={style}>{displayText}</div>
          </div>
        );
      })}
    </div>
  );
}
