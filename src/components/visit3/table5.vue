<template>
  <div class="details">
    <div class="table">
      <el-row style="text-align: left;padding: 20px;">
        <img src="../../common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>
          广东外语外贸大学关于
          <el-input class="inph2" v-model="form.birthdate"></el-input>的请示
        </h2>
        <h3>省外办：</h3>
        <div class="p1">
          <span style="margin-left: 36px;">应</span>
          <el-input class="input1" v-model="form.birthdate"></el-input>
          <span>邀请，我校</span>
          <el-input class="input1" v-model="form.birthdate"></el-input>
          <span>拟于</span>
          <el-input class="input1" v-model="form.birthdate"></el-input>
          <span>赴</span>
          <el-input class="input1" v-model="form.birthdate"></el-input>
          <span>，</span>
          <el-input class="input1" style="width: 80px;" v-model="form.birthdate"></el-input>
          <span>此次赴</span>
          <el-input class="input1" v-model="form.birthdate"></el-input>
          <span>的费用将由</span>
          <el-input class="input1" style="width: 80px;" v-model="form.birthdate"></el-input>
          <span>承担。</span>
        </div>
      </el-row>
      <el-row>
        <el-col style="padding: 0 36px">
          <el-input type="textarea" :autosize="{ minRows: 5}" v-model="form.name"></el-input>
        </el-col>
        <el-col>
          <div class="p1">
            <span style="margin-left: 36px;">经研究，我校拟同意***赴台参加此次学术研讨会。</span>
          </div>
          <div class="p1">
            <span style="margin-left: 36px;">特此请示，请予以立项为盼。</span>
          </div>
        </el-col>
        <el-col>
          <div class="p1" style="margin-top: 30px;margin-left: 36px;">
            <div class="flex">
              <p style="width: 50px;">附件：</p>
              <p>1.邀请信</p>
            </div>
            <p style="margin-left: 50px;">2.主办方背景</p>
            <p style="margin-left: 50px;">3.日程</p>
            <p style="margin-left: 50px;">4.政治保证函</p>
            <p style="margin-left: 50px;">5.参会人员名单</p>
            <p style="margin-left: 50px;">
              6.
              <el-input class="input1" style="width: 80px;" v-model="form.birthdate"></el-input>拟发表的论文大纲
            </p>
            <p style="margin-left: 50px;">7.赴台人员名单</p>
          </div>
        </el-col>
        <el-col>
          <div style="flex-direction: row-reverse;display: flex;">
            <div style="display:flex;flex-direction:column;">
              <div class="p1 flex">
                <p>广东外语外贸大学</p>
              </div>
              <el-date-picker style="flex:1;" v-model="form.value1" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </div>
        </el-col>
        <el-col>
          <div style="flex-direction: row-reverse;display: flex;margin-top: 30px;">
            <p>
              （联系人：
              <el-input class="input1" style="width: 80px;height: auto;" v-model="form.birthdate"></el-input>，联系电话：
              <el-input class="input1" style="width: 160px;height: auto;" v-model="form.birthdate"></el-input>）
            </p>
          </div>
        </el-col>
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
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" }
      ]
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

  /deep/ .el-input__icon {
    line-height: 0;
  }

  /deep/ .el-textarea__inner {
    height: 100%;
    border: 1px solid #000;
    border-radius: 0;
    resize: none;
  }

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

  .flex {
    flex-col-center();
  }

  .colum {
    flex-ver-center();
  }

  .input1 {
    max-width: 200px;
    height: 22px;

    /deep/ .el-input__inner {
      padding: 0 5px;
      height: 22px;
      border-radius: 0;
      border: 0;
      border-bottom: 1px solid #000;
    }
  }

  .input2 {
    height: 49px;

    /deep/ .el-input__inner {
      border: 1px solid #000;
      border-top: 0;
      border-left: 0;
      // border-right: 0;
      line-height: 49px;
    }
  }

  .inph2 {
    max-width: 300px;

    /deep/ .el-input__inner {
      font-size: 26px;
      color: #385b83;
      font-weight: 600;
      border-radius: 0;
      border: 0;
      border-bottom: 1px solid #000;
    }
  }

  .p1 {
    // margin-left: 36px;
    line-height: 30px;
    // text-indent: 36px;
  }
}
</style>
