import { PersonType as PrismaPersonType } from '@prisma/client'

export enum PersonTypeEnum {
    CUSTOMER = 'CUSTOMER',
    WORKER = 'WORKER',
    SUPPLIER = 'SUPPLIER',
    INSURANCE_COMPANY = 'INSURANCE_COMPANY',
    COMPANY = 'COMPANY',
}

export class PersonType {
    private readonly value: PersonTypeEnum

    constructor(value: string | PersonTypeEnum) {
        if (!PersonType.isValid(value)) {
            throw new Error(`Tipo de pessoa inválido: ${value}. Valores válidos: CUSTOMER, WORKER, SUPPLIER, INSURANCE_COMPANY, COMPANY`)
        }
        this.value = typeof value === 'string' ? (value as PersonTypeEnum) : value
    }

    static isValid(value: string | PersonTypeEnum): boolean {
        const stringValue = typeof value === 'string' ? value : value
        return Object.values(PersonTypeEnum).includes(stringValue as PersonTypeEnum)
    }

    static create(value: string | PersonTypeEnum): PersonType {
        return new PersonType(value)
    }

    static customer(): PersonType {
        return new PersonType(PersonTypeEnum.CUSTOMER)
    }

    static worker(): PersonType {
        return new PersonType(PersonTypeEnum.WORKER)
    }

    static supplier(): PersonType {
        return new PersonType(PersonTypeEnum.SUPPLIER)
    }

    static insuranceCompany(): PersonType {
        return new PersonType(PersonTypeEnum.INSURANCE_COMPANY)
    }

    static company(): PersonType {
        return new PersonType(PersonTypeEnum.COMPANY)
    }

    toString(): string {
        return this.value
    }

    toValue(): PersonTypeEnum {
        return this.value
    }

    toPrisma(): PrismaPersonType {
        return this.value as PrismaPersonType
    }

    isCustomer(): boolean {
        return this.value === PersonTypeEnum.CUSTOMER
    }

    isWorker(): boolean {
        return this.value === PersonTypeEnum.WORKER
    }

    isSupplier(): boolean {
        return this.value === PersonTypeEnum.SUPPLIER
    }

    isInsuranceCompany(): boolean {
        return this.value === PersonTypeEnum.INSURANCE_COMPANY
    }

    isCompany(): boolean {
        return this.value === PersonTypeEnum.COMPANY
    }

    equals(other: PersonType): boolean {
        return this.value === other.value
    }
}
