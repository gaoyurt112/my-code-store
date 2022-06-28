/*util.promisify方法 */
//引入util模块
const util = require('util');
//引入fs模块
const fs = require('fs');
//返回一个新函数
let mineReadFlie = util.promisify(fs.readFile);

mineReadFlie('./resource/content.txt').then(value => {
    console.log(value.toString());
});


//不需要手动封装fs回调函数