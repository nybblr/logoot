import { expect } from 'chai';

import Tree, {
  get,
  add,
  length,
} from '../src/tree.js';
import {
  hasElement
} from '../src/node.js';

const base = 3;
const siteId = 2;

describe('Tree', () => {
  let tree;

  beforeEach(() => {
    tree = Tree({ siteId, base });
  });

  it('has a root node', () => {
    let node = get(tree, []);
    expect(node.id).to.eql([]);
  });

  it('has a begin node', () => {
    let node = get(tree, [0]);
    expect(node.id).to.eql([0]);
  });

  it('has an end node', () => {
    let node = get(tree, [7]);
    expect(node.id).to.eql([7]);
  });

  describe('add', () => {
    it('adds a child to the root node', () => {
      add(tree, [1], 'A');

      let node = get(tree, [1]);
      expect(node.id).to.eql([1]);
      expect(node.element).to.eql('A');
    });

    it('adds a child a child node', () => {
      add(tree, [1], 'A');
      add(tree, [1,5], 'B');

      let node = get(tree, [1,5]);
      expect(node.id).to.eql([1,5]);
      expect(node.element).to.eql('B');
    });

    it('adds a child several levels down', () => {
      add(tree, [1], 'A');
      add(tree, [1,5], 'B');
      add(tree, [1,5,8], 'C');

      let node = get(tree, [1,5,8]);
      expect(node.id).to.eql([1,5,8]);
      expect(node.element).to.eql('C');
    });

    it('adds gap nodes when adding a child', () => {
      add(tree, [1,5], 'B');

      let node = get(tree, [1,5]);
      expect(node.id).to.eql([1,5]);
      expect(node.element).to.eql('B');

      let parent = get(tree, [1]);
      expect(parent.id).to.eql([1]);
      expect(hasElement(parent)).to.eql(false);
    });

    it('throws if an ID is reused', () => {
      add(tree, [1,5], 'B');
      expect(() =>
        add(tree, [1,5], 'A')
      ).to.throw(RangeError);
    });

    /*
     * TODO: Not positive about this behavior.
     * Some implementations call for idempotency,
     * but it's preferable to let the network
     * enforce that.
     */
    it('throws if the node is readded', () => {
      add(tree, [1,5], 'B');
      expect(() =>
        add(tree, [1,5], 'B')
      ).to.throw(RangeError);
    });
  });

  describe('length', () => {
    it('is 0 for an empty tree', () => {
      expect(length(tree)).to.eql(0);
    });

    it('is 1 after adding a node', () => {
      add(tree, [1], 'A');
      expect(length(tree)).to.eql(1);

      expect(get(tree, [1]).length).to.eql(1);
    });

    it('is 1 after adding a node despite the gap', () => {
      add(tree, [1,5], 'B');
      expect(length(tree)).to.eql(1);

      expect(get(tree, [1]).length).to.eql(1);
      expect(get(tree, [1,5]).length).to.eql(1);
    });

    it('is 2 when adding depth first', () => {
      add(tree, [1], 'A');
      add(tree, [1,5], 'B');
      expect(length(tree)).to.eql(2);

      expect(get(tree, [1]).length).to.eql(2);
      expect(get(tree, [1,5]).length).to.eql(1);
    });

    it('is 2 after adding filling the gap', () => {
      add(tree, [1,5], 'B');
      add(tree, [1], 'A');
      expect(length(tree)).to.eql(2);

      expect(get(tree, [1]).length).to.eql(2);
      expect(get(tree, [1,5]).length).to.eql(1);
    });

    it('is 2 with 2 shallow nodes', () => {
      add(tree, [1], 'A');
      add(tree, [2], 'B');
      expect(length(tree)).to.eql(2);

      expect(get(tree, [1]).length).to.eql(1);
      expect(get(tree, [2]).length).to.eql(1);
    });

    it('is 3 with deep nodes and gap', () => {
      add(tree, [1,2,3], 'A');
      add(tree, [2,3,4], 'B');
      add(tree, [1,2], 'C');
      expect(length(tree)).to.eql(3);

      expect(get(tree, [1,2,3]).length).to.eql(1);
      expect(get(tree, [2,3,4]).length).to.eql(1);
      expect(get(tree, [1,2]).length).to.eql(2);
    });
  });
});
