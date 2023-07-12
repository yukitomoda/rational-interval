import { type Ratio } from 'rational';

class Range {
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
  public get empty(): boolean {
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
  public static closed(left: Ratio, right: Ratio): Range {
    return new Range(left, right);
  }

  /**
   * 開区間を作成します。
   * @param left 区間の始点
   * @param right 区間の終点
   */
  public static open(left: Ratio, right: Ratio): Range {
    return new Range(left, right, false, false);
  }

  /**
   * 左半開区間を作成します。
   * @param left 区間の始点
   * @param right 区間の終点
   */
  public static rightHalfOpen(left: Ratio, right: Ratio): Range {
    return new Range(left, right, true, false);
  }

  /**
   * 右半開区間を作成します。
   * @param left 区間の始点
   * @param right 区間の終点
   */
  public static leftHalfOpen(left: Ratio, right: Ratio): Range {
    return new Range(left, right, false, true);
  }
}

export { Range };
