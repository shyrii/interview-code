class EventBus {
    constructor() {
        this.eventList = {};
    }
    $on(event, fn) {
        if (this.eventList[event]) {
            this.eventList[event].push(fn);
        } else {
            this.eventList[event] = [fn];
        }
    }
    $emit(event, ...args) {
        if (this.eventList[event]) {
            this.eventList[event].forEach(fn => {
                fn(...args);
            });
        }
    }
    $off(event, fn) {
        if (this.eventList[event]) {
            this.eventList[event] = this.eventList[event].filter(item => {
                return item !== fn;
            })
        }
    }
}

const bus = new EventBus();

bus.$on('hello', (name) => {
    console.log(`hello1${name}`);
});

const a = (name) => {
    console.log(`hello2${name}`);
};

bus.$on('hello', a);

bus.$off('hello', a);

bus.$emit('hello', 'shyrii');

// hello1shyrii