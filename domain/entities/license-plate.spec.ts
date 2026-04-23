import { describe, expect, test } from 'vitest'
import { LicensePlate } from './license-plate'

describe('LicensePlate', () => {
  describe('transform', () => {
    // Formato antigo: ABC-1234
    test('should transform valid old format plate', () => {
      const plate = LicensePlate.transform('ABC-1234')
      expect(plate.toString).toBe('ABC-1234')
    })

    test('should transform valid old format plate without dash', () => {
      const plate = LicensePlate.transform('ABC1234')
      expect(plate.toString).toBe('ABC1234')
    })

    // Formato Mercosul: ABC1D23
    test('should transform valid Mercosul format plate', () => {
      const plate = LicensePlate.transform('ABC1D23')
      expect(plate.toString).toBe('ABC1D23')
    })

    test('should transform lowercase to uppercase', () => {
      const plate = LicensePlate.transform('abc1234')
      expect(plate.toString).toBe('ABC1234')
    })

    test('should handle plate with spaces', () => {
      const plate = LicensePlate.transform('ABC 1234')
      expect(plate.toString).toBe('ABC 1234')
    })

    test('should throw error for invalid format - too short', () => {
      expect(() => LicensePlate.transform('ABC12')).toThrow('Invalid license plate format')
    })

    test('should throw error for invalid format - wrong pattern', () => {
      expect(() => LicensePlate.transform('1234ABC')).toThrow('Invalid license plate format')
    })

    test('should throw error for invalid format - all letters', () => {
      expect(() => LicensePlate.transform('ABCDEFG')).toThrow('Invalid license plate format')
    })

    test('should throw error for invalid format - all numbers', () => {
      expect(() => LicensePlate.transform('1234567')).toThrow('Invalid license plate format')
    })
  })

  describe('create', () => {
    test('should create plate without validation', () => {
      const plate = LicensePlate.create('ABC-1234')
      expect(plate.toString).toBe('ABC-1234')
    })

    test('should create plate with any value', () => {
      const plate = LicensePlate.create('any-value')
      expect(plate.toString).toBe('any-value')
    })
  })

  describe('toString', () => {
    test('should return the plate value', () => {
      const plate = LicensePlate.create('XYZ-9999')
      expect(plate.toString).toBe('XYZ-9999')
    })
  })

  describe('equals', () => {
    test('should return true for same plate value', () => {
      const plate1 = LicensePlate.create('ABC-1234')
      const plate2 = LicensePlate.create('ABC-1234')
      expect(plate1.equals(plate2)).toBe(true)
    })

    test('should return false for different plate values', () => {
      const plate1 = LicensePlate.create('ABC-1234')
      const plate2 = LicensePlate.create('XYZ-9999')
      expect(plate1.equals(plate2)).toBe(false)
    })
  })
})
