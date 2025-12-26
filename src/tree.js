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
