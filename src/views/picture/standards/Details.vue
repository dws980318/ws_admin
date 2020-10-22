<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form :model="form" ref="checkForm" label-width="200px" :rules="formrules">
        <el-form-item v-if="form.id" label="id：" prop="id">
          <p>{{form.id}}</p>
        </el-form-item>
        <el-form-item label="区域：" prop="continent">
          <el-input v-model="form.continent" placeholder="请输入区域"></el-input>
        </el-form-item>
        <el-form-item label="国家（地区）：" prop="country">
          <el-input v-model="form.country" placeholder="请输入国家（地区）"></el-input>
        </el-form-item>
        <el-form-item label="城市：" prop="city">
          <el-input v-model="form.city" placeholder="请输入城市"></el-input>
        </el-form-item>
        <el-form-item label="币种：" prop="currency">
          <el-input v-model="form.currency" placeholder="请输入币种"></el-input>
        </el-form-item>
        <el-form-item label="住宿费（每人每天）：" prop="accommodation">
          <el-input v-model="form.accommodation" placeholder="请输入住宿费（每人每天）"></el-input>
        </el-form-item>
        <el-form-item label="伙食费（每人每天）：" prop="meals">
          <el-input v-model="form.meals" placeholder="请输入伙食费（每人每天）"></el-input>
        </el-form-item>
        <el-form-item label="公杂费（每人每天）：" prop="varied">
          <el-input v-model="form.varied" placeholder="请输入公杂费（每人每天）"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-left: 150px">
        <el-button size="small" type="primary" @click="dialogFormEdit('formEdit')">确 定</el-button>
        <el-button size="small" @click="$router.back()">取 消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    return {
      formrules: {
        continent: [{ required: true, message: "请输入区域", trigger: "blur" }],
        country: [
          { required: true, message: "请输入国家（地区）", trigger: "blur" },
        ],
        city: [{ required: true, message: "请输入城市", trigger: "blur" }],
        currency: [{ required: true, message: "请输入币种", trigger: "blur" }],
        accommodation: [
          {
            required: true,
            message: "请输入住宿费（每人每天）",
            trigger: "blur",
          },
        ],
        meals: [
          {
            required: true,
            message: "请输入伙食费（每人每天）",
            trigger: "blur",
          },
        ],
        varied: [
          {
            required: true,
            message: "请输入公杂费（每人每天）",
            trigger: "blur",
          },
        ],
      },
      form: {},
    };
  },
  created() {
    if (this.$route.params.id) {
      this.init(this.$route.params.id);
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    init(id) {
      this.$api.visitfundinfo.item({ id: id }).then((res) => {
        this.form = res.data;
      });
    },
    dialogFormEdit() {
      this.form.orderId = Date.parse(new Date());
      this.$refs["checkForm"].validate((valid) => {
        if (valid) {
          if (this.form.id) {
            this.$api.visitfundinfo
              .edit(this.form)
              .then((res) => {
                if (res.status === 200) {
                  this.$message.success(res.message);
                  this.$router.back();
                } else {
                  this.$message.error(res.message);
                }
              })
              .catch((err) => {
                this.$message.error("编辑失败！");
              });
          } else {
            this.$api.visitfundinfo
              .add(this.form)
              .then((res) => {
                if (res.status === 200) {
                  this.$message.success(res.message);
                  this.$router.back();
                } else {
                  this.$message.error(res.message);
                }
              })
              .catch((err) => {
                this.$message.error("添加失败！");
              });
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="stylus">
.el-input {
  width: 350px;
}

.form {
  width: 100%;
  max-width: 1400px;
  height: auto;
  padding: 50px 0;
}

.dialog /deep/ .el-dialog__body {
  // padding: 100px;
}

.details {
  padding: 20px 0;
}
</style>
