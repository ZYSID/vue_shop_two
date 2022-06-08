<!-- 订单列表 -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>导航一</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card>
      <!-- 头部搜索行 -->
      <el-row>
        <el-col :span="10">
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table :data="orderlist[0].goods" border>
        <el-table-column type="index" label="#" align="center"></el-table-column>

        <el-table-column prop="order_number" label="订单编号"></el-table-column>

        <el-table-column prop="order_price" label="订单价格" width="85"></el-table-column>

        <el-table-column prop="pay_staus" label="是否付款" width="90" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.pay_staus === '1'">已付款</el-tag>
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="is_send" label="是否发货" width="70"></el-table-column>

        <el-table-column prop="create_time" label="下单时间">
          <template slot-scope="scope">
            {{ scope.row.create_time | dateFormat }}
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作" width="150">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="btnEdit"></el-button>
            <el-button type="success" icon="el-icon-share" size="mini" @click="showProgressBox"></el-button>
          </template>
        </el-table-column>

      </el-table>

      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryInft.pagenum" :page-sizes="[1, 2, 3, 4]" :page-size="queryInft.pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

    <!-- 编辑按钮弹出框 -->
    <el-dialog title="修改地址" :visible.sync="addressVisible" width="50%" @close="addressClosed">

      <el-form ref="addressFormRef" label-width="80px" :model="addressForm">
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader :options="cityData" v-model="addressForm.address1" :props="{ expandTrigger: 'hover' }">
          </el-cascader>
        </el-form-item>

        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addressVisible = false">取 消</el-button>
        <el-button type="primary" @click="addressVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 展示物流进度对话框 -->
    <el-dialog title="物流进度" :visible.sync="progressVisible" width="30%">
      <!-- 物流时间线-->
      <el-timeline>
        <el-timeline-item v-for="(activity, index) in progressInfo" :key="index" :timestamp="activity.time">
          {{ activity.context }}
        </el-timeline-item>
      </el-timeline>

      <span slot="footer" class="dialog-footer">
        <el-button @click="progressVisible = false">取 消</el-button>
        <el-button type="primary" @click="progressVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import citydata from '@/myCharts/citydata.js'

export default {
  name: '',
  data () {
    return {
      // 订单页参数
      queryInft: {
        query: '',
        pagenum: 1,
        pagesize: 1
      },
      total: 0,
      //订单列表
      orderlist: [],

      // 控制按钮显示隐藏
      addressVisible: false,

      // 控制物流进度对话框
      progressVisible: false,

      // 修改地址的表单信息
      addressForm: {
        address1: [],
        address2: ''
      },

      // 物流进度的数据信息
      progressInfo: [],


      cityData: citydata
    };
  },
  created () {
    this.getOrderList()
  },
  methods: {
    getOrderList () {
      this.orderlist.push({
        total: 100, pagenum: 1, goods: [
          {
            order_id: 1,
            user_id: 111,
            order_number: 'it1234567890',
            order_price: 333,
            order_pay: '1',
            is_send: '是',
            trade_no: '',
            order_fapiao_title: '个人',
            order_fapiao_company: '',
            order_fapiao_content: '医疗用品',
            consignee_addr: '北京三里屯旁边的狗窝',
            pay_staus: '1',
            create_time: 12030303938,
            update_time: 21414543459,
          },
          {
            order_id: 2,
            user_id: 111,
            order_number: 'it1234567890',
            order_price: 333,
            order_pay: '1',
            is_send: '是',
            trade_no: '',
            order_fapiao_title: '个人',
            order_fapiao_company: '',
            order_fapiao_content: '医疗用品',
            consignee_addr: '北京三里屯旁边的狗窝',
            pay_staus: '0',
            create_time: 12030303938,
            update_time: 21414543459,
          },
          {
            order_id: 3,
            user_id: 111,
            order_number: 'it1234567890',
            order_price: 333,
            order_pay: '1',
            is_send: '是',
            trade_no: '',
            order_fapiao_title: '个人',
            order_fapiao_company: '',
            order_fapiao_content: '医疗用品',
            consignee_addr: '北京三里屯旁边的狗窝',
            pay_staus: '0',
            create_time: 12030303938,
            update_time: 21414543459,
          },
          {
            order_id: 4,
            user_id: 111,
            order_number: 'it1234567890',
            order_price: 333,
            order_pay: '1',
            is_send: '是',
            trade_no: '',
            order_fapiao_title: '个人',
            order_fapiao_company: '',
            order_fapiao_content: '医疗用品',
            consignee_addr: '北京三里屯旁边的狗窝',
            pay_staus: '0',
            create_time: 12030303938,
            update_time: 21414543459,
          },
          {
            order_id: 5,
            user_id: 111,
            order_number: 'it1234567890',
            order_price: 333,
            order_pay: '1',
            is_send: '是',
            trade_no: '',
            order_fapiao_title: '个人',
            order_fapiao_company: '',
            order_fapiao_content: '医疗用品',
            consignee_addr: '北京三里屯旁边的狗窝',
            pay_staus: '1',
            create_time: 12030303938,
            update_time: 21414543459,
          }


        ]
      })
      this.total = this.orderlist[0].goods.length
      console.log(this.orderlist);
      console.log(this.total);

      // 获取快递表单
      this.progressInfo.push(
        {
          time: '2018-05-10 09:40:43',
          ftime: '2018-05-10 09:40:43',
          context: '已签收,感谢使用顺丰',
          location: ''
        },
        {
          time: '2019-05-10 09:40:43',
          ftime: '2018-05-10 09:40:43',
          context: '已签收,感谢使用顺丰',
          location: ''
        },
        {
          time: '2020-05-10 09:40:43',
          ftime: '2018-05-10 09:40:43',
          context: '已签收,感谢使用顺丰',
          location: ''
        },
        {
          time: '2022-05-10 09:40:43',
          ftime: '2018-05-10 09:40:43',
          context: '已签收,感谢使用顺丰',
          location: ''
        }
      )
    },
    // 分页
    handleSizeChange (newSize) {
      this.queryInft.pagesize = newSize
    },
    handleCurrentChange (newPage) {
      this.queryInft.pagenum = newPage
    },

    // 编辑按钮
    btnEdit () {
      this.addressVisible = true
    },

    // 编辑按钮关闭事件
    addressClosed () {
      this.$refs.addressFormRef.resetFields()
      console.log('ddd');
    },

    // 删除按钮
    showProgressBox () {

      this.progressVisible = true
      console.log(this.progressInfo);
    },
  },
}
</script>

<style scoped>
.el-cascader {
  width: 100%;
}
</style>