"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConvertableToLogical3 = void 0;
const Logical3_1 = require("./Logical3");
function isConvertableToLogical3(value) {
    return value instanceof Logical3_1.Logical3 || typeof value === 'boolean' || value === null;
}
exports.isConvertableToLogical3 = isConvertableToLogical3;
//# sourceMappingURL=types.js.map