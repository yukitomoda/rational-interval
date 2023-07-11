import { type Ratio } from 'rational';

class Range {
  public constructor(
    public readonly left: Ratio,
    public readonly right: Ratio,
    public readonly includesLeft: boolean = true,
    public readonly includesRight: boolean = true
  ) {}

  public static closed(left: Ratio, right: Ratio): Range {
    return new Range(left, right);
  }

  public static open(left: Ratio, right: Ratio): Range {
    return new Range(left, right, false, false);
  }

  public static rightHalfOpen(left: Ratio, right: Ratio): Range {
    return new Range(left, right, true, false);
  }

  public static leftHalfOpen(left: Ratio, right: Ratio): Range {
    return new Range(left, right, false, true);
  }
}

export { Range };
