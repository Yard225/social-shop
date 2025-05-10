import { parsePhoneNumberFromString } from 'libphonenumber-js';

export class PhoneNumber {
  private constructor(private readonly _e164: string) {}

  static create(raw: string): PhoneNumber {
    const parsed = parsePhoneNumberFromString(raw, { defaultCountry: 'CI' });

    if (!parsed?.isValid()) {
      throw new Error('Invalid phone number');
    }

    return new PhoneNumber(parsed.number);
  }

  get value(): string {
    return this._e164;
  }

  equals(other: PhoneNumber): boolean {
    return this._e164 === other._e164;
  }

  toString(): string {
    return this._e164;
  }
}
