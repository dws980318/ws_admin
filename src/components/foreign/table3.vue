<template>
  <div class="details">
    <div class="table">
      <el-row style="text-align: left;padding: 20px;border-right: 1px solid #000;">
        <img src="@/common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>涉外讲座情况反馈表</h2>
      </el-row>
      <el-row class="flex" style="height: 128px;">
        <div class="center" style="height: 100%;padding: 0 10px;">来访团组人员信息</div>
        <el-col class="colum" style="flex:1;border-left: 1px solid #000;">
          <el-col class="flex">
            <div class="center">来访团组名称</div>
            <el-input class="inp2" v-model="form.name"></el-input>
          </el-col>
          <el-col class="flex">
            <div class="center">姓名（中英文）</div>
            <el-input class="inp2" v-model="form.name"></el-input>
            <div class="center">职务</div>
            <el-input class="inp2" v-model="form.birthdate"></el-input>
          </el-col>
          <el-col class="flex">
            <div class="center">随行人数</div>
            <el-input class="inp2" v-model="form.name"></el-input>
            <div class="center">来访日期</div>
            <el-date-picker class="inp2" v-model="form.value1" type="date" placeholder="选择日期"></el-date-picker>
          </el-col>
          <el-col class="flex">
            <div class="center">联系人</div>
            <el-input class="inp2" v-model="form.name"></el-input>
            <div class="center">电话</div>
            <el-input class="inp2" v-model="form.birthdate"></el-input>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="flex" style="height: 64px;">
        <div class="center" style="height: 100%;padding: 0 10px;">接待单位</div>
        <el-col class="colum" style="flex:1;border-left: 1px solid #000;">
          <el-col class="flex">
            <div class="center">主要领导</div>
            <el-input class="inp2" v-model="form.name"></el-input>
            <div class="center">职务</div>
            <el-input class="inp2" v-model="form.birthdate"></el-input>
          </el-col>
          <el-col class="flex">
            <div class="center">联系人</div>
            <el-input class="inp2" v-model="form.name"></el-input>
            <div class="center">电话</div>
            <el-input class="inp2" v-model="form.birthdate"></el-input>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="flex" style="height: 118px;">
        <div class="center" style="height: 100%;padding: 0 10px;">来访目的</div>
        <el-input
          type="textarea"
          v-model="form.name"
          style="flex:1;height: 100%;border-left: 1px solid #000;"
        ></el-input>
      </el-row>
      <el-row class="flex" style="height: 178px;">
        <div class="center" style="height: 100%;padding: 0 10px;">交流达成成果</div>
        <el-input
          type="textarea"
          v-model="form.name"
          style="flex:1;height: 100%;border-left: 1px solid #000;"
        ></el-input>
      </el-row>
      <el-row class="flex" style="height: 58px;">
        <div class="center" style="height: 100%;padding: 0 10px;">批注</div>
        <el-input
          type="textarea"
          v-model="form.name"
          style="flex:1;height: 100%;border-left: 1px solid #000;"
        ></el-input>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">填表单位</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">填表时间</div>
          <el-date-picker style="flex:1;" v-model="form.value1" type="date" placeholder="选择日期"></el-date-picker>
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
      form: {}
    };
  },
  watch: {},
  created() {},
  methods: {}
};
</script>

<style lang="stylus" scoped>
.table {
  border: 1px solid #000;
  width: 100%;
  max-width: 880px;
  margin: 20px auto;
  height: auto;
  border-right: 0;
  border-bottom: 0;
  font-size: 12px;

  /deep/ .el-input__icon {
    line-height: 0;
  }

  /deep/ .el-textarea__inner {
    height: 100%;
    border: 1px solid #000;
    border-top: 0;
    border-left: 0;
    border-radius: 0;
    resize: none;
    font-size: 14px;
  }

  /deep/ .el-input__inner {
    border: none;
    border-radius: 0;
    border: 1px solid #000;
    border-top: 0;
    height: 32px;
    font-size: 14px;
  }

  .flex {
    flex-col-center();
  }

  .colum {
    flex-ver-center();
  }

  h2 {
    font-size: 26px;
    text-align: center;
    line-height: 54px;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    color: #385b83;
  }

  .center {
    text-align: center;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #000;
    width: 100px;
    padding: 0 10px;
    font-weight: 600;
  }

  .inp2 {
    height: 32px;
    flex: 1;

    /deep/ .el-input__inner {
      border-radius: 0;
      border: 1px solid #000;
      border-top: 0;
      height: 100%;
    }
  }
}
</style>
