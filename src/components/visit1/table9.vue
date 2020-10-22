<template>
  <div class="details">
    <div class="table">
      <el-row style="text-align: left;padding: 20px;">
        <img src="../../common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>责任自负函</h2>
        <div class="p1">
          <span style="margin-left: 36px;">本人拟于</span>
          <el-date-picker
            class="input1"
            style="width: 160px;"
            v-model="form.value1"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
          <!-- <el-input class="input1" style="width: 80px;" v-model="form.birthdate"></el-input>
          <span>年</span>
          <el-input class="input1" style="width: 80px;" v-model="form.birthdate"></el-input>
          <span>月</span>
          <el-input class="input1" style="width: 80px;" v-model="form.birthdate"></el-input>-->
          <span>至</span>
          <el-date-picker
            class="input1"
            style="width: 160px;"
            v-model="form.value1"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
          <!-- <el-input class="input1" style="width: 80px;" v-model="form.birthdate"></el-input>
          <span>年</span>
          <el-input class="input1" style="width: 80px;" v-model="form.birthdate"></el-input>
          <span>月</span>
          <el-input class="input1" style="width: 80px;" v-model="form.birthdate"></el-input> -->
          <span>出访</span>
          <el-input class="input1" style="width: 80px;" v-model="form.birthdate"></el-input>
          <span>,在外</span>
          <el-input class="input1" style="width: 80px;" v-model="form.birthdate"></el-input>
          <span>天。</span>
        </div>
      </el-row>
      <el-row>
        <el-col>
          <div class="p1">
            <p style="text-indent: 36px;">本人承诺若因递交材料时间不足而不能及时取得批件及出访签证（签注），延误出访，责任完全由本人自负。</p>
            <p
              style="text-indent: 36px;"
            >本人已知晓根据证照海关出入境签章时间为准计算出访时间，并承诺将严格按照出访审批部门审批同意的在外时间、地点、停留天数和行程执行出访任务。若有违背，后果自负。</p>
          </div>
        </el-col>
        <el-col>
          <div style="flex-direction: row-reverse;display: flex;">
            <div style="display:flex;flex-direction:column;">
              <div class="p1 flex">
                <p>签名：</p>
                <el-input
                  class="input1"
                  style="width: 180px;height: auto;"
                  v-model="form.birthdate"
                ></el-input>
              </div>
              <div class="p1 flex" style="width: auto">
                <p>日期：</p>
                <el-date-picker
                  class="input1"
                  style="width: 180px;height: auto;"
                  v-model="form.value1"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </div>
            </div>
          </div>
        </el-col>
        <el-col>
          <div style="flex-direction: row-reverse;display: flex;margin-top: 30px;">
            <p>
              <span>完备材料送抵国际处时间：</span>
              <el-date-picker
                class="input1"
                style="width: 180px;height: auto;"
                v-model="form.value1"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </p>
          </div>
          <div style="flex-direction: row-reverse;display: flex;margin-top: 30px;">
            <p>（受理人填写）</p>
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
  margin-top: 20px;
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
    height: 49px;
    font-size: 14px;
    line-height: 49px;
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
    max-width: 250px;
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
}
</style>
