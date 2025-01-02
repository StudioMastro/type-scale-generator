import { useMemo } from 'react';
import { Platform, TypeScale } from '../types';
import { DESKTOP_SCALE, IOS_SCALE, ANDROID_SCALE, calculateScale, calculateLineHeight, generateDesktopScale } from '../utils/scales';

export function useTypeScale(platform: Platform, baseSize: number, scaleRatio: number = 1.2): TypeScale[] {
  return useMemo(() => {
    let scalePreset = {
      desktop: { ...DESKTOP_SCALE, ratios: generateDesktopScale(baseSize, scaleRatio) },
      ios: IOS_SCALE,
      android: ANDROID_SCALE,
    }[platform];

    return scalePreset.ratios.map((ratio, index): TypeScale => {
      const size = calculateScale(baseSize, ratio);
      return {
        element: scalePreset.elements[index],
        size,
        lineHeight: calculateLineHeight(size, platform),
        scaleFactor: ratio,
      };
    });
  }, [platform, baseSize, scaleRatio]);
}