export interface IDateGenerator {
  now(): Date;
}

export interface IIDGenerator {
  generate(): string;
}

export interface IMailer {
  send(to: string, subject: string, content: string): Promise<void>;
}

export interface ILogger {
  info(message: string, context?: any): void;
  error(message: string, context?: any): void;
  warn(message: string, context?: any): void;
  debug(message: string, context?: any): void;
}

export interface IEventPublisher {
  publish(event: any): Promise<void>;
}

export interface IEventSubscriber {
  subscribe(event: string, handler: (event: any) => Promise<void>): void;
}
