import { Decimal } from '@prisma/client/runtime/library';

export class Discount {
  private value: number;

  toValue() {
    return this.value;
  }

  static verify(value: string): boolean {
    if (value === '-') return true;

    const regex = /(?:R?\$?\s*)?(\d{1,6}(?:\.\d{3})*|\d+)([,.]\d{1,2})?/;
    const test = regex.test(value);

    return test;
  }

  private constructor(parameter: string | number | Decimal) {
    if (parameter instanceof Decimal) {
      this.value = parameter.toNumber();
      return;
    }

    if (
      typeof parameter === 'object' &&
      parameter !== null &&
      typeof (parameter as { toNumber?: () => number }).toNumber === 'function'
    ) {
      this.value = (parameter as { toNumber: () => number }).toNumber();
      return;
    }

    if (typeof parameter === 'number') {
      this.value = parameter;
      return;
    }

    const newValue = parameter.replace('%', '');

    const parsed = parseFloat(newValue);

    this.value = parsed;
  }

  static create(parameter: string | number | Decimal | null): Discount | null {
    if (parameter === null || parameter === undefined || parameter === '-' || parameter === '') {
      return null;
    }
    return new Discount(parameter);
  }

  static createWithDecimal(parameter: Decimal): Discount {
    const value = parameter.toNumber();
    return new Discount(value);
  }

  static createByDTO(parameter: string | undefined): Discount | null {
    if (!parameter || parameter === '-' || parameter === '') {
      return null;
    }
    return new Discount(parameter);
  }
}
