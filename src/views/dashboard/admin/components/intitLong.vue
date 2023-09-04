<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
const stuList = []
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
      default: '400px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.initChart()
    // })

    this.request.get("/student/failing").then(
      response => {
        console.log(response)
        for (const student of response.data.data) {
          student.value = student.failCredit

          // 低于5分
          if (student.failCredit < 5)
            student.itemStyle = {color: "#8AC0C0"}
          else if (student.failCredit >= 5 && student.failCredit <= 10)
            student.itemStyle = {color: "#76B6EA"}
          else if ((student.failCredit > 10 && student.failCredit <= 20) || student.majorFails === 2) {
            student.itemStyle = {color: "#F7B733"}
          } else if ((student.failCredit > 20) || student.majorFails === 3) {
            student.itemStyle = {color: "#FF6F61"}
          }
          stuList.push(student)
        }
        this.initChart(stuList)
      }
    ).catch(error=>{
      console.log(error)
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
      const x = []
      for (const student of stuList) {
        x.push(student.name)
      }
      this.chart.setOption(
        {
          title: {
            text: '学业学分丢失情况图',
            subtext: '2023春季',
            textStyle: {
              fontWeight: 'normal',              //标题颜色
              color: "#227844"
            },
          },
          tooltip: {
            trigger: 'axis',
            backgroundColor: '#FFFFFF',
            borderColor: '#EEF1F7',
            borderWidth: 1,
            textStyle: {
              width: 160,
              height: 250,
              lineHeight: 24,
              color: '#666666',
              fontSize: '14',
              fontFamily: 'SourceHanSansCN-Normal'
            },
            formatter: params => {
              // 获取xAxis data中的数据
              let dataStr = `<div><p style="font-weight:bold;margin:0 8px 15px;">${params[0].name}</p></div>`
              params.forEach(item => {
                dataStr += `<div>
          <div style="margin: 0 8px;">
            <span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:${item.color};"></span>
            <span>丢失学分</span>
            <span style="float:right;color:#000000;margin-left:20px;">${item.data.failCredit}分</span><br/>
            <span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:${item.color};"></span>
            <span>未通过课程</span>
            <span style="float:right;color:#000000;margin-left:20px;">${item.data.count}门</span><br/>
            <span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:${item.color};"></span>
            <span>班级</span>
            <span style="float:right;color:rgba(0,0,0,0.76);margin-left:20px;">${item.data.classes}</span><br/>
            <span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:${item.color};"></span>
            <span>未通过主修</span>
            <span style="float:right;color:rgba(0,0,0,0.76);margin-left:20px;">${item.data.majorFails}</span>
          </div>
        </div>`
              })
              return dataStr
            }
          },
          legend: {
            data: ['学生学业信息']
          },
          toolbox: {
            show: true,

            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              // prettier-ignore
              data: x,
              z: 10,
              axisLabel: { //设置x轴的字
                show: true,
                interval: 0,//使x轴横坐标全部显示
                textStyle: {//x轴字体样式
                  color: "rgba(42,41,41,0.64)",
                  margin: 15
                }
              }
            },

          ],
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '学生学分信息',
              type: 'bar',
              // data: [{a:"2",value:1}],
              data: data,
              markPoint: {
                // data: [
                //   { type: 'max', name: 'Max' },
                //   { type: 'min', name: 'Min' }
                // ]
              },
              // markLine: {
              //   data: [{ type: 'average', name: 'Avg' }]
              // }
            },
          ]
        }
      )
      const zoomSize = 6;
      this.chart.on('click', function (params) {
        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        this.chart.dispatchAction({
          type: 'dataZoom',
          startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue:
            dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        });
      });
    },
  }
}
</script>
