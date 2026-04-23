import { Decimal } from '@prisma/client/runtime/library';

export class Time {
  private value: number;

  toValue() {
    return this.value;
  }

  private verify(value: string): number {
    const regex = /(?:R?\$?\s*)?(\d{1,6}(?:\.\d{3})*|\d+)([,.]\d{1,2})?/g;

    const match = regex.exec(value);

    if (!match) {
      console.log('Invalid time format:', value);
      return 0;
      // throw new Error('Invalid time format');
    }

    const integer = match[1] ? match[1].replace('.', ',') : '0';
    var cents = match[2] ? match[2].replace(',', '.') : '.00';
    const all = integer.replace(',', '') + cents;

    const parse = parseFloat(all);

    return parse;
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

  static create(value: number | Decimal | string): Time {
    return new Time(value);
  }
}
