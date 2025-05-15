import { OrderItem } from '../entities/order-item.entity';
import { OrderPlaced } from '../events/order-placed.event';

export type OrderStatus = 'CART' | 'PLACED';

export class Order {
  public readonly items: OrderItem[] = [];
  public status: OrderStatus = 'CART';
  private domainEvents: OrderPlaced[] = [];

  constructor(public readonly id: string) {}

  addItem(sku: string, qty: number): void {
    const existing = this.items.find((item) => item.props.productId === sku);

    if (existing) {
      existing.props.qty += qty;
    } else {
      this.items.push(new OrderItem({ productId: sku, qty }));
    }
  }

  checkout(): void {
    if (this.items.length === 0) {
      throw new Error('Empty cart');
    }

    if (this.status !== 'CART') {
      throw new Error('Order already processed');
    }

    this.status = 'PLACED';
    this.domainEvents.push(new OrderPlaced(this.id));
  }

  pullEvents() {
    const event = [...this.domainEvents];
    this.domainEvents = [];
    return event;
  }
}
