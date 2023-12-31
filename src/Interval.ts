import { type ConvertableToRatio, Ratio } from 'rational';

class Interval {
  /**
   * 指定した中心、半径で区間を作成します。
   * @param center 区間中心
   * @param radius 区間の半径
   * @param includesLeft 区間の始点を含めるかどうか。
   * @param includesRight 区間の終点を含めるかどうか。
   */
  public constructor(
    public readonly center: Ratio,
    public readonly radius: Ratio,
    public readonly includesLeft: boolean = true,
    public readonly includesRight: boolean = true
  ) {
    if (radius.isNegative) throw new Error('radius must not be negative.');
  }

  /**
   * この区間が空かどうかを取得します。
   */
  public get isEmpty(): boolean {
    if (this.includesLeft && this.includesRight) {
      return false;
    } else {
      return !this.radius.isPositive;
    }
  }

  /**
   * この区間の左端を取得します。
   */
  public get left(): Ratio {
    return this.center.sub(this.radius);
  }

  /**
   * この区間の右端を取得します。
   */
  public get right(): Ratio {
    return this.center.add(this.radius);
  }

  /**
   * 区間の両端の値から、区間のインスタンスを作成します。
   * @param left 区間の左端の点。
   * @param right 区間の右端の点。
   * @param includesLeft 区間の始点を含めるかどうか。
   * @param includesRight 区間の終点を含めるかどうか。
   */
  public static fromBoundary(
    left: ConvertableToRatio,
    right: ConvertableToRatio,
    includesLeft: boolean = true,
    includesRight: boolean = true
  ): Interval {
    left = Ratio.from(left);
    right = Ratio.from(right);
    const center = left.add(right).div(2);
    const radius = right.sub(left).div(2);
    return new Interval(center, radius, includesLeft, includesRight);
  }

  /**
   * 閉区間を作成します。
   * @param left 区間の始点
   * @param right 区間の終点
   */
  public static closed(left: ConvertableToRatio, right: ConvertableToRatio): Interval {
    return Interval.fromBoundary(left, right);
  }

  /**
   * 開区間を作成します。
   * @param left 区間の始点
   * @param right 区間の終点
   */
  public static open(left: ConvertableToRatio, right: ConvertableToRatio): Interval {
    return Interval.fromBoundary(left, right, false, false);
  }

  /**
   * 左半開区間を作成します。
   * @param left 区間の始点
   * @param right 区間の終点
   */
  public static rightHalfOpen(left: ConvertableToRatio, right: ConvertableToRatio): Interval {
    return Interval.fromBoundary(left, right, true, false);
  }

  /**
   * 右半開区間を作成します。
   * @param left 区間の始点
   * @param right 区間の終点
   */
  public static leftHalfOpen(left: ConvertableToRatio, right: ConvertableToRatio): Interval {
    return Interval.fromBoundary(left, right, false, true);
  }

  /**
   * 空の区間を表します。
   */
  public static readonly empty = new Interval(Ratio.from(0), Ratio.from(0), false, false);

  /**
   * 指定した一点のみを含む区間を作成します。
   * @param point 区間に含む点
   */
  public static point(point: ConvertableToRatio): Interval {
    return new Interval(Ratio.from(point), Ratio.from(0), true, true);
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
      this.center.eq(rhs.center) &&
      this.radius.eq(rhs.radius)
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
    return Interval.fromBoundary(left, right, this.includesLeft, this.includesRight);
  }

  /**
   * この区間の正負を反転した区間を返します。
   */
  public neg(): Interval {
    if (this.isEmpty) return this;
    return new Interval(this.center.neg(), this.radius, this.includesRight, this.includesLeft);
  }

  /**
   * この区間を逆数の区間に変換します。
   *
   * この関数を使用する場合、区間に0が（0が含まれない開区間である場合を含めて）含まれていてはなりません。
   */
  public inv(): Interval {
    if (this.isEmpty) return this;
    if (new Interval(this.center, this.radius).contains(Ratio.from(0)))
      throw new Error('Interval must not contain zero.');
    return Interval.fromBoundary(this.right.inv(), this.left.inv(), this.includesRight, this.includesLeft);
  }

  /**
   * この区間に指定した値または区間を加算します。
   * @param rhs 加算する値または区間
   */
  public add(rhs: Interval | ConvertableToRatio): Interval {
    if (this.isEmpty) return this;
    if (rhs instanceof Interval) {
      if (rhs.isEmpty) return rhs;
      return new Interval(
        this.center.add(rhs.center),
        this.radius.add(rhs.radius),
        this.includesLeft && rhs.includesLeft,
        this.includesRight && rhs.includesRight
      );
    } else {
      return new Interval(this.center.add(rhs), this.radius, this.includesLeft, this.includesRight);
    }
  }

