<template>
  <div class="details">
    <div class="table">
      <el-row style="text-align: left;padding: 20px;">
        <img src="../../common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>航班、车次信息</h2>
      </el-row>
      <el-row style="border-top: 1px solid #000;border-left: 1px solid #000;margin: 20px 36px;">
        <el-col :span="24">
          <el-col :span="6">
            <div class="center2">航班车次</div>
          </el-col>
          <el-col :span="3">
            <div class="center2">出发城市</div>
          </el-col>
          <el-col :span="3">
            <div class="center2">抵达城市</div>
          </el-col>
          <el-col :span="6">
            <div class="center2">出发时间</div>
          </el-col>
          <el-col :span="6">
            <div class="center2">抵达时间</div>
          </el-col>
        </el-col>
        <el-col :span="24" v-for="(item, index) in list" :key="index">
          <el-col :span="6">
            <el-input v-model="item.name1" class="input2"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input v-model="item.name2" class="input2"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input v-model="item.name3" class="input2"></el-input>
          </el-col>
          <el-col :span="6" class="flex">
            <!-- <el-input v-model="item.name4" class="input2"></el-input> -->
            <el-date-picker class="input3" style="width: 50%;" v-model="item.name4" type="date" placeholder="选择日期"></el-date-picker>
            <el-input v-model="item.name5" style="flex:1;" class="input2"></el-input>
          </el-col>
          <el-col :span="6" class="flex">
            <!-- <el-input v-model="item.name5" class="input2"></el-input> -->
            <el-date-picker
              class="input3"
              style="width: 50%;"
              v-model="item.name6"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
            <el-input v-model="item.name7" class="input2" style="flex:1;"></el-input>
          </el-col>
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
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      item: {},
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
  margin-top: 20px;
  width: 100%;
  max-width: 1080px;
  margin: 20px auto;
  height: auto;
  // border-right: 0;
  // border-bottom: 0;
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
    // border-bottom: 1px solid #000;
    // border-right: 1px solid #000;
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
    }
  }

  .input3 {
    height: 32px;
    border: none;
    border: 1px solid #000;
    border-top: 0;
    border-left: 0;

    /deep/ .el-input__inner {
      border-left: 0;
      border-right: 0;
      padding-right: 0;
    }
  }

  .radio {
    width: 100%;
    height: 32px;
    border: none;
    border: 1px solid #000;
    border-top: 0;
    border-left: 0;

    /deep/ .el-radio__input {
      border-left: 0;
      border-right: 0;
      line-height: 32px;
    }
  }

  .one {
    height: 32px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #000;
    padding: 0 20px;
    font-weight: 600;
  }
}
</style>
