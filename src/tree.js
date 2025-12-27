import { mergeSort, prune, validateCallback } from './utils.js';
import Node from './node.js';
import Queue from './queue.js';

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

    rebalance() {
        const sortedArray = [];
        this.inOrderForEach(node => sortedArray.push(node.value));
        this.root = this.build(sortedArray);
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

    getHeight(value = this.root?.value) {
        const node = this.find(value);

        if (!node) {
            return null;
        }

        return this.#getNodeHeight(node);
    }

    getDepth(value) {
        let node = this.root;
        let depth = 0;

        while (node && node.value !== value) {
            node = value < node.value ? node.left : node.right;
            depth++;
        }

        return node ? depth : null;
    }

    isBalanced(node = this.root) {
        return this.#getBalancedHeightScore(node) > 0;
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

    inOrderForEach(callback, node = this.root) {
        validateCallback(callback);
        this.#inOrderForEach(callback, node);
    }

    preOrderForEach(callback, node = this.root) {
        validateCallback(callback);
        this.#preOrderForEach(callback, node);
    }

    postOrderForEach(callback, node = this.root) {
        validateCallback(callback);
        this.#postOrderForEach(callback, node);
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node === null) {
            if (this.root === null) {
                console.log('<empty tree>');
            }

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

    #getNodeHeight(node) {
        let height = 0;

        if (!node?.left && !node?.right) {
            return height;
        }

        height++;

        return (
            height +
            Math.max(
                this.#getNodeHeight(node.left),
                this.#getNodeHeight(node.right),
            )
        );
    }

    // If balanced, returns height
    // Otherwise, returns -1
    #getBalancedHeightScore(node) {
        let height = 0;

        if (node) {
            height++;
        } else {
            return height;
        }

        const leftHeight = this.#getBalancedHeightScore(node.left);
        const rightHeight = this.#getBalancedHeightScore(node.right);
        const heightDifference = Math.abs(leftHeight - rightHeight);

        if (leftHeight === -1 || rightHeight === -1 || heightDifference > 1) {
            return -1;
        }

        height += Math.max(leftHeight, rightHeight);
        return height;
    }

    #inOrderForEach(callback, node) {
        if (!node) {
            return;
        }

        this.#inOrderForEach(callback, node.left);
        callback(node);
        this.#inOrderForEach(callback, node.right);
    }

    #preOrderForEach(callback, node) {
        if (!node) {
            return;
        }

        callback(node);
        this.#preOrderForEach(callback, node.left);
        this.#preOrderForEach(callback, node.right);
    }
    #postOrderForEach(callback, node) {
        if (!node) {
            return;
        }

        this.#postOrderForEach(callback, node.left);
        this.#postOrderForEach(callback, node.right);
        callback(node);
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
