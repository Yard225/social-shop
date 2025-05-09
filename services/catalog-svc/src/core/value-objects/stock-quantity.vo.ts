import { Result } from '@org/shared-kernel';

export class StockQuantity {
  private constructor(private _value: number) {}

  get value() {
    return this._value;
  }

  static create(initialQty: number): Result<StockQuantity, Error> {
    if (!Number.isInteger(initialQty) || initialQty < 0) {
      return Result.err(new Error('Stock must be a non-negative integer'));
    }
    return Result.ok(new StockQuantity(initialQty));
  }

  add(delta: number) {
    const next = this._value + delta;
    if (next < 0) throw new Error('Stock cannot become negative');
    this._value = next;
  }
}
