import { mergeSort } from './utils.js';

class Tree {
    constructor(array) {
        const sortedArray = mergeSort(array);
        this.root = this.build(sortedArray);
    }

    build(sortedArray, start = 0, end = sortedArray.length) {
        // TODO
    }
}
