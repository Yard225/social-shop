export type Ok<T> = { readonly ok: true; readonly value: T };
export type Err<E> = { readonly ok: false; readonly error: E };

export type Result<T, E = Error> = Ok<T> | Err<E>;

export const Result = {
  ok<T>(value: T): Ok<T> {
    return { ok: true as const, value };
  },
  err<E = Error>(error: E): Err<E> {
    return { ok: false as const, error };
  },

  isOk<T, E>(res: Result<T, E>): res is Ok<T> {
    return res.ok;
  },
  isErr<T, E>(res: Result<T, E>): res is Err<E> {
    return !res.ok;
  },

  map<T, U, E>(res: Result<T, E>, fn: (value: T) => U): Result<U, E> {
    return Result.isOk(res) ? Result.ok(fn(res.value)) : res;
  },
  mapErr<T, E, F>(res: Result<T, E>, fn: (error: E) => F): Result<T, F> {
    return Result.isErr(res) ? Result.err(fn(res.error)) : res;
  },

  unwrap<T, E>(res: Result<T, E>): T {
    if (Result.isErr(res)) throw res.error;
    return res.value;
  },
};
