import { describe, expect, test } from 'vitest'
import { Time } from './time'
import { Decimal } from '@prisma/client/runtime/library'

describe('Time', () => {
  describe('create', () => {
    test('should create time from number', () => {
      const time = Time.create(2.5)
      expect(time.toValue()).toBe(2.5)
    })

    test('should create time from integer number', () => {
      const time = Time.create(5)
      expect(time.toValue()).toBe(5)
    })

    test('should create time from Decimal', () => {
      const decimal = new Decimal(3.75)
      const time = Time.create(decimal)
      expect(time.toValue()).toBe(3.75)
    })

    test('should create time from string', () => {
      const time = Time.create('4.5')
      expect(time.toValue()).toBe(4.5)
    })

    test('should create time from string with comma', () => {
      const time = Time.create('2,5')
      expect(time.toValue()).toBe(2.5)
    })

    test('should create time from string with R$ symbol', () => {
      const time = Time.create('R$ 1.5')
      expect(time.toValue()).toBe(1.5)
    })

    test('should create time from string with thousands separator', () => {
      const time = Time.create('1.000,50')
      expect(time.toValue()).toBe(1000.5)
    })

    test('should return 0 for invalid format', () => {
      const time = Time.create('invalid')
      expect(time.toValue()).toBe(0)
    })
  })

  describe('toValue', () => {
    test('should return the numeric value', () => {
      const time = Time.create(10)
      expect(time.toValue()).toBe(10)
    })

    test('should return 0 for zero value', () => {
      const time = Time.create(0)
      expect(time.toValue()).toBe(0)
    })
  })
})
