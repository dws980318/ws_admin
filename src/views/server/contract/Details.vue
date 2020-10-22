<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form :model="form" ref="checkForm" label-width="150px" :rules="formrules">
        <el-form-item v-if="form.id" label="id：" prop="id">
          <p>{{form.id}}</p>
        </el-form-item>
        <el-form-item label="协议名称：" prop="title">
          <el-input v-model="form.title" placeholder="请输入协议名称"></el-input>
        </el-form-item>
        <el-form-item label="协议类型：" prop="agreementType">
          <el-select
            placeholder="请选择协议类型"
            style="width: 350px;"
            v-model="form.agreementType"
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
        <el-form-item label="发布部门：" prop="userDept">
          <el-select placeholder="请选择发布部门" style="width: 350px;" v-model="form.userDept" clearable>
            <el-option
              v-for="(item, key, index) in optionDept"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="重要程度：" prop="importanceType">
          <el-select
            placeholder="请选择重要程度"
            style="width: 350px;"
            v-model="form.importanceType"
            clearable
          >
            <el-option
              v-for="(item, key, index) in option"
              :key="index"
              :label="item.dicName"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="协议签署时间：" prop="startDate">
          <el-date-picker
            v-model="form.startDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="协议到期时间：" prop="endDate">
          <el-date-picker
            v-model="form.endDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="状态：" prop="st_state">
          <el-switch
            v-model="form.status"
            :active-value="'1'"
            :inactive-value="'2'"
            active-text="启用"
            inactive-text="禁用"
          ></el-switch>
        </el-form-item>
        <el-form-item label="协议附件：">
          <el-upload
            class="upload-demo"
            :before-upload="beforeUpload"
            :on-exceed="handleExceed"
            :on-success="handleSuccess"
            :action="$api.upload"
            multiple
            :limit="3"
            ref="upload"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <!-- <el-upload
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
          </el-upload>-->
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
        2: "未发布",
      },
      formrules: {
        title: [{ required: true, message: "请输入协议名称", trigger: "blur" }],
        agreementType: [
          { required: true, message: "请选择协议类型", trigger: "change" },
        ],
        userDept: [
          { required: true, message: "请选择发布部门", trigger: "change" },
        ],
        importanceType: [
          { required: true, message: "请选择重要程度", trigger: "change" },
        ],
        startDate: [{ required: true, message: "请选择协议签署时间", trigger: "blur" }],
        endDate: [{ required: true, message: "请选择协议到期时间", trigger: "blur" }],
        content: [
          { required: true, message: "请输入协议内容", trigger: "blur" },
        ],
      },
      form: {},
      dialogImageUrl: "",
      option: [
        {
          dicName: "一般",
          dicValue: "1",
        },
        {
          dicName: "重要",
          dicValue: "2",
        },
      ],
      options: [],
      dialogVisible: false,
      fileList: [],
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
    //查询类型
    getType() {
      let URLparams = {
        pageNumber: 1,
        pageSize: 1000,
      };
      let searchData = {
        dicType: "合作协议的类型",
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
    goBack() {
      this.$router.back();
    },
    init(id) {
      this.$api.agreement.item({ id: id }).then((res) => {
        this.form = res.data;
      });
    },
    beforeUpload(file) {},
    handleExceed() {
      console.log("文件超出限制!");
    },
    handleSuccess(data) {
      file.name = res.fileRealName;
      file.url = res.fileName;
    },
    handlePreview(file) {
      window.open(this.$api.download + file.url);
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
            this.$api.agreement
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
            this.$api.agreement
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
