<template>
  <div>
    <el-row>
      <el-col :span="24">
        <p class="header_title">流程查询</p>
        <div style="width: 100%;height: auto">
          <el-form :inline="true">
            <!-- <el-form-item style="float: left" label-width="50">
              <el-button type="warning" size="small" icon="el-icon-plus" @click="hanldeAdd()">新增</el-button>
            </el-form-item>-->
            <!-- <el-form-item style="float: left" label-width="50">
              <el-button type="success" size="small" @click="hanldeAdd">新增</el-button>
              <el-button type="success" size="small" @click="hanldePutaway">上架</el-button>
              <el-button type="success" size="small" @click="hanldeSoldout">下架</el-button>
              <el-button type="success" size="small" @click="hanldeSomeDelete">删除</el-button>
            </el-form-item>-->
            <el-form-item style="float: left">
              <el-input type="text" size="small" placeholder="请输入流程名称" v-model="searchData.title"></el-input>
            </el-form-item>
            <!-- <el-form-item style="float: left;" label>
              <el-date-picker
                size="small"
                v-model="searchDate"
                type="daterange"
                align="right"
                unlink-panels
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="创建时间"
                end-placeholder="更新时间"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>-->
            <el-form-item style="float: left">
              <el-select size="small" style="width: 100px;" v-model="searchData.status" clearable>
                <el-option
                  v-for="(item, key, index) in state_list"
                  :key="index"
                  :label="item"
                  :value="key"
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
            <el-table-column label="流水号" align="center" width="160">
              <template slot-scope="scope">
                <span>{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="流程类型" align="center" width="160">
              <template slot-scope="scope">
                <span>{{ scope.row.inventory }}</span>
              </template>
            </el-table-column>
            <el-table-column label="流程名称" align="center">
              <template slot-scope="scope">
                <span class="color" @click="handleDetails(scope.row)">{{ scope.row.startDate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="紧急程度" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.endDate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="发起人" align="center" width="140">
              <template slot-scope="scope">
                <span>{{scope.row.issueNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="当前步骤" align="center" width="140">
              <template slot-scope="scope">
                <span>{{scope.row.price}}</span>
              </template>
            </el-table-column>
            <el-table-column label="发起时间" align="center" width="140">
              <template slot-scope="scope">
                <span>{{scope.row.price2}}</span>
              </template>
            </el-table-column>
            <el-table-column label="上一步处理人" align="center" width="140">
              <template slot-scope="scope">
                <span>{{scope.row.price3}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="内容" align="center" width="100">
              <template slot-scope="scope">
                <span
                  @click="showModal(scope.row.content)"
                  class="warning-state"
                  style="cursor: pointer"
                >查看</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="100" align="center">
              <template slot-scope="scope">
                <span
                  :class="scope.row.status==='1'?'success-state':''||scope.row.status==='0'?'error-state':''"
                >{{ state_list[scope.row.status] }}</span>
              </template>
            </el-table-column>-->
            <!-- <el-table-column label="操作" fixed="right" width="120" align="center">
              <template slot-scope="scope">
                <span class="color" @click="handleEdit(scope.$index, scope.row.id)">编辑</span>
                <span class="color" @click="handleDelete(scope.$index, scope.row.id)">删除</span>
              </template>
            </el-table-column>-->
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
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
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
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      state_list: {
        1: "启用",
        0: "禁用"
      },
      selection: [],
      tableData: [], // 用于存放数据
      searchDate: "",
      searchData: {
        title: "",
        status: "",
        delStatus: "1",
        typeId: ""
      },
      page: {
        total: 0
      },
      URLparams: {
        pageNumber: 1,
        pageSize: 10
      },
      data: [],
      dialog: []
    };
  },
  created() {
    // this.init();
    this.tableData = [
      {
        title: 20200501015,
        inventory: "因公出台流程",
        startDate: "20200520编号测试",
        endDate: "一般",
        issueNum: "管理员",
        price: "经办人",
        price2: "2020-05-20",
        price3: "国际处"
      }
    ];
    this.page.total = 1;
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
      this.$api.coupon
        .list(this.URLparams, this.searchData)
        .then(res => {
          if (res.data) {
            this.tableData = res.data;
            this.page.total = res.count;
          }
          this.loading = false;
        })
        .catch(error => {
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
      this.$router.push("/server/coupon/add");
    },
    handleEdit(index, id) {
      this.$router.push("/server/coupon/" + id);
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
    hanldePutaway() {
      if (this.selection.length === 0) {
        this.$message.error("请选择一条数据上架！");
      } else {
        const del = [];
        this.selection.map(item => {
          item.status = "1";
        });
        this.$api.coupon
          .edits(this.selection)
          .then(res => {
            this.$message.success(res.message);
          })
          .catch(err => {
            this.$message.error("删除失败！");
          });
      }
    },
    hanldeSoldout() {
      if (this.selection.length === 0) {
        this.$message.error("请选择一条数据上架！");
      } else {
        const del = [];
        this.selection.map(item => {
          item.status = "0";
        });
        this.$api.coupon
          .edits(this.selection)
          .then(res => {
            this.$message.success(res.message);
          })
          .catch(err => {
            this.$message.error("删除失败！");
          });
      }
    },
    handleDelete(index, id) {
      this.$api.coupon.delete({ ids: id }).then(res => {
        this.$message.success(res.message);
        this.tableData.splice(index, 1);
        this.page.total--;
      });
    },
    hanldeSomeDelete() {
      if (this.selection.length === 0) {
        this.$message.error("请选择一条数据删除！");
      } else {
        const del = [];
        this.selection.map(item => {
          if (this.tableData.indexOf(item) != -1) {
            del.push(item.id);
          }
        });
        this.$api.coupon
          .delete({ ids: del })
          .then(res => {
            this.selection.map(item => {
              if (this.tableData.indexOf(item) != -1) {
                this.tableData.splice(this.tableData.indexOf(item), 1);
              }
            });
            this.$message.success(res.message);
          })
          .catch(err => {
            this.$message.error("删除失败！");
          });
      }
    },
    showModal(content) {
      this.content = content;
      this.visible = true;
    },
    hanldeFirst() {},
    hanldeFinally() {}
  }
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
