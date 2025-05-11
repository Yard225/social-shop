import { PaymentConfirmed } from '../events/payment-confirmed.event';

export type PaymentStatus = 'PENDING' | 'CONFIRMED' | 'FAILED' | 'REFUNDED';

type PaymentTransactionProps = {
  readonly id: string;
  readonly orderId: string;
  readonly amountCfa: number;
  readonly msisdn: string;
  status?: PaymentStatus;
  externalRef?: string;
};

export class PaymentTransaction {
  private domainEvents: PaymentConfirmed[] = [];

  constructor(public props: PaymentTransactionProps) {
    this.props.status = 'PENDING';
  }

  confirm(externalRef: string) {
    if (this.props.status !== 'PENDING') {
      throw new Error('Cannot confirm already processed payment');
    }

    this.props.status = 'CONFIRMED';
    this.props.externalRef = externalRef;
    this.domainEvents.push(new PaymentConfirmed(this.props.id, this.props.orderId)); //?
  }

  pullEvents() {
    const event = [...this.domainEvents];
    this.domainEvents = [];
    return event; //?
  }
}
