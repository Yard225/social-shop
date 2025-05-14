import { INestApplication, Type } from '@nestjs/common';
import { Test } from '@nestjs/testing';
// import { ConfigModule } from '@nestjs/config';
import { PaymentModuleTest } from '../../payment.module';

export class TestApp {
  private app: INestApplication;

  async setup() {
    const module = await Test.createTestingModule({
      imports: [
        PaymentModuleTest,
        // ConfigModule.forRoot({
        //   ignoreEnvFile: true,
        //   ignoreEnvVars: true,
        //   isGlobal: true,
        //   // load: [
        //   //   () => ({
        //   //     DATABASE_URL:
        //   //       'mongodb://admin:azerty@localhost:3701/webinaires?authSource=admin&directConnection=true',
        //   //   }),
        //   // ],
        // }),
      ],
    }).compile();

    this.app = module.createNestApplication();
    await this.app.init();

    // await this.clearDatabase();
  }

  async cleanup() {
    await this.app.close();
  }

  // async loadFixtures(fixtures: IFixture[]) {
  //   return Promise.all(fixtures.map((fixture) => fixture.load(this)));
  // }

  get<T>(name: Type<T> | string | symbol) {
    return this.app.get<T>(name);
  }

  getHttpServer() {
    return this.app.getHttpServer();
  }

  // private async clearDatabase() {
  //   await this.app
  //     .get<
  //       Model<MongoUser.SchemaClass>
  //     >(getModelToken(MongoUser.CollectionName))
  //     .deleteMany({});

  //   await this.app
  //     .get<
  //       Model<MongoWebinaire.SchemaClass>
  //     >(getModelToken(MongoWebinaire.CollectionName))
  //     .deleteMany({});

  //   await this.app
  //     .get<
  //       Model<MongoParticipation.SchemaClass>
  //     >(getModelToken(MongoParticipation.CollectionName))
  //     .deleteMany({});
  // }
}
