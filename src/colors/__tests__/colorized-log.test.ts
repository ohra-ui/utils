import { expect, test } from 'bun:test'
import { colorizeLog } from '../colorize-log'

test('colorizeLog: blue foreground', () => {
  const foreground = { r: 0, g: 0, b: 255 }
  const text = 'BLUE TEXT COLOR'
  const expected = `\x1b[38;2;${foreground.r};${foreground.g};${foreground.b}m${text}\x1b[0m`
  const received = colorizeLog(text, foreground)
  console.log(received)
  expect(received).toBe(expected)
})

test('colorizeLog: blue background', () => {
  const background = { r: 0, g: 0, b: 255 }
  const text = 'BLUE HIGHLIGHT'
  const expected = `\x1b[48;2;${background.r};${background.g};${background.b}m${text}\x1b[0m`
  const received = colorizeLog(text, undefined, background)
  console.log(received)
  expect(received).toBe(expected)
})

test('colorizeLog: black foreground and white background', () => {
  const foreground = { r: 0, g: 0, b: 0 }
  const background = { r: 255, g: 255, b: 255 }
  const text = 'BLACK ON WHITE'
  const expected = `\x1b[38;2;${foreground.r};${foreground.g};${foreground.b}m\x1b[48;2;${background.r};${background.g};${background.b}m${text}\x1b[0m`
  const received = colorizeLog(text, foreground, background)
  console.log(received)
  expect(received).toBe(expected)
})
