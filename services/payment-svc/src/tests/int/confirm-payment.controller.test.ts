import request from 'supertest';

import { InMemoryPaymentRepository } from '../../adapters/out/in-memory-payment.repository';
import { InitiatePaymentUseCase } from '../../core/usecases/initiate-payment.usecase';
import { TestApp } from '../utils/test-app';

describe('Feature: HTTP Callback → ConfirmPaymentController', () => {
  let app: TestApp;
  let repository: InMemoryPaymentRepository;
  let initiateUsecase: InitiatePaymentUseCase;
  let paymentId: string;

  beforeEach(async () => {
    app = new TestApp();
    repository = new InMemoryPaymentRepository();
    initiateUsecase = new InitiatePaymentUseCase(repository);
  });

  afterEach(async () => {
    await app.cleanup();
  });

  describe('Scenario: Happy Path', () => {
    it('sets status CONFIRMED and returns 202', async () => {
      // Fixures – 1 transaction PENDING
      const res = await initiateUsecase.execute({
        orderId: 'order-456',
        amountCfa: 45_000,
        phone: '+2250700000000',
      });

      paymentId = res.paymentId;

      await request(app.getHttpServer())
        .post('/payments/mobile-money/callback')
        .send({ paymentId, externalRef: 'MM-TXN-99' })
        .expect(202);

      const txn = await repository.findById(paymentId);
      expect(txn!.props.status).toBe('CONFIRMED');
    });
  });
});
