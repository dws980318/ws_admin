<template>
  <el-row>
    <el-col class="tree" :span="5">
      <el-tree
        :data="data"
        :expand-on-click-node="false"
        :props="defaultProps"
        default-expand-all
        @node-click="handleNodeClick"
      ></el-tree>
    </el-col>
    <el-col :span="19" v-show="show">
      <el-row>
        <p class="header_title">流程一览表</p>
        <div style="width: 100%;height: auto">
          <v-search
            :searchData="URLparams.comformInfo.date"
            :searchShow="searchShow"
            @searchAction="searchAction"
          ></v-search>
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
            <!-- <el-table-column fixed="left" type="selection" align="center" width="55"></el-table-column> -->
            <el-table-column
              v-for="(item, index) in tabList"
              :key="index + Math.random()"
              :prop="item.value"
              :label="item.name"
              align="center"
            >
              <!-- <el-table-column
                v-for="(items, indexs) in item.tabList"
                :key="indexs"
                :prop="items.value"
                :label="items.name"
                align="center"
              >
              </el-table-column>-->
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="160" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)"
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
      </el-row>
      <el-dialog :title="title" :visible.sync="visible" top="10vh" width="30%">
        <div v-html="content"></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">关闭</el-button>
        </span>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <p style="font-size: 20px;">点击确定将删除该条数据</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogDelete">确 定</el-button>
        </span>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
