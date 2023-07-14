"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interval = void 0;
const rational_1 = require("rational");
class Interval {
    /**
     * 指定した始点、終点で区間を作成します。
     * @param left 区間の始点
     * @param right 区間の終点
     * @param includesLeft 区間の始点を含めるかどうか。
     * @param includesRight 区間の終点を含めるかどうか。
     */
    constructor(left, right, includesLeft = true, includesRight = true) {
        Object.defineProperty(this, "left", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: left
        });
        Object.defineProperty(this, "right", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: right
        });
        Object.defineProperty(this, "includesLeft", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: includesLeft
        });
        Object.defineProperty(this, "includesRight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: includesRight
        });
    }
    /**
     * この区間が空かどうかを取得します。
     */
    get isEmpty() {
        if (this.includesLeft && this.includesRight) {
            return this.right.lt(this.left);
        }
        else {
            return this.right.leq(this.left);
        }
    }
    /**
     * 閉区間を作成します。
     * @param left 区間の始点
     * @param right 区間の終点
     */
    static closed(left, right) {
        return new Interval(rational_1.Ratio.from(left), rational_1.Ratio.from(right));
    }
    /**
     * 開区間を作成します。
     * @param left 区間の始点
     * @param right 区間の終点
     */
    static open(left, right) {
        return new Interval(rational_1.Ratio.from(left), rational_1.Ratio.from(right), false, false);
    }
    /**
     * 左半開区間を作成します。
     * @param left 区間の始点
     * @param right 区間の終点
     */
    static rightHalfOpen(left, right) {
        return new Interval(rational_1.Ratio.from(left), rational_1.Ratio.from(right), true, false);
    }
    /**
     * 右半開区間を作成します。
     * @param left 区間の始点
     * @param right 区間の終点
     */
    static leftHalfOpen(left, right) {
        return new Interval(rational_1.Ratio.from(left), rational_1.Ratio.from(right), false, true);
    }
    /**
     * 指定した一点のみを含む区間を作成します。
     * @param point 区間に含む点
     */
    static point(point) {
        point = rational_1.Ratio.from(point);
        return new Interval(point, point, true, true);
    }
    /**
     * 指定した区間がこの区間と等しいかどうかを調べます。
     *
     * @param rhs 比較する区間
     */
    eq(rhs) {
        if (this.isEmpty)
            return rhs.isEmpty;
        return (this.includesLeft === rhs.includesLeft &&
            this.includesRight === rhs.includesRight &&
            this.left.eq(rhs.left) &&
            this.right.eq(rhs.right));
    }
    /**
     * この区間の始点が、指定した点以上の範囲を含むかどうかを調べます。
     * @param value 判断する基準の点
     * @param includesValue その点を含むかどうか。falseの場合、valueの点を含まず、それよりも大きい範囲を含むかどうかを判断します。
     */
    leftContains(value, includesValue = true) {
        if (this.includesLeft || !includesValue) {
            return this.left.leq(value);
        }
        else {
            return this.left.lt(value);
        }
    }
    /**
     * この区間の終点が、指定した点以下の範囲を含むかどうかを調べます。
     * @param value 判断する基準の点
     * @param includesValue その点を含むかどうか。falseの場合、valueの点を含まず、それよりも小さい範囲を含むかどうかを判断します。
     */
    rightContains(value, includesValue = true) {
        if (this.includesRight || !includesValue) {
            return this.right.geq(value);
        }
        else {
            return this.right.gt(value);
        }
    }
    /**
     * この区間が指定した値または区間のすべてを含むかどうかを調べます。
     * @param rhs 調べる値または範囲。
     */
    contains(rhs) {
        if (rhs instanceof Interval) {
            if (rhs.isEmpty)
                return true;
            if (this.isEmpty)
                return false;
            return this.leftContains(rhs.left, rhs.includesLeft) && this.rightContains(rhs.right, rhs.includesRight);
        }
        else {
            if (this.isEmpty)
                return false;
            rhs = rational_1.Ratio.from(rhs);
            if (rhs.lt(this.left) || this.right.lt(rhs))
                return false;
            return this.leftContains(rhs) && this.rightContains(rhs);
        }
    }
}
exports.Interval = Interval;
/**
 * 空の区間を表します。
 */
Object.defineProperty(Interval, "empty", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Interval.open(0, 0)
});
//# sourceMappingURL=Interval.js.map