<template>
  <div>
    <el-row>
      <el-col :span="24">
        <p style="font-size:20px;line-height: 40px;color:#445566;">菜单管理</p>
        <div class="table">
          <div style="width: 100%;height: auto;">
            <el-form :inline="true">
              <el-form-item style="float: left" label-width="50">
                <el-button type="success" size="small" icon="el-icon-plus" @click="hanldeAdd()">新增</el-button>
                <el-button
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  @click="hanldeSomeDelete"
                >批量删除</el-button>
              </el-form-item>
              <!-- <el-form-item label>
                <el-input size="small" v-model="searchData.accountname" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label-width="50">
                <el-button
                  type="primary"
                  size="small"
                  icon="el-icon-search"
                  @click="hanldeSeach()"
                >搜索</el-button>
              </el-form-item>-->
            </el-form>
          </div>
          <el-table
            :data="tableData"
            border
            :header-cell-style="{background:'#fafafa'}"
            v-loading="loading"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :tree-props="{children: 'mlist'}"
            row-key="id"
            @expand-change="change"
          >
            <el-table-column fixed="left" type="selection" align="center" width="55"></el-table-column>
            <!-- <el-table-column label align="center" width="55">
              <template slot-scope="scope"></template>
            </el-table-column>-->
            <el-table-column label="排序" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.orderNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="图标" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.menuIcon}}</span>
              </template>
            </el-table-column>
            <el-table-column label="菜单名称" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.menuName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="链接" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.menuUrl}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="160" align="center">
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
      visible: false,
      loading: false,
      dialogVisibleDelete: false,
      dialogVisibleDelete1: false,
      ids: "",
      a22a: "",
      formrules: {},
      state_list: {
        1: "已上架",
        0: "已下架",
      },
      selection: [],
      tableData: [], // 用于存放数据
      selectDate: [],
      searchData: {
        accountname: "",
      },
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
  watch: {
    // $route: {
    //   handler: function(val, oldVal) {
    //     console.log(val);
    //   },
    //   // 深度观察监听
    //   deep: true
    // },
    "$store.state.routerShow"(val, oldVal) {
      console.log(val);
      console.log(oldVal);
    },
  },
  methods: {
    change(row, expandedRows, expanded) {
      // console.log(row);
      // console.log(expandedRows);
      // console.log(expanded);
    },
    init() {
      this.loading = true;
      this.$api.menu
        .admin(this.URLparams, this.searchData)
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
      if (this.selection.length > 0) {
        if (this.selection.length > 1) {
          this.$message.error("只能选择一条数据编辑！");
        } else {
          this.$router.push("/article/background/add/" + this.selection[0].id);
        }
      } else {
        this.$router.push("/article/background/add/1");
      }
    },
    handleEdit(index, row) {
      this.$router.push("/article/background/" + row);
    },
    handleDelete(index, id) {
      this.dialogVisibleDelete = true;
      this.ids = id;
    },
    dialogDelete() {
      this.$api.menu
        .deletes({ ids: this.ids })
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
      console.log(val);
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
      this.$api.menu
        .deletes({ ids: ids })
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
.preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  display: block;
  margin: auto;
}

.warning-state {
  color: #e3853a;
}

.color {
  color: #2d7200;

  &:hover {
    color: #67c23a;
    cursor: pointer;
    border-bottom: 1px solid;
  }
}

.success-state {
  color: #67C23A;
}

.error-state {
  color: #F56C6C;
  padding: 0 5px;
}
</style>
