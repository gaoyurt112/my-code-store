<template>
  <div>
    <el-card class="box-card" style="margin: 20px 10px 0 10px">
      <div slot="header" class="clearfix">
        <!-- v-model="activeName" @tab-click="handleClick" -->
        <el-tabs class="tab" v-model="activeName">
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="访问量"></el-tab-pane>
        </el-tabs>
        <div class="right">
          <span @click="setDay">本日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <el-date-picker
          v-model="date"
            class="dateW"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="18">
          <div class="charts" ref="charts"></div>
          </el-col>
          <el-col :span="6">
            <h3>门店{{title}}排名</h3>
            <ul>
                <li>
                    <span class="rindex">1</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                </li>
               <li>
                    <span class="rindex">2</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                </li>
                <li>
                    <span class="rindex">3</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                </li>
                <li>
                    <span class="rindexn">4</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                </li>
                <li>
                    <span class="rindexn">5</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                </li>
                <li>
                    <span class="rindexn">6</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                </li>
                <li>
                    <span class="rindexn">7</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts"
import dayjs from 'dayjs'
export default {
  name: "Sale",
  data() {
    return {
      activeName: "sale",
      mycharts:null,
      date:[]
    }
  },
  mounted(){
    this.myCharts = echarts.init(this.$refs.charts);
    this.myCharts.setOption({
        title:{
            text:this.title + '趋势'
        },
         tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月'],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
    }
  ],
  series: [
    {
      name: 'Direct',
      type: 'bar',
      barWidth: '30%',
      data: [10, 52, 200, 334, 390, 330, 220,110,98,167,123,44]
    }
  ]
    })
  },
  computed:{
    title(){
      return this.activeName == 'sale'? '销售额':'访问量'
  }
  },
  watch:{
    title(){
      this.myCharts.setOption({
        title:{
          text:this.title + '趋势'
        }
      })
    }
  },
  methods:{
    setDay(){
       const day = dayjs().format('YYYY-MM-DD')
       this.date = [day,day]
    },
    setWeek(){
       const start = dayjs().day(1).format('YYYY-MM-DD')
       const end = dayjs().day(7).format('YYYY-MM-DD')
       this.date = [start,end]
    },
    setMonth(){
        const start = dayjs().startOf('month').format('YYYY-MM-DD')
        const end = dayjs().endOf('month').format('YYYY-MM-DD')
       this.date = [start,end]
    },
    setYear(){
const start = dayjs().startOf('year').format('YYYY-MM-DD')
        const end = dayjs().endOf('year').format('YYYY-MM-DD')
       this.date = [start,end]
    },

  }
};
</script>

<style scoped>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.el-tabs__item {
  font-size: 20px;
  font-weight: 800;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 10px;
}
.right span {
  margin: 0 10px;
}
.dateW {
  width: 250px;
  margin: 0 20px;
}
.charts{
    height: 300px;
    width: 100%;
}
ul{
    list-style: none;
    height: 300px;
    width: 100%;
    padding: 0;
}

ul li{
    height: 8%;
    margin: 10px 0;
}
.rindex{
    float: left;
    width: 20px;
    height: 20px;
    background: black;
    border-radius: 50%;
    color: white;
    text-align: center;
    line-height: 20px;
    margin-right: 20px;
}
.rindexn{
  float: left;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    margin-right: 20px;
}
.rvalue{
  float: right;
  }
</style>
