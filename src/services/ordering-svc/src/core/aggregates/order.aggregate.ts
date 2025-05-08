import { OrderItem } from '../entities/order-item.entity';
import { ProductSKU } from '../value-objects/product-sku.vo';

export class Order {
  public readonly items: OrderItem[] = [];

  constructor(public readonly id: string) {}

  addItem(sku: ProductSKU, qty: number) {
    const existingItem = this.items.find((i) => i.props.productId.equals(sku));
    if (existingItem) {
      existingItem.props.qty += qty;
    } else {
      this.items.push(new OrderItem({ productId: sku, qty: qty }));
    }
  }
}
