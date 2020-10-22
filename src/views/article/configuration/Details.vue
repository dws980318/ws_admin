<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form ref="checkForm" :rules="formrules" :model="form" label-width="150px">
        <!-- <el-form-item label="bakTable" prop="bakTable">
          <el-input type="text" v-model="form.bakTable" placeholder="请输入bakTable"></el-input>
        </el-form-item>
        <el-form-item label="cancelorder" prop="cancelorder">
          <el-input type="text" v-model="form.cancelorder" placeholder="请输入cancelorder"></el-input>
        </el-form-item>
        <el-form-item label="cancelpage" prop="cancelpage">
          <el-input type="text" v-model="form.cancelpage" placeholder="请输入cancelpage"></el-input>
        </el-form-item>-->
        <el-form-item label="实体类名称" prop="classname">
          <el-input type="text" v-model="form.classname" placeholder="请输入实体类名称"></el-input>
        </el-form-item>
        <el-form-item label="父ID" prop="parentformid">
          <el-input type="text" v-model="form.parentformid" placeholder="请输入父ID"></el-input>
        </el-form-item>
        <el-form-item label="表单名称" prop="name">
          <el-input type="text" v-model="form.name" placeholder="请输入表单名称"></el-input>
        </el-form-item>
        <el-form-item label="数据库名称" prop="tablename">
          <el-input type="text" v-model="form.tablename" placeholder="请输入数据库名称"></el-input>
        </el-form-item>
        <!-- <el-form-item label="dataSrc" prop="dataSrc">
          <el-input type="text" v-model="form.dataSrc" placeholder="请输入dataSrc"></el-input>
        </el-form-item>
        <el-form-item label="datamodel" prop="datamodel">
          <el-input type="text" v-model="form.datamodel" placeholder="请输入datamodel"></el-input>
        </el-form-item>
        <el-form-item label="datapopedomcolumn" prop="datapopedomcolumn">
          <el-input type="text" v-model="form.datapopedomcolumn" placeholder="请输入datapopedomcolumn"></el-input>
        </el-form-item>
        <el-form-item label="datapopedomtype" prop="datapopedomtype">
          <el-input type="text" v-model="form.datapopedomtype" placeholder="请输入datapopedomtype"></el-input>
        </el-form-item>
        <el-form-item label="editgrid" prop="editgrid">
          <el-input type="text" v-model="form.editgrid" placeholder="请输入editgrid"></el-input>
        </el-form-item>
        <el-form-item label="enname" prop="enname">
          <el-input type="text" v-model="form.enname" placeholder="请输入enname"></el-input>
        </el-form-item>
        <el-form-item label="extclass" prop="extclass">
          <el-input type="text" v-model="form.extclass" placeholder="请输入extclass"></el-input>
        </el-form-item>
        <el-form-item label="formType" prop="formType">
          <el-input type="text" v-model="form.formType" placeholder="请输入formType"></el-input>
        </el-form-item>
        <el-form-item label="formheight" prop="formheight">
          <el-input type="text" v-model="form.formheight" placeholder="请输入formheight"></el-input>
        </el-form-item>
        <el-form-item label="formwidth" prop="formwidth">
          <el-input type="text" v-model="form.formwidth" placeholder="请输入formwidth"></el-input>
        </el-form-item>
        <el-form-item label="gridsaveclass" prop="gridsaveclass">
          <el-input type="text" v-model="form.gridsaveclass" placeholder="请输入gridsaveclass"></el-input>
        </el-form-item>
        <el-form-item label="grouping" prop="grouping">
          <el-input type="text" v-model="form.grouping" placeholder="请输入grouping"></el-input>
        </el-form-item>
         <el-form-item label="hintshowtype" prop="hintshowtype">
          <el-input type="text" v-model="form.hintshowtype" placeholder="请输入hintshowtype"></el-input>
        </el-form-item>
         <el-form-item label="iscurdept" prop="iscurdept">
          <el-input type="text" v-model="form.iscurdept" placeholder="请输入iscurdept"></el-input>
        </el-form-item>-->
        <el-form-item label="创建人" prop="createBy" v-if="$route.params.id">
          <p>{{form.createBy}}</p>
        </el-form-item>
        <el-form-item label="创建时间" prop="create_date" v-if="$route.params.id">
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
        classname: [
          { required: true, message: "请输入实体类名称", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入表单名称", trigger: "blur" }],
        tablename: [
          { required: true, message: "请输入数据库名称", trigger: "blur" },
        ],
      },
      form: {
        // bakTable: "",
        // cancelorder: "",
        // cancelpage: "",
        classname: "",
        name: "",
        tablename: "", // dataSrc: "",
        // datamodel: "",
        // datapopedomcolumn: "",
        // datapopedomtype: "",
        // editgrid: "",
        // enname: "",
        // extclass: "",
        // formType: "",
        // formheight: "",
        // formwidth: "",
        // gridsaveclass: "",
        // grouping: "",
        // hintshowtype: "",
        // iscurdept: "",
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
      this.$api.comForm
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
            this.$api.comForm
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
            this.$api.comForm
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
