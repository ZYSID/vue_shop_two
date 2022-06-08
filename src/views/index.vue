<!-- 登录页 -->
<template>
  <div class="index_contatiner">
    <div class="login-box">
      <!-- logo图标 -->
      <div class="avatar-box">
        <img src="../assets/img/logo.png" />
      </div>

      <!-- 登录 -->
      <el-form label-width="0" class="index-Form" :model="indexForm" :rules="indexFormRules" ref="indexFormRef">
        <!-- 账号 -->
        <el-form-item prop="Username">
          <el-input ref="name" @keyup.native="restIndexForm" prefix-icon="iconfont icon-zhanghao"
            v-model="indexForm.Username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="Password">
          <el-input prefix-icon="iconfont icon-mima" v-model="indexForm.Password" type="password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="restIndexForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// echart 可视化图表
// import echartscom from "@/components/echartscom.vue";
export default {
  data () {
    return {
      //登录表单数据绑定对象
      indexForm: {
        Username: '',
        Password: '',
      },
      one: false,
      //验证登录表单
      indexFormRules: {
        //验证账号
        Username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' },
        ],
        //验证密码
        Password: [
          { required: true, message: '请输入3--10位密码', trigger: 'blur' },
          {
            min: 6,
            max: 18,
            message: '长度在 6 到 18个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  methods: {
    // set() {
    //   // let get = Object.keys(this.indexForm);
    //   // console.log("类型", typeof get);
    //   // for (let i = 0; i < get.length; i++) {
    //   //   console.log(get[i], this.indexForm[get[i]]);
    //   // }
    //   for (let get in this.indexForm) {
    //     console.log(this.indexForm[get]);
    //   }
    // },
    restIndexForm () {
      this.one = true
      console.log((this.one = !this.one))
      // this.$refs.indexFormRef.resetFields()
      // console.log('1', this.$refs.name);
      // console.log('1',e);
    },
    login () {
      // this.$refs.indexFormRef.validate(async (valid) => {
      //   if (!valid) return;
      //   const { data: res } = await this.$http.post(
      //     "login",
      //     this.indexFormRules
      //   );
      //   console.log(res);
      // });
      if (
        this.indexForm.Username == '123456' &&
        this.indexForm.Password == '13166951359'
      ) {
        this.$message.success('登录成功')
        this.$router.push('/home')
      } else {
        this.$message.error('账号或密码错误 ')
        this.indexForm.Password = ''
        console.log(this.indexForm.Password)
      }
      
    },
  },
}
</script>
<style lang="less" scoped>
.index_contatiner {
  height: 100%;
  background: rgb(135, 237, 255);
}

.login-box {
  width: 450px;
  height: 300px;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar-box {
  height: 130px;
  width: 130px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
}

.avatar-box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #ddd;
}

.index-Form {
  position: absolute;
  padding: 0 20px;
  box-sizing: border-box;
  bottom: 0;
  width: 100%;
}

.btn {
  display: flex;
  justify-content: flex-end;
}
</style>
