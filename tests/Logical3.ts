import { Logical3 } from '../src/Logical3';
import { assert } from 'chai';
import { it, describe } from 'mocha';

describe('ctor', () => {
  it('true', () => {
    assert.isTrue(Logical3.true.isTrue);
    assert.isFalse(Logical3.true.isFalse);
    assert.isFalse(Logical3.true.isIndeterminate);
    assert.isTrue(Logical3.true.isDeterminate);
  });

  it('false', () => {
    assert.isFalse(Logical3.false.isTrue);
    assert.isTrue(Logical3.false.isFalse);
    assert.isFalse(Logical3.false.isIndeterminate);
    assert.isTrue(Logical3.false.isDeterminate);
  });

  it('indeterminate', () => {
    assert.isFalse(Logical3.indeterminate.isTrue);
    assert.isFalse(Logical3.indeterminate.isFalse);
    assert.isTrue(Logical3.indeterminate.isIndeterminate);
    assert.isFalse(Logical3.indeterminate.isDeterminate);
  });

  it('from', () => {
    assert.isTrue(Logical3.from(true).isTrue);
    assert.isTrue(Logical3.from(Logical3.true).isTrue);
    assert.isTrue(Logical3.from(false).isFalse);
    assert.isTrue(Logical3.from(Logical3.false).isFalse);
    assert.isTrue(Logical3.from(null).isIndeterminate);
    assert.isTrue(Logical3.from(Logical3.indeterminate).isIndeterminate);
  });
});

describe('eq', () => {
  it('true', () => {
    assert.isTrue(Logical3.true.eq(Logical3.true));
    assert.isTrue(Logical3.true.eq(true));
    assert.isFalse(Logical3.true.eq(Logical3.false));
    assert.isFalse(Logical3.true.eq(false));
    assert.isFalse(Logical3.true.eq(Logical3.indeterminate));
    assert.isFalse(Logical3.true.eq(null));
  });

  it('false', () => {
    assert.isTrue(Logical3.false.eq(Logical3.false));
    assert.isTrue(Logical3.false.eq(false));
    assert.isFalse(Logical3.false.eq(Logical3.true));
    assert.isFalse(Logical3.false.eq(true));
    assert.isFalse(Logical3.false.eq(Logical3.indeterminate));
    assert.isFalse(Logical3.false.eq(null));
  });

  it('indeterminate', () => {
    assert.isTrue(Logical3.indeterminate.eq(Logical3.indeterminate));
    assert.isTrue(Logical3.indeterminate.eq(null));
    assert.isFalse(Logical3.indeterminate.eq(Logical3.true));
    assert.isFalse(Logical3.indeterminate.eq(true));
    assert.isFalse(Logical3.indeterminate.eq(Logical3.false));
    assert.isFalse(Logical3.indeterminate.eq(false));
  });
});

describe('not', () => {
  it('true', () => {
    assert.isTrue(Logical3.true.not().isFalse);
  });

  it('false', () => {
    assert.isTrue(Logical3.false.not().isTrue);
  });

  it('indeterminate', () => {
    assert.isTrue(Logical3.indeterminate.not().isIndeterminate);
  });
});

describe('or', () => {
  it('true', () => {
    assert.isTrue(Logical3.true.or(Logical3.true).isTrue);
    assert.isTrue(Logical3.true.or(true).isTrue);
    assert.isTrue(Logical3.true.or(Logical3.false).isTrue);
    assert.isTrue(Logical3.true.or(false).isTrue);
    assert.isTrue(Logical3.true.or(Logical3.indeterminate).isTrue);
    assert.isTrue(Logical3.true.or(null).isTrue);
  });

  it('false', () => {
    assert.isTrue(Logical3.false.or(Logical3.false).isFalse);
    assert.isTrue(Logical3.false.or(false).isFalse);
    assert.isTrue(Logical3.false.or(Logical3.true).isTrue);
    assert.isTrue(Logical3.false.or(true).isTrue);
    assert.isTrue(Logical3.false.or(Logical3.indeterminate).isIndeterminate);
    assert.isTrue(Logical3.false.or(null).isIndeterminate);
  });

  it('indeterminate', () => {
    assert.isTrue(Logical3.indeterminate.or(Logical3.indeterminate).isIndeterminate);
    assert.isTrue(Logical3.indeterminate.or(null).isIndeterminate);
    assert.isTrue(Logical3.indeterminate.or(Logical3.true).isTrue);
    assert.isTrue(Logical3.indeterminate.or(true).isTrue);
    assert.isTrue(Logical3.indeterminate.or(Logical3.false).isIndeterminate);
    assert.isTrue(Logical3.indeterminate.or(false).isIndeterminate);
  });
});

describe('and', () => {
  it('true', () => {
    assert.isTrue(Logical3.true.and(Logical3.true).isTrue);
    assert.isTrue(Logical3.true.and(true).isTrue);
    assert.isTrue(Logical3.true.and(Logical3.false).isFalse);
    assert.isTrue(Logical3.true.and(false).isFalse);
    assert.isTrue(Logical3.true.and(Logical3.indeterminate).isIndeterminate);
    assert.isTrue(Logical3.true.and(null).isIndeterminate);
  });

  it('false', () => {
    assert.isTrue(Logical3.false.and(Logical3.false).isFalse);
    assert.isTrue(Logical3.false.and(false).isFalse);
    assert.isTrue(Logical3.false.and(Logical3.true).isFalse);
    assert.isTrue(Logical3.false.and(true).isFalse);
    assert.isTrue(Logical3.false.and(Logical3.indeterminate).isFalse);
    assert.isTrue(Logical3.false.and(null).isFalse);
  });

  it('indeterminate', () => {
    assert.isTrue(Logical3.indeterminate.and(Logical3.indeterminate).isIndeterminate);
    assert.isTrue(Logical3.indeterminate.and(null).isIndeterminate);
    assert.isTrue(Logical3.indeterminate.and(Logical3.true).isIndeterminate);
    assert.isTrue(Logical3.indeterminate.and(true).isIndeterminate);
    assert.isTrue(Logical3.indeterminate.and(Logical3.false).isFalse);
    assert.isTrue(Logical3.indeterminate.and(false).isFalse);
  });
});
