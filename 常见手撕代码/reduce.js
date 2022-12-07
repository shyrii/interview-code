Array.prototype.myReduce = function() {
    const arr = this;
    const cb = arguments[0];
    const startIndex = arguments.length > 1 ? 0 : 1;
    let res = arguments.length > 1 ? arguments[1] : arr[0];

    for (let i = startIndex; i < arr.length; i++) {
        res = cb(res, arr[i], i, arr);
    }

    return res;
}

const arr = [1, 2, 3];

const res = arr.myReduce((pre, cur) => {
    return pre + cur;
}, 0);

console.log(res); // 6