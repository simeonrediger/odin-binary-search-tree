export function generateRandomIntegers(
    numCountLower,
    numCountUpper,
    numValueLower,
    numValueUpper,
) {
    const numCount =
        numCountLower +
        Math.floor((numCountUpper - numCountLower) * Math.random());

    const nums = [];

    for (let i = 0; i < numCount; i++) {
        const num =
            numValueLower +
            Math.floor((numValueUpper - numValueLower) * Math.random());

        nums.push(num);
    }

    return nums;
}

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

export function prune(sortedArray) {
    const prunedArray = [];

    for (let i = 0; i < sortedArray.length; i++) {
        if (sortedArray[i] !== sortedArray[i - 1]) {
            prunedArray.push(sortedArray[i]);
        }
    }

    return prunedArray;
}

export function validateCallback(callback) {
    if (callback == null) {
        throw new TypeError('A callback function is required');
    } else if (typeof callback !== 'function') {
        throw new TypeError(
            `Callback must be a function. Got ${typeof callback}`,
        );
    }
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
