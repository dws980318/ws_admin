<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form :model="form" ref="checkForm" label-width="150px" :rules="formrules">
        <el-form-item v-if="form.id" label="id：" prop="id">
          <p>{{form.id}}</p>
        </el-form-item>
        <el-form-item label="授权人：">
          <el-input disabled v-model="form.accreditUserId" placeholder="请输入授权人"></el-input>
        </el-form-item>
        <el-form-item label="部门：" prop="department">
          <el-select
            @change="selectAction"
            placeholder="请选择部门"
            style="width: 350px;"
            v-model="department"
            clearable
          >
            <el-option
              v-for="(item, key, index) in options"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接收人：" prop="userId">
          <el-select placeholder="请选择接收人" style="width: 350px;" v-model="form.userId" clearable>
            <el-option
              v-for="(item, key, index) in options1"
              :key="index"
              :label="item.accountname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="流程名称：" prop="accreditLabel">
          <el-select placeholder="请选择流程名称" style="width: 350px;" v-model="form.accreditLabel" clearable>
            <el-option
              v-for="(item, key, index) in options2"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间：" prop="startDate">
          <el-date-picker
            v-model="form.startDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：" prop="endDate">
          <el-date-picker
            v-model="form.endDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="状态：" prop="st_state">
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
        </el-form-item>-->
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
      department: "",
      formrules: {
        accreditUserId: [
          { required: true, message: "请输入授权人", trigger: "blur" },
        ],
        userId: [
          { required: true, message: "请选择接收人", trigger: "change" },
        ],
        accreditLabel: [
          { required: true, message: "请输入流程名称", trigger: "change" },
        ],
        startDate: [
          { required: true, message: "请输入开始时间", trigger: "blur" },
        ],
        endDate: [
          { required: true, message: "请输入结束时间", trigger: "blur" },
        ],
      },
      form: {},
      options: [],
      options1: [],
      options2: [],
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  created() {
    this.form.accreditUserId = JSON.parse(
      JSON.parse(localStorage.vuex).loginList
    ).accountname;
    this.departmentInit();
    this.modelInit();
    if (this.$route.params.id) {
      this.init(this.$route.params.id);
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    init(id) {
      this.$api.coupon.item({ id: id }).then((res) => {
        this.form = res.data;
      });
    },
    departmentInit() {
      let URLparams = {
        pageNumber: 1,
        pageSize: 10000,
      };
      this.$api.dept
        .form(URLparams)
        .then((res) => {
          this.options = res.data;
        })
        .catch((err) => {
          this.$message.error("查询失败！");
        });
    },
    modelInit() {
      this.$api.models
        .list()
        .then((res) => {
          this.options2 = res.models;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    selectAction() {
      let URLparams = {
        pageNumber: 1,
        pageSize: 10000,
      };
      let searchData = {
        departmentId: this.department,
      };
      this.$api.user
        .list(URLparams, searchData)
        .then((res) => {
          this.options1 = res.data;
        })
        .catch((err) => {
          this.$message.error("查询失败！");
        });
    },
    dialogFormEdit() {
      this.$refs["checkForm"].validate((valid) => {
        if (valid) {
          if (this.form.id) {
            this.$api.accredit
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
            this.$api.accredit
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
