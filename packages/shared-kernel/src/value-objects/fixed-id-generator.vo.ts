import { IIDGenerator } from '../primitives';

export class FixedIdGenerator implements IIDGenerator {
  generate(): string {
    return 'id-1';
  }
}
