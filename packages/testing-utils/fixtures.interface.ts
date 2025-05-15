import { TestApp } from './test-app';

export interface IFixture {
  load(app: TestApp<any>): Promise<void>;
}
