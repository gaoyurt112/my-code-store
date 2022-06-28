function counter(){
    let n = 0
    return{
        //i++先运算再自家，++i先自家再运算
        count:function(){return n++},
        reset:function(){n = 0}
    }
}

let c = counter() , d = counter()

console.log(c.count());
console.log(c.count());
console.log(c.count());
console.log(c.count());