<!--主页  -->
<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="title">
        <img src="../assets/img/未标题-1.png"
             alt />电商管理系统
      </div>
      <el-button type="info"
                 @click="homeOut">退出</el-button>
    </el-header>

    <!-- 页面主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="iscollapse ? '64px' : '200px'">
        <!-- 折叠按钮 -->
        <div class="toggle-button"
             @click="toggleBtn">|||</div>
        <!-- 背景颜色 -->
        <el-menu :collapse="iscollapse"
                 :collapse-transition="false"
                 unique-opened
                 background-color="rgb(80, 79, 85)"
                 text-color="#fff"
                 active-text-color="#adff81"
                 router
                 :default-active:="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''"
                      v-for="item in menuList"
                      :key="item.id">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.name }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + items.path"
                          v-for="items in menuListOne"
                          :key="items.id"
                          @click="saveMavState('/' + items.path)">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ items.name }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 右侧内容主体 -->
      <el-main>
        <!-- Welcome路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      // 左侧菜单列表
      menuList: [
        { id: 1, name: '导航一' },
        { id: 2, name: '导航二' },
        { id: 3, name: '导航三' },
        { id: 5, name: '导航四' }
      ],
      menuListOne: [
        { id: 11, name: '用户列表', path: 'Users' },
        { id: 12, name: '用户权限', path: 'Rights' },
        { id: 13, name: '用户权限列表', path: 'Roles' },
        { id: 14, name: '商品分类', path: 'Cate' },
        { id: 15, name: '商品属性', path: 'Params' },
        { id: 16, name: '商品列表', path: 'List' },
        { id: 17, name: '订单列表', path: 'Order' },
        { id: 18, name: '订单图表', path: 'Report' },
        { id: 19, name: '监听事件', path: 'Input' },
        { id: 20, name: 'Vuex练习', path: 'Vuex' },

      ],
      iconObj: {
        1: 'iconfont icon-zhanghao',
        2: 'iconfont icon-che',
        3: 'iconfont icon-xiangji',
        5: 'iconfont icon-soushuo'
      },
      // 是否折叠
      iscollapse: false,
      //别激活的链接地址
      activePath: ''
    }
  },
  created () {
    // this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    homeOut () {
      this.$router.push('/')
    },
    // 获取所有的菜单
    // getMenuList() {
    // 	for (let i = 0; i <= this.menuList.length; i++) {
    // 		console.log(this.menuList[i])
    // 	}
    // },
    //左侧折叠按钮
    toggleBtn () {
      this.iscollapse = !this.iscollapse
    },
    saveMavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: rgb(46, 46, 46);
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
}
.title {
  display: flex;
  align-items: center;
}
.el-header img {
  height: 40px;
  width: 40px;
}
.el-aside {
  background-color: rgb(80, 79, 85);
}
.el-main {
  background-color: #ffffff;
}
.el-menu {
  border: none;
}

.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: rgb(116, 116, 117);
  font-size: 10px;
  line-height: 24px;
  color: #ffffff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
