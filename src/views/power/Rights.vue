<!-- 用户权限 -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>导航一</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 表格 -->
      <el-table :data="rightsList"
                style="width: 100%"
                border
                stripe>
        <el-table-column header-align="center"
                         label="序号"
                         align="center"
                         type="index">
        </el-table-column>
        <el-table-column prop="authName"
                         label="权限名称"
                         width="width">
        </el-table-column>
        <el-table-column prop="path"
                         label="路径"
                         width="width">
        </el-table-column>
        <el-table-column prop="level"
                         label="权限等级"
                         width="width">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '1'">一级</el-tag>
            <el-tag type="success"
                    v-else-if="scope.row.level === '2'">二级</el-tag>
            <el-tag type="warning"
                    v-else-if="scope.row.level === '3'">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      // 权限列表
      rightsList: []
    }
  },
  created () {
    // 获取所有的权限
    this.getRightsList()
  },
  methods: {
    // 获取数据列表
    getRightsList () {
      // 静态数据
      this.rightsList.push(
        { id: 101, authName: '赵云', level: '3', pid: 0, path: 'quto ' },
        { id: 102, authName: '许褚', level: '1', pid: 0, path: 'quto' },
        { id: 103, authName: '赤兔', level: '2', pid: 0, path: 'quto' },
        { id: 104, authName: '的卢', level: '1', pid: 0, path: 'quto' }
      )

      console.log(this.rightsList)
    }
  }
}
</script>

<style scoped></style>
