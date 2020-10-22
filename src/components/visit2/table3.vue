<template>
  <div class="details">
    <div class="table">
      <el-row style="text-align: left;padding: 20px;">
        <img src="../../common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>
          广东外语外贸大学
          <el-input class="inph2" v-model="form.birthdate"></el-input>经费预算证明
        </h2>
        <div class="p1 flex">
          <span>经审核，同意张三赴香港/澳门访问/学术会议的</span>
          <el-input class="input1" style="width: 350px;" v-model="form.birthdate"></el-input>
          <span>具体费用如下：</span>
        </div>
      </el-row>
      <el-row
        class="flex"
        style="border-top: 1px solid #000;border-left: 1px solid #000;margin: 20px 36px;"
      >
        <div style="width: 150px;" class="colum">
          <el-col :span="24">
            <div class="center2"></div>
          </el-col>
          <el-col :span="24">
            <div class="center2">住宿费</div>
          </el-col>
          <el-col :span="24">
            <div class="center2">伯明翰</div>
          </el-col>
          <el-col :span="24">
            <div class="center2">伙食费</div>
          </el-col>
          <el-col :span="24">
            <div class="center2">公杂费</div>
          </el-col>
          <el-col :span="24">
            <div class="center2">国际旅费</div>
          </el-col>
          <el-col :span="24">
            <div class="center2" style="color: red;">合计</div>
          </el-col>
        </div>
        <div style="flex:1;">
          <el-col :span="24">
            <el-col :span="6">
              <div class="center2">标准</div>
            </el-col>
            <el-col :span="4">
              <div class="center2">天数</div>
            </el-col>
            <el-col :span="4">
              <div class="center2">人数</div>
            </el-col>
            <el-col :span="5">
              <div class="center2">小计（美元）</div>
            </el-col>
            <el-col :span="5">
              <div class="center2">小计（人民币）</div>
            </el-col>
          </el-col>
          <el-col :span="24" v-for="(item, index) in list" :key="index">
            <el-col :span="6">
              <el-input v-model="item.name1" class="input2"></el-input>
            </el-col>
            <el-col :span="4">
              <el-input v-model="item.name2" class="input2"></el-input>
            </el-col>
            <el-col :span="4">
              <el-input v-model="item.name2" class="input2"></el-input>
            </el-col>
            <el-col :span="5">
              <el-input v-model="item.name2" class="input2"></el-input>
            </el-col>
            <el-col :span="5">
              <el-input v-model="item.name2" class="input2"></el-input>
            </el-col>
          </el-col>
        </div>
      </el-row>
      <p class="p1">特此证明。</p>
      <div style="flex-direction: row-reverse;display: flex;">
        <div style="display:flex;flex-direction:column;">
          <div class="p1 flex">
            <p style="width: 180px;">经费项目一支笔签字(单位盖章)</p>
            <el-input class="input1" style="width: 140px;height: auto;" v-model="form.birthdate"></el-input>
          </div>
          <div class="p1 flex" style="width: auto">
            <p style="width: 180px;">日期：</p>
            <el-date-picker
              class="input1"
              style="width: 140px;height: auto;"
              v-model="form.value1"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </div>
        </div>
      </div>
      <el-row>
        <el-col style="padding: 5px 30px;color: #999">
          预算表以
          <el-date-picker
            class="input1"
            style="width: 160px;"
            v-model="form.value1"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
          <!-- <el-input class="input1" style="width: 80px;height: auto;" v-model="form.birthdate"></el-input>年
          <el-input class="input1" style="width: 80px;height: auto;" v-model="form.birthdate"></el-input>月
          <el-input class="input1" style="width: 80px;height: auto;" v-model="form.birthdate"></el-input>日 -->
          的人民币对
          <el-input class="input1" style="width: 80px;height: auto;" v-model="form.birthdate"></el-input>（币种）汇率（汇率值）作为折算参考，实际业务中，若发生汇率变动，报销时以财务核算的即日汇率为准。
        </el-col>
        <el-col style="padding: 5px 30px;color: #999">
          预算表中□国际旅费□国（境）外城市间交通费，以经查询的
           <el-date-picker
            class="input1"
            style="width: 160px;"
            v-model="form.value1"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
          <!-- <el-input class="input1" style="width: 80px;height: auto;" v-model="form.birthdate"></el-input>年
          <el-input class="input1" style="width: 80px;height: auto;" v-model="form.birthdate"></el-input>月
          <el-input class="input1" style="width: 80px;height: auto;" v-model="form.birthdate"></el-input>日 -->
          <el-input class="input1" style="width: 80px;height: auto;" v-model="form.birthdate"></el-input>（地点）赴
          <el-input class="input1" style="width: 80px;height: auto;" v-model="form.birthdate"></el-input>（地点）
          <el-input class="input1" style="width: 80px;height: auto;" v-model="form.birthdate"></el-input>舱的
          <el-input class="input1" style="width: 80px;height: auto;" v-model="form.birthdate"></el-input>机票价 车票 船票
          <el-input class="input1" style="width: 80px;height: auto;" v-model="form.birthdate"></el-input>（价格金额）作为参考，实际业务中，若发生相关交通工具价格变动，报销时以财务根据文件核算的交通工具费用为准。
        </el-col>
        <el-col
          style="padding: 5px 30px;color: #999"
        >温馨提示：其他费用主要指出（国）境签证费、必需的保险费用、防疫费用、国际会议注册费等；如本次行程可能涉及此类费用，请务必填写相关栏目以避免对实际报销造成影响。</el-col>
      </el-row>
    </div>
    <el-row>
      <el-col style="padding: 5px 30px;">
        <p style="width: 50%;margin: 0 auto;font-size: 14px;" v-html="beizhu"></p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    return {
      form: {},
      list: [
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" }
      ],
      beizhu: `备注：<span style="color: red">（提交材料时请将本页内容删除）</span><br/>
              1.提交时请使用双面打印，仅打印1-2页。第3页请删除。<br/>
              2.如有会议注册费、城市间交通费等其他费用请列明；<br/>
              3.此表一经报送上级单位，不得修改，请认真填写，核销经费将严格按照批准的总额及单项进行核销；<br/>
              4.预算表格填写请保留原excel表格，请勿截图保存，以便核算。<br/>
              <span style="color: red">5.此表格提交需一式三份，三份都需要由经费“一支笔”签字、盖单位公章。</span>`
    };
  },
  watch: {},
  created() {},
  methods: {}
};
</script>

<style lang="stylus" scoped>
.table {
  width: 100%;
  max-width: 880px;
  margin: 20px auto;
  height: auto;
  padding: 20px;
  border: 1px solid #000;
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
}
</style>
