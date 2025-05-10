export type PaymentStatus = 'PENDING' | 'CONFIRMED' | 'FAILED' | 'REFUNDED';

type PaymentTransactionProps = {
  readonly id: string;
  readonly orderId: string;
  readonly amountCfa: number;
  readonly msisdn: string;
  status?: PaymentStatus;
};

export class PaymentTransaction {
  constructor(public props: PaymentTransactionProps) {
    this.props.status = 'PENDING';
  }
}
