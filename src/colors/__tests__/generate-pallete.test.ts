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
  const base = { r: 178, g: 80, b: 162 } // rgb(178, 80, 162)
  const expected = {
    50: { r: 247, g: 238, b: 246 },
    100: { r: 233, g: 206, b: 229 },
    200: { r: 220, g: 175, b: 212 },
    300: { r: 206, g: 143, b: 195 },
    400: { r: 192, g: 112, b: 179 },
    500: { r: 178, g: 80, b: 162 },
    600: { r: 151, g: 68, b: 138 },
    700: { r: 125, g: 56, b: 113 },
    800: { r: 98, g: 44, b: 89 },
    900: { r: 71, g: 32, b: 65 },
    950: { r: 45, g: 20, b: 41 },
  }
  const result = generatePallete(base)
  logPallete(result)

  expect(result).toEqual(expected)
})

test('generatePallete: accent color', () => {
  const base = { r: 57, g: 76, b: 128 } // rgb(57,76,128)
  const expected = {
    50: { r: 235, g: 237, b: 242 },
    100: { r: 200, g: 205, b: 219 },
    200: { r: 164, g: 173, b: 197 },
    300: { r: 128, g: 140, b: 174 },
    400: { r: 93, g: 108, b: 151 },
    500: { r: 57, g: 76, b: 128 },
    600: { r: 48, g: 65, b: 109 },
    700: { r: 40, g: 53, b: 90 },
    800: { r: 31, g: 42, b: 70 },
    900: { r: 23, g: 30, b: 51 },
    950: { r: 14, g: 19, b: 32 },
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
