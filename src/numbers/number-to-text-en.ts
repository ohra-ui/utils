const defaultENOption = {
  negativePrefix: 'minus ',
  onZero: '',
}

/**
 * Converts a number to its English text representation.
 * @param {number} number - The number to convert.
 * @param {Object} opt - Optional configuration object.
 * @param {string} opt.negativePrefix - The prefix to use for negative numbers. Default is 'minus '.
 * @param {string} opt.onZero - The text to use for zero. Default is ''.
 * @returns {string} The English text representation of the number.
 */
export function numberToText_EN(
  number: number,
  opt: { negativePrefix?: string; onZero?: string } = defaultENOption,
): string {
  const single_digit = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  const double_digit = [
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ]
  const below_hundred = [
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ]
  const prefix = number < 0 ? (opt.negativePrefix ?? '') : number === 0 ? opt.onZero : ''
  const positiveNumber = Math.abs(number)

  if (positiveNumber < 10) {
    if (positiveNumber === 0) return single_digit[positiveNumber].trim()
    return prefix + single_digit[positiveNumber].trim()
  }
  if (positiveNumber < 20) {
    return prefix + double_digit[positiveNumber - 10].trim()
  }
  if (positiveNumber < 100) {
    return `${prefix + below_hundred[Math.floor(positiveNumber / 10) - 2]} ${single_digit[positiveNumber % 10]}`.trim()
  }
  if (positiveNumber < 1000) {
    return `${prefix + single_digit[Math.floor(positiveNumber / 100)]} hundred ${numberToText_EN(positiveNumber % 100)}`.trim()
  }
  if (positiveNumber < 1000000) {
    return `${prefix + numberToText_EN(Math.floor(positiveNumber / 1000))} thousand ${numberToText_EN(positiveNumber % 1000)}`.trim()
  }
  if (positiveNumber < 1000000000) {
    return `${prefix + numberToText_EN(Math.floor(positiveNumber / 1000000))} million ${numberToText_EN(positiveNumber % 1000000)}`.trim()
  }
  if (positiveNumber < 1000000000000) {
    return `${prefix + numberToText_EN(Math.floor(positiveNumber / 1000000000))} billion ${numberToText_EN(positiveNumber % 1000000000)}`.trim()
  }
  if (positiveNumber < 1000000000000000) {
    return `${prefix + numberToText_EN(Math.floor(positiveNumber / 1000000000000))} trillion ${numberToText_EN(positiveNumber % 1000000000000)}`.trim()
  }
  if (positiveNumber < 1000000000000000000) {
    return `${prefix}${numberToText_EN(Math.floor(positiveNumber / 1000000000000000))} quadrillion ${numberToText_EN(positiveNumber % 1000000000000000)}`.trim()
  }
  console.warn('numberToText_EN: number is too large')
  return '>> number is too large'
}
