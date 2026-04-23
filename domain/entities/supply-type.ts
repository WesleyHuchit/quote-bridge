import {
  SupplyType as PrismaSupplyType
} from '@prisma/client'

export enum SupplyTypeEnum {
  INSURER = 'INSURER',
  WORKSHOP = 'WORKSHOP',
}

export class SupplyType {
  private value: PrismaSupplyType | null

  isSuppliedByTheShop(): boolean {
    // console.log("Checking if supplied by the shop with value:", this.value);
    if (this.value === 'WORKSHOP') {
      return true
    } else {
      return false
    }
  }

  toValue(): PrismaSupplyType | null {
    return this.value
  }

  toPTBR(): string | null {
    if (!this.value) {
      return null
    }
    if (this.value === 'WORKSHOP') {
      return 'OFICINA'
    }
    if (this.value === 'INSURER') {
      return 'SEGURADORA'
    }
    return this.value
  }

  constructor(value: string | undefined | null) {
    let newValue = value ? value.toUpperCase() : null

    if (!newValue) {
      this.value = null
      return
    }

    const lowerCaseValue = newValue.toLocaleLowerCase()
    var returnedValue: PrismaSupplyType | null = null

    if (
      lowerCaseValue === 'workshop' ||
      lowerCaseValue === 'oficina'
    ) {
      returnedValue = 'WORKSHOP'
    }

    if (
      lowerCaseValue === 'seguradora' ||
      lowerCaseValue === 'insurer'
    ) {
      returnedValue = 'INSURER'
    }

    this.value = returnedValue
  }

  static create(value: string | undefined | null): SupplyType {
    return new SupplyType(value)
  }

}
