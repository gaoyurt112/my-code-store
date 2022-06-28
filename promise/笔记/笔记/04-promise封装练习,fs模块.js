/*
封装一个函数mineReadfile读取文件内容
参数：path文件路径
返回：promise对象
*/
function mineReadfile(path) {
    return new Promise((reslove, reject) => {
        //读取文件
        require('fs').readFile(path, (err, data) => {
            //判断
            if (err) {
                reject(err)
            }
            //成功
            reslove(data)
        })
    })
}

//调用函数和then方法输出文件内容
mineReadfile('./resource/content.txt')
    .then(value => {
        console.log(value.toString());
    }, reason => {
        console.log(reason);
    })