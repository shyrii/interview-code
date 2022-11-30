const arr = ['12', '11', '12', '33', '34', '33'];

// set
arr1 = Array.from(new Set(arr));
// arr1 = [...new Set(arr)];

// filter
const arr2 = arr.filter((item, index, arr) => {
    return arr.indexOf(item) === index;
})

// reduce
const arr3 = arr.reduce((pre, cur) => {
    return pre.includes(cur) ? pre : [...pre, cur];
}, []);

// for 循环
const arr4 = [];
for (let i = 0; i < arr.length; i++) {
    if (!arr4.includes(arr[i])) {
    // if (arr4.indexOf(arr[i]) === -1) {
        arr4.push(arr[i]);
    }
}

console.log(arr4);