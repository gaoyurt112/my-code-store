(function(){
   class Person{

      /**
       * ts可以在属性前添加属性的修饰符
       * public修饰的属性可以在任意的位置访问和修改（默认值）
       * 
       * private私有属性，私有属性只能在类内部进行修改和访问
       *    -通过在类内部添加方法使得私有属性可以被外部访问
       * 
       * protected 受保护的属性，只能在当前类和当前子类中访问修改
       */
       private _name: string;
       private _age: number;

       constructor(name: string,age: number){
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
get name(){
    return this._name;
}
set name(value: string){
    this._name = value;
}

 get age(){
    return this._age;
}
set age(value: number){
    if(value>=0){
     this._age = value;
    }
    
}

   }

     const per = new Person('tom',18) ;
/*
现在属性是在对象中设置的，属性可以任意的被修改
属性可以任意被修改将会导致对象中的数据变得非常不安全
*/
per.name = '猪八戒';
per.age = -38;
    //  per.setName('猪八戒')
    //  per.setAge(-33)
     console.log(per);
     

//简化写法
class C{
    constructor(public name:string,public age: number){

    }
}

const c = new C('xxx',111)
console.log(c);


})();