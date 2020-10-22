<template>
  <div class="details">
    <div class="table">
      <el-row style="text-align: left;padding: 20px;border-right: 1px solid #000;">
        <img src="../../common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>出访地信息</h2>
      </el-row>
      <el-row class="flex">
        <!-- <div style="width: 100px;">
          <div class="center" style="width: 100%;height: 192px;">家庭主要成员情况</div>
        </div>-->
        <div style="flex:1;">
          <el-col :span="24">
            <el-col :span="4">
              <div class="center2">出访国家</div>
            </el-col>
            <el-col :span="4">
              <div class="center2">出访城市</div>
            </el-col>
            <el-col :span="4">
              <div class="center2" style="padding: 0 5px;">入境性质</div>
            </el-col>
            <el-col :span="4">
              <div class="center2">停留类型/签注类型</div>
            </el-col>
            <el-col :span="4">
              <div class="center2">入境日期</div>
            </el-col>
            <el-col :span="4">
              <div class="center2">停留天数</div>
            </el-col>
          </el-col>
          <el-col :span="24" v-for="(item, index) in list" :key="index">
            <el-col :span="4">
              <el-input v-model="item.name1" class="input2"></el-input>
            </el-col>
            <el-col :span="4">
              <el-input v-model="item.name2" class="input2"></el-input>
            </el-col>
            <el-col :span="4">
              <el-select v-model="item.name3" class="input2" placeholder="请选择">
                <el-option
                  v-for="item in option"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="item.name4" class="input2" placeholder="请选择">
                <el-option
                  v-for="item in option1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-date-picker class="date" v-model="item.name5" type="date" placeholder="选择日期"></el-date-picker>
            </el-col>
            <el-col :span="4">
              <el-input v-model="item.idleDays" @input="numValids(item)" class="input2"></el-input>
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
      option: [
        {
          value: "1",
          label: "入境",
        },
        {
          value: "2",
          label: "过境",
        },
      ],
      option1: [
        { value: "1", label: "一次入境" },
        { value: "2", label: "两次入境" },
        { value: "3", label: "多次入境" },
        { value: "4", label: "一次过境" },
        { value: "5", label: "两次过境" },
        { value: "6", label: "多次过境" },
        { value: "7", label: "三月一次（港澳台）" },
        { value: "8", label: "三月二次（港澳台）" },
        { value: "9", label: "三月多次（港澳台）" },
        { value: "10", label: "六月多次（港澳台）" },
        { value: "11", label: "一年多次（港澳台）" },
      ],
      option3: [
        { value: "1", label: "是" },
        { value: "2", label: "否" },
      ],
      list: [
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
      ],
      list2: [
        { name1: "", name2: "", name3: "", name4: "", name5: "" },
        { name1: "", name2: "", name3: "", name4: "", name5: "" },
        { name1: "", name2: "", name3: "", name4: "", name5: "" },
        { name1: "", name2: "", name3: "", name4: "", name5: "" },
        { name1: "", name2: "", name3: "", name4: "", name5: "" },
        { name1: "", name2: "", name3: "", name4: "", name5: "" },
      ],
    };
  },
  watch: {},
  created() {},
  methods: {
    numValid() {
      if (this.form.idleDays) {
        this.form.idleDays = this.form.idleDays.replace(/[^0-9]/g, "");
      }
    },
    numValids(item) {
        item.idleDays = item.idleDays.replace(/[^0-9]/g, "");
    },
  },
};
</script>

<style lang="stylus" scoped>
.table {
  border: 1px solid #000;
  margin-top: 20px;
  width: 100%;
  height: auto;
  border-right: 0;
  border-bottom: 0;
  max-width: 1080px;
  margin: 20px auto;
  text-align: center;
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

  .radio {
    flex: 1;
    border: 1px solid #000;
    height: 32px;
    border-top: 0;

    .el-radio {
      line-height: 32px;
    }
  }

  .content {
    height: auto;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    width: 100%;
    padding: 0 20px;
    font-weight: 600;
    line-height: 24px;
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
    padding: 0 20px;
    font-weight: 600;
  }

  .input2 {
    height: 32px;
    border: none;
    border: 1px solid #000;
    border-top: 0;
    border-left: 0;

    /deep/ .el-input__inner {
      border-left: 0;
      border-right: 0;
      padding: 0 5px;
    }
  }

  .date {
    height: 32px;
    border: none;
    border: 1px solid #000;
    border-top: 0;
    border-left: 0;
    width: 100%;

    /deep/ .el-input__inner {
      border-left: 0;
      border-right: 0;
    }
  }
}
</style>
