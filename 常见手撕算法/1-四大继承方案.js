// 1.原型继承
// 在 JavaScript 中，对象有一个特殊的隐藏属性 [[Prototype]]，它要么为 null，要么就是对另一个对象的引用。该对象被称为“原型”
// 当我们从 object 中读取一个缺失的属性时，JavaScript 会自动从原型中获取该属性。在编程中，这被称为“原型继承”。
// __proto__ 是 [[Prototype]] 的因历史原因而留下来的 getter/setter
// 现代编程语言建议我们应该使用函数 Object.getPrototypeOf/Object.setPrototypeOf 来取代 __proto__ 去 get/set 原型。
// 并不会把父类的方法克隆一份给子类，而是建立父类与子类之间的原型链查找机制
// 写/删除操作直接在对象上进行，它们不使用原型
// 如果我们调用 obj.method()，而且 method 是从原型中获取的，this 仍然会引用 obj。因此，方法始终与当前对象一起使用，即使方法是继承的。

let animal = {
    eat() {
        this.full = true;
    },
    walk() {
        console.log('animal walk');
    }
}

let rabbit = {
    jumps: true,
    __proto__: animal,
}

rabbit.walk();
rabbit.eat();
console.log(rabbit.full, animal.full);
