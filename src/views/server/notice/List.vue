<template>
  <div>
    <el-row>
      <el-col :span="24">
        <p class="header_title">通知公告</p>
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
                placeholder="请输入通知名称"
                v-model="searchData.title"
              ></el-input>
            </el-form-item>
            <el-form-item style="float: left;" label>
              <el-date-picker
                @change="dateAction"
                size="small"
                v-model="searchDate"
                type="daterange"
                align="right"
                unlink-panels
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
            <el-form-item style="float: left">
              <el-select size="small" v-model="searchData.noticeType" clearable>
                <el-option
                  v-for="(item, key, index) in options"
                  :key="index"
                  :label="item.dicName"
                  :value="item.dicValue"
                ></el-option>
              </el-select>
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
            <!-- <el-table-column label="封面图" align="center">
              <template slot-scope="scope" v-if="scope.row.imageId">
                <el-popover trigger="hover" placement="top">
                  <img class="thumbnail_big" :src="scope.row.imageId" alt />
                  <div slot="reference" class="name-wrapper">
                    <img class="thumbnail" :src="scope.row.imageId" alt />
                  </div>
                </el-popover>
              </template>
            </el-table-column>-->
            <el-table-column label="公告名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="公告类型" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.noticeType }}</span>
              </template>
            </el-table-column>
            <el-table-column label="发布部门" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.issueDept }}</span>
              </template>
            </el-table-column>
            <el-table-column label="内容" align="center" width="140">
              <template slot-scope="scope">
                <span
                  @click="showModal(scope.row.content)"
                  class="warning-state"
                  style="cursor: pointer"
                >查看</span>
              </template>
            </el-table-column>
            <el-table-column label="发布人" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.updateBy}}</span>
              </template>
            </el-table-column>
            <el-table-column label="发布时间" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.updateDate}}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="100" align="center">
              <template slot-scope="scope">
                <span
                  :class="scope.row.issueStatus==='1'?'success-state':''||scope.row.issueStatus==='0'?'error-state':''"
                >{{ state_list[scope.row.issueStatus] }}</span>
              </template>
            </el-table-column>
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
        1: "已发布",
        0: "未发布",
      },
      selection: [],
      tableData: [], // 用于存放数据
      searchDate: [],
      searchData: {
        title: "",
      },
      page: {
        total: 0,
      },
      URLparams: {
        pageNumber: 1,
        pageSize: 10,
      },
      data: [],
      dialog: [],
      options: [],
    };
  },
  created() {
    this.getType();
    this.init();
  },
  methods: {
    //查询高级评论类型
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
    // 全选
    cellClass(row) {
      if (row.columnIndex === 0) {
        return "DisabledSelection";
      }
    },
    init() {
      this.loading = true;
      this.$api.notice
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
      this.init();
    },
    dateAction(val) {
      console.log(val);
      if (val) {
        this.searchData.searchDateStart = val[0];
        this.searchData.searchDateEnd = val[1];
      } else {
        this.searchData.searchDateStart = "";
        this.searchData.searchDateEnd = "";
      }
    },
    handleSelectionChange(val) {
      this.selection = val;
    },
    hanldeAdd() {
      // 添加
      this.$router.push("/server/notice/add");
    },
    handleEdit(index, id) {
      this.$router.push("/server/notice/" + id);
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
      this.$api.notice
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
      this.$api.notice
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
