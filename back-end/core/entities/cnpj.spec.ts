import { describe, expect, test } from 'vitest'
import { CNPJ } from './cnpj'

describe('CNPJ', () => {
  // CNPJs válidos para teste (gerados para testes)
  const validCNPJs = [
    '11.222.333/0001-81', // com formatação
    '11222333000181',     // sem formatação
    '27.865.757/0001-02', // outro CNPJ válido
    '27865757000102',     // sem formatação
  ]

  // CNPJs inválidos
  const invalidCNPJs = [
    '00.000.000/0000-00', // todos zeros
    '11.111.111/1111-11', // todos iguais
    '22.222.222/2222-22', // todos iguais
    '12.345.678/0001-00', // dígitos verificadores inválidos
    '11.222.333/0001-99', // dígitos verificadores incorretos
    '123456789012',       // menos de 14 dígitos
    '123456789012345',    // mais de 14 dígitos
    'abcdefghijklmn',     // letras
    '',                   // vazio
  ]

  describe('constructor', () => {
    test('should create CNPJ with valid formatted value', () => {
      const cnpj = new CNPJ('11.222.333/0001-81')
      expect(cnpj.toString()).toBe('11222333000181')
    })

    test('should create CNPJ with valid unformatted value', () => {
      const cnpj = new CNPJ('11222333000181')
      expect(cnpj.toString()).toBe('11222333000181')
    })

    test('should throw error for invalid CNPJ', () => {
      expect(() => new CNPJ('12345678000100')).toThrow('CNPJ inválido')
    })

    test('should throw error for CNPJ with all same digits', () => {
      expect(() => new CNPJ('11111111111111')).toThrow('CNPJ inválido')
    })

    test('should throw error for empty CNPJ', () => {
      expect(() => new CNPJ('')).toThrow('CNPJ inválido')
    })
  })

  describe('isValid', () => {
    test.each(validCNPJs)('should return true for valid CNPJ: %s', (cnpj) => {
      expect(CNPJ.isValid(cnpj)).toBe(true)
    })

    test.each(invalidCNPJs)('should return false for invalid CNPJ: %s', (cnpj) => {
      expect(CNPJ.isValid(cnpj)).toBe(false)
    })

    test('should return false for CNPJ with incorrect first check digit', () => {
      // 11222333000181 é válido, 11222333000191 tem primeiro dígito errado
      expect(CNPJ.isValid('11222333000191')).toBe(false)
    })

    test('should return false for CNPJ with incorrect second check digit', () => {
      // 11222333000181 é válido, 11222333000182 tem segundo dígito errado
      expect(CNPJ.isValid('11222333000182')).toBe(false)
    })
  })

  describe('clean', () => {
    test('should remove formatting from CNPJ', () => {
      expect(CNPJ.clean('11.222.333/0001-81')).toBe('11222333000181')
    })

    test('should return same value if already clean', () => {
      expect(CNPJ.clean('11222333000181')).toBe('11222333000181')
    })

    test('should remove any non-digit characters', () => {
      expect(CNPJ.clean('11a222b333c0001d81')).toBe('11222333000181')
    })

    test('should return empty string for empty input', () => {
      expect(CNPJ.clean('')).toBe('')
    })
  })

  describe('toString', () => {
    test('should return clean CNPJ value', () => {
      const cnpj = new CNPJ('11.222.333/0001-81')
      expect(cnpj.toString()).toBe('11222333000181')
    })
  })
})
