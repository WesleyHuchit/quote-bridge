import { describe, expect, test } from 'vitest'
import { PhoneNumber } from './phone-number'

describe('PhoneNumber', () => {
  // Números válidos
  const validPhones = {
    mobile: [
      '11987654321',       // SP celular
      '(11) 98765-4321',   // SP celular formatado
      '21999998888',       // RJ celular
      '31912345678',       // MG celular
    ],
    landline: [
      '1132145678',        // SP fixo
      '(11) 3214-5678',    // SP fixo formatado
      '2132145678',        // RJ fixo
      '3132145678',        // MG fixo
    ],
  }

  // Números inválidos
  const invalidPhones = [
    '123456789',           // menos de 10 dígitos
    '123456789012',        // mais de 11 dígitos
    '0012345678',          // DDD inválido (00)
    '1012345678',          // DDD inválido (10)
    '2012345678',          // DDD inválido (20)
    '11112345678',         // celular não começa com 9
    '',                    // vazio
    'abcdefghij',          // letras
  ]

  describe('constructor', () => {
    test('should create phone number from valid mobile', () => {
      const phone = new PhoneNumber('11987654321')
      expect(phone.toString()).toBe('11987654321')
    })

    test('should create phone number from valid landline', () => {
      const phone = new PhoneNumber('1132145678')
      expect(phone.toString()).toBe('1132145678')
    })

    test('should create phone from formatted value', () => {
      const phone = new PhoneNumber('(11) 98765-4321')
      expect(phone.toString()).toBe('11987654321')
    })

    test('should throw error for invalid phone', () => {
      expect(() => new PhoneNumber('123')).toThrow('Número de telefone inválido')
    })

    test('should throw error for invalid DDD', () => {
      expect(() => new PhoneNumber('0012345678')).toThrow('Número de telefone inválido')
    })
  })

  describe('isValid', () => {
    test.each(validPhones.mobile)('should return true for valid mobile: %s', (phone) => {
      expect(PhoneNumber.isValid(phone)).toBe(true)
    })

    test.each(validPhones.landline)('should return true for valid landline: %s', (phone) => {
      expect(PhoneNumber.isValid(phone)).toBe(true)
    })

    test.each(invalidPhones)('should return false for invalid phone: %s', (phone) => {
      expect(PhoneNumber.isValid(phone)).toBe(false)
    })

    test('should return false for landline starting with 0', () => {
      expect(PhoneNumber.isValid('1102345678')).toBe(false)
    })

    test('should return false for landline starting with 1', () => {
      expect(PhoneNumber.isValid('1112345678')).toBe(false)
    })
  })

  describe('clean', () => {
    test('should remove formatting', () => {
      expect(PhoneNumber.clean('(11) 98765-4321')).toBe('11987654321')
    })

    test('should remove all non-digit characters', () => {
      expect(PhoneNumber.clean('11a98b76c54d32e1')).toBe('11987654321')
    })

    test('should return same value if already clean', () => {
      expect(PhoneNumber.clean('11987654321')).toBe('11987654321')
    })
  })

  describe('format', () => {
    test('should format 10-digit landline', () => {
      expect(PhoneNumber.format('1132145678')).toBe('(11) 3214-5678')
    })

    test('should format 11-digit mobile', () => {
      expect(PhoneNumber.format('11987654321')).toBe('(11) 98765-4321')
    })

    test('should return as-is if invalid length', () => {
      expect(PhoneNumber.format('123')).toBe('123')
    })
  })

  describe('toFormattedString', () => {
    test('should return formatted landline', () => {
      const phone = new PhoneNumber('1132145678')
      expect(phone.toFormattedString()).toBe('(11) 3214-5678')
    })

    test('should return formatted mobile', () => {
      const phone = new PhoneNumber('11987654321')
      expect(phone.toFormattedString()).toBe('(11) 98765-4321')
    })
  })

  describe('isMobile', () => {
    test('should return true for mobile number', () => {
      const phone = new PhoneNumber('11987654321')
      expect(phone.isMobile()).toBe(true)
    })

    test('should return false for landline', () => {
      const phone = new PhoneNumber('1132145678')
      expect(phone.isMobile()).toBe(false)
    })
  })

  describe('getDDD', () => {
    test('should return DDD from phone', () => {
      const phone = new PhoneNumber('21987654321')
      expect(phone.getDDD()).toBe('21')
    })
  })

  describe('getNumber', () => {
    test('should return number without DDD for mobile', () => {
      const phone = new PhoneNumber('11987654321')
      expect(phone.getNumber()).toBe('987654321')
    })

    test('should return number without DDD for landline', () => {
      const phone = new PhoneNumber('1132145678')
      expect(phone.getNumber()).toBe('32145678')
    })
  })
})
