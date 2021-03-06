// https://web.qianguyihao.com/04-JavaScript%E5%9F%BA%E7%A1%80/30-%E6%B5%85%E6%8B%B7%E8%B4%9D%E5%92%8C%E6%B7%B1%E6%8B%B7%E8%B4%9D.html#%E6%A6%82%E5%BF%B5

// 概念
// 浅拷贝：只拷贝最外面一层的数据；更深层次的对象，只拷贝引用。
// 深拷贝：拷贝多层数据；每一层级别的数据都会拷贝。

// 总结：
// 拷贝引用的时候，是属于传址，而非传值。

// 浅拷贝的实现方式

/* const obj1 = {
    name: 'redyouzi',
    age: 20,
    info: {
        desc: '很菜'
    }
}

const obj2 = {}
// 利用for in 将obj1的值拷贝给obj2
for (let key in obj1) {
    obj2[key] = obj1[key]
}

console.log('obj2:', JSON.stringify(obj2));
// obj2: { "name": "redyouzi", "age": 20, "info": { "desc": "很菜" } }

obj1.info.desc = '加油'; // 当修改 obj1 的第二层数据时，obj2的值也会被改变。所以  for in 是浅拷贝
console.log('obj2:', JSON.stringify(obj2));
// obj2: { "name": "redyouzi", "age": 20, "info": { "desc": "加油" } }
 */

/**
 * 上方代码中，用 for in 做拷贝时，只能做到浅拷贝。
 * 也就是说，在 obj2 中， name 和 age 这两个属性会单独存放在新的内存地址中，和 obj1 没有关系。
 * 但是，obj2.info 属性，跟 obj1.info属性，它俩指向的是同一个堆内存地址。
 * 所以，当我修改 obj1.info 里的值之后，obj2.info的值也会被修改。
 */

// 用 Object.assgin() 实现浅拷贝（推荐的方式）
// 上面的 for in 方法做浅拷贝过于繁琐。ES6 给我们提供了新的语法糖，通过 Object.assgin() 可以实现浅拷贝。
// Object.assgin() 在日常开发中，使用得相当频繁，非掌握不可。

/* const obj1 = {
    name: 'redyouzi',
    age: 20,
    info: {
        desc: 'hello',
    },
};

// 浅拷贝：把 obj1 拷贝给 obj2。如果 obj1 只有一层数据，那么，obj1 和 obj2 则互不影响
const obj2 = Object.assign({}, obj1);
console.log('obj2:' + JSON.stringify(obj2));

obj1.info.desc = '永不止步'; // 由于 Object.assign() 只是浅拷贝，所以当修改 obj1 的第二层数据时，obj2 对应的值也会被改变。
console.log('obj2:' + JSON.stringify(obj2));
 */

// 所以，当我们需要将对象 A 复制（拷贝）给对象 B，不要直接使用 B = A，而是要使用 Object.assign(B, A)。

/* let obj1 = { name: 'redyouzi', age: 20 };
let obj2 = { city: 'anhui', age: 22 };
let obj3 = {};

Object.assign(obj3, obj1, obj2); // 将 obj1、obj2的内容赋值给 obj3
console.log(obj3); // { name: 'redyouzi', age: 22, city: 'anhui' } 如果两个对象里的属性名相同，则 参数中靠后的对象中的值覆盖前面的值
 */


// 深拷贝的实现方式
// 深拷贝其实就是将浅拷贝进行递归。

let obj1 = {
    name: 'redyouzi',
    age: 20,
    info: {
        desc: 'hello',
    },
    color: ['red', 'blue', 'green'],
};
let obj2 = {};

// 深拷贝
deepCopy(obj2, obj1);
console.log(JSON.stringify(obj2));
// 修改obj1的desc obj2的没有再发生改变 (这里就不在是直接引用，而是传值)
obj1.info.desc = 'github';
console.log(JSON.stringify(obj2));

// { "name": "redyouzi", "age": 20, "info": { "desc": "hello" }, "color": ["red", "blue", "green"] }
// { "name": "redyouzi", "age": 20, "info": { "desc": "hello" }, "color": ["red", "blue", "green"] }

// 方法：深拷贝
function deepCopy(newObj, oldObj) {
    for (let key in oldObj) {
        // 获取属性值 oldObj[key]
        let item = oldObj[key];
        // 判断这个值是否是数组
        if (item instanceof Array) {
            newObj[key] = [];
            // 递归
            deepCopy(newObj[key], item);
        } else if (item instanceof Object) {
            // 判断这个值是否是对象
            newObj[key] = {};
            // 递归
            deepCopy(newObj[key], item);
        } else {
            // 简单数据类型，直接赋值
            newObj[key] = item;
        }
    }
}
