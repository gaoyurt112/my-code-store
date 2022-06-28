<template>
    <!-- 组件结构 -->
    <div>
        <h2>学生名称:{{name}}</h2>
        <h2>学生年龄:{{age}}</h2>
    </div>
</template>

<script>
// 组件交互相关的代码
// 完美写法直接暴露组件配置
 export default {
     name:'student',
    data() {
        return {
            name: '张三',
            age: 18,
        }
    },
}


    //默认暴露写法
    // export default school
</script>

<style>
  /* 组件的样式 */
  .demo{
      background-color: orange;
  }
</style>