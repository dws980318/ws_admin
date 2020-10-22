<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form ref="checkForm" :rules="formrules" :model="form" label-width="150px">
        <el-form-item label="部门名称" prop="name">
          <el-input type="text" v-model="form.name" placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="orderId">
          <el-input type="text" v-model="form.orderId" placeholder="请输入排序"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-switch
            v-model="form.status"
            :active-value="'1'"
            :inactive-value="'0'"
            active-text="启用"
            inactive-text="禁用"
          ></el-switch>
        </el-form-item>
        <el-form-item class="btn_block" label="创建人" prop="createBy" v-if="$route.params.id">
          <p>{{form.createBy}}</p>
        </el-form-item>
        <el-form-item class="btn_block" label="创建时间" prop="createDate" v-if="$route.params.id">
          <p>{{form.createDate}}</p>
        </el-form-item>
        <el-form-item class="btn_block" label="更新人" prop="updateBy" v-if="$route.params.id">
          <p>{{form.updateBy}}</p>
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
        name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
        orderId: [
          { required: true, message: "请输入排序", trigger: "blur" },
        ],
      },
      options: [],
      state_list: {
        1: "启用",
        0: "禁用",
      },
      form: {
        status: "1",
      },
    };
  },
  watch: {},
  created() {
    if (this.$route.params.id) {
      this.init();
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    init() {
      let URLparams = {
        pageNumber: 1,
        pageSize: 10000,
      };
      this.$api.dept
        .item({ id: this.$route.params.id })
        .then((res) => {
          this.$api.user.list(URLparams).then((response) => {
            for (let i in response.data) {
              if (res.data.createBy === response.data[i].id) {
                res.data.createBy = response.data[i].accountname;
              }
              if (res.data.updateBy === response.data[i].id) {
                res.data.updateBy = response.data[i].accountname;
              }
            }
          });
          setTimeout(() => {
            this.form = res.data;
          }, 100);
        })
        .catch((err) => {
          this.$message.error("查询失败！");
        });
    },
    dialogFormEdit() {
      this.$refs["checkForm"].validate((valid) => {
        if (valid) {
          if (this.$route.params.id) {
            delete this.form.createBy;
            delete this.form.createDate;
            delete this.form.updateBy;
            delete this.form.updateDate;
            this.$api.dept
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
            this.$api.dept
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
