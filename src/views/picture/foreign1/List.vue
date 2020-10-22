<template>
  <div class="relat">
    <el-col :span="24" v-if="foreNum === '1'">
      <div class="fixed">
        <v-common :common="common"></v-common>
        <div class="header_btn">
          <div
            :class="['list']"
            @click="activeAction(index, item)"
            v-for="(item, index) in list4"
            :key="index"
          >
            <p :class="selectIndex5 === index ? 'active' : ''">{{item.title}}</p>
          </div>
        </div>
      </div>
      <div class="common" ref="common">
        <v-table1 v-show="selectIndex5 === 0"></v-table1>
        <!-- <v-table12 v-show="selectIndex5 === 2"></v-table12> -->
      </div>
    </el-col>
    <el-col :span="24" v-else-if="foreNum === '2'">
      <div class="fixed">
        <v-common :common="common"></v-common>
        <div class="header_btn">
          <div
            :class="['list']"
            @click="activeAction(index, item)"
            v-for="(item, index) in list"
            :key="index"
          >
            <p :class="selectIndex5 === index ? 'active' : ''">{{item.title}}</p>
          </div>
        </div>
      </div>
      <div class="common" ref="common">
        <v-table2 v-show="selectIndex5 === 0"></v-table2>
        <v-table3 v-show="selectIndex5 === 1"></v-table3>
        <!-- <v-table12 v-show="selectIndex5 === 3"></v-table12> -->
      </div>
    </el-col>
    <el-col :span="24" v-else-if="foreNum === '3'">
      <div class="fixed">
        <v-common :common="common"></v-common>
        <div class="header_btn">
          <div
            :class="['list']"
            @click="activeActionShow(index, item)"
            v-for="(item, index) in list2"
            :key="index"
          >
            <p :class="selectIndex5Show === index ? 'active' : ''">{{item.title}}</p>
          </div>
        </div>
      </div>
      <div class="common" ref="common">
        <v-table4 :selectIndexShow="selectIndex5Show"></v-table4>
        <!-- <v-table12 v-show="selectIndex5s === 3"></v-table12> -->
      </div>
    </el-col>
    <el-col :span="24" v-else-if="foreNum === '4'">
      <div class="fixed">
        <v-common :common="common"></v-common>
        <div class="header_btn">
          <div
            :class="['list']"
            @click="activeActions(index, item)"
            v-for="(item, index) in list3"
            :key="index"
          >
            <p :class="selectIndex5s === index ? 'active' : ''">{{item.title}}</p>
          </div>
        </div>
      </div>
      <div class="common" ref="common">
        <v-table6 v-show="selectIndex5s === 0"></v-table6>
        <!-- <v-table12 v-show="selectIndex5s === 3"></v-table12> -->
      </div>
    </el-col>
    <el-col :span="24" v-else-if="foreNum === '5'">
      <div class="fixed">
        <v-common :common="common"></v-common>
        <div class="header_btn">
          <div
            :class="['list']"
            @click="activeActions(index, item)"
            v-for="(item, index) in list4"
            :key="index"
          >
            <p :class="selectIndex5s === index ? 'active' : ''">{{item.title}}</p>
          </div>
        </div>
      </div>
      <div class="common" ref="common">
        <v-table8 v-show="selectIndex5s === 0"></v-table8>
        <!-- <v-table12 v-show="selectIndex5s === 2"></v-table12> -->
      </div>
    </el-col>
    <el-col :span="24" v-else-if="foreNum === '6'">
      <div class="fixed">
        <v-common :common="common"></v-common>
        <div class="header_btn">
          <div
            :class="['list']"
            @click="activeActions(index, item)"
            v-for="(item, index) in list5"
            :key="index"
          >
            <p :class="selectIndex5s === index ? 'active' : ''">{{item.title}}</p>
          </div>
        </div>
      </div>
      <div class="common" ref="common">
        <v-table9 v-show="selectIndex5s === 0"></v-table9>
        <!-- <v-table12 v-show="selectIndex5s === 2"></v-table12> -->
      </div>
    </el-col>
    <el-col :span="24" v-else-if="foreNum === '7'">
      <div class="fixed">
        <v-common :common="common"></v-common>
        <div class="header_btn">
          <div
            :class="['list']"
            @click="activeActions(index, item)"
            v-for="(item, index) in list6"
            :key="index"
          >
            <p :class="selectIndex5s === index ? 'active' : ''">{{item.title}}</p>
          </div>
        </div>
      </div>
      <div class="common" ref="common">
        <v-table10 v-show="selectIndex5s === 0"></v-table10>
      </div>
    </el-col>
    <el-col :span="24" v-else-if="foreNum === '8'">
      <div class="fixed">
        <v-common :common="common"></v-common>
        <div class="header_btn">
          <div
            :class="['list']"
            @click="activeActions(index, item)"
            v-for="(item, index) in list7"
            :key="index"
          >
            <p :class="selectIndex5s === index ? 'active' : ''">{{item.title}}</p>
          </div>
        </div>
      </div>
      <div class="common" ref="common">
        <v-table11 v-show="selectIndex5s === 0"></v-table11>
      </div>
    </el-col>
    <el-col :span="24" v-else-if="foreNum === '9'">
      <div class="fixed">
        <v-common :common="common"></v-common>
        <div class="header_btn">
          <div
            :class="['list']"
            @click="activeActions(index, item)"
            v-for="(item, index) in list8"
            :key="index"
          >
            <p :class="selectIndex5s === index ? 'active' : ''">{{item.title}}</p>
          </div>
        </div>
      </div>
      <div class="common" ref="common">
        <v-table7 v-show="selectIndex5s === 0"></v-table7>
      </div>
    </el-col>
    <el-dialog :title="title" :visible.sync="visible" top="10vh" width="60%">
      <v-table1 v-show="selectIndex5 === 0"></v-table1>
      <span slot="footer" class="dialog-footer">
        <el-button @click="printVisibleAction">打印</el-button>
        <el-button @click="visible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import common from "../common";
