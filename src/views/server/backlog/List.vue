<template>
  <div>
    <el-row>
      <el-col :span="24">
        <p class="header_title">{{menuName}}</p>
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
            <el-table-column label="id" type="index" align="center" width="55"></el-table-column>
            <el-table-column label="流水号" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.serialNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column label="流程类型" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.activitiType }}</span>
              </template>
            </el-table-column>
            <el-table-column label="流程名称" align="center">
              <template slot-scope="scope">
                <span class="color" @click="handleDetails(scope.row)">{{ scope.row.activitiName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="紧急程度" align="center" width="160">
              <template slot-scope="scope">
                <span>{{ status_data[scope.row.urgencyDegree] }}</span>
              </template>
            </el-table-column>
            <el-table-column label="发起人" align="center" width="140">
              <template slot-scope="scope">
                <span>{{scope.row.initiateUserName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="当前步骤" align="center" width="140">
              <template slot-scope="scope">
                <span>{{scope.row.activitiProcess}}</span>
              </template>
            </el-table-column>
            <el-table-column label="发起时间" align="center" width="140">
              <template slot-scope="scope">
                <span>{{scope.row.initiateDate}}</span>
              </template>
            </el-table-column>
            <el-table-column label="上一步处理人" align="center" width="140">
              <template slot-scope="scope">
                <span>{{scope.row.lastDisposeUserName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="100" align="center">
              <template slot-scope="scope">
                <span
                  :class="scope.row.activitiStatus==='审结'?'success-state':''||scope.row.activitiStatus==='不通过'?'error-state':'' || 'warning-state'"
                >{{ scope.row.activitiStatus }}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="margin-top: 20px;"
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
  </div>
</template>

<script>
import menuPower from '@/utils/menuPower'
export default {
  name: "List",
  data() {
    return {
      loading: false,
      tableData: [], // 用于存放数据
      page: {
        total: 0,
      },
      URLparams: {
        pageNumber: 1,
        pageSize: 10,
      },
      status_data: {
        '1' : '一般',
        '2': '紧急',
      },
      powerList: menuPower.list,
      menuName: ''
    };
  },
  created() {
    this.getType();
    this.init();
    console.log(this.$route.params);
    if (sessionStorage.visitorsTit) {
       this.menuName = sessionStorage.visitorsTit
    }
  },
  methods: {
    //查询高级评论类型
    getType() {
      let URLparams = {
        pageNumber: 1,
        pageSize: 1000,
      };
      let searchData = {
        dicType: "审核的状态",
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
      let id = this.$route.params.id;
      this.$api
        .getbacklog(id, this.URLparams)
        .then((res) => {
          if (res.data) {
            for (let i in this.options) {
              for (let j in res.data) {
                if (this.options[i].dicValue === res.data[j].activitiStatus) {
                  console.log(j);
                  res.data[j].activitiStatus = this.options[i].dicName;
                }
              }
            }
            setTimeout(() => {
              console.log(res.data);
              this.tableData = res.data;
            }, 10);
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
    handleDetails(row) {
      // this.$message.error('功能还未完善不可跳转！')
      sessionStorage.tableId = row.businessKey;
      for (let i in this.powerList) {
        if (this.powerList[i].menuName === row.activitiName) {
          // this.$store.commit("GET_SELECTINDEX", 2);
          this.$store.commit("GET_COMMONSHOW", true);
          this.$store.commit("GET_TABLENAME", this.powerList[i].menuTit);
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
    handleSizeChange(val) {
      this.URLparams.pageNumber = 1;
      this.URLparams.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.URLparams.pageNumber = val;
      this.init();
    },
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
