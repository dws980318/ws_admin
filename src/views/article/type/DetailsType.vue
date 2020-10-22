<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form ref="checkForm" :rules="formrules" :model="form" label-width="150px">
        <el-form-item label="类型名称" prop="typename">
          <el-input type="text" v-model="form.typename" placeholder="请输入类型名称"></el-input>
        </el-form-item>
        <el-form-item label="所属类别" prop="parentid">
          <el-select placeholder="请选择所属类别" style="width: 350px;" v-model="form.parentid" clearable>
            <el-option
              v-for="(item, key, index) in options"
              :key="index"
              :label="item.typename"
              :value="item.typeid"
            ></el-option>
          </el-select>
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
        typename: [
          { required: true, message: "请输入类型名称", trigger: "blur" },
        ],
        parentid: [
          // { required: true, message: "请选择所属类别", trigger: "change" },
        ],
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
          if (this.$route.params.id) {
            for (let i in res.data) {
              if (this.$route.params.id === res.data[i].typeid) {
                console.log(res.data[i]);
                res.data.splice(i, 1); 
              }
              this.options = res.data;
            }
          } else {
            this.options = res.data;
          }
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
        .itemType({ id: this.$route.params.id })
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
          if (this.$route.params.id) {
            this.$api.dic
              .editType(this.form)
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
            this.$api.dic
              .addType(this.form)
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
          }
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
