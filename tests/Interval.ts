import { ratio } from 'rational';
import { Interval } from '../src/Interval';
import { assert } from 'chai';
import { it, describe } from 'mocha';

describe('ctor', () => {
  it('ctor', () => {
    const interval = new Interval(ratio(1, 2), ratio(1, 4));
    assert.isTrue(interval.center.eq(ratio(1, 2)));
    assert.isTrue(interval.radius.eq(ratio(1, 4)));
    assert.isTrue(interval.left.eq(ratio(1, 4)));
    assert.isTrue(interval.right.eq(ratio(3, 4)));
    assert.isTrue(interval.includesLeft);
    assert.isTrue(interval.includesRight);
  });

  it('throws if radius is negative', () => {
    assert.throws(() => new Interval(ratio(0), ratio(-1)));
    assert.throws(() => Interval.closed(ratio(1, 2), ratio(0)));
    assert.throws(() => Interval.leftHalfOpen(ratio(1, 2), ratio(0)));
    assert.throws(() => Interval.rightHalfOpen(ratio(1, 2), ratio(0)));
    assert.throws(() => Interval.open(ratio(1, 2), ratio(0)));
  });

  it('fromBoundary', () => {
    const interval = Interval.fromBoundary(ratio(1, 2), ratio(3, 4));
    assert.isTrue(interval.left.eq(ratio(1, 2)));
    assert.isTrue(interval.right.eq(ratio(3, 4)));
    assert.isTrue(interval.includesLeft);
    assert.isTrue(interval.includesRight);
  });

  it('closed', () => {
    const interval = Interval.closed(ratio(1, 2), ratio(3, 4));
    assert.isTrue(interval.left.eq(ratio(1, 2)));
    assert.isTrue(interval.right.eq(ratio(3, 4)));
    assert.isTrue(interval.includesLeft);
    assert.isTrue(interval.includesRight);
  });

  it('open', () => {
    const interval = Interval.open(ratio(1, 2), ratio(3, 4));
    assert.isTrue(interval.left.eq(ratio(1, 2)));
    assert.isTrue(interval.right.eq(ratio(3, 4)));
    assert.isFalse(interval.includesLeft);
    assert.isFalse(interval.includesRight);
  });

  it('leftHalfOpen', () => {
    const interval = Interval.leftHalfOpen(ratio(1, 2), ratio(3, 4));
    assert.isTrue(interval.left.eq(ratio(1, 2)));
    assert.isTrue(interval.right.eq(ratio(3, 4)));
    assert.isFalse(interval.includesLeft);
    assert.isTrue(interval.includesRight);
  });

  it('rightHalfOpen', () => {
    const interval = Interval.rightHalfOpen(ratio(1, 2), ratio(3, 4));
    assert.isTrue(interval.left.eq(ratio(1, 2)));
    assert.isTrue(interval.right.eq(ratio(3, 4)));
    assert.isTrue(interval.includesLeft);
    assert.isFalse(interval.includesRight);
  });

  it('empty', () => {
    assert.isTrue(Interval.empty.isEmpty);
  });

  it('point', () => {
    const interval = Interval.point(ratio(1, 2));
    assert.isTrue(interval.left.eq(ratio(1, 2)));
    assert.isTrue(interval.right.eq(ratio(1, 2)));
    assert.isTrue(interval.includesLeft);
    assert.isTrue(interval.includesRight);
  });
});

describe('accessors', () => {
  describe('empty', () => {
    it('closed', () => {
      assert.isFalse(Interval.closed(ratio(-1, 2), ratio(1, 2)).isEmpty);
      assert.isFalse(Interval.closed(ratio(1, 2), ratio(1, 2)).isEmpty);
      assert.isFalse(Interval.closed(ratio(-1, 2), ratio(-1, 2)).isEmpty);
    });

    it('leftHalfOpen', () => {
      assert.isTrue(Interval.leftHalfOpen(ratio(1, 2), ratio(1, 2)).isEmpty);
      assert.isTrue(Interval.leftHalfOpen(ratio(-1, 2), ratio(-1, 2)).isEmpty);

      assert.isFalse(Interval.leftHalfOpen(ratio(-1, 2), ratio(1, 2)).isEmpty);
    });

    it('rightHalfOpen', () => {
      assert.isTrue(Interval.leftHalfOpen(ratio(1, 2), ratio(1, 2)).isEmpty);
      assert.isTrue(Interval.leftHalfOpen(ratio(-1, 2), ratio(-1, 2)).isEmpty);

      assert.isFalse(Interval.leftHalfOpen(ratio(-1, 2), ratio(1, 2)).isEmpty);
    });

    it('open', () => {
      assert.isTrue(Interval.leftHalfOpen(ratio(1, 2), ratio(1, 2)).isEmpty);
      assert.isTrue(Interval.leftHalfOpen(ratio(-1, 2), ratio(-1, 2)).isEmpty);

      assert.isFalse(Interval.leftHalfOpen(ratio(-1, 2), ratio(1, 2)).isEmpty);
    });
  });
});

