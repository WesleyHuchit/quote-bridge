import { describe, expect, test } from 'vitest'
import { PreviousServiceOrderItem } from './previous-service-order-item'
import { UniqueEntityId } from './unique-entity-id'

describe('PreviousServiceOrderItem', () => {
  describe('createNotDefined', () => {
    test('should create not defined item', () => {
      const item = PreviousServiceOrderItem.createNotDefined()
      expect(item).toBeDefined()
    })

    test('should throw when converting not defined to Prisma ID', () => {
      const item = PreviousServiceOrderItem.createNotDefined()
      expect(() => item.toPrismaId()).toThrow('Cannot convert to Prisma ID')
    })
  })

  describe('createByPrisma', () => {
    test('should create from valid string ID', () => {
      const item = PreviousServiceOrderItem.createByPrisma('item-id-123')
      expect(item.toPrismaId()).toBe('item-id-123')
    })

    test('should create noPreviousItem for null', () => {
      const item = PreviousServiceOrderItem.createByPrisma(null)
      expect(item.toPrismaId()).toBe('noPreviousItem')
    })

    test('should create noPreviousItem for undefined', () => {
      const item = PreviousServiceOrderItem.createByPrisma(undefined)
      expect(item.toPrismaId()).toBe('noPreviousItem')
    })

    test('should create noPreviousItem for empty string', () => {
      const item = PreviousServiceOrderItem.createByPrisma('')
      expect(item.toPrismaId()).toBe('noPreviousItem')
    })
  })

  describe('toPrismaId', () => {
    test('should return string ID for valid previous item', () => {
      const item = PreviousServiceOrderItem.createByPrisma('previous-item-id')
      expect(item.toPrismaId()).toBe('previous-item-id')
    })
  })
})
