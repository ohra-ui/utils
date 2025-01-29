/**
 * Adjusts the brightness of a color component by a given amount of factor and offset.
 * @param {number} rgbComponent - The value of a rgb component to adjust (0-255).
 * @param {number} factor - The factor to adjust the brightness by (0-1).
 * @param {number} offset - The offset to add to the adjusted brightness (0-255).
 */
export function adjustComponentBrightness(rgbComponent: number, factor: number, offset = 0) {
  return Math.min(255, Math.max(0, Math.round(rgbComponent * factor + offset)))
}
