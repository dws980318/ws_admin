<template>
  <div>
    <el-row>
      <el-col :span="24">
        <p style="font-size:20px;line-height: 40px;color:#445566;">订单列表</p>
        <div style="width: 100%;height: auto">
          <el-form :inline="true">
            <!-- <el-form-item style="float: left" label-width="50">
              <el-button type="warning" size="small" icon="el-icon-plus" @click="hanldeAdd()">新增</el-button>
            </el-form-item>-->
            <el-form-item style="float: left" label-width="50"></el-form-item>
            <el-form-item style="float: left">
              <el-input
                style="width: 250px"
                type="text"
                size="small"
                placeholder="请输入买家名称"
                v-model="searchData.name"
              ></el-input>
            </el-form-item>
            <el-form-item style="float: left;" label>
              <el-date-picker
                size="small"
                v-model="searchDate"
                type="datetimerange"
                align="right"
                unlink-panels
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="创建时间"
                end-placeholder="更新时间"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
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
            <el-form-item style="float: left">
              <el-select
                size="small"
                style="width: 100px;"
                v-model="searchData.payStatus"
                clearable
              >
                <el-option
                  v-for="(item, key, index) in state_list2"
                  :key="index"
                  :label="item"
                  :value="key"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="float: left" label-width="50">
              <el-button type="success" size="small" icon="el-icon-search" @click="hanldeSeach()">搜索</el-button>
              <el-button type="success" size="small" @click="hanldeSeach()">导出</el-button>
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
            <el-table-column label="买家名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="买家电话" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column label="兑换商品截止日期" align="center" width="140px">
              <template slot-scope="scope">
                <span>{{ scope.row.endDate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="积分" align="center" width="80px">
              <template slot-scope="scope">
                <span>{{ scope.row.integral }}</span>
              </template>
            </el-table-column>
            <el-table-column label="卡券抵扣" align="center" width="80px">
              <template slot-scope="scope">
                <span>{{ scope.row.couponPrice }}</span>
              </template>
            </el-table-column>
            <el-table-column label="卡券" align="center" width="80px">
              <template slot-scope="scope">
                <span>{{ scope.row.couponId }}</span>
              </template>
            </el-table-column>
            <el-table-column label="描述" align="center" width="80">
              <template slot-scope="scope">
                <span
                  @click="showModal(scope.row.content)"
                  class="warning-state"
                  style="cursor: pointer"
                >查看</span>
              </template>
            </el-table-column>
            <el-table-column label="总金额" align="center" width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.amount }}</span>
              </template>
            </el-table-column>
            <el-table-column label="买家地址" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.address }}</span>
              </template>
            </el-table-column>
            <el-table-column label="支付方式" align="center" width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.payMode }}</span>
              </template>
            </el-table-column>
            <el-table-column label="支付状态" width="80" align="center">
              <template slot-scope="scope">
                <span
                  :class="scope.row.payStatus==='1'?'success-state':''||scope.row.payStatus==='0'?'error-state':''"
                >{{ state_list2[scope.row.payStatus] }}</span>
              </template>
            </el-table-column>
            <el-table-column label="订单状态" width="80" align="center">
              <template slot-scope="scope">
                <span
                  :class="scope.row.status==='2'?'success-state':''||scope.row.status==='1'?'error-state':''"
                >{{ state_list[scope.row.status] }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="100px" align="center">
              <template slot-scope="scope">
                <span class="color" @click="handleEdit(scope.$index, scope.row.id)">查看</span>
                <span class="color" v-if="scope.row.status === '2'" @click="handleCancel(scope.$index, scope.row)">核销</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total, prev, pager, next, jumper"
            :page-sizes="[10, 15, 20, 50]"
            :current-page="searchData.to"
            :page-size="page.pagesize"
            :total="page.total"
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
      title: "描述",
      visible: false,
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
        2: "未使用",
        1: "已核销"
      },
      state_list2: {
        1: "已支付",
        0: "未支付"
      },
      selection: [],
      tableData: [], // 用于存放数据
      searchDate: "",
      searchData: {
        name: "",
        status: "",
        payStatus: "",
        createDate: "",
        updateDate: ""
      },
      URLparams: {
        pageNumber: 1,
        pageSize: 10
      },
      page: {
        total: 0
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      this.$api.order
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
      if (this.searchDate) {
        this.searchData.createDate = this.searchDate[0];
        this.searchData.updateDate = this.searchDate[1];
      } else {
        this.searchData.createDate = "";
        this.searchData.updateDate = "";
      }
      this.init(this.searchData);
    },
    handleSelectionChange(val) {
      this.selection = val;
    },
    hanldeAdd() {
      // 添加
      this.$router.push("/articlearticle/order/add");
    },
    showModal(content) {
      this.content = content;
      this.visible = true;
    },
    handleEdit(index, id) {
      this.$router.push("/article/order/" + id);
    },
    handleCancel(index, row) {
      row.status = "1";
      this.$api.order
        .edit(row)
        .then(res => {
          this.$message.success(res.message);
        })
        .catch(err => {
          this.$message.error("修改失败！");
        });
    },
    handleDelete(index, id) {
      this.$api.DelServerContentItem(id).then(res => {
        this.$message.success(res.info);
        this.tableData.splice(index, 1);
        this.page.total--;
      });
    },
    // handleSizeChange(val) {
    //   this.page.currpage = 1
    //   this.page.pagesize = val
    //   this.init()
    // },
    handleCurrentChange(val) {
      this.searchData.to = val;
      this.init();
    }
  }
};
</script>

<style scoped lang="stylus">
.preview {
  width: 240px;
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
</style>
