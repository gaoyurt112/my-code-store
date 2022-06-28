//设置响应头的中间件
//1.第二层中间件
//2.获取mime类型
// application / JSON
//3.设置响应头
// Content-Type:application/json; charset=UTF-8
module.exports = async(ctx, next) => {
    const ContentType = 'application/json; charset=UTF-8'
    ctx.set('Content-Type', ContentType)
        // ctx.response.body = '{"success":true}'
    ctx.set("Access-Control-Allow-Origin", "*")
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE")
    await next()
}