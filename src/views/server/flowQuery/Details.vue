<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form :model="form" ref="checkForm" label-width="150px" :rules="formrules">
        <el-form-item v-if="form.id" label="id：" prop="id">
          <p>{{form.id}}</p>
        </el-form-item>
        <el-form-item label="标题：" prop="title">
          <el-input size="small" v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="封面：">
          <el-upload
            class="upload-demo"
            drag
            :limit="1"
            :before-upload="beforeUpload"
            :on-exceed="handleExceed"
            :on-success="handleSuccess"
            :action="$api.upload"
          >
            <el-tooltip v-if="form.attachId1" :content="form.attachId1" placement="top">
              <img :src="$api.download + form.attachId1" class="img" />
            </el-tooltip>
            <div v-else>
              <i class="el-icon-upload"></i>
            </div>
            <div class="el-upload__text">
              将封面图拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="开始时间：" prop="startDate">
          <el-date-picker
            v-model="form.startDate"
            type="date"
            size="small"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：" prop="endDate">
          <el-date-picker
            v-model="form.endDate"
            type="date"
            size="small"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="库存：" prop="inventory">
          <el-input size="small" v-model="form.inventory" placeholder="请输入库存"></el-input>
        </el-form-item>
        <el-form-item label="发布数量：" prop="issueNum">
          <el-input size="small" v-model="form.issueNum" placeholder="请输入发布数量"></el-input>
        </el-form-item>
        <el-form-item label="抵用数额：" prop="price">
          <el-input size="small" v-model="form.price" placeholder="请输入抵用数额"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="st_state">
          <el-switch
            v-model="form.status"
            :active-value="'1'"
            :inactive-value="'0'"
            active-text="上架"
            inactive-text="下架"
          ></el-switch>
        </el-form-item>
        <el-form-item label="内容：" prop="content">
          <tinymce-editor v-model="form.content" ref="editor"></tinymce-editor>
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
import TinymceEditor from "@/components/editor/Editor";
export default {
  name: "Details",
  components: {
    "tinymce-editor": TinymceEditor
  },
  data() {
    return {
      state_list: {
        1: "上架",
        0: "下架"
      },
      formrules: {},
      form: {},
      dialogImageUrl: "",
      dialogVisible: false
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
      this.$api.coupon.item({ id: id }).then(res => {
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
      console.log("文件超出限制!");
    },
    handleSuccess(data) {
      console.log(data);
      // this.form.ph_picture = data.data;
      // this.form.img = URL.createObjectURL(file.raw)
      this.form.attachId1 = data.fileName;
    },
    handlePreview(file) {
      console.log(file);
    },
    dialogFormEdit() {
      this.form.orderId = Date.parse(new Date());
      this.$refs["checkForm"].validate(valid => {
        if (valid) {
          if (this.form.id) {
            this.$api.coupon
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
            this.$api.coupon
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
</style>
