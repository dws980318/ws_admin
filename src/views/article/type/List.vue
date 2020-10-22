<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="width: 100%;height: auto">
          <p style="font-size:20px;line-height: 40px;color:#445566;">数据字典</p>
          <el-form :inline="true">
            <el-form-item style="float: left" label-width="50">
              <el-button type="success" size="small" icon="el-icon-plus" @click="hanldeAdd()">新增</el-button>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                @click="hanldeSomeDelete"
              >批量删除</el-button>
              <el-button type="primary" size="small" @click="hanldeType()">字典类型</el-button>
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
            <el-table-column label="字典名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.dicName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="字典值" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.dicValue}}</span>
              </template>
            </el-table-column>
            <el-table-column label="所属类别" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.dicType}}</span>
              </template>
            </el-table-column>
            <el-table-column label="排序" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.dicOrder}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="updateDate" label="修改时间" align="center"></el-table-column>
            <el-table-column label="操作" fixed="right" align="center" width="160">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row.dicId)"
                >编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row.dicId)"
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
      </el-col>
    </el-row>
    <el-dialog :title="title" :visible.sync="visible" top="10vh" width="30%">
      <div v-html="content"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">关闭</el-button>
      </span>
    </el-dialog>
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
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      dialogVisibleDelete: false,
      dialogVisibleDelete1: false,
      ids: "",
      loading: false,
      title: "描述",
      visible: false,
      content: "<p>123123123123</p>",
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
        1: "正常",
        0: "异常",
      },
      selection: [],
      tableData: [], // 用于存放数据
      searchDate: "",
      searchData: {
        roleName: "",
      },
      page: {
        total: 0,
      },
      URLparams: {
        pageNumber: 1,
        pageSize: 10,
      },
    };
  },
  watch: {
    "$route.params.list"(val, oldVal) {
      console.log(val);
    },
    // selectDate(val, oldVal) {
    //   if(val) {
    //     this.searchData.startDate = val[0]
    //     this.searchData.endDate = val[1]
    //   }
    // }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      this.$api.dic
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
      this.init(this.searchData);
    },
    handleSelectionChange(val) {
      this.selection = val;
    },
    hanldeAdd() {
      // 添加
      this.$router.push("/article/type/add");
    },
    hanldeType() {
      this.$router.push("/article/type/listType");
    },
    handleEdit(index, id) {
      this.$router.push("/article/type/" + id);
    },
    handleDelete(index, id) {
      this.dialogVisibleDelete = true;
      this.ids = id;
    },
    dialogDelete() {
      this.$api.dic
        .delete({ dics: this.ids })
        .then((res) => {
          this.dialogVisibleDelete = false;
          this.$message.success(res.message);
          this.init();
        })
        .catch((err) => {
          this.$message.error("删除失败！");
        });
    },
    showModal(content) {
      this.content = content;
      this.visible = true;
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
        del.push(item.dicId);
      });
      const ids = del.join(",");
      console.log(ids)
      this.$api.dic
        .delete({ dics: ids })
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

<style scoped lang="stylus">
.preview {
  width: 240px;
  height: auto;
}

.warning-state {
  color: #2782dd;
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
