import { Money } from '@org/shared-kernel';
import { StockQuantity } from '../value-objects/stock-quantity.vo';

/**
 * Represents a product variant with a SKU, price, and stock quantity.
 * The stock quantity can be adjusted.
 */

export class Variant {
  private constructor(
    public readonly sku: string,
    public readonly price: Money,
    private readonly _stock: StockQuantity,
  ) {}

  static create(props: { sku: string; price: Money; stock: number }) {
    return new Variant(
      props.sku,
      props.price,
      StockQuantity.create(props.stock),
    );
  }

  get stock() {
    return this._stock.value;
  }

  adjustStock(delta: number) {
    this._stock.add(delta);
  }
}
