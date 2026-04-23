import { describe, expect, test, vi } from 'vitest'
import { PersonType, PersonTypeEnum } from './person-type'

// Mock Prisma PersonType
vi.mock('@prisma/client', () => ({
  PersonType: {
    CUSTOMER: 'CUSTOMER',
    WORKER: 'WORKER',
    SUPPLIER: 'SUPPLIER',
    INSURANCE_COMPANY: 'INSURANCE_COMPANY',
    COMPANY: 'COMPANY',
  },
}))

describe('PersonType', () => {
  describe('constructor / create', () => {
    test('should create CUSTOMER type', () => {
      const personType = PersonType.create('CUSTOMER')
      expect(personType.toValue()).toBe(PersonTypeEnum.CUSTOMER)
    })

    test('should create WORKER type', () => {
      const personType = PersonType.create('WORKER')
      expect(personType.toValue()).toBe(PersonTypeEnum.WORKER)
    })

    test('should create SUPPLIER type', () => {
      const personType = PersonType.create('SUPPLIER')
      expect(personType.toValue()).toBe(PersonTypeEnum.SUPPLIER)
    })

    test('should create INSURANCE_COMPANY type', () => {
      const personType = PersonType.create('INSURANCE_COMPANY')
      expect(personType.toValue()).toBe(PersonTypeEnum.INSURANCE_COMPANY)
    })

    test('should create COMPANY type', () => {
      const personType = PersonType.create('COMPANY')
      expect(personType.toValue()).toBe(PersonTypeEnum.COMPANY)
    })

    test('should throw error for invalid type', () => {
      expect(() => PersonType.create('INVALID')).toThrow(
        'Tipo de pessoa inválido: INVALID. Valores válidos: CUSTOMER, WORKER, SUPPLIER, INSURANCE_COMPANY, COMPANY'
      )
    })
  })

  describe('factory methods', () => {
    test('should create customer using factory', () => {
      const personType = PersonType.customer()
      expect(personType.isCustomer()).toBe(true)
    })

    test('should create worker using factory', () => {
      const personType = PersonType.worker()
      expect(personType.isWorker()).toBe(true)
    })

    test('should create supplier using factory', () => {
      const personType = PersonType.supplier()
      expect(personType.isSupplier()).toBe(true)
    })

    test('should create insurance company using factory', () => {
      const personType = PersonType.insuranceCompany()
      expect(personType.isInsuranceCompany()).toBe(true)
    })

    test('should create company using factory', () => {
      const personType = PersonType.company()
      expect(personType.isCompany()).toBe(true)
    })
  })

  describe('isValid', () => {
    test('should return true for CUSTOMER', () => {
      expect(PersonType.isValid('CUSTOMER')).toBe(true)
    })

    test('should return true for WORKER', () => {
      expect(PersonType.isValid('WORKER')).toBe(true)
    })

    test('should return true for SUPPLIER', () => {
      expect(PersonType.isValid('SUPPLIER')).toBe(true)
    })

    test('should return true for INSURANCE_COMPANY', () => {
      expect(PersonType.isValid('INSURANCE_COMPANY')).toBe(true)
    })

    test('should return true for COMPANY', () => {
      expect(PersonType.isValid('COMPANY')).toBe(true)
    })

    test('should return false for invalid value', () => {
      expect(PersonType.isValid('INVALID')).toBe(false)
    })
  })

  describe('helper methods', () => {
    test('isCustomer should return true for CUSTOMER', () => {
      const personType = PersonType.customer()
      expect(personType.isCustomer()).toBe(true)
      expect(personType.isWorker()).toBe(false)
      expect(personType.isSupplier()).toBe(false)
    })

    test('isWorker should return true for WORKER', () => {
      const personType = PersonType.worker()
      expect(personType.isWorker()).toBe(true)
      expect(personType.isCustomer()).toBe(false)
      expect(personType.isSupplier()).toBe(false)
    })

    test('isSupplier should return true for SUPPLIER', () => {
      const personType = PersonType.supplier()
      expect(personType.isSupplier()).toBe(true)
      expect(personType.isCustomer()).toBe(false)
      expect(personType.isWorker()).toBe(false)
    })

    test('isInsuranceCompany should return true for INSURANCE_COMPANY', () => {
      const personType = PersonType.insuranceCompany()
      expect(personType.isInsuranceCompany()).toBe(true)
      expect(personType.isCustomer()).toBe(false)
      expect(personType.isWorker()).toBe(false)
      expect(personType.isSupplier()).toBe(false)
    })

    test('isCompany should return true for COMPANY', () => {
      const personType = PersonType.company()
      expect(personType.isCompany()).toBe(true)
      expect(personType.isCustomer()).toBe(false)
      expect(personType.isWorker()).toBe(false)
      expect(personType.isSupplier()).toBe(false)
      expect(personType.isInsuranceCompany()).toBe(false)
    })
  })

  describe('toString', () => {
    test('should return string representation', () => {
      const personType = PersonType.customer()
      expect(personType.toString()).toBe('CUSTOMER')
    })
  })

  describe('toValue', () => {
    test('should return enum value', () => {
      const personType = PersonType.worker()
      expect(personType.toValue()).toBe(PersonTypeEnum.WORKER)
    })
  })

  describe('toPrisma', () => {
    test('should return Prisma-compatible value', () => {
      const personType = PersonType.supplier()
      expect(personType.toPrisma()).toBe('SUPPLIER')
    })
  })

  describe('equals', () => {
    test('should return true for same type', () => {
      const type1 = PersonType.customer()
      const type2 = PersonType.customer()
      expect(type1.equals(type2)).toBe(true)
    })

    test('should return false for different types', () => {
      const type1 = PersonType.customer()
      const type2 = PersonType.worker()
      expect(type1.equals(type2)).toBe(false)
    })
  })

  describe('PersonTypeEnum', () => {
    test('should have CUSTOMER value', () => {
      expect(PersonTypeEnum.CUSTOMER).toBe('CUSTOMER')
    })

    test('should have WORKER value', () => {
      expect(PersonTypeEnum.WORKER).toBe('WORKER')
    })

    test('should have SUPPLIER value', () => {
      expect(PersonTypeEnum.SUPPLIER).toBe('SUPPLIER')
    })

    test('should have INSURANCE_COMPANY value', () => {
      expect(PersonTypeEnum.INSURANCE_COMPANY).toBe('INSURANCE_COMPANY')
    })

    test('should have COMPANY value', () => {
      expect(PersonTypeEnum.COMPANY).toBe('COMPANY')
    })
  })
})
