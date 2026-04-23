import { Decimal } from '@prisma/client/runtime/library';

export class Price {
  private value: number;

  toValue() {
    return this.value;
  }

  toString() {
    return this.value.toString();
  }

  private static verify(value: string): number {
    if (!value || typeof value !== 'string') {
      return 0;
    }
    const cleaned = value.replace(/[^0-9.,]/g, '');

    // console.log('Cleaned price value:', cleaned);

    if (cleaned.length === 0) {
      return 0;
    }

    const regex = /(?:R?\$?\s*)?(\d{1,6}(?:\.\d{3})*|\d+)([,.]\d{1,2})?/g;

    const match = regex.exec(value);

    if (!match) {
      // const received = value === '' ? '(vazio)' : `'${value}'`;
      // throw new Error(
      //   `Formato de preço inválido. Valor recebido: ${received}. Esperado: número no formato brasileiro (ex: 1.234,56 ou R$ 1.234,56).`
      // );
      return 0;
    }

    const integer = match[1] ? match[1].replace('.', ',') : '0';
    var cents = match[2] ? match[2].replace(',', '.') : '.00';
    const all = integer.replace(',', '') + cents;

    const parse = parseFloat(all);

    if (isNaN(parse)) {
      return 0;
      // throw new Error(
      //   `Valor de preço inválido após interpretação. Valor original: '${value}', interpretado como: '${all}'.`
      // );
    }
    return parse;
  }

  private constructor(value: number | Decimal) {
    if (typeof value === 'number') {
      this.value = value;
      return;
    }

    if (value instanceof Decimal) {
      this.value = value.toNumber();
      return;
    }

    this.value = 0;
  }

  static create(value: number | Decimal): Price {
    return new Price(value);
  }

  static createWithNumber(value: number): Price {
    return new Price(value);
  }

  static createWithDecimal(value: Decimal): Price {
    const numberValue = value.toNumber();
    return new Price(numberValue);
  }

  static createWithString(value: string): Price {
    const parsedValue = this.verify(value);

    return new Price(parsedValue);
  }

  // static createByDTO(value: string | undefined): Price | null {
  //   if (!value) {
  //     return null;
  //   }
  //   const test = this.verify(value);
  //   if (!value) {
  //     return null;
  //   }
  //   return new Price(test);
  // }
}
