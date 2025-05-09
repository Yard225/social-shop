import { Result } from '../primitives/result';

export class ProductSKU {
  private constructor(private readonly value: string) {}

  public static create(raw: string): Result<ProductSKU, Error> {
    if (!/^[A-Z0-9-]{3,30}$/.test(raw)) {
      return Result.err(new Error('Invalid SKU format'));
    }
    return Result.ok(new ProductSKU(raw));
  }
  public equals(other: ProductSKU): boolean {
    return this.value === other.value;
  }
  public toString() {
    return this.value;
  }
}
