/**
 * Splits a PascalCase string into an array of words.
 * This is an alias for splitCamelCase as the implementation works for both camelCase and PascalCase.
 *
 * @example
 * splitPascalCase('HelloWorld') // ['Hello', 'World']
 * splitPascalCase('helloWORLD') // ['Hello', 'WORLD']
 * splitPascalCase('HelloWorldAgain') // ['Hello', 'World', 'Again']
 * splitPascalCase('Hello') // ['Hello']
 *
 * @param {string} str - The PascalCase string to split.
 * @param {Object} options - Options for splitting.
 * @param {boolean} options.preserveNumbers - Whether to preserve numbers as part of words. Default is true.
 * @param {boolean} options.preserveSpecials - Whether to preserve special characters as part of words. Default is true.
 * @returns {string[]} An array of words.
 */
import { splitCamelCase } from './split-camel-case'

export const splitPascalCase = splitCamelCase
