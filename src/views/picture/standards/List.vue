<template>
  <div>
    <el-row style="padding: 20px 0;">
      <el-col :span="24">
        <p class="header_title">开支标准</p>
        <div style="width: 100%;height: auto">
          <el-form :inline="true">
            <el-form-item style="float: left" label-width="50">
              <el-button type="warning" size="small" icon="el-icon-plus" @click="hanldeAdd()">新增</el-button>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                @click="hanldeSomeDelete"
              >批量删除</el-button>
            </el-form-item>
            <el-form-item style="float: left">
              <el-input
                type="text"
                clearable
                size="small"
                placeholder="请输入币种"
                v-model="searchData.currency"
              ></el-input>
            </el-form-item>
            <el-form-item style="float: left">
              <el-input
                type="text"
                clearable
                size="small"
                placeholder="请输入区域"
                v-model="searchData.continent"
              ></el-input>
            </el-form-item>
            <el-form-item style="float: left">
              <el-input
                type="text"
                clearable
                size="small"
                placeholder="请输入国家（地区）"
                v-model="searchData.country"
              ></el-input>
            </el-form-item>
            <el-form-item style="float: left" label-width="50">
              <el-button type="success" size="small" icon="el-icon-search" @click="hanldeSeach()">搜索</el-button>
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
            @selection-change="handleSelectionChange"
          >
            <el-table-column fixed="left" type="selection" align="center" width="55"></el-table-column>
            <el-table-column label="id" type="index" align="center" width="55"></el-table-column>
            <el-table-column label="区域" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.continent }}</span>
              </template>
            </el-table-column>
            <el-table-column label="国家（地区）" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.country }}</span>
              </template>
            </el-table-column>
            <el-table-column label="城市" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.city }}</span>
              </template>
            </el-table-column>
            <el-table-column label="币种" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.currency }}</span>
              </template>
            </el-table-column>
            <el-table-column label="住宿费（每人每天）" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.accommodation }}</span>
              </template>
            </el-table-column>
            <el-table-column label="伙食费（每人每天）" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.meals }}</span>
              </template>
            </el-table-column>
            <el-table-column label="公杂费（每人每天）" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.varied}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="状态" width="100" align="center">
              <template slot-scope="scope">
                <span
                  :class="scope.row.status==='1'?'success-state':''||scope.row.status==='0'?'error-state':''"
                >{{ state_list[scope.row.status] }}</span>
              </template>
            </el-table-column>-->
            <el-table-column label="操作" fixed="right" width="160" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row.id)"
                >编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row.id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="URLparams.currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="URLparams.pageSize"
            :total="page.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
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
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      dialogVisibleDelete: false,
      dialogVisibleDelete1: false,
      ids: "",
      title: "内容",
      visible: false,
      sortVisible: false,
      content: "<p>123123123123</p>",
      loading: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      state_list: {
        1: "启用",
        0: "禁用",
      },
      selection: [],
      tableData: [], // 用于存放数据
      searchDate: "",
      searchData: {},
      page: {
        total: 0,
      },
      URLparams: {
        pageNumber: 1,
        pageSize: 10,
      },
      data: [],
      dialog: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 全选
    cellClass(row) {
      if (row.columnIndex === 0) {
        return "DisabledSelection";
      }
    },
    init() {
      this.loading = true;
      this.$api.visitfundinfo
        .form(this.URLparams, this.searchData)
        .then((res) => {
          if (res.data) {
            this.tableData = res.data;
            this.page.total = res.count;
          }
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
    hanldeAdd() {
      // 添加
      this.$router.push("/picture/standards/add");
    },
    handleEdit(index, id) {
      this.$router.push("/picture/standards/" + id);
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
      this.$api.visitfundinfo
        .delete({ ids: this.ids })
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
      this.$api.visitfundinfo
        .delete({ ids: ids })
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
    showModal(content) {
      this.content = content;
      this.visible = true;
    },
    hanldeFirst() {},
    hanldeFinally() {},
  },
};
</script>

<style scoped lang="stylus">
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
  color: #2d7200;

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