describe('comparison', () => {
  it('eq', () => {
    assert.isTrue(Interval.closed(ratio(1), ratio(1)).eq(Interval.closed(ratio(1), ratio(1))));
    assert.isTrue(Interval.closed(ratio(-1), ratio(1)).eq(Interval.closed(ratio(-1), ratio(1))));
    assert.isTrue(Interval.leftHalfOpen(ratio(-1), ratio(1)).eq(Interval.leftHalfOpen(ratio(-1), ratio(1))));
    assert.isTrue(Interval.rightHalfOpen(ratio(-1), ratio(1)).eq(Interval.rightHalfOpen(ratio(-1), ratio(1))));
    assert.isTrue(Interval.open(ratio(-1), ratio(1)).eq(Interval.open(ratio(-1), ratio(1))));
    assert.isTrue(Interval.open(ratio(1), ratio(1)).eq(Interval.open(ratio(2), ratio(2))));

    assert.isFalse(Interval.closed(ratio(-1), ratio(1)).eq(Interval.closed(ratio(-1), ratio(2))));
    assert.isFalse(Interval.closed(ratio(-1), ratio(1)).eq(Interval.closed(ratio(-2), ratio(1))));

    assert.isFalse(Interval.closed(ratio(-1), ratio(1)).eq(Interval.leftHalfOpen(ratio(-1), ratio(1))));
    assert.isFalse(Interval.closed(ratio(-1), ratio(1)).eq(Interval.rightHalfOpen(ratio(-1), ratio(1))));
    assert.isFalse(Interval.closed(ratio(-1), ratio(1)).eq(Interval.open(ratio(-1), ratio(1))));
    assert.isFalse(Interval.leftHalfOpen(ratio(-1), ratio(1)).eq(Interval.closed(ratio(-1), ratio(1))));
    assert.isFalse(Interval.leftHalfOpen(ratio(-1), ratio(1)).eq(Interval.rightHalfOpen(ratio(-1), ratio(1))));
    assert.isFalse(Interval.leftHalfOpen(ratio(-1), ratio(1)).eq(Interval.open(ratio(-1), ratio(1))));
    assert.isFalse(Interval.rightHalfOpen(ratio(-1), ratio(1)).eq(Interval.closed(ratio(-1), ratio(1))));
    assert.isFalse(Interval.rightHalfOpen(ratio(-1), ratio(1)).eq(Interval.leftHalfOpen(ratio(-1), ratio(1))));
    assert.isFalse(Interval.rightHalfOpen(ratio(-1), ratio(1)).eq(Interval.open(ratio(-1), ratio(1))));
    assert.isFalse(Interval.open(ratio(-1), ratio(1)).eq(Interval.closed(ratio(-1), ratio(1))));
    assert.isFalse(Interval.open(ratio(-1), ratio(1)).eq(Interval.leftHalfOpen(ratio(-1), ratio(1))));
    assert.isFalse(Interval.open(ratio(-1), ratio(1)).eq(Interval.rightHalfOpen(ratio(-1), ratio(1))));
  });

  describe('contains', () => {
    it('Ratio', () => {
      assert.isTrue(Interval.point(ratio(0)).contains(ratio(0)));
      assert.isTrue(Interval.closed(ratio(-1), ratio(1)).contains(ratio(1)));
      assert.isTrue(Interval.closed(ratio(-1), ratio(1)).contains(ratio(-1)));
      assert.isTrue(Interval.leftHalfOpen(ratio(-1), ratio(1)).contains(ratio(1)));
      assert.isTrue(Interval.rightHalfOpen(ratio(-1), ratio(1)).contains(ratio(-1)));
      assert.isTrue(Interval.open(ratio(-1), ratio(1)).contains(ratio(0)));

      assert.isFalse(Interval.point(ratio(0)).contains(ratio(1)));
      assert.isFalse(Interval.closed(ratio(-1), ratio(1)).contains(ratio(2)));
      assert.isFalse(Interval.closed(ratio(-1), ratio(1)).contains(ratio(-2)));
      assert.isFalse(Interval.leftHalfOpen(ratio(-1), ratio(1)).contains(ratio(-1)));
      assert.isFalse(Interval.rightHalfOpen(ratio(-1), ratio(1)).contains(ratio(1)));
      assert.isFalse(Interval.open(ratio(-1), ratio(1)).contains(ratio(-1)));
      assert.isFalse(Interval.open(ratio(-1), ratio(1)).contains(ratio(1)));
    });

    describe('Interval', () => {
      it('contains', () => {
        assert.isTrue(Interval.point(ratio(0)).contains(Interval.point(ratio(0))));
        assert.isTrue(Interval.empty.contains(Interval.empty));
        assert.isTrue(Interval.closed(ratio(-1), ratio(1)).contains(Interval.empty));
        assert.isTrue(Interval.closed(ratio(-1), ratio(1)).contains(Interval.point(ratio(0))));
        assert.isTrue(Interval.closed(ratio(-1), ratio(1)).contains(Interval.closed(ratio(0), ratio(1))));
        assert.isTrue(Interval.closed(ratio(-1), ratio(1)).contains(Interval.closed(ratio(-1), ratio(0))));
        assert.isTrue(Interval.closed(ratio(-1), ratio(1)).contains(Interval.closed(ratio(-1), ratio(1))));
        assert.isTrue(Interval.closed(ratio(-1), ratio(1)).contains(Interval.leftHalfOpen(ratio(-1), ratio(1))));
        assert.isTrue(Interval.closed(ratio(-1), ratio(1)).contains(Interval.rightHalfOpen(ratio(-1), ratio(1))));
        assert.isTrue(Interval.closed(ratio(-1), ratio(1)).contains(Interval.open(ratio(-1), ratio(1))));

        assert.isTrue(Interval.leftHalfOpen(ratio(-1), ratio(1)).contains(Interval.leftHalfOpen(ratio(-1), ratio(1))));
        assert.isTrue(Interval.leftHalfOpen(ratio(-1), ratio(1)).contains(Interval.closed(ratio(0), ratio(1))));
        assert.isTrue(
          Interval.leftHalfOpen(ratio(-1), ratio(1)).contains(Interval.rightHalfOpen(ratio(-1, 2), ratio(1, 2)))
        );
        assert.isTrue(Interval.leftHalfOpen(ratio(-1), ratio(1)).contains(Interval.open(ratio(-1), ratio(1))));

        assert.isTrue(
          Interval.rightHalfOpen(ratio(-1), ratio(1)).contains(Interval.rightHalfOpen(ratio(-1), ratio(1)))
        );
        assert.isTrue(Interval.rightHalfOpen(ratio(-1), ratio(1)).contains(Interval.closed(ratio(-1), ratio(0))));
        assert.isTrue(
          Interval.rightHalfOpen(ratio(-1), ratio(1)).contains(Interval.leftHalfOpen(ratio(-1, 2), ratio(1, 2)))
        );
        assert.isTrue(Interval.rightHalfOpen(ratio(-1), ratio(1)).contains(Interval.open(ratio(-1), ratio(1))));

        assert.isTrue(Interval.open(ratio(-1), ratio(1)).contains(Interval.open(ratio(-1), ratio(1))));
        assert.isTrue(Interval.open(ratio(-1), ratio(1)).contains(Interval.closed(ratio(-1, 2), ratio(1, 2))));
        assert.isTrue(Interval.open(ratio(-1), ratio(1)).contains(Interval.leftHalfOpen(ratio(-1, 2), ratio(1, 2))));
        assert.isTrue(Interval.open(ratio(-1), ratio(1)).contains(Interval.rightHalfOpen(ratio(-1, 2), ratio(1, 2))));
      });

      it('not contains', () => {
        assert.isFalse(Interval.empty.contains(Interval.point(ratio(0))));
        assert.isFalse(Interval.empty.contains(Interval.closed(ratio(-1), ratio(1))));
        assert.isFalse(Interval.point(ratio(0)).contains(Interval.closed(ratio(-1), ratio(1))));
        assert.isFalse(Interval.closed(ratio(0), ratio(1)).contains(Interval.closed(ratio(-1), ratio(1))));
        assert.isFalse(Interval.closed(ratio(-1), ratio(0)).contains(Interval.closed(ratio(-1), ratio(1))));
        assert.isFalse(Interval.leftHalfOpen(ratio(-1), ratio(1)).contains(Interval.closed(ratio(-1), ratio(1))));
        assert.isFalse(Interval.rightHalfOpen(ratio(-1), ratio(1)).contains(Interval.closed(ratio(-1), ratio(1))));
        assert.isFalse(Interval.open(ratio(-1), ratio(1)).contains(Interval.closed(ratio(-1), ratio(1))));

        assert.isFalse(Interval.closed(ratio(-1, 2), ratio(1, 2)).contains(Interval.leftHalfOpen(ratio(-1), ratio(1))));
        assert.isFalse(
          Interval.rightHalfOpen(ratio(-1), ratio(1)).contains(Interval.leftHalfOpen(ratio(-1), ratio(1)))
        );
        assert.isFalse(Interval.open(ratio(-1), ratio(1)).contains(Interval.leftHalfOpen(ratio(-1), ratio(1))));

        assert.isFalse(
          Interval.closed(ratio(-1, 2), ratio(1, 2)).contains(Interval.rightHalfOpen(ratio(-1), ratio(1)))
        );
        assert.isFalse(
          Interval.leftHalfOpen(ratio(-1), ratio(1)).contains(Interval.rightHalfOpen(ratio(-1), ratio(1)))
        );
        assert.isFalse(Interval.open(ratio(-1), ratio(1)).contains(Interval.rightHalfOpen(ratio(-1), ratio(1))));

        assert.isFalse(Interval.closed(ratio(-1, 2), ratio(1, 2)).contains(Interval.open(ratio(-1), ratio(1))));
        assert.isFalse(Interval.leftHalfOpen(ratio(-1, 2), ratio(1, 2)).contains(Interval.open(ratio(-1), ratio(1))));
        assert.isFalse(Interval.rightHalfOpen(ratio(-1, 2), ratio(1, 2)).contains(Interval.open(ratio(-1), ratio(1))));
      });
    });
  });
});

