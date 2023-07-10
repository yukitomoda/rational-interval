import { Logical3 } from './Logical3';

type ConvertableToLogical3 = Logical3 | boolean | null;
function isConvertableToLogical3(value: any): value is ConvertableToLogical3 {
  return value instanceof Logical3 || typeof value === 'boolean' || value === null;
}

export { type ConvertableToLogical3, isConvertableToLogical3 };
