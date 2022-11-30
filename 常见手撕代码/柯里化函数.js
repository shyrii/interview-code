function curry(fn) {
    return function curriedFn(...args) {
        if (args.length < fn.length) {
            return function() {
                return curriedFn(...args.concat([...arguments]));
            }
        }
        return fn(...args);
    }
}

const add = (x, y, z) => x + y + z;

const curryAdd = curry(add);

console.log(curryAdd(1)(2)(3));