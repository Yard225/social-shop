import { OrderPlaced } from '../../../../ordering-svc/src/core/events/order-placed.event';
import { InMemoryEventBus } from '../../../../ordering-svc/src/adapters/out/in-memory-event-bus.repository';
import { InitiatePaymentUseCase } from '../../core/usecases/initiate-payment.usecase';
import { DomainEvent } from 'packages/shared-kernel/src';

export class OrderPlacedListener {
  constructor(
    eventBus: InMemoryEventBus, // dans prod : interface générique IEventBus
    private readonly usecase: InitiatePaymentUseCase,
  ) {
    eventBus.subscribe((event) => this.handle(event));
  }

  private async handle(event: DomainEvent<{orderId: string}>) {
    if (event instanceof OrderPlaced) {
      await this.usecase.execute({
        orderId: event.payload.orderId,
        amountCfa: 0, // TODO: calculer depuis OrderReadModel
        phone: '+2250700000000', // TODO: récupérer numéro client
      });
    }
  }
}
