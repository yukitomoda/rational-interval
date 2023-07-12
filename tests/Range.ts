import { ratio } from 'rational';
import { Range } from '../src/Range';
import { assert } from 'chai';
import { it, describe } from 'mocha';

describe('ctor', () => {
  it('ctor', () => {
    const range = new Range(ratio(1, 2), ratio(3, 4));
    assert.isTrue(range.left.eq(ratio(1, 2)));
    assert.isTrue(range.right.eq(ratio(3, 4)));
    assert.isTrue(range.includesLeft);
    assert.isTrue(range.includesRight);
  });

  it('closed', () => {
    const range = Range.closed(ratio(1, 2), ratio(3, 4));
    assert.isTrue(range.left.eq(ratio(1, 2)));
    assert.isTrue(range.right.eq(ratio(3, 4)));
    assert.isTrue(range.includesLeft);
    assert.isTrue(range.includesRight);
  });

  it('open', () => {
    const range = Range.open(ratio(1, 2), ratio(3, 4));
    assert.isTrue(range.left.eq(ratio(1, 2)));
    assert.isTrue(range.right.eq(ratio(3, 4)));
    assert.isFalse(range.includesLeft);
    assert.isFalse(range.includesRight);
  });

  it('leftHalfOpen', () => {
    const range = Range.leftHalfOpen(ratio(1, 2), ratio(3, 4));
    assert.isTrue(range.left.eq(ratio(1, 2)));
    assert.isTrue(range.right.eq(ratio(3, 4)));
    assert.isFalse(range.includesLeft);
    assert.isTrue(range.includesRight);
  });

  it('rightHalfOpen', () => {
    const range = Range.rightHalfOpen(ratio(1, 2), ratio(3, 4));
    assert.isTrue(range.left.eq(ratio(1, 2)));
    assert.isTrue(range.right.eq(ratio(3, 4)));
    assert.isTrue(range.includesLeft);
    assert.isFalse(range.includesRight);
  });

  it('empty', () => {
    assert.isTrue(Range.empty.isEmpty);
  });

  it('point', () => {
    const range = Range.point(ratio(1, 2));
    assert.isTrue(range.left.eq(ratio(1, 2)));
    assert.isTrue(range.right.eq(ratio(1, 2)));
    assert.isTrue(range.includesLeft);
    assert.isTrue(range.includesRight);
  });
});

describe('accessors', () => {
  describe('empty', () => {
    it('closed', () => {
      assert.isTrue(Range.closed(ratio(1, 2), ratio(0)).isEmpty);
      assert.isTrue(Range.closed(ratio(0), ratio(-1, 2)).isEmpty);

      assert.isFalse(Range.closed(ratio(-1, 2), ratio(1, 2)).isEmpty);
      assert.isFalse(Range.closed(ratio(1, 2), ratio(1, 2)).isEmpty);
      assert.isFalse(Range.closed(ratio(-1, 2), ratio(-1, 2)).isEmpty);
    });

    it('leftHalfOpen', () => {
      assert.isTrue(Range.leftHalfOpen(ratio(1, 2), ratio(1, 2)).isEmpty);
      assert.isTrue(Range.leftHalfOpen(ratio(1, 2), ratio(0)).isEmpty);
      assert.isTrue(Range.leftHalfOpen(ratio(0), ratio(-1, 2)).isEmpty);
      assert.isTrue(Range.leftHalfOpen(ratio(-1, 2), ratio(-1, 2)).isEmpty);

      assert.isFalse(Range.leftHalfOpen(ratio(-1, 2), ratio(1, 2)).isEmpty);
    });

    it('rightHalfOpen', () => {
      assert.isTrue(Range.leftHalfOpen(ratio(1, 2), ratio(1, 2)).isEmpty);
      assert.isTrue(Range.leftHalfOpen(ratio(1, 2), ratio(0)).isEmpty);
      assert.isTrue(Range.leftHalfOpen(ratio(0), ratio(-1, 2)).isEmpty);
      assert.isTrue(Range.leftHalfOpen(ratio(-1, 2), ratio(-1, 2)).isEmpty);

      assert.isFalse(Range.leftHalfOpen(ratio(-1, 2), ratio(1, 2)).isEmpty);
    });

    it('open', () => {
      assert.isTrue(Range.leftHalfOpen(ratio(1, 2), ratio(1, 2)).isEmpty);
      assert.isTrue(Range.leftHalfOpen(ratio(1, 2), ratio(0)).isEmpty);
      assert.isTrue(Range.leftHalfOpen(ratio(0), ratio(-1, 2)).isEmpty);
      assert.isTrue(Range.leftHalfOpen(ratio(-1, 2), ratio(-1, 2)).isEmpty);

      assert.isFalse(Range.leftHalfOpen(ratio(-1, 2), ratio(1, 2)).isEmpty);
    });
  });
});

