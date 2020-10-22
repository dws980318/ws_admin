<template>
  <div class="details">
    <el-button
      type="primary"
      size="mini"
      style="margin-bottom: 20px;margin-left: 20px;"
      @click="addAction"
    >添加费用</el-button>

    <div class="table">
      <el-row style="text-align: left;padding: 20px;">
        <img src="../../common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>经费预算信息</h2>
      </el-row>
      <el-row
        class="flex"
        style="border-top: 1px solid #000;border-left: 1px solid #000;margin: 20px 36px;"
      >
        <!-- <div style="width: 150px;" class="colum">
          <el-col :span="24">
            <div class="center2"></div>
          </el-col>
          <el-col :span="24">
            <div class="center2">住宿费</div>
          </el-col>
          <el-col :span="24">
            <div class="center2">伙食费</div>
          </el-col>
          <el-col :span="24">
            <div class="center2">公杂费</div>
          </el-col>
          <el-col :span="24">
            <div class="center2">交通方式、费用金额</div>
          </el-col>
          <el-col :span="24">
            <div class="center2">其他费用</div>
          </el-col>
          <el-col :span="24">
            <div class="center2">汇率</div>
          </el-col>
          <el-col :span="24">
            <div class="center2" style="color: red;">合计</div>
          </el-col>
        </div>-->
        <div style="flex:1;">
          <el-col :span="24">
            <el-col :span="4">
              <div class="center2"></div>
            </el-col>
            <el-col :span="4">
              <div class="center2">标准</div>
            </el-col>
            <el-col :span="4">
              <div class="center2">天数</div>
            </el-col>
            <el-col :span="4">
              <div class="center2">人数</div>
            </el-col>
            <el-col :span="4">
              <div class="center2">小计（美元）</div>
            </el-col>
            <el-col :span="4">
              <div class="center2">小计（人民币）</div>
            </el-col>
          </el-col>
          <el-col :span="24" v-for="(item, index) in list" :key="index">
            <el-col :span="4" v-if="!item.show">
              <div class="center2">{{item.name1}}</div>
            </el-col>
            <el-col :span="4" v-else>
              <div class="center2 select">
                <el-select v-if="item.name1 !== 5" v-model="item.name1" placeholder="请选择">
                  <el-option
                    v-for="item in option"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-input v-else v-model="item.name1" class="input2"></el-input>
              </div>
            </el-col>
            <el-col :span="4">
              <el-input :disabled="item.isShow" v-model="item.name2" class="input2"></el-input>
            </el-col>
            <el-col :span="4">
              <el-input
                @input="numValid(item)"
                :disabled="item.isShow"
                v-model="item.name3"
                class="input2"
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-input
                @input="numValid(item)"
                :disabled="item.isShow"
                v-model="item.name4"
                class="input2"
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-input
                @input="numValid(item)"
                :disabled="item.isShow"
                v-model="item.name5"
                class="input2"
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-input
                @input="numValid(item)"
                :disabled="item.isShow"
                v-model="item.name6"
                class="input2"
              ></el-input>
            </el-col>
          </el-col>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    return {
      form: {},
      list: [
        { name1: "住宿费", name2: "", name3: "", name4: "" },
        { name1: "伙食费", name2: "", name3: "", name4: "" },
        { name1: "公杂费", name2: "", name3: "", name4: "" },
        {
          name1: "交通方式、费用金额",
          name2: "",
          name3: "",
          name4: "",
          isShow: true,
        },
        { name1: null, name2: "", name3: "", name4: "", show: true },
        { name1: "其他费用", name2: "", name3: "", name4: "", isShow: true },
        { name1: null, name2: "", name3: "", name4: "", show: true },
        { name1: "汇率", name2: "", name3: "", name4: "" },
        { name1: "总计", name2: "", name3: "", name4: "" },
      ],
      option: [
        {
          value: 1,
          label: "公务舱",
        },
        {
          value: 2,
          label: "经济舱",
        },
        {
          value: 3,
          label: "一等座",
        },
        {
          value: 4,
          label: "二等座",
        },
        {
          value: 5,
          label: "其他",
        },
      ],
      beizhu: `备注：<span style="color: red">（提交材料时请将本页内容删除）</span><br/>
              1.提交时请使用双面打印，仅打印1-2页。第3页请删除。<br/>
              2.如有会议注册费、城市间交通费等其他费用请列明；<br/>
              3.此表一经报送上级单位，不得修改，请认真填写，核销经费将严格按照批准的总额及单项进行核销；<br/>
              4.预算表格填写请保留原excel表格，请勿截图保存，以便核算。<br/>
              <span style="color: red">5.此表格提交需一式三份，三份都需要由经费“一支笔”签字、盖单位公章。</span>`,
    };
  },
  watch: {},
  created() {},
  methods: {
    addAction() {
      this.list.splice(
        5,
        0,
        { name1: "其他费用", name2: "", name3: "", name4: "", isShow: true },
        { name1: null, name2: "", name3: "", name4: "", show: true }
      );
    },
    numValid(item) {
       if (item.name3) {
        item.name3 = item.name3.replace(/[^0-9]/g, "");
      }
      if (item.name4) {
        item.name4 = item.name4.replace(/[^0-9]/g, "");
      }
      if (item.name5) {
        item.name5 = item.name5.replace(/[^0-9]/g, "");
      }
      if (item.name6) {
        item.name6 = item.name6.replace(/[^0-9]/g, "");
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.table {
  width: 100%;
  max-width: 880px;
  margin: 20px auto;
  height: auto;
  border: 1px solid #000;
  // border-right: 0;
  // border-bottom: 0;
  font-size: 12px;

  /deep/ .el-input__inner {
    border: none;
    border-radius: 0;
    height: 32px;
    font-size: 14px;
    line-height: 32px;
  }

  h2 {
    font-size: 26px;
    text-align: center;
    line-height: 54px;
    color: #385b83;
    // border-bottom: 1px solid #000;
    // border-right: 1px solid #000;
  }

  .center {
    text-align: center;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #000;
    width: 120px;
    padding: 0 20px;
    font-weight: 600;
  }

  .flex {
    flex-col-center();
  }

  .colum {
    flex-ver-center();
  }

  .content {
    height: auto;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    width: 100%;
    padding: 0 10px;
    font-weight: 600;
  }

  .center2 {
    text-align: center;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #000;
    border-top: 0;
    border-left: 0;
    padding: 0 10px;
    font-weight: 600;
  }

  .input2 {
    height: 32px;

    /deep/ .el-input__inner {
      border: 1px solid #000;
      border-top: 0;
      border-left: 0;
      // border-right: 0;
      line-height: 32px;
    }
  }

  .input1 {
    max-width: 250px;
    height: 32px;

    /deep/ .el-input__inner {
      height: 32px;
      border-radius: 0;
      border: 0;
      border-bottom: 1px solid #000;
    }
  }

  .inph2 {
    max-width: 250px;

    /deep/ .el-input__inner {
      font-size: 26px;
      font-weight: 600;
      border-radius: 0;
      border: 0;
      border-bottom: 1px solid #000;
      color: #385b83;
    }
  }

  .p1 {
    margin-left: 36px;
    line-height: 40px;
    // text-indent: 36px;
  }

  .select {
    padding: 0;

    .el-select {
      /deep/ .el-input__inner {
        background-color: #dce9f5;
        height: 29px;
      }
    }

    .el-input {
      /deep/ .el-input__inner {
        background-color: #dce9f5;
        height: 32px;
        // border: 1px solid #000;
        border-right: 0;
        border-bottom: 0;
      }
    }
  }
}
</style>
