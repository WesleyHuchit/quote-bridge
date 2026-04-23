import { describe, expect, test, beforeEach, vi } from 'vitest'
import { AggregateRoot } from './aggregate-root'
import { DraftState } from './draft-state'
import { UniqueEntityId } from './unique-entity-id'
import { DomainEvent } from '../events/domain-event'
import { DomainEvents } from '../events/domain-events'

// Concrete implementation for testing
interface TestAggregateProps {
  name: string
}

class TestDomainEvent implements DomainEvent {
  ocurredAt: Date = new Date()
  aggregateId: UniqueEntityId

  constructor(aggregateId: UniqueEntityId) {
    this.aggregateId = aggregateId
  }

  getAggregateId(): UniqueEntityId {
    return this.aggregateId
  }
}

class TestAggregate extends AggregateRoot<TestAggregateProps> {
  get name() {
    return this.props.name
  }

  // Expose protected methods for testing
  public testAddDomainEvent(event: DomainEvent) {
    this.addDomainEvent(event)
  }

  public testSetStatus(status: DraftState) {
    this.setStatus(status)
  }

  static create(props: TestAggregateProps, id?: UniqueEntityId) {
    return new TestAggregate(props, id)
  }
}

describe('AggregateRoot', () => {
  beforeEach(() => {
    DomainEvents.clearHandlers()
    DomainEvents.clearMarkedAggregates()
  })

  describe('status', () => {
    test('should have DRAFT as default status', () => {
      const aggregate = TestAggregate.create({ name: 'Test' })
      expect(aggregate.status).toBe(DraftState.DRAFT)
    })

    test('should change status with setStatus', () => {
      const aggregate = TestAggregate.create({ name: 'Test' })
      aggregate.testSetStatus(DraftState.ACTIVE)
      expect(aggregate.status).toBe(DraftState.ACTIVE)
    })

    test('should change status to ANALYZED', () => {
      const aggregate = TestAggregate.create({ name: 'Test' })
      aggregate.testSetStatus(DraftState.ANALYZED)
      expect(aggregate.status).toBe(DraftState.ANALYZED)
    })
  })

  describe('domainEvents', () => {
    test('should start with empty domain events', () => {
      const aggregate = TestAggregate.create({ name: 'Test' })
      expect(aggregate.domainEvents).toHaveLength(0)
    })

    test('should add domain event', () => {
      const aggregate = TestAggregate.create({ name: 'Test' })
      const event = new TestDomainEvent(aggregate.id)
      
      aggregate.testAddDomainEvent(event)
      
      expect(aggregate.domainEvents).toHaveLength(1)
      expect(aggregate.domainEvents[0]).toBe(event)
    })

    test('should add multiple domain events', () => {
      const aggregate = TestAggregate.create({ name: 'Test' })
      const event1 = new TestDomainEvent(aggregate.id)
      const event2 = new TestDomainEvent(aggregate.id)
      
      aggregate.testAddDomainEvent(event1)
      aggregate.testAddDomainEvent(event2)
      
      expect(aggregate.domainEvents).toHaveLength(2)
    })

    test('should mark aggregate for dispatch when adding event', () => {
      const spy = vi.spyOn(DomainEvents, 'markAggregateForDispatch')
      const aggregate = TestAggregate.create({ name: 'Test' })
      const event = new TestDomainEvent(aggregate.id)
      
      aggregate.testAddDomainEvent(event)
      
      expect(spy).toHaveBeenCalledWith(aggregate)
    })
  })

  describe('clearEvents', () => {
    test('should clear all domain events', () => {
      const aggregate = TestAggregate.create({ name: 'Test' })
      const event1 = new TestDomainEvent(aggregate.id)
      const event2 = new TestDomainEvent(aggregate.id)
      
      aggregate.testAddDomainEvent(event1)
      aggregate.testAddDomainEvent(event2)
      expect(aggregate.domainEvents).toHaveLength(2)
      
      aggregate.clearEvents()
      
      expect(aggregate.domainEvents).toHaveLength(0)
    })
  })

  describe('id', () => {
    test('should generate unique id when not provided', () => {
      const aggregate = TestAggregate.create({ name: 'Test' })
      expect(aggregate.id).toBeDefined()
      expect(aggregate.id.toValue()).toBeTruthy()
    })

    test('should use provided id', () => {
      const id = new UniqueEntityId('custom-id')
      const aggregate = TestAggregate.create({ name: 'Test' }, id)
      expect(aggregate.id.toValue()).toBe('custom-id')
    })
  })

  describe('equals', () => {
    test('should return true when comparing same instance', () => {
      const aggregate = TestAggregate.create({ name: 'Test' })
      expect(aggregate.equals(aggregate)).toBe(true)
    })

    test('should return true when comparing aggregates with same id', () => {
      const id = new UniqueEntityId('same-id')
      const aggregate1 = TestAggregate.create({ name: 'Test1' }, id)
      const aggregate2 = TestAggregate.create({ name: 'Test2' }, id)
      expect(aggregate1.equals(aggregate2)).toBe(true)
    })

    test('should return false when comparing aggregates with different ids', () => {
      const aggregate1 = TestAggregate.create({ name: 'Test1' })
      const aggregate2 = TestAggregate.create({ name: 'Test2' })
      expect(aggregate1.equals(aggregate2)).toBe(false)
    })
  })
})
