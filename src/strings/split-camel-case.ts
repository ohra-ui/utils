/**
 * Splits a camelCase string into an array of words.
 *
 * @example
 * splitCamelCase('helloWorld') // ['hello', 'World']
 * splitCamelCase('helloWORLD') // ['hello', 'WORLD']
 * splitCamelCase('HelloWorld') // ['Hello', 'World']
 * splitCamelCase('helloWorldAgain') // ['hello', 'World', 'Again']
 * splitCamelCase('hello') // ['hello']
 * splitCamelCase('hello123World') // ['hello123', 'World']
 * splitCamelCase('testCASE') // ['test', 'CASE']
 * splitCamelCase('hello123World!@#') // ['hello123', 'World!@#']
 * splitCamelCase('hello123World!@#', { preserveNumbers: false }) // ['hello', '123', 'World!@#']
 * splitCamelCase('hello123World!@#', { preserveSpecials: false }) // ['hello123', 'World', '!@#']
 * splitCamelCase('hello123World!@#', { preserveNumbers: false, preserveSpecials: false }) // ['hello', '123', 'World', '!@#']
 *
 * @param {string} str - The camelCase string to split.
 * @param {Object} options - Options for splitting.
 * @param {boolean} options.preserveNumbers - Whether to preserve numbers as part of words. Default is true.
 * @param {boolean} options.preserveSpecials - Whether to preserve special characters as part of words. Default is true.
 * @returns {string[]} An array of words.
 */
export function splitCamelCase(
  str: string,
  options: {
    preserveNumbers?: boolean
    preserveSpecials?: boolean
  } = {},
): string[] {
  if (!str) return []
  if (str.length === 0) return []

  // Set default options
  const { preserveNumbers = true, preserveSpecials = true } = options

  // If we need to split by numbers or special characters, do it first
  let initialWords: string[] = [str]

  if (!preserveNumbers) {
    // Split by numbers and keep the numbers as separate words
    initialWords = initialWords.flatMap((word) => {
      return word.split(/(\d+)/).filter(Boolean)
    })
  }

  if (!preserveSpecials) {
    // Split by special characters and keep them as separate words
    initialWords = initialWords.flatMap((word) => {
      return word.split(/([^\w\s]+)/).filter(Boolean)
    })
  }

  // Now process each word for camelCase splitting
  const words: string[] = []

  for (const word of initialWords) {
    let currentWord = word[0] || ''

    // Helper function to check if a character is uppercase
    const isUppercase = (char: string): boolean =>
      char === char.toUpperCase() && char !== char.toLowerCase()

    // Helper function to check if a character is lowercase
    const isLowercase = (char: string): boolean =>
      char === char.toLowerCase() && char !== char.toUpperCase()

    // Process the string character by character starting from the second character
    for (let i = 1; i < word.length; i++) {
      const char = word[i]
      const prevChar = word[i - 1]

      // Case 1: Current char is uppercase and previous is not uppercase
      // This is a new word boundary (e.g., "helloWorld" -> "hello|World")
      if (isUppercase(char) && !isUppercase(prevChar)) {
        words.push(currentWord)
        currentWord = char
      }
      // Case 2: Current char is uppercase and previous char is uppercase
      // Check if it's part of an uppercase sequence (e.g., "testCASE" -> "test|CASE")
      else if (isUppercase(char) && isUppercase(prevChar)) {
        // If next char is lowercase or we're at the end, this is the end of the uppercase sequence
        const nextChar = i + 1 < word.length ? word[i + 1] : null
        if (nextChar && isLowercase(nextChar) && currentWord.length > 1) {
          // End of uppercase sequence, start a new word
          words.push(currentWord)
          currentWord = char
        } else {
          // Continue the uppercase sequence
          currentWord += char
        }
      }
      // Case 3: Current char is lowercase and previous char is uppercase
      else if (isLowercase(char) && isUppercase(prevChar)) {
        // If we have more than one character in the current word and the character before
        // the previous one is also uppercase, then the previous char starts a new word
        if (currentWord.length > 1 && i > 1 && isUppercase(word[i - 2])) {
          // The previous uppercase char belongs to a new word
          words.push(currentWord.slice(0, -1))
          currentWord = prevChar + char
        } else {
          // Regular camelCase, just continue the current word
          currentWord += char
        }
      }
      // Case 4: All other cases (lowercase after lowercase, etc.)
      else {
        currentWord += char
      }
    }

    // Add the last word if it's not empty
    if (currentWord) {
      words.push(currentWord)
    }
  }

  return words
}
