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
});

describe('accessors', () => {
  describe('empty', () => {
    it('closed', () => {
      assert.isTrue(Range.closed(ratio(1, 2), ratio(0)).empty);
      assert.isTrue(Range.closed(ratio(0), ratio(-1, 2)).empty);

      assert.isFalse(Range.closed(ratio(-1, 2), ratio(1, 2)).empty);
      assert.isFalse(Range.closed(ratio(1, 2), ratio(1, 2)).empty);
      assert.isFalse(Range.closed(ratio(-1, 2), ratio(-1, 2)).empty);
    });

    it('leftHalfOpen', () => {
      assert.isTrue(Range.leftHalfOpen(ratio(1, 2), ratio(1, 2)).empty);
      assert.isTrue(Range.leftHalfOpen(ratio(1, 2), ratio(0)).empty);
      assert.isTrue(Range.leftHalfOpen(ratio(0), ratio(-1, 2)).empty);
      assert.isTrue(Range.leftHalfOpen(ratio(-1, 2), ratio(-1, 2)).empty);

      assert.isFalse(Range.leftHalfOpen(ratio(-1, 2), ratio(1, 2)).empty);
    });

    it('rightHalfOpen', () => {
      assert.isTrue(Range.leftHalfOpen(ratio(1, 2), ratio(1, 2)).empty);
      assert.isTrue(Range.leftHalfOpen(ratio(1, 2), ratio(0)).empty);
      assert.isTrue(Range.leftHalfOpen(ratio(0), ratio(-1, 2)).empty);
      assert.isTrue(Range.leftHalfOpen(ratio(-1, 2), ratio(-1, 2)).empty);

      assert.isFalse(Range.leftHalfOpen(ratio(-1, 2), ratio(1, 2)).empty);
    });

    it('open', () => {
      assert.isTrue(Range.leftHalfOpen(ratio(1, 2), ratio(1, 2)).empty);
      assert.isTrue(Range.leftHalfOpen(ratio(1, 2), ratio(0)).empty);
      assert.isTrue(Range.leftHalfOpen(ratio(0), ratio(-1, 2)).empty);
      assert.isTrue(Range.leftHalfOpen(ratio(-1, 2), ratio(-1, 2)).empty);

      assert.isFalse(Range.leftHalfOpen(ratio(-1, 2), ratio(1, 2)).empty);
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
});
