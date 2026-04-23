export enum HasReplacementEnum {
  WITH_REPLACEMENT = 'T',
  WITHOUT_REPLACEMENT = 'S',
}

export class HasReplacement {
  private value: HasReplacementEnum | null

  get abbreviation(): string | null {
    return this.value
  }

  hasReplacement(): boolean {
    return this.value === HasReplacementEnum.WITH_REPLACEMENT
  }

  toValue(): HasReplacementEnum | null {
    return this.value
  }

  constructor(value: string | undefined | null) {
    if (!value) {
      this.value = null
      return
    }

    const upperCaseValue = value.toUpperCase()

    if (upperCaseValue === 'T' || upperCaseValue === 'COM TROCA') {
      this.value = HasReplacementEnum.WITH_REPLACEMENT
    } else if (upperCaseValue === 'S' || upperCaseValue === 'SEM TROCA') {
      this.value = HasReplacementEnum.WITHOUT_REPLACEMENT
    } else {
      this.value = null
    }
  }

  static create(value: string | undefined | null): HasReplacement {
    return new HasReplacement(value)
  }

  static fromAbbreviation(abbreviation: string | undefined | null): HasReplacement {
    return new HasReplacement(abbreviation)
  }
}
