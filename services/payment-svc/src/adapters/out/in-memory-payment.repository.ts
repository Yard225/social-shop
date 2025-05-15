import { PaymentTransaction } from '../../core/aggregates/payment-transaction.aggregate';
import { IPaymentRepository } from '../../core/ports/payment-repository.interface';

export class InMemoryPaymentRepository implements IPaymentRepository {
  constructor(public readonly database: PaymentTransaction[] = []) {}

  async create(payment: PaymentTransaction): Promise<void> {
    this.database.push(payment);
  }

  async findById(id: string): Promise<PaymentTransaction | null> {
    return this.findByIdSync(id);
  }

  findByIdSync(id: string): PaymentTransaction | null {
    return this.database.find((transaction) => transaction.props.id === id) ?? null;
  }

  async findAll(): Promise<PaymentTransaction[]> {
    return this.database;
  }
}
