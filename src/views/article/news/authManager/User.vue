<template>
  <div>
    <el-row>
      <el-col :span="24">
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
            <el-table-column label="昵称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.ph_name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="最后登录时间" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.ph_time1}}</span>
              </template>
            </el-table-column>
            <el-table-column label="最后登录IP" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.ph_time1}}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="160" align="center">
              <template slot-scope="scope">
                <span
                  :class="scope.row.ph_state===1?'success-state':''||scope.row.ph_state===0?'error-state':''"
                >{{ state_list[scope.row.ph_state] }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center">
              <template slot-scope="scope">
                <span class="color" @click="handleEdit(scope.$index, scope.row.id)">编辑</span>
                <span class="color" @click="handleDelete(scope.$index, scope.row.id)">删除</span>
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
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
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
        1: "正常",
        0: "异常"
      },
      selection: [],
      tableData: [
        {
          ph_name: "Finance",
          ph_time1: "130",
          ph_time2: "2020-01-01 14:24",
          ph_sort: "125.89.64.66",
          ph_state: 1
        },
        {
          ph_name: "CT",
          ph_time1: "137",
          ph_time2: "2020-02-01 14:24",
          ph_sort: "117.136.79.92",
          ph_state: 1
        },
        {
          ph_name: "admin",
          ph_time1: "1050",
          ph_time2: "2020-01-01 14:24",
          ph_sort: "116.21.2.79",
          ph_state: 1
        }
      ], // 用于存放数据
      searchDate: "",
      searchData: {
        id: 1,
        lonTime: "",
        outTime: "",
        state: "",
        to: 1
      },
      page: {
        pagesize: 15,
        total: 1
      }
    };
  },
  watch: {
    "$route.params.list"(val, oldVal) {
      console.log(val);
    }
    // selectDate(val, oldVal) {
    //   if(val) {
    //     this.searchData.startDate = val[0]
    //     this.searchData.endDate = val[1]
    //   }
    // }
  },
  created() {
    // this.init()
  },
  methods: {
    init() {
      this.loading = true;
      this.$api
        .searchServerContentList(this.searchData)
        .then(res => {
          if (res.data) {
            this.tableData = res.data;
            this.page.total = res.total;
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
    },
    hanldeAdd() {
      // 添加
      this.$router.push("/article/news/add");
    },
    handleEdit(index, id) {
      this.$router.push("/article/news/" + index);
    },
    handleDelete(index, id) {
      this.$api.DelServerContentItem(id).then(res => {
        this.$message.success(res.info);
        this.tableData.splice(index, 1);
        this.page.total--;
      });
    },
    handleAssess(index, id) {
      this.$store.commit("authActiveAction", "1");
      sessionStorage.authManagers = index;
      this.$router.push("/article/news/authManager/access/" + index);
    },
    handleCategory(index, id) {
      this.$store.commit("authActiveAction", "2");
      sessionStorage.authManagers = index;
      this.$router.push("/article/news/authManager/category/" + index);
    },
    handleUser(index, id) {
      this.$store.commit("authActiveAction", "3");
      sessionStorage.authManagers = index;
      this.$router.push("/article/news/authManager/user/" + index);
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
