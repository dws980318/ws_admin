<template>
  <div class="relat">
    <div class="fixed">
      <div class="header_box" v-show="$store.state.commonShow">
        <el-col :span="6">
          <p class="btn_red" @click="showAction">流程图</p>
        </el-col>
        <el-col :span="18">
          <div class="btn_right">
            <p class="btn_red" @click="nextAction()">转下一步</p>
            <p class="btn_red" @click="saveAction()">保存</p>
            <p class="btn_red" @click="printAction()">打印</p>
            <p class="btn_red">导出</p>
          </div>
        </el-col>
      </div>
      <div class="header_btn">
        <div
          :class="['list']"
          @click="activeAction(index, item)"
          v-for="(item, index) in list2"
          :key="index"
        >
          <p :class="selectIndex1 === index ? 'active' : ''">{{item.title}}</p>
        </div>
      </div>
    </div>
    <div class="common" ref="common">
      <v-table1 v-show="selectIndex1 === 0"></v-table1>

      <v-table5 v-show="selectIndex1 === 1"></v-table5>
      <v-table6 v-show="selectIndex1 === 2"></v-table6>
      <v-table7 v-show="selectIndex1 === 3"></v-table7>
      <v-table8 v-show="selectIndex1 === 4"></v-table8>
      <!-- <v-table9 v-show="selectIndex1 === 8"></v-table9>
      <v-table10 v-show="selectIndex1 === 9"></v-table10>-->
      <v-table11 v-show="selectIndex1 === 5"></v-table11>
      <v-table12 v-show="selectIndex1 === 6"></v-table12>
    </div>
    <el-dialog :title="title" :visible.sync="visible" top="10vh" width="60%">
      <v-table1 v-show="selectIndex1 === 0"></v-table1>
      <span slot="footer" class="dialog-footer">
        <el-button @click="printVisibleAction">打印</el-button>
        <el-button @click="visible = false">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog :modal="false" title="流程图" :visible.sync="dialogVisible" width="50%">
      <img src="@/common/images/flow.png" alt />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :close-on-click-modal="false"
      :modal="false"
      :visible.sync="nextShow"
      width="30%"
      center
    >
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="下一步" prop="pass">
          <el-input disabled v-model="ruleForm.pass"></el-input>
        </el-form-item>
        <el-form-item label="处理人" prop="age">
          <el-input v-model="ruleForm.age" disabled></el-input>
        </el-form-item>
        <el-form-item label="意见" prop="name">
          <el-input type="textarea" v-model="ruleForm.name" :autosize="{minRows: 4, maxRows: 6}"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="nextShow = false">确 定</el-button>
          <el-button @click="nextShow = false">取 消</el-button>
        </el-form-item>
      </el-form>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="nextShow = false">取 消</el-button>
        <el-button type="primary" @click="nextShow = false">确 定</el-button>
      </span>-->
    </el-dialog>
  </div>
</template>

<script>
import common from "../common";
import Table1 from "@/components/visit1/table1";
import Table2 from "@/components/visit1/table2";
import Table3 from "@/components/visit1/table3";
import Table4 from "@/components/visit1/table4";
import Table5 from "@/components/visit1/table5";
import Table6 from "@/components/visit1/table6";
import Table7 from "@/components/visit1/table7";
import Table8 from "@/components/visit1/table8";
import Table9 from "@/components/visit1/table9";
import Table10 from "@/components/visit1/table10";
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
    "v-table8": Table8,
    "v-table9": Table9,
    "v-table10": Table10,
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
      list2: [
        { title: "申报表", id: "1" },
        // { title: "出访信息", id: "2" },
        // { title: "出访成员", id: "3" },
        // { title: "出访成员家庭信息", id: "4" },
        { title: "出访地信息", id: "5" },
        { title: "经费预算信息", id: "6" },
        { title: "航班、车次信息", id: "7" },
        { title: "日程信息", id: "8" },
        { title: "附件", id: "9" },
      ],
      selectIndex1: 0,
      screenWidth: "",
      common: null,
      dialogVisible: false,
      nextShow: false,
      list: [
        { title: "交流科工作人员确认" },
        { title: "学院主要负责人审批（书记或院长）" },
        { title: "国际处交流科职员初审", color: "#600000" },
        { title: "国际处审核" },
        { title: "国际处交流科职员初审" },
        { title: "国际处分管副处长审批" },
        { title: "国际处处长审批" },
        // { title: "归档" }
      ],
      ruleForm: {
        pass: "国际处处长审批",
        age: "张三",
        name: "审批通过！",
      },
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
            if (this.$route.path === "/picture/visit1/list") {
              this.$refs.common.style.zoom = scale;
            }
          })();
        };
      },
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
    if (this.$store.state.tableName === "因公出国流程") {
      this.list = [
        { title: "申报表", id: "1" },
        { title: "出访信息", id: "2" },
      ];
    }
    // this.init();
  },
  methods: {
    activeAction(index, item) {
      this.selectIndex1 = index;
    },
    showModal(content) {
      this.content = content;
      this.visible = true;
    },
    printVisibleAction() {
      // window.print();
    },
    showAction() {
      this.dialogVisible = true;
    },

    printAction() {
      // window.print();
      // this.visible = true;
      let subOutputRankPrint = this.common;
      console.log(subOutputRankPrint);
      let newContent = subOutputRankPrint.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print();
      window.location.reload();
      document.body.innerHTML = oldContent;
      return false;
    },
    nextAction() {
      console.log(this.$store.state.form);
      this.nextShow = true;
    },
    saveAction() {
      console.log(this.$store.state.form);
      this.$api.base
        .add({ comformInfo: JSON.stringify(this.$store.state.form) })
        .then((res) => {
          this.$message.success(res.message);
          this.$router.push("/");
        })
        .catch((error) => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped lang="stylus">
.relat {
  position: relative;
  width: 100%;
  height: 100%;

  /deep/ input::-webkit-input-placeholder {
    font-size: 14px;
  }
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

.list_box {
  padding: 20px 40px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;

  .circle {
    border-radius: 50%;
    height: 30px;
    width: 30px;
    background-color: #24ca58;
  }

  i {
    font-size: 24px;
    margin: 0 10px;
  }

  .list {
    width: 91px;
    height: 74px;
    border: 1px solid #dada96;
    border-radius: 10px;
    background-color: #ffff00;
    position: relative;
    text-align: center;
    line-height: 74px;
    font-size: 12px;
    margin-top: 10px;

    i {
      position: absolute;
      left: 0;
      top: 0;
      margin: 0;
    }
  }
}

.demo-ruleForm {
  .el-input {
    width: 60%;
  }

  .el-textarea {
    width: 60%;
  }
}

img {
  width: 100%;
}
</style>
