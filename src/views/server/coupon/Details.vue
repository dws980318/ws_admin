<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form ref="checkForm" :rules="formrules" :model="form" label-width="150px">
        <el-form-item label="模型名称" prop="modelName">
          <el-input type="text" v-model="form.modelName" placeholder="请输入模型名称"></el-input>
        </el-form-item>
        <el-form-item label="模型描述" prop="description">
          <el-input type="text" v-model="form.description" placeholder="请输入模型描述"></el-input>
        </el-form-item>
        <el-form-item label="模型key值" prop="key">
          <el-input type="text" v-model="form.key" placeholder="请输入模型key值"></el-input>
        </el-form-item>
        <el-form-item label="模型分类" prop="category">
          <el-input type="text" v-model="form.category" placeholder="请输入模型分类"></el-input>
        </el-form-item>
        <el-form-item label="创建人" prop="createBy" v-if="$route.params.id">
          <p>{{form.createBy}}</p>
        </el-form-item>
        <el-form-item label="创建时间" prop="createDate" v-if="$route.params.id">
          <p>{{form.createDate}}</p>
        </el-form-item>
        <el-form-item label="更新人" prop="updateBy" v-if="$route.params.id">
          <p>{{form.updateBy}}</p>
        </el-form-item>
        <el-form-item label="更新时间" prop="updateDate" v-if="$route.params.id">
          <p>{{form.updateDate}}</p>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="dialogFormEdit()">确 定</el-button>
          <el-button size="small" @click="$router.back()">取 消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    let checkData = (rule, value, callback) => {
      if (value) {
        if (/[\u4E00-\u9FA5]/g.test(value)) {
          // this.form.title = this.form.title.replace(/[!^\u4e00-\u9fa5]*/g, "");
          callback(new Error("账号不能为中文"));
        } else {
          callback();
        }
      }
      callback();
    };
    var checkUserCode = (rule, value, callback) => {
      if (!Number.isInteger(Number(value))) {
        callback(new Error("请输入正确职工号"));
      } else {
        callback();
      }
    };
    var checkAge = (rule, value, callback) => {
      if (!Number.isInteger(Number(value))) {
        callback(new Error("年龄必须为数字值"));
      } else {
        callback();
      }
    };
    return {
      options: [],
      formrules: {
        modelName: [
          { required: true, message: "请输入模型名称", trigger: "blur" },
        ],
        description: [
          { required: true, message: "请输入模型描述", trigger: "blur" },
        ],
        key: [{ required: true, message: "请输入模型key值", trigger: "blur" }],
        category: [
          { required: true, message: "请输入模型分类", trigger: "blur" },
        ],
      },
      form: {
      },
      rolist: [],
      roleList: [],
    };
  },
  watch: {},
  created() {},
  methods: {
    goBack() {
      this.$router.back();
    },
    dialogFormEdit() {
      this.$refs["checkForm"].validate((valid) => {
        if (valid) {
          this.$api.models
            .add(this.form)
            .then((res) => {
              if (res.status === 'success') {
                this.$message.success("新增成功！");
                this.$router.back();
              } else {
                this.$message.error("编辑失败！");
              }
            })
            .catch((err) => {
              this.$message.error("编辑失败！");
            });
          this.$store.commit("ROUTER_SHOW", true);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.el-input {
  width: 350px;
}
.el-select {
  width: 350px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  display: block;
}
</style>
