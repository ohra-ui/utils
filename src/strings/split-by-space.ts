/**
 * Options for splitting a string by space
 * @property {boolean} trim - Trim the input string before splitting (default: true)
 * @property {boolean} splitByWhitespace - Split by any whitespace character (space, tab, newline) (default: true)
 */
export type SplitBySpaceOptions = {
  trim?: boolean
  splitByWhitespace?: boolean
}

/**
 * Splits a string by space characters.
 * @param {string} str - The string to split.
 * @param {SplitBySpaceOptions} options - Optional configuration object.
 * @param {boolean} options.trim - Trim the input string before splitting (default: true)
 * @param {boolean} options.splitByWhitespace - Split by any whitespace character (space, tab, newline) (default: true)
 * @returns {string[]} An array of strings split by space.
 */
export function splitBySpace(str: string, options: SplitBySpaceOptions = {}): string[] {
  if (!str) return []

  const { trim = true, splitByWhitespace = true } = options

  // Apply trim to the input string if specified
  const targetStr = trim ? str.trim() : str

  // If the string is empty after trimming, return an empty array
  if (trim && targetStr === '') return []

  // For non-trimmed strings with only spaces, return array of empty strings
  if (!trim && targetStr !== '' && targetStr.trim() === '') {
    // Return an array with empty strings based on the number of spaces
    return targetStr.split('').map(() => '')
  }

  // Split by whitespace or just spaces based on the splitByWhitespace option
  let parts: string[]

  if (splitByWhitespace) {
    // When splitting by any whitespace, we need to handle differently based on trim
    if (trim) {
      // When trim is true, we can simply split by any whitespace
      parts = targetStr.split(/\s+/)
    } else {
      // When trim is false, we need to preserve leading/trailing spaces
      // First, replace consecutive whitespace with a single space
      const normalized = targetStr.replace(/\s+/g, ' ')
      parts = normalized.split(' ')
    }
  } else {
    // When splitting only by spaces, just use the standard split
    parts = targetStr.split(' ')
  }

  // Filter out any empty strings only if trim is true
  return trim ? parts.filter((part) => part !== '') : parts
}
