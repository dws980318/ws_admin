<template>
  <div class="details">
    <div class="form">
      <el-form :model="form" ref="checkForm" label-width="100px" :rules="formrules">
        <el-form-item label="原密码：" prop="oldPassword">
          <el-input size="small" v-model="form.oldPassword" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="password">
          <el-input size="small" v-model="form.password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="verifyPassword">
          <el-input size="small" v-model="form.verifyPassword" placeholder="请确认密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-left: 100px">
        <el-button size="small" type="primary" @click="dialogFormEdit('formEdit')">确 定</el-button>
        <!-- <el-button size="small" @click="dialogVisiblePass = false">取 消</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 1) {
        callback(new Error("请输入6-16长的有效密码"));
      } else {
        if (this.form.verifyPassword !== "") {
          this.$refs.checkForm.validateField("verifyPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formrules: {
        oldPassword: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        verifyPassword: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ]
      },
      form: {
        oldPassword: "",
        password: "",
        verifyPassword: ""
      }
    };
  },
  created() {},
  methods: {
    dialogFormEdit() {
      this.$refs["checkForm"].validate(valid => {
        if (valid) {
          this.$api
            .updatePass(this.form)
            .then(res => {
              this.$message.success(res.message);
            })
            .catch(err => {
              this.$message.error("请输入6-16长的有效密码！");
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.el-input {
  width: 100%;
}
.form {
  padding: 20px;
}
</style>
