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

  it('should handle strings with consecutive uppercase letters as a single word', () => {
    expect(splitCamelCase('helloWORLD')).toEqual(['hello', 'WORLD'])
    expect(splitCamelCase('HelloWORLD')).toEqual(['Hello', 'WORLD'])
    expect(splitCamelCase('helloWORLDExample')).toEqual(['hello', 'WORLD', 'Example'])
  })

  it('should handle strings with numbers by default', () => {
    expect(splitCamelCase('hello123World')).toEqual(['hello123', 'World'])
    expect(splitCamelCase('hello123WORLD456')).toEqual(['hello123', 'WORLD456'])
  })

  it('should split numbers when preserveNumbers is false', () => {
    expect(splitCamelCase('hello123World', { preserveNumbers: false })).toEqual([
      'hello',
      '123',
      'World',
    ])
    expect(splitCamelCase('hello123', { preserveNumbers: false })).toEqual(['hello', '123'])
    expect(splitCamelCase('123hello', { preserveNumbers: false })).toEqual(['123', 'hello'])
    expect(splitCamelCase('hello123world456', { preserveNumbers: false })).toEqual([
      'hello',
      '123',
      'world',
      '456',
    ])
    expect(splitCamelCase('hello123world456HELLO123WORLD', { preserveNumbers: false })).toEqual([
      'hello',
      '123',
      'world',
      '456',
      'HELLO',
      '123',
      'WORLD',
    ])
  })

  it('should handle strings with special characters by default', () => {
    expect(splitCamelCase('hello!World')).toEqual(['hello!', 'World'])
    expect(splitCamelCase('hello@#$World')).toEqual(['hello@#$', 'World'])
    expect(splitCamelCase('hello@#$WORLD!@#')).toEqual(['hello@#$', 'WORLD!@#'])
  })

  it('should split special characters when preserveSpecials is false', () => {
    expect(splitCamelCase('hello!World', { preserveSpecials: false })).toEqual([
      'hello',
      '!',
      'World',
    ])
    expect(splitCamelCase('hello@#$World', { preserveSpecials: false })).toEqual([
      'hello',
      '@#$',
      'World',
    ])
    expect(splitCamelCase('hello!@#', { preserveSpecials: false })).toEqual(['hello', '!@#'])
    expect(splitCamelCase('hello@#$World$%^', { preserveSpecials: false })).toEqual([
      'hello',
      '@#$',
      'World',
      '$%^',
    ])
    expect(splitCamelCase('hello@#$World$%^HELLO*()WORLD', { preserveSpecials: false })).toEqual([
      'hello',
      '@#$',
      'World',
      '$%^',
      'HELLO',
      '*()',
      'WORLD',
    ])
  })

  it('should handle both options together', () => {
    expect(
      splitCamelCase('hello123!@#World', {
        preserveNumbers: false,
        preserveSpecials: false,
      }),
    ).toEqual(['hello', '123', '!@#', 'World'])

    expect(
      splitCamelCase('hello123!@#World456%^&', {
        preserveNumbers: false,
        preserveSpecials: false,
      }),
    ).toEqual(['hello', '123', '!@#', 'World', '456', '%^&'])
  })
})
