export class CPF {
    private readonly value: string;

    constructor(value: string) {
        if (!CPF.isValid(value)) {
            throw new Error('CPF inválido');
        }
        this.value = CPF.clean(value);
    }

    static isValid(cpf: string): boolean {
        const cleaned = CPF.clean(cpf);
        if (!/^\d{11}$/.test(cleaned)) return false;
        if (/^(\d)\1{10}$/.test(cleaned)) return false;

        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cleaned.charAt(i)) * (10 - i);
        }
        let firstCheck = 11 - (sum % 11);
        if (firstCheck >= 10) firstCheck = 0;
        if (firstCheck !== parseInt(cleaned.charAt(9))) return false;

        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cleaned.charAt(i)) * (11 - i);
        }
        let secondCheck = 11 - (sum % 11);
        if (secondCheck >= 10) secondCheck = 0;
        if (secondCheck !== parseInt(cleaned.charAt(10))) return false;

        return true;
    }

    static clean(cpf: string): string {
        return cpf.replace(/\D/g, '');
    }

    toString(): string {
        return this.value;
    }
}