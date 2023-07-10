import { type ConvertableToLogical3 } from './types';
declare class Logical3 {
    private readonly value;
    private constructor();
    static readonly true: Logical3;
    static readonly false: Logical3;
    static readonly indeterminate: Logical3;
    static from(value: ConvertableToLogical3): Logical3;
    get isTrue(): boolean;
    get isFalse(): boolean;
    get isIndeterminate(): boolean;
    get isDeterminate(): boolean;
    eq(rhs: ConvertableToLogical3): boolean;
    not(): Logical3;
    or(rhs: ConvertableToLogical3): Logical3;
    and(rhs: ConvertableToLogical3): Logical3;
}
export { Logical3 };
