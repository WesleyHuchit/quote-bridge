import { describe, expect, test } from 'vitest'
import { Discount } from './discount'
import { Decimal } from '@prisma/client/runtime/library'

describe('Discount', () => {
  describe('create', () => {
    test('should create discount from number', () => {
      const discount = Discount.create(10)
      expect(discount?.toValue()).toBe(10)
    })

    test('should create discount from string', () => {
      const discount = Discount.create('15')
      expect(discount?.toValue()).toBe(15)
    })

    test('should create discount from string with percentage symbol', () => {
      const discount = Discount.create('20%')
      expect(discount?.toValue()).toBe(20)
    })

    test('should create discount from Decimal', () => {
      const decimal = new Decimal(25.5)
      const discount = Discount.create(decimal)
      expect(discount?.toValue()).toBe(25.5)
    })

    test('should return null for null value', () => {
      const discount = Discount.create(null)
      expect(discount).toBeNull()
    })

    test('should return null for dash value', () => {
      const discount = Discount.create('-')
      expect(discount).toBeNull()
    })

    test('should return null for empty string', () => {
      const discount = Discount.create('')
      expect(discount).toBeNull()
    })
  })

  describe('createWithDecimal', () => {
    test('should create discount from Decimal', () => {
      const decimal = new Decimal(30)
      const discount = Discount.createWithDecimal(decimal)
      expect(discount.toValue()).toBe(30)
    })

    test('should handle decimal values', () => {
      const decimal = new Decimal(15.75)
      const discount = Discount.createWithDecimal(decimal)
      expect(discount.toValue()).toBe(15.75)
    })
  })

  describe('createByDTO', () => {
    test('should create discount from DTO string', () => {
      const discount = Discount.createByDTO('25')
      expect(discount?.toValue()).toBe(25)
    })

    test('should return null for undefined', () => {
      const discount = Discount.createByDTO(undefined)
      expect(discount).toBeNull()
    })

    test('should return null for dash', () => {
      const discount = Discount.createByDTO('-')
      expect(discount).toBeNull()
    })

    test('should return null for empty string', () => {
      const discount = Discount.createByDTO('')
      expect(discount).toBeNull()
    })
  })

  describe('verify', () => {
    test('should return true for dash', () => {
      expect(Discount.verify('-')).toBe(true)
    })

    test('should return true for valid number string', () => {
      expect(Discount.verify('100')).toBe(true)
    })

    test('should return true for valid decimal string', () => {
      expect(Discount.verify('100.50')).toBe(true)
    })

    test('should return true for value with R$ symbol', () => {
      expect(Discount.verify('R$ 100')).toBe(true)
    })

    test('should return true for value with $ symbol', () => {
      expect(Discount.verify('$ 50')).toBe(true)
    })

    test('should return true for value with thousands separator', () => {
      expect(Discount.verify('1.000,00')).toBe(true)
    })
  })

  describe('toValue', () => {
    test('should return the numeric value', () => {
      const discount = Discount.create(42)
      expect(discount?.toValue()).toBe(42)
    })
  })
})
