import { PartType as PrismaPartType } from '@prisma/client'

export class PartType {
  private value: PrismaPartType | undefined

  toValue(): PrismaPartType | null {
    return this.value || null
  }

  toPTBR(): string | null {
    if (!this.value) {
      return null
    }
    if (this.value === 'GENUINE') {
      return 'GENUÍNA'
    }
    if (this.value === 'ORIGINAL') {
      return 'ORIGINAL'
    }
    if (this.value === 'OTHER') {
      return 'OUTRO'
    }
    return this.value
  }

  constructor(value: string | undefined) {
    // console.log("PartType constructor value:", value)

    if (!value) {
      this.value = undefined
      return
    }

    let newValue = value ? value.toUpperCase() : ''

    if (newValue.length === 0) {
      this.value = undefined
      return
    }

    // console.log("PartType value:", newValue)

    if (
      newValue !== 'GENUÍNA' &&
      newValue !== 'GENUINA' &&
      newValue !== 'ORIGINAL' &&
      newValue !== 'GENUINE' &&
      newValue !== 'OTHER'
    ) {
      // throw new Error('Invalid part type')
      newValue = 'OTHER'
    }

    if (newValue === 'GENUÍNA' || newValue === 'GENUINA') {
      newValue = 'GENUINE'
    }

    if (newValue === 'ORIGINAL') {
      newValue = 'ORIGINAL'
    }

    if (
      newValue !== 'GENUINE' &&
      newValue !== 'ORIGINAL' &&
      newValue !== 'OTHER'
    ) {
      throw new Error('Invalid part type - must be GENUINE or OTHER')
    }

    this.value = newValue
  }
}
