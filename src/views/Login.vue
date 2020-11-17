<template>
  <div class="login_panel">
    <div class="bg_layer"></div>
    <h2>广东外语外贸大学外事系统</h2>
    <el-form ref="loginForm" :model="form" :rules="rules" class="login-box">
      <h3 class="login-title">{{ $t("login.system") }}</h3>
      <el-form-item prop="username">
        <el-input
          size="small"
          type="text"
          prefix-icon="el-icon-user"
          placeholder="请输入账号"
          v-model="form.username"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          size="small"
          type="password"
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
          v-model="form.password"
          clearable
        ></el-input>
      </el-form-item>
      <!-- <el-form-item size="small" label="用户角色" prop="status">
        <el-select style="width: 250px;" v-model="form.status" placeholder="请选择用户角色" clearable>
          <el-option v-for="item in state_list" :key="item.id" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </el-form-item>-->
      <!-- <el-radio-group v-model="form.resource">
            <el-radio label="0">{{$t('login.facultyAndStaff')}}</el-radio>
            <el-radio label="1">{{$t('login.student')}}</el-radio>
            <el-radio label="2">{{$t('login.foreignExperts')}}</el-radio>
      </el-radio-group>-->
      <el-button
        class="login_btn"
        type="success"
        size="small"
        icon="el-icon-switch-button"
        @click="onSubmit"
        >{{ $t("login.login") }}</el-button
      >
    </el-form>
  </div>
</template>

<script>
import power from "../utils/power.js";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        status: "",
      },
      state_list: [
        {
          label: "教职工",
          id: "1",
        },
        {
          label: "外籍专家",
          id: "2",
        },
        {
          label: "学生",
          id: "3",
        },
        {
          label: "校外人员",
          id: "4",
        },
      ],
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          { required: true, message: "账号不可为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不可为空", trigger: "blur" },
        ],
        status: [
          { required: true, message: "角色不可为空", trigger: "change" },
        ],
      },
    };
  },
  mounted() {},
  created() {
    let that = this;
    document.onkeypress = function (e) {
      const keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.onSubmit(); // 方法名
        return false;
      }
    };
  },
  methods: {
    onSubmit() {
      // 为表单绑定验证功能
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          this.$api.login(this.form).then((res) => {
            if (res.status === 200) {
              this.$store.commit("GET_LOGIN", true);
              this.$store.commit("GET_TOKEN", res.data.token);
              this.$store.commit("SET_LAYOUT", "");
              this.$store.commit("GET_POWERLIST", JSON.stringify(power));
              this.$store.commit("SET_LOGINLIST", JSON.stringify(res.data));
              this.$store.commit("GET_SELECTINDEX", 0);
              sessionStorage.setItem("login", true);
              sessionStorage.setItem("selectIndex", 0);
              this.$message.success(res.message);
              this.$router.replace("/");
            } else {
              this.$message.error(res.message);
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="stylus">
.login_panel {
  display: flex;
  align-items: center;
  // justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  position: relative;
  height: 100%;
  flex-direction: column;
}

.bg_layer {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: '../common/images/login.jpg';
  // background-size: cover;
  // background-position: center;
  // background-repeat: no-repeat;
  filter: blur(8px);
}

h2 {
  position: relative;
  top: 150px;
  font-size: 40px;
  text-align: center;
}

.login-box {
  position: relative;
  top: -50px;
  border: 1px solid $theme-color;
  width: 420px;
  margin: auto;
  padding: 50px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #333;
  background: rgba(255, 255, 255, 1); /* background: rgba(255, 255, 255, 0.7); */
}

.login-title {
  /* text-align: center; */
  margin: 0 auto 20px auto;
  color: #303133;
}

.el-button--success {
  background-color: $theme-color;
  border-color: $theme-color;
}

.login_btn, .el-input {
  width: 100%;
  text-align: center;
  margin: auto;
}

.el-form-item {
  margin-bottom: 16px;
}

.login-box /deep/ .el-form-item__label {
  font-weight: 900;
  font-size: 14px;
  color: #000;
}

.el-form-item /deep/ .el-form-item__label::before {
  display: none !important;
}

.code {
  /* margin-left: 15px; */
  /* width: 100px; */
  height: 55px;
  line-height: 55px;
  text-align: center; /* background-color: #97b968; */
  border-radius: 5px;
}
</style>
