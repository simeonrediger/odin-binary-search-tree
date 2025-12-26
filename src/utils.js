export function mergeSort(array, start = 0, end = array.length) {
    if (end - start === 0) {
        return [];
    }

    if (end - start === 1) {
        return [array[start]];
    }

    const mid = Math.floor((start + end) / 2);
    const left = mergeSort(array, start, mid);
    const right = mergeSort(array, mid, end);

    return merge(left, right);
}

function merge(left, right) {
    const mergedArray = [];
    let i = 0;
    let j = 0;

    while (i < left.length || j < right.length) {
        let num;

        if (i === left.length) {
            num = right[j++];
        } else if (j === right.length) {
            num = left[i++];
        } else if (left[i] <= right[j]) {
            num = left[i++];
        } else {
            num = right[j++];
        }

        mergedArray.push(num);
    }

    return mergedArray;
}
