// 实现 instanceOf 方法
function myInstanceof(leftValue, rightValue) {
    if (leftValue === null || typeof leftValue !== 'object') return false;

    let rightProto = rightValue.prototype;
    let leftProto = leftValue.__proto__;

    while(true) {
        if (leftProto === null) return false;
        if (leftProto === rightProto) return true;
        leftProto = leftProto.__proto__;
    }
}

console.log(myInstanceof(new String('1'), String));

const arr = [1, 2];
console.log(myInstanceof(arr, Object));

function Animal(name) {
    this.name = name;
}

const cat = new Animal('cat');

console.log(myInstanceof(cat, Animal));