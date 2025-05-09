import { OrderItem } from '../entities/order-item.entity';
import { ProductSKU } from '../../../../../packages/shared-kernel/src/value-objects/product-sku.vo';

export class Order {
  public readonly items: OrderItem[] = [];

  constructor(public readonly id: string) {}

  addItem(sku: ProductSKU, qty: number) {
    const existing = this.items.find((item) =>
      item.props.productId.equals(sku),
    );
    if (existing) existing.props.qty += qty;
    else this.items.push(new OrderItem({ productId: sku, qty }));
  }
}
