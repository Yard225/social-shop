import { DomainEvent } from '@org/shared-kernel';
import { IPaymentRepository } from '../ports/payment-repository.interface';

type Request = { paymentId: string; externalRef: string };

type Response = { events: DomainEvent[] };

export class ConfirmPaymentUseCase {
  constructor(private readonly repository: IPaymentRepository) {}

  async execute(request: Request): Promise<Response> {
    const payment = await this.repository.findById(request.paymentId);

    if (!payment) { 
        throw new Error('Payment not found')
    };

    payment.confirm(request.externalRef);
    
    await this.repository.create(payment);

    return {events: payment.pullEvents()}
  }
}
