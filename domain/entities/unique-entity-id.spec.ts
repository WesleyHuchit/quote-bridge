import { describe, expect, test } from 'vitest'
import { UniqueEntityId } from './unique-entity-id'

describe('UniqueEntityId', () => {
  describe('constructor', () => {
    test('should generate UUID when no value provided', () => {
      const id = new UniqueEntityId()
      expect(id.toValue()).toBeTruthy()
      // UUID format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
      expect(id.toValue()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)
    })

    test('should use provided value', () => {
      const id = new UniqueEntityId('custom-id-123')
      expect(id.toValue()).toBe('custom-id-123')
    })

    test('should use provided UUID', () => {
      const uuid = '550e8400-e29b-41d4-a716-446655440000'
      const id = new UniqueEntityId(uuid)
      expect(id.toValue()).toBe(uuid)
    })
  })

  describe('toString', () => {
    test('should return string representation', () => {
      const id = new UniqueEntityId('test-id')
      expect(id.toString()).toBe('test-id')
    })

    test('should return same as toValue', () => {
      const id = new UniqueEntityId('test-id')
      expect(id.toString()).toBe(id.toValue())
    })
  })

  describe('toValue', () => {
    test('should return the id value', () => {
      const id = new UniqueEntityId('my-id')
      expect(id.toValue()).toBe('my-id')
    })
  })

  describe('equals', () => {
    test('should return true for same value', () => {
      const id1 = new UniqueEntityId('same-id')
      const id2 = new UniqueEntityId('same-id')
      expect(id1.equals(id2)).toBe(true)
    })

    test('should return false for different values', () => {
      const id1 = new UniqueEntityId('id-1')
      const id2 = new UniqueEntityId('id-2')
      expect(id1.equals(id2)).toBe(false)
    })

    test('should return true when comparing with itself', () => {
      const id = new UniqueEntityId('test-id')
      expect(id.equals(id)).toBe(true)
    })
  })

  describe('unique generation', () => {
    test('should generate unique IDs', () => {
      const id1 = new UniqueEntityId()
      const id2 = new UniqueEntityId()
      expect(id1.toValue()).not.toBe(id2.toValue())
    })

    test('should generate multiple unique IDs', () => {
      const ids = new Set<string>()
      for (let i = 0; i < 100; i++) {
        ids.add(new UniqueEntityId().toValue())
      }
      expect(ids.size).toBe(100)
    })
  })
})
