import { expect, test } from 'bun:test'
import { numberToText } from '../number-to-text'

test('numberToText one and zeros', () => {
  expect(numberToText(1)).toBe('one')
  expect(numberToText(10)).toBe('ten')
  expect(numberToText(100)).toBe('one hundred')
  expect(numberToText(1000)).toBe('one thousand')
  expect(numberToText(10000)).toBe('ten thousand')
  expect(numberToText(100000)).toBe('one hundred thousand')
  expect(numberToText(1000000)).toBe('one million')
  expect(numberToText(10000000)).toBe('ten million')
  expect(numberToText(100000000)).toBe('one hundred million')
  expect(numberToText(1000000000)).toBe('one billion')
  expect(numberToText(10000000000)).toBe('ten billion')
  expect(numberToText(100000000000)).toBe('one hundred billion')
  expect(numberToText(1000000000000)).toBe('one trillion')
  expect(numberToText(10000000000000)).toBe('ten trillion')
  expect(numberToText(100000000000000)).toBe('one hundred trillion')
  expect(numberToText(1000000000000000)).toBe('one quadrillion')
  expect(numberToText(10000000000000000)).toBe('ten quadrillion')
  expect(numberToText(100000000000000000)).toBe('one hundred quadrillion')
  expect(numberToText(1000000000000000000)).toInclude('>>')
})

test('numberToText all positive numbers', () => {
  expect(numberToText(9)).toBe('nine')
  expect(numberToText(99)).toBe('ninety nine')
  expect(numberToText(999)).toBe('nine hundred ninety nine')
  expect(numberToText(9999)).toBe('nine thousand nine hundred ninety nine')
  expect(numberToText(99999)).toBe('ninety nine thousand nine hundred ninety nine')
  expect(numberToText(999999)).toBe('nine hundred ninety nine thousand nine hundred ninety nine')
  expect(numberToText(9999999)).toBe(
    'nine million nine hundred ninety nine thousand nine hundred ninety nine',
  )
  expect(numberToText(99999999)).toBe(
    'ninety nine million nine hundred ninety nine thousand nine hundred ninety nine',
  )
  expect(numberToText(999999999)).toBe(
    'nine hundred ninety nine million nine hundred ninety nine thousand nine hundred ninety nine',
  )
  expect(numberToText(9999999999)).toBe(
    'nine billion nine hundred ninety nine million nine hundred ninety nine thousand nine hundred ninety nine',
  )
  expect(numberToText(99999999999)).toBe(
    'ninety nine billion nine hundred ninety nine million nine hundred ninety nine thousand nine hundred ninety nine',
  )
  expect(numberToText(999999999999)).toBe(
    'nine hundred ninety nine billion nine hundred ninety nine million nine hundred ninety nine thousand nine hundred ninety nine',
  )
  expect(numberToText(9999999999999)).toBe(
    'nine trillion nine hundred ninety nine billion nine hundred ninety nine million nine hundred ninety nine thousand nine hundred ninety nine',
  )
  expect(numberToText(99999999999999)).toBe(
    'ninety nine trillion nine hundred ninety nine billion nine hundred ninety nine million nine hundred ninety nine thousand nine hundred ninety nine',
  )
  expect(numberToText(999999999999999)).toBe(
    'nine hundred ninety nine trillion nine hundred ninety nine billion nine hundred ninety nine million nine hundred ninety nine thousand nine hundred ninety nine',
  )
  // biome-ignore lint/correctness/noPrecisionLoss: numberToText using Math.abs to avoid precision loss until 16 digits
  expect(numberToText(9999999999999999)).toBe('ten quadrillion')
  // biome-ignore lint/correctness/noPrecisionLoss: numberToText using Math.abs to avoid precision loss until 16 digits
  expect(numberToText(99999999999999999)).toBe('one hundred quadrillion')
  // biome-ignore lint/correctness/noPrecisionLoss: numberToText using Math.abs to avoid precision loss until 16 digits
  expect(numberToText(999999999999999999)).toInclude('>>')
})

