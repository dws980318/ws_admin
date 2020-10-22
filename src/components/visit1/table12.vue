<template>
  <div class="details">
    <div class="table">
      <el-table
        :data="tableData"
        border
        :header-cell-style="{background:'#fafafa',color:'#E3853A'}"
        v-loading="loading"
        style="width: 100%"
      >
        <!-- @selection-change="handleSelectionChange" -->
        <!-- <el-table-column fixed="left" type="selection" align="center" width="55"></el-table-column> -->
        <el-table-column label="id" type="index" align="center" width="55"></el-table-column>
        <el-table-column label="流程步骤" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.roleName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作人" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.roleCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作步骤" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.remark}}</span>
          </template>
        </el-table-column>
        <el-table-column label="下一步处理人" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.remark1}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="URLparams.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="URLparams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    return {
      loading: false,
      tableData: [], // 用于存放数据
      searchDate: "",
      searchData: {
        roleName: ""
      },
      page: {
        total: 0
      },
      URLparams: {
        pageNumber: 1,
        pageSize: 10
      }
    };
  },
  watch: {},
  created() {
     this.tableData = [
      {
        roleName: "中心领导审批",
        roleCode: "张三",
        remark: "转下一步",
        remark1: "张三"
      },
      {
        roleName: "国际处审批",
        roleCode: "张三",
        remark: "转下一步",
        remark1: "李四"
      },
      {
        roleName: "秘书处审批",
        roleCode: "李四",
        remark: "转下一步",
        remark1: "王五"
      },
      {
        roleName: "中心领导审批",
        roleCode: "张三",
        remark: "转下一步",
        remark1: "赵六"
      },
      {
        roleName: "秘书处审批",
        roleCode: "王五",
        remark: "转下一步",
        remark1: "钱七"
      },
      {
        roleName: "外交部审批",
        roleCode: "赵六",
        remark: "转下一步",
        remark1: "张三"
      }
    ];
    this.page.total = 6;
    // this.init();
  },
  methods: {
    init() {
      this.loading = true;
      this.$api.role
        .form(this.URLparams, this.searchData)
        .then(res => {
          this.tableData = res.data;
          this.page.total = res.count;
          this.loading = false;
        })
        .catch(err => {
          this.$message.error("查询失败！");
        });
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
  }
};
</script>

<style lang="stylus" scoped>
.table {
  padding: 0 20px;
}
</style>
