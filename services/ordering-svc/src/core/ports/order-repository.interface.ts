import { Order } from '../aggregates/order.aggregate';

export interface IOrderRepository {
  findById(id: string): Promise<Order | null>;
  create(order: Order): Promise<void>;
}
