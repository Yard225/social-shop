import { IPaymentRepository } from '../ports/payment-repository.interface';
import { PaymentTransaction } from '../aggregates/payment-transaction.aggregate';
import { v4 as uuid } from 'uuid';
import { PhoneNumber } from '../value-objects/phone.vo';

type Request = { orderId: string; amountCfa: number; phone: string };

type Response = { paymentId: string };

export const INITIATE_PAYMENT_USECASE = 'INITIATE_PAYMENT_USECASE';

export class InitiatePaymentUseCase {
  constructor(private readonly repository: IPaymentRepository) {}

  async execute(request: Request): Promise<Response> {
    const msisdn = PhoneNumber.create(request.phone);

    const transaction = new PaymentTransaction({
      id: uuid(),
      orderId: request.orderId,
      amountCfa: request.amountCfa,
      msisdn: msisdn.toString(),
    });

    await this.repository.create(transaction);

    return { paymentId: transaction.props.id };
  }
}
