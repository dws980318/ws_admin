<template>
  <div class="details">
    <div class="table">
      <el-row style="text-align: left;padding: 20px;">
        <img src="../../common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>承 诺 书</h2>
        <div class="p1">
          <span style="margin-left: 36px;">本人</span>
          <el-input class="input1" v-model="form.birthdate"></el-input>
          <span>为广东外语外贸大学</span>
          <el-input class="input1" v-model="form.birthdate"></el-input>
          <span>学 院</span>
          <el-input class="input1" v-model="form.birthdate"></el-input>
          <span>（部、处）教师，拟于</span>
          <el-date-picker
            class="input1"
            style="width: 160px;"
            v-model="form.value1"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
          <span>至</span>
          <el-date-picker
            class="input1"
            style="width: 160px;"
            v-model="form.value1"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
          <span>
            因公赴台
            <el-input class="input1" v-model="form.birthdate"></el-input>，境外停留
          </span>
          <el-input class="input1" style="width: 80px;" v-model="form.birthdate"></el-input>
          <span>天。</span>
        </div>
      </el-row>
      <el-row>
        <el-col style="margin-top: 40px;">
          <p class="p1">本人现在此郑重承诺：</p>
          <p class="p1">
            1、 本人确保此次出访提交的所有申请报批材料均真实可靠，如有不
            实，一切责任由本人承担；
          </p>
          <p class="p1">
            2、 出访期间将严格遵守因公访台管理部门的有关规定，严格按照出
            访审批主管部门审批同意的行程完成出访任务，确保在规定时间内如
            期返回，按要求及时交回有关证照并提交出访报告。如未能遵守，一
            切后果由本人承担。
          </p>
        </el-col>
        <el-col>
          <div style="flex-direction: row-reverse;display: flex;">
            <div style="display:flex;flex-direction:column;">
              <div class="p1 flex">
                <p class="btn">承诺人（签名）：</p>
                <el-input
                  class="input1"
                  style="width: 160px;height: auto;"
                  v-model="form.birthdate"
                ></el-input>
              </div>
              <div class="p1 flex" style="width: auto">
                <p class="btn">日期：</p>
                <el-date-picker
                  class="input1"
                  style="width: 160px;"
                  v-model="form.value1"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </div>
            </div>
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
  width: 100%;
  max-width: 880px;
  margin: 20px auto;
  height: auto;
  padding: 20px;
  border: 1px solid #000;
  font-size: 12px;

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

  .center2 {
    text-align: center;
    height: 49px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #000;
    border-top: 0;
    border-left: 0;
    padding: 0 10px;
    font-weight: 600;
  }

  .input1 {
    max-width: 200px;
    height: 32px;

    /deep/ .el-input__inner {
      height: 32px;
      border-radius: 0;
      border: 0;
      border-bottom: 1px solid #000;
    }

    /deep/ .el-input__icon {
      line-height: 0;
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
      font-size: 28px;
      color: #000;
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

  .btn {
    width: 100px;
    text-align: justify;
    height: 10px;

    &::after {
      content: '';
      display: inline-block;
      width: 100%;
      content: '';
      height: 0;
    }
  }
}
</style>
