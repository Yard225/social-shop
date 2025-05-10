import { PaymentTransaction } from '../aggregates/payment-transaction.aggregate';

export interface IPaymentRepository {
  create(payment: PaymentTransaction): Promise<void>;
  findById(id: string): Promise<PaymentTransaction | null>;
  findAll(): Promise<PaymentTransaction[]>;
}
