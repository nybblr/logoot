import { raise } from './util.js';

let assertNotRoot = (id) =>
  id.length === 0
    ? raise(new RangeError('Root node ID has no integer equivalent.'))
    : id;

export let idToInt = (id, base) =>
  assertNotRoot(id).reduce((sum, p, i) =>
    (sum << bitLengthForLevel(i, base)) + p
  );

// export let sidAtLevel = (int, level, base) => {
//   let width = bitLengthForLevel(level, base);
//   let shift = ???
// };

/*
 * Much harder, how do we know
 * the depth of the id?
 */
export let intToId = (int, base) =>
  0;

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

// let shiftForLevel = () =>
