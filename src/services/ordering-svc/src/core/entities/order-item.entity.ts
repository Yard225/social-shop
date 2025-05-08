import { ProductSKU } from '../value-objects/product-sku.vo';

type ItemProps = {
  productId: ProductSKU;
  qty: number;
};

export class OrderItem {
  constructor(public props: ItemProps) {
    this.props = props;
  }
}
