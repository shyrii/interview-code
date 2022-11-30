/*
    内置new方法 的执行过程
    1. 首先创建一个 object 实例；
    2. 把这个类当做普通函数执行，并将 this 指向 object 实例；
    3. 如果这个类有 return 引用类型的结果返回, 则返回 return 结果; 如果没有,返回的则是 object 实例
    */
function myNew(func, ...args) {
    const obj = {};
    obj.__proto__ = func.prototype;
    const res = func.apply(obj, args);
    return typeof res === 'object' ? res : obj;

};

function getName(name) {
    this.name = name;
    // return {};
}

console.log(myNew(getName, 'shyrii'));

console.log(new getName('shyrii'));