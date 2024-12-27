import { expect, test } from 'bun:test'
import { colorizeLog } from '../colorize-log'
import { generateContrastColor } from '../generate-contrast-color'

test('generateContrastColor on black and white', () => {
  expect(generateContrastColor({ r: 0, g: 0, b: 0 })).toEqual({ r: 255, g: 255, b: 255 })
  expect(generateContrastColor({ r: 255, g: 255, b: 255 })).toEqual({ r: 0, g: 0, b: 0 })
})

test('generateContrastColor on dark and light', () => {
  expect(generateContrastColor({ r: 100, g: 100, b: 100 })).toEqual({ r: 255, g: 255, b: 255 })
  expect(generateContrastColor({ r: 200, g: 200, b: 200 })).toEqual({ r: 0, g: 0, b: 0 })
})

test('generateContrastColor by brightness: greenyellow (light base)', () => {
  const base = { r: 173, g: 255, b: 47 }
  const expected = { r: 52, g: 77, b: 14 }
  const result = generateContrastColor(base, true)
  const colorizedResult = colorizeLog(JSON.stringify(result), result, base)

  console.log('RESULT:', colorizedResult)

  expect(result).toEqual(expected)
})

test('generateContrastColor by brightness: teal (dark base)', () => {
  const base = { r: 0, g: 128, b: 128 }
  const expected = { r: 190, g: 255, b: 255 }
  const result = generateContrastColor(base, true)

  const colorizedResult = colorizeLog(JSON.stringify(result), result, base)

  console.log('RESULT:', colorizedResult)

  expect(result).toEqual(expected)
})

test('generateContrastColor by brightness: rebeccapurple (dark base)', () => {
  const base = { r: 102, g: 51, b: 153 }
  const expected = { r: 255, g: 241, b: 255 }
  const result = generateContrastColor(base, true)

  const colorizedResult = colorizeLog(JSON.stringify(result), result, base)

  console.log('RESULT:', colorizedResult)

  expect(result).toEqual(expected)
})

test('generateContrastColor by brightness with custom brightness options: dark base', () => {
  const base = { r: 68, g: 23, b: 69 }
  const expected = { r: 188, g: 143, b: 189 }
  const result = generateContrastColor(base, true, { dark: { factor: 0.7, offset: 120 } })

  const colorizedResult = colorizeLog(JSON.stringify(result), result, base)

  console.log('RESULT:', colorizedResult)

  expect(result).toEqual(expected)
})

test('generateContrastColor by brightness with custom brightness options: light base', () => {
  const base = { r: 255, g: 222, b: 0 }
  const expected = { r: 179, g: 155, b: 0 }
  const result = generateContrastColor(base, true, { light: { factor: 0.7, offset: 0 } })

  const colorizedResult = colorizeLog(JSON.stringify(result), result, base)

  console.log('RESULT:', colorizedResult)

  expect(result).toEqual(expected)
})
