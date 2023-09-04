<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: {
          text: '21级计算机各班未获取学分人数',
          textStyle: {
            fontWeight: "normal",              //标题颜色
            color: "#29884f"
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 60,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
      //   2106计算机（新）
      //   2101计算机
      // 2103计算机
      // 2104计算机
      // 2102计算机
      // 2107计算机（新）
      // 2105计算机
        xAxis: [{
          name:"班级",
          type: 'category',
          data: ['2101', '2102', '2103', '2104', '2105', '2106', '2107'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          name:'人数',
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '人数',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [4, 2, 3, 2, 4, 5, 13],
          animationDuration
        }
        // , {
        //   name: 'pageB',
        //   type: 'bar',
        //   stack: 'vistors',
        //   barWidth: '60%',
        //   data: [80, 52, 200, 334, 390, 330, 220],
        //   animationDuration
        // }, {
        //   name: 'pageC',
        //   type: 'bar',
        //   stack: 'vistors',
        //   barWidth: '60%',
        //   data: [30, 52, 200, 334, 390, 330, 220],
        //   animationDuration
        // }
        ]
      })
    }
  }
}
</script>
