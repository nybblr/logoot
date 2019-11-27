import {
  tail,
  raise,
  sum,
} from './util.js';

let assertEmptyNode = (node) =>
  hasElement(node)
    ? raise(new RangeError('Tried to merge over a non-empty node, that should not happen!'))
    : node;

let Node = ({ id, element, children = [] }) => {
  let node = {
    id,
    element,
    length: element === undefined ? 0 : 1,
    children: [],
  };

  node.length += sum(
    children.map(child => addChild(node, child).delta)
  );

  return node;
};

let addChild = (parent, node) => {
  // Mutation is sad
  parent.children[tail(node.id)] = node;
  let delta = hasElement(node) ? 1 : 0;
  return { node, delta };
};

const emptyNode = { length: 0 };
let mergeChild = (parent, node) => {
  let current = getChild(parent, tail(node.id)) || emptyNode;
  assertEmptyNode(current);
  let delta = hasElement(node) ? 1 : 0;
  let child = { ...node, ...current,
    element: node.element,
    length: current.length + delta,
  };
  return addChild(parent, child);
};

let getChild = (parent, position) =>
  parent.children[position];

let emptyChild = (parent, position) =>
  Node({ id: [...parent.id, position] });

let addEmptyChild = (parent, position) =>
  addChild(parent,
    emptyChild(parent, position)
  ).node;

export let get = (node, [position, ...subId]) =>
  position === undefined
    ? node
    : get(getChild(node, position), subId);

export let add = (parent, level, id, element) => {
  let position = id[level];

  let { node, delta } = level === id.length - 1
    ? mergeChild(parent, Node({ id, element }))
    : add(
        getChild(parent, position) ||
          addEmptyChild(parent, position),
        level + 1, id, element
      )
  ;

  parent.length += delta;

  return { node, delta };
};

export let getByIndex = (parent, index) => {
  // TODO Naive: step over list from left to right
  // Better to do a binary search, but how?
  if (index === 0 && hasElement(parent)) { return parent; }
  let leftSum = hasElement(parent) ? 1 : 0;
  let i = parent.children.findIndex(child => {
    if (child === undefined) { return false; }

    let tooFar = leftSum + child.length > index;
    !tooFar && (leftSum += child.length);
    return tooFar;
  });
  return i < 0
    ? undefined
    : getByIndex(
        getChild(parent, i),
        index - leftSum
      )
};

export let hasElement = (node) =>
  node.element !== undefined;

export default Node;
