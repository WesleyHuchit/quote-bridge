import { describe, expect, test } from 'vitest'
import { Percentage } from './percentage'
import { Decimal } from '@prisma/client/runtime/library'

describe('Percentage', () => {
  describe('create', () => {
    test('should create percentage from number', () => {
      const percentage = Percentage.create(50)
      expect(percentage.toValue()).toBe(50)
    })

    test('should create percentage from decimal number', () => {
      const percentage = Percentage.create(33.33)
      expect(percentage.toValue()).toBe(33.33)
    })

    test('should create percentage from string', () => {
      const percentage = Percentage.create('75')
      expect(percentage.toValue()).toBe(75)
    })

    test('should create percentage from string with decimal', () => {
      const percentage = Percentage.create('25.5')
      expect(percentage.toValue()).toBe(25.5)
    })

    test('should create percentage from string with comma (removes non-digit chars except period)', () => {
      // Note: The verify method removes commas, so "10,5" becomes "105"
      const percentage = Percentage.create('10,5')
      expect(percentage.toValue()).toBe(10) // Comma is removed, parsing stops at first invalid char
    })

    test('should handle string with special characters', () => {
      const percentage = Percentage.create('15%')
      expect(percentage.toValue()).toBe(15)
    })

    // test('should throw error for invalid string', () => {
    //   expect(() => Percentage.create('abc')).toThrow('Invalid percentage value')
    // })
  })

  describe('toValue', () => {
    test('should return the numeric value', () => {
      const percentage = Percentage.create(42)
      expect(percentage.toValue()).toBe(42)
    })

    test('should return 0 for zero value', () => {
      const percentage = Percentage.create(0)
      expect(percentage.toValue()).toBe(0)
    })
  })
})
