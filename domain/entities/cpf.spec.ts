import { describe, expect, test } from 'vitest'
import { CPF } from './cpf'

describe('CPF', () => {
  // CPFs válidos para teste (gerados para testes)
  const validCPFs = [
    '529.982.247-25', // com formatação
    '52998224725',    // sem formatação
    '111.444.777-35', // outro CPF válido
    '11144477735',    // sem formatação
    '123.456.789-09', // outro CPF válido
    '12345678909',    // sem formatação
  ]

  // CPFs inválidos
  const invalidCPFs = [
    '000.000.000-00', // todos zeros
    '111.111.111-11', // todos iguais
    '222.222.222-22', // todos iguais
    '333.333.333-33', // todos iguais
    '444.444.444-44', // todos iguais
    '555.555.555-55', // todos iguais
    '666.666.666-66', // todos iguais
    '777.777.777-77', // todos iguais
    '888.888.888-88', // todos iguais
    '999.999.999-99', // todos iguais
    '123.456.789-00', // dígitos verificadores inválidos
    '529.982.247-99', // dígitos verificadores incorretos
    '1234567890',     // menos de 11 dígitos
    '123456789012',   // mais de 11 dígitos
    'abcdefghijk',    // letras
    '',               // vazio
  ]

  describe('constructor', () => {
    test('should create CPF with valid formatted value', () => {
      const cpf = new CPF('529.982.247-25')
      expect(cpf.toString()).toBe('52998224725')
    })

    test('should create CPF with valid unformatted value', () => {
      const cpf = new CPF('52998224725')
      expect(cpf.toString()).toBe('52998224725')
    })

    test('should throw error for invalid CPF', () => {
      expect(() => new CPF('12345678900')).toThrow('CPF inválido')
    })

    test('should throw error for CPF with all same digits', () => {
      expect(() => new CPF('11111111111')).toThrow('CPF inválido')
    })

    test('should throw error for empty CPF', () => {
      expect(() => new CPF('')).toThrow('CPF inválido')
    })
  })

  describe('isValid', () => {
    test.each(validCPFs)('should return true for valid CPF: %s', (cpf) => {
      expect(CPF.isValid(cpf)).toBe(true)
    })

    test.each(invalidCPFs)('should return false for invalid CPF: %s', (cpf) => {
      expect(CPF.isValid(cpf)).toBe(false)
    })

    test('should return false for CPF with incorrect first check digit', () => {
      // 52998224725 é válido, 52998224735 tem primeiro dígito errado
      expect(CPF.isValid('52998224735')).toBe(false)
    })

    test('should return false for CPF with incorrect second check digit', () => {
      // 52998224725 é válido, 52998224726 tem segundo dígito errado
      expect(CPF.isValid('52998224726')).toBe(false)
    })
  })

  describe('clean', () => {
    test('should remove formatting from CPF', () => {
      expect(CPF.clean('529.982.247-25')).toBe('52998224725')
    })

    test('should return same value if already clean', () => {
      expect(CPF.clean('52998224725')).toBe('52998224725')
    })

    test('should remove any non-digit characters', () => {
      expect(CPF.clean('529a982b247c25')).toBe('52998224725')
    })

    test('should return empty string for empty input', () => {
      expect(CPF.clean('')).toBe('')
    })
  })

  describe('toString', () => {
    test('should return clean CPF value', () => {
      const cpf = new CPF('529.982.247-25')
      expect(cpf.toString()).toBe('52998224725')
    })
  })
})
