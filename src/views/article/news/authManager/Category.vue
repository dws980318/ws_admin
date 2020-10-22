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
            :tree-props="{children: 'mlist'}"
            row-key="id"
          >
            <el-table-column label="id" type="index" align="center" width="55"></el-table-column>
            <el-table-column label="标识" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.fromid1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.picture }}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.fromid2 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="100" align="center">
              <template slot-scope="scope">
                <span
                  :class="scope.row.ph_state==='1'?'success-state':''||scope.row.ph_state==='0'?'error-state':''"
                >{{ state_list[scope.row.ph_state] }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" fixed="right" align="center">
              <template slot-scope="scope">
                <span class="color" @click="handleEdit(scope.$index, scope.row.id)">禁用</span>
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
      tableData: [
        {
          id: "01",
          fromid1: "alunbo",
          picture: "alunbo",
          fromid2: "	2018-08-16 12:05",
          ph_state: "1",
          mlist: [
            {
              id: "001",
              fromid1: "alunbo",
              picture: "alunbo",
              fromid2: "	2018-08-16 12:05",
              ph_state: "1"
            }
          ]
        }
      ], // 用于存放数据.
      state_list: {
        1: "异常",
        0: "正常"
      },
      searchDate: "",
      searchData: {
        lonTime: "",
        outTime: "",
        id: "",
        state: "",
        to: 1
      },
      page: {
        pagesize: 15,
        total: 0
      }
    };
  },
  created() {
    // this.init()
  },
  methods: {
    init() {
      this.loading = true;
      this.$api
        .searchServerSlideList(this.searchData)
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
    hanldeInfo() {
      this.$router.push("/picture/category/info");
    },
    hanldeAdd() {
      // 添加
      this.$router.push("/picture/category/add");
    },
    handleEdit(index, id) {
      this.$router.push("/picture/category/" + id);
    },
    handleDelete(index, id) {
      this.$api.DelServerSlideItem(id).then(res => {
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
