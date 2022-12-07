function compose() {
    let fns = [...arguments];

    if (fns.length === 0) {
        return (arg) => arg;
    }

    if (fns.length === 1) {
        return fns[0];
    }

    return fns.reduce((ret, fn) => (...args) => ret(fn(...args)));
}

const add10 = (x) => x + 10;
const mul10 = (x) => x * 10;
const add100 = (x) => x + 100;
const res1 = compose(add10)(10); // 20
const res2 = compose()(10); // 10
const res3 = compose(add10, mul10, add100)(10); //1110

console.log(res1, res2, res3);