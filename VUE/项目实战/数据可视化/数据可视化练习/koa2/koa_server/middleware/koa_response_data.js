//处理业务逻辑的中间件，读取某个json文件数据
/*
1.第三层中间件
2.读取文件内容 http://127.0.0.1:8888/api/seller
获取请求的路径，拼接文件路径
获取该路径对应的文件内容
3.设置响应体
ctx.respinse.body
*/
const path = require('path')
const fileUtils = require('../utils/file_utils')
module.exports = async(ctx, next) => {
    const url = ctx.request.url //api/seller    ../data/seller.json
    let filePath = url.replace('/api', '') //  /seller
    filePath = '../data' + filePath + '.json' //../data/seller.json
    filePath = path.join(__dirname, filePath)
    try {
        const ret = await fileUtils.getFileJsonData(filePath)
        ctx.response.body = ret
    } catch (error) {
        const errorMsg = {
            message: '读取文件失败,文件资源不存在',
            status: 404
        }
        ctx.response.body = JSON.stringify(errorMsg)
    }

    console.log(filePath);
    await next()
}