import { Guard } from '../primitives';

export class Money {
  private constructor(
    private readonly _amount: number,
    private readonly _currency: string,
  ) {}

  static create(amount: number, currency: string): Money {
    if (!Number.isFinite(amount)) {
      throw new Error('Amount must be finite');
    }

    if (amount < 0) {
      throw new Error('Amount cannot be negative');
    }

    if (!/^[A-Z]{3}$/.test(currency)) {
      throw new Error('Currency must be ISO 4217');
    }

    return new Money(amount, currency);
  }

  static cfa(amount: number): Money {
    return Money.create(amount, 'XOF');
  }

  get amount(): number {
    return this._amount;
  }

  get currency(): string {
    return this._currency;
  }

  add(other: Money): Money {
    Guard.againstNullOrUndefined(other, 'other');
    if (this._currency !== other._currency) {
      throw new Error('Currency mismatch');
    }
    return Money.create(this._amount + other._amount, this._currency);
  }

  subtract(other: Money): Money {
    Guard.againstNullOrUndefined(other, 'other');

    if (this._currency !== other._currency) {
      throw new Error('Currency mismatch');
    }

    const next = this._amount - other._amount;

    if (next < 0) {
      throw new Error('Resulting amount cannot be negative');
    }

    return Money.create(next, this._currency);
  }

  multiply(factor: number): Money {
    if (!Number.isFinite(factor)) {
      throw new Error('Factor must be finite');
    }

    if (factor < 0) {
      throw new Error('Factor cannot be negative');
    }

    return Money.create(this._amount * factor, this._currency);
  }

  equals(other: Money): boolean {
    return this._currency === other._currency && this._amount === other._amount;
  }

  toString(): string {
    return `${this._amount.toFixed(2)} ${this._currency}`;
  }
}
