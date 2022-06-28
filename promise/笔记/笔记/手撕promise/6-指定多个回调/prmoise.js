function Promise(excutor) {
    //添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    //声明属性
    this.callbacks = []; //执行多个回调

    //保存实例对象的this的值
    const self = this;

    //resolve函数
    function resolve(data) {
        if (self.PromiseState !== 'pending') return;
        //1.设置对象的状态(PromiseState)
        self.PromiseState = 'fulfilled';
        //2.设置对象结果值(PromiseResult)
        self.PromiseResult = data;
        //调用成功的回调函数
        self.callbacks.forEach(item => { //遍历
            item.onResolved(data);
        });

    };
    //reject函数
    function reject(data) {
        if (self.PromiseState !== 'pending') return;
        //1.设置对象的状态(PromiseState)
        self.PromiseState = 'rejected';
        //2.设置对象结果值(PromiseResult)
        self.PromiseResult = data;
        //执行失败
        self.callbacks.forEach(item => { //遍例
            item.onRejected(data);
        });
    };

    try {
        //同步调用
        excutor(resolve, reject);
    } catch (e) {
        //修改promise对象状态为失败
        reject(e);
    }




};

//添加then方法
Promise.prototype.then = function(onResolved, onRejected) {
    //调用回调函数
    if (this.PromiseState === 'fulfilled') {
        onResolved(this.PromiseResult);
    }
    if (this.PromiseState === 'rejected') {
        onRejected(this.PromiseResult);
    }
    if (this.PromiseState === 'pending') {
        this.callbacks.push({ //放入数组
            onResolved: onResolved,
            onRejected: onRejected
        });

    }
};