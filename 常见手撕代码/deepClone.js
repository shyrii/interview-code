// 实现对象的深拷贝
function deepClone(obj, map = new WeakMap()) {
    if (obj === null) return null;
    if (typeof obj !== 'object') return obj;

    const exitObj = map.get(obj);

    if (exitObj) {
        return exitObj;
    }

    map.set(obj, obj);

    let newObj = {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClone(obj[key], map);
        }
    }

    return newObj;
}

const obj = {
    name: 'shyrii',
    info: {
        age: 24,
        sex: 'female'
    },
    like: ['dog', 'cat'],
}

obj.info.obj = obj;

const newObj = deepClone(obj);
console.log(newObj);