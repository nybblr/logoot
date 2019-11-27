import Node, {
  get as getNode,
  add as addNode,
  getByIndex as getNodeByIndex,
} from './node.js';
import { endPosition } from './identifier.js';

let Tree = ({ base, siteId }) => {
  let root = Node({
    id: [],
    children: [
      Node({ id: [0] }),
      Node({ id: [endPosition(base)] }),
    ]
  });

  return {
    base,
    root,
  };
};

export let add = (tree, id, element) =>
  addNode(tree.root, 0, id, element);

export let get = (tree, id) =>
  getNode(tree.root, id);

export let length = (tree) =>
  tree.root.length;

export let getByIndex = (tree, index) =>
  getNodeByIndex(tree.root, index);

export default Tree;
