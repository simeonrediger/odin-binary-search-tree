export default class Queue {
    #size = 0;

    constructor() {
        this.head = undefined;
        this.tail = undefined;
    }

    get size() {
        return this.#size;
    }

    enqueue(node) {
        if (this.head) {
            this.tail.next = node;
            this.tail = node;
        } else {
            this.head = node;
            this.tail = node;
        }

        this.#size++;
    }

    dequeue() {
        if (!this.head) {
            return;
        }

        const target = this.head;
        this.head = this.head.next;
        this.#size--;

        if (this.#size === 0) {
            this.tail = this.head;
        }

        return target;
    }
}
