import { splitCases } from './split-cases'

/**
 * Available case formats for conversion.
 */
export type CaseFormat =
  | 'camelCase'
  | 'PascalCase'
  | 'snake_case'
  | 'kebab-case'
  | 'CONSTANT_CASE'
  | 'Title Case'
  | 'Sentence case'
  | 'lowercase'
  | 'UPPERCASE'

export const CASE_FORMATS = {
  CAMEL: 'camelCase',
  PASCAL: 'PascalCase',
  SNAKE: 'snake_case',
  KEBAB: 'kebab-case',
  CONSTANT: 'CONSTANT_CASE',
  TITLE: 'Title Case',
  SENTENCE: 'Sentence case',
  LOWERCASE: 'lowercase',
  UPPERCASE: 'UPPERCASE',
}

/**
 * Options for case conversion.
 */
export interface ConvertCaseOptions {
  /**
   * Whether to preserve numbers as part of words. Default is true.
   */
  preserveNumbers?: boolean
  /**
   * Whether to preserve special characters as part of words. Default is true.
   */
  preserveSpecials?: boolean
}

/**
 * Converts a string from any case format to the specified case format.
 *
 * @example
 * convertCase('helloWorld', 'snake_case') // 'hello_world'
 * convertCase('HelloWorld', 'kebab-case') // 'hello-world'
 * convertCase('hello_world', 'camelCase') // 'helloWorld'
 * convertCase('hello-world', 'PascalCase') // 'HelloWorld'
 * convertCase('hello_world', 'CONSTANT_CASE') // 'HELLO_WORLD'
 * convertCase('helloWorld', 'Title Case') // 'Hello World'
 * convertCase('helloWorld', 'Sentence case') // 'Hello world'
 * convertCase('hello123World', 'snake_case', { preserveNumbers: false }) // 'hello_123_world'
 * convertCase('hello!World', 'kebab-case', { preserveSpecials: false }) // 'hello-!-world'
 * convertCase('hello world', 'lowercase') // 'hello world'
 * convertCase('HELLO WORLD', 'UPPERCASE') // 'HELLO WORLD'
 *
 * @param {string} str - The string to convert.
 * @param {CaseFormat} targetCase - The target case format.
 * @param {ConvertCaseOptions} options - Options for conversion.
 * @returns {string} The converted string.
 */
export function convertCase(
  str: string,
  targetCase: CaseFormat,
  options: ConvertCaseOptions = {},
): string {
  if (!str) return ''

  // Split the string into words using the splitCases utility
  const words = splitCases(str, options)

  // If no words, return empty string
  if (words.length === 0) return ''

  // Convert to the target case
  switch (targetCase) {
    case CASE_FORMATS.CAMEL:
      return words
        .map((word, index) => {
          if (index === 0) {
            return word.toLowerCase()
          }
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        })
        .join('')

    case CASE_FORMATS.PASCAL:
      return words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('')

    case CASE_FORMATS.SNAKE:
      return words.map((word) => word.toLowerCase()).join('_')

    case CASE_FORMATS.KEBAB:
      return words.map((word) => word.toLowerCase()).join('-')

    case CASE_FORMATS.CONSTANT:
      return words.map((word) => word.toUpperCase()).join('_')

    case CASE_FORMATS.TITLE:
      return words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')

    case CASE_FORMATS.SENTENCE:
      return words
        .map((word, index) => {
          if (index === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          }
          return word.toLowerCase()
        })
        .join(' ')

    case CASE_FORMATS.LOWERCASE:
      return words.map((word) => word.toLowerCase()).join(' ')

    case CASE_FORMATS.UPPERCASE:
      return words.map((word) => word.toUpperCase()).join(' ')

    default:
      return str
  }
}
