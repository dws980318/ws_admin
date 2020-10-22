<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form ref="checkForm" :rules="formrules" :model="form" label-width="150px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input type="text" v-model="form.roleName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色代码" prop="roleCode">
          <el-input type="text" v-model="form.roleCode" placeholder="请输入角色代码"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="remark">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3 }"
            v-model="form.remark"
            placeholder="请输入角色描述"
          ></el-input>
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
    return {
      options: [],
      formrules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleCode: [
          { required: true, message: "请输入角色代码", trigger: "blur" }
        ],
        remark: [{ required: true, message: "请输入角色描述", trigger: "blur" }]
      },
      form: {
        roleName: "",
        roleCode: "",
        remark: ""
      }
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
        pageSize: 10000
      };
      this.$api.role
        .item({ id: this.$route.params.id })
        .then(res => {
          this.$api.user.list(URLparams).then(response => {
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
        .catch(err => {
          this.$message.error("查询失败！");
        });
    },
    dialogFormEdit() {
      this.$refs["checkForm"].validate(valid => {
        if (valid) {
          if (this.form.id) {
            this.$api.role
              .edit(this.form)
              .then(res => {
                if (res.status === 200) {
                  this.$message.success(res.message);
                  this.$router.back();
                } else {
                  this.$message.error(res.message);
                }
              })
              .catch(err => {
                this.$message.error("编辑失败！");
              });
          } else {
            this.$api.role
              .add(this.form)
              .then(res => {
                if (res.status === 200) {
                  this.$message.success(res.message);
                  this.$router.back();
                } else {
                  this.$message.error(res.message);
                }
              })
              .catch(err => {
                this.$message.error("添加失败！");
              });
          }
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
