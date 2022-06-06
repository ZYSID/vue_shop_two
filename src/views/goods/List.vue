<!--商品列表 -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>导航一</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card>

      <!-- 搜索添加行 -->
      <el-row :gutter="15">
        <el-col :span="8">
          <el-input placeholder="请输入内容"
                    class="input-with-select"
                    v-model="queryInfo.query"
                    clearable>
            <el-button slot="append"
                       icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"
                     @click="goAddpage">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table :data="goodslist[0].goods"
                border
                style="width: 100%">
        <el-table-column type="index"
                         align="center"
                         label="#"></el-table-column>
        <el-table-column prop="goods_name"
                         label="商品名称"></el-table-column>
        <el-table-column prop="goods_price"
                         label="商品价格(元)"
                         width="100"></el-table-column>
        <el-table-column prop="goods_weight"
                         label="商品重量(g)"
                         width="100"></el-table-column>

        <el-table-column prop="add_time"
                         width="170"
                         label="创建时间">
          <template slot-scope="scope">
            {{scope.row.add_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="200">
          <template slot-scope="scope">
            <el-button type="primary"
                       icon="el-icon-search"
                       size="mini">编辑</el-button>
            <el-button type="success"
                       icon="el-icon-search"
                       size="mini"
                       @click="removeById(scope.row.goods_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="queryInfo.pagenum"
                     :page-sizes="[1, 2, 3, 4]"
                     :page-size="queryInfo.pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
                     background>
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      // 商品列表数组中
      goodslist: [],
      // 查询对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 3
      },
      // 总数
      total: 0
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      this.goodslist.push({
        total: 1000, pagenum: 1, goods: [
          {
            goods_id: 144,
            goods_name: '湿巾(迷你随身包湿巾)',
            goods_price: 1,
            goods_number: 1,
            goods_weight: 10,
            goods_state: null,
            add_time: 3000000000,
            upd_time: 1512954923,
            hot_number: 0,
            is_promote: false,
          },
          {
            goods_id: 145,
            goods_name: '广泽牛奶',
            goods_price: 2,
            goods_number: 1,
            goods_weight: 150,
            goods_state: null,
            add_time: 3000000000,
            upd_time: 1512954923,
            hot_number: 0,
            is_promote: false,
          },
          {
            goods_id: 146,
            goods_name: '布洛芬颗粒(迷你)',
            goods_price: 10,
            goods_number: 1,
            goods_weight: 140,
            goods_state: null,
            add_time: 3000000000,
            upd_time: 1512954923,
            hot_number: 0,
            is_promote: false,
          },
          {
            goods_id: 147,
            goods_name: '联想小新AIR(14)',
            goods_price: 14999,
            goods_number: 1,
            goods_weight: 3000,
            goods_state: null,
            add_time: 3000000000,
            upd_time: 1512954923,
            hot_number: 0,
            is_promote: false,
          },
          {
            goods_id: 148,
            goods_name: '成人纸尿裤',
            goods_price: 1.4,
            goods_number: 1,
            goods_weight: 10000,
            goods_state: null,
            add_time: 3000000000,
            upd_time: 1512954923,
            hot_number: 0,
            is_promote: false,
          },
          {
            goods_id: 149,
            goods_name: '美年达(橘子)',
            goods_price: 3,
            goods_number: 1,
            goods_weight: 330,
            goods_state: null,
            add_time: 3000000000,
            upd_time: 1512954923,
            hot_number: 0,
            is_promote: false,
          }
        ]
      })
      this.total = this.goodslist[0].goods.length
      console.log(this.goodslist)
    },
    // 分页
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
    },
    // 删除
    async removeById (id) {
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      this.goodslist[0].goods.forEach((item, num) => {
        if (id === item.goods_id) {
          this.goodslist[0].goods.splice(num, 1)
          this.total = this.goodslist[0].goods.length
          this.$message.success('成功删除')
        }
      });
    },
    goAddpage () {
      this.$router.push('/List/add')
    }
  }
}
</script>

<style scoped></style>
