function promiseAll(promises) {
    const promiseNum = promises.length;
    let resolveNum = 0;
    let list = new Array(promiseNum);

    return new Promise((resolve, reject) => {
        for (let i = 0; i < promiseNum; i++) {
            Promise.resolve(promises[i]).then(res => {
                list[i] = res;
                resolveNum += 1;
                if (resolveNum === promiseNum) {
                    return resolve(list);
                }

            }).catch(reason => {
                return reject(reason);
            })
        }
    })
}

const p1 = new Promise((resolve, reject) => {
    reject('err1');
    resolve('p1');
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p2');
        reject('err');
    }, 1000);
})

const p = promiseAll([p1, p2]).then((res) => {
    console.log(res);
}).catch(err => console.log(err));