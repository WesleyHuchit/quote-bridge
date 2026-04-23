import { describe, expect, test, vi } from 'vitest'
import { PartType } from './part-type'

// Mock Prisma PartType enum
vi.mock('@prisma/client', () => ({
  PartType: {
    GENUINE: 'GENUINE',
    ORIGINAL: 'ORIGINAL',
    OTHER: 'OTHER',
  },
}))

describe('PartType', () => {
  describe('constructor', () => {
    test('should create GENUINE from "GENUINE"', () => {
      const partType = new PartType('GENUINE')
      expect(partType.toValue()).toBe('GENUINE')
    })

    test('should create GENUINE from "GENUÍNA"', () => {
      const partType = new PartType('GENUÍNA')
      expect(partType.toValue()).toBe('GENUINE')
    })

    test('should create GENUINE from "GENUINA" (without accent)', () => {
      const partType = new PartType('GENUINA')
      expect(partType.toValue()).toBe('GENUINE')
    })

    test('should create GENUINE from lowercase', () => {
      const partType = new PartType('genuína')
      expect(partType.toValue()).toBe('GENUINE')
    })

    test('should create ORIGINAL from "ORIGINAL"', () => {
      const partType = new PartType('ORIGINAL')
      expect(partType.toValue()).toBe('ORIGINAL')
    })

    test('should create ORIGINAL from lowercase', () => {
      const partType = new PartType('original')
      expect(partType.toValue()).toBe('ORIGINAL')
    })

    test('should create OTHER from "OTHER"', () => {
      const partType = new PartType('OTHER')
      expect(partType.toValue()).toBe('OTHER')
    })

    test('should default to OTHER for unknown value', () => {
      const partType = new PartType('UNKNOWN')
      expect(partType.toValue()).toBe('OTHER')
    })

    test('should return undefined for null value', () => {
      const partType = new PartType(undefined)
      expect(partType.toValue()).toBeNull()
    })

    test('should return undefined for empty string', () => {
      const partType = new PartType('')
      expect(partType.toValue()).toBeNull()
    })
  })

  describe('toPTBR', () => {
    test('should return GENUÍNA for GENUINE', () => {
      const partType = new PartType('GENUINE')
      expect(partType.toPTBR()).toBe('GENUÍNA')
    })

    test('should return ORIGINAL for ORIGINAL', () => {
      const partType = new PartType('ORIGINAL')
      expect(partType.toPTBR()).toBe('ORIGINAL')
    })

    test('should return OUTRO for OTHER', () => {
      const partType = new PartType('OTHER')
      expect(partType.toPTBR()).toBe('OUTRO')
    })

    test('should return null for undefined value', () => {
      const partType = new PartType(undefined)
      expect(partType.toPTBR()).toBeNull()
    })
  })

  describe('toValue', () => {
    test('should return the part type value', () => {
      const partType = new PartType('GENUINE')
      expect(partType.toValue()).toBe('GENUINE')
    })

    test('should return null for undefined', () => {
      const partType = new PartType(undefined)
      expect(partType.toValue()).toBeNull()
    })
  })
})
