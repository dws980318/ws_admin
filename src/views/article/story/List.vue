<template>
  <div>
    <el-row>
      <el-col :span="24">
        <p style="font-size:20px;line-height: 40px;color:#445566;">用户信息</p>
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
              <el-form-item style="float: left">
                <el-input
                  clearable
                  type="text"
                  size="small"
                  placeholder="请输入昵称"
                  v-model="searchData.accountname"
                ></el-input>
              </el-form-item>
              <el-form-item style="float: left">
                <el-select clearable size="small" v-model="searchData.type" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="float: left">
                <el-button type="success" size="small" @click="hanldeSeach()">搜索</el-button>
              </el-form-item>
              <!-- <el-form-item style="float: left">
                <el-button type="success" size="small" @click="hanldeSeach()">导入</el-button>
              </el-form-item>
              <el-form-item style="float: left">
                <el-button type="success" size="small" @click="hanldeSeach()">模板下载</el-button>
              </el-form-item>-->
              <!-- <el-form-item label>
                <el-input size="small" v-model="searchData.accountname" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label-width="50">
               
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
          >
            <!--          :row-class-name="tableRowClassName"-->
            <!-- 根据状态选择样式-->
            <el-table-column fixed="left" type="selection" align="center" width="55"></el-table-column>
            <el-table-column label="头像" align="center" width="240">
              <template slot-scope="scope" v-if="scope.row.photo">
                <el-popover trigger="hover" placement="top">
                  <img class="thumbnail_big" v-lazy="$api.download + scope.row.photo" alt />
                  <div slot="reference" class="name-wrapper">
                    <img class="thumbnail" v-lazy="$api.download + scope.row.photo" alt />
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="账号" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.username}}</span>
              </template>
            </el-table-column>
            <el-table-column label="昵称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.accountname }}</span>
              </template>
            </el-table-column>
            <el-table-column label="真实姓名" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.realName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="手机号码" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column label="电子邮箱" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.mail }}</span>
              </template>
            </el-table-column>
            <el-table-column label="部门" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.departmentId }}</span>
              </template>
            </el-table-column>
            <el-table-column label="职务" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.positionId }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="个人描述" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.remark }}</span>
              </template>
            </el-table-column>-->
            <el-table-column label="性别" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.sex }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="创建人" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createBy}}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createDate}}</span>
              </template>
            </el-table-column>-->
            <!-- <el-table-column label="修改人" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.updateBy}}</span>
              </template>
            </el-table-column>
            <el-table-column label="修改时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.updateDate}}</span>
              </template>
            </el-table-column>-->
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <span v-if="Boolean(scope.row.delFlag)" class="error-state">禁用</span>
                <span v-else class="success-state">启用</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="260" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="warning"
                  @click="handleReset(scope.$index, scope.row.id)"
                >重置密码</el-button>
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
                <!-- <span
                  v-if="scope.row.delFlag === 0"
                  class="color"
                  @click="hanldePutaway(scope.$index, scope.row)"
                >启用</span>
                <span v-else class="color" @click="hanldeSoldout(scope.$index, scope.row)">禁用</span>-->
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
    <el-dialog title="重置密码" :visible.sync="visible" top="10vh" width="30%">
      <el-form :model="form" label-position="right">
        <el-form-item label="新密码:" label-width="80px">
          <el-input v-model="searchData.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">确认</el-button>
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
      options: [
        {
          value: "选项1",
          label: "教职员工管理",
        },
        {
          value: "选项2",
          label: "外籍专家管理",
        },
        {
          value: "选项3",
          label: "学生管理",
        },
      ],
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
  methods: {
    // tableRowClassName({ row, rowIndex }) {
    //   console.log({ row, rowIndex });
    //   if (row.state === 1) {
    //     return "warning-row";
    //   } else if (rowIndex === 2) {
    //     return "success-row";
    //   } else if (rowIndex === 2) {
    //     return "error-row";
    //   }
    //   return "";
    // },

    init() {
      this.loading = true;
      this.$api.user
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
    handleReset() {
      this.visible = true;
    },
    hanldeSeach() {
      // 搜索
      this.init();
    },
    hanldeAdd() {
      // 添加
      this.$router.push("/article/story/add");
    },
    handleEdit(index, id) {
      this.$router.push("/article/story/" + id);
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
     handleDelete(index, id) {
      this.dialogVisibleDelete = true;
      this.ids = id;
    },
    dialogDelete() {
      this.$api.user
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
      this.$api.user
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
.preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  display: block;
  margin: auto;
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
