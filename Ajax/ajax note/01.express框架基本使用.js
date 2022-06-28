//引入express
const express = require('express')
    //创建服务器对象
const app = express()

app.get('/', (req, res) => {
    res.send('hello,ajax')
})




app.listen(8000, () => {
    console.log('qpp sever running at http://127.0.0.1');
})