import { splitBySpace } from './split-by-space'

/**
 * Supported case formats
 */
export type CaseFormat = 'camel' | 'pascal' | 'snake' | 'kebab' | 'auto'

/**
 * Options for splitting a string by case format
 * @property {CaseFormat} format - The case format to detect (default: 'auto')
 * @property {boolean} preserveCase - Preserve the original case of each word (default: false)
 * @property {boolean} preserveNumbers - Preserve numbers as separate segments (default: false)
 * @property {boolean} preserveAcronym - Preserve acronyms as single segments (default: false)
 * @property {boolean} trim - Trim the input string before splitting (default: true)
 */
export type SplitByCaseOptions = {
  format?: CaseFormat
  preserveCase?: boolean
  preserveNumbers?: boolean
  preserveAcronym?: boolean
  trim?: boolean
}

/**
 * Detects the case format of a string.
 * @param {string} str - The string to detect the case format of.
 * @returns {CaseFormat} The detected case format.
 */
function detectCaseFormat(str: string): CaseFormat {
  if (!str) return 'auto'

  // Check for kebab-case
  if (str.includes('-')) {
    return 'kebab'
  }

  // Check for snake_case
  if (str.includes('_')) {
    return 'snake'
  }

  // Check for PascalCase (starts with uppercase)
  if (/^[A-Z][a-zA-Z0-9]*$/.test(str)) {
    return 'pascal'
  }

  // Default to camelCase
  if (/^[a-z][a-zA-Z0-9]*$/.test(str)) {
    return 'camel'
  }

  return 'auto'
}

/**
 * Checks if a string is an acronym (all uppercase letters)
 * @param {string} str - The string to check
 * @returns {boolean} True if the string is an acronym
 */
function isAcronym(str: string): boolean {
  return /^[A-Z]{2,}$/.test(str)
}

/**
 * Splits a string by number boundaries
 * @param {string} str - The string to split
 * @returns {string[]} Array of segments with numbers separated
 */
function splitByNumbers(str: string): string[] {
  const withSpaces = str.replace(/(\d+)/g, ' $1 ').trim()
  return withSpaces.split(/\s+/).filter(Boolean)
}

/**
 * Splits a camelCase or PascalCase string with acronym preservation
 * @param {string} str - The string to split
 * @param {boolean} preserveAcronym - Whether to preserve acronyms
 * @returns {string[]} Array of segments
 */
function splitCamelOrPascalWithAcronyms(str: string): string[] {
  const result: string[] = []
  let currentWord = ''
  let isCurrentAcronym = false

  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    const isUpper = /[A-Z]/.test(char)

    if (isUpper) {
      // If we're starting a new word or continuing an acronym
      if (currentWord === '' || isCurrentAcronym) {
        currentWord += char
        isCurrentAcronym = true
      } else {
        // End the current word and start a new one
        result.push(currentWord)
        currentWord = char
        isCurrentAcronym = true
      }
    } else {
      // Lowercase character
      if (isCurrentAcronym && currentWord.length > 1) {
        // End the acronym and start a new word with this char
        result.push(currentWord.substring(0, currentWord.length - 1))
        currentWord = currentWord.substring(currentWord.length - 1) + char
        isCurrentAcronym = false
      } else {
        // Continue the current word
        currentWord += char
        isCurrentAcronym = false
      }
    }
  }

  // Add the last word
  if (currentWord) {
    result.push(currentWord)
  }

  return result
}

/**
 * Splits a string by its case format.
 * @param {string} str - The string to split.
 * @param {CaseFormat} format - The case format to use for splitting.
 * @param {boolean} preserveCase - Whether to preserve the original case.
 * @param {boolean} preserveNumbers - Whether to preserve numbers as separate segments.
 * @param {boolean} preserveAcronym - Whether to preserve acronyms as single segments.
 * @returns {string[]} An array of strings split by case format.
 */
function splitStringByCase(
  str: string,
  format: CaseFormat,
  preserveCase: boolean,
  preserveNumbers: boolean,
  preserveAcronym: boolean,
): string[] {
  if (!str) return []

  // Special case for strings that are entirely acronyms
  if (preserveAcronym && isAcronym(str)) {
    return [str]
  }

  let segments: string[] = []

  // First handle number boundaries if preserveNumbers is true
  if (preserveNumbers) {
    const parts = splitByNumbers(str)

    // Process each part based on the format
    for (const part of parts) {
      // If the part is a number, add it directly
      if (/^\d+$/.test(part)) {
        segments.push(part)
      } else {
        // Otherwise, process it based on the format
        const subSegments = processByFormat(part, format, preserveAcronym)
        segments.push(...subSegments)
      }
    }
  } else {
    // Standard processing without preserving numbers
    segments = processByFormat(str, format, preserveAcronym)
  }

  // Apply case transformation
  if (!preserveCase) {
    segments = segments.map((segment) => {
      // If preserveAcronym is true and the segment is an acronym, keep it uppercase
      if (preserveAcronym && isAcronym(segment)) {
        return segment
      }
      return segment.toLowerCase()
    })
  }

  return segments.filter((segment) => segment.length > 0)
}

/**
 * Process a string segment based on its format
 * @param {string} segment - The string segment to process
 * @param {CaseFormat} format - The case format to use
 * @param {boolean} preserveAcronym - Whether to preserve acronyms
 * @returns {string[]} Processed segments
 */
function processByFormat(segment: string, format: CaseFormat, preserveAcronym: boolean): string[] {
  switch (format) {
    case 'camel':
    case 'pascal':
      if (preserveAcronym) {
        return splitCamelOrPascalWithAcronyms(segment)
      }
      return segment.split(/(?=[A-Z])/)
    case 'snake':
      return segment.split('_')
    case 'kebab':
      return segment.split('-')
    case 'auto':
      // Detect format and recursively call with the detected format
      const detectedFormat = detectCaseFormat(segment)
      if (detectedFormat !== 'auto') {
        return processByFormat(segment, detectedFormat, preserveAcronym)
      }
      // If we can't detect a specific format, just return the string as is
      return [segment]
    default:
      return [segment]
  }
}

/**
 * Splits a string by case format, handling spaces and different case formats.
 * @param {string} str - The string to split.
 * @param {SplitByCaseOptions} options - Optional configuration object.
 * @returns {string[]} An array of strings split by case format.
 */
export function splitByCase(str: string, options: SplitByCaseOptions = {}): string[] {
  if (!str) return []

  const {
    format = 'auto',
    preserveCase = false,
    preserveNumbers = false,
    preserveAcronym = false,
    trim = true,
  } = options

  // First split by space
  const spaceSegments = splitBySpace(str, { trim })

  // Then split each segment by case format
  const result: string[] = []
  for (const segment of spaceSegments) {
    const caseSegments = splitStringByCase(
      segment,
      format,
      preserveCase,
      preserveNumbers,
      preserveAcronym,
    )
    result.push(...caseSegments)
  }

  // Filter out any empty strings
  return result.filter((segment) => segment.length > 0)
}