import Table1 from "@/components/foreign/table1";
import Table2 from "@/components/foreign/table2";
import Table3 from "@/components/foreign/table3";
import Table4 from "@/components/foreign/table4";
import Table5 from "@/components/foreign/table5";
import Table6 from "@/components/foreign/table6";
import Table7 from "@/components/foreign/table7";
import Table8 from "@/components/foreign/table8";
import Table9 from "@/components/foreign/table9";
import Table10 from "@/components/foreign/table10";
import Table11 from "@/components/foreign/table11";
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
    "v-table8": Table8,
    "v-table9": Table9,
    "v-table10": Table10,
    "v-table11": Table11,
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
        { title: "申请表", id: "1" },
        { title: "反馈表", id: "2" },
        // { title: "附件", id: "10" },
        // { title: "流程日志", id: "10" }
      ],
      list2: [
        { title: "申请表", id: "1" },
        { title: "结项表", id: "2" },
        // { title: "附件", id: "10" },
        // { title: "流程日志", id: "10" }
      ],
      list3: [
        { title: "聘用申批表", id: "1" },
        // { title: "附件", id: "10" },
        // { title: "流程日志", id: "10" }
      ],
      list4: [
        { title: "申请表", id: "1" },
        // { title: "附件", id: "10" },
        // { title: "流程日志", id: "10" }
      ],
      list5: [
        { title: "审批表", id: "1" },
        // { title: "附件", id: "10" },
        // { title: "流程日志", id: "10" }
      ],

      list6: [{ title: "预算表", id: "1" }],
      list7: [{ title: "决算表", id: "1" }],
      list8: [
        { title: "续聘申批表", id: "1" },
        // { title: "附件", id: "10" },
        // { title: "流程日志", id: "10" }
      ],
      selectIndex5: 0,
      selectIndex5s: 0,
      selectIndex5Show: 0,
      screenWidth: "",
      common: null,
      foreNum: "1",
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
    },
    $route(val, oldVal) {
      console.log(val);
      // if (val.path === "/picture/foreign1/1") {
      //   this.foreNum = "1";
      // } else if (val.path === "/picture/foreign1/2") {
      //   this.foreNum = "2";
      // } else if (val.path === "/picture/foreign1/3") {
      //   this.foreNum = "3";
      // } else if (val.path === "/picture/foreign1/4") {
      //   this.foreNum = "4";
      // } else if (val.path === "/picture/foreign1/5") {
      //   this.foreNum = "5";
      // } else if (val.path === "/picture/foreign1/6") {
      //   this.foreNum = "6";
      // }
      sessionStorage.foreNum = this.foreNum;
    },
    immediate: true,
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
    if (sessionStorage.foreNum) {
      this.foreNum = sessionStorage.foreNum;
    }
  },
  methods: {
    activeAction(index, item) {
      this.selectIndex5 = index;
    },
    activeActions(index, item) {
      this.selectIndex5s = index;
    },
    activeActionShow(index, item) {
      this.selectIndex5Show = index;
      sessionStorage.selectIndex5Show = index;
      if (index === 0) {
        this.$store.commit("GET_EXPERTSHOW", false);
      } else {
        this.$store.commit("GET_EXPERTSHOW", true);
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

  /deep/ .el-avatar--circle {
    border-radius: 0;
  }

  /deep/ .el-avatar {
    background-color: #fff;
  }
}
</style>
