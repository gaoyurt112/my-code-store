//object类型表示一个js对象
let a: object;
a = {};
a = function (){};

//{}用来指定对象中可以包含哪些属性
//在属性名后面加问号，表示属性可选
let b: {name: string,age?:number};
b = {name:'helloTS'}


//[propname:string]:any 表示任意类型的属性
//要求name属性为string类型，其他属性为任意类型
let c:{name:string,[propname:string]:any}
c = {name:'helloTS',age:10,gender:'男'}


/*设置函数结构的类型声明：
    语法：(形参:类型,形参:类型...) => 返回值
*/
let d: (a:number,b:number)=> number;
d = function(n1:number,n2:number):number{
    return 10
    // return 'hello' //不能将string类型赋值给number
}




//数组类型
/*
语法：
   类型[];
   Array<类型>
*/
//string[]表示字符串数组
let e: string[];
e = ['a','b','c'];

//数值数组
let f: number[];

let g: Array<number>;
g = [1,2,3]


// 元组，元组就是固定长度的数组
let h: [string,string,number];
h = ['a','b',123]


//enum枚举

enum Gender{
    Male = 0,
    Female = 1
}

let i: {name: string,gender: Gender};
i = {
    name:'hello',
    gender: Gender.Male//'male'
}

console.log(i.gender === Gender.Male);


//&表示同时，且
// j需要同时满足name,age属性，否则报错
let j: {name:string} & {age:number}
j = {name:'孙悟空',age:18}


//类型的别名
type myType = 1 | 2 | 3 | 4 | 5;
let k: myType;
let l: myType;
let m: myType;

type mytype2 = string | number | boolean;
let x: mytype2;
let y: mytype2;

