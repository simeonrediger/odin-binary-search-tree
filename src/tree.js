import { mergeSort, prune } from './utils.js';
import Node from './node.js';

export default class Tree {
    constructor(array) {
        this.root = this.build(prune(mergeSort(array)));
    }

    build(sortedArray, start = 0, end = sortedArray.length) {
        if (start >= end) {
            return null;
        }

        const mid = Math.floor((start + end) / 2);

        return new Node(
            sortedArray[mid],
            this.build(sortedArray, start, mid),
            this.build(sortedArray, mid + 1, end),
        );
    }

    insert(value) {
        let node = this.root;
        let direction;
        let lastNode;

        while (node) {
            if (value === node.value) {
                return;
            }

            direction = value < node.value ? 'left' : 'right';
            lastNode = node;
            node = node[direction];
        }

        const insertedNode = new Node(value);

        if (lastNode) {
            lastNode[direction] = insertedNode;
        } else {
            this.root = insertedNode;
        }
    }

    deleteItem(value, node = this.root) {
        let parentNode;
        let direction;
        let nodeToDelete;

        while (node) {
            if (value === node.value) {
                nodeToDelete = node;
                break;
            }

            direction = value < node.value ? 'left' : 'right';
            parentNode = node;
            node = node[direction];
        }

        if (!nodeToDelete) {
            return;
        }

        parentNode ??= this.root;

        if (nodeToDelete.left && nodeToDelete.right) {
            const minSuccessor = this.getMinSuccessor(nodeToDelete);
            nodeToDelete.value = minSuccessor.node.value;
            minSuccessor.delete();
        } else if (nodeToDelete.left) {
            parentNode[direction] = nodeToDelete.left;
        } else if (nodeToDelete.right) {
            parentNode[direction] = nodeToDelete.right;
        } else {
            parentNode[direction] = null;
        }
    }

    getMinSuccessor(node = this.root) {
        let parent = node;
        let direction = 'right';
        node = parent[direction];

        while (node && node.left) {
            parent = node;
            direction = 'left';
            node = node[direction];
        }

        return {
            node,
            delete: () => (parent[direction] = null),
        };
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }

        if (node.right !== null) {
            this.prettyPrint(
                node.right,
                `${prefix}${isLeft ? '│   ' : '    '}`,
                false,
            );
        }

        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);

        if (node.left !== null) {
            this.prettyPrint(
                node.left,
                `${prefix}${isLeft ? '    ' : '│   '}`,
                true,
            );
        }
    }
}
