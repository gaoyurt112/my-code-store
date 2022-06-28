//使用字面量进行类型声明
let a: 10;
a = 10;
// a = 11 报错 a的值只能为10

let b: "male" | "false";
b = "male";
b = "false";
// b = "female" 报错 b的值只能赋值为male和false

//可以使用 | 来连接多个类型(联合类型)
let c: boolean | string | number;
c = true;
c = 'helloTS';
c = 10;


//any表示的是任意类型，一个变量如果设置了类型为any后，相当于对该变量关闭了类型检测
//在TS的使用中不建议使用any类型
let d: any; //显式的any
//let d; //隐式的any 声明变量不指定类型，则TS解析器会自动判断变量的类型为any
d= 10;
d = 'helloTS';
d = true;

//unknown类型，表示未知类型的值
let e: unknown;
e = 10;
e = "helloTS";
e = true;

let s:string;
//d的类型是any，它可以赋值给任意类型的变量
s = d;

e = 'hello'
//unknown类型实际上就是一个类型安全的any
//unknown类型的变量，不能直接赋值给其他变量
// s = e; //unknown 类型
//解决方法
if(typeof e === "string"){
    s = e;
}

//类型断言，可以用来告诉解析器变量的实际类型
/*
语法：
   变量 as 类型
   <类型>变量
*/
s = e as string;
s = <string>e;

//void类型用来表示空，以函数为例，就表示没有返回值的函数
function fn(): void{

}

//never类型表示永远不会返回结果 报错不会返回结果
function fn2(): never{
  throw new Error('报错了!')
}
