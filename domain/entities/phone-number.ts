export class PhoneNumber {
    private readonly value: string

    constructor(value: string) {
        if (!PhoneNumber.isValid(value)) {
            throw new Error('Número de telefone inválido')
        }
        this.value = PhoneNumber.clean(value)
    }

    static isValid(phone: string): boolean {
        const cleaned = PhoneNumber.clean(phone)

        // Deve ter 10 ou 11 dígitos (DDD + número)
        if (!/^\d{10,11}$/.test(cleaned)) {
            return false
        }

        // DDD deve ser válido (11 a 99, exceto alguns códigos reservados)
        const ddd = cleaned.substring(0, 2)
        const dddNum = parseInt(ddd)

        // DDDs válidos: 11-99, excluindo códigos reservados e inválidos
        if (dddNum < 11 || dddNum > 99) {
            return false
        }

        // Códigos de DDD reservados/inválidos (exemplos comuns)
        const invalidDDDs = ['00', '10', '20', '23', '25', '26', '29', '30', '36', '40', '50', '60', '70', '72', '76', '78', '80', '90']
        if (invalidDDDs.includes(ddd)) {
            return false
        }

        const number = cleaned.substring(2)

        // Telefone fixo: 8 ou 9 dígitos (9 dígitos apenas em algumas regiões metropolitanas)
        if (number.length === 8) {
            // Fixo tradicional: 2XXX-XXXX ou 3XXX-XXXX
            return /^[2-9]\d{7}$/.test(number)
        }

        // Celular: 9 dígitos, sempre começando com 9
        if (number.length === 9) {
            return /^9\d{8}$/.test(number)
        }

        return false
    }

    static clean(phone: string): string {
        return phone.replace(/\D/g, '')
    }

    // Formata o telefone para exibição: (XX) XXXX-XXXX ou (XX) 9XXXX-XXXX
    static format(phone: string): string {
        const cleaned = PhoneNumber.clean(phone)
        if (cleaned.length === 10) {
            // Fixo: (XX) XXXX-XXXX
            return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 6)}-${cleaned.substring(6)}`
        }
        if (cleaned.length === 11) {
            // Celular: (XX) 9XXXX-XXXX
            return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7)}`
        }
        return cleaned
    }

    // Retorna o valor formatado
    toFormattedString(): string {
        return PhoneNumber.format(this.value)
    }

    toString(): string {
        return this.value
    }

    // Verifica se é um telefone celular
    isMobile(): boolean {
        return this.value.length === 11 && this.value.substring(2, 3) === '9'
    }

    // Retorna apenas o DDD
    getDDD(): string {
        return this.value.substring(0, 2)
    }

    // Retorna apenas o número (sem DDD)
    getNumber(): string {
        return this.value.substring(2)
    }
}
