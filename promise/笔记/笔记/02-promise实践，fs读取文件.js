const fs = require('fs')

//回调函数形式
// fs.readFile('./resource/content.txt', (err, datastr) => {
//     if (err) {
//         throw err
//     }
//     console.log(datastr.toString());
// })

//promise形式
let p = new Promise((resolve, reject) => {
    fs.readFile('./resource/content.txt', (err, data) => {
        if (err) {
            reject(err)
        }
        resolve(data)
    })
})

console.log(p);
//调用then
p.then((value) => {
    console.log(value.toString());
}, (reason) => {
    console.log(reason);
})