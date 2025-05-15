import { Module } from '@nestjs/common';
import { ConfirmPaymentController } from './controllers/confirm-payment.controller';
import { ConfirmPaymentUseCase } from './core/usecases/confirm-payment.usecase';
import { InitiatePaymentUseCase } from './core/usecases/initiate-payment.usecase';
import { InMemoryPaymentRepository } from './adapters/out/in-memory-payment.repository';
import { I_PAYMENT_REPOSITORY } from './core/ports/payment-repository.interface';

@Module({
  controllers: [ConfirmPaymentController],
  providers: [
    {
      provide: ConfirmPaymentUseCase,
      inject: [I_PAYMENT_REPOSITORY],
      useFactory: (repository) => {
        return new ConfirmPaymentUseCase(repository);
      },
    },
    {
      provide: InitiatePaymentUseCase,
      inject: [I_PAYMENT_REPOSITORY],
      useFactory: (repository) => {
        return new InitiatePaymentUseCase(repository);
      },
    },
  ],
  exports: [InMemoryPaymentRepository, InitiatePaymentUseCase],
})
export class PaymentModuleTest {}
