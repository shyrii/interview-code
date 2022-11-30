function before(n, func) {
  let result;
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }
  return function (...args) {
    if (n > 0) {
      result = func.apply(this, args); // 转换 this
      n -= 1;
    }
    if (n <= 0) {
      func = undefined; // 释放持有，释放内存
    }
    return result;
  }
}

let i = 0;

const onced = before(1, () => {
  i++;
  return i;
});

for (let j = 0; j < 3; j++) {
  console.log(onced());
}
