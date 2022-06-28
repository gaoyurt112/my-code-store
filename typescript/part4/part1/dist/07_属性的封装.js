"use strict";
(function () {
    class Person {
        constructor(name, age) {
            this._name = name;
            this._age = age;
        }
        /*getter方法用来读取属性
          setter方法用来设置属性
            --他们被称为属性的存取器
        */
        //定义一个方法获取name
        //    getName(){
        //       return this.name;
        //    }
        //    //定义一个方法设置name
        //    setName(value: string){
        //       this.name = value;
        //    }
        //    getAge(){
        //     return this.age;
        //  }
        //  setAge(value: number){
        //     if(value >= 0){
        //         this.age = value;
        //     }
        //  }
        //ts中设置getter方法的方式
        get name() {
            return this._name;
        }
        set name(value) {
            this._name = value;
        }
        get age() {
            return this._age;
        }
        set age(value) {
            if (value >= 0) {
                this._age = value;
            }
        }
    }
    const per = new Person('tom', 18);
    /*
    现在属性是在对象中设置的，属性可以任意的被修改
    属性可以任意被修改将会导致对象中的数据变得非常不安全
    */
    // per.name = '猪八戒';
    // per.age = -38;
    //  per.setName('猪八戒')
    //  per.setAge(-33)
    console.log(per);
    //简化写法
    class C {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
    }
    const c = new C('xxx', 111);
    console.log(c);
})();
