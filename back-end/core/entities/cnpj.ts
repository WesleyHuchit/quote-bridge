export class CNPJ {
    private readonly value: string;

    constructor(value: string) {
        if (!CNPJ.isValid(value)) {
            throw new Error('CNPJ inválido');
        }
        this.value = CNPJ.clean(value);
    }

    static isValid(cnpj: string): boolean {
        const cleaned = CNPJ.clean(cnpj);
        if (!/^\d{14}$/.test(cleaned)) return false;
        if (/^(\d)\1{13}$/.test(cleaned)) return false;

        let length = cleaned.length - 2;
        let numbers = cleaned.substring(0, length);
        let digits = cleaned.substring(length);
        let sum = 0;
        let pos = length - 7;

        for (let i = length; i >= 1; i--) {
            sum += parseInt(numbers.charAt(length - i)) * pos--;
            if (pos < 2) pos = 9;
        }
        let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result !== parseInt(digits.charAt(0))) return false;

        length = length + 1;
        numbers = cleaned.substring(0, length);
        sum = 0;
        pos = length - 7;
        for (let i = length; i >= 1; i--) {
            sum += parseInt(numbers.charAt(length - i)) * pos--;
            if (pos < 2) pos = 9;
        }
        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result !== parseInt(digits.charAt(1))) return false;

        return true;
    }

    static clean(cnpj: string): string {
        return cnpj.replace(/\D/g, '');
    }

    toString(): string {
        return this.value;
    }
}