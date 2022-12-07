// 设计 LazyMan 类
class LazyManClass {
    constructor(name) {
        this.name = name;
        this.taskList = [];
        console.log(`Hi I am ${this.name}`);
        setTimeout(() => {
            this.next();
        }, 0);
    }
    eat(food) {
        const fn = () => {
            console.log(` I am eating ${food}`);
            this.next();
        };
        this.taskList.push(fn);
        return this;
    }
    sleep(time) {
        const fn = () => {
            setTimeout(() => {
                console.log(`等待了${time}秒...`);
                this.next();
            }, time * 1000);
        }
        this.taskList.push(fn);
        return this;
    }
    sleepFirst(time) {
        const fn = () => {
            setTimeout(() => {
                console.log(`等待了${time}秒...`);
                this.next();
            }, time * 1000);
        }
        this.taskList.unshift(fn);
        return this;
    }
    next() {
        const fn = this.taskList.shift();
        fn && fn();
    }
}

function LazyMan(name) {
    return new LazyManClass(name);
}

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food