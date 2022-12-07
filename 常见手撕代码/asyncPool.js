// poolLimit（数字类型）：表示限制的并发数；
// array（数组类型）：表示任务数组；
// iteratorFn（函数类型）：表示迭代函数，用于实现对每个任务项进行处理，该函数会返回一个 Promise 对象或异步函数。

// ES7 实现
async function asyncPool(poolLimit, array, iteratorFn) {
    const ret = []; // 存储所有的异步任务
    const executing = []; // 存储正在执行的异步任务

    for (const item of array) {
        const p = Promise.resolve().then(() => iteratorFn(item, array)); // 调用iteratorFn函数创建异步任务
        ret.push(p);

        if (poolLimit <= array.length) { // 当poolLimit值小于或等于总任务个数时，进行并发控制
            const e = p.then(() => executing.slice(executing.indexOf(e), 1)); // 当任务完成后，从正在执行的任务数组中移除已完成的任务

            executing.push(e); // 保存正在执行的异步任务

            if (executing.length >= poolLimit) {
                await Promise.race(executing);
            }
        }
    }

    return Promise.all(ret);
}

// ES6 实现
function asyncPool(poolLimit, array, iteratorFn) {
    const ret = []; // 存储所有的异步任务
    const executing = []; // 存储正在执行的异步任务
    let i = 0;

    const enqueue = function() {
        if (i === array.length) return Promise.resolve();

        const item = array[i++];

        const p = Promise.resolve().then(() => iteratorFn(item, array));
        ret.push(p);

        let r = Promise.resolve();

        if (poolLimit <= array.length) {
            const e = p.then(() => executing.slice(executing.indexOf(e), 1));
            executing.push(e);
            if (executing.length >= poolLimit) {
                r = Promise.race(executing);
            }
        }

        return r.then(() => enqueue());
    }

    return enqueue().then(() => Promise.all(ret));
}

const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));
asyncPool(2, [1000, 2000, 5000], timeout);