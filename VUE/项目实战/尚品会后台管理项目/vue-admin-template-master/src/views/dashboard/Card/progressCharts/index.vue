<template>
<div class="charts" ref="charts">
       
</div>
</template>
       
       
<script>
import * as echarts from "echarts"
export default{
name:'progressChatrs',
mounted(){
    let progressCharts = echarts.init(this.$refs.charts)
    progressCharts.setOption({
        xAxis:{
            show:false,
            max:100,
            min:0
        },
        yAxis:{
            show:false,
          type:'category'
        },
        series:[
            { 
              type:'bar',
              data:[78],
              barWidth:15,
              color:'yellowgreen',
              showBackground:true,
              backgroundStyle:{
                color:'#eee'
              },
              label:{
                show:true,
                formatter:'|',
                position:'right',
                color:'#ccc'
              }
              
            }
        ],
         grid:{
           left:0,
           top:0,
           right:0,
           bottom:0
        }
    })
}
}
</script>
       
<style>
       
</style>