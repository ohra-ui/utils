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
 * @returns {string[]} An array of words.
 */
import { splitCamelCase } from './split-camel-case'

export const splitPascalCase = splitCamelCase
