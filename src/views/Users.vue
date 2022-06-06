<!-- 用户列表组件 -->
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
      <!-- 搜索与添加 -->
      <el-row :gutter="10">
        <el-col :span="11">
          <el-input placeholder="请输入内容" clearable v-model="queryInfo.query" >
            <el-button slot="append" icon="el-icon-search"> </el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区 -->
      <el-table :data="tableData" border stripe>
        <el-table-column type="index" label="#" fixed></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="date" label="时间" width="100"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="130"></el-table-column>
        <el-table-column prop="role_name" label="职位" width="100"></el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="178">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="修改" placement="top-start" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start" :enterable="false">
              <el-button type="success" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top-start" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页显示 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryInfo.currentPage" :page-sizes="[1, 2, 3, 4]" :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

    <!-- 用户添加对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" :close-on-click-modal="false" width="50%" center
      @keyup.native="ddd" @close="addDialogVisible">
      <!-- 内容主体 -->
      <el-form :model="addFrom" :rules="addFromRules" ref="addFromRef" label-width="100px">
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="addFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="addFrom.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="addFrom.mobile"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="date">
          <el-col :span="11">
            <el-date-picker type="date" v-model="addFrom.date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="addFrom.address"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="role_name">
          <el-input v-model="addFrom.role_name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog title="提示" :visible.sync="edialogVisible" :close-on-click-modal="false" width="50%"
      @close="editDiaglogClosed">
      <el-form ref="editFormRef" :rules="addFromRules" :model="editForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="edialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="提示" :visible.sync="setRoleDialogVisible" width="50%" :close-on-click-modal="false"
      @close="setRoleDialogClosed">
      <div>
        <p>当前用户:{{ userInfo.name }}</p>
        <p>当前角色:{{ userInfo.role_name }}</p>
        <p>
          选择职位:
          <el-select placeholder="请选择" v-model="selectedRoleId">
            <el-option v-for="item in rolesList" :key="item.id" :label="item.role_name" :value="item.id">
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    //定义mobile验证规则
    var checkMobile = (ules, value, cb) => {
      //验证手机的正则
      const regMobile = /^[1][3,4,5,7,8][0-9]{9}$/

      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('手机号输入错误'))
    }

    return {
      // 用户列表参数对象
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '貂蝉',
          address: '上海市',
          mobile: 13166951359,
          role_name: '普通用户',
          mg_state: false //当前用户状态
        },
        {
          id: 2,
          date: '2016-05-02',
          name: '吕布',
          address: '长春市',
          mobile: 13166951359,
          role_name: '普通用户',
          mg_state: false //当前用户状态
        },
        {
          id: 3,
          date: '2016-05-02',
          name: '诸葛亮',
          address: '济宁市 1518 弄',
          mobile: 13166951359,
          role_name: '军师',
          mg_state: true //当前用户状态
        },
        {
          id: 4,
          date: '2016-05-02',
          name: '刘备',
          address: '吉林市 1518 弄',
          mobile: 13166951359,
          role_name: '主公',
          mg_state: true //当前用户状态
        }
      ],
      //获取用户列表参数
      queryInfo: {
        query: '',
        //当前页数
        currentPage: 1,
        //每页显示多少条数据
        pagesize: 2
      },
      //总条数
      total: 10,
      //控制添加用户的显示或隐藏
      dialogVisible: false,
      //控制修改的显示或隐藏
      edialogVisible: false,
      // 控制分配角色的显示或隐藏
      setRoleDialogVisible: false,
      // 需要被分配角色的用户信息
      userInfo: {},
      // 所有职位信息
      rolesList: [],
      // 已选中角色Id值
      selectedRoleId: '',
      // 暂存修改用户信息
      editForm: {
        name: '',
        mobile: 0,
        address: ''
      },
      // 添加用户的表单数据
      addFrom: {
        name: '',
        password: '',
        mobile: 0,
        id: '',
        date: '',
        address: '',
        role_name: ''
      },
      // 添加表单的验证规则对象
      addFromRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入当前地址', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 获取用户数据
    getUserList () {
      this.total = this.tableData.length
      for (let index = 0; index < this.tableData.length; index++) {
        this.rolesList.push(this.tableData[index])
      }
      console.log('1' + this.rolesList)
    },
    // 监听pagesize改变的事件
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
    },
    // 监听页码值改变的事件
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    //监听添加用户对话框的关闭事件
    addDialogVisible () {
      this.$refs.addFromRef.resetFields()
      console.log('添加用户成功清空')
    },
    //添加确定按钮，添加新用户
    addUser () {
      console.log(this.addFrom)
      this.$refs.addFromRef.validate(valid => {
        if (!valid) return
        //通过则发起添加请求
        this.tableData.push(this.addFrom)
        console.log(this.addFrom)
      })
    },
    // 修改会话框
    showEditDialog (id) {
      console.log(id)

      for (let i = 0; i <= this.tableData.length; i++) {
        if (id == this.tableData[i].id) {
          this.editForm.name = this.tableData[i].name
          this.editForm.mobile = this.tableData[i].mobile
          this.editForm.address = this.tableData[i].address
          break
        }
      }
      console.log(
        this.editForm.name,
        this.editForm.mobile,
        this.editForm.address
      )
      this.edialogVisible = true
    },
    // 监听修改会话框关闭清空事件
    editDiaglogClosed () {
      this.$refs.editFormRef.resetFields()
      console.log('修改退出清空')
    },
    // 修改框确定按钮
    editUserInfo () {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) {
          this.$message.success('修改错误')
          console.log('输入错误', valid)
          return
        }
        // 发起用户请求
        this.tableData.mobile = this.editForm.mobile
        this.tableData.address = this.editForm.address
        console.log(this.tableData.mobile, this.tableData.address)
        this.edialogVisible = false
        this.$message.success('修改成功')
      })
    },
    //删除id用户信息
    async removeUserById (id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      //确定为confirm
      //取消为cancel
      console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消删除')
      }
      console.log(id)
      console.log('删除的id', id)
      this.tableData.splice(id - 1, 1)
      return this.$message.success('用户删除成功')
    },
    // 展示分配角色对话框
    setRole (usetInfo) {
      this.userInfo = usetInfo
      this.setRoleDialogVisible = true
    },
    //点击分配新角色
    saveRoleInfo () {
      for (let index = 0; index < this.rolesList.length; index++) {
        const s = this.rolesList[index].id
        if (this.selectedRoleId !== s) {
          this.setRoleDialogVisible = false
          return this.$message.success('成功')
        }
        return this.$message.error('请选择要分配的角色')
      }

    },
    setRoleDialogClosed () {
      this.selectedRoleId = ''
      this.userInfo = {}
    }
  }
}
</script>

<style scoped>
</style>
