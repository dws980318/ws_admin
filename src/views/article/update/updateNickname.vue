<template>
  <div class="details">
    <div class="form">
      <el-form :inline="true" :model="form" ref="checkForm" label-width="100px" :rules="formrules">
        <el-form-item label class="btn_block" style="margin-left: 100px">
          <el-upload
            class="avatar-uploader"
            :action="$api.upload"
            :show-file-list="false"
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
        </el-form-item>
        <el-form-item size="small" label="用户名" prop="username">
          <el-input type="text" v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item size="small" label="手机" prop="accountname">
          <el-input type="text" v-model="form.accountname" placeholder="请输入手机"></el-input>
        </el-form-item>
        <el-form-item size="small" label="真实姓名" prop="realName">
          <el-input type="text" v-model="form.realName" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item size="small" label="年龄" prop="realName">
          <el-input type="text" v-model="form.realName" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item size="small" label="所属部门" prop="rolist">
          <el-select v-model="form.rolist" multiple placeholder="请选择所属部门">
            <el-option
              v-for="(item, key, index) in roleList"
              :key="index"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small" label="职务" prop="rolist">
          <el-select v-model="form.rolist" multiple placeholder="请选择职务">
            <el-option
              v-for="(item, key, index) in roleList"
              :key="index"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="btn_block" style="margin-left: 100px">
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
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        title: [{ required: true, message: "请输入昵称", trigger: "blur" }]
      },
      form: {},
      roleList: [{ roleName: "销售部", id: 1 }]
    };
  },
  created() {
    if (this.$route.params.id) {
      this.init(this.$route.params.id);
    }
  },
  methods: {
    init(id) {
      this.$api.text.item({ id: id }).then(res => {
        this.form = res.data;
      });
    },
     handleAvatarSuccess(res, file) {
      this.form.photo = res.fileName;
    },
    beforeAvatarUpload(file) {
      const isIMG = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/pjpeg",
        "image/gif",
        "image/bmp",
        "image/x-png"
      ];
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (isIMG.indexOf(file.type) === -1) {
        this.$message.error("上传文件只能是 图片 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
      return isIMG && isLt2M;
    },
    dialogFormEdit() {
      this.$refs["checkForm"].validate(valid => {
        if (valid) {
          if (this.form.id) {
            this.$api.text
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
            this.$api.text
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
  width: 300px;
}
.el-select {
  width: 300px;
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
.el-avatar {
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  overflow: hidden;
  color: #fff;
  
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  border-radius: 50%;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  display: block;
}
</style>
