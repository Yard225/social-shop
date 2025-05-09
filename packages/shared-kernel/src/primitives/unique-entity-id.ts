import { v4 as uuidv4 } from 'uuid';

export class UniqueEntityID {
  private readonly _value: string;

  constructor(id?: string) {
    this._value = id ?? uuidv4();
  }

  toString(): string {
    return this._value;
  }

  equals(other: UniqueEntityID): boolean {
    return this._value === other._value;
  }
}
