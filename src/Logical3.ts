import { type ConvertableToLogical3 } from './types';

class Logical3 {
  private constructor(private readonly value: boolean | null) {}

  public static readonly true: Logical3 = new Logical3(true);
  public static readonly false: Logical3 = new Logical3(false);
  public static readonly indeterminate: Logical3 = new Logical3(null);

  public static from(value: ConvertableToLogical3): Logical3 {
    if (value instanceof Logical3) return value;
    if (value === true) return this.true;
    if (value === false) return this.false;
    return this.indeterminate;
  }

  public get isTrue(): boolean {
    return this.value === true;
  }

  public get isFalse(): boolean {
    return this.value === false;
  }

  public get isIndeterminate(): boolean {
    return this.value === null;
  }

  public get isDeterminate(): boolean {
    return !this.isIndeterminate;
  }

  public eq(rhs: ConvertableToLogical3): boolean {
    if (!(rhs instanceof Logical3)) return this.eq(Logical3.from(rhs));
    return this.value === rhs.value;
  }

  public not(): Logical3 {
    if (this.isTrue) return Logical3.false;
    if (this.isFalse) return Logical3.true;
    return Logical3.indeterminate;
  }

  public or(rhs: ConvertableToLogical3): Logical3 {
    if (this.isTrue) return Logical3.true;
    if (!(rhs instanceof Logical3)) return this.or(Logical3.from(rhs));
    if (rhs.isTrue) return Logical3.true;
    if (this.isIndeterminate || rhs.isIndeterminate) return Logical3.indeterminate;
    return Logical3.false;
  }

  public and(rhs: ConvertableToLogical3): Logical3 {
    if (this.isFalse) return Logical3.false;
    if (!(rhs instanceof Logical3)) return this.and(Logical3.from(rhs));
    if (rhs.isFalse) return Logical3.false;
    if (this.isIndeterminate || rhs.isIndeterminate) return Logical3.indeterminate;
    return Logical3.true;
  }
}

export { Logical3 };
