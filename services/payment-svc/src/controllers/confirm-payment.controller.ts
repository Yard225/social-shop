import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ConfirmPaymentUseCase } from '../core/usecases/confirm-payment.usecase';
import { InMemoryEventBus } from '../../../ordering-svc/src/adapters/out/in-memory-event-bus.repository';

@Controller('/payments/mobile-money')
export class ConfirmPaymentController {
  constructor(
    private readonly useCase: ConfirmPaymentUseCase,
    private readonly eventBus: InMemoryEventBus, // port EventPublisher dans prod
  ) {}

    @Post('callback')
    @HttpCode(202)
    async callback(@Body() dto: { paymentId: string; externalRef: string }): Promise<void> {
      const { events } = await this.useCase.execute(dto);
      await this.eventBus.publishAll(events);
    }
}
