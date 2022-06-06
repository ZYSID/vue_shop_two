<!-- 商品属性 -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>导航一</el-breadcrumb-item>
      <el-breadcrumb-item>商品属性</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>

      <!-- 提示框  -->
      <el-alert title="警告提示的文案"
                type="warning"
                show-icon
                close-text="知道了">
      </el-alert>

      <!-- 选择商品分类区 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类:</span>
          <el-cascader expand-trigger="hover"
                       :options="catelist"
                       :props="cateProps"
                       v-model="selectedCateKeys"
                       @change="handeChange"></el-cascader>
        </el-col>
      </el-row>

      <!-- Tabs标签页 -->
      <el-tabs v-model="activeName"
               @tab-click="handleTabClick">

        <!-- 添加动态参数的面板 -->
        <el-tab-pane label="动态参数"
                     name="many">
          <el-button type="primary"
                     size="mini"
                     :disabled="isBtnDisabled"
                     @click="addDialogvisible=true"> 添加参数</el-button>
          <!-- 动态参数表格 -->
          <el-table :data="manyTableData"
                    style="width: 100%"
                    border
                    stripe>
            <!-- 展开行 -->
            <el-table-column type="expand"
                             label="展开">
              <el-tag :key="tag"
                      v-for="tag in dynamicTags"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <!-- 添加标签按钮 文本框 -->
              <el-input class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm">
              </el-input>
              <!-- 添加标签按钮 按钮 -->
              <el-button v-else
                         class="button-new-tag"
                         size="small"
                         @click="showInput">+ New Tag</el-button>
            </el-table-column>
            <!-- 索引行 -->
            <el-table-column type="index"
                             label="序号">
            </el-table-column>
            <el-table-column label="参数列表"
                             prop="attr_name">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary"
                           icon="el-icon-edit"
                           size="mini"
                           @click="addClick(scope.row.attr_id)">编辑</el-button>
                <el-button type="success"
                           icon="el-icon-delete"
                           size="mini">删除</el-button>
              </template>
            </el-table-column>

          </el-table>

        </el-tab-pane>
        <!-- 添加静态属性的面板 -->
        <el-tab-pane label="静态属性"
                     name="only">
          <el-button type="primary"
                     size="mini"
                     :disabled="isBtnDisabled"
                     @click="editDialogvisible=true">添加属性</el-button>
          <!-- 动态参数表格 -->
          <el-table :data="onlyTableData"
                    style="width: 100%"
                    border
                    stripe>
            <!-- 展开行 -->
            <el-table-column type="expand"
                             label="展开">
              <el-tag :key="tag"
                      v-for="tag in dynamicTags"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <!-- 添加标签按钮 文本框 -->
              <el-input class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm">
              </el-input>
              <!-- 添加标签按钮 按钮 -->
              <el-button v-else
                         class="button-new-tag"
                         size="small"
                         @click="showInput">+ New Tag</el-button>
            </el-table-column>
            <!-- 索引行 -->
            <el-table-column type="index"
                             label="序号">
            </el-table-column>
            <el-table-column label="属性列表"
                             prop="attr_name">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary"
                           icon="el-icon-edit"
                           size="mini"
                           @click="editClick(scope.row.attr_id)">编辑</el-button>
                <el-button type="success"
                           icon="el-icon-delete"
                           size="mini"
                           @click="removeParams(scope.row.attr_id)">删除</el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-tab-pane>

      </el-tabs>
    </el-card>
    <!-- 添加动态态属性对话框 -->
    <el-dialog :title="titleText"
               :visible.sync="addDialogvisible"
               width="50%"
               @close="addDialogClose">
      <!-- 验证的表单 -->
      <el-form :model="addFrom"
               ref="addRuleFormRef"
               label-width="100px">
        <el-form-item :label="titleText"
                      prop="arrt_name">
          <el-input v-model="addFrom.arrt_name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addDialogvisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addParams">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加静态参数对话框 -->
    <el-dialog :title="titleText"
               :visible.sync="editDialogvisible"
               width="50%"
               @close="editDialogClose">
      <!-- 验证的表单 -->
      <el-form :model="editFrom"
               ref="editRuleFormRef"
               label-width="100px">
        <el-form-item :label="titleText"
                      prop="arrt_name">
          <el-input v-model="editFrom.arrt_name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editDialogvisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editParams">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

