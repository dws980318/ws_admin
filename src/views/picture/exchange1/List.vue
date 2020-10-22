<template>
  <div class="relat">
    <el-col :span="24" v-if="num === '1'">
      <div class="fixed">
        <v-common :common="common"></v-common>
        <div class="header_btn">
          <div
            :class="['list']"
            @click="activeAction(index, item)"
            v-for="(item, index) in list"
            :key="index"
          >
            <p :class="selectIndex4 === index ? 'active' : ''" v-if="item.show">{{item.title}}</p>
          </div>
        </div>
      </div>
      <div class="common" ref="common">
        <v-table1 v-show="selectIndex4 === 0"></v-table1>
        <v-table2 v-show="selectIndex4 === 1"></v-table2>
        <!-- <v-table2 v-show="selectIndex4 === 1"></v-table2> -->
      </div>
    </el-col>
    <el-col :span="24" v-else-if="num === '2'">
      <div class="fixed">
        <v-common :common="common"></v-common>
        <div class="header_btn">
          <div
            :class="['list']"
            @click="activeAction(index, item)"
            v-for="(item, index) in list3"
            :key="index"
          >
            <p :class="selectIndex4 === index ? 'active' : ''">{{item.title}}</p>
          </div>
        </div>
      </div>
      <div class="common" ref="common">
        <v-table3 v-show="selectIndex4 === 0"></v-table3>
        <v-table11 v-show="selectIndex4 === 1"></v-table11>
        <v-table12 v-show="selectIndex4 === 2"></v-table12>
      </div>
    </el-col>
    <el-col :span="24" v-else-if="num === '3'">
      <div class="fixed">
        <v-common :common="common"></v-common>
        <div class="header_btn">
          <div
            :class="['list']"
            @click="activeActionShow(index, item)"
            v-for="(item, index) in list2"
            :key="index"
          >
            <p :class="selectIndex4Show === index ? 'active' : ''">{{item.title}}</p>
          </div>
        </div>
      </div>
      <div class="common" ref="common">
        <v-table4 v-show="selectIndex4Show === 0"></v-table4>
        <v-table5 v-show="selectIndex4Show === 1"></v-table5>
        <v-table11 v-show="selectIndex4 === 2"></v-table11>
        <v-table12 v-show="selectIndex4 === 3"></v-table12>
      </div>
    </el-col>
    <el-col :span="24" v-else-if="num === '4'">
      <div class="fixed">
        <v-common :common="common"></v-common>
        <div class="header_btn">
          <div
            :class="['list']"
            @click="activeActions(index, item)"
            v-for="(item, index) in list4"
            :key="index"
          >
            <p :class="selectIndex4s === index ? 'active' : ''">{{item.title}}</p>
          </div>
        </div>
      </div>
      <div class="common" ref="common">
        <v-table6 v-show="selectIndex4s === 0"></v-table6>
        <v-table11 v-show="selectIndex4s === 1"></v-table11>
        <v-table12 v-show="selectIndex4s === 2"></v-table12>
      </div>
    </el-col>
    <el-col :span="24" v-else-if="num === '5'">
      <div class="fixed">
        <v-common :common="common"></v-common>
        <div class="header_btn">
          <div class="list active">
            <p>报名表</p>
          </div>
        </div>
      </div>
      <div class="common" ref="common">
        <v-table7></v-table7>
      </div>
    </el-col>
    <el-dialog :title="title" :visible.sync="visible" top="10vh" width="60%">
      <v-table1 v-show="selectIndex4 === 0"></v-table1>
      <span slot="footer" class="dialog-footer">
        <el-button @click="printVisibleAction">打印</el-button>
        <el-button @click="visible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import common from "../common";
