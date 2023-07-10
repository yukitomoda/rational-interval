import { Logical3 } from './Logical3';
type ConvertableToLogical3 = Logical3 | boolean | null;
declare function isConvertableToLogical3(value: any): value is ConvertableToLogical3;
export { type ConvertableToLogical3, isConvertableToLogical3 };
