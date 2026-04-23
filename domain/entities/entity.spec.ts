import { describe, expect, test } from 'vitest'
import { Entity } from './entity'
import { UniqueEntityId } from './unique-entity-id'

// Concrete implementation for testing
interface TestEntityProps {
  name: string
  value: number
}

class TestEntity extends Entity<TestEntityProps> {
  get name() {
    return this.props.name
  }

  get value() {
    return this.props.value
  }

  static create(props: TestEntityProps, id?: UniqueEntityId) {
    return new TestEntity(props, id)
  }
}

describe('Entity', () => {
  describe('constructor', () => {
    test('should create entity with props', () => {
      const entity = TestEntity.create({ name: 'Test', value: 100 })
      expect(entity.name).toBe('Test')
      expect(entity.value).toBe(100)
    })

    test('should generate unique id when not provided', () => {
      const entity = TestEntity.create({ name: 'Test', value: 100 })
      expect(entity.id).toBeDefined()
      expect(entity.id.toValue()).toBeTruthy()
    })

    test('should use provided id', () => {
      const id = new UniqueEntityId('custom-id-123')
      const entity = TestEntity.create({ name: 'Test', value: 100 }, id)
      expect(entity.id.toValue()).toBe('custom-id-123')
    })
  })

  describe('id', () => {
    test('should return UniqueEntityId', () => {
      const entity = TestEntity.create({ name: 'Test', value: 100 })
      expect(entity.id).toBeInstanceOf(UniqueEntityId)
    })
  })

  describe('equals', () => {
    test('should return true when comparing same instance', () => {
      const entity = TestEntity.create({ name: 'Test', value: 100 })
      expect(entity.equals(entity)).toBe(true)
    })

    test('should return true when comparing entities with same id', () => {
      const id = new UniqueEntityId('same-id')
      const entity1 = TestEntity.create({ name: 'Test1', value: 100 }, id)
      const entity2 = TestEntity.create({ name: 'Test2', value: 200 }, id)
      expect(entity1.equals(entity2)).toBe(true)
    })

    test('should return false when comparing entities with different ids', () => {
      const entity1 = TestEntity.create({ name: 'Test', value: 100 })
      const entity2 = TestEntity.create({ name: 'Test', value: 100 })
      expect(entity1.equals(entity2)).toBe(false)
    })

    test('should compare by id value, not reference', () => {
      const id1 = new UniqueEntityId('shared-id')
      const id2 = new UniqueEntityId('shared-id')
      const entity1 = TestEntity.create({ name: 'Test1', value: 100 }, id1)
      const entity2 = TestEntity.create({ name: 'Test2', value: 200 }, id2)
      expect(entity1.equals(entity2)).toBe(true)
    })
  })
})
