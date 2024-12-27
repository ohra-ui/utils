const defaultIDOption = {
  negativePrefix: 'minus ',
  onZero: '',
}

/**
 * Converts a number to its Indonesian text representation.
 * @param {number} number - The number to convert.
 * @param {Object} opt - Optional configuration object.
 * @param {string} opt.negativePrefix - The prefix to use for negative numbers. Default is 'minus '.
 * @param {string} opt.onZero - The text to use for zero. Default is ''.
 * @returns {string} The Indonesian text representation of the number.
 */
export function numberToText_ID(
  number: number,
  opt: { negativePrefix?: string; onZero?: string } = defaultIDOption,
): string {
  const numbersTexts = [
    '',
    'satu',
    'dua',
    'tiga',
    'empat',
    'lima',
    'enam',
    'tujuh',
    'delapan',
    'sembilan',
    'sepuluh',
    'sebelas',
  ]

  const prefix = number < 0 ? (opt.negativePrefix ?? '') : number === 0 ? opt.onZero : ''
  const positiveNumber = Math.abs(number)

  if (positiveNumber < 12) {
    if (positiveNumber === 0) return numbersTexts[positiveNumber].trim()
    return prefix + numbersTexts[positiveNumber].trim()
  }
  if (positiveNumber < 20) {
    return `${prefix + numbersTexts[positiveNumber - 10]} belas`.trim()
  }
  if (positiveNumber < 100) {
    return `${prefix + numbersTexts[Math.floor(positiveNumber / 10)]} puluh ${numberToText_ID(positiveNumber % 10)}`.trim()
  }
  if (positiveNumber < 200) {
    return `${prefix}seratus ${numberToText_ID(positiveNumber - 100)}`.trim()
  }
  if (positiveNumber < 1000) {
    return `${prefix + numberToText_ID(Math.floor(positiveNumber / 100))} ratus ${numberToText_ID(positiveNumber % 100)}`.trim()
  }
  if (positiveNumber < 2000) {
    return `${prefix}seribu ${numberToText_ID(positiveNumber - 1000)}`.trim()
  }
  if (positiveNumber < 1000000) {
    return `${prefix + numberToText_ID(Math.floor(positiveNumber / 1000))} ribu ${numberToText_ID(positiveNumber % 1000)}`.trim()
  }
  if (positiveNumber < 1000000000) {
    return `${prefix + numberToText_ID(Math.floor(positiveNumber / 1000000))} juta ${numberToText_ID(positiveNumber % 1000000)}`.trim()
  }
  if (positiveNumber < 1000000000000) {
    return `${prefix + numberToText_ID(Math.floor(positiveNumber / 1000000000))} miliar ${numberToText_ID(positiveNumber % 1000000000)}`.trim()
  }
  if (positiveNumber < 1000000000000000) {
    return `${prefix + numberToText_ID(Math.floor(positiveNumber / 1000000000000))} triliun ${numberToText_ID(positiveNumber % 1000000000000)}`.trim()
  }
  if (positiveNumber < 1000000000000000000) {
    return `${prefix + numberToText_ID(Math.floor(positiveNumber / 1000000000000000))} kuadriliun ${numberToText_ID(positiveNumber % 1000000000000000)}`.trim()
  }
  console.warn('numberToText_ID: number is too large')
  return '>> angka terlalu besar'
}
