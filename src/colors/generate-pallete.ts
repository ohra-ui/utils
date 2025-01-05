import tinycolor from 'tinycolor2'

/**
 * Generate a color palette based on the given RGB object color.
 * @param {Object} rgb - The input color in RGB object format.
 * @param {number} rgb.r - The red component (0-255).
 * @param {number} rgb.g - The green component (0-255).
 * @param {number} rgb.b - The blue component (0-255).
 * @returns {Object} The color palette in RGB object format.
 */
export function generatePallete(rgb: { r: number; g: number; b: number }) {
  const baseColor = tinycolor(rgb)
  const steps = [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '950',
  ] as const
  const lightnessPercentages = [90, 72, 54, 36, 18, 0, -15, -30, -45, -60, -75]
  const palette = {} as Record<(typeof steps)[number], { r: number; g: number; b: number }>

  steps.forEach((step, index) => {
    let adjustedColor: tinycolor.Instance
    if (step === '500') {
      adjustedColor = baseColor
    } else if (Number(step) < 500) {
      adjustedColor = tinycolor.mix(baseColor, '#ffffff', lightnessPercentages[index])
    } else {
      adjustedColor = tinycolor.mix(baseColor, '#000000', -lightnessPercentages[index])
    }

    const rgbColor = adjustedColor.toRgb()
    palette[step] = {
      r: Math.round(rgbColor.r),
      g: Math.round(rgbColor.g),
      b: Math.round(rgbColor.b),
    }
  })

  return palette
}
