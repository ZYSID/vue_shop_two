<!-- 用户权限列表 -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>导航一</el-breadcrumb-item>
      <el-breadcrumb-item>用户权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">添加按钮</el-button>
        </el-col>
      </el-row>

      <el-table :data="roles"
                style="width: 100%"
                border
                stripe>
        <!-- 展开列 -->
        <el-table-column type="expand"
                         label="展开">
          <template slot-scope="scope">
            <el-row v-for="(item1, i1) in scope.row.children"
                    :key="item1.id"
                    :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vceter']">
              <!-- 渲染一级 -->
              <el-col :span="5">
                <el-tag closable>{{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>

              <!-- 渲染二级 、三级-->
              <el-col :span="19">
                <!-- 通过for循环 嵌套二级  -->
                <el-row v-for="(item2, i2) in item1.children"
                        :key="item2.id"
                        :class="[i2 === 0 ? '' : 'bdtop', 'vceter']">
                  <!-- 二级 -->
                  <el-col :span="6">
                    <el-tag type="success"
                            closable>{{
                      item2.authName
                    }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级 -->
                  <el-col :span="18">
                    <el-tag type="warning"
                            closable
                            @close="removeRightById(scope.row, item3.id)"
                            v-for="item3 in item2.children"
                            :key="item3.id">{{ item3.authName }}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column header-align="center"
                         align="center"
                         type="index"
                         label="序列">
        </el-table-column>
        <el-table-column prop="roleName"
                         label="角色职位"> </el-table-column>
        <el-table-column prop="roleDesc"
                         label="角色名称"> </el-table-column>

        <el-table-column label="操作"
                         width="300">
          <template>
            <el-tooltip class="item"
                        effect="dark"
                        content="修改"
                        placement="top-start"
                        :enterable="false">
              <el-button type="primary"
                         icon="el-icon-edit"
                         size="mini">修改</el-button>
            </el-tooltip>
            <el-tooltip class="item"
                        effect="dark"
                        content="删除"
                        placement="top-start"
                        :enterable="false">
              <el-button type="success"
                         icon="el-icon-delete"
                         size="mini">删除</el-button>
            </el-tooltip>
            <el-tooltip class="item"
                        effect="dark"
                        content="分配角色"
                        placement="top-start"
                        :enterable="false">
              <el-button type="warning"
                         icon="el-icon-setting"
                         @click="showSetRightDialog"
                         size="mini">分配角色
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="分配角色权限"
               :visible.sync="setRightDialogVisible"
               width="30%">
      <el-tree :data="rightslist"
               :props="treeProps"
               show-checkbox
               node-key="id"
               default-expand-all
               icon-class='el-icon-caret-bottom'
               :default-expanded-keys="defKeys"
               ref="treeref"></el-tree>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      // 用户权限信息列表
      roles: [],
      // 控制分配弹框显示与隐藏
      setRightDialogVisible: false,
      // 所有权限的数据
      rightslist: [],
      // 默认选中节点id
      defKeys: [],
      //树形控件的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      }
    }
  },
  created () {
    this.getRolesList()
  },
  methods: {
    getRolesList () {
      // 角色列表
      this.roles.push(
        {
          id: 10,
          roleName: '主公',
          roleDesc: '老大',
          children: [
            {
              id: 101,
              authName: '1.1商品管理',
              path: null,
              children: [
                {
                  id: 1021,
                  authName: '2.1商品列表',
                  path: null,
                  children: [
                    {
                      id: 1031,
                      authName: '3.1添加商品',
                      path: null
                    },
                    {
                      id: 1032,
                      authName: '3.2添加商品',
                      path: null
                    },
                    {
                      id: 1033,
                      authName: '3.3添加商品',
                      path: null
                    },
                    {
                      id: 1034,
                      authName: '3.4添加商品',
                      path: null
                    },
                    {
                      id: 1035,
                      authName: '3.5添加商品',
                      path: null
                    },
                    {
                      id: 1036,
                      authName: '3.6添加商品',
                      path: null
                    },
                    {
                      id: 1037,
                      authName: '3.7添加商品',
                      path: null
                    },
                    {
                      id: 1038,
                      authName: '3.8添加商品',
                      path: null
                    }
                  ]
                },
                {
                  id: 1022,
                  authName: '2.2商品列表',
                  path: null,
                  children: [
                    {
                      id: 1031,
                      authName: '3.1添加商品',
                      path: null
                    },
                    {
                      id: 1032,
                      authName: '3.2添加商品',
                      path: null
                    },
                    {
                      id: 1033,
                      authName: '3.3添加商品',
                      path: null
                    }
                  ]
                },
                {
                  id: 1023,
                  authName: '2.3商品列表',
                  path: null,
                  children: [
                    {
                      id: 1031,
                      authName: '3.1添加商品',
                      path: null
                    },
                    {
                      id: 1032,
                      authName: '3.2添加商品',
                      path: null
                    },
                    {
                      id: 1033,
                      authName: '3.3添加商品',
                      path: null
                    }
                  ]
                }
              ]
            },
            {
              id: 201,
              authName: '1.2商品列表',
              path: null,
              children: [
                {
                  id: 202,
                  authName: '2.2添加商品',
                  path: null
                }
              ]
            },
            {
              id: 301,
              authName: '1.3商品管理',
              path: null,
              children: [
                {
                  id: 302,
                  authName: '.2.2商品列表',
                  path: null,
                  children: [
                    {
                      id: 3031,
                      authName: '3.1添加商品',
                      path: null
                    },
                    {
                      id: 3032,
                      authName: '3.2添加商品',
                      path: null
                    },
                    {
                      id: 3033,
                      authName: '3.3添加商品',
                      path: null
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 20,
          roleName: '军师',
          roleDesc: '老二',
          children: [
            {
              id: 101,
              authName: '商品管理',
              path: null
            }
          ]
        },
        {
          id: 30,
          roleName: '管家',
          roleDesc: '老三',
          children: [
            {
              id: 101,
              authName: '商品管理',
              path: null,
              children: [
                {
                  id: 104,
                  authName: '商品列表',
                  path: null,
                  children: [
                    {
                      id: 105,
                      authName: '添加商品',
                      path: null
                    }
                  ]
                }
              ]
            }
          ]
        }
      )
      console.log(this.roles)
    },
    // 根据id删除
    async removeRightById () {
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      //确定为confirm
      //取消为cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消了删除!')

      }
    },
    // 展示分配角色框
    showSetRightDialog () {
      this.rightslist = this.roles
      this.setRightDialogVisible = true
    },
    //分配权限点击确定按钮获取复选框的id
    allotRights () {
      const keys = [
        ...this.$refs.treeref.getCheckedKeys(),
        ...this.$refs.treeref.getHalfCheckedKeys()
      ]
      console.log("获取到的id" + keys)

    }
  }
}
</script>

<style scoped>
.el-tag {
  margin: 10px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vceter {
  display: flex;
  align-items: center;
}
</style>
