<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form ref="checkForm" :rules="formrules" :model="form" label-width="150px">
        <el-form-item label="字典名称" prop="dicName">
          <el-input type="text" v-model="form.dicName" placeholder="请输入字典名称"></el-input>
        </el-form-item>
        <el-form-item label="字典值" prop="dicValue">
          <el-input type="text" v-model="form.dicValue" placeholder="请输入字典值"></el-input>
        </el-form-item>
        <el-form-item label="所属类别" prop="dicType">
          <el-select
            @change="selectAction"
            placeholder="请选择所属类别"
            style="width: 350px;"
            v-model="form.dicType"
            clearable
          >
            <el-option
              v-for="(item, key, index) in options"
              :key="index"
              :label="item.typename"
              :value="item.typename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="dicOrder">
          <el-input type="text" v-model="form.dicOrder" placeholder="请输入排序"></el-input>
        </el-form-item>
        <el-form-item class="btn_block" label="更新时间" prop="updateDate" v-if="$route.params.id">
          <p>{{form.updateDate}}</p>
        </el-form-item>

        <el-form-item class="btn_block" style="margin-left: 150px;">
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
    return {
      options: [],
      formrules: {
        dicName: [
          { required: true, message: "请输入字典名称", trigger: "blur" },
        ],
        dicValue: [
          { required: true, message: "请输入字典值", trigger: "blur" },
        ],
        dicType: [
          { required: true, message: "请选择所属类别", trigger: "change" },
        ],
        dicOrder: [{ required: true, message: "请输入排序", trigger: "blur" }],
      },
      form: {},
    };
  },
  watch: {},
  created() {
    this.initType();
    if (this.$route.params.id) {
      this.init();
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    initType() {
      let URLparams = {
        pageNumber: 1,
        pageSize: 10000,
      };
      this.$api.dic
        .listType(URLparams)
        .then((res) => {
          this.options = res.data;
        })
        .catch((err) => {
          this.$message.error("查询失败！");
        });
    },
    init() {
      let URLparams = {
        pageNumber: 1,
        pageSize: 10000,
      };
      this.$api.dic
        .item({ id: this.$route.params.id })
        .then((res) => {
          this.form = res.data;
        })
        .catch((err) => {
          this.$message.error("查询失败！");
        });
    },
    dialogFormEdit() {
      this.$refs["checkForm"].validate((valid) => {
        if (valid) {
          this.$api.dic
            .addEdit(this.form)
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
          return false;
        }
      });
    },
    selectAction() {
      for (let i in this.options) {
        if (this.form.dicType === this.options[i].typename) {
          this.form.parentid = this.options[i].parentid;
        }
      }
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
