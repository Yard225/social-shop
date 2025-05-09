import { ProductSKU } from '@org/shared-kernel';
import { Money } from '@org/shared-kernel';
import { StockQuantity } from '../value-objects/stock-quantity.vo';

export class Variant {
  private constructor(
    public readonly sku: ProductSKU,
    public readonly price: Money,
    private readonly _stock: StockQuantity,
  ) {}

  static create(props: { sku: ProductSKU; price: Money; stock: number }) {
    return new Variant(
      props.sku,
      props.price,
      StockQuantity.create(props.stock).value,
    );
  }

  get stock() {
    return this._stock.value;
  }

  adjustStock(delta: number) {
    this._stock.add(delta);
  }
}
