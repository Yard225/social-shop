export abstract class DomainEvent<
  TPayload extends Record<string, unknown> = Record<string, unknown>,
> {
  readonly occurredAt: Date;
  readonly traceId?: string;

  protected constructor(
    readonly payload: TPayload,
    traceId?: string,
  ) {
    this.occurredAt = new Date();
    this.traceId = traceId;
  }

  abstract name(): string;
}
