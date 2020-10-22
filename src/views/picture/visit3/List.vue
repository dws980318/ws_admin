<template>
  <div class="relat">
    <div class="fixed">
      <v-common :common="common"></v-common>
      <div class="header_btn">
        <div
          :class="['list']"
          @click="activeAction(index, item)"
          v-for="(item, index) in list"
          :key="index"
        >
            <p :class="$store.state.selectIndex3 === item.id ? 'active' : ''">{{item.title}}</p>
        </div>
      </div>
    </div>
    <div class="common" ref="common">
      <v-table1 v-show="$store.state.selectIndex3 === '1'"></v-table1>
      <!-- <v-table2 v-show="$store.state.selectIndex3 === 1"></v-table2> -->
      <v-table3 v-show="$store.state.selectIndex3 === '3'"></v-table3>
      <v-table4 v-show="$store.state.selectIndex3 === '4'"></v-table4>
      <v-table5 v-show="$store.state.selectIndex3 === '5'"></v-table5>
      <v-table6 v-show="$store.state.selectIndex3 === '6'"></v-table6>
      <v-table11 v-show="$store.state.selectIndex3 === '7'"></v-table11>
      <v-table12 v-show="$store.state.selectIndex3 === '8'"></v-table12>
    </div>
    <el-dialog :title="title" :visible.sync="visible" top="10vh" width="60%">
      <v-table1 v-show="$store.state.selectIndex3 === 0"></v-table1>
      <span slot="footer" class="dialog-footer">
        <el-button @click="printVisibleAction">打印</el-button>
        <el-button @click="visible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import common from "../common";
import Table1 from "@/components/visit3/table1";
import Table2 from "@/components/visit3/table2";
import Table3 from "@/components/visit3/table3";
import Table4 from "@/components/visit3/table4";
import Table5 from "@/components/visit3/table5";
import Table6 from "@/components/visit3/table6";
import Table11 from "@/components/visit3/table11";
import Table12 from "@/components/visit3/table12";
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
    "v-table11": Table11,
    "v-table12": Table12
  },
  data() {
    return {
      title: "内容",
      visible: false,
      sortVisible: false,
      content: "<p>123123123123</p>",
      page: {
        total: 1
      },
      list: [
        { title: "申报表", id: "1" },
        // { title: "往来台湾审批表", id: "2" },
        { title: "访台承诺书", id: "3" },
        { title: "访台绩效评估表", id: "4" },
        { title: "赴台请示", id: "5" },
        { title: "人员备案表", id: "6" },
        { title: "附件", id: "7" },
        { title: "流程日志", id: "8" }
      ],
      selectIndex3: 0,
      screenWidth: "",
      common: null
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
            this.$refs.common.style.zoom = scale;
          })();
        };
      }
    },
    immediate: true
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
    this.selectIndex3 = this.$store.state.selectIndex3
    // this.init();
  },
  methods: {
    activeAction(index, item) {
      // this.selectIndex3 = index;
      this.$store.commit("GET_SELECTINDEX3", item.id);

    },
    showModal(content) {
      this.content = content;
      this.visible = true;
    },
    printVisibleAction() {
      // window.print();
    }
  }
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
