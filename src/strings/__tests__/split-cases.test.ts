import { describe, expect, it } from '@jest/globals'
import { splitCases } from '../split-cases'

describe('splitCases', () => {
  it('should return an empty array for empty string', () => {
    expect(splitCases('')).toEqual([])
  })

  it('should return an empty array for null or undefined', () => {
    expect(splitCases(null as unknown as string)).toEqual([])
    expect(splitCases(undefined as unknown as string)).toEqual([])
  })

  it('should handle space-separated strings', () => {
    expect(splitCases('hello world')).toEqual(['hello', 'world'])
    expect(splitCases('one two three')).toEqual(['one', 'two', 'three'])
  })

  it('should handle camelCase strings', () => {
    expect(splitCases('helloWorld')).toEqual(['hello', 'World'])
    expect(splitCases('thisIsACamelCaseString')).toEqual([
      'this',
      'Is',
      'A',
      'Camel',
      'Case',
      'String',
    ])
  })

  it('should handle PascalCase strings', () => {
    expect(splitCases('HelloWorld')).toEqual(['Hello', 'World'])
    expect(splitCases('ThisIsAPascalCaseString')).toEqual([
      'This',
      'Is',
      'A',
      'Pascal',
      'Case',
      'String',
    ])
  })

  it('should handle snake_case strings', () => {
    expect(splitCases('hello_world')).toEqual(['hello', 'world'])
    expect(splitCases('this_is_a_snake_case_string')).toEqual([
      'this',
      'is',
      'a',
      'snake',
      'case',
      'string',
    ])
  })

  it('should handle kebab-case strings', () => {
    expect(splitCases('hello-world')).toEqual(['hello', 'world'])
    expect(splitCases('this-is-a-kebab-case-string')).toEqual([
      'this',
      'is',
      'a',
      'kebab',
      'case',
      'string',
    ])
  })

  it('should handle mixed case formats', () => {
    expect(splitCases('helloWorld hello_world')).toEqual(['hello', 'World', 'hello', 'world'])
    expect(splitCases('HelloWorld hello-world')).toEqual(['Hello', 'World', 'hello', 'world'])
    expect(splitCases('hello_world-example')).toEqual(['hello', 'world', 'example'])
    expect(splitCases('helloWORLD hello-WORLD')).toEqual(['hello', 'WORLD', 'hello', 'WORLD'])
  })

  it('should handle strings with consecutive uppercase letters', () => {
    expect(splitCases('helloWORLD')).toEqual(['hello', 'WORLD'])
    expect(splitCases('hello_WORLD')).toEqual(['hello', 'WORLD'])
    expect(splitCases('hello-WORLD')).toEqual(['hello', 'WORLD'])
  })

  it('should handle strings with numbers by default', () => {
    expect(splitCases('hello123World')).toEqual(['hello123', 'World'])
    expect(splitCases('hello_123_world')).toEqual(['hello', '123', 'world'])
    expect(splitCases('hello-123-world')).toEqual(['hello', '123', 'world'])
  })

  it('should split numbers when preserveNumbers is false', () => {
    expect(splitCases('hello123World', { preserveNumbers: false })).toEqual([
      'hello',
      '123',
      'World',
    ])
    expect(splitCases('hello123World hello_456_world', { preserveNumbers: false })).toEqual([
      'hello',
      '123',
      'World',
      'hello',
      '456',
      'world',
    ])
    expect(splitCases('hello123-world456', { preserveNumbers: false })).toEqual([
      'hello',
      '123',
      'world',
      '456',
    ])
    expect(splitCases('hello123WORLD456', { preserveNumbers: false })).toEqual([
      'hello',
      '123',
      'WORLD',
      '456',
    ])
  })

  it('should handle strings with special characters by default', () => {
    expect(splitCases('hello!World')).toEqual(['hello!', 'World'])
    expect(splitCases('hello@#$_world')).toEqual(['hello@#$', 'world'])
    expect(splitCases('hello@#$_WORLD!@#')).toEqual(['hello@#$', 'WORLD!@#'])
    expect(splitCases('hello-@#$-world')).toEqual(['hello', '@#$', 'world'])
    expect(splitCases('hello@#$_WORLD-!@#')).toEqual(['hello@#$', 'WORLD', '!@#'])
  })

  it('should split special characters when preserveSpecials is false', () => {
    expect(splitCases('hello!World', { preserveSpecials: false })).toEqual(['hello', '!', 'World'])
    expect(splitCases('hello@#$World hello-$%^-world', { preserveSpecials: false })).toEqual([
      'hello',
      '@#$',
      'World',
      'hello',
      '$%^',
      'world',
    ])
    expect(splitCases('hello!@#-world$%^', { preserveSpecials: false })).toEqual([
      'hello',
      '!@#',
      'world',
      '$%^',
    ])
  })

  it('should handle both options together', () => {
    expect(
      splitCases('hello123!@#World hello_456$%^_world', {
        preserveNumbers: false,
        preserveSpecials: false,
      }),
    ).toEqual(['hello', '123', '!@#', 'World', 'hello', '456', '$%^', 'world'])

    expect(
      splitCases('hello123!@#-world456$%^', {
        preserveNumbers: false,
        preserveSpecials: false,
      }),
    ).toEqual(['hello', '123', '!@#', 'world', '456', '$%^'])
  })
})
