<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-page-header @back="goBack" :content="$route.params.id?'子订单列表':'子订单列表'" style="font-size:20px;line-height: 40px;color:#445566;"></el-page-header>
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
            <!-- <el-table-column label="订单编号" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.parentId }}</span>
              </template>
            </el-table-column>-->
            <el-table-column label="商品名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="商品价格" align="center" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.amount }}</span>
              </template>
            </el-table-column>
            <el-table-column label="封面图" align="center" width="240">
              <template slot-scope="scope" v-if="scope.row.attachId1">
                <el-popover trigger="hover" placement="top">
                  <img class="thumbnail_big" v-lazy="$api.download + scope.row.attachId1" alt />
                  <div slot="reference" class="name-wrapper">
                    <img class="thumbnail" v-lazy="$api.download + scope.row.attachId1" alt />
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="兑换商品截止日期" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.endDate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="奖励积分" align="center" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.integral }}</span>
              </template>
            </el-table-column>
            <el-table-column label="商品数量" align="center" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.num }}</span>
              </template>
            </el-table-column>
            <el-table-column label="商品规格" align="center" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.priceModel }}</span>
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
            <el-table-column label="创建时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createDate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="更新时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.updateDate }}</span>
              </template>
            </el-table-column>
          </el-table>
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
      selection: [],
      tableData: [], // 用于存放数据
      searchDate: "",
      searchData: {
        // comformInfo: ""
      }
    };
  },
  created() {
    if (this.$route.params.id) {
      this.init(this.$route.params.id);
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    init(id) {
      this.loading = true;
      this.$api.order
        .item({ id: id })
        .then(res => {
          if (res.data) {
            this.tableData = res.data.ilist;
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
      this.$router.push("/articlearticle/order/add");
    },
    showModal(content) {
      this.content = content;
      this.visible = true;
    },
    handleEdit(index, id) {
      this.$router.push("/article/order/" + id);
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

.thumbnail {
  width: 80%;
  height: auto;
}

.thumbnail_big {
  width: 360px;
  height: auto;
}
</style>
