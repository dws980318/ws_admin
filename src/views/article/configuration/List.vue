<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="table">
          <div style="width: 100%;height: auto;">
            <el-form :inline="true">
              <el-form-item label-width="50">
                <el-button type="success" size="small" icon="el-icon-plus" @click="hanldeAdd()">新增</el-button>
              </el-form-item>
              <el-form-item label-width="50">
                <el-button
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  @click="hanldeSomeDelete()"
                >批量删除</el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-table
            :data="tableData"
            border
            :header-cell-style="{background:'#fafafa'}"
            v-loading="loading"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <!-- 根据状态选择样式-->
            <el-table-column fixed="left" type="selection" align="center" width="55"></el-table-column>
            <el-table-column label="id" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="父ID" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.parentformid }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="classname" label="实体类名称"></el-table-column>
            <!-- <el-table-column prop="createBy" label="创建人"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" :show-overflow-tooltip="true"></el-table-column>-->
            <el-table-column prop="name" label="表单名称" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="tablename" label="数据库名称"></el-table-column>
            <!-- <el-table-column prop="updateBy" label="更新人"></el-table-column>
            <el-table-column prop="updateDate" label="更新时间"></el-table-column>-->
            <el-table-column label="操作" fixed="right" width="200px" align="center">
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
          <!-- background   //是否为分页按钮添加背景色
            @size-change="handleSizeChange"  //pageSize 改变时会触发
            @current-change="handleCurrentChange"  //currentPage 改变时会触发
            :current-page="searchData.currentPage" //当前页数据
            :page-sizes="[10, 20, 50, 100]" //每页显示个数选择器的选项设置
            :page-size="searchData.pageSize"  //当前页
            layout="total, sizes, prev, pager, next, jumper"   //layout布局不要管他
          :total="page.total"> // 	总条目数-->
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
      dialogVisibleDelete: false,
      dialogVisibleDelete1: false,
      ids: "",
      visible: false,
      loading: false,
      a22a: "",
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
      formrules: {},
      state_list: {
        1: "已上架",
        0: "已下架",
      },
      selection: [],
      tableData: [], // 用于存放数据
      selectDate: [],
      searchData: {},
      URLparams: {
        pageNumber: 1,
        pageSize: 10,
      },
      page: {
        total: 0,
      },
      upload: {
        typeid: "",
      },
      form: {
        title: "",
      },
    };
  },
  watch: {
    selectDate(val, oldVal) {
      if (val) {
        this.searchData.startDate = val[0];
        this.searchData.endDate = val[1];
      }
    },
  },
  computed: {},
  created() {
    let that = this;
    document.onkeypress = function (e) {
      const keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.init(); // 方法名
        return false;
      }
    };
    that.init();
  },
  methods: {
    init() {
      this.loading = true;
      this.$api.comForm
        .list(this.URLparams, this.searchData)
        .then((res) => {
          this.tableData = res.data;
          this.page.total = res.count;
          this.loading = false;
        })
        .catch((err) => {
          this.$message.error("查询失败！");
        });
    },
    hanldeSeach() {
      // 搜索
      this.init();
    },
    hanldeAdd() {
      // 添加
      this.$router.push("/article/configuration/add");
    },
    handleEdit(index, id) {
      this.$router.push("/article/configuration/" + id);
    },
     handleDelete(index, id) {
      this.dialogVisibleDelete = true;
      this.ids = id;
    },
    dialogDelete() {
      this.$api.comForm
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
    handleSizeChange(val) {
      this.URLparams.pageNumber = 1;
      this.URLparams.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.URLparams.pageNumber = val;
      this.init();
    },
    handleSelectionChange(val) {
      this.selection = val;
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
      this.$api.comForm
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
  },
};
</script>

<style lang="stylus" scoped>
.div1 {
  display: flex;
  width: 100%;
  height: auto;
}

.div2 {
  flex: 1;
  background: blue;
}

.div3 {
  width: 500px;
  background: red;
}

.preview {
  width: 240px;
  height: auto;
}

.warning-state {
  color: #e3853a;
}

.success-state {
  color: #67C23A;
}

.error-state {
  color: #F56C6C;
  padding: 0 5px;
}
</style>
