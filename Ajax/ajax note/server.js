//引入express
const express = require('express')
const { handle } = require('express/lib/application')
    //创建服务器对象
const app = express()

app.get('/server', (req, res) => {
    //设置响应头  设置允许跨域
    res.setHeader('Access-Control-Allow-Origin', '*') //跨域
        //设置响应体
    res.send('hello,ajax')
})

app.post('/server', (req, res) => {
        //设置响应头  设置允许跨域
        res.setHeader('Access-Control-Allow-Origin', '*')
            //设置响应体
        res.send('hello,ajax post')
    })
    //json
app.all('/json-server', (req, res) => {
    //设置响应头  设置允许跨域
    res.setHeader('Access-Control-Allow-Origin', '*')
        //响应头
    res.setHeader('Access-Control-Allow-Headers', '*')
        //响应一个数据
    const data = {
            name: 'zs'
        }
        //将对象进行字符串转换
    let str = JSON.stringify(data)

    //设置响应体
    res.send(str)
})

app.get('/ie', (req, res) => {
    //设置响应头  设置允许跨域
    res.setHeader('Access-Control-Allow-Origin', '*')
        //设置响应体
    res.send('hello,ie-5')
})

//延时响应
app.get('/delay', (req, res) => {
    //设置响应头  设置允许跨域
    res.setHeader('Access-Control-Allow-Origin', '*')
    setTimeout(() => {
        //设置响应体
        res.send('延时响应')
    }, 3000);


})

//axios服务
app.all('/axios-server', (req, res) => {
    //设置响应头  设置允许跨域
    res.setHeader('Access-Control-Allow-Origin', '*')
        //响应头
    res.setHeader('Access-Control-Allow-Headers', '*')
        //响应一个数据
    const data = {
            name: 'zs'
        }
        //将对象进行字符串转换
    res.send(JSON.stringify(data))

})

//fetch服务
app.all('/fetch-server', (req, res) => {
    //设置响应头  设置允许跨域
    res.setHeader('Access-Control-Allow-Origin', '*')
        //响应头
    res.setHeader('Access-Control-Allow-Headers', '*')
        //响应一个数据
    const data = {
            name: 'zs'
        }
        //将对象进行字符串转换
    res.send(JSON.stringify(data))

})

app.all('/jsonp-server', (req, res) => {

    // res.send('console.log("hello jsonp-server")')
    const data = {
        name: '尚硅谷atguigu'
    };
    let str = JSON.stringify(data);
    res.end(`handle(${str})`);
})

//用户名检测是否存在
app.all('/check-username', (req, res) => {

    // res.send('console.log("hello jsonp-server")')
    const data = {
        exist: 1,
        msg: '用户名已存在'
    };
    let str = JSON.stringify(data);
    res.end(`handle(${str})`);
})


app.listen(8000, () => {
    console.log('qpp sever running at http://127.0.0.1');
})