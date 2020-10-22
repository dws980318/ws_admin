<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form ref="checkForm" :rules="formrules" :model="form" label-width="150px">
        <!-- <el-form-item label>
          <el-upload
            class="avatar-uploader"
            :action="$api.upload"
            :show-file-list="false"
            :headers="{Authorization: $store.state.token}"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="form.photo"
              :src="form.photo?($api.download + form.photo) : ''"
              class="avatar"
            />
            <el-avatar v-else :size="80">user</el-avatar>
            <div class="el-upload__tip" slot="tip">点击图片上传头像，只能上传jpg文件，且不超过2MB</div>
          </el-upload>
        </el-form-item>-->
        <el-form-item label="菜单名称" prop="menuName">
          <el-input type="text" v-model="form.menuName" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" prop="menuIcon">
          <el-input type="text" v-model="form.menuIcon" placeholder="请输入菜单图标"></el-input>
        </el-form-item>
        <el-form-item label="菜单链接" prop="menuUrl">
          <el-input type="text" v-model="form.menuUrl" placeholder="请输入菜单链接"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input type="text" v-model="form.orderNum" placeholder="请输入排序"></el-input>
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
        // menuName: [
        //   { required: true, message: "请输入菜单名称", trigger: "blur" }
        // ],
        // menuUrl: [
        //   { required: true, message: "请输入菜单链接", trigger: "blur" }
        // ]
      },
      form: {
        menuName: "",
        menuUrl: "",
        orderNum: ""
      },
      rolist: [],
      roleList: []
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
      this.loading = true;
      this.$api.menu
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
          if (this.$route.params.id) {
            this.$api.menu
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
            this.$api.menu
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
          this.$store.commit("ROUTER_SHOW", true);
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
