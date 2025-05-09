import { ProductSKU } from '../../../../../packages/shared-kernel/src/value-objects/product-sku.vo';

type ItemProps = {
  readonly productId: ProductSKU;
  qty: number;
};

export class OrderItem {
  constructor(public props: ItemProps) {}
}
