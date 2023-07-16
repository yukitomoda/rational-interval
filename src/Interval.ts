import { type ConvertableToRatio, Ratio } from 'rational';

class Interval {
  /**
   * 指定した始点、終点で区間を作成します。
   * @param left 区間の始点
   * @param right 区間の終点
   * @param includesLeft 区間の始点を含めるかどうか。
   * @param includesRight 区間の終点を含めるかどうか。
   */
  public constructor(
    public readonly left: Ratio,
    public readonly right: Ratio,
    public readonly includesLeft: boolean = true,
    public readonly includesRight: boolean = true
  ) {}

  /**
   * この区間が空かどうかを取得します。
   */
  public get isEmpty(): boolean {
    if (this.includesLeft && this.includesRight) {
      return this.right.lt(this.left);
    } else {
      return this.right.leq(this.left);
    }
  }

  /**
   * 閉区間を作成します。
   * @param left 区間の始点
   * @param right 区間の終点
   */
  public static closed(left: ConvertableToRatio, right: ConvertableToRatio): Interval {
    return new Interval(Ratio.from(left), Ratio.from(right));
  }

  /**
   * 開区間を作成します。
   * @param left 区間の始点
   * @param right 区間の終点
   */
  public static open(left: ConvertableToRatio, right: ConvertableToRatio): Interval {
    return new Interval(Ratio.from(left), Ratio.from(right), false, false);
  }

  /**
   * 左半開区間を作成します。
   * @param left 区間の始点
   * @param right 区間の終点
   */
  public static rightHalfOpen(left: ConvertableToRatio, right: ConvertableToRatio): Interval {
    return new Interval(Ratio.from(left), Ratio.from(right), true, false);
  }

  /**
   * 右半開区間を作成します。
   * @param left 区間の始点
   * @param right 区間の終点
   */
  public static leftHalfOpen(left: ConvertableToRatio, right: ConvertableToRatio): Interval {
    return new Interval(Ratio.from(left), Ratio.from(right), false, true);
  }

  /**
   * 空の区間を表します。
   */
  public static readonly empty = Interval.open(0, 0);

  /**
   * 指定した一点のみを含む区間を作成します。
   * @param point 区間に含む点
   */
  public static point(point: ConvertableToRatio): Interval {
    point = Ratio.from(point);
    return new Interval(point, point, true, true);
  }

  /**
   * 指定した区間がこの区間と等しいかどうかを調べます。
   *
   * @param rhs 比較する区間
   */
  public eq(rhs: Interval): boolean {
    if (this.isEmpty) return rhs.isEmpty;
    return (
      this.includesLeft === rhs.includesLeft &&
      this.includesRight === rhs.includesRight &&
      this.left.eq(rhs.left) &&
      this.right.eq(rhs.right)
    );
  }

  /**
   * この区間の始点が、指定した点以上の範囲を含むかどうかを調べます。
   * @param value 判断する基準の点
   * @param includesValue その点を含むかどうか。falseの場合、valueの点を含まず、それよりも大きい範囲を含むかどうかを判断します。
   */
  private leftContains(value: Ratio, includesValue: boolean = true): boolean {
    if (this.includesLeft || !includesValue) {
      return this.left.leq(value);
    } else {
      return this.left.lt(value);
    }
  }

  /**
   * この区間の終点が、指定した点以下の範囲を含むかどうかを調べます。
   * @param value 判断する基準の点
   * @param includesValue その点を含むかどうか。falseの場合、valueの点を含まず、それよりも小さい範囲を含むかどうかを判断します。
   */
  private rightContains(value: Ratio, includesValue: boolean = true): boolean {
    if (this.includesRight || !includesValue) {
      return this.right.geq(value);
    } else {
      return this.right.gt(value);
    }
  }

  /**
   * この区間が指定した値または区間のすべてを含むかどうかを調べます。
   * @param rhs 調べる値または範囲。
   */
  public contains(rhs: Interval | ConvertableToRatio): boolean {
    if (rhs instanceof Interval) {
      if (rhs.isEmpty) return true;
      if (this.isEmpty) return false;
      return this.leftContains(rhs.left, rhs.includesLeft) && this.rightContains(rhs.right, rhs.includesRight);
    } else {
      if (this.isEmpty) return false;
      rhs = Ratio.from(rhs);
      if (rhs.lt(this.left) || this.right.lt(rhs)) return false;
      return this.leftContains(rhs) && this.rightContains(rhs);
    }
  }

  private changeBoundary(left: Ratio, right: Ratio): Interval {
    return new Interval(left, right, this.includesLeft, this.includesRight);
  }

  public add(rhs: Interval | ConvertableToRatio): Interval {
    if (this.isEmpty) return this;
    if (rhs instanceof Interval) {
      if (rhs.isEmpty) return rhs;
      return new Interval(
        this.left.add(rhs.left),
        this.right.add(rhs.right),
        this.includesLeft && rhs.includesLeft,
        this.includesRight && rhs.includesRight
      );
    } else {
      return this.changeBoundary(this.left.add(rhs), this.right.add(rhs));
    }
  }
}

export { Interval };
