"use strict";
class Dog {
    //constructorr被称为构造函数
    //构造函数会在对象创建时调用
    constructor(name, age) {
        //在实例方法中，this就表示当前的实例
        //在构造函数中当前对象就是当前新建的那个对象
        //可以通过this向新建的对象中添加属性
        this.name = name;
        this.age = age;
        // console.log(this);
    }
    bark() {
        //   alert('汪汪汪!')
        //在方法中可以通过this来表示当前调用方法的对象
        console.log(this.name);
    }
}
const dog = new Dog('小黑', 3);
const dog2 = new Dog('小白', 4);
// console.log(dog);
// console.log(dog2);
dog2.bark();
