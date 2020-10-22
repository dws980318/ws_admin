<template>
  <div class="details">
    <div class="form">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >内容管理</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer" style="margin-top: 20px">
        <el-button size="small" type="primary" @click="dialogFormEdit('formEdit')">确 定</el-button>
        <el-button size="small" @click="$router.back()">取 消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
const cityOptions = ["文档列表", "北京", "广州", "深圳"];
export default {
  name: "Details",
  data() {
    return {
      checkAll: false,
      checkedCities: ["上海", "北京"],
      cities: cityOptions,
      isIndeterminate: true
    };
  },
  created() {
    if (this.$route.params.id) {
      // this.init(this.$route.params.id);
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    goBack() {
      this.$router.back();
    },
    init(id) {
      this.$api.text.item({ id: id }).then(res => {
        this.form = res.data;
      });
    },
    beforeUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;
      //
      // if (!isJPG) {
      //   this.$message.error('上传图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
    },
    handleExceed() {
      this.$message.error("只能上传一张图片");
    },
    handleSuccess(data) {
      // console.log(data)
      // this.form.img = URL.createObjectURL(file.raw)
      this.form.image = data.fileName;
    },
    handleSuccesss(data) {
      // console.log(data)
      // this.form.img = URL.createObjectURL(file.raw)
      this.form.slideshow = data.fileName;
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
  width: 350px;
}
.el-textarea {
  width: 350px;
}
.form {
  padding: 10px;
}
</style>
