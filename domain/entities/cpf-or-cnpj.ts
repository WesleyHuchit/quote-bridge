import { CNPJ } from "./cnpj";
import { CPF } from "./cpf";

export class CpfOrCnpj {
    private readonly value: string;

    constructor(value: string) {
        const cleaned = cleanCpfOrCnpj(value);

        if (cleaned.length !== 11 && cleaned.length !== 14) {
            throw new Error('CPF ou CNPJ inválido');
        }

        if (cleaned.length === 11) {
            // Validar CPF
            if (!CPF.isValid(cleaned)) {
                throw new Error('CPF inválido');
            }
        } else if (cleaned.length === 14) {
            // Validar CNPJ
            if (!CNPJ.isValid(cleaned)) {
                throw new Error('CNPJ inválido');
            }
        }

        this.value = cleaned;
    }

    toString(): string {
        return this.value;
    }

    isCNPJ(): boolean {
        return this.value.length === 14;
    }

    isCPF(): boolean {
        return this.value.length === 11;
    }

}

function cleanCpfOrCnpj(value: string): string {
    return value.replace(/\D/g, '');
}