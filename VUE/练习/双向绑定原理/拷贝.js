//浅拷贝
const obj1 = {
    name:'111',
    arr:[1,2,3,4]
}

const obj2 = shallowClone(obj1)

//浅拷贝方式
//定义浅拷贝函数，传入一个参数需要拷贝的obj
function shallowClone(source) {
    //定义变量
    var target = {};
    //遍历对象
    for(var i in source) {
        //判断obj是否有自己的属性
        if (source.hasOwnProperty(i)) {
            //定义对象中的属性 = obj的属性
            target[i] = source[i];
        }
    }
    //返回拷贝对象
    return target;
}
obj2.name = '222'
obj2.arr[1] = [2,3,4,5,6676]

console.log(obj1);
console.log(obj2);



//深拷贝
const obj3 = {
    name:'Tom',
    arr:[1,2,3,4,5]
}

let obj4 = deepClone(obj3)
obj4.name = 'nick'
obj4.arr[1] = [4,5,6]

//定义深度拷贝函数传入对象
function deepClone(obj) {
    //如果对象为空返回原对象
    if (obj === null) return obj; 

    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (typeof obj !== "object") return obj;
    //拷贝对象= 新的构造函数
    let cloneObj = new obj.constructor();
    //循环遍历对象中的属性
    for (let key in obj) {
        //如果对象本身拥有key
      if (obj.hasOwnProperty(key)) {
        // 实现一个递归拷贝,其中还有复杂数据类型再次循环属性内部的数据
        cloneObj[key] = deepClone(obj[key]);
      }
    }
    return cloneObj;
}

console.log(obj3);
console.log(obj4);
