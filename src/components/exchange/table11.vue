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
        <el-table-column label="附件名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.roleName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="附件类型" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.roleCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="附件大小" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.remark}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createBy" label="创建人" align="center"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="updateBy" label="修改人" align="center"></el-table-column>
        <el-table-column prop="updateDate" label="修改时间" align="center"></el-table-column>
        <!-- <el-table-column label="授权" align="center">
              <template slot-scope="scope">
                <span class="color" @click="handleAssess(scope.$index, scope.row.id)">访问授权</span>
                <span class="color" @click="handleCategory(scope.$index, scope.row.id)">分类授权</span>
                <span class="color" @click="handleUser(scope.$index, scope.row.id)">成员授权</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="160" align="center">
              <template slot-scope="scope">
                <span
                  :class="scope.row.ph_state===1?'success-state':''||scope.row.ph_state===0?'error-state':''"
                >{{ state_list[scope.row.ph_state] }}</span>
              </template>
        </el-table-column>-->
        <el-table-column label="操作" fixed="right" width="240" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row.id)">上传</el-button>
            <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row.id)">查看</el-button>
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="URLparams.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="URLparams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
    <el-dialog :title="title" :visible.sync="visible" top="10vh" width="30%" center>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="visible = false">确定</el-button>
        <el-button @click="visible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    return {
      loading: false,
      title: "附件",
      visible: false,
      content: "<p>123123123123</p>",
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
      },
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  watch: {},
  created() {
    this.init();
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
    handleEdit(index, id) {
      this.visible = true;
    },
    handleDelete(index, id) {
      this.$api.role
        .delete({ ids: id })
        .then(res => {
          this.init();
          this.$message.success(res.message);
        })
        .catch(err => {
          this.$message.error("删除失败！");
        });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
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
