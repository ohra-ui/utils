/**
 * Calculates the relative luminance of an RGB object color.
 * @param {Object} rgb - The input color in RGB object format.
 * @param {number} rgb.r - The red component (0-255).
 * @param {number} rgb.g - The green component (0-255).
 * @param {number} rgb.b - The blue component (0-255).
 * @returns {number} The luminance value (0-1).
 */
export function calculateLuminance(rgb: { r: number; g: number; b: number }): number {
  // Normalize RGB values to a range of 0 to 1
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  // Apply the sRGB transformation
  const transform = (value: number) => {
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  }

  const rTransformed = transform(r)
  const gTransformed = transform(g)
  const bTransformed = transform(b)

  // Calculate luminance using the ITU-R BT.709 standard
  return 0.2126 * rTransformed + 0.7152 * gTransformed + 0.0722 * bTransformed
}
