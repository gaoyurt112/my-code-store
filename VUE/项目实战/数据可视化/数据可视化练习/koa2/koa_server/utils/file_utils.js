//读取文件的工具方法
const fs = require('fs')
module.exports.getFileJsonData = (filePath) => {
    //根据文件路径读取文件内容
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'UTF-8', (error, dataStr) => {
            if (error) {
                //读取文件失败
                reject(error)
            } else {
                //读取文件成功
                resolve(dataStr)
            }
        })
    })
}