import { Platform, TypeScale } from '../types';
import { IOS_SCALE, ANDROID_SCALE } from '../utils/scales';

export function useTypeScale(
  platform: Platform,
  baseSize: number,
  scaleRatio: number
): TypeScale[] {
  if (platform === 'desktop') {
    // Desktop scale with headings and paragraphs
    return [
      // Headings
      { element: 'h1', type: 'heading', size: Math.round(baseSize * Math.pow(scaleRatio, 5)), lineHeight: Math.round(baseSize * Math.pow(scaleRatio, 5) * 1.15) },
      { element: 'h2', type: 'heading', size: Math.round(baseSize * Math.pow(scaleRatio, 4)), lineHeight: Math.round(baseSize * Math.pow(scaleRatio, 4) * 1.15) },
      { element: 'h3', type: 'heading', size: Math.round(baseSize * Math.pow(scaleRatio, 3)), lineHeight: Math.round(baseSize * Math.pow(scaleRatio, 3) * 1.15) },
      { element: 'h4', type: 'heading', size: Math.round(baseSize * Math.pow(scaleRatio, 2)), lineHeight: Math.round(baseSize * Math.pow(scaleRatio, 2) * 1.15) },
      { element: 'h5', type: 'heading', size: Math.round(baseSize * Math.pow(scaleRatio, 1)), lineHeight: Math.round(baseSize * Math.pow(scaleRatio, 1) * 1.15) },
      { element: 'h6', type: 'heading', size: Math.round(baseSize * Math.pow(scaleRatio, 0)), lineHeight: Math.round(baseSize * Math.pow(scaleRatio, 0) * 1.15) },
      // Paragraphs
      { element: 'p', type: 'body', size: baseSize, lineHeight: Math.round(baseSize * 1.6) },
      { element: 'small', type: 'body', size: Math.round(baseSize / scaleRatio), lineHeight: Math.round((baseSize / scaleRatio) * 1.6) },
      { element: 'caption', type: 'body', size: Math.round(baseSize / (scaleRatio * scaleRatio)), lineHeight: Math.round((baseSize / (scaleRatio * scaleRatio)) * 1.6) }
    ];
  } else if (platform === 'ios') {
    // iOS scale based on Apple Human Interface Guidelines
    return IOS_SCALE.elements.map((element, index) => ({
      element,
      type: index <= 3 ? 'heading' : 'body',
      size: Math.round(baseSize * IOS_SCALE.ratios[index]),
      lineHeight: Math.round(baseSize * IOS_SCALE.ratios[index] * 1.3)
    }));
  } else {
    // Android scale based on Material Design 3
    return ANDROID_SCALE.elements.map((element, index) => ({
      element,
      type: index <= 5 ? 'heading' : 'body',
      size: Math.round(baseSize * ANDROID_SCALE.ratios[index]),
      lineHeight: Math.round(baseSize * ANDROID_SCALE.ratios[index] * 1.5)
    }));
  }
}