import {
  raise,
  times,
} from './util.js';

let assertNotRoot = (id) =>
  id.length === 0
    ? raise(new RangeError('Root node ID has no integer equivalent.'))
    : id;

export let bitLength = (int) =>
  Math.ceil(Math.log2(int + 1));

export let levelFromInt = (int, base) => {
  let width = bitLength(int);
  let level = 0;
  while (width > sumBitLengthForLevel(level, base)) {
    level++;
  }
  return level;
};

let mask = (width) =>
  (1 << width) - 1;

/*
 * Take an encoded integer
 * and convert to id array
 */
export let intToId = (int, base) => {
  let level = levelFromInt(int, base);
  let remainder = int;
  let id = times(level + 1)
    .map((_, i) => {
      let width = bitLengthForLevel(level - i, base);
      let result = remainder & mask(width);
      remainder >>>= width;
      return result;
    })
    .reverse();
  return id;
};

export let idToInt = (id, base) =>
  assertNotRoot(id).reduce((sum, p, i) =>
    (sum << bitLengthForLevel(i, base)) + p
  );

export let levelOf = (id) =>
  id.length - 1;

/*
 * How many bits to encode an identifier
 * that goes to level (id.length - 1)
 * given the starting base?
 *
 * Derived from geometric series.
 */
export let sumBitLengthForLevel = (level, base) =>
  (2*base + level) * (level + 1) / 2;

/*
 * How many bits does this
 * particular level need?
 */
export let bitLengthForLevel = (level, base) =>
  base + level;
