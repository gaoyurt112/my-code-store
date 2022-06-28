// //声明一个变量a，指定a的类型为number类型
// let a: number;
// //a的类型为number类型，在后面的代码中a的值只能是数字
// a=10;
// a=33;
// // a='hello';  （报错）此行代码报错，不可以是字符串


// //将b赋值为字符串
// let b: string;
// b = 'hellots';
// // b=10; (报错)


// //将c赋值为布尔值
// let c: boolean = true;
// c = false
// // c = 10 (报错) c的类型应该为布尔值


// //如果变量的声明与赋值是同时进行的，TS可以自动对变量进行类型的检测
// let d = false; //自动对类型进行检测
// d = true
// // d = 10 (报错) d应为布尔值类型



//js中的函数是不考虑参数的类型和个数的
// function sum(a,b){
//     return a + b;
// }

// console.log(sum(123,456)); //结果:579
// console.log(sum(123,'456'));//结果:123456

//使用TS限制参数类型
// function sum(a: number,b: number){
//     return a + b;
// }
// sum(123,456)
//  sum(123,'456') //报错，参数b的类型应该为number类型
// sum(123,456,789) //报错 参数个数不一致也会报错

// //限制函数的返回值为number类型
// function sum(a: number,b: number): number{
//     return a + b;
// }
// let result = sum(123,456) //result类型为number


