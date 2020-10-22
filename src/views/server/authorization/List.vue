<template>
  <div>
    <el-row>
      <el-col :span="24">
        <p class="header_title">工作授权</p>
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
            <el-form-item style="float: left" label-width="50">
              <el-button type="warning" size="small" icon="el-icon-plus" @click="hanldeAdd()">新增</el-button>
              <!-- <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                @click="hanldeSomeDelete"
              >批量删除</el-button>-->
            </el-form-item>
            <!-- <el-form-item style="float: left">
              <el-input
                type="text"
                size="small"
                placeholder="请输入流程名称"
                v-model="searchData.accreditLabel"
              ></el-input>
            </el-form-item> -->
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
            <!-- <el-form-item style="float: left" label-width="50">
              <el-button type="success" size="small" icon="el-icon-search" @click="hanldeSeach()">搜索</el-button>
            </el-form-item> -->
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
            <!-- <el-table-column fixed="left" type="selection" align="center" width="55"></el-table-column> -->
            <el-table-column label="id" type="index" align="center" width="55"></el-table-column>
            <el-table-column label="授权人" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.accreditUserId }}</span>
              </template>
            </el-table-column>
            <el-table-column label="接收人" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.userId}}</span>
              </template>
            </el-table-column>
            <el-table-column label="流程名称" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.accreditLabel}}</span>
                <!-- <span class="color" @click="handleDetails(scope.row)">{{ scope.row.startDate }}</span> -->
              </template>
            </el-table-column>
            <el-table-column label="开始时间" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.startDate}}</span>
              </template>
            </el-table-column>
            <el-table-column label="结束时间" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.endDate}}</span>
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
            <!-- <el-table-column label="操作" fixed="right" width="160" align="center">
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
        1: "因公出台流程1",
        0: "因公出台流程2",
        2: "因公出国类型1",
        3: "因公出国类型2",
      },
      selection: [],
      tableData: [], // 用于存放数据
      searchDate: "",
      searchData: {
        accreditLabel: "",
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
      powerList: [],
      loginList: {},
      options: [],
      options2: [],
    };
  },
  created() {
    this.modelInit();
    this.userInit();
    setTimeout(() => {
      this.init();
    }, 100);
    this.powerList = JSON.parse(JSON.parse(localStorage.vuex).powerList).list;
    this.loginList = JSON.parse(JSON.parse(localStorage.vuex).loginList);
    console.log(this.loginList);
  },
  methods: {
    // 全选
    cellClass(row) {
      if (row.columnIndex === 0) {
        return "DisabledSelection";
      }
    },
    modelInit() {
      this.$api.models
        .list()
        .then((res) => {
          this.options2 = res.models;
        })
        .catch((error) => {
          this.$message.error("查询失败！");
        });
    },
    userInit() {
      let URLparams = {
        pageNumber: 1,
        pageSize: 10000,
      };
      this.$api.user
        .list(URLparams)
        .then((res) => {
          this.options = res.data;
        })
        .catch((err) => {
          this.$message.error("查询失败！");
        });
    },
    init() {
      this.loading = true;
      this.$api.accredit
        .list(this.URLparams, this.searchData)
        .then((res) => {
          if (res.data) {
            let URLparams = {
              pageNumber: 1,
              pageSize: 10000,
            };
            for (let i in res.data) {
              for (let j in this.options) {
                res.data[i].accreditUserId = this.loginList.accountname;
                if (res.data[i].userId === this.options[j].id) {
                  res.data[i].userId = this.options[j].accountname;
                }
              }
              for (let j in this.options2) {
                if (res.data[i].accreditLabel === this.options2[j].id) {
                  res.data[i].accreditLabel = this.options2[j].name;
                }
              }
            }
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
    handleDetails(row) {
      this.$store.commit("GET_TOPATH", "/server/authorization");
      for (let i in this.powerList) {
        if (this.powerList[i].menuName === row.startDate) {
          // this.$store.commit("GET_SELECTINDEX", 2);
          this.$store.commit("GET_COMMONSHOW", false);
          this.$store.commit("GET_TABLENAME", this.powerList[i].menuName);
          if (this.powerList[i].num) {
            sessionStorage.num = this.powerList[i].num;
          }
          if (this.powerList[i].foreNum) {
            sessionStorage.foreNum = this.powerList[i].foreNum;
          }
          this.$router.push(this.powerList[i].menuUrl);
        }
      }
    },
    hanldeAdd() {
      // 添加
      this.$router.push("/server/authorization/add");
    },
    handleEdit(index, id) {
      this.$router.push("/server/authorization/" + id);
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
      this.$api.coupon.delete({ ids: id }).then((res) => {
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
        this.selection.map((item) => {
          if (this.tableData.indexOf(item) != -1) {
            del.push(item.id);
          }
        });
        this.$api.coupon
          .delete({ ids: del })
          .then((res) => {
            this.selection.map((item) => {
              if (this.tableData.indexOf(item) != -1) {
                this.tableData.splice(this.tableData.indexOf(item), 1);
              }
            });
            this.$message.success(res.message);
          })
          .catch((err) => {
            this.$message.error("删除失败！");
          });
      }
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