describe('comparison', () => {
  it('eq', () => {
    assert.isTrue(Range.closed(ratio(1), ratio(1)).eq(Range.closed(ratio(1), ratio(1))));
    assert.isTrue(Range.closed(ratio(-1), ratio(1)).eq(Range.closed(ratio(-1), ratio(1))));
    assert.isTrue(Range.leftHalfOpen(ratio(-1), ratio(1)).eq(Range.leftHalfOpen(ratio(-1), ratio(1))));
    assert.isTrue(Range.rightHalfOpen(ratio(-1), ratio(1)).eq(Range.rightHalfOpen(ratio(-1), ratio(1))));
    assert.isTrue(Range.open(ratio(-1), ratio(1)).eq(Range.open(ratio(-1), ratio(1))));
    assert.isTrue(Range.closed(ratio(1), ratio(-1)).eq(Range.closed(ratio(2), ratio(-2))));
    assert.isTrue(Range.open(ratio(1), ratio(1)).eq(Range.open(ratio(2), ratio(2))));

    assert.isFalse(Range.closed(ratio(-1), ratio(1)).eq(Range.closed(ratio(-1), ratio(2))));
    assert.isFalse(Range.closed(ratio(-1), ratio(1)).eq(Range.closed(ratio(-2), ratio(1))));
    assert.isFalse(Range.closed(ratio(-1), ratio(1)).eq(Range.closed(ratio(1), ratio(-1))));

    assert.isFalse(Range.closed(ratio(-1), ratio(1)).eq(Range.leftHalfOpen(ratio(-1), ratio(1))));
    assert.isFalse(Range.closed(ratio(-1), ratio(1)).eq(Range.rightHalfOpen(ratio(-1), ratio(1))));
    assert.isFalse(Range.closed(ratio(-1), ratio(1)).eq(Range.open(ratio(-1), ratio(1))));
    assert.isFalse(Range.leftHalfOpen(ratio(-1), ratio(1)).eq(Range.closed(ratio(-1), ratio(1))));
    assert.isFalse(Range.leftHalfOpen(ratio(-1), ratio(1)).eq(Range.rightHalfOpen(ratio(-1), ratio(1))));
    assert.isFalse(Range.leftHalfOpen(ratio(-1), ratio(1)).eq(Range.open(ratio(-1), ratio(1))));
    assert.isFalse(Range.rightHalfOpen(ratio(-1), ratio(1)).eq(Range.closed(ratio(-1), ratio(1))));
    assert.isFalse(Range.rightHalfOpen(ratio(-1), ratio(1)).eq(Range.leftHalfOpen(ratio(-1), ratio(1))));
    assert.isFalse(Range.rightHalfOpen(ratio(-1), ratio(1)).eq(Range.open(ratio(-1), ratio(1))));
    assert.isFalse(Range.open(ratio(-1), ratio(1)).eq(Range.closed(ratio(-1), ratio(1))));
    assert.isFalse(Range.open(ratio(-1), ratio(1)).eq(Range.leftHalfOpen(ratio(-1), ratio(1))));
    assert.isFalse(Range.open(ratio(-1), ratio(1)).eq(Range.rightHalfOpen(ratio(-1), ratio(1))));
  });

  describe('contains', () => {
    it('Ratio', () => {
      assert.isTrue(Range.point(ratio(0)).contains(ratio(0)));
      assert.isTrue(Range.closed(ratio(-1), ratio(1)).contains(ratio(1)));
      assert.isTrue(Range.closed(ratio(-1), ratio(1)).contains(ratio(-1)));
      assert.isTrue(Range.leftHalfOpen(ratio(-1), ratio(1)).contains(ratio(1)));
      assert.isTrue(Range.rightHalfOpen(ratio(-1), ratio(1)).contains(ratio(-1)));
      assert.isTrue(Range.open(ratio(-1), ratio(1)).contains(ratio(0)));

      assert.isFalse(Range.point(ratio(0)).contains(ratio(1)));
      assert.isFalse(Range.closed(ratio(-1), ratio(1)).contains(ratio(2)));
      assert.isFalse(Range.closed(ratio(-1), ratio(1)).contains(ratio(-2)));
      assert.isFalse(Range.leftHalfOpen(ratio(-1), ratio(1)).contains(ratio(-1)));
      assert.isFalse(Range.rightHalfOpen(ratio(-1), ratio(1)).contains(ratio(1)));
      assert.isFalse(Range.open(ratio(-1), ratio(1)).contains(ratio(-1)));
      assert.isFalse(Range.open(ratio(-1), ratio(1)).contains(ratio(1)));
    });

    describe('Range', () => {
      it('contains', () => {
        assert.isTrue(Range.point(ratio(0)).contains(Range.point(ratio(0))));
        assert.isTrue(Range.empty.contains(Range.empty));
        assert.isTrue(Range.closed(ratio(-1), ratio(1)).contains(Range.empty));
        assert.isTrue(Range.closed(ratio(-1), ratio(1)).contains(Range.point(ratio(0))));
        assert.isTrue(Range.closed(ratio(-1), ratio(1)).contains(Range.closed(ratio(0), ratio(1))));
        assert.isTrue(Range.closed(ratio(-1), ratio(1)).contains(Range.closed(ratio(-1), ratio(0))));
        assert.isTrue(Range.closed(ratio(-1), ratio(1)).contains(Range.closed(ratio(-1), ratio(1))));
        assert.isTrue(Range.closed(ratio(-1), ratio(1)).contains(Range.leftHalfOpen(ratio(-1), ratio(1))));
        assert.isTrue(Range.closed(ratio(-1), ratio(1)).contains(Range.rightHalfOpen(ratio(-1), ratio(1))));
        assert.isTrue(Range.closed(ratio(-1), ratio(1)).contains(Range.open(ratio(-1), ratio(1))));

        assert.isTrue(Range.leftHalfOpen(ratio(-1), ratio(1)).contains(Range.leftHalfOpen(ratio(-1), ratio(1))));
        assert.isTrue(Range.leftHalfOpen(ratio(-1), ratio(1)).contains(Range.closed(ratio(0), ratio(1))));
        assert.isTrue(Range.leftHalfOpen(ratio(-1), ratio(1)).contains(Range.rightHalfOpen(ratio(-1, 2), ratio(1, 2))));
        assert.isTrue(Range.leftHalfOpen(ratio(-1), ratio(1)).contains(Range.open(ratio(-1), ratio(1))));

        assert.isTrue(Range.rightHalfOpen(ratio(-1), ratio(1)).contains(Range.rightHalfOpen(ratio(-1), ratio(1))));
        assert.isTrue(Range.rightHalfOpen(ratio(-1), ratio(1)).contains(Range.closed(ratio(-1), ratio(0))));
        assert.isTrue(Range.rightHalfOpen(ratio(-1), ratio(1)).contains(Range.leftHalfOpen(ratio(-1, 2), ratio(1, 2))));
        assert.isTrue(Range.rightHalfOpen(ratio(-1), ratio(1)).contains(Range.open(ratio(-1), ratio(1))));

        assert.isTrue(Range.open(ratio(-1), ratio(1)).contains(Range.open(ratio(-1), ratio(1))));
        assert.isTrue(Range.open(ratio(-1), ratio(1)).contains(Range.closed(ratio(-1, 2), ratio(1, 2))));
        assert.isTrue(Range.open(ratio(-1), ratio(1)).contains(Range.leftHalfOpen(ratio(-1, 2), ratio(1, 2))));
        assert.isTrue(Range.open(ratio(-1), ratio(1)).contains(Range.rightHalfOpen(ratio(-1, 2), ratio(1, 2))));
      });

      it('not contains', () => {
        assert.isFalse(Range.empty.contains(Range.point(ratio(0))));
        assert.isFalse(Range.empty.contains(Range.closed(ratio(-1), ratio(1))));
        assert.isFalse(Range.point(ratio(0)).contains(Range.closed(ratio(-1), ratio(1))));
        assert.isFalse(Range.closed(ratio(0), ratio(1)).contains(Range.closed(ratio(-1), ratio(1))));
        assert.isFalse(Range.closed(ratio(-1), ratio(0)).contains(Range.closed(ratio(-1), ratio(1))));
        assert.isFalse(Range.leftHalfOpen(ratio(-1), ratio(1)).contains(Range.closed(ratio(-1), ratio(1))));
        assert.isFalse(Range.rightHalfOpen(ratio(-1), ratio(1)).contains(Range.closed(ratio(-1), ratio(1))));
        assert.isFalse(Range.open(ratio(-1), ratio(1)).contains(Range.closed(ratio(-1), ratio(1))));

        assert.isFalse(Range.closed(ratio(-1, 2), ratio(1, 2)).contains(Range.leftHalfOpen(ratio(-1), ratio(1))));
        assert.isFalse(Range.rightHalfOpen(ratio(-1), ratio(1)).contains(Range.leftHalfOpen(ratio(-1), ratio(1))));
        assert.isFalse(Range.open(ratio(-1), ratio(1)).contains(Range.leftHalfOpen(ratio(-1), ratio(1))));

        assert.isFalse(Range.closed(ratio(-1, 2), ratio(1, 2)).contains(Range.rightHalfOpen(ratio(-1), ratio(1))));
        assert.isFalse(Range.leftHalfOpen(ratio(-1), ratio(1)).contains(Range.rightHalfOpen(ratio(-1), ratio(1))));
        assert.isFalse(Range.open(ratio(-1), ratio(1)).contains(Range.rightHalfOpen(ratio(-1), ratio(1))));

        assert.isFalse(Range.closed(ratio(-1, 2), ratio(1, 2)).contains(Range.open(ratio(-1), ratio(1))));
        assert.isFalse(Range.leftHalfOpen(ratio(-1, 2), ratio(1, 2)).contains(Range.open(ratio(-1), ratio(1))));
        assert.isFalse(Range.rightHalfOpen(ratio(-1, 2), ratio(1, 2)).contains(Range.open(ratio(-1), ratio(1))));
      });
    });
  });
});
