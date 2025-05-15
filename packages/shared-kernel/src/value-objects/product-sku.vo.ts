export class ProductSKU {
  private constructor(private readonly value: string) {}

  public static create(raw: string): ProductSKU {
    if (!/^[A-Z0-9-]{3,30}$/.test(raw)) {
      throw new Error('Invalid SKU format');
    }

    return new ProductSKU(raw);
  }

  public equals(other: string): boolean {
    return this.value === other;
  }

  public toString() {
    return this.value;
  }
}
