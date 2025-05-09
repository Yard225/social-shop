import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { Result } from '../primitives';

export class PhoneNumber {
  private constructor(private readonly _e164: string) {}

  static create(raw: string): Result<PhoneNumber, Error> {
    const parsed = parsePhoneNumberFromString(raw, { defaultCountry: 'CI' });
    if (!parsed || !parsed.isValid())
      return Result.err(new Error('Invalid phone number'));
    return Result.ok(new PhoneNumber(parsed.number));
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
