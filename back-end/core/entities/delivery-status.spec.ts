import { describe, expect, test } from 'vitest'
import { DeliveryStatus, DeliveryState } from './delivery-status'

// Mock do Prisma DeliveryStatus enum
vi.mock('@prisma/client', () => ({
  DeliveryStatus: {
    NOT_APPLICABLE: 'NOT_APPLICABLE',
    QUOTING: 'QUOTING',
    PENDING: 'PENDING',
    PENDING_APPROVAL: 'PENDING_APPROVAL',
    APPROVED: 'APPROVED',
    DELIVERING: 'DELIVERING',
    DELIVERED: 'DELIVERED',
  },
}))

import { vi } from 'vitest'

describe('DeliveryStatus', () => {
  describe('createNotApplicable', () => {
    test('should create NOT_APPLICABLE status', () => {
      const status = DeliveryStatus.createNotApplicable()
      expect(status.state).toBe(DeliveryState.NOT_APPLICABLE)
      expect(status.expectedDate).toBeNull()
      expect(status.arrivedAt).toBeNull()
    })

    test('should return true for isNotApplicable', () => {
      const status = DeliveryStatus.createNotApplicable()
      expect(status.isNotApplicable()).toBe(true)
      expect(status.isPending()).toBe(false)
    })
  })

  describe('createPending', () => {
    test('should create PENDING status', () => {
      const status = DeliveryStatus.createPending()
      expect(status.state).toBe(DeliveryState.PENDING)
      expect(status.expectedDate).toBeNull()
      expect(status.arrivedAt).toBeNull()
    })

    test('should return true for isPending', () => {
      const status = DeliveryStatus.createPending()
      expect(status.isPending()).toBe(true)
      expect(status.isDelivered()).toBe(false)
    })
  })

  describe('createQuoting', () => {
    test('should create QUOTING status', () => {
      const status = DeliveryStatus.createQuoting()
      expect(status.state).toBe(DeliveryState.QUOTING)
      expect(status.expectedDate).toBeNull()
      expect(status.arrivedAt).toBeNull()
    })

    test('should return true for isQuoting', () => {
      const status = DeliveryStatus.createQuoting()
      expect(status.isQuoting()).toBe(true)
      expect(status.isDelivering()).toBe(false)
    })
  })

  describe('createPendingApproval', () => {
    test('should create PENDING_APPROVAL status', () => {
      const status = DeliveryStatus.createPendingApproval()
      expect(status.state).toBe(DeliveryState.PENDING_APPROVAL)
      expect(status.expectedDate).toBeNull()
      expect(status.arrivedAt).toBeNull()
    })

    test('should return true for isPendingApproval', () => {
      const status = DeliveryStatus.createPendingApproval()
      expect(status.isPendingApproval()).toBe(true)
      expect(status.isPending()).toBe(false)
    })
  })

  describe('createApproved', () => {
    test('should create APPROVED status', () => {
      const status = DeliveryStatus.createApproved()
      expect(status.state).toBe(DeliveryState.APPROVED)
      expect(status.expectedDate).toBeNull()
      expect(status.arrivedAt).toBeNull()
    })

    test('should return true for isApproved', () => {
      const status = DeliveryStatus.createApproved()
      expect(status.isApproved()).toBe(true)
      expect(status.isPendingApproval()).toBe(false)
    })
  })

  describe('createDelivering', () => {
    test('should create DELIVERING status with expected date', () => {
      const expectedDate = new Date('2024-12-25')
      const status = DeliveryStatus.createDelivering(expectedDate)
      expect(status.state).toBe(DeliveryState.DELIVERING)
      expect(status.expectedDate).toEqual(expectedDate)
      expect(status.arrivedAt).toBeNull()
    })

    test('should return true for isDelivering', () => {
      const status = DeliveryStatus.createDelivering(new Date())
      expect(status.isDelivering()).toBe(true)
      expect(status.isDelivered()).toBe(false)
    })
  })

  describe('createDelivered', () => {
    test('should create DELIVERED status with arrived date', () => {
      const arrivedAt = new Date('2024-12-20')
      const status = DeliveryStatus.createDelivered(arrivedAt)
      expect(status.state).toBe(DeliveryState.DELIVERED)
      expect(status.expectedDate).toBeNull()
      expect(status.arrivedAt).toEqual(arrivedAt)
    })

    test('should use current date if not provided', () => {
      const before = new Date()
      const status = DeliveryStatus.createDelivered()
      const after = new Date()

      expect(status.arrivedAt).not.toBeNull()
      expect(status.arrivedAt!.getTime()).toBeGreaterThanOrEqual(before.getTime())
      expect(status.arrivedAt!.getTime()).toBeLessThanOrEqual(after.getTime())
    })

    test('should return true for isDelivered', () => {
      const status = DeliveryStatus.createDelivered()
      expect(status.isDelivered()).toBe(true)
      expect(status.isDelivering()).toBe(false)
    })
  })

  describe('create', () => {
    test('should create status from NOT_APPLICABLE string', () => {
      const status = DeliveryStatus.create('NOT_APPLICABLE', null, null)
      expect(status.state).toBe(DeliveryState.NOT_APPLICABLE)
    })

    test('should create status from PENDING string', () => {
      const status = DeliveryStatus.create('PENDING', null, null)
      expect(status.state).toBe(DeliveryState.PENDING)
    })

    test('should create status from QUOTING string', () => {
      const status = DeliveryStatus.create('QUOTING', null, null)
      expect(status.state).toBe(DeliveryState.QUOTING)
    })

    test('should create status from DELIVERING string with expected date', () => {
      const expectedDate = new Date('2024-12-25')
      const status = DeliveryStatus.create('DELIVERING', expectedDate, null)
      expect(status.state).toBe(DeliveryState.DELIVERING)
      expect(status.expectedDate).toEqual(expectedDate)
    })

    test('should create status from DELIVERED string with arrived date', () => {
      const arrivedAt = new Date('2024-12-20')
      const status = DeliveryStatus.create('DELIVERED', null, arrivedAt)
      expect(status.state).toBe(DeliveryState.DELIVERED)
      expect(status.arrivedAt).toEqual(arrivedAt)
    })

    test('should create status from PENDING_APPROVAL string', () => {
      const status = DeliveryStatus.create('PENDING_APPROVAL', null, null)
      expect(status.state).toBe(DeliveryState.PENDING_APPROVAL)
    })

    test('should create status from APPROVED string', () => {
      const status = DeliveryStatus.create('APPROVED', null, null)
      expect(status.state).toBe(DeliveryState.APPROVED)
    })

    test('should throw error for invalid state string', () => {
      expect(() => DeliveryStatus.create('INVALID_STATE', null, null)).toThrow(
        'Invalid delivery state: INVALID_STATE'
      )
    })
  })

  describe('toPrisma', () => {
    test('should convert NOT_APPLICABLE to Prisma enum', () => {
      const status = DeliveryStatus.createNotApplicable()
      expect(status.toPrisma).toBe('NOT_APPLICABLE')
    })

    test('should convert PENDING to Prisma enum', () => {
      const status = DeliveryStatus.createPending()
      expect(status.toPrisma).toBe('PENDING')
    })

    test('should convert QUOTING to Prisma enum', () => {
      const status = DeliveryStatus.createQuoting()
      expect(status.toPrisma).toBe('QUOTING')
    })

    test('should convert DELIVERING to Prisma enum', () => {
      const status = DeliveryStatus.createDelivering(new Date())
      expect(status.toPrisma).toBe('DELIVERING')
    })

    test('should convert DELIVERED to Prisma enum', () => {
      const status = DeliveryStatus.createDelivered()
      expect(status.toPrisma).toBe('DELIVERED')
    })

    test('should convert PENDING_APPROVAL to Prisma enum', () => {
      const status = DeliveryStatus.createPendingApproval()
      expect(status.toPrisma).toBe('PENDING_APPROVAL')
    })

    test('should convert APPROVED to Prisma enum', () => {
      const status = DeliveryStatus.createApproved()
      expect(status.toPrisma).toBe('APPROVED')
    })
  })

  describe('equals', () => {
    test('should return true for same status', () => {
      const status1 = DeliveryStatus.createPending()
      const status2 = DeliveryStatus.createPending()
      expect(status1.equals(status2)).toBe(true)
    })

    test('should return false for different states', () => {
      const status1 = DeliveryStatus.createPending()
      const status2 = DeliveryStatus.createQuoting()
      expect(status1.equals(status2)).toBe(false)
    })

    test('should return true for DELIVERING with same expected date', () => {
      const date = new Date('2024-12-25')
      const status1 = DeliveryStatus.createDelivering(date)
      const status2 = DeliveryStatus.createDelivering(date)
      expect(status1.equals(status2)).toBe(true)
    })

    test('should return false for DELIVERING with different expected dates', () => {
      const status1 = DeliveryStatus.createDelivering(new Date('2024-12-25'))
      const status2 = DeliveryStatus.createDelivering(new Date('2024-12-26'))
      expect(status1.equals(status2)).toBe(false)
    })
  })

  describe('helper methods', () => {
    test('all helper methods should work correctly', () => {
      expect(DeliveryStatus.createNotApplicable().isNotApplicable()).toBe(true)
      expect(DeliveryStatus.createPending().isPending()).toBe(true)
      expect(DeliveryStatus.createPendingApproval().isPendingApproval()).toBe(true)
      expect(DeliveryStatus.createApproved().isApproved()).toBe(true)
      expect(DeliveryStatus.createQuoting().isQuoting()).toBe(true)
      expect(DeliveryStatus.createDelivering(new Date()).isDelivering()).toBe(true)
      expect(DeliveryStatus.createDelivered().isDelivered()).toBe(true)
    })

    test('helper methods should return false for other states', () => {
      const status = DeliveryStatus.createPending()
      expect(status.isNotApplicable()).toBe(false)
      expect(status.isPendingApproval()).toBe(false)
      expect(status.isApproved()).toBe(false)
      expect(status.isQuoting()).toBe(false)
      expect(status.isDelivering()).toBe(false)
      expect(status.isDelivered()).toBe(false)
    })
  })
})
