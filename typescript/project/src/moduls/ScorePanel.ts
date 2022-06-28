//定义表示记分牌的类
class ScorePanel{
    score = 0;
    level = 1;
    scoreEle:HTMLElement;
    levelEle:HTMLElement;

    //设置一个变量限制等级
    maxLevel: number;
    upScore: number;
    constructor(maxLevel: number = 10,upScore: number = 10){
         this.scoreEle = document.getElementById('score')!;
         this.levelEle = document.getElementById('level')!;
         this.maxLevel = maxLevel;
         this.upScore = upScore;
    }

    //设置加分的方法
    addScore(){
        this.score++;
        this.scoreEle.innerHTML = this.score + '';
        //判断分数是多少
        if(this.score % this.upScore === 0){
            this.levelUp();
        }
    }
    //提升等级的方法
    levelUp(){
        //等级上限10
        if(this.level < this.maxLevel){
             this.level++;
        this.levelEle.innerHTML = this.level + '';
        }
       
    }

}
//测试
// const scorePanel = new ScorePanel();
// scorePanel.addScore();



export default ScorePanel;