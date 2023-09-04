<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 3000
let stuList = []
let stuCurse = []
let classesScore = []
let curseName =['算法设计实验',
  "算法分析与设计",
  "数据库原理",
  "Java程序设计",
  // "Java程序实验",
  "数据库课程设计",
  // "毛泽东思想和中国特色社会主义理论体系概论",
  // "毛中特概论",
  // "线性代数",
  "计算机程序设计",
// "高等数学",
// "大学物理",
// "文献检索",
  "计算机组成原理"]
let classesName =["2104计算机",
  "2103计算机",
  "2102计算机",
"2101计算机",
"2107计算机（新）",
]

function  arrGroup(arr, fn) {
  const obj = {};
  arr.forEach(item => {
    const key = JSON.stringify(fn(item));
    obj[key] = obj[key] || [];
    obj[key].push(item)
  });
  return Object.keys(obj).map(k => {
    return obj[k];
  })
}
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
  method:{

  }
  ,
  mounted() {
    this.request.get("/student/class/score").then(
      response => {
        classesScore = []
        const newArr = arrGroup(response.data.data, (item) => item.name)

        for (const element of newArr) {
          let tmp = {}
          tmp.type = 'line'
          tmp.stack = 'Total'
          tmp.name = element[0].name.slice(0,4)
          let data = []
          for (let key of element) {
            data.push(key["value"])
          }
          tmp.data = data
          classesScore.push(tmp)
        }
        console.log(classesScore)
        this.initChart(classesScore)
        // this.createLine(classesScore)
      }
    )
    this.$nextTick(() => {
      // this.initChart()
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
    initChart(data) {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: {
          text: '专业学科班级平均分',
          textStyle: {
            fontWeight: "normal",              //标题颜色
            color: "#29884f"
          },
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          // orient: 'vertical',
          // x:'center',      //可设定图例在左、右、居中
          // y:'center',     //可设定图例在上、下、居中
          padding:[30,50,0,0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          data: ['2101', '2102', '2103', '2104', '2105', '2106', '2107']
        },
        grid: {
          top:'25%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: curseName,

        },
        yAxis: {
          name:'分数',
          min: (value) => {
            return value.min
          },
          max: (value) => {
            return value.max
          }
        },
        series: data
      })
    }
  }
}
</script>
