// import { v4 as uuidv4 } from 'uuid';

// export class UniqueEntityID {
//   private readonly _value: string;

//   constructor(id?: string) {
//     this._value = id ?? uuidv4();
//   }

//   toString(): string {
//     return this._value;
//   }

//   equals(other: UniqueEntityID): boolean {
//     return this._value === other._value;
//   }
// }

import { v4 as uuidv4 } from 'uuid';

export type AggregateProps = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export abstract class Aggregate<T extends AggregateProps> {
  protected readonly _id: string;
  protected readonly _createdAt: Date;
  protected _updatedAt: Date;
  protected _props: T;
  protected _initialState: T;

  constructor(props: Partial<T>) {
    this._id = props.id;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
    this._props = props as T;
    this._initialState = props as T;

    Object.freeze(this._initialState);
  }

  get id(): string {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get props(): T {
    return this._props;
  }

  protected update(props: Partial<T>): void {
    this._updatedAt = new Date();
    this._props = { ...this._props, props };
  }

  protected commit() {
    this._initialState = this._props;
  }

  protected clone() {
    return new (this.constructor as new (props: Partial<T>) => Aggregate<T>)(this._initialState);
  }

  public equals(entity: Aggregate<T>): boolean {
    if (entity === null || entity === undefined) {
      return false;
    }
    if (this === entity) {
      return true;
    }
    return this._id === entity.id;
  }
}
