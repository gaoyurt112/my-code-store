//定义食物类food
class Food{
    //定义一个属性表示食物所对应的元素
    element:HTMLElement;
    
    constructor(){
        //获取页面中的food元素直接将其赋值给element
        this.element = document.getElementById('food')!;
    }
    //定义一个获取食物X坐标的方法
    get X(){
        return this.element.offsetLeft;
    }
    //定义一个获取食物Y坐标的方法
    get Y(){
        return this.element.offsetTop;
    }

    //修改食物位置的方法
    change(){
        //生成一个随机的坐标
        //食物的位置最小是0最大是290
        let top = Math.round(Math.random()*29)*10;
        let left = Math.round(Math.random()*29)*10;
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px'
    }

}

export default Food;