import { describe, expect, it } from '@jest/globals'
import { splitCamelCase } from '../split-camel-case'

describe('splitCamelCase', () => {
  it('should return an empty array for empty string', () => {
    expect(splitCamelCase('')).toEqual([])
  })

  it('should return an empty array for null or undefined', () => {
    expect(splitCamelCase(null as unknown as string)).toEqual([])
    expect(splitCamelCase(undefined as unknown as string)).toEqual([])
  })

  it('should return a single word for a string with no uppercase letters', () => {
    expect(splitCamelCase('hello')).toEqual(['hello'])
  })

  it('should split a camelCase string correctly', () => {
    expect(splitCamelCase('helloWorld')).toEqual(['hello', 'World'])
  })

  it('should handle PascalCase strings correctly', () => {
    expect(splitCamelCase('HelloWorld')).toEqual(['Hello', 'World'])
  })

  it('should handle multiple uppercase letters', () => {
    expect(splitCamelCase('helloWorldAgain')).toEqual(['hello', 'World', 'Again'])
    expect(splitCamelCase('HelloWorldAgain')).toEqual(['Hello', 'World', 'Again'])
  })

  it('should handle strings with consecutive uppercase letters', () => {
    expect(splitCamelCase('helloWORLD')).toEqual(['hello', 'WORLD'])
    expect(splitCamelCase('HelloWORLD')).toEqual(['Hello', 'WORLD'])
  })

  it('should handle strings with numbers', () => {
    expect(splitCamelCase('hello123World')).toEqual(['hello123', 'World'])
  })
})
