import { expect, test } from '@jest/globals'
import { calculateLuminance } from '../calculate-luminance'

test('calculateLuminance on black and white', () => {
  expect(calculateLuminance({ r: 0, g: 0, b: 0 })).toBeLessThanOrEqual(0.5)
  expect(calculateLuminance({ r: 255, g: 255, b: 255 })).toBeGreaterThan(0.5)
})
