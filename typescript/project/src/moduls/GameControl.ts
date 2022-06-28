import Snake from "./Snake";
import Food from "./food";
import ScorePanel from "./ScorePanel";


//游戏控制器 控制其它所有类
class GameControl{
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    //创建一个属性储存蛇的移动方向(也就是按键方向)
    direction: string = '';

    //创建一个属性来记录游戏是否结束
    isLive = true;


    constructor(){
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.init();
    }
    //游戏的初始化方法，调用即开始游戏
     init(){
    //绑定键盘按下的事件
    document.addEventListener('keydown',this.keydownHandler.bind(this))
    //调用run方法使蛇移动
    this.run();
    
    }
    //创建一个键盘按下的响应函数
    keydownHandler(event:KeyboardEvent){
        console.log(event.key);
        console.log(this);
        
         //修改direction的值
         this.direction = event.key;
     }

     //创建一个让蛇移动的方法
     run(){
         //根据方向this.direction来使蛇的位置改变
         let X = this.snake.X;
         let Y = this.snake.Y;
         
         //根据方向修改xy的值
         switch(this.direction){
            case "ArrowUp":
                  Y-=10;
                break;
            case "ArrowDown":
                  Y+=10;
                break;
            case "ArrowLeft":
                  X -=10;
                break;
            case "ArrowRight":
                  X +=10;
                break;
         }
        //检查蛇是否迟到食物
          this.checkEat(X,Y)

         //修改蛇的x和y
        try {
         this.snake.X = X;
         this.snake.Y = Y;
        } catch (e: any) {
            alert(e.message + 'Game Over!');
            this.isLive = false
        }

         //开启一个定时调用
         this.isLive && setTimeout(this.run.bind(this), 100-(this.scorePanel.level-1)*30);
     }

     //定义一个方法检测蛇是否吃到了食物
     checkEat(X: number,Y: number){
         if(X === this.food.X && Y === this.food.Y){
              //重置食物位置
              this.food.change();
              //分数加一
              this.scorePanel.addScore();
              //蛇增加一节
              this.snake.addBody();
         }
     }
    
}

export default GameControl;
