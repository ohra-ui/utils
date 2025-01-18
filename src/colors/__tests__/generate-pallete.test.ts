import { expect, test } from '@jest/globals'
import { colorizeLog } from '../colorize-log'
import { generatePallete } from '../generate-pallete'

const logPallete = (pallete: Record<string, { r: number; g: number; b: number }>) => {
  let logcolor = 'RESULTS: \n'
  for (const step in pallete) {
    if (pallete[step as keyof typeof pallete]) {
      const color = pallete[step as keyof typeof pallete]
      const colorizedResult = colorizeLog(
        `rgb(${color.r},${color.g},${color.b});`,
        { r: 255, g: 255, b: 255 },
        color,
      )
      logcolor += `${step}: ${colorizedResult}\n`
    }
  }
  console.info(logcolor)
}

test('generatePallete: primary color', () => {
  const base = { r: 169, g: 145, b: 247 } // rgb(169, 145, 247)
  const expected = {
    50: { r: 246, g: 244, b: 254 },
    100: { r: 231, g: 224, b: 253 },
    200: { r: 215, g: 204, b: 251 },
    300: { r: 200, g: 185, b: 250 },
    400: { r: 184, g: 165, b: 248 },
    500: { r: 169, g: 145, b: 247 },
    600: { r: 144, g: 123, b: 210 },
    700: { r: 118, g: 102, b: 173 },
    800: { r: 93, g: 80, b: 136 },
    900: { r: 68, g: 58, b: 99 },
    950: { r: 42, g: 36, b: 62 },
  }
  const result = generatePallete(base)
  logPallete(result)

  expect(result).toEqual(expected)
})

test('generatePallete: secondary color', () => {
  const base = { r: 102, g: 187, b: 207 } // rgb(102, 187, 207)
  const expected = {
    50: { r: 240, g: 248, b: 250 },
    100: { r: 212, g: 236, b: 242 },
    200: { r: 185, g: 224, b: 233 },
    300: { r: 157, g: 211, b: 224 },
    400: { r: 130, g: 199, b: 216 },
    500: { r: 102, g: 187, b: 207 },
    600: { r: 87, g: 159, b: 176 },
    700: { r: 71, g: 131, b: 145 },
    800: { r: 56, g: 103, b: 114 },
    900: { r: 41, g: 75, b: 83 },
    950: { r: 26, g: 47, b: 52 },
  }
  const result = generatePallete(base)
  logPallete(result)

  expect(result).toEqual(expected)
})

test('generatePallete: accent color', () => {
  const base = { r: 70, g: 87, b: 131 } // rgb(70,87,131)
  const expected = {
    50: { r: 237, g: 238, b: 243 },
    100: { r: 203, g: 208, b: 220 },
    200: { r: 170, g: 178, b: 198 },
    300: { r: 137, g: 147, b: 176 },
    400: { r: 103, g: 117, b: 153 },
    500: { r: 70, g: 87, b: 131 },
    600: { r: 60, g: 74, b: 111 },
    700: { r: 49, g: 61, b: 92 },
    800: { r: 39, g: 48, b: 72 },
    900: { r: 28, g: 35, b: 52 },
    950: { r: 18, g: 22, b: 33 },
  }
  const result = generatePallete(base)
  logPallete(result)

  expect(result).toEqual(expected)
})

test('generatePallete: neutral color', () => {
  const base = { r: 100, g: 116, b: 139 } // rgb(100,116,139)
  const expected = {
    50: { r: 240, g: 241, b: 243 },
    100: { r: 212, g: 216, b: 223 },
    200: { r: 184, g: 191, b: 202 },
    300: { r: 156, g: 166, b: 181 },
    400: { r: 128, g: 141, b: 160 },
    500: { r: 100, g: 116, b: 139 },
    600: { r: 85, g: 99, b: 118 },
    700: { r: 70, g: 81, b: 97 },
    800: { r: 55, g: 64, b: 76 },
    900: { r: 40, g: 46, b: 56 },
    950: { r: 25, g: 29, b: 35 },
  }
  const result = generatePallete(base)
  logPallete(result)

  expect(result).toEqual(expected)
})
