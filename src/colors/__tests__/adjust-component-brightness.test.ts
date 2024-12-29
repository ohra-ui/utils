import { expect, test } from '@jest/globals'
import { adjustComponentBrightness } from '../adjust-component-brightness'

test('adjustComponentBrightness with factor', () => {
  expect(adjustComponentBrightness(0, 0.5)).toBe(0)
  expect(adjustComponentBrightness(255, 0.5)).toBe(128)
  expect(adjustComponentBrightness(128, 0.5)).toBe(64)
})

test('adjustComponentBrightness with offset', () => {
  expect(adjustComponentBrightness(0, 1, 50)).toBe(50)
  expect(adjustComponentBrightness(255, 1, 50)).toBe(255)
  expect(adjustComponentBrightness(128, 1, 50)).toBe(178)
})

test('adjustComponentBrightness with factor and offset', () => {
  expect(adjustComponentBrightness(0, 0.5, 50)).toBe(50)
  expect(adjustComponentBrightness(255, 0.5, 50)).toBe(178)
  expect(adjustComponentBrightness(128, 0.5, 50)).toBe(114)
})
