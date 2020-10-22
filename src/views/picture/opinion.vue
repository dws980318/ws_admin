<template>
  <div class="table">
    <h2>审批意见</h2>
    <div v-for="(item, index) in list" :key="index">
      <el-row class="flex" style="height: 118px;">
        <div class="center" style="height: 100%;padding: 0 10px;">审批意见</div>
        <el-input
          disabled
          type="textarea"
          v-model="item.name1"
          style="flex:1;height: 100%;border-left: 1px solid #000;"
        ></el-input>
      </el-row>
      <el-row>
        <el-col :span="8" class="flex">
          <div class="center">审批人</div>
          <el-input disabled v-model="item.name2" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">审批环节</div>
          <el-input disabled v-model="item.name3" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">审批时间</div>
          <el-date-picker
            disabled
            @change="a(item)"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            style="flex:1;"
            v-model="item.name4"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Opinion",
  props: {
    list: {
      type: Array,
      default: "",
    },
  },
  components: {},
  data() {
    return {};
  },
  watch: {},
  created() {},
  mounted() {
    // this.$store.commit("GET_FROM", this.form);
  },
  methods: {
    a(item) {
      console.log(item);
    },
  },
};
</script>

<style lang="stylus" scoped>
.table {
  border: 1px solid #000;
  margin-top: 20px;
  width: 100%;
  max-width: 880px;
  margin: 20px auto;
  font-size: 12px;
  height: auto;
  border-right: 0;
  border-bottom: 0;
  text-align: center;

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

  .radio {
    flex: 1;
    border: 1px solid #000;
    height: 32px;
    border-top: 0;

    .el-radio {
      line-height: 32px;
    }
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
      border-bottom: 0;
    }
  }
}
</style>
