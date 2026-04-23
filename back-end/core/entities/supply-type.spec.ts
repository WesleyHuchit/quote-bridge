import { describe, expect, test, vi } from 'vitest'
import { SupplyType, SupplyTypeEnum } from './supply-type'

// Mock Prisma SupplyType
vi.mock('@prisma/client', () => ({
  SupplyType: {
    INSURER: 'INSURER',
    WORKSHOP: 'WORKSHOP',
  },
}))

describe('SupplyType', () => {
  describe('SupplyTypeEnum', () => {
    test('should have INSURER value', () => {
      expect(SupplyTypeEnum.INSURER).toBe('INSURER')
    })

    test('should have WORKSHOP value', () => {
      expect(SupplyTypeEnum.WORKSHOP).toBe('WORKSHOP')
    })
  })

  describe('constructor / create', () => {
    test('should create WORKSHOP from "WORKSHOP"', () => {
      const supplyType = SupplyType.create('WORKSHOP')
      expect(supplyType.toValue()).toBe('WORKSHOP')
    })

    test('should create WORKSHOP from "workshop" (lowercase)', () => {
      const supplyType = SupplyType.create('workshop')
      expect(supplyType.toValue()).toBe('WORKSHOP')
    })

    test('should create WORKSHOP from "OFICINA"', () => {
      const supplyType = SupplyType.create('OFICINA')
      expect(supplyType.toValue()).toBe('WORKSHOP')
    })

    test('should create WORKSHOP from "oficina" (lowercase)', () => {
      const supplyType = SupplyType.create('oficina')
      expect(supplyType.toValue()).toBe('WORKSHOP')
    })

    test('should create INSURER from "INSURER"', () => {
      const supplyType = SupplyType.create('INSURER')
      expect(supplyType.toValue()).toBe('INSURER')
    })

    test('should create INSURER from "insurer" (lowercase)', () => {
      const supplyType = SupplyType.create('insurer')
      expect(supplyType.toValue()).toBe('INSURER')
    })

    test('should create INSURER from "SEGURADORA"', () => {
      const supplyType = SupplyType.create('SEGURADORA')
      expect(supplyType.toValue()).toBe('INSURER')
    })

    test('should create INSURER from "seguradora" (lowercase)', () => {
      const supplyType = SupplyType.create('seguradora')
      expect(supplyType.toValue()).toBe('INSURER')
    })

    test('should return null for null input', () => {
      const supplyType = SupplyType.create(null)
      expect(supplyType.toValue()).toBeNull()
    })

    test('should return null for undefined input', () => {
      const supplyType = SupplyType.create(undefined)
      expect(supplyType.toValue()).toBeNull()
    })

    test('should return null for invalid value', () => {
      const supplyType = SupplyType.create('INVALID')
      expect(supplyType.toValue()).toBeNull()
    })
  })

  describe('isSuppliedByTheShop', () => {
    test('should return true for WORKSHOP', () => {
      const supplyType = SupplyType.create('WORKSHOP')
      expect(supplyType.isSuppliedByTheShop()).toBe(true)
    })

    test('should return false for INSURER', () => {
      const supplyType = SupplyType.create('INSURER')
      expect(supplyType.isSuppliedByTheShop()).toBe(false)
    })

    test('should return false for null value', () => {
      const supplyType = SupplyType.create(null)
      expect(supplyType.isSuppliedByTheShop()).toBe(false)
    })
  })

  describe('toPTBR', () => {
    test('should return OFICINA for WORKSHOP', () => {
      const supplyType = SupplyType.create('WORKSHOP')
      expect(supplyType.toPTBR()).toBe('OFICINA')
    })

    test('should return SEGURADORA for INSURER', () => {
      const supplyType = SupplyType.create('INSURER')
      expect(supplyType.toPTBR()).toBe('SEGURADORA')
    })

    test('should return null for null value', () => {
      const supplyType = SupplyType.create(null)
      expect(supplyType.toPTBR()).toBeNull()
    })
  })

  describe('toValue', () => {
    test('should return the supply type value', () => {
      const supplyType = SupplyType.create('WORKSHOP')
      expect(supplyType.toValue()).toBe('WORKSHOP')
    })
  })
})