import dataPower from "@/utils/dataPower.js";
import tabList1 from "@/common/js/tabList1.js";
import tabList2 from "@/common/js/tabList2.js";
import tabList3 from "@/common/js/tabList3.js";
import tabList4 from "@/common/js/tabList4.js";
import tabList5 from "@/common/js/tabList5.js";
import tabList6 from "@/common/js/tabList6.js";
import tabList7 from "@/common/js/tabList7.js";
import tabList8 from "@/common/js/tabList8.js";
import tabList9 from "@/common/js/tabList9.js";
import tabList10 from "@/common/js/tabList10.js";
import tabList11 from "@/common/js/tabList11.js";
import tabList12 from "@/common/js/tabList12.js";
import tabList13 from "@/common/js/tabList13.js";
import tabList14 from "@/common/js/tabList14.js";
import Search from "./search";
export default {
  name: "List",
  components: {
    "v-search": Search,
  },
  data() {
    return {
      data: dataPower,
      defaultProps: {
        children: "children",
        label: "label",
      },
      title: "内容",
      visible: false,
      sortVisible: false,
      dialogVisible: false,
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
        title: "",
        status: "",
        delStatus: "1",
        typeId: "",
      },
      page: {
        total: 0,
      },
      URLparams: {
        pageNumber: 1,
        pageSize: 10,
        comformInfo: {
          formId: "",
          date: {},
          mainformdates: [
            {
              formId: "",
              date: {},
            },
            {
              formId: "",
              date: {},
            },
            {
              formId: "",
              date: {},
            },
            {
              formId: "",
              date: {},
            },
          ],
        },
      },
      show: false,
      tabList: [],
      one: {},
      ids: "",
      tableName: "",
      powerList: [],
      searchShow: "",
    };
  },
  created() {
    this.powerList = JSON.parse(JSON.parse(localStorage.vuex).powerList).list;
  },
  methods: {
    a(row) {
      let id = "title";
      console.log(row);
      console.log(row[id]);
    },
    searchAction(data) {
      console.log(data);
      console.log(this.URLparams.comformInfo);
      this.init();
    },
    handleNodeClick(node, data) {
      console.log(data);
      this.URLparams.comformInfo.date = {};
      this.tableName = data.data.label;
      if (data.data.label === "因公出访流程") {
        this.show = true;
        this.tabList = tabList1;
        this.URLparams.comformInfo.formId = "";
        this.searchShow = "searchShow1";
      } else if (data.data.label === "涉外活动申请流程") {
        this.show = true;
        this.tabList = tabList2;
        this.URLparams.comformInfo.formId = "1301554539758166016";
        this.searchShow = "searchShow2";
        this.init();
      } else if (data.data.label === "涉外礼品申领流程") {
        this.show = true;
        this.tabList = tabList3;
        this.URLparams.comformInfo.formId = "1298423742407667712";
        this.searchShow = "searchShow3";
        this.init();
      } else if (data.data.label === "来访接待信息管理流程") {
        this.show = true;
        this.tabList = tabList4;
        this.URLparams.comformInfo.formId = "1304200030749179904";
        this.URLparams.comformInfo.mainformdates[0].formId =
          "1304200429178699776";
        this.searchShow = "searchShow4";
        this.init();
      } else if (data.data.label === "资料报送流程") {
        this.show = true;
        this.tabList = tabList5;
        this.URLparams.comformInfo.formId = "1301278198353408000";
        this.searchShow = "searchShow5";
        this.init();
      } else if (data.data.label === "海外名师申报流程") {
        this.show = true;
        this.tabList = tabList6;
        this.URLparams.comformInfo.formId = "1305607344704249856";
        this.URLparams.comformInfo.mainformdates[0].formId =
          "1305607611155800064";
        this.URLparams.comformInfo.mainformdates[1].formId =
          "1305607707549294592";
        this.searchShow = "searchShow6";
        this.init();
      } else if (data.data.label === "港澳台教师聘用流程") {
        this.show = true;
        this.tabList = tabList7;
        this.URLparams.comformInfo.formId = "1300888721827336192";
        this.searchShow = "searchShow7";
        this.init();
      } else if (data.data.label === "港澳台教师续聘流程") {
        this.show = true;
        this.tabList = tabList8;
        this.URLparams.comformInfo.formId = "1300888828056473600";
        this.URLparams.comformInfo.mainformdates[0].formId =
          "1300889855946166272";
        this.URLparams.comformInfo.mainformdates[1].formId =
          "1300889481105412096";
        this.searchShow = "searchShow8";
        this.init();
      } else if (data.data.label === "后勤维修流程") {
        this.show = true;
        this.tabList = tabList9;
        this.URLparams.comformInfo.formId = "1304199878923763712";
        this.searchShow = "searchShow9";
        this.init();
      } else if (data.data.label === "万人计划流程") {
        this.show = true;
        this.tabList = tabList10;
        this.URLparams.comformInfo.formId = "1300534909179232256";
        this.searchShow = "searchShow10";
        this.init();
      } else if (data.data.label === "协议签署申请流程") {
        this.show = true;
        this.tabList = tabList11;
        this.URLparams.comformInfo.formId = "1300535036409249792";
        this.searchShow = "searchShow11";
        this.init();
      } else if (data.data.label === "志愿者申请流程") {
        this.show = true;
        this.tabList = tabList12;
        this.URLparams.comformInfo.formId = "1305531145798873088";
        this.URLparams.comformInfo.mainformdates[0].formId =
          "1305531065498923008";
        this.URLparams.comformInfo.mainformdates[1].formId =
          "1305531242393694208";
        this.URLparams.comformInfo.mainformdates[2].formId =
          "1305531378733740032";
        this.URLparams.comformInfo.mainformdates[3].formId =
          "1305530963816411136";
        this.searchShow = "searchShow12";
        this.init();
      } else if (data.data.label === "经费预算申请流程") {
        this.show = true;
        this.tabList = tabList13;
        this.URLparams.comformInfo.formId = "1298703620245856256";
        this.searchShow = "searchShow13";
        this.init();
      } else if (data.data.label === "经费决算申请流程") {
        this.show = true;
        this.tabList = tabList14;
        this.URLparams.comformInfo.formId = "1298703738672029696";
        this.URLparams.comformInfo.mainformdates[0].formId =
          "1303355363651485696";
        this.searchShow = "searchShow14";
        this.init();
      }
    },

    deepClone(obj) {
      let _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
      return objClone;
    },
    init() {
      // let one = {};
      this.one = this.deepClone(this.URLparams);
      this.one.comformInfo = JSON.stringify(this.one.comformInfo);
      console.log(this.one);
      this.$api.base
        .list(this.one)
        .then((res) => {
          this.tableData = res.data;
          this.page.total = res.count;
        })
        .catch((error) => {
          this.$message.error("查询失败！");
        });
    },
    hanldeSeach() {
      // 搜索
      this.init();
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
    handleEdit(index, row) {
      sessionStorage.tableId = row.id;
      console.log(row);
      
      for (let i in this.powerList) {
        if (this.powerList[i].menuName === this.tableName) {
          this.$store.commit("GET_COMMONSHOW", true);
          this.$store.commit("GET_TABLENAME", this.powerList[i].menuName);
          if (this.powerList[i].num) {
            sessionStorage.num = this.powerList[i].num;
          }
          if (this.powerList[i].foreNum) {
            sessionStorage.foreNum = this.powerList[i].foreNum;
          }

          //广东外语外贸大学公务接待方案流程中英文切换的
          if (row.isEnglish === "0") {
            this.$store.commit("GET_VISITINGSHOW", false);
            sessionStorage.selectIndex4Show = 0;
            sessionStorage.isEnglish = 0;
          } else {
            this.$store.commit("GET_VISITINGSHOW", true);
            sessionStorage.selectIndex4Show = 1;
            sessionStorage.isEnglish = 1;
          }

          this.$router.push(this.powerList[i].menuUrl);
        }
      }
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
      this.dialogVisible = true;
      this.ids = id;
    },
    dialogDelete() {
      let one = this.deepClone(this.URLparams);
      let two = one.comformInfo;
      two.date = "";
      two.date = this.ids;
      two = JSON.stringify(two);
      console.log(two);
      this.$api.base.delete({ comformInfo: two }).then((res) => {
        this.$message.success(res.message);
        this.dialogVisible = false;
        this.init();
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
  width: 200px;
}

.el-select {
  width: 200px;
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

