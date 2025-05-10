import { DomainEvent } from '@org/shared-kernel';

export interface IEventPublisher {
  publish(event: DomainEvent<any>): Promise<void>;
  publishAll(events: DomainEvent<any>[]): Promise<void>;
}
