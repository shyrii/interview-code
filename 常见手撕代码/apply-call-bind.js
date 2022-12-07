// apply
Function.prototype.myApply = function(context, args) {
    context = context === undefined ?  window : context;
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
}

// call
Function.prototype.myCall = function(context, ...args) {
    context = context === undefined ? window : context;
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
}

// bind
Function.prototype.myBind = function(context) {
    context = context === undefined ? window : context;
    const fn = this;
    const args = [...arguments].slice(1);

    const resFn = function() {
        return fn.myApply(this instanceof resFn ? this : context, args.concat([...arguments]));
    }

    const tempFn = function() {};
    tempFn.prototype = fn.prototype;
    resFn.prototype = new tempFn();

    return resFn;
}

const a = {
    name: 'shyrii',
}

function fn(x, y) {
    this.name = x;
    console.log(`${this.name}${x}${y}`);
}

fn.myApply(a, ['111', '22']);
fn.myCall(a, '11', '122');

const bindFn = fn.myBind(a, '111');
bindFn('000');
const obj = new bindFn('000');
console.log(obj.name);