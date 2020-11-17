<template>
  <el-row>
    <p class="header_title">流程配置管理</p>
    <div style="width: 100%;height: auto">
      <el-form :inline="true">
        <el-form-item style="float: left" label-width="50">
          <el-button type="warning" size="small" icon="el-icon-plus" @click="hanldeAdd()">新增</el-button>
          <!-- <el-button type="danger" size="small" icon="el-icon-delete" @click="hanldeSomeDelete">批量删除</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <!--          :row-class-name="tableRowClassName"-->
      <!-- 根据状态选择样式-->
      <el-table
        :data="tableData"
        border
        :header-cell-style="{background:'#fafafa',color:'#E3853A'}"
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column label="id" prop="id" align="center" width="100"></el-table-column>
        <el-table-column label="模型名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="模型值" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.key }}</span>
          </template>
        </el-table-column>
        <el-table-column label="模型分类" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.category}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="160" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="title" :visible.sync="visible" top="10vh" width="30%">
      <div v-html="content"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
      <p style="font-size: 20px;">点击确定将删除该条数据</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDelete = false">取 消</el-button>
        <el-button type="primary" @click="dialogDelete">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisibleDelete1" width="30%">
      <p style="font-size: 20px;">点击确定将删除这些数据</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDelete1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogDelete1">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <el-dialog
      width="80%"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      :fullscreen="false"
      title="流程配置"
    >
      <div class="agreement_picture">
        <div class="pdf">
          <iframe
            :src="'../../../../static/static/static/modeler.html?modelId=' + src"
            frameborder="no"
            width="100%"
            height="800"
            border="0"
            marginwidth="0"
            marginheight="0"
            scrolling="no"
          ></iframe>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="tip-left transfer">
          <el-button @click="dialogVisible = false">返回</el-button>
        </div>
      </span>
    </el-dialog>-->
  </el-row>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      dialogVisibleDelete: false,
      dialogVisibleDelete1: false,
      ids: "",
      dialogVisible: false,
      src: "",
      title: "内容",
      visible: false,
      content: "<p>123123123123</p>",
      loading: false,
      selection: [],
      tableData: [], // 用于存放数据
      searchDate: "",
      page: {
        total: 0,
      },
      show: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    handleNodeClick(node, data) {
      console.log(data);
      this.show = true;
    },
    init() {
      this.loading = true;
      this.$api.models
        .list()
        .then((res) => {
          this.tableData = res.models;
          this.page.total = res.models.length;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    hanldeSeach() {
      // 搜索
      this.init(this.searchData);
      console.log(this.searchDate);
    },
    handleSelectionChange(val) {
      this.selection = val;
    },
    handleDetails() {
      this.$store.commit("GET_TOPATH", "/picture/visit3/list");
      this.$store.commit("GET_SELECTINDEX", 2);
      this.$store.commit("GET_COMMONSHOW", false);
      this.$router.push("/picture/visit3/list");
    },
    hanldeAdd() {
      // 添加
      this.$router.push("/article/coupon/add");
    },
    handleEdit(index, id) {
      // this.dialogVisible = true
      // this.src = id
      // this.$router.push("/article/coupon/" + id);
      window.open("http://192.168.0.195:8081/modeler.html?modelId=" + id);
    },
    handleSizeChange(val) {
      this.URLparams.pageNumber = 1;
      this.URLparams.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.URLparams.pageNumber = val;
      this.init();
    },
    handleDelete(index, id) {
      this.dialogVisibleDelete = true;
      this.ids = id;
    },
    dialogDelete() {
      this.$api.models
        .delete({ modelId: this.ids })
        .then((res) => {
          this.dialogVisibleDelete = false;
          this.$message.success(res.message);
          this.init();
        })
        .catch((err) => {
          this.$message.error("删除失败！");
        });
    },
    hanldeSomeDelete() {
      if (this.selection.length > 0) {
        this.dialogVisibleDelete1 = true;
      } else {
        this.$message.error("请至少选择一条数据删除！");
      }
    },
    dialogDelete1() {
      const del = [];
      this.selection.map((item) => {
        del.push(item.id);
      });
      const ids = del.join(",");
      this.$api.models
        .delete({ modelId: ids })
        .then((res) => {
          this.selection.map((item) => {
            this.init();
          });
          this.$message.success(res.message);
          this.dialogVisibleDelete1 = false;
        })
        .catch((err) => {
          this.$message.error("删除失败！");
        });
    },
  },
};
</script>

<style scoped lang="stylus">
.tree {
  /deep/ .el-tree {
    .el-tree-node {
      // margin-top: 5px;
    }

    .is-current > .el-tree-node__content {
      background-color: rgb(255, 255, 255);
      color: rgb(64, 158, 255);
    }

    .is-checked > .el-tree-node__content {
      background-color: rgb(255, 255, 255);
      color: rgb(64, 158, 255);
    }
  }
}

.el-input {
  width: 300px;
}

.preview {
  width: 240px;
  height: auto;
}

.thumbnail {
  width: 80%;
  height: auto;
}

.thumbnail_big {
  width: 360px;
  height: auto;
}

.warning-state {
  color: #e3853a;
}

.success-state {
  color: #67c23a;
}

.error-state {
  color: #f56c6c;
}

.color {
  color: $theme-color;

  &:hover {
    color: #67c23a;
    cursor: pointer;
    border-bottom: 1px solid;
  }
}

.list-box {
  max-height: 300px;
  overflow-y: auto;
}

.sub-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 5px;
}

.op-box span:hover {
  color: #67c23a;
  cursor: pointer;
  border-bottom: 1px solid;
}

/* 全选 */
.el-table /deep/ .DisabledSelection .cell .el-checkbox__inner {
  display: none;
  position: relative;
}

.el-table /deep/ .DisabledSelection .cell:before {
  content: '选择';
  position: absolute;
  left: 11px;
}

/* 全选 */
.btn-box {
  display: flex;
  flex-direction: column;
  height: 300px;
  padding: 50px 0;
  justify-content: space-between;
  margin-left: 10px;
}

.op-box span:hover {
  color: #67c23a;
  cursor: pointer;
  border-bottom: 1px solid;
}
</style>

