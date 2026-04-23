import { ValueObject } from '@/core/entities/value-objects'
import { CNPJ } from './cnpj'
import { CPF } from './cpf'

export interface CpfCnpjProps {
  value: string
}

function clean(value: string): string {
  return value.replace(/\D/g, '')
}

export class CpfCnpj extends ValueObject<CpfCnpjProps> {
  get value(): string {
    return this.props.value
  }

  /**
   * Retorna o tipo do documento: 'cpf' (11 dígitos) ou 'cnpj' (14 dígitos).
   */
  get type(): 'cpf' | 'cnpj' {
    return this.props.value.length === 11 ? 'cpf' : 'cnpj'
  }

  isCpf(): boolean {
    return this.type === 'cpf'
  }

  isCnpj(): boolean {
    return this.type === 'cnpj'
  }

  /**
   * Verifica se a string é um CPF ou CNPJ válido (dígitos verificadores corretos).
   */
  static isValid(raw: string | null | undefined): boolean {
    if (raw == null || typeof raw !== 'string') {
      return false
    }
    const cleaned = clean(raw)

    if (cleaned.length === 11) {
      return CPF.isValid(cleaned)
    }

    if (cleaned.length === 14) {
      return CNPJ.isValid(cleaned)
    }

    return false
  }

  static create(raw: string): CpfCnpj {
    const cleaned = clean(raw)

    if (cleaned.length !== 11 && cleaned.length !== 14) {
      throw new Error('CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos')
    }

    return new CpfCnpj({ value: cleaned })
  }
}
