import { adjustComponentBrightness } from './adjust-component-brightness'
import { isDark } from './is-dark'

const defaultBrightnessOptions: Record<'dark' | 'light', { factor: number; offset: number }> = {
  dark: {
    factor: 1,
    offset: 190,
  },
  light: {
    factor: 0.3,
    offset: 0,
  },
}

/**
 * Generate a contrast color (light or dark) based on the given RGB color.
 * @param {Object} rgb - The input color in RGB object format.
 * @param {number} rgb.r - The red component (0-255).
 * @param {number} rgb.g - The green component (0-255).
 * @param {number} rgb.b - The blue component (0-255).
 * @returns {Object} The contrasting color in RGB object format.
 */
export function generateContrastColor(
  rgb: { r: number; g: number; b: number },
  byBrightness = false,
  brightnessOptions: Partial<typeof defaultBrightnessOptions> = defaultBrightnessOptions,
) {
  if (!byBrightness) {
    return isDark(rgb)
      ? { r: 255, g: 255, b: 255 } // white for dark backgrounds
      : { r: 0, g: 0, b: 0 } // black for light backgrounds
  }

  const darkBrightnessParameter = brightnessOptions.dark || defaultBrightnessOptions.dark
  const lightBrightnessParameter = brightnessOptions.light || defaultBrightnessOptions.light
  // if by generating contrast color based on brightness, get the contrast color by adjusting its brightness to darker or lighter color
  return isDark(rgb)
    ? {
        r: adjustComponentBrightness(
          rgb.r,
          defaultBrightnessOptions.dark.factor,
          darkBrightnessParameter.offset,
        ),
        g: adjustComponentBrightness(
          rgb.g,
          defaultBrightnessOptions.dark.factor,
          darkBrightnessParameter.offset,
        ),
        b: adjustComponentBrightness(
          rgb.b,
          defaultBrightnessOptions.dark.factor,
          darkBrightnessParameter.offset,
        ),
      }
    : {
        r: adjustComponentBrightness(
          rgb.r,
          lightBrightnessParameter.factor,
          lightBrightnessParameter.offset,
        ),
        g: adjustComponentBrightness(
          rgb.g,
          lightBrightnessParameter.factor,
          lightBrightnessParameter.offset,
        ),
        b: adjustComponentBrightness(
          rgb.b,
          lightBrightnessParameter.factor,
          lightBrightnessParameter.offset,
        ),
      }
}
