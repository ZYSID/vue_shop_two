<!--商品分类组件   -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>导航一</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card>
      <!-- 搜索与添加 -->
      <el-row :gutter="10">
        <el-col :span="10">
          <el-button type="primary" @click="showAddCateDialog" class="treeTable">添加分类</el-button>
        </el-col>
      </el-row>

      <template>
        <!-- 表格 -->
        <tree-table :data="cateList[0].result" :columns="columns" :selection-type=false :expand-type="false" show-index
          border>

          <!-- 是否可用 -->
          <template slot="isok" slot-scope="scope">
            <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color:lightgreen;"></i>
            <i class="el-icon-error" v-else style="color:#66CCFF;"></i>
          </template>

          <!-- 排序 -->
          <template slot="order" slot-scope="scope">
            <el-tag v-if="scope.row.cat_level === 1" size="mini">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.cat_level === 2" size="mini">二级</el-tag>
            <el-tag type="warning" v-else size="mini">三级</el-tag>

          </template>

          <!-- 操作 -->
          <template slot="opt">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="success" icon="el-icon-delete" size="mini">删除</el-button>
          </template>

        </tree-table>
      </template>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="querInfo.pagenum" :page-sizes="[1, 2]" :page-size="querInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>

    </el-card>
    <!-- 添加分类的对话框 -->
    <el-dialog title="商品分类" :visible.sync="addCatelogVisible" width="50%" :close-on-click-modal="false"
      @close="addCateDialogClose">
      <el-form :model="addCateFrom" :rules="addCateFromRules" ref="addCateFromRef" label-width="100px">
        <el-form-item label="活动名称" prop="cat_name">
          <el-input v-model="addCateFrom.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader expand-trigger="hover" v-model="selectedKeys" :options="parentCateList" :props="cascaderProps"
            @change="parentCateChanged" clearable popper-class="popperClass"></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCatelogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      // 商品分类的数据列表
      cateList: [],

      // 查询条件
      querInfo: {
        type: 3,
        pagenum: 0,
        pagesize: 5,
      },
      // 添加分类的表单数据对象
      addCateFrom: {
        // 名称
        cat_name: '',
        // 父类id
        cat_pid: 0,
        // 分类的等级，默认添加1级
        cat_level: 1,
      },
      // 父级分类列表
      parentCateList: [],
      // 指定级联选择器的配置对象
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        checkStrictly: true,
      },
      // 选中的父级分类的Id数组
      selectedKeys: [],
      // 添加表单验证规则
      addCateFromRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
        ],
      },
      // 总数据条数
      total: 0,
      // 控制添加分类的对话框
      addCatelogVisible: false,
      // 指定table列
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name',
        },
        {
          label: '是否可用',
          // 定义为模板列
          type: 'template',
          // 这一列使用模板的名称
          template: 'isok',
        },
        {
          label: '排序',
          // 定义为模板列
          type: 'template',
          // 这一列使用模板的名称
          template: 'order',
        },
        {
          label: '操作',
          // 定义为模板列
          type: 'template',
          // 这一列使用模板的名称
          template: 'opt',
        },
      ],
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    // 获取全部商品列表
    getCateList () {
      // 商品数据信息
      this.cateList.push({ pagenum: 1, pagesize: 2, result: [], total: 30 })
      this.cateList[0].result.push({
        cat_id: 1,
        cat_name: '大家电',
        cat_pid: 0,
        cat_level: 1,
        cat_deleted: false,
        children: [
          {
            cat_id: 11,
            cat_name: '电视',
            cat_pid: 0,
            cat_level: 2,
            cat_deleted: false,
            children: [
              {
                cat_id: 111,
                cat_name: '海信',
                cat_pid: 0,
                cat_level: 3,
                cat_deleted: false,
              },
              {
                cat_id: 112,
                cat_name: '飞利浦',
                cat_pid: 0,
                cat_level: 3,
                cat_deleted: true,
              },
              {
                cat_id: 113,
                cat_name: '小米',
                cat_pid: 0,
                cat_level: 3,
                cat_deleted: false,
              },
            ],
          },
          {
            cat_id: 12,
            cat_name: '冰箱',
            cat_pid: 0,
            cat_level: 2,
            cat_deleted: false,
            children: [
              {
                cat_id: 121,
                cat_name: '小米冰箱',
                cat_pid: 0,
                cat_level: 3,
                cat_deleted: false,
              },
              {
                cat_id: 122,
                cat_name: '海尔',
                cat_pid: 0,
                cat_level: 3,
                cat_deleted: false,
              },
            ],
          },
        ],
      }),
        this.cateList[0].result.push({
          cat_id: 2,
          cat_name: '小家电',
          cat_pid: 0,
          cat_level: 1,
          cat_deleted: true,
          children: [
            {
              cat_id: 11,
              cat_name: '小电视',
              cat_pid: 0,
              cat_level: 2,
              cat_deleted: false,
              children: [
                {
                  cat_id: 111,
                  cat_name: '小海信',
                  cat_pid: 0,
                  cat_level: 3,
                  cat_deleted: true,
                },
                {
                  cat_id: 112,
                  cat_name: '小飞利浦',
                  cat_pid: 0,
                  cat_level: 3,
                  cat_deleted: false,
                },
                {
                  cat_id: 113,
                  cat_name: '小米',
                  cat_pid: 0,
                  cat_level: 3,
                  cat_deleted: false,
                },
              ],
            },
            {
              cat_id: 12,
              cat_name: '小冰箱',
              cat_pid: 0,
              cat_level: 2,
              cat_deleted: false,
              children: [
                {
                  cat_id: 121,
                  cat_name: '小米冰箱',
                  cat_pid: 0,
                  cat_level: 3,
                  cat_deleted: false,
                },
                {
                  cat_id: 122,
                  cat_name: '海尔',
                  cat_pid: 0,
                  cat_level: 3,
                  cat_deleted: false,
                },
              ],
            },
          ],
        }),
        (this.total = this.cateList[0].total)
      this.querInfo.pagesize = this.cateList[0].pagesize
      this.querInfo.pagenum = this.cateList[0].pagenum

      console.log('获取到的商品列表:', this.cateList)
      console.log('总条数:', this.total)
      console.log(this.cateList[0].result)
    },
    // 监听每页条数pagesize的变化
    handleSizeChange (newSize) {
      this.querInfo.pagesize = newSize
      this.cateList.splice(this.cateList)
      this.getCateList()
    },
    // 监听当前页pagenum的变化
    handleCurrentChange (newPage) {
      this.querInfo.pagenum = newPage
      this.cateList.splice(this.cateList)
      this.getCateList()
    },
    // 点击按钮展示添加分类对话框
    showAddCateDialog () {
      this.getParentCateList()
      this.addCatelogVisible = true
    },
    // 获取父级分类的数据列表
    getParentCateList () {
      this.parentCateList = this.cateList[0].result
    },
    // 选择项发生变化触发
    parentCateChanged () {
      // 如果selectedKeys 数组的lenth大于0，证明的选中的父级分类
      // 反之，没有选中任何父级分类
      if (this.selectedKeys.length > 0) {
        this.addCateFrom.cat_pid =
          this.selectedKeys[this.selectedKeys.length - 1]
        this.addCateFrom.cat_level = this.selectedKeys.length

        console.log(this.addCateFrom.cat_pid, this.addCateFrom.cat_level)
      } else {
        this.addCateFrom.cat_pid = 0
        this.addCateFrom.cat_level = 1
        console.log(this.addCateFrom.cat_pid, this.addCateFrom.cat_level)
      }
    },
    // 点击确定按钮添加新的分类
    addCate () {
      this.$refs.addCateFromRef.validate((valid) => {
        if (!valid) return
        this.cateList[0].result.push(this.addCateFrom)

        this.addCatelogVisible = false

        this.$message.success('成功')
      })
      console.log(this.addCateFrom)
      console.log('添加成功', this.cateList[0].result)
    },
    // 关闭添加分类对话框的事件
    addCateDialogClose () {
      this.$refs.addCateFromRef.resetFields()
      this.selectedKeys = []
      this.addCateFrom.cat_pid = 0
      this.addCateFrom.cat_level = 1
    },
  },
}
</script>

<style scoped>
.treeTable {
  margin-top: -10px;
  margin-bottom: 10px;
}

.el-cascader {
  width: 100%;
}
</style>