  /**
   * この区間から指定した値または区間を減算します。
   * @param rhs 減算する値または区間
   */
  public sub(rhs: Interval | ConvertableToRatio): Interval {
    if (rhs instanceof Interval) {
      return this.add(rhs.neg());
    } else {
      return this.add(Ratio.from(rhs).neg());
    }
  }

  /**
   * この区間に指定した値または区間を乗算します。
   * @param rhs 乗算する値または区間
   */
  public mul(rhs: Interval | ConvertableToRatio): Interval {
    if (this.isEmpty) return this;
    if (rhs instanceof Interval) {
      if (rhs.isEmpty) return rhs;
      const a = this.left;
      const b = this.right;
      const c = rhs.left;
      const d = rhs.right;

      if (a.isPositive) {
        if (c.isPositive) {
          // 0 < a..b && 0 < c..d
          return Interval.fromBoundary(
            a.mul(c),
            b.mul(d),
            this.includesLeft && rhs.includesLeft,
            this.includesRight && rhs.includesRight
          );
        } else if (d.isNegative) {
          // 0 < a..b && c..d < 0
          return Interval.fromBoundary(
            b.mul(c),
            a.mul(d),
            this.includesRight && rhs.includesLeft,
            this.includesLeft && rhs.includesRight
          );
        } else {
          // 0 < a..b && 0 between c..d
          return Interval.fromBoundary(
            b.mul(c),
            b.mul(d),
            this.includesRight && rhs.includesLeft,
            this.includesRight && rhs.includesRight
          );
        }
      } else if (b.isNegative) {
        if (c.isPositive) {
          // a..b < 0 && 0 < c..d
          return Interval.fromBoundary(
            a.mul(d),
            b.mul(c),
            this.includesLeft && rhs.includesRight,
            this.includesRight && rhs.includesLeft
          );
        } else if (d.isNegative) {
          // a..b < 0 && c..d < 0
          return Interval.fromBoundary(
            b.mul(d),
            a.mul(c),
            this.includesRight && rhs.includesRight,
            this.includesLeft && rhs.includesLeft
          );
        } else {
          // a..b < 0 && 0 between c..d
          return Interval.fromBoundary(
            a.mul(d),
            a.mul(c),
            this.includesLeft && rhs.includesRight,
            this.includesLeft && rhs.includesLeft
          );
        }
      } else {
        if (c.isPositive) {
          // 0 between a..b && 0 < c..d
          return Interval.fromBoundary(
            a.mul(d),
            b.mul(d),
            this.includesLeft && rhs.includesRight,
            this.includesRight && rhs.includesRight
          );
        } else if (d.isNegative) {
          // 0 between a..b && c..d < 0
          return Interval.fromBoundary(
            b.mul(c),
            a.mul(c),
            this.includesRight && rhs.includesLeft,
            this.includesLeft && rhs.includesLeft
          );
        } else {
          // 0 between a..b && 0 between c..d
          const ac = a.mul(c);
          const ad = a.mul(d);
          const bc = b.mul(c);
          const bd = b.mul(d);
          let left: Ratio, right: Ratio;
          let includesLeft: boolean, includesRight: boolean;
          if (ad.lt(bc)) {
            left = ad;
            includesLeft = this.includesLeft && rhs.includesRight;
          } else if (bc.lt(ad)) {
            left = bc;
            includesLeft = this.includesRight && rhs.includesLeft;
          } else {
            left = ad;
            includesLeft = (this.includesLeft && rhs.includesRight) || (this.includesRight && rhs.includesLeft);
          }

          if (ac.gt(bd)) {
            right = ac;
            includesRight = this.includesLeft && rhs.includesLeft;
          } else if (bd.gt(ac)) {
            right = bd;
            includesRight = this.includesRight && rhs.includesRight;
          } else {
            right = ac;
            includesRight = (this.includesLeft && rhs.includesLeft) || (this.includesRight && rhs.includesRight);
          }
          return Interval.fromBoundary(left, right, includesLeft, includesRight);
        }
      }
    } else {
      rhs = Ratio.from(rhs);
      if (rhs.isNegative) {
        return new Interval(this.center.mul(rhs), this.radius.mul(rhs.abs()), this.includesRight, this.includesLeft);
      } else {
        return new Interval(this.center.mul(rhs), this.radius.mul(rhs), this.includesLeft, this.includesRight);
      }
    }
  }

  /**
   * この区間を指定した値または区間で割ります。
   * @param rhs 割る値または区間。この値は0であってはならず、区間の場合は0が含まれていてはなりません。
   */
  public div(rhs: Interval | ConvertableToRatio): Interval {
    if (this.isEmpty) return this;
    if (rhs instanceof Interval) {
      if (rhs.isEmpty) return rhs;
      if (rhs.contains(Ratio.from(0))) throw new Error('rhs must not contain zero.');
      return this.mul(rhs.inv());
    } else {
      rhs = Ratio.from(rhs);
      return this.mul(rhs.inv());
    }
  }
}

export { Interval };
