import { describe, expect, test } from 'vitest'
import { Title } from './title'

describe('Title', () => {
  describe('create', () => {
    test('should create title from string', () => {
      const title = Title.create('Test Title')
      expect(title.toValue()).toBe('Test Title')
    })

    test('should preserve original value', () => {
      const title = Title.create('UPPERCASE TITLE')
      expect(title.toValue()).toBe('UPPERCASE TITLE')
    })
  })

  describe('createNormalized', () => {
    test('should create normalized title', () => {
      const title = Title.createNormalized('Test Title')
      expect(title.toValue()).toBe('test title')
    })

    test('should remove text in parentheses', () => {
      const title = Title.createNormalized('Title (extra info)')
      expect(title.toValue()).toBe('title')
    })

    test('should remove special characters', () => {
      const title = Title.createNormalized('Title! @#$%')
      expect(title.toValue()).toBe('title')
    })

    test('should remove word "nova"', () => {
      const title = Title.createNormalized('Nova Peça')
      expect(title.toValue()).toBe('peça')
    })

    test('should replace multiple spaces with single space', () => {
      const title = Title.createNormalized('Title   with   spaces')
      expect(title.toValue()).toBe('title with spaces')
    })

    test('should trim leading and trailing spaces', () => {
      const title = Title.createNormalized('  Title  ')
      expect(title.toValue()).toBe('title')
    })

    test('should remove leading "y " if present', () => {
      const title = Title.createNormalized('y Title')
      expect(title.toValue()).toBe('title')
    })
  })

  describe('toTitleCase', () => {
    test('should convert to title case', () => {
      const title = Title.create('hello world')
      expect(title.toTitleCase()).toBe('Hello World')
    })

    test('should handle uppercase input', () => {
      const title = Title.create('HELLO WORLD')
      expect(title.toTitleCase()).toBe('Hello World')
    })

    test('should handle mixed case input', () => {
      const title = Title.create('hElLo WoRlD')
      expect(title.toTitleCase()).toBe('Hello World')
    })

    test('should trim and handle multiple spaces', () => {
      const title = Title.create('  hello   world  ')
      expect(title.toTitleCase()).toBe('Hello World')
    })
  })

  describe('normalizeTitle', () => {
    test('should normalize title to lowercase', () => {
      expect(Title.normalizeTitle('TITLE')).toBe('title')
    })

    test('should remove text in parentheses', () => {
      expect(Title.normalizeTitle('Title (info)')).toBe('title')
    })

    test('should remove special characters', () => {
      expect(Title.normalizeTitle('Title@#$!')).toBe('title')
    })

    test('should keep letters with accents', () => {
      expect(Title.normalizeTitle('Título')).toBe('título')
    })

    test('should remove "nova" word', () => {
      expect(Title.normalizeTitle('Nova Peça')).toBe('peça')
    })
  })

  describe('similarity', () => {
    test('should return true for identical titles', () => {
      const title1 = Title.create('Same Title')
      const title2 = Title.create('Same Title')
      expect(title1.similarity(title2)).toBe(true)
    })

    test('should return true for very similar titles (>90%)', () => {
      const title1 = Title.create('Test Title')
      const title2 = Title.create('Test Titlee')
      expect(title1.similarity(title2)).toBe(true)
    })

    test('should return false for different titles (<90%)', () => {
      const title1 = Title.create('First Title')
      const title2 = Title.create('Completely Different')
      expect(title1.similarity(title2)).toBe(false)
    })
  })

  describe('toValue', () => {
    test('should return the title value', () => {
      const title = Title.create('My Title')
      expect(title.toValue()).toBe('My Title')
    })
  })
})
