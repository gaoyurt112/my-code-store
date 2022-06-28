"use strict";
//ts会检测不同ts文件中的变量，是否重复
(function () {
    //定义一个动物类
    class Animal {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
        bark() {
            console.log('动物在叫');
        }
    }
    // 定义一个狗的类
    // extends继承 使dog继承animal类
    // 此时Animal被称为父类，Dog被称为子类
    // 使用继承后，子类将拥有父类的所有方法和属性
    // 通过继承可以将多个类中共有的代码写在一个父类中，
    //这样只需要写一次即可让所有的子类同时拥有父类中的属性
    //如果在子类中添加一些父类中没有的属性或者方法直接加就行
    class Dog extends Animal {
        run() {
            console.log(`${this.name}在跑~~~`);
        }
        //如果子类中出现了和父类一样的方法，那么子类会覆盖父类
        bark() {
            console.log('汪汪汪');
        }
    }
    //定义一个猫的类
    //使cat继承animal类
    class Cat extends Animal {
    }
    const dog = new Dog('旺财', 3);
    console.log(dog);
    dog.run();
    dog.bark();
    const cat = new Cat('咪咪', 3);
    console.log(cat);
    cat.bark();
})();
