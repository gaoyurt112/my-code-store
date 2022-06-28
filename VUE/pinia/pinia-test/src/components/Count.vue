<template>
<div>
    <!-- 第一种改变状态的方式 -->
    <button @click="handlecount">点击加一</button>
    <!-- 第二种改变状态的方式 -->
    <button @click="handleClickPatch">点击加二</button>
    <!-- 第三种改变状态的方式 -->
    <button @click="handleClickMethod">点击加三</button>
    <!-- 第四种改变状态的方式 -->
    <button @click="store.changeState">点击加4</button>

    <button @click="handlePhone"> 点击隐藏</button>

    <button @click="store.getList"> 点击获取数据</button>


</div>
</template>
       
       
<script lang="ts" setup>
import { mainStore } from '../store/index'
const store = mainStore()
//第一种方式
const handlecount=()=>{
    store.count++;
    store.helloworld = store.helloworld === 'jspang'? 'helloworld' : 'jspang'
}

//第二种方式$patch 传递对象
const handleClickPatch = () =>{
    //针对多状态改变优化
    store.$patch({
        count: store.count + 2,
        helloworld: store.helloworld === 'jspang'? 'helloworld' : 'jspang'

    })
}

//第三种方式$patch 传递函数
const handleClickMethod = () =>{
    store.$patch((state)=>{
        state.count = state.count + 3;
        state.helloworld = state.helloworld === 'jspang'? 'helloworld' : 'jspang'
    })
}

//第四种方式，将业务逻辑直接写在仓库的actions中
// const handleClickActions = ()=>{
//     store.changeState();
// }


const handlePhone = ()=>{
    store.phone = '18851028211'
}

// const getList=()=>{
//     store.getList()
// }
</script>
       
<style>
       
</style>