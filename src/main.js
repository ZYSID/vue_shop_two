import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '../public/store'
import * as echarts from 'echarts'
import Users from '../src/views/Users.vue'

// 导入富文本编译器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编译器样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

import './plugins/element.js'
// 导入全局样式
import './assets/css/global.css'
// 字体图标
import '@/assets/icon/iconfont.css'
import myCharts from './myCharts'
import TreeTabel from 'vue-table-with-tree-grid'

//导入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//配置请求的根路径
import axios from 'axios'
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
    // 在request拦截器中，展示进度条Nprogress.start()
axios.interceptors.request.use(config => {
    NProgress.start()
    config.headers.Authorization = window.sessionStorage.getItem('token')
        // 最后必须return config
    return config
})

// 在respose拦截器中，隐藏进度条
axios.interceptors.request.use(config => {
    NProgress.done()
    return config
})

Vue.prototype.$http = axios

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.component('tree-table', TreeTabel)

// 将富文本编译器注册为全局组件
Vue.use(VueQuillEditor)

Vue.use(myCharts)
Vue.use(Users)

// 定义全局时间过滤器
Vue.filter('dateFormat', function(originVal) {
    const dt = new Date(originVal)

    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')

    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')