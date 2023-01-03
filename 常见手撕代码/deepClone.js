// 实现对象的深拷贝
function deepClone(obj, map = new WeakMap()) {
    if (obj === null) return null;
    if (typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);

    if (map.has(obj)) return map.get(obj); // 解决循环引用问题


    map.set(obj, obj);

    const newObj = Array.isArray(obj) ? [] : {};

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