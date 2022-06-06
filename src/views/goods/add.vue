<!-- 商品列表添加按钮 -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card>
      <el-alert title="添加商品"
                type="info"
                center
                show-icon
                :closable="false">
      </el-alert>

      <!-- 步骤条 -->
      <el-steps :active="activeIndex - 0"
                finish-status="success"
                :space="200"
                align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="基本参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- tab栏区域 -->
      <el-form ref="addFromRef"
               :model="addFrom"
               label-width="80px"
               :rules="addFromRules"
               label-position="top">

        <!-- tab左侧步骤条 -->
        <el-tabs :tab-position="'left'"
                 v-model="activeIndex"
                 :before-leave="beforeTabLeave"
                 @tab-click="tabClicked">

          <el-tab-pane label="基本信息"
                       name="0">
            <el-form-item label="活动名称"
                          prop="goods_name">
              <el-input v-model="addFrom.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格"
                          prop="goods_price">
              <el-input v-model="addFrom.goods_price"
                        type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量"
                          prop="goods_weight">
              <el-input v-model="addFrom.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量"
                          prop="gods_number">
              <el-input v-model="addFrom.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="分类">
              <!-- 级联选择器 -->
              <el-cascader expand-trigger="hover"
                           :options="cateList[0].result"
                           :props="catePrpos"
                           v-model="addFrom.goods_cat"
                           @change="handleChange"
                           change-on-select>
              </el-cascader>
            </el-form-item>

          </el-tab-pane>

          <!-- 基本参数面板 -->
          <el-tab-pane label="基本参数"
                       name="1">
            <!-- 多选框 -->
            <el-form-item label="dddd">
              <el-checkbox-group v-model="checkboxList">
                <el-checkbox :label="cb"
                             v-for="(cb,i) in checkboxList"
                             :key="i"
                             border
                             disabled></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="dddd">
              <el-checkbox-group v-model="checkboxList">
                <el-checkbox :label="cb"
                             v-for="(cb,i) in checkboxList"
                             :key="i"
                             border
                             disabled></el-checkbox>
              </el-checkbox-group>
            </el-form-item>

          </el-tab-pane>

          <el-tab-pane label="商品属性"
                       name="2">商品属性</el-tab-pane>

          <!-- 商品图片 -->
          <el-tab-pane label="商品图片"
                       name="3">
            <el-upload class="upload-demo"
                       action="uploadURL"
                       :on-change="handleChange"
                       :on-preview="handlePreview"
                       :on-remove="handleRemove"
                       :headers="headerObj"
                       :on-success="headerSuccess">

              <el-button size="small"
                         type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>

          <el-tab-pane label="商品内容"
                       name="4">
            <!-- 富文本编译器组件 -->
            <quill-editor v-model="addFrom.goods_introduce"></quill-editor>
            <el-button type="primary"
                       class="btnAdd"
                       @click="addQuill">添加按钮</el-button>

          </el-tab-pane>
        </el-tabs>

      </el-form>
    </el-card>
  </div>
</template>

<script>
//导入深拷贝包
import _ from 'lodash'

export default {
  name: '',
  data () {
    return {
      // 所有商品分类列表
      cateList: [],
      // 绑定步骤条属性
      activeIndex: '0',
      // 上传图片的url地址
      uploadURL: ' https://www.liulongbin.top:8888/api/private/v1/upload',
      // 配置图片上传请求头对象
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      // 表单的数据对象
      addFrom: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        god0s_number: 0,
        // 商品所属分类
        goods_cat: [],
        // 上传图片
        pic: [],
        // 富文本编译器
        goods_introduce: ''
      },
      catePrpos: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      checkboxList: ['哈哈哈', 'dd ', 'wwe', 'f', '哈哈哈', 'dd ', 'wwe', 'f'],

      // 表单的验证规则
      addFromRules: {
        goods_name: [
          { required: true, message: '请输入文本', }
        ],
        goods_price: [
          { required: true, message: '请输入价格', }
        ],
        goods_weight: [
          { required: true, message: '请输入重量', }
        ]
      }


    }
  },
  created () {
    this.getCateList()
    console.log(this.checkboxList)
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

      console.log(this.cateList);
    },

    // 级联选择器选中触发
    handleChange () {
      if (this.addFrom.goods_cat.length !== 3) {
        this.addFrom.goods_cat = []
        console.log('dd');
      }

    },

    // 切换标签页触发事件 即将进入的activeName 即将离开的oldActiveName  
    beforeTabLeave (activeName, oldActiveName) {
      if (oldActiveName === '0' && this.addFrom.goods_cat.length !== 3) {
        this.$message.error('请先选则商品分类')
        return false
      }
    },

    // 点击步骤条调用的接口判断
    tabClicked () {
      console.log(this.activeIndex);
      switch (this.activeIndex) {
        case '1':
          console.log('11'); break
        case '2':
          console.log('22'); break
        case '3':
          console.log('33'); break
        case '4':
          console.log('44'); break
        default:
          break;
      }
    },

    // 处理图片预览图片效果
    handlePreview (file) {
      console.log(file);
    },

    // 处理移除图片操作
    handleRemove (file) {
      console.log(file);
      // 获取要删除图片的临时路径
      // 从pic数组中,找到索引值
      // 调用splice方法把图片信息对象从 pic删除
    },

    // 图片上传成功触发
    headerSuccess (response) {
      // 1.拼接得到图片信息对象
      const picInfo = { pic: response.data.tmp_path }

      // 2.将图片对象,push到pic数组中
      this.addFrom.pic.push(picInfo)
      console.log(response);
    },

    // 富文本添加按钮
    addQuill () {
      console.log(this.addFrom.goods_introduce);
      this.$refs.addFromRef.validate(valid => {
        if (!valid) {
          return this.$message.error('您有表单未填写')
        }

        // 执行表单添加
        // lodash  cloneDeep(obj)方法进行深拷贝
        const form = _.cloneDeep(this.addFrom)
        form.goods_cat = form.goods_cat.join(',')
        console.log(this.addFrom);
        console.log(form);

        this.$message.success('添加成功')
        this.$router.push('/List')

      })
    }

  }
}
</script>

<style scoped>
.el-steps {
  margin: 15px 0;
}

.el-checkbox {
  width: 200px;
  margin: 0 50px 0 0 !important;
}
.btnAdd {
  margin-top: 15px;
}
</style>