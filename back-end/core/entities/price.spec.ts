import { describe, expect, test } from 'vitest'
import { Price } from './price'
import { Decimal } from '@prisma/client/runtime/library'

describe('Price', () => {
  describe('createWithString', () => {
    test('should parse Brazilian format with R$ symbol and thousands separator: R$ 0.200,00 = 200', () => {
      const price = Price.createWithString('R$ 0.200,00')
      expect(price.toValue()).toBe(200)
    })

    test('should parse Brazilian format: R$ 1.234,56 = 1234.56', () => {
      const price = Price.createWithString('R$ 1.234,56')
      expect(price.toValue()).toBe(1234.56)
    })

    test('should parse Brazilian format: R$ 365,82 = 365.82', () => {
      const price = Price.createWithString('R$ 365,82')
      expect(price.toValue()).toBe(365.82)
    })

    test('should parse Brazilian format without R$ symbol: 1.234,56 = 1234.56', () => {
      const price = Price.createWithString('1.234,56')
      expect(price.toValue()).toBe(1234.56)
    })

    test('should parse simple decimal format: 100.50 = 100.50', () => {
      const price = Price.createWithString('100.50')
      expect(price.toValue()).toBe(100.5)
    })

    test('should parse simple decimal with comma: 100,50 = 100.50', () => {
      const price = Price.createWithString('100,50')
      expect(price.toValue()).toBe(100.5)
    })

    test('should parse integer value: 200 = 200', () => {
      const price = Price.createWithString('200')
      expect(price.toValue()).toBe(200)
    })

    test('should parse value with R$ symbol: R$ 500 = 500', () => {
      const price = Price.createWithString('R$ 500')
      expect(price.toValue()).toBe(500)
    })

    test('should parse large Brazilian format: R$ 10.000,00 = 10000', () => {
      const price = Price.createWithString('R$ 10.000,00')
      expect(price.toValue()).toBe(10000)
    })

    test('should return 0 for empty string', () => {
      const price = Price.createWithString('')
      expect(price.toValue()).toBe(0)
    })

  })

  describe('create', () => {
    test('should create price from number', () => {
      const price = Price.create(150.75)
      expect(price.toValue()).toBe(150.75)
    })

    test('should create price from Decimal', () => {
      const decimal = new Decimal(250.50)
      const price = Price.create(decimal)
      expect(price.toValue()).toBe(250.5)
    })
  })

  describe('createWithNumber', () => {
    test('should create price from number', () => {
      const price = Price.createWithNumber(99.99)
      expect(price.toValue()).toBe(99.99)
    })
  })

  describe('createWithDecimal', () => {
    test('should create price from Decimal', () => {
      const decimal = new Decimal(123.45)
      const price = Price.createWithDecimal(decimal)
      expect(price.toValue()).toBe(123.45)
    })
  })

  // describe('createByDTO', () => {
  //   test('should return null for undefined value', () => {
  //     const price = Price.createByDTO(undefined)
  //     expect(price).toBeNull()
  //   })

  //   test('should parse Brazilian format: R$ 0.200,00 = 200', () => {
  //     const price = Price.createByDTO('R$ 0.200,00')
  //     expect(price?.toValue()).toBe(200)
  //   })

  //   test('should parse simple format: 100.50 = 100.50', () => {
  //     const price = Price.createByDTO('100.50')
  //     expect(price?.toValue()).toBe(100.5)
  //   })
  // })

  describe('toString', () => {
    test('should return string representation', () => {
      const price = Price.createWithNumber(100.50)
      expect(price.toString()).toBe('100.5')
    })

  })
})
