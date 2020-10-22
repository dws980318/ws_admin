<template>
  <div class="details">
    <div class="table">
      <el-row style="text-align: left;padding: 20px;border-right: 1px solid #000;">
        <img src="../../common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>出访成员家庭信息</h2>
      </el-row>
      <el-row class="flex">
        <!-- <div style="width: 100px;">
          <div class="center" style="width: 100%;height: 192px;">家庭主要成员情况</div>
        </div>-->
        <div style="flex:1;">
          <el-col :span="24">
            <el-col :span="2">
              <div class="center2">称谓</div>
            </el-col>
            <el-col :span="2">
              <div class="center2">姓名</div>
            </el-col>
            <el-col :span="1">
              <div class="center2" style="padding: 0 5px;">年龄</div>
            </el-col>
            <el-col :span="4">
              <div class="center2">政治面貌</div>
            </el-col>
            <el-col :span="6">
              <div class="center2">工作单位</div>
            </el-col>
            <el-col :span="3">
              <div class="center2">职务</div>
            </el-col>
            <el-col :span="3">
              <div class="center2">居住地</div>
            </el-col>
            <el-col :span="3">
              <div class="center2" style="padding: 0 5px;">是否取得外国国籍、境外长期或永久居留权</div>
            </el-col>
          </el-col>
          <el-col :span="24" v-for="(item, index) in list" :key="index">
            <el-col :span="2">
              <el-select v-model="item.a" class="input2" placeholder="请选择">
                <el-option
                  v-for="item in option1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="2">
              <el-input v-model="item.b" class="input2"></el-input>
            </el-col>
            <el-col :span="1">
              <el-input v-model="item.c" @input="numValid(item)" class="input2"></el-input>
            </el-col>
            <el-col :span="4">
              <el-select v-model="item.d" class="input2" placeholder="请选择">
                <el-option
                  v-for="item in option2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-input v-model="item.e" class="input2"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input v-model="item.f" class="input2"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input v-model="item.g" class="input2"></el-input>
            </el-col>
            <el-col :span="3" class="flex">
              <el-select v-model="item.h" class="input2" placeholder="请选择">
                <el-option
                  v-for="item in option3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-col style="width: 180%;" v-if="item.h === '1'">
                <el-input v-model="item.i" class="input2"></el-input>
              </el-col>
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
  props: {
    form: {
      type: Object,
      default: "",
    },
  },
  data() {
    return {
      option1: [
        { value: "1", label: "父亲" },
        { value: "2", label: "母亲" },
        { value: "3", label: "丈夫" },
        { value: "4", label: "妻子" },
        { value: "5", label: "儿子" },
        { value: "6", label: "女儿" },
      ],
      option2: [
        { value: "1", label: "中共党员" },
        { value: "2", label: "中共预备党员" },
        { value: "3", label: "共青团员" },
        { value: "4", label: "民革党员" },
        { value: "5", label: "民盟盟员" },
        { value: "6", label: "民建会员" },
        { value: "7", label: "民进会员" },
        { value: "8", label: "农工党党员" },
        { value: "9", label: "致公党党员" },
        { value: "10", label: "九三学社社员" },
        { value: "11", label: "台盟盟员" },
        { value: "12", label: "无党派人士" },
        { value: "13", label: "群众" },
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
    numValid(item) {
      console.log(item.age);
      item.age = item.age.replace(/[^0-9]/g, "");
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
}
</style>