export default {
  name: '',
  data () {
    return {
      // 商品的列表属性
      catelist: [],
      // 级联选择框的配置对象
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        checkStrictly: true
      },
      // 级联选择框双向绑定数据
      selectedCateKeys: [],
      // 被激活的标签页的名称
      activeName: 'many',
      // 所有商品动态数据
      ManyTableData: [{
        attr_id: 1,
        attr_name: '动态cpu',
        cat_id: 11,
        attr_write: 'manual',
        attr_vals: 'ffff'
      },
      {
        attr_id: 12,
        attr_name: '动态电池 ',
        cat_id: 12,
        attr_write: 'manual',
        attr_vals: 'ffff'
      }],
      // 所有商品静态数据
      OnlyTableData: [{
        attr_id: 2,
        attr_name: '静态电池 ',
        cat_id: 21,
        attr_write: 'manual',
        attr_vals: 'ffff'
      },
      {
        attr_id: 22,
        attr_name: '静态电池 ',
        cat_id: 22,
        attr_write: 'manual',
        attr_vals: 'ffff'
      }],
      // 动态参数的数据
      manyTableData: [],
      // 静态参数的数据
      onlyTableData: [],
      // 控制添加弹框的显示与隐藏
      addDialogvisible: false,
      // 动态参数添加的数据表单对象
      addFrom: {
        arrt_name: '',
      },
      // 静态参数对话框的显示隐藏
      editDialogvisible: false,
      // 控制文本框和按钮的切换，
      inputVisible: false,
      // 文本框内容
      inputValue: '',

      dynamicTags: ['标签一', '标签二', '标签三'],
      // 静态参数添加的数据表单对象
      editFrom: {
        arrt_name: '',
      }

    };
  },
  created () {
    this.getCateList()
  },
  computed: {
    // 如果按钮需要被禁用，则返回true，反之false
    isBtnDisabled () {
      if (this.selectedCateKeys.length !== 3) {
        return true
      }
      return false
    },
    // 选中三级分类的Id
    cateId () {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[2]
      }
      return null
    },
    // 动态计算添加弹框的文本信息
    titleText () {
      if (this.activeName === 'many') {
        return '动态参数'
      }
      return '静态属性'
    }
  },
  methods: {
    // 获取全部商品列表
    getCateList () {
      // 商品数据信息
      this.catelist.push({
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
                cat_deleted: false
              },
              {
                cat_id: 112,
                cat_name: '飞利浦',
                cat_pid: 0,
                cat_level: 3,
                cat_deleted: true
              },
              {
                cat_id: 113,
                cat_name: '小米',
                cat_pid: 0,
                cat_level: 3,
                cat_deleted: false
              }
            ]
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
                cat_deleted: false
              },
              {
                cat_id: 122,
                cat_name: '海尔',
                cat_pid: 0,
                cat_level: 3,
                cat_deleted: false
              }
            ]
          }
        ]
      }),
        this.catelist.push({
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
                  cat_deleted: true
                },
                {
                  cat_id: 112,
                  cat_name: '小飞利浦',
                  cat_pid: 0,
                  cat_level: 3,
                  cat_deleted: false
                },
                {
                  cat_id: 113,
                  cat_name: '小米',
                  cat_pid: 0,
                  cat_level: 3,
                  cat_deleted: false
                }
              ]
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
                  cat_deleted: false
                },
                {
                  cat_id: 122,
                  cat_name: '海尔',
                  cat_pid: 0,
                  cat_level: 3,
                  cat_deleted: false
                }
              ]
            }
          ]
        })
      this.catelist.push({
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
                cat_deleted: true
              },
              {
                cat_id: 112,
                cat_name: '小飞利浦',
                cat_pid: 0,
                cat_level: 3,
                cat_deleted: false
              },
              {
                cat_id: 113,
                cat_name: '小米',
                cat_pid: 0,
                cat_level: 3,
                cat_deleted: false
              }
            ]
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
                cat_deleted: false
              },
              {
                cat_id: 122,
                cat_name: '海尔',
                cat_pid: 0,
                cat_level: 3,
                cat_deleted: false
              }
            ]
          }
        ]
      })
      this.catelist.push({
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
                cat_deleted: true
              },
              {
                cat_id: 112,
                cat_name: '小飞利浦',
                cat_pid: 0,
                cat_level: 3,
                cat_deleted: false
              },
              {
                cat_id: 113,
                cat_name: '小米',
                cat_pid: 0,
                cat_level: 3,
                cat_deleted: false
              }
            ]
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
                cat_deleted: false
              },
              {
                cat_id: 122,
                cat_name: '海尔',
                cat_pid: 0,
                cat_level: 3,
                cat_deleted: false
              }
            ]
          }
        ]
      })

      console.log(this.catelist);
    },
    // 级联选择框选中项变化会触发
    handeChange () {
      // 判断是否为3级菜单
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = []
        this.manyTableData = []
        this.onlyTableData = []
        return
      }

      // 根据所选分类Id,和当前所处的面板，获取对应的参数
      this.onlyTableData = this.OnlyTableData
      this.manyTableData = this.ManyTableData

      console.log('动态', this.manyTableData);
      console.log('静态', this.onlyTableData);

    },
    // 标签页的点击事件
    handleTabClick () {
      console.log(this.activeName);
    },
    // 动态添加对话框的关闭事件
    addDialogClose () {

    },
    // 动态点击确定按钮表单验证
    addParams () {
      this.$refs.addRuleFormRef.validate(valid => {
        if (!valid) return
        this.manyTableData.push(this.addFrom)

        this.$message.success('成功')
        this.addDialogvisible = false
        console.log(this.editFrom);
      })
    },
    // 静态添加对话框的关闭事件
    editDialogClose () {
    },
    // 动态对话框
    addClick () { },
    // 静态点击确定按钮表单验证
    editParams () {
      this.$refs.editRuleFormRef.validate(valid => {
        if (!valid) return
        this.onlyTableData.push(this.editFrom)

        this.$message.success('成功')
        this.editDialogvisible = false
        console.log(this.editFrom);
      })

    },
    //静态点击编辑传入id
    editClick (attrId) {
      this.editDialogvisible = true
      for (let index = 0; index < this.onlyTableData.length; index++) {
        if (attrId === this.onlyTableData[index].attr_id) {
          this.editFrom.arrt_name = this.onlyTableData[index].attr_name
          console.log(attrId);
          console.log(this.editFrom);

        }
      }


    },
    // 静态参数删除按钮
    async removeParams (attrId) {
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(confirmResult);

      // 取消
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      // 确定
      for (let index = 0; index < this.onlyTableData.length; index++) {
        if (attrId === this.onlyTableData[index].attr_id) {

          this.onlyTableData.splice(this.onlyTableData[index], 1)

          console.log(attrId);
          console.log(this.onlyTableData);
          return this.$message.success('已成功删除')
        }

      }
    },
    // 删除标签
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);

    },
    // 文本框按回车或离开都会触发
    handleInputConfirm () {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    //  点击按钮 ，展示文本输入框
    showInput () {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();

      });

    }
  }


}




</script>

<style scoped>
.cat_opt {
  margin: 15px 0;
}
.input-new-tag {
  width: 120px;
}
.el-tag {
  margin: 0 15px;
}
</style>
