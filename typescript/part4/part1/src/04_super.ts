(function(){
  class Animal{
      name: string;
      gender: string
      constructor(name: string,gender: string){
          this.name = name;
          this.gender = gender
      }

      sayHello(){
      console.log('动物在叫~~~');
      }
  }

class Dog extends Animal{
   age:number;
   
    constructor(name: string,gender: string,age: number){
        //如果在子类中写了构造函数，在子类构造函数中必须对父类的构造函数进行调用
        super(name,gender);//调用父类的构造函数
        this.age = age
    }
    sayHello(){
        //在类的方法中，super就表示当前类的父类
        super.sayHello();
    }
}

const dog = new Dog('旺财','男',3);
console.log(dog);

dog.sayHello();



//练习
class Student{
    name: string;
    age: number;
    constructor(name: string,age: number){
        this.name = name;
        this.age = age;
    }
    sayHi(){
        console.log(this.name + 'sayHi');
        
    }
}

class stu extends Student{
    readonly gender: string;
    constructor(name: string,age: number,gender: string){
        super(name,age)
       this.gender = gender
    }
}

const stu1 = new stu('晓明',17,'男')
console.log(stu1);
// stu1.gender = 'female' //只读无法修改











})()