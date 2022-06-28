<template>
<div class="charts" ref="charts">
       
</div>
</template>
       
       
<script>
import * as echarts from "echarts"
export default{
name:'barCharts',
mounted(){
    let barCharts = echarts.init(this.$refs.charts)
     barCharts.setOption({
        xAxis:{
           show:false,
           type:'category' 
        },
        yAxis:{
           show:false
        },
        series:[
            {
              type:'bar',
              data:[10,20,30,13,45,23,76,54,66,33,42,21,54]
            }
        ],
        tooltip:{},
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