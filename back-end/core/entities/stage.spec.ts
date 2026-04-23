import { describe, expect, test } from 'vitest'
import { Stage, StageEnum } from './stage'

describe('Stage', () => {
  describe('StageEnum', () => {
    test('should have PERSISTED value', () => {
      expect(StageEnum.PERSISTED).toBe('PERSISTED')
    })

    test('should have NOT_PERSISTED value', () => {
      expect(StageEnum.NOT_PERSISTED).toBe('NOT_PERSISTED')
    })
  })

  describe('constructor', () => {
    test('should create stage with PERSISTED value', () => {
      const stage = new Stage(StageEnum.PERSISTED)
      expect(stage.toValue()).toBe(StageEnum.PERSISTED)
    })

    test('should create stage with NOT_PERSISTED value', () => {
      const stage = new Stage(StageEnum.NOT_PERSISTED)
      expect(stage.toValue()).toBe(StageEnum.NOT_PERSISTED)
    })
  })

  describe('createNotPersisted', () => {
    test('should create NOT_PERSISTED stage', () => {
      const stage = Stage.createNotPersisted()
      expect(stage.toValue()).toBe(StageEnum.NOT_PERSISTED)
    })
  })

  describe('createPersisted', () => {
    test('should create PERSISTED stage', () => {
      const stage = Stage.createPersisted()
      expect(stage.toValue()).toBe(StageEnum.PERSISTED)
    })
  })

  describe('toValue', () => {
    test('should return the stage value', () => {
      const stage = Stage.createPersisted()
      expect(stage.toValue()).toBe(StageEnum.PERSISTED)
    })
  })
})
