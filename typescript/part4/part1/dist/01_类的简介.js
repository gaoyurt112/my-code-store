"use strict";
//使用class关键字定义一个类
/*
对象中主要包含了两个部分：
   属性
   方法
*/
class Person {
    constructor() {
        /*
          直接定义的属性是实例属性，需要通过对象的实例去访问：
          const per = new Person();
          per.name
    
    
          使用static开头的属性是静态属性（类属性），可以直接通过类去访问
          Person.age
    
          //readonly开头的属性表示一个只读的属性无法修改
        */
        //定义实例属性
        //   readonly name: string = 'helloTS';
        this.name = "hellots";
        //在属性前面使用static关键字可以定义类属性(静态属性)
        //    static readonly age: number = 18;
        this.age = 18;
    }
    //如果方法以static开头那么就是一个类方法，直接通过类调用
    //定义方法
    static sayHello() {
        console.log('hello');
    }
}
const per = new Person();
// console.log(per);
// console.log(Person.age);
console.log(per.name);
//在属性前添加readonly会变为只读属性不可以修改
// per.name = 'tom';
// console.log(per.name);
// per.sayHello();
Person.sayHello();
