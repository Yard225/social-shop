export class Guard {
  static againstNullOrUndefined(value: unknown, argName: string): void {
    if (value === null || value === undefined) {
      throw new Error(`${argName} cannot be null or undefined`);
    }
  }

  static againstEmptyString(value: string, argName: string): void {
    if (value.trim().length === 0) {
      throw new Error(`${argName} cannot be empty`);
    }
  }
}
