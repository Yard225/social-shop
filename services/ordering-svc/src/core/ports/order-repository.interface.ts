import { Order } from '../core/aggregates/order.aggregate';

export interface IOrderRepository {
  findById(id: string): Promise<Order | null>;
  create(order: Order): Promise<void>;
}
