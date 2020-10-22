<template>
  <div class="details">
    <div class="table">
      <el-row style="text-align: left;padding: 20px;border-right: 1px solid #000;">
        <img src="@/common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>决算申请表</h2>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">项目属性</div>
          <el-select v-model="form.name4" style="flex:1;" placeholder="请选择礼品名称">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">项目目标</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row class="flex">
        <div class="center">场地安排</div>
        <!-- <el-date-picker style="flex:1;" v-model="form.value1" type="date" placeholder="选择日期"></el-date-picker> -->
        <el-input v-model="form.name" style="flex:1;"></el-input>
      </el-row>
      <el-row class="flex">
        <div class="center" style="height: 80px;">项目内容</div>
        <el-input
          type="textarea"
          v-model="form.name"
          style="flex:1;height: 80px;border-left: 1px solid #000;"
        ></el-input>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">参加人数</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">项目对应人群</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">执行起止时间</div>
          <!-- <el-input v-model="form.name" style="flex:1;"></el-input> -->
          <el-date-picker style="flex:1;" v-model="form.value1" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">支出明细</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">支出金额</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">支出总额</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row class="flex">
        <div class="center" style="height: 80px;">金额发生差异原因</div>
        <el-input
          type="textarea"
          v-model="form.name"
          style="flex:1;height: 80px;border-left: 1px solid #000;"
        ></el-input>
      </el-row>
      <el-row class="colum">
        <el-col :span="24">
          <el-col :span="8">
            <div class="center2">新增项目</div>
          </el-col>
          <el-col :span="8">
            <div class="center2">新增项目实际支出金额</div>
          </el-col>
          <el-col :span="8">
            <div class="center2">新增项目原因</div>
          </el-col>
        </el-col>
        <el-col :span="24" v-for="(item, index) in list" :key="index">
          <el-col :span="8">
            <el-input v-model="item.name2" class="input2"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="item.name2" class="input2"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="item.name2" class="input2"></el-input>
          </el-col>
        </el-col>
      </el-row>
      <!-- <el-row class="flex" style="height: 112px;">
        <div class="center" style="height: 100%;">学院意见</div>
        <el-col style="flex:1;border-left: 1px solid #000;">
          <el-input style="height: 80px;" type="textarea" v-model="form.name"></el-input>
          <div class="colum">
            <el-col class="flex">
              <el-col :span="12" class="flex">
                <div class="center">领导签字：</div>
                <el-input v-model="form.name" style="flex:1;"></el-input>
              </el-col>
              <el-col :span="12" class="flex">
                <div class="center">日期</div>
                <el-date-picker
                  style="flex:1;"
                  v-model="form.value1"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-col>
            </el-col>
          </div>
        </el-col>
      </el-row>
      <el-row class="flex" style="height: 112px;">
        <div class="center" style="height: 100%;">国际处（港澳台）意见</div>
        <el-col style="flex:1;border-left: 1px solid #000;">
          <el-input style="height: 80px;" type="textarea" v-model="form.name"></el-input>
          <div class="colum">
            <el-col class="flex">
              <el-col :span="12" class="flex">
                <div class="center">领导签字：</div>
                <el-input v-model="form.name" style="flex:1;"></el-input>
              </el-col>
              <el-col :span="12" class="flex">
                <div class="center">日期</div>
                <el-date-picker
                  style="flex:1;"
                  v-model="form.value1"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-col>
            </el-col>
          </div>
        </el-col>
      </el-row>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    return {
      form: {},
      options: [
        {
          value: "1",
          label: "是",
        },
        {
          value: "0",
          label: "否",
        },
      ],
      list: [
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
      ],
    };
  },
  watch: {},
  created() {},
  methods: {},
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
    line-height: 32px;
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
    width: 120px;
    padding: 0 10px;
    font-weight: 600;
  }

  .input1 {
    height: 32px;
    padding: 0 10px;

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

  .radio {
    flex: 1;
    border: 1px solid #000;
    height: 32px;
    border-top: 0;
    padding-left: 20px;

    .el-radio {
      line-height: 32px;
    }
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

  .p1 {
    font-size: 14px;
    line-height: 30px;
    padding-left: 10px;
    font-weight: 600;
    border-right: 1px solid #000;
  }

  .select {
    width: 100%;

    /deep/ .el-input__inner {
      border-right: 0;
    }
  }
}
</style>
