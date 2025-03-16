import { describe, expect, it } from '@jest/globals'
import { splitPascalCase } from '../split-pascal-case'

describe('splitPascalCase', () => {
  it('should return an empty array for empty string', () => {
    expect(splitPascalCase('')).toEqual([])
  })

  it('should return an empty array for null or undefined', () => {
    expect(splitPascalCase(null as unknown as string)).toEqual([])
    expect(splitPascalCase(undefined as unknown as string)).toEqual([])
  })

  it('should return a single word for a string with no uppercase letters', () => {
    expect(splitPascalCase('hello')).toEqual(['hello'])
  })

  it('should handle PascalCase strings correctly', () => {
    expect(splitPascalCase('HelloWorld')).toEqual(['Hello', 'World'])
  })

  it('should handle strings with consecutive uppercase letters as a single word', () => {
    expect(splitPascalCase('HelloWORLD')).toEqual(['Hello', 'WORLD'])
    expect(splitPascalCase('HelloWORLDExample')).toEqual(['Hello', 'WORLD', 'Example'])
  })

  it('should handle multiple uppercase letters', () => {
    expect(splitPascalCase('HelloWorldAgain')).toEqual(['Hello', 'World', 'Again'])
  })

  it('should handle strings with numbers', () => {
    expect(splitPascalCase('Hello123World')).toEqual(['Hello123', 'World'])
  })
})
