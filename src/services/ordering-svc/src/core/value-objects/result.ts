export class Result<T, E> {
  private constructor(
    private readonly _isSuccess: boolean,
    private readonly _value?: T,
    private readonly _error?: E,
  ) {}

  static ok<T, E>(value: T): Result<T, E> {
    return new Result<T, E>(true, value);
  }

  static err<T, E>(error: E): Result<T, E> {
    return new Result<T, E>(false, undefined, error);
  }

  isSuccess(): boolean {
    return this._isSuccess;
  }

  getValue(): T | undefined {
    return this._value;
  }

  getError(): E | undefined {
    return this._error;
  }
}
