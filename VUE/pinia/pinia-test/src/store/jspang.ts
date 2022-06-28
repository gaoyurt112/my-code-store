//store的相互调用
import { defineStore } from "pinia";
export const jspangStore = defineStore('jspang',{
    state:()=>{
        return {
            list:['小红','小王','小明','小李']
        }
    }
})