import Table1 from "@/components/exchange/table1";
import Table2 from "@/components/exchange/table2";
import Table3 from "@/components/exchange/table3";
import Table4 from "@/components/exchange/table4";
import Table5 from "@/components/exchange/table5";
import Table6 from "@/components/exchange/table6";
import Table7 from "@/components/exchange/table7";
import Table11 from "@/components/visit1/table11";
import Table12 from "@/components/visit1/table12";
export default {
  name: "List",
  components: {
    "v-common": common,
    "v-table1": Table1,
    "v-table2": Table2,
    "v-table3": Table3,
    "v-table4": Table4,
    "v-table5": Table5,
    "v-table6": Table6,
    "v-table7": Table7,
    "v-table11": Table11,
    "v-table12": Table12,
  },
  data() {
    return {
      title: "内容",
      visible: false,
      sortVisible: false,
      content: "<p>123123123123</p>",
      page: {
        total: 1,
      },
      list: [
        { title: "申报表", id: "1", show: true },
        // { title: "反馈表", id: "2", show: true },
        // { title: "附件", id: "10" },
        // { title: "流程日志", id: "10" }
      ],
      list2: [
        { title: "中文申请表", id: "1" },
        { title: "英文申请表", id: "2" },
        // { title: "附件", id: "10" },
        // { title: "流程日志", id: "10" }
      ],
      list3: [
        { title: "申请表", id: "1" },
        // { title: "附件", id: "10" },
        // { title: "流程日志", id: "10" }
      ],
      list4: [
        { title: "报名表", id: "1" },
        // { title: "附件", id: "10" },
        // { title: "流程日志", id: "10" }
      ],
      selectIndex4: 0,
      selectIndex4s: 0,
      selectIndex4Show: 0,
      screenWidth: "",
      common: null,
      num: "1",
    };
  },
  watch: {
    screenWidth: {
      handler(newName, oldName) {
        this.screenWidth = document.documentElement.clientWidth;
        window.onresize = () => {
          return (() => {
            this.screenWidth = document.documentElement.clientWidth;
            var scale = this.screenWidth / 1450; // 分母——设计稿的尺寸
            if (scale > 1) {
              scale = 1;
            }
            if (this.$refs.common.style) {
              this.$refs.common.style.zoom = scale;
            }
          })();
        };
      },
      immediate: true,
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
      sessionStorage.num = this.num;
    },
  },
  mounted() {
    this.screenWidth = document.documentElement.clientWidth;
    var scale = this.screenWidth / 1450; // 分母——设计稿的尺寸
    if (scale > 1) {
      scale = 1;
    }
    this.$refs.common.style.zoom = scale;
    this.common = this.$refs.common;
  },
  created() {
    // this.init();
    // if (this.$store.state.tabTitle) {
    //   this.num = this.$store.state.tabTitle;
    // }
    if (sessionStorage.selectIndex4Show) {
      this.selectIndex4Show = parseInt(sessionStorage.selectIndex4Show);
    }
    if (this.$store.state.tableName === "涉外活动申请流程") {
      this.list = [
        { title: "申报表", id: "1", show: true },
        { title: "反馈表", id: "2", show: true },
      ];
    }
    if (sessionStorage.num) {
      this.num = sessionStorage.num;
    }
  },
  methods: {
    activeAction(index, item) {
      this.selectIndex4 = index;
      console.log(1);
    },
    activeActions(index, item) {
      this.selectIndex4s = index;
    },
    activeActionShow(index, item) {
      this.selectIndex4Show = index;
      sessionStorage.selectIndex4Show = index;
      if (index === 0) {
        this.$store.commit("GET_VISITINGSHOW", false);
      } else {
        this.$store.commit("GET_VISITINGSHOW", true);
      }
    },
    showModal(content) {
      this.content = content;
      this.visible = true;
    },
    printVisibleAction() {
      // window.print();
    },
  },
};
</script>

<style scoped lang="stylus">
.relat {
  position: relative;
  width: 100%;
  height: 100%;
  // overflow: hidden;
}

.fixed {
  z-index: 10;
  position: fixed;
  width: 100%;
  background-color: #fff;
  padding: 20px;
}

.common {
  padding-top: 160px;
  overflow: auto;
}
</style>
