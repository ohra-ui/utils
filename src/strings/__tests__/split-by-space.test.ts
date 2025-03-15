import { describe, expect, it } from '@jest/globals'
import { splitBySpace } from '../split-by-space'

describe('splitBySpace', () => {
  it('should split a string by space', () => {
    expect(splitBySpace('hello world')).toEqual(['hello', 'world'])
  })

  it('should handle multiple spaces', () => {
    expect(splitBySpace('hello   world')).toEqual(['hello', 'world'])
  })

  it('should handle tabs and newlines when splitByWhitespace is true', () => {
    expect(splitBySpace('hello\tworld\ntest')).toEqual(['hello', 'world', 'test'])
  })

  it('should not split by tabs and newlines when splitByWhitespace is false', () => {
    expect(splitBySpace('hello\tworld\ntest', { splitByWhitespace: false })).toEqual([
      'hello\tworld\ntest',
    ])
  })

  it('should handle empty strings', () => {
    expect(splitBySpace('')).toEqual([])
  })

  it('should handle null or undefined', () => {
    expect(splitBySpace(null as unknown as string)).toEqual([])
    expect(splitBySpace(undefined as unknown as string)).toEqual([])
  })

  it('should trim the input string by default', () => {
    expect(splitBySpace('  hello world  ')).toEqual(['hello', 'world'])
  })

  it('should not trim the input string when trim is false', () => {
    // When trim is false but splitByWhitespace is true (default),
    // leading/trailing spaces are preserved in the split pattern
    const result = splitBySpace('  hello world  ', { trim: false })
    expect(result.length).toBeGreaterThan(2) // Should have more elements due to spaces
    expect(result.filter((s) => s !== '')).toEqual(['hello', 'world'])
  })

  it('should handle a string with only spaces', () => {
    expect(splitBySpace('   ')).toEqual([])
    // With trim: false, it should return an array with empty strings
    expect(splitBySpace('   ', { trim: false }).length).toBeGreaterThan(0)
  })
})
