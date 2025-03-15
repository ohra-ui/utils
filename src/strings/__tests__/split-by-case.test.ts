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
  })
})
