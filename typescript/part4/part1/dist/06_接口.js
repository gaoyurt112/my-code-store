"use strict";
(function () {
    /**
     * 在定义类时，可以使用类去实现一个接口
     * 实现接口就是使类满足一个接口的要求
     *
     */
    class MyClass {
        constructor(name) {
            this.name = name;
        }
        sayHello() {
            console.log('hello');
        }
    }
})();
