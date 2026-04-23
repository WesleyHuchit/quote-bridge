import { describe, expect, test } from 'vitest'
import { HasReplacement, HasReplacementEnum } from './has-replacement'

describe('HasReplacement', () => {
  describe('constructor / create', () => {
    test('should create WITH_REPLACEMENT from "T"', () => {
      const hasReplacement = HasReplacement.create('T')
      expect(hasReplacement.toValue()).toBe(HasReplacementEnum.WITH_REPLACEMENT)
    })

    test('should create WITH_REPLACEMENT from "t" (lowercase)', () => {
      const hasReplacement = HasReplacement.create('t')
      expect(hasReplacement.toValue()).toBe(HasReplacementEnum.WITH_REPLACEMENT)
    })

    test('should create WITH_REPLACEMENT from "COM TROCA"', () => {
      const hasReplacement = HasReplacement.create('COM TROCA')
      expect(hasReplacement.toValue()).toBe(HasReplacementEnum.WITH_REPLACEMENT)
    })

    test('should create WITH_REPLACEMENT from "com troca" (lowercase)', () => {
      const hasReplacement = HasReplacement.create('com troca')
      expect(hasReplacement.toValue()).toBe(HasReplacementEnum.WITH_REPLACEMENT)
    })

    test('should create WITHOUT_REPLACEMENT from "S"', () => {
      const hasReplacement = HasReplacement.create('S')
      expect(hasReplacement.toValue()).toBe(HasReplacementEnum.WITHOUT_REPLACEMENT)
    })

    test('should create WITHOUT_REPLACEMENT from "s" (lowercase)', () => {
      const hasReplacement = HasReplacement.create('s')
      expect(hasReplacement.toValue()).toBe(HasReplacementEnum.WITHOUT_REPLACEMENT)
    })

    test('should create WITHOUT_REPLACEMENT from "SEM TROCA"', () => {
      const hasReplacement = HasReplacement.create('SEM TROCA')
      expect(hasReplacement.toValue()).toBe(HasReplacementEnum.WITHOUT_REPLACEMENT)
    })

    test('should create WITHOUT_REPLACEMENT from "sem troca" (lowercase)', () => {
      const hasReplacement = HasReplacement.create('sem troca')
      expect(hasReplacement.toValue()).toBe(HasReplacementEnum.WITHOUT_REPLACEMENT)
    })

    test('should return null for null input', () => {
      const hasReplacement = HasReplacement.create(null)
      expect(hasReplacement.toValue()).toBeNull()
    })

    test('should return null for undefined input', () => {
      const hasReplacement = HasReplacement.create(undefined)
      expect(hasReplacement.toValue()).toBeNull()
    })

    test('should return null for empty string', () => {
      const hasReplacement = HasReplacement.create('')
      expect(hasReplacement.toValue()).toBeNull()
    })

    test('should return null for invalid value', () => {
      const hasReplacement = HasReplacement.create('INVALID')
      expect(hasReplacement.toValue()).toBeNull()
    })
  })

  describe('fromAbbreviation', () => {
    test('should create from abbreviation T', () => {
      const hasReplacement = HasReplacement.fromAbbreviation('T')
      expect(hasReplacement.toValue()).toBe(HasReplacementEnum.WITH_REPLACEMENT)
    })

    test('should create from abbreviation S', () => {
      const hasReplacement = HasReplacement.fromAbbreviation('S')
      expect(hasReplacement.toValue()).toBe(HasReplacementEnum.WITHOUT_REPLACEMENT)
    })
  })

  describe('hasReplacement', () => {
    test('should return true for WITH_REPLACEMENT', () => {
      const hasReplacement = HasReplacement.create('T')
      expect(hasReplacement.hasReplacement()).toBe(true)
    })

    test('should return false for WITHOUT_REPLACEMENT', () => {
      const hasReplacement = HasReplacement.create('S')
      expect(hasReplacement.hasReplacement()).toBe(false)
    })

    test('should return false for null value', () => {
      const hasReplacement = HasReplacement.create(null)
      expect(hasReplacement.hasReplacement()).toBe(false)
    })
  })

  describe('abbreviation', () => {
    test('should return T for WITH_REPLACEMENT', () => {
      const hasReplacement = HasReplacement.create('T')
      expect(hasReplacement.abbreviation).toBe('T')
    })

    test('should return S for WITHOUT_REPLACEMENT', () => {
      const hasReplacement = HasReplacement.create('S')
      expect(hasReplacement.abbreviation).toBe('S')
    })

    test('should return null for null value', () => {
      const hasReplacement = HasReplacement.create(null)
      expect(hasReplacement.abbreviation).toBeNull()
    })
  })

  describe('HasReplacementEnum', () => {
    test('should have WITH_REPLACEMENT as T', () => {
      expect(HasReplacementEnum.WITH_REPLACEMENT).toBe('T')
    })

    test('should have WITHOUT_REPLACEMENT as S', () => {
      expect(HasReplacementEnum.WITHOUT_REPLACEMENT).toBe('S')
    })
  })
})
