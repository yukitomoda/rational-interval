"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logical3 = void 0;
class Logical3 {
    constructor(value) {
        Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: value
        });
    }
    static from(value) {
        if (value instanceof Logical3)
            return value;
        if (value === true)
            return this.true;
        if (value === false)
            return this.false;
        return this.indeterminate;
    }
    get isTrue() {
        return this.value === true;
    }
    get isFalse() {
        return this.value === false;
    }
    get isIndeterminate() {
        return this.value === null;
    }
    get isDeterminate() {
        return !this.isIndeterminate;
    }
    eq(rhs) {
        if (!(rhs instanceof Logical3))
            return this.eq(Logical3.from(rhs));
        return this.value === rhs.value;
    }
    not() {
        if (this.isTrue)
            return Logical3.false;
        if (this.isFalse)
            return Logical3.true;
        return Logical3.indeterminate;
    }
    or(rhs) {
        if (this.isTrue)
            return Logical3.true;
        if (!(rhs instanceof Logical3))
            return this.or(Logical3.from(rhs));
        if (rhs.isTrue)
            return Logical3.true;
        if (this.isIndeterminate || rhs.isIndeterminate)
            return Logical3.indeterminate;
        return Logical3.false;
    }
    and(rhs) {
        if (this.isFalse)
            return Logical3.false;
        if (!(rhs instanceof Logical3))
            return this.and(Logical3.from(rhs));
        if (rhs.isFalse)
            return Logical3.false;
        if (this.isIndeterminate || rhs.isIndeterminate)
            return Logical3.indeterminate;
        return Logical3.true;
    }
}
exports.Logical3 = Logical3;
Object.defineProperty(Logical3, "true", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new Logical3(true)
});
Object.defineProperty(Logical3, "false", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new Logical3(false)
});
Object.defineProperty(Logical3, "indeterminate", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new Logical3(null)
});
//# sourceMappingURL=Logical3.js.map