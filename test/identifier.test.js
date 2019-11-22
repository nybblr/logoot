import {
  idToInt,
  bitLengthForLevel,
  sumBitLengthForLevel,
  // sidAtLevel,
} from '../src/identifier.js';
import { expect } from 'chai';

describe('bitLengthForLevel', () => {
  it('is 3 for level 0, base 3', () => {
    expect(bitLengthForLevel(0, 3)).to.eql(3);
  });

  it('is 4 for level 1, base 3', () => {
    expect(bitLengthForLevel(1, 3)).to.eql(4);
  });

  it('is 5 for level 2, base 3', () => {
    expect(bitLengthForLevel(2, 3)).to.eql(5);
  });

  it('is 6 for level 3, base 3', () => {
    expect(bitLengthForLevel(3, 3)).to.eql(6);
  });
});

describe('sumBitLengthForLevel', () => {
  it('is 3 for level 0, base 3', () => {
    expect(sumBitLengthForLevel(0, 3)).to.eql(3);
  });

  it('is 7 for level 1, base 3', () => {
    expect(sumBitLengthForLevel(1, 3)).to.eql(7);
  });

  it('is 12 for level 2, base 3', () => {
    expect(sumBitLengthForLevel(2, 3)).to.eql(12);
  });

  it('is 18 for level 3, base 3', () => {
    expect(sumBitLengthForLevel(3, 3)).to.eql(18);
  });
});

describe('idToInt', () => {
  it('throws an error for the root node', () => {
    expect(() =>
      idToInt([], 3)
    ).to.throw(RangeError);
  });

  it('encodes id<0> as 0 for any base', () => {
    expect(idToInt([0], 2)).to.eql(0);
    expect(idToInt([0], 3)).to.eql(0);
    expect(idToInt([0], 4)).to.eql(0);
  });

  it('encodes id<7> as 7 for base 3', () => {
    expect(idToInt([7], 3)).to.eql(7);
    // 7 => 0b 111
  });

  it('encodes id<1,3> as 19 for base 3', () => {
    expect(idToInt([1,3], 3)).to.eql(19);
    // 19 => 0b 001.0011
  });

  it('encodes id<6,15,10> as 3562 for base 3', () => {
    expect(idToInt([6,15,10], 3)).to.eql(3562);
    // 3562 => 0b 110.1111.01010
  });
});

describe.skip('sidFromIntAtLevel', () => {
  it('is <7,...> for int 7 at level 0', () => {
    expect(sidAtLevel(7, 0, 3)).to.eql(7);
  });
});
