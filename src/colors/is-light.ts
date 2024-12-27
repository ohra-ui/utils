import { calculateLuminance } from './calculate-luminance'

/**
 * Checks if an RGB color is a light color.
 * @param {Object} rgb - The input color in RGB object format.
 * @param {number} rgb.r - The red component (0-255).
 * @param {number} rgb.g - The green component (0-255).
 * @param {number} rgb.b - The blue component (0-255).
 * @returns {boolean} True if the color is light, false if dark.
 */
export function isLight(rgb: { r: number; g: number; b: number }): boolean {
  const { r, g, b } = rgb
  return calculateLuminance({ r, g, b }) > 0.5
}