test('numberToText one and zeros with option.lang: id', () => {
  const opt = { lang: 'id' } as const
  expect(numberToText(1, opt)).toBe('satu')
  expect(numberToText(10, opt)).toBe('sepuluh')
  expect(numberToText(100, opt)).toBe('seratus')
  expect(numberToText(1000, opt)).toBe('seribu')
  expect(numberToText(10000, opt)).toBe('sepuluh ribu')
  expect(numberToText(100000, opt)).toBe('seratus ribu')
  expect(numberToText(1000000, opt)).toBe('satu juta')
  expect(numberToText(10000000, opt)).toBe('sepuluh juta')
  expect(numberToText(100000000, opt)).toBe('seratus juta')
  expect(numberToText(1000000000, opt)).toBe('satu miliar')
  expect(numberToText(10000000000, opt)).toBe('sepuluh miliar')
  expect(numberToText(100000000000, opt)).toBe('seratus miliar')
  expect(numberToText(1000000000000, opt)).toBe('satu triliun')
  expect(numberToText(10000000000000, opt)).toBe('sepuluh triliun')
  expect(numberToText(100000000000000, opt)).toBe('seratus triliun')
  expect(numberToText(1000000000000000, opt)).toBe('satu kuadriliun')
  expect(numberToText(10000000000000000, opt)).toBe('sepuluh kuadriliun')
  expect(numberToText(100000000000000000, opt)).toBe('seratus kuadriliun')
  expect(numberToText(1000000000000000000, opt)).toInclude('>>')
})

test('numberToText all positive numbers with option.lang: id', () => {
  const opt = { lang: 'id' } as const
  expect(numberToText(9, opt)).toBe('sembilan')
  expect(numberToText(99, opt)).toBe('sembilan puluh sembilan')
  expect(numberToText(999, opt)).toBe('sembilan ratus sembilan puluh sembilan')
  expect(numberToText(9999, opt)).toBe('sembilan ribu sembilan ratus sembilan puluh sembilan')
  expect(numberToText(99999, opt)).toBe(
    'sembilan puluh sembilan ribu sembilan ratus sembilan puluh sembilan',
  )
  expect(numberToText(999999, opt)).toBe(
    'sembilan ratus sembilan puluh sembilan ribu sembilan ratus sembilan puluh sembilan',
  )
  expect(numberToText(9999999, opt)).toBe(
    'sembilan juta sembilan ratus sembilan puluh sembilan ribu sembilan ratus sembilan puluh sembilan',
  )
  expect(numberToText(99999999, opt)).toBe(
    'sembilan puluh sembilan juta sembilan ratus sembilan puluh sembilan ribu sembilan ratus sembilan puluh sembilan',
  )
  expect(numberToText(999999999, opt)).toBe(
    'sembilan ratus sembilan puluh sembilan juta sembilan ratus sembilan puluh sembilan ribu sembilan ratus sembilan puluh sembilan',
  )
  expect(numberToText(9999999999, opt)).toBe(
    'sembilan miliar sembilan ratus sembilan puluh sembilan juta sembilan ratus sembilan puluh sembilan ribu sembilan ratus sembilan puluh sembilan',
  )
  expect(numberToText(99999999999, opt)).toBe(
    'sembilan puluh sembilan miliar sembilan ratus sembilan puluh sembilan juta sembilan ratus sembilan puluh sembilan ribu sembilan ratus sembilan puluh sembilan',
  )
  expect(numberToText(999999999999, opt)).toBe(
    'sembilan ratus sembilan puluh sembilan miliar sembilan ratus sembilan puluh sembilan juta sembilan ratus sembilan puluh sembilan ribu sembilan ratus sembilan puluh sembilan',
  )
  expect(numberToText(9999999999999, opt)).toBe(
    'sembilan triliun sembilan ratus sembilan puluh sembilan miliar sembilan ratus sembilan puluh sembilan juta sembilan ratus sembilan puluh sembilan ribu sembilan ratus sembilan puluh sembilan',
  )
  expect(numberToText(99999999999999, opt)).toBe(
    'sembilan puluh sembilan triliun sembilan ratus sembilan puluh sembilan miliar sembilan ratus sembilan puluh sembilan juta sembilan ratus sembilan puluh sembilan ribu sembilan ratus sembilan puluh sembilan',
  )
  expect(numberToText(999999999999999, opt)).toBe(
    'sembilan ratus sembilan puluh sembilan triliun sembilan ratus sembilan puluh sembilan miliar sembilan ratus sembilan puluh sembilan juta sembilan ratus sembilan puluh sembilan ribu sembilan ratus sembilan puluh sembilan',
  )
  // biome-ignore lint/correctness/noPrecisionLoss: numberToText using Math.abs to avoid precision loss until 16 digits
  expect(numberToText(9999999999999999, opt)).toBe('sepuluh kuadriliun')
  // biome-ignore lint/correctness/noPrecisionLoss: numberToText using Math.abs to avoid precision loss until 16 digits
  expect(numberToText(99999999999999999, opt)).toBe('seratus kuadriliun')
  // biome-ignore lint/correctness/noPrecisionLoss: numberToText using Math.abs to avoid precision loss until 16 digits
  expect(numberToText(999999999999999999, opt)).toInclude('>>')
})
