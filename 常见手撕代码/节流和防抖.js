// 节流
function throttle(fn, delay) {
    let timer = null;
    let flag = true;

    return function(...args) {
        if (!flag) return;
        clearTimeout(timer);
        flag = false;
        timer = setTimeout(() => {
            fn.apply(this, args);
            flag = true;
        }, delay)
    }
}

// 防抖
function debounce(fn, delay) {
    let timer = null;

    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
}