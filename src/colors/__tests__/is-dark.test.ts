import { expect, test } from 'bun:test'
import { isDark } from '../is-dark'

test('isDark on black and white', () => {
  expect(isDark({ r: 0, g: 0, b: 0 })).toBe(true)
  expect(isDark({ r: 255, g: 255, b: 255 })).toBe(false)
})

test('isDark on rgb colors', () => {
  expect(isDark({ r: 255, g: 0, b: 0 })).toBe(true)
  expect(isDark({ r: 0, g: 255, b: 0 })).toBe(false)
  expect(isDark({ r: 0, g: 0, b: 255 })).toBe(true)
})

test('isDark on 50 to 250 colors', () => {
  expect(isDark({ r: 50, g: 50, b: 50 })).toBe(true)
  expect(isDark({ r: 100, g: 100, b: 100 })).toBe(true)
  expect(isDark({ r: 150, g: 150, b: 150 })).toBe(true)
  expect(isDark({ r: 200, g: 200, b: 200 })).toBe(false)
  expect(isDark({ r: 250, g: 250, b: 250 })).toBe(false)
})
