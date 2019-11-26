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
    children: {},
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

let mergeChild = (parent, node) => {
  let current = parent.children[tail(node.id)];
  current && assertEmptyNode(current);
  let child = { ...node, ...current, element: node.element };
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
    : get(node.children[position], subId);

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

export let hasElement = (node) =>
  node.element !== undefined;

export default Node;
