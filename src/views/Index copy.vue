<template>
  <div class="index">
    <div style="min-height: 730px;">
      <div class="avatar-container">
        <div class="avatar-wrapper">
          <img :src="avatarImg" class="user-avatar" />
        </div>
        <span>管理员，下午好!</span>
      </div>
      <div class="visitors">
        <div class="visitors_info">
          <div
            class="info_item"
            v-for="(item, index) in visitors"
            :key="index"
            @click="visitorsAction(item)"
          >
            <i :class="item.icon"></i>
            <div class="item_text">
              <p class="item_info">
                <animated-integer :value="item.value ? item.value : 0"></animated-integer>
              </p>
              <p class="item_title">{{item.title}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- <el-row class="autocomplete">
        <el-autocomplete
          prefix-icon="el-icon-search"
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
          clearable
        ></el-autocomplete>
        <el-button type="success" @click="searchAction">搜索</el-button>
      </el-row>-->
      <el-row style="display:flex;">
        <el-row>
          <el-row class="breadcrumb" v-if="list.length> 0">
            <!-- <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">发起流程</el-breadcrumb-item>
            </el-breadcrumb>-->
            <el-col class="breadcrumb_title">{{form.title}}</el-col>
            <el-col class="list_box">
              <div
                class="list"
                v-for="(item, index) in list"
                :key="index"
                @click="tabAction(item)"
              >{{item.menuName}}</div>
            </el-col>
          </el-row>
          <el-row class="breadcrumb" v-if="list2.length> 0">
            <!-- <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">发起流程</el-breadcrumb-item>
            </el-breadcrumb>-->
            <el-col class="breadcrumb_title">{{form.title2}}</el-col>
            <el-col class="list_box">
              <div
                class="list"
                v-for="(item, index) in list2"
                :key="index"
                @click="tabAction(item)"
              >{{item.menuName}}</div>
            </el-col>
          </el-row>
          <el-row class="breadcrumb" v-if="list3.length> 0">
            <!-- <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">发起流程</el-breadcrumb-item>
            </el-breadcrumb>-->
            <el-col class="breadcrumb_title">{{form.title3}}</el-col>
            <el-col class="list_box">
              <div
                class="list"
                v-for="(item, index) in list3"
                :key="index"
                @click="tabAction(item)"
              >{{item.menuName}}</div>
            </el-col>
          </el-row>
          <el-row class="breadcrumb" v-if="list4.length> 0">
            <!-- <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">发起流程</el-breadcrumb-item>
            </el-breadcrumb>-->
            <el-col class="breadcrumb_title">{{form.title4}}</el-col>
            <el-col class="list_box">
              <div
                class="list"
                v-for="(item, index) in list4"
                :key="index"
                @click="tabAction(item)"
              >{{item.menuName}}</div>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row class="breadcrumb" v-if="list5.length> 0">
            <!-- <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">发起流程</el-breadcrumb-item>
            </el-breadcrumb>-->
            <el-col class="breadcrumb_title">{{form.title5}}</el-col>
            <el-col class="list_box">
              <div
                class="list"
                v-for="(item, index) in list5"
                :key="index"
                @click="tabAction(item)"
              >{{item.menuName}}</div>
            </el-col>
          </el-row>
          <el-row class="breadcrumb" v-if="list6.length> 0">
            <!-- <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">发起流程</el-breadcrumb-item>
            </el-breadcrumb>-->
            <el-col class="breadcrumb_title">{{form.title6}}</el-col>
            <el-col class="list_box">
              <div
                class="list"
                v-for="(item, index) in list6"
                :key="index"
                @click="tabAction(item)"
              >{{item.menuName}}</div>
            </el-col>
          </el-row>
          <el-row class="breadcrumb" v-if="list7.length> 0">
            <!-- <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">发起流程</el-breadcrumb-item>
            </el-breadcrumb>-->
            <el-col class="breadcrumb_title">{{form.title7}}</el-col>
            <el-col class="list_box">
              <div
                class="list"
                v-for="(item, index) in list7"
                :key="index"
                @click="tabAction(item)"
              >{{item.menuName}}</div>
            </el-col>
          </el-row>
          <el-row class="breadcrumb" v-if="list8.length> 0">
            <!-- <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">发起流程</el-breadcrumb-item>
            </el-breadcrumb>-->
            <el-col class="breadcrumb_title">{{form.title8}}</el-col>
            <el-col class="list_box">
              <div
                class="list"
                v-for="(item, index) in list8"
                :key="index"
                @click="tabAction(item)"
              >{{item.menuName}}</div>
            </el-col>
          </el-row>
        </el-row>
      </el-row>
      <el-row style="margin-top: 20px;">
        <div class="table_box">
          <div class="title">
            <span>流程公告</span>
            <!-- <span class="more">查看更多</span> -->
          </div>
          <el-table
            :data="tableData"
            :header-cell-style="{background:'#fafafa'}"
            style="width: 100%;"
            :show-header="false"
          >
            <el-table-column label align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.text }}</span>
              </template>
            </el-table-column>
            <el-table-column label align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.text1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.text2 }}</span>
              </template>
            </el-table-column>
            <el-table-column label align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.text3 }}</span>
              </template>
            </el-table-column>
            <el-table-column label align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.text4 }}</span>
              </template>
            </el-table-column>
            <el-table-column label align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.text5 }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-row>
    </div>
    <div class="copyright">©2020 广州创致信息科技有限公司提供技术支持</div>
  </div>
