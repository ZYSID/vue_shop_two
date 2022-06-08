<!-- 文件上传 -->
<template>
  <div>
    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-success="handleSuccess"
      :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed"
      :file-list="fileList" list-type="picture" :before-upload="beforeAvatarUpload">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-button type="primary" @click="Export()">导出</el-button>
  </div>
</template>

<script>
// import axios from 'axios';
// import { downloadExcel } from '../../units/index.js';

// import axios from 'axios';

// import { getToken } from '../../units/auth.js';
export default {
  name: '',
  data () {
    return {
      fileList: [],
      iframeUrl: '',

    }
  },
  methods: {
    // 上传之前
    beforeAvatarUpload (file) {
      console.log(file);
      const isIMG =
        file.type === 'image/jpg' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'   // docx文档、
      if (!isIMG) {
        this.$message.error('上传头像片只支持jpg、JPEG、png、docx格式!')
      }
      return isIMG
    },
    //删除成功后
    handleRemove (file, fileList) {
      console.log('删除成功' + file, fileList);
    },
    // 文件上传个数
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    // 删除之前
    beforeRemove (file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 上传成功
    handleSuccess (res, file, fileList) {
      console.log('上传成功' + res, file, fileList);
    },

    // 导出
    // async Export () {
    //   try {
    //     const params = {
    //       endTime: this.searchForm.endTime,
    //       startTime: this.searchForm.startTime
    //     };
    //     const url =
    //       process.env.VUE_APP_BASE_API +
    //       '/test/unqualifiedExcel?startTime=' + params.startTime
    //       + '&endTime=' + params.endTime;
    //     axios
    //       .get(url, {
    //         headers: {
    //           token: await getToken()
    //         },
    //         responseType: 'blob'
    //       })
    //       .then(res => {
    //         downloadExcel(res.data, '不合格台账');
    //       });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

  }
}
</script>

<style scoped>
</style>