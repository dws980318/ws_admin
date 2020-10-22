<template>
  <div class="details">
    <div class="table">
      <el-row style="text-align: left;padding: 20px;">
        <img src="../../common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>
          广东外语外贸大学
          <el-input class="inph2" v-model="form.birthdate"></el-input>的日程安排
        </h2>
      </el-row>
      <el-row
        class="flex"
        style="border-top: 1px solid #000;border-left: 1px solid #000;margin: 20px 36px;"
      >
        <div style="flex:1;">
          <el-col :span="24">
            <el-col :span="12">
              <div class="center2">日期</div>
            </el-col>
            <el-col :span="8">
              <div class="center2">行程</div>
            </el-col>
            <el-col :span="4">
              <div class="center2">住宿</div>
            </el-col>
          </el-col>
          <el-col :span="24" v-for="(item, index) in list" :key="index">
            <el-col :span="4">
              <el-date-picker class="input2" v-model="form.value1" type="date" placeholder="选择日期"></el-date-picker>
            </el-col>
            <el-col :span="4">
              <el-date-picker class="input2" v-model="form.value1" type="date" placeholder="选择日期"></el-date-picker>
            </el-col>
            <el-col :span="4">
              <el-date-picker class="input2" v-model="form.value1" type="date" placeholder="选择日期"></el-date-picker>
            </el-col>
            <el-col :span="8">
              <el-input v-model="item.name2" class="input2"></el-input>
            </el-col>
            <el-col :span="4">
              <el-input v-model="item.name2" class="input2"></el-input>
            </el-col>
          </el-col>
        </div>
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
      beizhu: `<span style="color: red">备注：<br/>
              1. 如往返航班没有选择直航，请直接在“行程”中作简要说明。<br/>
              2. 如有转机，请注明所有航班的起降时间。<br/>
              3.如有城市间交通，请写明所有交通方式、预计出发和抵达时间。</span>`
    };
  },
  watch: {},
  created() {},
  methods: {}
};
</script>

<style lang="stylus" scoped>
.table {
  margin-top: 20px;
  width: 100%;
  max-width: 880px;
  margin: 20px auto;
  height: auto;
  padding: 20px;
  border: 1px solid #000;
  text-align: center;
  font-size: 12px;

  /deep/ .el-date-editor {
    width: auto;

    .el-input__inner {
      padding-right: 0;
    }

    /deep/ .el-input__icon {
      line-height: 0;
    }
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
    margin-left: 36px;
    line-height: 40px;
    // text-indent: 36px;
  }
}
</style>
