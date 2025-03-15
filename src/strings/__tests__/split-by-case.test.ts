import { describe, expect, it } from '@jest/globals'
import { splitByCase } from '../split-by-case'

describe('splitByCase', () => {
  describe('camelCase', () => {
    it('should split camelCase strings', () => {
      expect(splitByCase('camelCaseString', { format: 'camel' })).toEqual([
        'camel',
        'case',
        'string',
      ])
    })

    it('should handle single word camelCase', () => {
      expect(splitByCase('camel', { format: 'camel' })).toEqual(['camel'])
    })
  })

  describe('PascalCase', () => {
    it('should split PascalCase strings', () => {
      expect(splitByCase('PascalCaseString', { format: 'pascal' })).toEqual([
        'pascal',
        'case',
        'string',
      ])
    })

    it('should handle single word PascalCase', () => {
      expect(splitByCase('Pascal', { format: 'pascal' })).toEqual(['pascal'])
    })
  })

  describe('snake_case', () => {
    it('should split snake_case strings', () => {
      expect(splitByCase('snake_case_string', { format: 'snake' })).toEqual([
        'snake',
        'case',
        'string',
      ])
    })

    it('should handle single word snake_case', () => {
      expect(splitByCase('snake', { format: 'snake' })).toEqual(['snake'])
    })
  })

  describe('kebab-case', () => {
    it('should split kebab-case strings', () => {
      expect(splitByCase('kebab-case-string', { format: 'kebab' })).toEqual([
        'kebab',
        'case',
        'string',
      ])
    })

    it('should handle single word kebab-case', () => {
      expect(splitByCase('kebab', { format: 'kebab' })).toEqual(['kebab'])
    })
  })

  describe('auto detection', () => {
    it('should auto-detect camelCase', () => {
      expect(splitByCase('camelCaseString')).toEqual(['camel', 'case', 'string'])
    })

    it('should auto-detect PascalCase', () => {
      expect(splitByCase('PascalCaseString')).toEqual(['pascal', 'case', 'string'])
    })

    it('should auto-detect snake_case', () => {
      expect(splitByCase('snake_case_string')).toEqual(['snake', 'case', 'string'])
    })

    it('should auto-detect kebab-case', () => {
      expect(splitByCase('kebab-case-string')).toEqual(['kebab', 'case', 'string'])
    })
  })

  describe('preserveCase option', () => {
    it('should preserve case when specified', () => {
      expect(splitByCase('CamelCaseString', { preserveCase: true })).toEqual([
        'Camel',
        'Case',
        'String',
      ])
      expect(
        splitByCase('camelCase snake_case kebab-case PascalCase', { preserveCase: true }),
      ).toEqual(['camel', 'Case', 'snake', 'case', 'kebab', 'case', 'Pascal', 'Case'])
    })
  })

  describe('mixed spaces and cases', () => {
    it('should handle spaces and camelCase', () => {
      expect(splitByCase('camelCase string withMore words')).toEqual([
        'camel',
        'case',
        'string',
        'with',
        'more',
        'words',
      ])
    })

    it('should handle spaces and PascalCase', () => {
      expect(splitByCase('PascalCase string WithMore words')).toEqual([
        'pascal',
        'case',
        'string',
        'with',
        'more',
        'words',
      ])
    })

    it('should handle spaces and snake_case', () => {
      expect(splitByCase('snake_case string with_more words')).toEqual([
        'snake',
        'case',
        'string',
        'with',
        'more',
        'words',
      ])
    })

    it('should handle spaces and kebab-case', () => {
      expect(splitByCase('kebab-case string with-more words')).toEqual([
        'kebab',
        'case',
        'string',
        'with',
        'more',
        'words',
      ])
    })

    it('should handle mixed case formats', () => {
      expect(splitByCase('camelCase snake_case kebab-case PascalCase')).toEqual([
        'camel',
        'case',
        'snake',
        'case',
        'kebab',
        'case',
        'pascal',
        'case',
      ])
    })
  })

  describe('preserveNumbers option', () => {
    it('should preserve numbers as separate segments when specified', () => {
      expect(splitByCase('version123', { preserveNumbers: true })).toEqual(['version', '123'])
      expect(splitByCase('user42Profile', { preserveNumbers: true })).toEqual([
        'user',
        '42',
        'profile',
      ])
      expect(splitByCase('123users', { preserveNumbers: true })).toEqual(['123', 'users'])
    })

    it('should handle numbers in different case formats', () => {
      expect(splitByCase('version_123_test', { format: 'snake', preserveNumbers: true })).toEqual([
        'version',
        '123',
        'test',
      ])
      expect(splitByCase('version-123-test', { format: 'kebab', preserveNumbers: true })).toEqual([
        'version',
        '123',
        'test',
      ])
      expect(splitByCase('Version123Test', { format: 'pascal', preserveNumbers: true })).toEqual([
        'version',
        '123',
        'test',
      ])
    })

    it('should handle multiple number segments', () => {
      expect(splitByCase('user123profile456', { preserveNumbers: true })).toEqual([
        'user',
        '123',
        'profile',
        '456',
      ])
    })

    it('should handle numbers at the beginning and end', () => {
      expect(splitByCase('123UserProfile456', { preserveNumbers: true })).toEqual([
        '123',
        'user',
        'profile',
        '456',
      ])
    })
  })

  describe('preserveAcronym option', () => {
    it('should preserve acronyms as single segments when specified', () => {
      expect(splitByCase('APIVersion', { preserveAcronym: true })).toEqual(['API', 'version'])
      expect(splitByCase('parseHTMLContent', { preserveAcronym: true })).toEqual([
        'parse',
        'HTML',
        'content',
      ])
    })

    it('should handle acronyms in different positions', () => {
      expect(splitByCase('APIVersionHTTP', { preserveAcronym: true })).toEqual([
        'API',
        'version',
        'HTTP',
      ])
      expect(splitByCase('userAPIProfile', { preserveAcronym: true })).toEqual([
        'user',
        'API',
        'profile',
      ])
    })

    it('should handle consecutive acronyms', () => {
      expect(splitByCase('APIHTTP', { preserveAcronym: true })).toEqual(['APIHTTP'])
    })

    it('should preserve case of acronyms even when preserveCase is false', () => {
      expect(
        splitByCase('parseHTMLContent', { preserveAcronym: true, preserveCase: false }),
      ).toEqual(['parse', 'HTML', 'content'])
    })
  })

  describe('combined options', () => {
    it('should handle preserveNumbers and preserveAcronym together', () => {
      expect(
        splitByCase('API123Version', { preserveNumbers: true, preserveAcronym: true }),
      ).toEqual(['API', '123', 'version'])
      expect(
        splitByCase('user42APIProfile', { preserveNumbers: true, preserveAcronym: true }),
      ).toEqual(['user', '42', 'API', 'profile'])
    })

    it('should handle preserveCase, preserveNumbers, and preserveAcronym together', () => {
      expect(
        splitByCase('User42APIProfile', {
          preserveCase: true,
          preserveNumbers: true,
          preserveAcronym: true,
        }),
      ).toEqual(['User', '42', 'API', 'Profile'])
    })
  })

  describe('edge cases', () => {
    it('should handle empty strings', () => {
      expect(splitByCase('')).toEqual([])
    })

    it('should handle null or undefined', () => {
      expect(splitByCase(null as unknown as string)).toEqual([])
      expect(splitByCase(undefined as unknown as string)).toEqual([])
    })

    it('should handle strings with no clear format', () => {
      expect(splitByCase('justaplainstring')).toEqual(['justaplainstring'])
    })

    it('should handle strings with only numbers', () => {
      expect(splitByCase('12345', { preserveNumbers: true })).toEqual(['12345'])
    })

    it('should handle strings with numbers without preserving numbers', () => {
      expect(splitByCase('kao12345Nashi')).toEqual(['kao12345', 'nashi'])
    })

    it('should handle strings with numbers without preserving numbers but preserving case', () => {
      expect(splitByCase('kao12345Nashi', { preserveCase: true })).toEqual(['kao12345', 'Nashi'])
    })

    it('should handle strings with only acronyms', () => {
      expect(splitByCase('API', { preserveAcronym: true })).toEqual(['API'])
      expect(splitByCase('HTMLCSSJS', { preserveAcronym: true })).toEqual(['HTMLCSSJS'])
    })
  })
})
