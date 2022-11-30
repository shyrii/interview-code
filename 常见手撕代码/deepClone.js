// 实现对象的深拷贝
function deepClone(obj) {
    if (obj === null) return null;
    if (typeof obj !== 'object') return obj;

    let newObj = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClone(obj[key]);
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


const newObj = deepClone(obj);
console.log(newObj);