import { describe, expect, test } from 'vitest'
import { CpfOrCnpj } from './cpfOrCnpj'

describe('CpfOrCnpj', () => {
  // CPFs válidos
  const validCPFs = [
    '529.982.247-25',
    '52998224725',
    '111.444.777-35',
  ]

  // CNPJs válidos
  const validCNPJs = [
    '11.222.333/0001-81',
    '11222333000181',
    '27.865.757/0001-02',
  ]

  // Valores inválidos
  const invalidValues = [
    '12345678900',        // CPF inválido
    '12345678000100',     // CNPJ inválido
    '111.111.111-11',     // CPF todos iguais
    '11.111.111/1111-11', // CNPJ todos iguais
    '123456',             // muito curto
    '1234567890123456',   // muito longo
    '',                   // vazio
    'abcdefghijk',        // letras
  ]

  describe('constructor', () => {
    test('should create with valid CPF (formatted)', () => {
      const doc = new CpfOrCnpj('529.982.247-25')
      expect(doc.toString()).toBe('52998224725')
    })

    test('should create with valid CPF (unformatted)', () => {
      const doc = new CpfOrCnpj('52998224725')
      expect(doc.toString()).toBe('52998224725')
    })

    test('should create with valid CNPJ (formatted)', () => {
      const doc = new CpfOrCnpj('11.222.333/0001-81')
      expect(doc.toString()).toBe('11222333000181')
    })

    test('should create with valid CNPJ (unformatted)', () => {
      const doc = new CpfOrCnpj('11222333000181')
      expect(doc.toString()).toBe('11222333000181')
    })

    test('should throw error for invalid CPF', () => {
      expect(() => new CpfOrCnpj('12345678900')).toThrow('CPF inválido')
    })

    test('should throw error for invalid CNPJ', () => {
      expect(() => new CpfOrCnpj('12345678000100')).toThrow('CNPJ inválido')
    })

    test('should throw error for invalid length', () => {
      expect(() => new CpfOrCnpj('123456')).toThrow('CPF ou CNPJ inválido')
    })

    test('should throw error for too long value', () => {
      expect(() => new CpfOrCnpj('1234567890123456')).toThrow('CPF ou CNPJ inválido')
    })

    test('should throw error for empty value', () => {
      expect(() => new CpfOrCnpj('')).toThrow('CPF ou CNPJ inválido')
    })
  })

  describe('isCPF', () => {
    test.each(validCPFs)('should return true for CPF: %s', (cpf) => {
      const doc = new CpfOrCnpj(cpf)
      expect(doc.isCPF()).toBe(true)
    })

    test.each(validCNPJs)('should return false for CNPJ: %s', (cnpj) => {
      const doc = new CpfOrCnpj(cnpj)
      expect(doc.isCPF()).toBe(false)
    })
  })

  describe('isCNPJ', () => {
    test.each(validCNPJs)('should return true for CNPJ: %s', (cnpj) => {
      const doc = new CpfOrCnpj(cnpj)
      expect(doc.isCNPJ()).toBe(true)
    })

    test.each(validCPFs)('should return false for CPF: %s', (cpf) => {
      const doc = new CpfOrCnpj(cpf)
      expect(doc.isCNPJ()).toBe(false)
    })
  })

  describe('toString', () => {
    test('should return clean CPF value', () => {
      const doc = new CpfOrCnpj('529.982.247-25')
      expect(doc.toString()).toBe('52998224725')
    })

    test('should return clean CNPJ value', () => {
      const doc = new CpfOrCnpj('11.222.333/0001-81')
      expect(doc.toString()).toBe('11222333000181')
    })
  })
})
