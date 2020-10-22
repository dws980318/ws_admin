<template>
  <div class="details">
    <el-page-header @back="goBack" content="查看"></el-page-header>
    <div class="form">
      <el-form ref="checkForm" :model="form" label-width="150px">
        <el-form-item label="日志标题">
          <p>{{form.logName}}</p>
        </el-form-item>
        <el-form-item label="类名">
          <p>{{form.className}}</p>
        </el-form-item>
        <el-form-item label="方法名">
          <p>{{form.methodName}}</p>
        </el-form-item>
        <el-form-item label="日志内容">
          <p>{{form.content}}</p>
        </el-form-item>
        <el-form-item label="ip">
          <p>{{form.ip}}</p>
        </el-form-item>
        <el-form-item label="操作人">
          <p>{{form.userName}}</p>
        </el-form-item>
        <el-form-item label="操作世间">
          <p>{{form.createTime}}</p>
        </el-form-item>
<!--        <el-form-item>-->
<!--          <el-button size="small" type="primary" @click="dialogFormEdit()">确 定</el-button>-->
<!--          <el-button size="small" @click="$router.back()">取 消</el-button>-->
<!--        </el-form-item>-->
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Details",
    data() {
      return {
        options: [
          {
            id: 1,
            name: '影视艺术系'
          }, {
            id: 2,
            name: '外语系'
          }
        ],
        formrules: {

        },
        form: {

        }
      }
    },
    watch: {

    },
    created() {
      this.init()
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      init() {
        this.$api.log.item({id: this.$route.params.id}).then(res => {
          this.form = res.data
        }).catch(err => {
          this.$message.error('查询失败！')
        })
      },
      // dialogFormEdit() {
      //   this.$refs['checkForm'].validate((valid) => {
      //     if (valid) {
      //       // if (this.form.id) {
      //       //
      //       // } else {
      //       //
      //       // }
      //       this.$message.success('新增成功')
      //       this.$router.back()
      //     } else {
      //       return false;
      //     }
      //   });
      // }
    }
  }
</script>

<style scoped>
  .el-input{
    width: 350px;
  }
</style>