describe('arithmetic', () => {
  it('neg', () => {
    assert.isTrue(Interval.closed(-1, 2).neg().eq(Interval.closed(-2, 1)));
    assert.isTrue(Interval.leftHalfOpen(-1, 2).neg().eq(Interval.rightHalfOpen(-2, 1)));
    assert.isTrue(Interval.rightHalfOpen(-1, 2).neg().eq(Interval.leftHalfOpen(-2, 1)));
    assert.isTrue(Interval.open(-1, 2).neg().eq(Interval.open(-2, 1)));
    assert.isTrue(Interval.point(2).neg().eq(Interval.point(-2)));
    assert.isTrue(Interval.empty.neg().eq(Interval.empty));
  });

  describe('inv', () => {
    it('not contains zero', () => {
      assert.isTrue(
        Interval.closed(ratio(1, 2), ratio(3, 4))
          .inv()
          .eq(Interval.closed(ratio(4, 3), ratio(2)))
      );
      assert.isTrue(
        Interval.leftHalfOpen(ratio(1, 2), ratio(3, 4))
          .inv()
          .eq(Interval.rightHalfOpen(ratio(4, 3), ratio(2)))
      );
      assert.isTrue(
        Interval.rightHalfOpen(ratio(1, 2), ratio(3, 4))
          .inv()
          .eq(Interval.leftHalfOpen(ratio(4, 3), ratio(2)))
      );
      assert.isTrue(
        Interval.open(ratio(1, 2), ratio(3, 4))
          .inv()
          .eq(Interval.open(ratio(4, 3), ratio(2)))
      );
      assert.isTrue(Interval.empty.inv().eq(Interval.empty));
    });

    it('contains zero', () => {
      assert.throws(() => {
        Interval.point(0).inv();
      });
      assert.throws(() => {
        Interval.closed(-1, 1).inv();
      });
      assert.throws(() => {
        Interval.closed(-1, 0).inv();
      });
      assert.throws(() => {
        Interval.closed(0, 1).inv();
      });
      assert.throws(() => {
        Interval.leftHalfOpen(-1, 1).inv();
      });
      assert.throws(() => {
        Interval.leftHalfOpen(-1, 0).inv();
      });
      assert.throws(() => {
        Interval.leftHalfOpen(0, 1).inv();
      });
      assert.throws(() => {
        Interval.rightHalfOpen(-1, 1).inv();
      });
      assert.throws(() => {
        Interval.rightHalfOpen(-1, 0).inv();
      });
      assert.throws(() => {
        Interval.rightHalfOpen(0, 1).inv();
      });
      assert.throws(() => {
        Interval.open(-1, 1).inv();
      });
      assert.throws(() => {
        Interval.open(-1, 0).inv();
      });
      assert.throws(() => {
        Interval.open(0, 1).inv();
      });
    });
  });

  describe('add', () => {
    it('Interval', () => {
      assert.isTrue(Interval.closed(-1, 2).add(Interval.closed(-3, 4)).eq(Interval.closed(-4, 6)));
      assert.isTrue(Interval.closed(-1, 2).add(Interval.leftHalfOpen(-3, 4)).eq(Interval.leftHalfOpen(-4, 6)));
      assert.isTrue(Interval.closed(-1, 2).add(Interval.rightHalfOpen(-3, 4)).eq(Interval.rightHalfOpen(-4, 6)));
      assert.isTrue(Interval.closed(-1, 2).add(Interval.open(-3, 4)).eq(Interval.open(-4, 6)));

      assert.isTrue(Interval.leftHalfOpen(-1, 2).add(Interval.closed(-3, 4)).eq(Interval.leftHalfOpen(-4, 6)));
      assert.isTrue(Interval.leftHalfOpen(-1, 2).add(Interval.leftHalfOpen(-3, 4)).eq(Interval.leftHalfOpen(-4, 6)));
      assert.isTrue(Interval.leftHalfOpen(-1, 2).add(Interval.rightHalfOpen(-3, 4)).eq(Interval.open(-4, 6)));
      assert.isTrue(Interval.leftHalfOpen(-1, 2).add(Interval.open(-3, 4)).eq(Interval.open(-4, 6)));

      assert.isTrue(Interval.rightHalfOpen(-1, 2).add(Interval.closed(-3, 4)).eq(Interval.rightHalfOpen(-4, 6)));
      assert.isTrue(Interval.rightHalfOpen(-1, 2).add(Interval.leftHalfOpen(-3, 4)).eq(Interval.open(-4, 6)));
      assert.isTrue(Interval.rightHalfOpen(-1, 2).add(Interval.rightHalfOpen(-3, 4)).eq(Interval.rightHalfOpen(-4, 6)));
      assert.isTrue(Interval.rightHalfOpen(-1, 2).add(Interval.open(-3, 4)).eq(Interval.open(-4, 6)));

      assert.isTrue(Interval.rightHalfOpen(-1, 2).add(Interval.closed(-3, 4)).eq(Interval.rightHalfOpen(-4, 6)));
      assert.isTrue(Interval.rightHalfOpen(-1, 2).add(Interval.leftHalfOpen(-3, 4)).eq(Interval.open(-4, 6)));
      assert.isTrue(Interval.rightHalfOpen(-1, 2).add(Interval.rightHalfOpen(-3, 4)).eq(Interval.rightHalfOpen(-4, 6)));
      assert.isTrue(Interval.rightHalfOpen(-1, 2).add(Interval.open(-3, 4)).eq(Interval.open(-4, 6)));
    });

    it('ratio', () => {
      assert.isTrue(Interval.closed(-1, 2).add(ratio(3)).eq(Interval.closed(2, 5)));
      assert.isTrue(Interval.leftHalfOpen(-1, 2).add(ratio(3)).eq(Interval.leftHalfOpen(2, 5)));
      assert.isTrue(Interval.rightHalfOpen(-1, 2).add(ratio(3)).eq(Interval.rightHalfOpen(2, 5)));
      assert.isTrue(Interval.open(-1, 2).add(ratio(3)).eq(Interval.open(2, 5)));
    });

    it('empty Interval', () => {
      assert.isTrue(Interval.empty.add(Interval.closed(-3, 4)).eq(Interval.empty));
      assert.isTrue(Interval.closed(-1, 2).add(Interval.empty).eq(Interval.empty));
      assert.isTrue(Interval.empty.add(ratio(3)).eq(Interval.empty));
    });
  });

  describe('sub', () => {
    it('Interval', () => {
      assert.isTrue(Interval.closed(-1, 2).sub(Interval.closed(-3, 4)).eq(Interval.closed(-5, 5)));
      assert.isTrue(Interval.closed(-1, 2).sub(Interval.leftHalfOpen(-3, 4)).eq(Interval.rightHalfOpen(-5, 5)));
      assert.isTrue(Interval.closed(-1, 2).sub(Interval.rightHalfOpen(-3, 4)).eq(Interval.leftHalfOpen(-5, 5)));
      assert.isTrue(Interval.closed(-1, 2).sub(Interval.open(-3, 4)).eq(Interval.open(-5, 5)));

      assert.isTrue(Interval.leftHalfOpen(-1, 2).sub(Interval.closed(-3, 4)).eq(Interval.leftHalfOpen(-5, 5)));
      assert.isTrue(Interval.leftHalfOpen(-1, 2).sub(Interval.leftHalfOpen(-3, 4)).eq(Interval.open(-5, 5)));
      assert.isTrue(Interval.leftHalfOpen(-1, 2).sub(Interval.rightHalfOpen(-3, 4)).eq(Interval.leftHalfOpen(-5, 5)));
      assert.isTrue(Interval.leftHalfOpen(-1, 2).sub(Interval.open(-3, 4)).eq(Interval.open(-5, 5)));

      assert.isTrue(Interval.rightHalfOpen(-1, 2).sub(Interval.closed(-3, 4)).eq(Interval.rightHalfOpen(-5, 5)));
      assert.isTrue(Interval.rightHalfOpen(-1, 2).sub(Interval.leftHalfOpen(-3, 4)).eq(Interval.rightHalfOpen(-5, 5)));
      assert.isTrue(Interval.rightHalfOpen(-1, 2).sub(Interval.rightHalfOpen(-3, 4)).eq(Interval.open(-5, 5)));
      assert.isTrue(Interval.rightHalfOpen(-1, 2).sub(Interval.open(-3, 4)).eq(Interval.open(-5, 5)));

      assert.isTrue(Interval.rightHalfOpen(-1, 2).sub(Interval.closed(-3, 4)).eq(Interval.rightHalfOpen(-5, 5)));
      assert.isTrue(Interval.rightHalfOpen(-1, 2).sub(Interval.leftHalfOpen(-3, 4)).eq(Interval.rightHalfOpen(-5, 5)));
      assert.isTrue(Interval.rightHalfOpen(-1, 2).sub(Interval.rightHalfOpen(-3, 4)).eq(Interval.open(-5, 5)));
      assert.isTrue(Interval.rightHalfOpen(-1, 2).sub(Interval.open(-3, 4)).eq(Interval.open(-5, 5)));
    });

    it('ratio', () => {
      assert.isTrue(Interval.closed(-1, 2).sub(ratio(3)).eq(Interval.closed(-4, -1)));
      assert.isTrue(Interval.leftHalfOpen(-1, 2).sub(ratio(3)).eq(Interval.leftHalfOpen(-4, -1)));
      assert.isTrue(Interval.rightHalfOpen(-1, 2).sub(ratio(3)).eq(Interval.rightHalfOpen(-4, -1)));
      assert.isTrue(Interval.open(-1, 2).sub(ratio(3)).eq(Interval.open(-4, -1)));
    });

    it('empty Interval', () => {
      assert.isTrue(Interval.empty.sub(Interval.closed(-3, 4)).eq(Interval.empty));
      assert.isTrue(Interval.closed(-1, 2).sub(Interval.empty).eq(Interval.empty));
      assert.isTrue(Interval.empty.sub(ratio(3)).eq(Interval.empty));
    });
  });

  describe('mul', () => {
    it('empty', () => {
      assert.isTrue(Interval.closed(1, 2).mul(Interval.empty).isEmpty);
      assert.isTrue(Interval.point(1).mul(Interval.empty).isEmpty);
    });

    it('Ratio', () => {
      assert.isTrue(Interval.closed(1, 2).mul(ratio(2)).eq(Interval.closed(2, 4)));
      assert.isTrue(Interval.closed(1, 2).mul(ratio(0)).eq(Interval.point(0)));
      assert.isTrue(Interval.closed(1, 2).mul(ratio(-2)).eq(Interval.closed(-4, -2)));

      assert.isTrue(Interval.leftHalfOpen(1, 2).mul(ratio(2)).eq(Interval.leftHalfOpen(2, 4)));
      assert.isTrue(Interval.leftHalfOpen(1, 2).mul(ratio(0)).eq(Interval.empty));
      assert.isTrue(Interval.leftHalfOpen(1, 2).mul(ratio(-2)).eq(Interval.rightHalfOpen(-4, -2)));

      assert.isTrue(Interval.rightHalfOpen(1, 2).mul(ratio(2)).eq(Interval.rightHalfOpen(2, 4)));
      assert.isTrue(Interval.rightHalfOpen(1, 2).mul(ratio(0)).eq(Interval.empty));
      assert.isTrue(Interval.rightHalfOpen(1, 2).mul(ratio(-2)).eq(Interval.leftHalfOpen(-4, -2)));

      assert.isTrue(Interval.open(1, 2).mul(ratio(2)).eq(Interval.open(2, 4)));
      assert.isTrue(Interval.open(1, 2).mul(ratio(0)).eq(Interval.empty));
      assert.isTrue(Interval.open(1, 2).mul(ratio(-2)).eq(Interval.open(-4, -2)));
    });

    describe('Interval', () => {
      describe('this is empty', () => {
        assert.isTrue(Interval.empty.mul(ratio(1)).isEmpty);
        assert.isTrue(Interval.empty.mul(Interval.empty).isEmpty);
        assert.isTrue(Interval.empty.mul(Interval.closed(-1, 1)).isEmpty);
      });

      describe('entire area of this is negative', () => {
        it('entire area of rhs is negative', () => {
          assert.isTrue(Interval.closed(-3, -2).mul(Interval.closed(-5, -4)).eq(Interval.closed(8, 15)));
          assert.isTrue(Interval.closed(-3, -2).mul(Interval.leftHalfOpen(-5, -4)).eq(Interval.rightHalfOpen(8, 15)));
          assert.isTrue(Interval.closed(-3, -2).mul(Interval.rightHalfOpen(-5, -4)).eq(Interval.leftHalfOpen(8, 15)));
          assert.isTrue(Interval.closed(-3, -2).mul(Interval.open(-5, -4)).eq(Interval.open(8, 15)));

          assert.isTrue(Interval.leftHalfOpen(-3, -2).mul(Interval.closed(-5, -4)).eq(Interval.rightHalfOpen(8, 15)));
          assert.isTrue(
            Interval.leftHalfOpen(-3, -2).mul(Interval.leftHalfOpen(-5, -4)).eq(Interval.rightHalfOpen(8, 15))
          );
          assert.isTrue(Interval.leftHalfOpen(-3, -2).mul(Interval.rightHalfOpen(-5, -4)).eq(Interval.open(8, 15)));
          assert.isTrue(Interval.leftHalfOpen(-3, -2).mul(Interval.open(-5, -4)).eq(Interval.open(8, 15)));

          assert.isTrue(Interval.rightHalfOpen(-3, -2).mul(Interval.closed(-5, -4)).eq(Interval.leftHalfOpen(8, 15)));
          assert.isTrue(Interval.rightHalfOpen(-3, -2).mul(Interval.leftHalfOpen(-5, -4)).eq(Interval.open(8, 15)));
          assert.isTrue(
            Interval.rightHalfOpen(-3, -2).mul(Interval.rightHalfOpen(-5, -4)).eq(Interval.leftHalfOpen(8, 15))
          );
          assert.isTrue(Interval.rightHalfOpen(-3, -2).mul(Interval.open(-5, -4)).eq(Interval.open(8, 15)));

          assert.isTrue(Interval.open(-3, -2).mul(Interval.closed(-5, -4)).eq(Interval.open(8, 15)));
          assert.isTrue(Interval.open(-3, -2).mul(Interval.leftHalfOpen(-5, -4)).eq(Interval.open(8, 15)));
          assert.isTrue(Interval.open(-3, -2).mul(Interval.rightHalfOpen(-5, -4)).eq(Interval.open(8, 15)));
          assert.isTrue(Interval.open(-3, -2).mul(Interval.open(-5, -4)).eq(Interval.open(8, 15)));
        });

        it('rhs contains zero', () => {
          assert.isTrue(Interval.closed(-3, -2).mul(Interval.closed(-5, 4)).eq(Interval.closed(-12, 15)));
          assert.isTrue(Interval.closed(-3, -2).mul(Interval.leftHalfOpen(-5, 4)).eq(Interval.rightHalfOpen(-12, 15)));
          assert.isTrue(Interval.closed(-3, -2).mul(Interval.rightHalfOpen(-5, 4)).eq(Interval.leftHalfOpen(-12, 15)));
          assert.isTrue(Interval.closed(-3, -2).mul(Interval.open(-5, 4)).eq(Interval.open(-12, 15)));

          assert.isTrue(Interval.leftHalfOpen(-3, -2).mul(Interval.closed(-5, 4)).eq(Interval.open(-12, 15)));
          assert.isTrue(Interval.leftHalfOpen(-3, -2).mul(Interval.leftHalfOpen(-5, 4)).eq(Interval.open(-12, 15)));
          assert.isTrue(Interval.leftHalfOpen(-3, -2).mul(Interval.rightHalfOpen(-5, 4)).eq(Interval.open(-12, 15)));
          assert.isTrue(Interval.leftHalfOpen(-3, -2).mul(Interval.open(-5, 4)).eq(Interval.open(-12, 15)));

          assert.isTrue(Interval.rightHalfOpen(-3, -2).mul(Interval.closed(-5, 4)).eq(Interval.closed(-12, 15)));
          assert.isTrue(
            Interval.rightHalfOpen(-3, -2).mul(Interval.leftHalfOpen(-5, 4)).eq(Interval.rightHalfOpen(-12, 15))
          );
          assert.isTrue(
            Interval.rightHalfOpen(-3, -2).mul(Interval.rightHalfOpen(-5, 4)).eq(Interval.leftHalfOpen(-12, 15))
          );
          assert.isTrue(Interval.rightHalfOpen(-3, -2).mul(Interval.open(-5, 4)).eq(Interval.open(-12, 15)));

          assert.isTrue(Interval.open(-3, -2).mul(Interval.closed(-5, 4)).eq(Interval.open(-12, 15)));
          assert.isTrue(Interval.open(-3, -2).mul(Interval.leftHalfOpen(-5, 4)).eq(Interval.open(-12, 15)));
          assert.isTrue(Interval.open(-3, -2).mul(Interval.rightHalfOpen(-5, 4)).eq(Interval.open(-12, 15)));
          assert.isTrue(Interval.open(-3, -2).mul(Interval.open(-5, 4)).eq(Interval.open(-12, 15)));
        });

        it('entire area of rhs is positive', () => {
          assert.isTrue(Interval.closed(-3, -2).mul(Interval.closed(4, 5)).eq(Interval.closed(-15, -8)));
          assert.isTrue(Interval.closed(-3, -2).mul(Interval.leftHalfOpen(4, 5)).eq(Interval.rightHalfOpen(-15, -8)));
          assert.isTrue(Interval.closed(-3, -2).mul(Interval.rightHalfOpen(4, 5)).eq(Interval.leftHalfOpen(-15, -8)));
          assert.isTrue(Interval.closed(-3, -2).mul(Interval.open(4, 5)).eq(Interval.open(-15, -8)));

          assert.isTrue(Interval.leftHalfOpen(-3, -2).mul(Interval.closed(4, 5)).eq(Interval.leftHalfOpen(-15, -8)));
          assert.isTrue(Interval.leftHalfOpen(-3, -2).mul(Interval.leftHalfOpen(4, 5)).eq(Interval.open(-15, -8)));
          assert.isTrue(
            Interval.leftHalfOpen(-3, -2).mul(Interval.rightHalfOpen(4, 5)).eq(Interval.leftHalfOpen(-15, -8))
          );
          assert.isTrue(Interval.leftHalfOpen(-3, -2).mul(Interval.open(4, 5)).eq(Interval.open(-15, -8)));

          assert.isTrue(Interval.rightHalfOpen(-3, -2).mul(Interval.closed(4, 5)).eq(Interval.rightHalfOpen(-15, -8)));
          assert.isTrue(
            Interval.rightHalfOpen(-3, -2).mul(Interval.leftHalfOpen(4, 5)).eq(Interval.rightHalfOpen(-15, -8))
          );
          assert.isTrue(Interval.rightHalfOpen(-3, -2).mul(Interval.rightHalfOpen(4, 5)).eq(Interval.open(-15, -8)));
          assert.isTrue(Interval.rightHalfOpen(-3, -2).mul(Interval.open(4, 5)).eq(Interval.open(-15, -8)));

          assert.isTrue(Interval.open(-3, -2).mul(Interval.closed(4, 5)).eq(Interval.open(-15, -8)));
          assert.isTrue(Interval.open(-3, -2).mul(Interval.leftHalfOpen(4, 5)).eq(Interval.open(-15, -8)));
          assert.isTrue(Interval.open(-3, -2).mul(Interval.rightHalfOpen(4, 5)).eq(Interval.open(-15, -8)));
          assert.isTrue(Interval.open(-3, -2).mul(Interval.open(4, 5)).eq(Interval.open(-15, -8)));
        });
      });

      describe('this contains zero', () => {
        it('entire area of rhs is negative', () => {
          assert.isTrue(Interval.closed(-2, 3).mul(Interval.closed(-5, -4)).eq(Interval.closed(-15, 10)));
          assert.isTrue(Interval.closed(-2, 3).mul(Interval.leftHalfOpen(-5, -4)).eq(Interval.open(-15, 10)));
          assert.isTrue(Interval.closed(-2, 3).mul(Interval.rightHalfOpen(-5, -4)).eq(Interval.closed(-15, 10)));
          assert.isTrue(Interval.closed(-2, 3).mul(Interval.open(-5, -4)).eq(Interval.open(-15, 10)));

          assert.isTrue(Interval.leftHalfOpen(-2, 3).mul(Interval.closed(-5, -4)).eq(Interval.rightHalfOpen(-15, 10)));
          assert.isTrue(Interval.leftHalfOpen(-2, 3).mul(Interval.leftHalfOpen(-5, -4)).eq(Interval.open(-15, 10)));
          assert.isTrue(
            Interval.leftHalfOpen(-2, 3).mul(Interval.rightHalfOpen(-5, -4)).eq(Interval.rightHalfOpen(-15, 10))
          );
          assert.isTrue(Interval.leftHalfOpen(-2, 3).mul(Interval.open(-5, -4)).eq(Interval.open(-15, 10)));

          assert.isTrue(Interval.rightHalfOpen(-2, 3).mul(Interval.closed(-5, -4)).eq(Interval.leftHalfOpen(-15, 10)));
          assert.isTrue(Interval.rightHalfOpen(-2, 3).mul(Interval.leftHalfOpen(-5, -4)).eq(Interval.open(-15, 10)));
          assert.isTrue(
            Interval.rightHalfOpen(-2, 3).mul(Interval.rightHalfOpen(-5, -4)).eq(Interval.leftHalfOpen(-15, 10))
          );
          assert.isTrue(Interval.rightHalfOpen(-2, 3).mul(Interval.open(-5, -4)).eq(Interval.open(-15, 10)));

          assert.isTrue(Interval.open(-2, 3).mul(Interval.closed(-5, -4)).eq(Interval.open(-15, 10)));
          assert.isTrue(Interval.open(-2, 3).mul(Interval.leftHalfOpen(-5, -4)).eq(Interval.open(-15, 10)));
          assert.isTrue(Interval.open(-2, 3).mul(Interval.rightHalfOpen(-5, -4)).eq(Interval.open(-15, 10)));
          assert.isTrue(Interval.open(-2, 3).mul(Interval.open(-5, -4)).eq(Interval.open(-15, 10)));
        });

        it('rhs contains zero_1', () => {
          assert.isTrue(Interval.closed(-2, 3).mul(Interval.closed(-5, 4)).eq(Interval.closed(-15, 12)));
          assert.isTrue(Interval.closed(-2, 3).mul(Interval.leftHalfOpen(-5, 4)).eq(Interval.leftHalfOpen(-15, 12)));
          assert.isTrue(Interval.closed(-2, 3).mul(Interval.rightHalfOpen(-5, 4)).eq(Interval.rightHalfOpen(-15, 12)));
          assert.isTrue(Interval.closed(-2, 3).mul(Interval.open(-5, 4)).eq(Interval.open(-15, 12)));

          assert.isTrue(Interval.leftHalfOpen(-2, 3).mul(Interval.closed(-5, 4)).eq(Interval.closed(-15, 12)));
          assert.isTrue(
            Interval.leftHalfOpen(-2, 3).mul(Interval.leftHalfOpen(-5, 4)).eq(Interval.leftHalfOpen(-15, 12))
          );
          assert.isTrue(
            Interval.leftHalfOpen(-2, 3).mul(Interval.rightHalfOpen(-5, 4)).eq(Interval.rightHalfOpen(-15, 12))
          );
          assert.isTrue(Interval.leftHalfOpen(-2, 3).mul(Interval.open(-5, 4)).eq(Interval.open(-15, 12)));

          assert.isTrue(Interval.rightHalfOpen(-2, 3).mul(Interval.closed(-5, 4)).eq(Interval.open(-15, 12)));
          assert.isTrue(Interval.rightHalfOpen(-2, 3).mul(Interval.leftHalfOpen(-5, 4)).eq(Interval.open(-15, 12)));
          assert.isTrue(Interval.rightHalfOpen(-2, 3).mul(Interval.rightHalfOpen(-5, 4)).eq(Interval.open(-15, 12)));
          assert.isTrue(Interval.rightHalfOpen(-2, 3).mul(Interval.open(-5, 4)).eq(Interval.open(-15, 12)));

          assert.isTrue(Interval.open(-2, 3).mul(Interval.closed(-5, 4)).eq(Interval.open(-15, 12)));
          assert.isTrue(Interval.open(-2, 3).mul(Interval.leftHalfOpen(-5, 4)).eq(Interval.open(-15, 12)));
          assert.isTrue(Interval.open(-2, 3).mul(Interval.rightHalfOpen(-5, 4)).eq(Interval.open(-15, 12)));
          assert.isTrue(Interval.open(-2, 3).mul(Interval.open(-5, 4)).eq(Interval.open(-15, 12)));
        });

        it('rhs contains zero_2', () => {
          assert.isTrue(Interval.closed(-6, 7).mul(Interval.closed(-5, 4)).eq(Interval.closed(-35, 30)));
          assert.isTrue(Interval.closed(-6, 7).mul(Interval.leftHalfOpen(-5, 4)).eq(Interval.open(-35, 30)));
          assert.isTrue(Interval.closed(-6, 7).mul(Interval.rightHalfOpen(-5, 4)).eq(Interval.closed(-35, 30)));
          assert.isTrue(Interval.closed(-6, 7).mul(Interval.open(-5, 4)).eq(Interval.open(-35, 30)));

          assert.isTrue(Interval.leftHalfOpen(-6, 7).mul(Interval.closed(-5, 4)).eq(Interval.rightHalfOpen(-35, 30)));
          assert.isTrue(Interval.leftHalfOpen(-6, 7).mul(Interval.leftHalfOpen(-5, 4)).eq(Interval.open(-35, 30)));
          assert.isTrue(
            Interval.leftHalfOpen(-6, 7).mul(Interval.rightHalfOpen(-5, 4)).eq(Interval.rightHalfOpen(-35, 30))
          );
          assert.isTrue(Interval.leftHalfOpen(-6, 7).mul(Interval.open(-5, 4)).eq(Interval.open(-35, 30)));

          assert.isTrue(Interval.rightHalfOpen(-6, 7).mul(Interval.closed(-5, 4)).eq(Interval.leftHalfOpen(-35, 30)));
          assert.isTrue(Interval.rightHalfOpen(-6, 7).mul(Interval.leftHalfOpen(-5, 4)).eq(Interval.open(-35, 30)));
          assert.isTrue(
            Interval.rightHalfOpen(-6, 7).mul(Interval.rightHalfOpen(-5, 4)).eq(Interval.leftHalfOpen(-35, 30))
          );
          assert.isTrue(Interval.rightHalfOpen(-6, 7).mul(Interval.open(-5, 4)).eq(Interval.open(-35, 30)));

          assert.isTrue(Interval.open(-6, 7).mul(Interval.closed(-5, 4)).eq(Interval.open(-35, 30)));
          assert.isTrue(Interval.open(-6, 7).mul(Interval.leftHalfOpen(-5, 4)).eq(Interval.open(-35, 30)));
          assert.isTrue(Interval.open(-6, 7).mul(Interval.rightHalfOpen(-5, 4)).eq(Interval.open(-35, 30)));
          assert.isTrue(Interval.open(-6, 7).mul(Interval.open(-5, 4)).eq(Interval.open(-35, 30)));
        });

        it('rhs contains zero_3', () => {
          assert.isTrue(Interval.closed(-2, 2).mul(Interval.closed(-2, 2)).eq(Interval.closed(-4, 4)));
          assert.isTrue(Interval.closed(-2, 2).mul(Interval.leftHalfOpen(-2, 2)).eq(Interval.closed(-4, 4)));
          assert.isTrue(Interval.closed(-2, 2).mul(Interval.rightHalfOpen(-2, 2)).eq(Interval.closed(-4, 4)));
          assert.isTrue(Interval.closed(-2, 2).mul(Interval.open(-2, 2)).eq(Interval.open(-4, 4)));

          assert.isTrue(Interval.leftHalfOpen(-2, 2).mul(Interval.closed(-2, 2)).eq(Interval.closed(-4, 4)));
          assert.isTrue(
            Interval.leftHalfOpen(-2, 2).mul(Interval.leftHalfOpen(-2, 2)).eq(Interval.leftHalfOpen(-4, 4))
          );
          assert.isTrue(
            Interval.leftHalfOpen(-2, 2).mul(Interval.rightHalfOpen(-2, 2)).eq(Interval.rightHalfOpen(-4, 4))
          );
          assert.isTrue(Interval.leftHalfOpen(-2, 2).mul(Interval.open(-2, 2)).eq(Interval.open(-4, 4)));

          assert.isTrue(Interval.rightHalfOpen(-2, 2).mul(Interval.closed(-2, 2)).eq(Interval.closed(-4, 4)));
          assert.isTrue(
            Interval.rightHalfOpen(-2, 2).mul(Interval.leftHalfOpen(-2, 2)).eq(Interval.rightHalfOpen(-4, 4))
          );
          assert.isTrue(
            Interval.rightHalfOpen(-2, 2).mul(Interval.rightHalfOpen(-2, 2)).eq(Interval.leftHalfOpen(-4, 4))
          );
          assert.isTrue(Interval.rightHalfOpen(-2, 2).mul(Interval.open(-2, 2)).eq(Interval.open(-4, 4)));

          assert.isTrue(Interval.open(-2, 2).mul(Interval.closed(-2, 2)).eq(Interval.open(-4, 4)));
          assert.isTrue(Interval.open(-2, 2).mul(Interval.leftHalfOpen(-2, 2)).eq(Interval.open(-4, 4)));
          assert.isTrue(Interval.open(-2, 2).mul(Interval.rightHalfOpen(-2, 2)).eq(Interval.open(-4, 4)));
          assert.isTrue(Interval.open(-2, 2).mul(Interval.open(-2, 2)).eq(Interval.open(-4, 4)));
        });

        it('entire area of rhs is positive', () => {
          assert.isTrue(Interval.closed(-3, 2).mul(Interval.closed(4, 5)).eq(Interval.closed(-15, 10)));
          assert.isTrue(Interval.closed(-3, 2).mul(Interval.leftHalfOpen(4, 5)).eq(Interval.closed(-15, 10)));
          assert.isTrue(Interval.closed(-3, 2).mul(Interval.rightHalfOpen(4, 5)).eq(Interval.open(-15, 10)));
          assert.isTrue(Interval.closed(-3, 2).mul(Interval.open(4, 5)).eq(Interval.open(-15, 10)));

          assert.isTrue(Interval.leftHalfOpen(-3, 2).mul(Interval.closed(4, 5)).eq(Interval.leftHalfOpen(-15, 10)));
          assert.isTrue(
            Interval.leftHalfOpen(-3, 2).mul(Interval.leftHalfOpen(4, 5)).eq(Interval.leftHalfOpen(-15, 10))
          );
          assert.isTrue(Interval.leftHalfOpen(-3, 2).mul(Interval.rightHalfOpen(4, 5)).eq(Interval.open(-15, 10)));
          assert.isTrue(Interval.leftHalfOpen(-3, 2).mul(Interval.open(4, 5)).eq(Interval.open(-15, 10)));

          assert.isTrue(Interval.rightHalfOpen(-3, 2).mul(Interval.closed(4, 5)).eq(Interval.rightHalfOpen(-15, 10)));
          assert.isTrue(
            Interval.rightHalfOpen(-3, 2).mul(Interval.leftHalfOpen(4, 5)).eq(Interval.rightHalfOpen(-15, 10))
          );
          assert.isTrue(Interval.rightHalfOpen(-3, 2).mul(Interval.rightHalfOpen(4, 5)).eq(Interval.open(-15, 10)));
          assert.isTrue(Interval.rightHalfOpen(-3, 2).mul(Interval.open(4, 5)).eq(Interval.open(-15, 10)));

          assert.isTrue(Interval.open(-3, 2).mul(Interval.closed(4, 5)).eq(Interval.open(-15, 10)));
          assert.isTrue(Interval.open(-3, 2).mul(Interval.leftHalfOpen(4, 5)).eq(Interval.open(-15, 10)));
          assert.isTrue(Interval.open(-3, 2).mul(Interval.rightHalfOpen(4, 5)).eq(Interval.open(-15, 10)));
          assert.isTrue(Interval.open(-3, 2).mul(Interval.open(4, 5)).eq(Interval.open(-15, 10)));
        });
      });

      describe('entire area of this is positive', () => {
        it('entire area of rhs is negative', () => {
          assert.isTrue(Interval.closed(2, 3).mul(Interval.closed(-5, -4)).eq(Interval.closed(-15, -8)));
          assert.isTrue(Interval.closed(2, 3).mul(Interval.leftHalfOpen(-5, -4)).eq(Interval.leftHalfOpen(-15, -8)));
          assert.isTrue(Interval.closed(2, 3).mul(Interval.rightHalfOpen(-5, -4)).eq(Interval.rightHalfOpen(-15, -8)));
          assert.isTrue(Interval.closed(2, 3).mul(Interval.open(-5, -4)).eq(Interval.open(-15, -8)));

          assert.isTrue(Interval.leftHalfOpen(2, 3).mul(Interval.closed(-5, -4)).eq(Interval.rightHalfOpen(-15, -8)));
          assert.isTrue(Interval.leftHalfOpen(2, 3).mul(Interval.leftHalfOpen(-5, -4)).eq(Interval.open(-15, -8)));
          assert.isTrue(
            Interval.leftHalfOpen(2, 3).mul(Interval.rightHalfOpen(-5, -4)).eq(Interval.rightHalfOpen(-15, -8))
          );
          assert.isTrue(Interval.leftHalfOpen(2, 3).mul(Interval.open(-5, -4)).eq(Interval.open(-15, -8)));

          assert.isTrue(Interval.rightHalfOpen(2, 3).mul(Interval.closed(-5, -4)).eq(Interval.leftHalfOpen(-15, -8)));
          assert.isTrue(
            Interval.rightHalfOpen(2, 3).mul(Interval.leftHalfOpen(-5, -4)).eq(Interval.leftHalfOpen(-15, -8))
          );
          assert.isTrue(Interval.rightHalfOpen(2, 3).mul(Interval.rightHalfOpen(-5, -4)).eq(Interval.open(-15, -8)));
          assert.isTrue(Interval.rightHalfOpen(2, 3).mul(Interval.open(-5, -4)).eq(Interval.open(-15, -8)));

          assert.isTrue(Interval.open(2, 3).mul(Interval.closed(-5, -4)).eq(Interval.open(-15, -8)));
          assert.isTrue(Interval.open(2, 3).mul(Interval.leftHalfOpen(-5, -4)).eq(Interval.open(-15, -8)));
          assert.isTrue(Interval.open(2, 3).mul(Interval.rightHalfOpen(-5, -4)).eq(Interval.open(-15, -8)));
          assert.isTrue(Interval.open(2, 3).mul(Interval.open(-5, -4)).eq(Interval.open(-15, -8)));
        });

        it('rhs contains zero', () => {
          assert.isTrue(Interval.closed(2, 3).mul(Interval.closed(-5, 4)).eq(Interval.closed(-15, 12)));
          assert.isTrue(Interval.closed(2, 3).mul(Interval.leftHalfOpen(-5, 4)).eq(Interval.leftHalfOpen(-15, 12)));
          assert.isTrue(Interval.closed(2, 3).mul(Interval.rightHalfOpen(-5, 4)).eq(Interval.rightHalfOpen(-15, 12)));
          assert.isTrue(Interval.closed(2, 3).mul(Interval.open(-5, 4)).eq(Interval.open(-15, 12)));

          assert.isTrue(Interval.leftHalfOpen(2, 3).mul(Interval.closed(-5, 4)).eq(Interval.closed(-15, 12)));
          assert.isTrue(
            Interval.leftHalfOpen(2, 3).mul(Interval.leftHalfOpen(-5, 4)).eq(Interval.leftHalfOpen(-15, 12))
          );
          assert.isTrue(
            Interval.leftHalfOpen(2, 3).mul(Interval.rightHalfOpen(-5, 4)).eq(Interval.rightHalfOpen(-15, 12))
          );
          assert.isTrue(Interval.leftHalfOpen(2, 3).mul(Interval.open(-5, 4)).eq(Interval.open(-15, 12)));

          assert.isTrue(Interval.rightHalfOpen(2, 3).mul(Interval.closed(-5, 4)).eq(Interval.open(-15, 12)));
          assert.isTrue(Interval.rightHalfOpen(2, 3).mul(Interval.leftHalfOpen(-5, 4)).eq(Interval.open(-15, 12)));
          assert.isTrue(Interval.rightHalfOpen(2, 3).mul(Interval.rightHalfOpen(-5, 4)).eq(Interval.open(-15, 12)));
          assert.isTrue(Interval.rightHalfOpen(2, 3).mul(Interval.open(-5, 4)).eq(Interval.open(-15, 12)));

          assert.isTrue(Interval.open(2, 3).mul(Interval.closed(-5, 4)).eq(Interval.open(-15, 12)));
          assert.isTrue(Interval.open(2, 3).mul(Interval.leftHalfOpen(-5, 4)).eq(Interval.open(-15, 12)));
          assert.isTrue(Interval.open(2, 3).mul(Interval.rightHalfOpen(-5, 4)).eq(Interval.open(-15, 12)));
          assert.isTrue(Interval.open(2, 3).mul(Interval.open(-5, 4)).eq(Interval.open(-15, 12)));
        });

        it('entire area of rhs is positive', () => {
          assert.isTrue(Interval.closed(2, 3).mul(Interval.closed(4, 5)).eq(Interval.closed(8, 15)));
          assert.isTrue(Interval.closed(2, 3).mul(Interval.leftHalfOpen(4, 5)).eq(Interval.leftHalfOpen(8, 15)));
          assert.isTrue(Interval.closed(2, 3).mul(Interval.rightHalfOpen(4, 5)).eq(Interval.rightHalfOpen(8, 15)));
          assert.isTrue(Interval.closed(2, 3).mul(Interval.open(4, 5)).eq(Interval.open(8, 15)));

          assert.isTrue(Interval.leftHalfOpen(2, 3).mul(Interval.closed(4, 5)).eq(Interval.leftHalfOpen(8, 15)));
          assert.isTrue(Interval.leftHalfOpen(2, 3).mul(Interval.leftHalfOpen(4, 5)).eq(Interval.leftHalfOpen(8, 15)));
          assert.isTrue(Interval.leftHalfOpen(2, 3).mul(Interval.rightHalfOpen(4, 5)).eq(Interval.open(8, 15)));
          assert.isTrue(Interval.leftHalfOpen(2, 3).mul(Interval.open(4, 5)).eq(Interval.open(8, 15)));

          assert.isTrue(Interval.rightHalfOpen(2, 3).mul(Interval.closed(4, 5)).eq(Interval.rightHalfOpen(8, 15)));
          assert.isTrue(Interval.rightHalfOpen(2, 3).mul(Interval.leftHalfOpen(4, 5)).eq(Interval.open(8, 15)));
          assert.isTrue(
            Interval.rightHalfOpen(2, 3).mul(Interval.rightHalfOpen(4, 5)).eq(Interval.rightHalfOpen(8, 15))
          );
          assert.isTrue(Interval.rightHalfOpen(2, 3).mul(Interval.open(4, 5)).eq(Interval.open(8, 15)));

          assert.isTrue(Interval.open(2, 3).mul(Interval.closed(4, 5)).eq(Interval.open(8, 15)));
          assert.isTrue(Interval.open(2, 3).mul(Interval.leftHalfOpen(4, 5)).eq(Interval.open(8, 15)));
          assert.isTrue(Interval.open(2, 3).mul(Interval.rightHalfOpen(4, 5)).eq(Interval.open(8, 15)));
          assert.isTrue(Interval.open(2, 3).mul(Interval.open(4, 5)).eq(Interval.open(8, 15)));
        });
      });
    });
  });
});
