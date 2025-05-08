import { Order } from '../core/aggregates/order.aggregate';
import { IOrderRepository } from '../ports/repository.interface';

export class InMemoryOrderRepository implements IOrderRepository {
  public readonly database: Order[] = [];

  async findById(id: string): Promise<Order | null> {
    return Promise.resolve(this.findByIdSync(id));
  }

  findByIdSync(id: string): Order | null {
    const order = this.database.find((order) => order.id === id);
    if (!order) {
      return null;
    }
    return order;
  }

  async create(order: Order): Promise<void> {
    this.database.push(order);
  }
}
