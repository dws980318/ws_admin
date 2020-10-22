<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form :inline="true">
        <el-form-item label-width="50">
          <el-button size="mini" type="primary" @click="dialogFormEdit">保存</el-button>
        </el-form-item>
      </el-form>
      <el-tree
        ref="tree"
        :data="data"
        show-checkbox
        default-expand-all
        @check-change="nodeClcik"
        :default-checked-keys="power"
        node-key="id"
        :props="defaultProps"
      ></el-tree>
      <!-- @node-click="nodeClcik" -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    return {
      data: [],
      defaultProps: {
        children: "mrlist",
        label: "menuName"
      },
      URLparams: {
        id: this.$route.params.id
      },
      listData: [],
      actionCode: "",
      proId: "",
      id: "",
      power: [],
      one: []
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
    nodeClcik(data, checked, checkedNodes) {
      console.log(data);
      console.log("checked", checked);
      console.log("checkedNodes", checkedNodes);
      if (checked === true) {
        data.isAction = "0";
      }
      if (checked === false && checkedNodes === false) {
        data.isAction = "1";
      }
    },
    init() {
      this.$api.menu
        .tree(this.URLparams)
        .then(res => {
          this.data = res.data.mrlist;
          this.power = this.getPower(this.data);
        })
        .catch(err => {
          this.$message.error("查询失败！");
        });
      this.loading = false;
    },
    getPower(data) {
      // let one = [];
      data.map(item => {
        if (item.hasOwnProperty("isAction")) {
          if (item.isAction === "0") {
            if (item.mrlist.length > 0) {
              this.getPower(item.mrlist);
            } else {
              this.one.push(item.id);
            }
          } else {
            if (item.mrlist) {
              this.getPower(item.mrlist);
            }
          }
        }
      });
      return this.one;
    },
    dialogFormEdit() {
      //对数据进行调整
      var nihao = this.data;
      let one = {
        roleId: this.$route.params.id,
        mrlist: nihao
      };
      this.$api.menu
        .editTree(one)
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
    }
  }
};
</script>

<style scoped>
.details {
  background-color: #fafafa;
}
.el-tree {
  background-color: #fafafa;
}
.form {
  padding: 50px 50px;
}
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
