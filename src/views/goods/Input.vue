<!--监听事件 省市级 -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>导航一</el-breadcrumb-item>
      <el-breadcrumb-item>监听事件</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="selectList">
      <el-select v-model="province" placeholder="省">
        <el-option v-for="item in provinceList" :label="item.name" :value="item.code" :key="item.code"></el-option>
      </el-select>
      <el-select v-model="city" placeholder="市">
        <el-option v-for="item in cityList" :label="item.name" :value="item.code" :key="item.code"></el-option>
      </el-select>
      <el-select v-model="district" placeholder="区">
        <el-option v-for="item in districtList" :label="item.name" :value="item.code" :key="item.code"></el-option>
      </el-select>
    </div>
    <div class="count_full" :class="[isActice ? 'active' : 'bctive']">
      计算属性:
      {{ firstName }} + {{ lastName }} = {{ fullName }}
    </div>

  </div>
</template>

<script>
import arr from '../../myCharts/shengshiqu';
export default {
  name: '',
  data () {
    return {
      provinceList: [],
      province: '',

      cityList: [],
      city: '',

      districtList: [],
      district: '',

      firstName: 1,
      lastName: 2,

      isActice: false

    };
  },
  watch: {
    province: function () {
      this.city = '';
      this.changeProvince();
    },
    city: function () {
      this.district = '';
      this.changeDistrict();
    }

  },
  created () {
    this.provinceList = arr.arr;
    // console.log('provinceList', this.provinceList);
  },
  methods: {
    changeProvince () {
      this.provinceList.forEach(item => {
        if (item.code === this.province) {
          this.cityList = item.children;
        }
      });
      // console.log('cityList', this.cityList);
    },
    changeDistrict () {
      this.cityList.forEach(item => {
        if (item.code === this.city) {
          this.districtList = item.children;
        }
      });
      // console.log('districtList', this.districtList);
    },
  },
  computed: {
    fullName () {
      return this.firstName + this.lastName;
    }
  }
}

</script>

<style lang="less" scoped>
.selectList {
  width: 100%;

  .el-select {
    margin: 10px;
  }
}

.count_full {
  width: 30%;
  text-align: center;
  margin-top: 20px;
  border: 1px solid #ccc;
}

.active {
  color: red;
}

.bctive {
  color: blue;
}
</style>