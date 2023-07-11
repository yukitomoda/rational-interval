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
