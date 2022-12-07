function isValidListener(listener) {
    if (typeof listener === 'function') return true;
    else if (typeof listener === 'object') return isValidListener(listener.listener);
    else return false;
}

function indexOfListener(array, item) {
    let listener = typeof item === 'object' ? item.listener : item;
    for (let i = 0; i < array.length; i++) {
        if (array[i].listener === listener) {
            return i;
        }
    }
    return -1;
}

class EventEmitter {
    constructor() {
        this.events = {};
    }
    addListener(event, listener) {
        if (!event || !listener) return;
        if (!isValidListener(listener)) throw new Error('listener must be a function');
        
        if (!this.events[event]) this.events[event] = [];
        if (indexOfListener(this.events[event], listener) === -1) {
            this.events[event].push(typeof listener === 'object' ? listener : {
                listener: listener,
                once: false
            })
        }
    }
    removeListener(event, listener) {
        if (!this.events[event]) return;

        const index = indexOfListener(this.events[event], listener);

        if (index !== -1) {
            this.events[event].splice(index, 1);
        }
    }
    removeAllListener(event) {
        if (event && this.events[event]) {
            this.events[event] = [];
        } else {
            this.events = {};
        }
    }
    emit(event, ...args) {
        if (!this.events[event]) return;

        this.events[event].forEach(item => {
            item.listener.apply(this, args || []);
            if (item.once) {
                this.removeListener(event, item.listener);
            }
        });
    }
    once(event, listener) {
        return this.addListener(event, {
            listener: listener,
            once: true
        });
    }
}

let eventEmitter = new EventEmitter();

const sayHello = function() {
    console.log('hello');
}
const sayHi = function() {
    console.log('hi');
}

eventEmitter.addListener('hello', sayHi);
eventEmitter.removeListener('hello', sayHi);
eventEmitter.once('hello', sayHello);

eventEmitter.emit('hello');
eventEmitter.emit('hello');
