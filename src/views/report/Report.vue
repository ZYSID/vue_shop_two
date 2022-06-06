<!-- 订单图表 -->
<template>
  <div>
    <!-- 面包屑导航 -->

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>导航一</el-breadcrumb-item>
      <el-breadcrumb-item>订单图表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>

      <!-- 2为 ECharts 准备一个定义了宽高的 DOM -->
      <div id="main"
           style="width: 600px;height:400px;"></div>

    </el-card>
  </div>
</template>

<script>
// 1导入 echarts
import * as echarts from 'echarts'

export default {
  name: '',
  data () {
    return {
      // 4指定图表的配置项和数据
      option: {
        aria: {
          show: true
        },
        title: {
          text: '某站点用户访问来源',
          x: 'center'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 154, name: '搜索引擎' }
            ],

          }
        ]
      }

    };
  },

  created () {

  },

  // 执行到此时，页面上的元素，已经被渲染完毕
  mounted () {
    // 3基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    // 5展示数据
    myChart.setOption(this.option)

  },

  methods: {


  },
}
</script>

<style scoped>
.el-card {
  margin: 10px 0 0 0;
}
</style>