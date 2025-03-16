import { describe, expect, it } from '@jest/globals'
import { convertCase } from '../convert-case'

describe('convertCase', () => {
  it('should return an empty string for empty input', () => {
    expect(convertCase('', 'camelCase')).toEqual('')
    expect(convertCase(null as unknown as string, 'camelCase')).toEqual('')
    expect(convertCase(undefined as unknown as string, 'camelCase')).toEqual('')
  })

  describe('camelCase conversion', () => {
    it('should convert to camelCase', () => {
      expect(convertCase('hello world', 'camelCase')).toEqual('helloWorld')
      expect(convertCase('hello_world', 'camelCase')).toEqual('helloWorld')
      expect(convertCase('hello-world', 'camelCase')).toEqual('helloWorld')
      expect(convertCase('HelloWorld', 'camelCase')).toEqual('helloWorld')
      expect(convertCase('HELLO_WORLD', 'camelCase')).toEqual('helloWorld')
      expect(convertCase('Hello World', 'camelCase')).toEqual('helloWorld')
    })
  })

  describe('PascalCase conversion', () => {
    it('should convert to PascalCase', () => {
      expect(convertCase('hello world', 'PascalCase')).toEqual('HelloWorld')
      expect(convertCase('hello_world', 'PascalCase')).toEqual('HelloWorld')
      expect(convertCase('hello-world', 'PascalCase')).toEqual('HelloWorld')
      expect(convertCase('helloWorld', 'PascalCase')).toEqual('HelloWorld')
      expect(convertCase('HELLO_WORLD', 'PascalCase')).toEqual('HelloWorld')
      expect(convertCase('Hello World', 'PascalCase')).toEqual('HelloWorld')
    })
  })

  describe('snake_case conversion', () => {
    it('should convert to snake_case', () => {
      expect(convertCase('hello world', 'snake_case')).toEqual('hello_world')
      expect(convertCase('helloWorld', 'snake_case')).toEqual('hello_world')
      expect(convertCase('hello-world', 'snake_case')).toEqual('hello_world')
      expect(convertCase('HelloWorld', 'snake_case')).toEqual('hello_world')
      expect(convertCase('HELLO_WORLD', 'snake_case')).toEqual('hello_world')
      expect(convertCase('Hello World', 'snake_case')).toEqual('hello_world')
    })
  })

  describe('kebab-case conversion', () => {
    it('should convert to kebab-case', () => {
      expect(convertCase('hello world', 'kebab-case')).toEqual('hello-world')
      expect(convertCase('helloWorld', 'kebab-case')).toEqual('hello-world')
      expect(convertCase('hello_world', 'kebab-case')).toEqual('hello-world')
      expect(convertCase('HelloWorld', 'kebab-case')).toEqual('hello-world')
      expect(convertCase('HELLO_WORLD', 'kebab-case')).toEqual('hello-world')
      expect(convertCase('Hello World', 'kebab-case')).toEqual('hello-world')
    })
  })

  describe('CONSTANT_CASE conversion', () => {
    it('should convert to CONSTANT_CASE', () => {
      expect(convertCase('hello world', 'CONSTANT_CASE')).toEqual('HELLO_WORLD')
      expect(convertCase('helloWorld', 'CONSTANT_CASE')).toEqual('HELLO_WORLD')
      expect(convertCase('hello_world', 'CONSTANT_CASE')).toEqual('HELLO_WORLD')
      expect(convertCase('hello-world', 'CONSTANT_CASE')).toEqual('HELLO_WORLD')
      expect(convertCase('HelloWorld', 'CONSTANT_CASE')).toEqual('HELLO_WORLD')
      expect(convertCase('Hello World', 'CONSTANT_CASE')).toEqual('HELLO_WORLD')
    })
  })

  describe('Title Case conversion', () => {
    it('should convert to Title Case', () => {
      expect(convertCase('hello world', 'Title Case')).toEqual('Hello World')
      expect(convertCase('helloWorld', 'Title Case')).toEqual('Hello World')
      expect(convertCase('hello_world', 'Title Case')).toEqual('Hello World')
      expect(convertCase('hello-world', 'Title Case')).toEqual('Hello World')
      expect(convertCase('HelloWorld', 'Title Case')).toEqual('Hello World')
      expect(convertCase('HELLO_WORLD', 'Title Case')).toEqual('Hello World')
    })
  })

  describe('Sentence case conversion', () => {
    it('should convert to Sentence case', () => {
      expect(convertCase('hello world', 'Sentence case')).toEqual('Hello world')
      expect(convertCase('helloWorld', 'Sentence case')).toEqual('Hello world')
      expect(convertCase('hello_world', 'Sentence case')).toEqual('Hello world')
      expect(convertCase('hello-world', 'Sentence case')).toEqual('Hello world')
      expect(convertCase('HelloWorld', 'Sentence case')).toEqual('Hello world')
      expect(convertCase('HELLO_WORLD', 'Sentence case')).toEqual('Hello world')
    })
  })

  describe('lowercase conversion', () => {
    it('should convert to lowercase', () => {
      expect(convertCase('hello world', 'lowercase')).toEqual('hello world')
      expect(convertCase('helloWorld', 'lowercase')).toEqual('hello world')
      expect(convertCase('hello_world', 'lowercase')).toEqual('hello world')
      expect(convertCase('hello-world', 'lowercase')).toEqual('hello world')
      expect(convertCase('HelloWorld', 'lowercase')).toEqual('hello world')
      expect(convertCase('HELLO_WORLD', 'lowercase')).toEqual('hello world')
    })
  })

  describe('UPPERCASE conversion', () => {
    it('should convert to UPPERCASE', () => {
      expect(convertCase('hello world', 'UPPERCASE')).toEqual('HELLO WORLD')
      expect(convertCase('helloWorld', 'UPPERCASE')).toEqual('HELLO WORLD')
      expect(convertCase('hello_world', 'UPPERCASE')).toEqual('HELLO WORLD')
      expect(convertCase('hello-world', 'UPPERCASE')).toEqual('HELLO WORLD')
      expect(convertCase('HelloWorld', 'UPPERCASE')).toEqual('HELLO WORLD')
      expect(convertCase('HELLO_WORLD', 'UPPERCASE')).toEqual('HELLO WORLD')
    })
  })

  describe('preserveNumbers option', () => {
    it('should preserve numbers by default', () => {
      expect(convertCase('hello123World', 'snake_case')).toEqual('hello123_world')
      expect(convertCase('hello123World', 'kebab-case')).toEqual('hello123-world')
      expect(convertCase('hello123_world', 'camelCase')).toEqual('hello123World')
      expect(convertCase('hello123-world', 'PascalCase')).toEqual('Hello123World')
    })

    it('should split numbers when preserveNumbers is false', () => {
      expect(convertCase('hello123World', 'snake_case', { preserveNumbers: false })).toEqual(
        'hello_123_world',
      )
      expect(convertCase('hello123World', 'kebab-case', { preserveNumbers: false })).toEqual(
        'hello-123-world',
      )
      expect(convertCase('hello123_world', 'camelCase', { preserveNumbers: false })).toEqual(
        'hello123World',
      )
      expect(convertCase('hello123-world', 'PascalCase', { preserveNumbers: false })).toEqual(
        'Hello123World',
      )
    })
  })

  describe('preserveSpecials option', () => {
    it('should preserve special characters by default', () => {
      expect(convertCase('hello!World', 'snake_case')).toEqual('hello!_world')
      expect(convertCase('hello@#$World', 'kebab-case')).toEqual('hello@#$-world')
      expect(convertCase('hello!_world', 'camelCase')).toEqual('hello!World')
      expect(convertCase('hello@#$-world', 'PascalCase')).toEqual('Hello@#$World')
      expect(convertCase('hello!World', 'Title Case')).toEqual('Hello! World')
      expect(convertCase('hello!World', 'Sentence case')).toEqual('Hello! world')
      expect(convertCase('hello!World', 'lowercase')).toEqual('hello! world')
      expect(convertCase('hello!World', 'UPPERCASE')).toEqual('HELLO! WORLD')
    })

    it('should split special characters when preserveSpecials is false', () => {
      expect(convertCase('hello!World', 'snake_case', { preserveSpecials: false })).toEqual(
        'hello_!_world',
      )
      expect(convertCase('hello@#$World', 'kebab-case', { preserveSpecials: false })).toEqual(
        'hello-@#$-world',
      )
      expect(convertCase('hello!_world', 'camelCase', { preserveSpecials: false })).toEqual(
        'hello!World',
      )
      expect(convertCase('hello@#$-world', 'PascalCase', { preserveSpecials: false })).toEqual(
        'Hello@#$World',
      )
      expect(convertCase('hello!World', 'Title Case', { preserveSpecials: false })).toEqual(
        'Hello ! World',
      )
      expect(convertCase('hello!World', 'Sentence case', { preserveSpecials: false })).toEqual(
        'Hello ! world',
      )
      expect(convertCase('hello!World', 'lowercase', { preserveSpecials: false })).toEqual(
        'hello ! world',
      )
      expect(convertCase('hello!World', 'UPPERCASE', { preserveSpecials: false })).toEqual(
        'HELLO ! WORLD',
      )
    })
  })

  describe('combined options', () => {
    it('should handle both options together', () => {
      expect(
        convertCase('hello123!@#World', 'snake_case', {
          preserveNumbers: false,
          preserveSpecials: false,
        }),
      ).toEqual('hello_123_!@#_world')

      expect(
        convertCase('hello123!@#World', 'kebab-case', {
          preserveNumbers: false,
          preserveSpecials: false,
        }),
      ).toEqual('hello-123-!@#-world')

      expect(
        convertCase('hello123!@#_world', 'camelCase', {
          preserveNumbers: false,
          preserveSpecials: false,
        }),
      ).toEqual('hello123!@#World')

      expect(
        convertCase('hello123!@#-world', 'PascalCase', {
          preserveNumbers: false,
          preserveSpecials: false,
        }),
      ).toEqual('Hello123!@#World')
    })
  })
})
