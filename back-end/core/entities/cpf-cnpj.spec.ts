import { describe, expect, test } from 'vitest'
import { CpfCnpj } from './cpf-cnpj'

describe('CpfCnpj', () => {
  describe('create', () => {
    test('should create with 11 digits (CPF)', () => {
      const cpfCnpj = CpfCnpj.create('12345678901')
      expect(cpfCnpj.value).toBe('12345678901')
    })

    test('should create with 14 digits (CNPJ)', () => {
      const cpfCnpj = CpfCnpj.create('12345678000195')
      expect(cpfCnpj.value).toBe('12345678000195')
    })

    test('should normalize and remove non-digits', () => {
      const cpfCnpj = CpfCnpj.create('529.982.247-25')
      expect(cpfCnpj.value).toBe('52998224725')
    })

    test('should normalize CNPJ with formatting', () => {
      const cpfCnpj = CpfCnpj.create('12.345.678/0001-95')
      expect(cpfCnpj.value).toBe('12345678000195')
    })

    test('should throw when length is not 11 or 14', () => {
      expect(() => CpfCnpj.create('123456')).toThrow(
        'CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos',
      )
      expect(() => CpfCnpj.create('123456789012345')).toThrow(
        'CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos',
      )
    })
  })

  describe('isValid', () => {
    test('should return true for valid CPF', () => {
      expect(CpfCnpj.isValid('529.982.247-25')).toBe(true)
      expect(CpfCnpj.isValid('52998224725')).toBe(true)
      expect(CpfCnpj.isValid('111.444.777-35')).toBe(true)
    })

    test('should return true for valid CNPJ', () => {
      expect(CpfCnpj.isValid('11.222.333/0001-81')).toBe(true)
      expect(CpfCnpj.isValid('11222333000181')).toBe(true)
    })

    test('should return false for invalid CPF', () => {
      expect(CpfCnpj.isValid('12345678900')).toBe(false)
      expect(CpfCnpj.isValid('111.111.111-11')).toBe(false)
    })

    test('should return false for invalid CNPJ', () => {
      expect(CpfCnpj.isValid('12345678000100')).toBe(false)
      expect(CpfCnpj.isValid('11.111.111/1111-11')).toBe(false)
    })

    test('should return false for wrong length or empty', () => {
      expect(CpfCnpj.isValid('123456')).toBe(false)
      expect(CpfCnpj.isValid('123456789012345')).toBe(false)
      expect(CpfCnpj.isValid('')).toBe(false)
    })

    test('should return false for null or undefined', () => {
      expect(CpfCnpj.isValid(null)).toBe(false)
      expect(CpfCnpj.isValid(undefined)).toBe(false)
    })
  })
})
