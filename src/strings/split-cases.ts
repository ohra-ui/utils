import { splitCamelCase } from './split-camel-case'

/**
 * Splits a string with mixed case formats into an array of words.
 * Handles space-separated strings, camelCase, PascalCase, snake_case, and kebab-case.
 *
 * @example
 * splitCases('helloWorld hello_world') // ['hello', 'World', 'hello', 'world']
 * splitCases('HelloWorld hello-world') // ['Hello', 'World', 'hello', 'world']
 * splitCases('hello_world-example') // ['hello', 'world', 'example']
 * splitCases('helloWORLD hello-WORLD') // ['hello', 'WORLD', 'hello', 'WORLD']
 * splitCases('hello123World hello_456_world', { preserveNumbers: false }) // ['hello', '123', 'World', 'hello', '456', 'world']
 * splitCases('hello!@#World hello-$%^-world', { preserveSpecials: false }) // ['hello', '!@#', 'World', 'hello', '$%^', 'world']
 *
 * @param {string} str - The string to split.
 * @param {Object} options - Options for splitting.
 * @param {boolean} options.preserveNumbers - Whether to preserve numbers as part of words. Default is true.
 * @param {boolean} options.preserveSpecials - Whether to preserve special characters as part of words. Default is true.
 * @returns {string[]} An array of words.
 */
export function splitCases(
  str: string,
  options: {
    preserveNumbers?: boolean
    preserveSpecials?: boolean
  } = {},
): string[] {
  if (!str) return []
  if (str.length === 0) return []

  // Step 1: Split by spaces
  let words = str.split(' ')

  // Step 2: Split each word by snake_case and kebab-case
  words = words.flatMap((word) => {
    // Split by both '-' and '_' characters
    const parts = word.split(/[-_]/)
    return parts
  })

  // Step 3: Split each word by camelCase
  words = words.flatMap((word) => {
    return splitCamelCase(word, options)
  })

  return words
}
