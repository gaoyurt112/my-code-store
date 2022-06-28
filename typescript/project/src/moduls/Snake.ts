class Snake{
    head: HTMLElement;
    bodies: HTMLCollection;
    element:  HTMLElement;
    constructor(){
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div') as HTMLElement;
    this.bodies = this.element.getElementsByTagName('div')
    }

    //获取蛇的坐标（蛇头）
    get X(){
        return this.head.offsetLeft;
    }

    get Y(){
        return this.head.offsetTop;
    }

    //设置蛇头的坐标
    set X(value:number){
       //如果新值与旧值相同，直接返回不再修改
       if(this.X === value){
           return;
       }
       //x值的合法范围0-290之间
       if(value < 0 || value > 290 ){
           throw new Error('蛇撞墙了!');
       }

       //蛇在向左移动时不可以向右掉头
       if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
           if(value > this.X){
               value = this.X - 10;
       }else{
               value = this.X + 10;
    }
}
 
       //移动身体
        this.moveBody();
        this.head.style.left = value + 'px';
        //检查有没有撞到自己
        this.checkHeadBody();
    }

    set Y(value:number){
        if(this.Y === value){
            return;
        }

        //y值的合法范围0-290之间
       if(value < 0 || value > 290 ){
        throw new Error('蛇撞墙了!');
        }

//蛇在向下移动时不可以向上掉头
if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
    if(value > this.Y){
        value = this.Y - 10;
}else{
        value = this.Y + 10;
}
}


        //移动身体
        this.moveBody()

        this.head.style.top = value + 'px';
        //检查有没有撞到自己
        this.checkHeadBody();
    }

    //添加蛇身体
    addBody(){
        //向element中添加一个方法
        this.element.insertAdjacentHTML("beforeend","<div></div>")
    }

    //添加一个蛇身体移动的方法
    moveBody(){
        /*
        将后边的身体设置为前边身体的位置

        */
      //遍历所有的身体
      for(let i = this.bodies.length-1;i>0;i--){
          //获取前边身体的位置
          let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
          let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
          (this.bodies[i] as HTMLElement).style.left = X + 'px';
          (this.bodies[i] as HTMLElement).style.top = Y + 'px';
      }

    }


    //检查蛇头是否和身体重叠
    checkHeadBody(){
        for(let i = 1; i < this.bodies.length; i++){
           let bd = this.bodies[i] as HTMLElement;
           if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
               //说明蛇头撞到了自己的身体，游戏结束
               throw new Error('撞到自己了!')
           }
        }
    }
}
export default Snake;