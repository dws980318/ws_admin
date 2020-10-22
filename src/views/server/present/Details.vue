<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form :model="form" ref="checkForm" label-width="150px" :rules="formrules">
        <el-form-item v-if="form.id" label="id：" prop="id">
          <p>{{form.id}}</p>
        </el-form-item>
        <el-form-item label="礼品名称：" prop="presentName">
          <el-input v-model="form.presentName" placeholder="请输入礼品名称"></el-input>
        </el-form-item>
        <el-form-item label="礼品类型：" prop="presentType">
          <el-select
            placeholder="请选择礼品类型"
            style="width: 350px;"
            v-model="form.presentType"
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
        <el-form-item label="剩余数量：" prop="num">
          <el-input v-model="form.num" placeholder="请输入剩余数量"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="st_state">
          <el-switch
            v-model="form.issueStatus"
            :active-value="'1'"
            :inactive-value="'0'"
            active-text="启用"
            inactive-text="禁用"
          ></el-switch>
        </el-form-item>
        <el-form-item label="描述：" prop="content">
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
        presentName: [
          { required: true, message: "请输入礼品名称", trigger: "blur" },
        ],
        presentType: [
          { required: true, message: "请选择礼品类型", trigger: "change" },
        ],
        issueDept: [
          { required: true, message: "请选择发布部门", trigger: "change" },
        ],
        num: [{ required: true, message: "请输入剩余数量", trigger: "blur" }],
        content: [
          { required: true, message: "请输入礼品内容", trigger: "blur" },
        ],
      },
      form: {
        issueStatus: "0",
      },
      options: [],
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
        dicType: "涉外礼品的类型",
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
      this.$api.present.item({ id: id }).then((res) => {
        this.form = res.data;
      });
    },
    dialogFormEdit() {
      this.form.orderId = Date.parse(new Date());
      this.$refs["checkForm"].validate((valid) => {
        if (valid) {
          if (this.form.id) {
            this.$api.present
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
            this.$api.present
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
