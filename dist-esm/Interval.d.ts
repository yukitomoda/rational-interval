import { type ConvertableToRatio, Ratio } from 'rational';
declare class Interval {
    readonly left: Ratio;
    readonly right: Ratio;
    readonly includesLeft: boolean;
    readonly includesRight: boolean;
    /**
     * 指定した始点、終点で区間を作成します。
     * @param left 区間の始点
     * @param right 区間の終点
     * @param includesLeft 区間の始点を含めるかどうか。
     * @param includesRight 区間の終点を含めるかどうか。
     */
    constructor(left: Ratio, right: Ratio, includesLeft?: boolean, includesRight?: boolean);
    /**
     * この区間が空かどうかを取得します。
     */
    get isEmpty(): boolean;
    /**
     * 閉区間を作成します。
     * @param left 区間の始点
     * @param right 区間の終点
     */
    static closed(left: ConvertableToRatio, right: ConvertableToRatio): Interval;
    /**
     * 開区間を作成します。
     * @param left 区間の始点
     * @param right 区間の終点
     */
    static open(left: ConvertableToRatio, right: ConvertableToRatio): Interval;
    /**
     * 左半開区間を作成します。
     * @param left 区間の始点
     * @param right 区間の終点
     */
    static rightHalfOpen(left: ConvertableToRatio, right: ConvertableToRatio): Interval;
    /**
     * 右半開区間を作成します。
     * @param left 区間の始点
     * @param right 区間の終点
     */
    static leftHalfOpen(left: ConvertableToRatio, right: ConvertableToRatio): Interval;
    /**
     * 空の区間を表します。
     */
    static readonly empty: Interval;
    /**
     * 指定した一点のみを含む区間を作成します。
     * @param point 区間に含む点
     */
    static point(point: ConvertableToRatio): Interval;
    /**
     * 指定した区間がこの区間と等しいかどうかを調べます。
     *
     * @param rhs 比較する区間
     */
    eq(rhs: Interval): boolean;
    /**
     * この区間の始点が、指定した点以上の範囲を含むかどうかを調べます。
     * @param value 判断する基準の点
     * @param includesValue その点を含むかどうか。falseの場合、valueの点を含まず、それよりも大きい範囲を含むかどうかを判断します。
     */
    private leftContains;
    /**
     * この区間の終点が、指定した点以下の範囲を含むかどうかを調べます。
     * @param value 判断する基準の点
     * @param includesValue その点を含むかどうか。falseの場合、valueの点を含まず、それよりも小さい範囲を含むかどうかを判断します。
     */
    private rightContains;
    /**
     * この区間が指定した値または区間のすべてを含むかどうかを調べます。
     * @param rhs 調べる値または範囲。
     */
    contains(rhs: Interval | ConvertableToRatio): boolean;
}
export { Interval };
