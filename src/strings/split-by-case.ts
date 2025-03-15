import { splitBySpace } from './split-by-space'

/**
 * Supported case formats
 */
export type CaseFormat = 'camel' | 'pascal' | 'snake' | 'kebab' | 'auto'

/**
 * Options for splitting a string by case format
 * @property {CaseFormat} format - The case format to detect (default: 'auto')
 * @property {boolean} preserveCase - Preserve the original case of each word (default: false)
 * @property {boolean} trim - Trim the input string before splitting (default: true)
 */
export type SplitByCaseOptions = {
  format?: CaseFormat
  preserveCase?: boolean
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
 * Splits a string by its case format.
 * @param {string} str - The string to split.
 * @param {CaseFormat} format - The case format to use for splitting.
 * @param {boolean} preserveCase - Whether to preserve the original case.
 * @returns {string[]} An array of strings split by case format.
 */
function splitStringByCase(str: string, format: CaseFormat, preserveCase: boolean): string[] {
  if (!str) return []

  let result: string[] = []

  switch (format) {
    case 'camel':
    case 'pascal':
      // Split by uppercase letters, but keep the uppercase letter with the following word
      result = str.split(/(?=[A-Z])/)
      break
    case 'snake':
      result = str.split('_')
      break
    case 'kebab':
      result = str.split('-')
      break
    case 'auto':
      // Detect format and recursively call with the detected format
      const detectedFormat = detectCaseFormat(str)
      if (detectedFormat !== 'auto') {
        return splitStringByCase(str, detectedFormat, preserveCase)
      }
      // If we can't detect a specific format, just return the string as is
      result = [str]
      break
    default:
      result = [str]
  }

  // Convert to lowercase if not preserving case
  if (!preserveCase) {
    result = result.map((s) => s.toLowerCase())
  }

  return result
}

/**
 * Splits a string by case format, handling spaces and different case formats.
 * @param {string} str - The string to split.
 * @param {SplitByCaseOptions} options - Optional configuration object.
 * @returns {string[]} An array of strings split by case format.
 */
export function splitByCase(str: string, options: SplitByCaseOptions = {}): string[] {
  if (!str) return []

  const { format = 'auto', preserveCase = false, trim = true } = options

  // First split by space
  const spaceSegments = splitBySpace(str, { trim })

  // Then split each segment by case format
  const result: string[] = []
  for (const segment of spaceSegments) {
    const caseSegments = splitStringByCase(segment, format, preserveCase)
    result.push(...caseSegments)
  }

  // Filter out any empty strings
  return result.filter((s) => s.length > 0)
}
