import { describe, expect, test } from 'vitest'
import { DraftState } from './draft-state'

describe('DraftState', () => {
  test('should have DRAFT value', () => {
    expect(DraftState.DRAFT).toBe('DRAFT')
  })

  test('should have ANALYZED value', () => {
    expect(DraftState.ANALYZED).toBe('ANALYZED')
  })

  test('should have ACTIVE value', () => {
    expect(DraftState.ACTIVE).toBe('ACTIVE')
  })

  test('should have exactly 3 states', () => {
    const states = Object.values(DraftState)
    expect(states).toHaveLength(3)
  })

  test('should contain all expected states', () => {
    const states = Object.values(DraftState)
    expect(states).toContain('DRAFT')
    expect(states).toContain('ANALYZED')
    expect(states).toContain('ACTIVE')
  })
})
