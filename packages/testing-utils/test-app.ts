import { INestApplication, Type } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { IFixture } from './fixtures.interface';
import { TestAppOptions } from './test-app-options.interface';

export class TestApp<TModule = any> {
  private app: INestApplication;

  constructor(
    private readonly rootModule: Type<TModule>,
    private readonly options: TestAppOptions = {},
  ) {}

  /**
   * Création + init de l’application Nest *
   **/
  async setup(): Promise<void> {
    let builder = Test.createTestingModule({
      imports: [
        this.rootModule,
        ConfigModule.forRoot({
          isGlobal: true,
          ignoreEnvFile: true,
          load: [() => this.options.env ?? {}],
        }),
      ],
    });

    if (this.options.override) {
      builder = this.options.override(builder);
    }

    const module = await builder.compile();
    this.app = module.createNestApplication() as INestApplication;
    await this.app.init();

    if (this.options.clearDatabase) {
      await this.options.clearDatabase(this.app);
    }
  }

  async cleanup(): Promise<void> {
    await this.app?.close();
  }

  async loadFixtures(fixtures: IFixture[]): Promise<void> {
    await Promise.all(fixtures.map((f) => f.load(this)));
  }

  get<T = any>(token: any): T {
    return this.app.get<T>(token);
  }

  getHttpServer() {
    return this.app.getHttpServer();
  }
}
