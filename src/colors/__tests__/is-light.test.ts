import { expect, test } from '@jest/globals'
import { isLight } from '../is-light'

test('isLight on black and white', () => {
  expect(isLight({ r: 0, g: 0, b: 0 })).toBe(false)
  expect(isLight({ r: 255, g: 255, b: 255 })).toBe(true)
})

test('isLight on rgb colors', () => {
  expect(isLight({ r: 255, g: 0, b: 0 })).toBe(false)
  expect(isLight({ r: 0, g: 255, b: 0 })).toBe(true)
  expect(isLight({ r: 0, g: 0, b: 255 })).toBe(false)
})

test('isLight on 50 to 250 colors', () => {
  expect(isLight({ r: 50, g: 50, b: 50 })).toBe(false)
  expect(isLight({ r: 100, g: 100, b: 100 })).toBe(false)
  expect(isLight({ r: 150, g: 150, b: 150 })).toBe(false)
  expect(isLight({ r: 200, g: 200, b: 200 })).toBe(true)
  expect(isLight({ r: 250, g: 250, b: 250 })).toBe(true)
})
