import { INestApplication, Type } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PaymentModuleTest } from '../../payment.module';

export class TestApp {
  private app: INestApplication;

  async setup() {
    const module = await Test.createTestingModule({
      imports: [PaymentModuleTest],
    }).compile();

    this.app = module.createNestApplication();
    await this.app.init();
  }

  async cleanup() {
    await this.app.close();
  }

  get<T>(name: Type<T> | string | symbol) {
    return this.app.get<T>(name);
  }

  getHttpServer() {
    return this.app.getHttpServer();
  }
}
