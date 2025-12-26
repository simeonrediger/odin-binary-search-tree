import { mergeSort, prune, validateCallback } from './utils.js';
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

    find(value) {
        let node = this.root;

        while (node && node.value !== value) {
            node = value < node.value ? node.left : node.right;
        }

        return node ?? null;
    }

    insert(value) {
        let node = this.root;
        let parent;

        while (node) {
            if (node.value === value) {
                return;
            }

            parent = node;
            node = value < node.value ? node.left : node.right;
        }

        const nodeToInsert = new Node(value);

        if (!parent) {
            this.root = nodeToInsert;
        } else if (value < parent.value) {
            parent.left = nodeToInsert;
        } else {
            parent.right = nodeToInsert;
        }
    }

    deleteItem(value) {
        let parent;
        let node = this.root;

        while (node && node.value !== value) {
            parent = node;
            node = value < node.value ? node.left : node.right;
        }

        if (!node) {
            return;
        }

        if (node.left && node.right) {
            const successor = this.#getMinSuccessor(node);
            node.value = successor.node.value;
            this.#deleteNode(successor.node, successor.parent);
        } else {
            this.#deleteNode(node, parent);
        }
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

    levelOrderForEach(callback) {
        validateCallback(callback);
        const queue = new Queue();
        queue.enqueue(this.root);

        while (queue.size !== 0) {
            const node = queue.dequeue();

            if (node.left) {
                queue.enqueue(node.left);
            }

            if (node.right) {
                queue.enqueue(node.right);
            }

            callback(node);
        }
    }

    #deleteNode(node, parent) {
        const child = node.left ?? node.right ?? null;

        if (!parent) {
            this.root = child;
        } else if (parent.left === node) {
            parent.left = child;
        } else {
            parent.right = child;
        }
    }

    #getMinSuccessor(node = this.root) {
        let parent = node;
        node = node.right ?? null;

        while (node && node.left) {
            parent = node;
            node = node.left;
        }

        return { node, parent };
    }
}
