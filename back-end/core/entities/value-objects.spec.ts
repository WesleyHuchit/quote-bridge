import { describe, expect, test } from 'vitest'
import { ValueObject } from './value-objects'

// Concrete implementation for testing
interface TestValueObjectProps {
  name: string
  value: number
}

class TestValueObject extends ValueObject<TestValueObjectProps> {
  get name() {
    return this.props.name
  }

  get value() {
    return this.props.value
  }

  static create(props: TestValueObjectProps) {
    return new TestValueObject(props)
  }
}

describe('ValueObject', () => {
  describe('constructor', () => {
    test('should create value object with props', () => {
      const vo = TestValueObject.create({ name: 'Test', value: 100 })
      expect(vo.name).toBe('Test')
      expect(vo.value).toBe(100)
    })
  })

  describe('equals', () => {
    test('should return true for same props', () => {
      const vo1 = TestValueObject.create({ name: 'Test', value: 100 })
      const vo2 = TestValueObject.create({ name: 'Test', value: 100 })
      expect(vo1.equals(vo2)).toBe(true)
    })

    test('should return false for different name', () => {
      const vo1 = TestValueObject.create({ name: 'Test1', value: 100 })
      const vo2 = TestValueObject.create({ name: 'Test2', value: 100 })
      expect(vo1.equals(vo2)).toBe(false)
    })

    test('should return false for different value', () => {
      const vo1 = TestValueObject.create({ name: 'Test', value: 100 })
      const vo2 = TestValueObject.create({ name: 'Test', value: 200 })
      expect(vo1.equals(vo2)).toBe(false)
    })

    test('should return true when comparing with itself', () => {
      const vo = TestValueObject.create({ name: 'Test', value: 100 })
      expect(vo.equals(vo)).toBe(true)
    })

    test('should return false for null', () => {
      const vo = TestValueObject.create({ name: 'Test', value: 100 })
      expect(vo.equals(null as any)).toBe(false)
    })

    test('should return false for undefined', () => {
      const vo = TestValueObject.create({ name: 'Test', value: 100 })
      expect(vo.equals(undefined as any)).toBe(false)
    })
  })
})
