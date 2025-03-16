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
 *
 * @param {string} str - The camelCase string to split.
 * @returns {string[]} An array of words.
 */
export function splitCamelCase(str: string): string[] {
  if (!str) return []
  if (str.length === 0) return []

  const words: string[] = []
  let currentWord = str[0] || ''

  // Helper function to check if a character is uppercase
  const isUppercase = (char: string): boolean =>
    char === char.toUpperCase() && char !== char.toLowerCase()

  // Helper function to check if a character is lowercase
  const isLowercase = (char: string): boolean =>
    char === char.toLowerCase() && char !== char.toUpperCase()

  // Process the string character by character starting from the second character
  for (let i = 1; i < str.length; i++) {
    const char = str[i]
    const prevChar = str[i - 1]

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
      const nextChar = i + 1 < str.length ? str[i + 1] : null
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
      if (currentWord.length > 1 && i > 1 && isUppercase(str[i - 2])) {
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

  return words
}
