import * as echarts from 'echarts';
let install = function(Vue) {
  Object.defineProperties(Vue.prototype, {
    $chart: {
      get() {
        return {
          //一个简单的示例
          first_bar: function (id) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();
            const optionData = {
              // backgroundColor: '#fff',
              visualMap: {
                  show: false,
                  min: 80,
                  max: 600,
                  inRange: {
                      colorLightness: [0, 1]
                  }
              },
              series : [
                  {
                      name: '访问来源',
                      type: 'pie',
                      radius: '55%',
                      data:[
                          {value:235, name:'视频广告'},
                          {value:274, name:'联盟广告'},
                          {value:310, name:'邮件营销'},
                          {value:335, name:'直接访问'},
                          {value:400, name:'搜索引擎'}
                      ],
                      roseType: 'angle',
                      // label: {
                      //     normal: {
                      //         textStyle: {
                      //             color: 'rgba(255, 255, 255, 0.3)'
                      //         }
                      //     }
                      // },
                      // labelLine: {
                      //     normal: {
                      //         lineStyle: {
                      //             color: 'rgba(255, 255, 255, 0.3)'
                      //         }
                      //     }
                      // },
                      // 高亮样式。
                      emphasis: {
                        itemStyle: {
                            // 高亮时点的颜色。
                            color: 'white'
                        }
                      },
                      itemStyle: {
                          normal: {
                              color: '#c23531',
                              // // 阴影的大小
                              // shadowBlur: 200,
                              // // 阴影颜色
                              // shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      },
                  }
              ]
            };
            this.chart.setOption(optionData);
          },
        }
      }
    }
  })
}
export default {
    install
}