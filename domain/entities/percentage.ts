import { Decimal } from '@prisma/client/runtime/library';

export class Percentage {
  private value: number;

  toValue() {
    return this.value;
  }

  private verify(value: string): number {
    const cleaned = value.replace(/[^a-zA-Z0-9\s.,-]/g, '');
    const parsed = parseFloat(cleaned);
    if (isNaN(parsed)) {
      // throw new Error('Invalid percentage value');
      console.log('isNaN', isNaN(parsed));

      return 0;
    }
    return parsed;
  }

  private constructor(value: number | Decimal | string) {
    if (typeof value === 'number') {
      this.value = value;
      return;
    }

    if (value instanceof Decimal) {
      this.value = value.toNumber();
      return;
    }

    if (!value) {
      this.value = 0;
      return;
    }

    const parse = this.verify(value);

    this.value = parse;
  }

  static create(value: number | string): Percentage {
    return new Percentage(value);
  }

}