</template>
<!--    <h3>乐榕国际颐养社区管理平台</h3>-->
<!--    <p>-->
<!--&lt;!&ndash;      <router-link to="/info">账号中心</router-link>&ndash;&gt;-->
<!--      <span @click="logout()">退出登录</span>-->
<!--    </p>-->
<script>
import Vue from "vue";
Vue.component("animated-integer", {
  template: "<span>{{ tweeningValue }}</span>",
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      tweeningValue: 0,
    };
  },
  watch: {
    value: function (newValue, oldValue) {
      this.tween(oldValue, newValue);
    },
  },
  mounted: function () {
    this.tween(0, this.value);
  },
  methods: {
    tween: function (startValue, endValue) {
      var vm = this;
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }

      new TWEEN.Tween({ tweeningValue: startValue })
        .to({ tweeningValue: endValue }, 500)
        .onUpdate(function () {
          vm.tweeningValue = this.tweeningValue.toFixed(0);
        })
        .start();

      animate();
    },
  },
});
import avatarImg from "@/common/images/user.png";
export default {
  name: "Index",
  data() {
    return {
      avatarImg: avatarImg,
      visitors: [
        {
          title: "待办的",
          value: "",
          icon: "el-icon-timer",
          path: "/server/backlog/list",
        },
        { title: "进行中", value: "", icon: "el-icon-edit", path: "" },
        {
          title: "已完成",
          value: "",
          icon: "el-icon-date",
          path: "/server/finished/list",
        },
        {
          title: "抄送",
          value: "",
          icon: "el-icon-position",
          path: "/server/copy/list",
        },
        { title: "我发起的", value: "", icon: "el-icon-user", path: "" },
      ],
      tableData: [
        {
          title: "20200201001",
          text: "因公出国",
          text1: "因公出美国",
          text2: "2020-05-01",
          text3: "张三",
          text4: "人事部",
          text5: "国际处审批",
        },
        {
          title: "20200201001",
          text: "因公出国",
          text1: "因公出美国",
          text2: "2020-05-01",
          text3: "张三",
          text4: "人事部",
          text5: "国际处审批",
        },
        {
          title: "20200201001",
          text: "因公出国",
          text1: "因公出美国",
          text2: "2020-05-01",
          text3: "张三",
          text4: "人事部",
          text5: "国际处审批",
        },
        {
          title: "20200201001",
          text: "因公出国",
          text1: "因公出美国",
          text2: "2020-05-01",
          text3: "张三",
          text4: "人事部",
          text5: "国际处审批",
        },
        {
          title: "20200201001",
          text: "因公出国",
          text1: "因公出美国",
          text2: "2020-05-01",
          text3: "张三",
          text4: "人事部",
          text5: "国际处审批",
        },
      ],
      tableData2: [
        { title: "新冠肺炎预防工作的公告" },
        { title: "开学时间通知公告" },
        { title: "开学时间通知公告" },
        { title: "开学时间通知公告" },
        { title: "开学时间通知公告" },
      ],
      URLparams: {
        pageNumber: 1,
        pageSize: 9999,
      },
      restaurants: [],
      state: "因公出访",
      timeout: null,
      type: 0,
      form: {
        title: "因公出访",
        title2: "涉外活动",
        title3: "资料报送",
        title4: "教师聘用",
        title5: "后勤维修",
        title6: "万人计划",
        title7: "协议签署",
        title8: "孔子学院",
      },
      list: [
        { menuUrl: "/picture/visit1/list", menuName: "因公出国流程" },
        // { menuUrl: "/picture/visit2/list", menuName: "因公出港澳流程" },
        // { menuUrl: "/picture/visit3/list", menuName: "因公出台流程" }
      ],
      list2: [
        {
          menuUrl: "/picture/exchange1/1",
          menuName: "涉外活动申请流程",
          num: 1,
        },
        {
          menuUrl: "/picture/exchange1/2",
          menuName: "涉外礼品申领流程",
          num: 2,
        },
        {
          menuUrl: "/picture/exchange1/3",
          menuName: "来访接待信息管理流程",
          num: 3,
        },
      ],
      list3: [
        {
          menuUrl: "/picture/exchange1/5",
          menuName: "资料报送流程",
          num: 5,
        },
      ],
      list4: [
        {
          menuUrl: "/picture/foreign1/3",
          menuName: "海外名师申报流程",
          foreNum: 3,
        },
        {
          menuUrl: "/picture/foreign1/4",
          menuName: "港澳台教师聘用流程",
          foreNum: 4,
        },
      ],
      list5: [
        {
          menuUrl: "/picture/foreign1/1",
          menuName: "后勤维修流程",
          foreNum: 1,
        },
      ],
      list6: [
        { menuUrl: "/picture/exchange1/4", menuName: "万人计划流程", num: 4 },
      ],
      list7: [
        {
          menuUrl: "/picture/foreign1/6",
          menuName: "协议签署申请流程",
          foreNum: 6,
        },
      ],
      list8: [
        {
          menuUrl: "/picture/foreign1/5",
          menuName: "志愿者申请流程",
          foreNum: 5,
        },
        {
          menuUrl: "/picture/foreign1/7",
          menuName: "经费预算申请流程",
          foreNum: 7,
        },
        {
          menuUrl: "/picture/foreign1/8",
          menuName: "经费决算申请流程",
          foreNum: 8,
        },
      ],
    };
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  computed: {
    states() {
      console.log(this.$store.state.stateName);
    },
  },
  watch: {
    "$store.state.stateName"(val, oldVal) {
      if (val && val !== oldVal) {
        this.state = val;
        this.searchAction();
      }
    },
    $route(val, oldVal) {
      console.log(val);
      // if (val.path === "/picture/exchange1/1") {
      //   this.num = "1";
      // } else if (val.path === "/picture/exchange1/2") {
      //   this.num = "2";
      // } else if (val.path === "/picture/exchange1/3") {
      //   this.num = "3";
      // } else if (val.path === "/picture/exchange1/4") {
      //   this.num = "4";
      // } else if (val.path === "/picture/exchange1/5") {
      //   this.num = "5";
      // }
      // sessionStorage.num = this.num;
    },
  },
  created() {
    if (this.$store.state.stateName) {
      this.state = this.$store.state.stateName;
      this.searchAction();
    }
    // this.init1();
    // this.init2();
    // this.init3();
    // this.init5();
  },
  methods: {
    loadAll() {
      return [
        { address: "/picture/visit1/list", value: "因公出访" },
        { address: "/picture/visit2/list", value: "涉外活动" },
        { address: "/picture/exchange1/5", value: "资料报送" },
        { address: "/picture/visit3/list", value: "教师聘用" },
        { address: "/picture/foreign1/1", value: "后勤维修" },
        { address: "/picture/exchange1/1", value: "万人计划" },
        { address: "/picture/foreign1/6", value: "协议签署" },
        { address: "/picture/exchange1/2", value: "孔子学院" },
      ];
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 0 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    searchAction() {
      if (this.state === "因公出访") {
        this.form = { title: "因公出访" };
        this.list = [
          { menuUrl: "/picture/visit1/list", menuName: "因公出国流程" },
          { menuUrl: "/picture/visit2/list", menuName: "因公出港澳流程" },
          { menuUrl: "/picture/visit3/list", menuName: "因公出台流程" },
        ];
      } else if (this.state === "涉外活动") {
        this.form = { title: "涉外活动" };
        this.list = [
          {
            menuUrl: "/picture/exchange1/1",
            menuName: "涉外活动申请流程",
            num: 1,
          },
          {
            menuUrl: "/picture/exchange1/2",
            menuName: "涉外礼品申领流程",
            num: 2,
          },
          {
            menuUrl: "/picture/exchange1/3",
            menuName: "来访接待信息管理流程",
            num: 3,
          },
        ];
      } else if (this.state === "资料报送") {
        this.form = { title: "资料报送" };
        this.list = [
          {
            menuUrl: "/picture/exchange1/5",
            menuName: "资料报送流程",
            num: 5,
          },
        ];
      } else if (this.state === "教师聘用") {
        this.form = { title: "教师聘用" };
        this.list = [
          // {
          //   menuUrl: "/picture/foreign1/2",
          //   menuName: "涉外讲座申报流程",
          //   foreNum: 2
          // },
          {
            menuUrl: "/picture/foreign1/3",
            menuName: "海外名师申报流程",
            foreNum: 3,
          },
          {
            menuUrl: "/picture/foreign1/4",
            menuName: "港澳台教师聘用流程",
            foreNum: 4,
          },
        ];
      } else if (this.state === "后勤维修") {
        this.form = { title: "后勤维修" };
        this.list = [
          {
            menuUrl: "/picture/foreign1/1",
            menuName: "后勤维修流程",
            foreNum: 1,
          },
        ];
      } else if (this.state === "万人计划") {
        this.form = { title: "万人计划" };
        this.list = [
          { menuUrl: "/picture/exchange1/4", menuName: "万人计划流程", num: 5 },
        ];
      } else if (this.state === "协议签署") {
        this.form = { title: "协议签署" };
        this.list = [
          {
            menuUrl: "/picture/foreign1/6",
            menuName: "协议签署申请流程",
            foreNum: 6,
          },
        ];
      } else if (this.state === "孔子学院") {
        this.form = { title: "孔子学院" };
        this.list = [
          {
            menuUrl: "/picture/foreign1/5",
            menuName: "孔子学院总部志愿者报名流程",
            foreNum: 5,
          },
        ];
      } else if (this.state === "") {
        this.form = {};
        this.list = [];
      }
    },
    tabAction(item) {
      // this.$store.commit("GET_TOPATH", item.menuUrl);
      // this.$store.commit("addHistory", item);
      this.$router.replace(item.menuUrl);
      if (item.num) {
        sessionStorage.num = item.num;
      } else if (item.foreNum) {
        sessionStorage.foreNum = item.foreNum;
      }
      // this.$store.commit("GET_TABTITLE", item.title);
    },
    visitorsAction(item) {
      this.$router.replace(item.path);
    },
    init1() {
      this.$api.user
        .list(this.URLparams)
        .then((res) => {
          if (res.data) {
            this.visitors[0].value = res.count;
          }
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.$message.error("查询失败！");
        });
    },
    init2() {
      this.$api.log
        .list(this.URLparams)
        .then((res) => {
          if (res.data) {
            this.visitors[1].value = res.count;
          }
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.$message.error("查询失败！");
        });
    },
    init3() {
      this.$api.commodity
        .list(this.URLparams)
        .then((res) => {
          if (res.data) {
            this.visitors[2].value = res.count;
          }
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.$message.error("查询失败！");
        });
    },
    init5() {
      this.$api
        .selectdic({ dictype: "商品的类型" })
        .then((res) => {
          if (res.data) {
            let one = res.data;
            this.visitors[4].value = one.length;
          }
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.$message.error("查询失败！");
        });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../common/css/variable.styl';

.index {
  margin-top: 10px;
  padding: 0 20px;
}

.visitors {
  width: 100%;
  height: auto;

  .visitors_info {
    width: auto;
    height: auto;
    // padding: 0 80px;
    display: flex;
    align-items: center;

    // justify-content: center;
    .info_item {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 28px 15px 0;
      border: 1px solid #cdcdcd;
      cursor: pointer;
      background-color: #f1f8fc;
      width: 240px;

      i {
        font-size: 48px;
        padding: 20px;
        border-right: 1px solid #cdcdcd;
      }

      .item_text {
        height: 90px;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }

      .item_title {
        font-size: 20px;
        line-height: 40px;
        color: #333333;
      }

      .item_info {
        font-size: 26px;
        font-weight: bolder;
        // line-height: 52px;
        color: $theme-color;
      }
    }
  }
}

.autocomplete {
  padding: 20px 0;
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;

  /deep/ .el-autocomplete {
    .el-input {
      .el-input__inner {
        &:focus {
          border-color: $theme-color;
        }
      }
    }
  }
}

.breadcrumb {
  margin-top: 20px;
  // width: 60%;
  display: flex;
  align-items: center;

  .breadcrumb_title {
    width: 160px;
  }

  /deep/ .el-breadcrumb {
    font-size: 18px;
  }
}

.list_box {
  display: flex;
  align-items: center;

  // margin-top: 20px;
  .list {
    margin: 0 20px;
    position: relative;
    cursor: pointer;

    &:hover {
      color: $theme-color;
      color: #409eff;

      &::before {
        background-color: $theme-color;
      }
    }

    &::before {
      content: '.';
      position: absolute;
      left: -13px;
      top: 9px;
      width: 8px;
      height: 8px;
      background-color: #000;
      border-radius: 4px;
    }
  }
}

.table_box {
  border: 1px solid #999;
  // width: 80%;
  max-width: 1310px;
  // margin: 0 auto;
}

.avatar-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar-container .avatar-wrapper {
  width: 68px;
  height: 68px;
  cursor: pointer;
  position: relative;
  line-height: initial;
  padding: 10px;
  // margin: auto;
  // text-align: center;
}

.avatar-container .avatar-wrapper .user-avatar {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.avatar-container span {
  color: $theme-color;
  font-size: 20px;
}

.copyright {
  height: 39px;
  line-height: 39px;
  text-align: center;
  border-top: 1px solid #ccc;
}

.title {
  background-color: #f1f8fc;
  border: 1px solid #ddd;
  height: 36px;
  color: #000;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .more {
    cursor: pointer;
  }
}
</style>
