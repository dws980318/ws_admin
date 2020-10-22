<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form :model="form" ref="checkForm" label-width="150px" :rules="formrules">
        <el-form-item v-if="form.id" label="id：" prop="id">
          <p>{{form.id}}</p>
        </el-form-item>
        <el-form-item label="公告名称：" prop="title">
          <el-input v-model="form.title" placeholder="请输入公告名称"></el-input>
        </el-form-item>
        <el-form-item label="公告类型：" prop="noticeType">
          <el-select
            placeholder="请选择公告类型"
            style="width: 350px;"
            v-model="form.noticeType"
            clearable
          >
            <el-option
              v-for="(item, key, index) in options"
              :key="index"
              :label="item.dicName"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布部门：" prop="issueDept">
          <el-select placeholder="请选择发布部门" style="width: 350px;" v-model="form.issueDept" clearable>
            <el-option
              v-for="(item, key, index) in optionDept"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="重要程度：" prop="typeId">
          <el-select placeholder="请选择重要程度" style="width: 350px;" v-model="form.endDate" clearable>
            <el-option
              v-for="(item, key, index) in option"
              :key="index"
              :label="item.dicName"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <!-- <el-form-item label="封面：">
          <el-upload
            class="upload-demo"
            drag
            :limit="1"
            :before-upload="beforeUpload"
            :on-exceed="handleExceed"
            :on-success="handleSuccess"
            :on-error="handleError"
            :action="$api.upload"
            :show-file-list="false"
          >
            <el-tooltip v-if="form.imageId" :content="form.imageId" placement="top">
              <img :src="form.imageId" class="img" />
            </el-tooltip>
            <div v-else>
              <i class="el-icon-upload"></i>
            </div>
            <div class="el-upload__text">
              将封面图拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
        </el-form-item>-->
        <el-form-item label="状态：" prop="st_state">
          <el-switch
            v-model="form.issueStatus"
            :active-value="'1'"
            :inactive-value="'0'"
            active-text="已发布"
            inactive-text="未发布"
          ></el-switch>
        </el-form-item>
        <el-form-item label="附件">
          <el-upload
            class="upload-demo"
            :action="$api.upload"
            :on-preview="handleAvatarPreview"
            :on-success="handleAvatarSuccess"
            :on-error="handleError"
            multiple
            ref="upload"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">公告附件列表</div>
          </el-upload>
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
    "tinymce-editor": TinymceEditor,
  },
  data() {
    return {
      state_list: {
        1: "已发布",
        0: "未发布",
      },
      formrules: {
        title: [
          { required: true, message: "请输入公告名称", trigger: "blur" },
        ],
        noticeType: [
          { required: true, message: "请选择公告类型", trigger: "change" },
        ],
        issueDept: [
          { required: true, message: "请选择发布部门", trigger: "change" },
        ],
        content: [
          { required: true, message: "请输入公告内容", trigger: "blur" },
        ],
      },
      form: {
        imageId: "",
        issueStatus: "0",
      },
      fileList: [],
      options: [],
      option: [
        {
          dicName: "一般",
          dicValue: "0",
        },
        {
          dicName: "重要",
          dicValue: "1",
        },
      ],
      optionDept: [],
    };
  },
  created() {
    this.getType();
    this.getDept();
    if (this.$route.params.id) {
      this.init(this.$route.params.id);
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    //查询类型
    getType() {
      let URLparams = {
        pageNumber: 1,
        pageSize: 1000,
      };
      let searchData = {
        dicType: "通知公告的类型",
      };
      this.$api.dic.list(URLparams, searchData).then((res) => {
        this.options = res.data;
      });
    },
    //查询部门
    getDept() {
      let URLparams = {
        pageNumber: 1,
        pageSize: 1000,
      };
      let searchData = {};
      this.$api.dept.form(URLparams, searchData).then((res) => {
        this.optionDept = res.data;
      });
    },
    init(id) {
      this.$api.notice.item({ id: id }).then((res) => {
        this.form = res.data;
        if (this.form.attachId) {
          var one = this.form.attachId.split(",");
          for (let i in one) {
            let two = one[i].split("|");
            let file = {
              name: two[0],
              url: two[1],
            };
            this.fileList.push(file);
          }
        }
      });
    },
    beforeUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    handleExceed() {
      console.log("文件超出限制!");
      this.$message.error("文件超出限制!");
    },
    handleSuccess(data) {
      this.form.imageId = data.fileDownloadUri;
    },
    handleAvatarPreview(file) {
      window.open(this.$api.download + file.url);
    },
    handleError(err, file, fileList) {
      console.log(err);
      if (err.type === "error") {
        this.$message.error("上传失败，请检查网络！");
      }
    },
    handleAvatarSuccess(res, file) {
      file.name = res.fileRealName;
      file.url = res.fileName;
    },
    getFile() {
      let files = this.$refs.upload.uploadFiles;
      let fileArr = [];
      files.map((item) => {
        fileArr.push(item.name + "|" + item.url);
      });
      let fileStr = fileArr.join(",");
      return fileStr;
    },
    dialogFormEdit() {
      this.form.attachId = this.getFile();
      this.form.orderId = Date.parse(new Date());
      this.$refs["checkForm"].validate((valid) => {
        if (valid) {
          if (this.form.id) {
            this.$api.notice
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
            this.$api.notice
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
</style>
