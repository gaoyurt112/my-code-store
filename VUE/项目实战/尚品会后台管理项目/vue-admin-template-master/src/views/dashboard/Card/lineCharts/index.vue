<template>
<div class="charts" ref="charts">
       
</div>
</template>
       
       
<script>
import * as echarts from "echarts"
export default{
name:'lineCharts',
mounted(){
    //初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts)
    //配置数据
    lineCharts.setOption({
        xAxis:{
          show:false,
          type:'category'
        },
        yAxis:{
          show:false
        },
        series:[
            {
                type:'line',
                data:[10,98,33,88,16,46,66],
                smooth:true,
                itemStyle:{
                    opacity:0
                },
                lineStyle:{
                    color:'purple'
                },
                areaStyle:{
                    color:{
                        type:"linear",
                        x:0,
                        y:0,
                        x2:0,
                        y2:1,
                        colorStops:[
                            {
                                offset:0,
                                color:'purple'
                            },
                            {
                                offset:1,
                                color:'#fff'
                            }
                        ],
                        global:false
                    }
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
       .charts{
        height: 100%;
        width: 100%;
       }
</style>