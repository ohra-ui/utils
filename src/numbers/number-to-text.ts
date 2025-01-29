import { numberToText_EN } from './number-to-text-en'
import { numberToText_ID } from './number-to-text-id'

/**
 * Converts a number to its text representation.
 * @param {number} number - The number to convert.
 * @param {Object} opt - Optional configuration object.
 * @param {string} opt.lang - The language to use for the conversion. Default is 'en'.
 * @param {string} opt.negativePrefix - The prefix to use for negative numbers. Default is 'minus '.
 * @param {string} opt.onZero - The text to use for zero. Default is ''.
 * @returns {string} The text representation of the number.
 */
export function numberToText(
  number: number,
  opt?: { lang?: 'en' | 'id'; negativePrefix?: string; onZero?: string },
) {
  if (number === 0) return opt?.onZero ?? ''
  if (opt && opt.lang === 'id') return numberToText_ID(number).trim()
  return numberToText_EN(number).trim()
}
