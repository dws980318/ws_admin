<template>
  <el-row>
    <el-col class="tree" :span="4">
      <el-tree
        :data="data"
        :expand-on-click-node="false"
        :props="defaultProps"
        default-expand-all
        @node-click="handleNodeClick"
      ></el-tree>
    </el-col>
    <el-col :span="20" v-if="show">
      <el-row>
        <p class="header_title">流程管理</p>
        <div style="width: 100%;height: auto">
          <el-form :inline="true">
            <el-form-item style="float: left" label-width="50">
              <el-button type="warning" size="small" icon="el-icon-plus" @click="hanldeAdd()">新增</el-button>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                @click="hanldeSomeDelete"
              >批量删除</el-button>
            </el-form-item>
            <div v-if="isShow1">
              <el-form-item style="float: left">
                <el-input type="text" size="small" placeholder="请输入姓名" v-model="searchData.title"></el-input>
              </el-form-item>
              <el-form-item style="float: left">
                <el-input type="text" size="small" placeholder="请输入所在单位" v-model="searchData.title"></el-input>
              </el-form-item>
              <el-form-item style="float: left">
                <el-select size="small" v-model="searchData.status1" placeholder="请选择职级" clearable>
                  <el-option
                    v-for="(item, key, index) in state_list"
                    :key="index"
                    :label="item"
                    :value="key"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="float: left">
                <el-select
                  size="small"
                  v-model="searchData.status2"
                  placeholder="请选择出访类型"
                  clearable
                >
                  <el-option
                    v-for="(item, key, index) in state_list"
                    :key="index"
                    :label="item"
                    :value="key"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="float: left;" label>
                <el-date-picker
                  style="width: 200px"
                  size="small"
                  v-model="searchData.searchDate"
                  type="datetime"
                  align="right"
                  unlink-panels
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  placeholder="请选择出访时间"
                ></el-date-picker>
              </el-form-item>
              <el-form-item style="float: left" label-width="50">
                <el-button
                  type="success"
                  size="small"
                  icon="el-icon-search"
                  @click="hanldeSeach()"
                >搜索</el-button>
              </el-form-item>
            </div>
            <div v-if="isShow2">
              <el-form-item style="float: left">
                <el-input
                  style="width: 200px;"
                  type="text"
                  size="small"
                  placeholder="请输入申请人"
                  v-model="searchData.title"
                ></el-input>
              </el-form-item>
              <el-form-item style="float: left">
                <el-input
                  style="width: 200px;"
                  type="text"
                  size="small"
                  placeholder="请输入申请单位"
                  v-model="searchData.title1"
                ></el-input>
              </el-form-item>
              <el-form-item style="float: left">
                <el-input
                  style="width: 200px;"
                  type="text"
                  size="small"
                  placeholder="请输入活动涉国（境）外国家和地区"
                  v-model="searchData.title2"
                ></el-input>
              </el-form-item>
              <el-form-item style="float: left">
                <el-input
                  style="width: 200px;"
                  type="text"
                  size="small"
                  placeholder="请输入涉国（境）外国家/地区所在大洲"
                  v-model="searchData.title2"
                ></el-input>
              </el-form-item>
              <el-form-item style="float: left">
                <el-select
                  style="width: 200px;"
                  size="small"
                  v-model="searchData.status"
                  placeholder="请选择活动是否涉领"
                  clearable
                >
                  <el-option
                    v-for="(item, key, index) in state_list"
                    :key="index"
                    :label="item"
                    :value="key"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="float: left;" label>
                <el-date-picker
                  style="width: 200px"
                  size="small"
                  v-model="searchData.searchDate"
                  type="datetime"
                  align="right"
                  unlink-panels
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  placeholder="请选择活动日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item style="float: left" label-width="50">
                <el-button
                  type="success"
                  size="small"
                  icon="el-icon-search"
                  @click="hanldeSeach()"
                >搜索</el-button>
              </el-form-item>
            </div>
            <div v-if="isShow3">
              <el-form-item style="float: left">
                <el-input
                  style="width: 200px;"
                  type="text"
                  size="small"
                  placeholder="请输入领用人"
                  v-model="searchData.title"
                ></el-input>
              </el-form-item>
              <el-form-item style="float: left">
                <el-input
                  style="width: 200px;"
                  type="text"
                  size="small"
                  placeholder="请输入礼品名称"
                  v-model="searchData.title1"
                ></el-input>
              </el-form-item>
              <el-form-item style="float: left;">
                <el-date-picker
                  style="width: 200px"
                  size="small"
                  v-model="searchData.searchDate"
                  type="datetime"
                  align="right"
                  unlink-panels
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  placeholder="请选择申领时间"
                ></el-date-picker>
              </el-form-item>
              <el-form-item style="float: left" label-width="50">
                <el-button
                  type="success"
                  size="small"
                  icon="el-icon-search"
                  @click="hanldeSeach()"
                >搜索</el-button>
              </el-form-item>
            </div>
            <div v-if="isShow4">
              <el-form-item style="float: left">
                <el-input
                  style="width: 200px;"
                  type="text"
                  size="small"
                  placeholder="请输入来访团组"
                  v-model="searchData.title"
                ></el-input>
              </el-form-item>
              <el-form-item style="float: left">
                <el-input
                  style="width: 200px;"
                  type="text"
                  size="small"
                  placeholder="请输入国家"
                  v-model="searchData.title1"
                ></el-input>
              </el-form-item>
              <el-form-item style="float: left">
                <el-input
                  style="width: 200px;"
                  type="text"
                  size="small"
                  placeholder="请输入国家/地区所在大洲"
                  v-model="searchData.title1"
                ></el-input>
              </el-form-item>
              <el-form-item style="float: left">
                <el-input
                  style="width: 200px;"
                  type="text"
                  size="small"
                  placeholder="请输入出席校领导"
                  v-model="searchData.title1"
                ></el-input>
              </el-form-item>
              <el-form-item style="float: left">
                <el-input
                  style="width: 200px;"
                  type="text"
                  size="small"
                  placeholder="请输我校陪同人员"
                  v-model="searchData.title1"
                ></el-input>
              </el-form-item>
              <el-form-item style="float: left;">
                <el-date-picker
                  style="width: 200px"
                  size="small"
                  v-model="searchData.searchDate"
                  type="datetime"
                  align="right"
                  unlink-panels
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  placeholder="请选择出访时间"
                ></el-date-picker>
              </el-form-item>
              <el-form-item style="float: left" label-width="50">
                <el-button
                  type="success"
                  size="small"
                  icon="el-icon-search"
                  @click="hanldeSeach()"
                >搜索</el-button>
              </el-form-item>
            </div>
            <div v-if="isShow9">
              <el-form-item style="float: left">
                <el-input
                  style="width: 200px;"
                  type="text"
                  size="small"
                  placeholder="请输入姓名"
                  v-model="searchData.title"
                ></el-input>
              </el-form-item>
              <el-form-item style="float: left">
                <el-select size="small" v-model="searchData.status1" placeholder="请选择性别" clearable>
                  <el-option
                    v-for="(item, key, index) in state_list"
                    :key="index"
                    :label="item"
                    :value="key"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="float: left">
                <el-select size="small" v-model="searchData.status2" placeholder="请选择专业" clearable>
                  <el-option
                    v-for="(item, key, index) in state_list"
                    :key="index"
                    :label="item"
                    :value="key"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="float: left">
                <el-select size="small" v-model="searchData.status3" placeholder="请选择年级" clearable>
                  <el-option
                    v-for="(item, key, index) in state_list"
                    :key="index"
                    :label="item"
                    :value="key"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="float: left">
                <el-select
                  size="small"
                  v-model="searchData.status4"
                  placeholder="请选择申请项目"
                  clearable
                >
                  <el-option
                    v-for="(item, key, index) in state_list"
                    :key="index"
                    :label="item"
                    :value="key"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="float: left" label-width="50">
                <el-button
                  type="success"
                  size="small"
                  icon="el-icon-search"
                  @click="hanldeSeach()"
                >搜索</el-button>
              </el-form-item>
            </div>
            <div v-if="isShow10">
              <el-form-item style="float: left">
                <el-input
                  style="width: 200px;"
                  type="text"
                  size="small"
                  placeholder="请输入申请单位"
                  v-model="searchData.title"
                ></el-input>
              </el-form-item>
              <el-form-item style="float: left">
                <el-input
                  style="width: 200px;"
                  type="text"
                  size="small"
                  placeholder="请输入合作院校"
                  v-model="searchData.title1"
                ></el-input>
              </el-form-item>
              <el-form-item style="float: left">
                <el-input
                  style="width: 200px;"
                  type="text"
                  size="small"
                  placeholder="请输入经办人"
                  v-model="searchData.title2"
                ></el-input>
              </el-form-item>
              <el-form-item style="float: left;" label>
                <el-date-picker
                  style="width: auto !important;"
                  size="small"
                  v-model="searchDate"
                  type="daterange"
                  align="right"
                  unlink-panels
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="创建时间"
                  end-placeholder="更新时间"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-form-item>
              <el-form-item style="float: left" label-width="50">
                <el-button
                  type="success"
                  size="small"
                  icon="el-icon-search"
                  @click="hanldeSeach()"
                >搜索</el-button>
              </el-form-item>
            </div>
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
            <el-table-column label="编号" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="流程名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.inventory }}</span>
              </template>
            </el-table-column>
            <el-table-column label="key" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.startDate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="版本" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.endDate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.issueNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="140" align="center">
              <template slot-scope="scope">
                <span
                  :class="scope.row.status==='1'?'success-state':''||scope.row.status==='0'?'error-state':''"
                >{{ state_list[scope.row.status] }}</span>
                <!-- {{scope.row.status}} -->
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
          <el-pagination
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
      </el-row>
      <el-dialog :title="title" :visible.sync="visible" top="10vh" width="30%">
        <div v-html="content"></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">关闭</el-button>
        </span>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      data: [
        {
          label: "因公出访",
          children: [
            {
              label: "因公出访流程",
            },
            // {
            //   label: "因公出港澳流程",
            // },
            // {
            //   label: "因公出台流程",
            // },
          ],
        },
        {
          label: "涉外活动",
          children: [
            {
              label: "涉外活动申请流程",
            },
            {
              label: "涉外礼品申领流程",
            },
            {
              label: "来访接待信息管理流程",
            },
          ],
        },
        {
          label: "资料报送",
          children: [
            {
              label: "资料报送流程",
            },
          ],
        },
        {
          label: "教师聘用",
          children: [
            {
              label: "海外名师申报流程",
            },
            {
              label: "港澳台教师聘用流程",
            },
          ],
        },
        {
          label: "后勤维修",
          children: [
            {
              label: "后勤维修流程",
            },
          ],
        },
        {
          label: "万人计划",
          children: [
            {
              label: "万人计划流程",
            },
          ],
        },
        {
          label: "协议签署",
          children: [
            {
              label: "协议签署申请流程",
            },
          ],
        },
        {
          label: "孔子学院",
          children: [
            {
              label: "孔子学院总部志愿者报名流程",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      title: "内容",
      visible: false,
      sortVisible: false,
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
        1: "因公出台流程1",
        0: "因公出台流程2",
        2: "因公出国类型1",
        3: "因公出国类型2",
      },
      selection: [],
      tableData: [], // 用于存放数据
      searchDate: "",
      searchData: {
        title: "",
        status: "",
        delStatus: "1",
        typeId: "",
      },
      page: {
        total: 0,
      },
      URLparams: {
        pageNumber: 1,
        pageSize: 10,
      },
      show: false,
      isShow1: false,
      isShow2: false,
      isShow3: false,
      isShow9: false,
      isShow10: false,
    };
  },
  created() {},
  methods: {
    handleNodeClick(node, data) {
      console.log(data);
      if (data.data.label === "因公出访流程") {
        this.show = true;
        this.isShow1 = true;
        this.isShow2 = false;
        this.isShow3 = false;
        this.isShow4 = false;
        this.isShow9 = false;
        this.isShow10 = false;
        this.tableData = [
          {
            title: 202008194514,
            inventory: "类型一",
            startDate: "因公出国流程",
            endDate: "一般",
            issueNum: "管理员",
            price: "经办人",
            price2: "2020-05-09",
            price3: "国际处",
          },
          {
            title: 202008194515,
            inventory: "类型一",
            startDate: "因公出国流程",
            endDate: "一般",
            issueNum: "管理员",
            price: "经办人",
            price2: "2020-05-09",
            price3: "财务处",
          },
        ];
        this.page.total = 1;
        console.log(data);
      } else if (data.data.label === "涉外活动申请流程") {
        this.show = true;
        this.isShow1 = false;
        this.isShow2 = true;
        this.isShow3 = false;
        this.isShow4 = false;
        this.isShow9 = false;
        this.isShow10 = false;
        // console.log(data)
        this.tableData = [
          {
            title: 202008192140,
            inventory: "类型二",
            startDate: "涉外活动申请流程",
            endDate: "一般",
            issueNum: "管理员",
            price: "经办人",
            price2: "2020-05-20",
            price3: "秘书处",
          },
        ];
      } else if (data.data.label === "涉外礼品申领流程") {
        this.show = true;
        this.isShow1 = false;
        this.isShow2 = false;
        this.isShow3 = true;
        this.isShow4 = false;
        this.isShow9 = false;
        this.isShow10 = false;
        this.tableData = [];
        this.page.total = 0;
        console.log(data);
      } else if (data.data.label === "来访接待信息管理流程") {
        this.show = true;
        this.isShow1 = false;
        this.isShow2 = false;
        this.isShow3 = false;
        this.isShow4 = true;
        this.isShow9 = false;
        this.isShow10 = false;
        this.tableData = [];
        this.page.total = 0;
        console.log(data);
      } else if (data.data.label === "资料报送流程") {
        this.show = true;
        this.isShow1 = true;
        this.isShow2 = false;
        this.isShow3 = false;
        this.isShow4 = false;
        this.isShow9 = false;
        this.isShow10 = false;
        this.tableData = [];
        this.page.total = 0;
        console.log(data);
      } else if (data.data.label === "海外名师申报流程") {
        this.show = true;
        this.isShow1 = true;
        this.isShow2 = false;
        this.isShow3 = false;
        this.isShow4 = false;
        this.isShow9 = false;
        this.isShow10 = false;
        this.tableData = [];
        this.page.total = 0;
      } else if (data.data.label === "港澳台教师聘用流程") {
        this.show = true;
        this.isShow1 = true;
        this.isShow2 = false;
        this.isShow3 = false;
        this.isShow4 = false;
        this.isShow9 = false;
        this.isShow10 = false;
        this.tableData = [];
        this.page.total = 0;
      } else if (data.data.label === "后勤维修流程") {
        this.show = true;
        this.isShow1 = true;
        this.isShow2 = false;
        this.isShow3 = false;
        this.isShow4 = false;
        this.isShow9 = false;
        this.isShow10 = false;
        this.tableData = [
          {
            title: 202008190112,
            inventory: "类型三",
            startDate: "后勤维修流程",
            endDate: "一般",
            issueNum: "管理员",
            price: "经办人",
            price2: "2020-05-20",
            price3: "国际处",
          },
        ];
        this.page.total = 1;
      } else if (data.data.label === "万人计划流程") {
        this.show = true;
        this.isShow1 = false;
        this.isShow2 = false;
        this.isShow3 = false;
        this.isShow4 = false;
        this.isShow9 = true;
        this.isShow10 = false;
        this.tableData = [
          {
            title: 202008190100,
            inventory: "类型四",
            startDate: "万人计划流程",
            endDate: "紧急",
            issueNum: "管理员",
            price: "经办人",
            price2: "2020-05-20",
            price3: "国际处",
          },
          {
            title: 202008190101,
            inventory: "类型四",
            startDate: "万人计划流程",
            endDate: "一般",
            issueNum: "管理员",
            price: "经办人",
            price2: "2020-05-20",
            price3: "国际处",
          },
        ];
        this.page.total = 1;
      } else if (data.data.label === "协议签署申请流程") {
        this.show = true;
        this.isShow1 = false;
        this.isShow2 = false;
        this.isShow3 = false;
        this.isShow4 = false;
        this.isShow9 = false;
        this.isShow10 = true;
        this.tableData = [];
        this.page.total = 0;
      } else if (data.data.label === "孔子学院总部志愿者报名流程") {
        this.show = true;
        this.isShow1 = true;
        this.isShow2 = false;
        this.isShow3 = false;
        this.isShow4 = false;
        this.isShow9 = false;
        this.isShow10 = false;
        this.tableData = [];
        this.page.total = 0;
      }
    },
    init() {
      this.loading = true;
      this.$api.coupon
        .list(this.URLparams, this.searchData)
        .then((res) => {
          if (res.data) {
            this.tableData = res.data;
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
      this.init(this.searchData);
      console.log(this.searchDate);
    },
    handleSelectionChange(val) {
      this.selection = val;
    },
    handleDetails() {
      this.$store.commit("GET_TOPATH", "/picture/visit3/list");
      this.$store.commit("GET_SELECTINDEX", 2);
      this.$store.commit("GET_COMMONSHOW", false);
      this.$router.push("/picture/visit3/list");
    },
    hanldeAdd() {
      // 添加
      this.$router.push("/article/coupon/add");
    },
    handleEdit(index, id) {
      this.$router.push("/article/coupon/" + id);
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
    handleDelete(index, id) {
      this.$api.coupon.delete({ ids: id }).then((res) => {
        this.$message.success(res.message);
        this.tableData.splice(index, 1);
        this.page.total--;
      });
    },
    hanldeSomeDelete() {
      if (this.selection.length === 0) {
        this.$message.error("请选择一条数据删除！");
      } else {
        const del = [];
        this.selection.map((item) => {
          if (this.tableData.indexOf(item) != -1) {
            del.push(item.id);
          }
        });
        this.$api.coupon
          .delete({ ids: del })
          .then((res) => {
            this.selection.map((item) => {
              if (this.tableData.indexOf(item) != -1) {
                this.tableData.splice(this.tableData.indexOf(item), 1);
              }
            });
            this.$message.success(res.message);
          })
          .catch((err) => {
            this.$message.error("删除失败！");
          });
      }
    },
  },
};
</script>

<style scoped lang="stylus">
.tree {
  /deep/ .el-tree {
    .el-tree-node {
      // margin-top: 5px;
    }

    .is-current > .el-tree-node__content {
      background-color: rgb(255, 255, 255);
      color: rgb(64, 158, 255);
    }

    .is-checked > .el-tree-node__content {
      background-color: rgb(255, 255, 255);
      color: rgb(64, 158, 255);
    }
  }
}

.el-input {
  width: 300px;
}

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

