import { ValueObject } from "@/core/entities/value-objects";

interface LicensePlateProps {
  toString: string;
}

export class LicensePlate extends ValueObject<LicensePlateProps> {
  get toString() {
    return this.props.toString;
  }

  static transform(value: string): LicensePlate {
    if (!value || typeof value !== 'string') {
      throw new Error('License plate value is required and must be a string');
    }

    const cleanedValue = value
      .replace(/[^a-zA-Z0-9]/g, '')
      .toUpperCase();

    const regex = /[A-Z]{3}[0-9][0-9A-Z][0-9]{2}/;

    if (!regex.test(cleanedValue)) {
      throw new Error('Invalid license plate format');
    }

    const valueUpper = value.toUpperCase();

    return new LicensePlate({
      toString: valueUpper,
    });
  }

  static create(
    value: string,
  ): LicensePlate {

    return new LicensePlate({
      toString: value,
    });

  }
}
