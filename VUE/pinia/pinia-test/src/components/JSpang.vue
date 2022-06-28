<template>
<div>{{store.helloworld}}</div>
<div>{{store.count}}</div>
<div>{{store.phoneHidden}}</div>
<div>{{store2.list}}</div>
<hr>
<div>{{helloworld}}</div>
<div>{{count}}</div>
<div>{{phoneHidden}}</div>
</template>
       
       
<script lang="ts" setup>
//引入仓库
import {mainStore} from '../store/index';

//将解构的数据变为响应式
import { storeToRefs } from 'pinia';
import { jspangStore } from '../store/jspang';
//实例化仓库
const store = mainStore();
const store2 = jspangStore()
//解构仓库中的数据
const {helloworld , count ,phoneHidden} = storeToRefs(store);
</script>
       
<style>
       
</style>