//1.定义状态容器
//2.修改容器中的state
//3.仓库中过的action的使用

import { defineStore } from "pinia";
import { jspangStore} from './jspang'
//定义一个仓库
export const mainStore = defineStore('main',{
//定义状态
 state:()=>{
    return {
       helloworld:'Hello World',
       count:1,
       phone:'17381583309'
    }
 },
 //监听状态
 getters:{
   //  phoneHidden(state){
   //     console.log('Getter被调用');
       
   //     return state.phone.toString().replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')
   //  }
   
   //不使用state ,手动指定返回值类型
    phoneHidden(): String{
       console.log('Getter被调用');
       
       return this.phone.toString().replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')
    }
 },
 actions:{
    //第四种方式
    changeState(){
       this.count = this.count + 4,
       this.helloworld = this.helloworld === 'jspang'? 'helloworld' : 'jspang'
    },
    getList(){
       jspangStore().list
       console.log(jspangStore().list);
       
    }
 }

})