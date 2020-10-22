<template>
  <div class="details">
    <div class="table">
      <!-- <el-row style="text-align: left;padding: 20px;border-right: 1px solid #000;">
        <img src="../../common/images/logo.jpg" />
      </el-row>-->
      <el-row>
        <h2>出访团组</h2>
        <el-col :span="12" class="flex">
          <div class="center">团组名称</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">出访类型</div>
          <el-select v-model="form.type" style="flex:1;" placeholder="请选择出访类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">出访性质</div>
          <el-select v-model="form.nature" style="flex:1;" placeholder="请选择出访性质">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">任务分类</div>
          <el-select v-model="form.classify" style="flex:1;" placeholder="请选择任务分类">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="flex">
        <div class="center">出访事由</div>
        <el-input v-model="form.incident" style="flex:1;"></el-input>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">出访日期</div>
          <el-date-picker
            style="flex:1;"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            v-model="form.date"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">在外停留天数</div>
          <el-input v-model="form.idleDays" @input="numValid" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="flex">
          <div class="center">出访经费来源说明</div>
          <el-select v-model="form.value3" style="flex:1;" placeholder="请选择来源">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-col :span="12" class="flex" v-if="form.value3 === '4'">
            <div class="center">其他</div>
            <el-input v-model="form.birthdate" style="flex:1;"></el-input>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">经费项目名称及卡号</div>
          <el-input v-model="form.a" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">邀请单位</div>
          <el-input v-model="form.b" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">邀请人姓名及职务</div>
          <el-input v-model="form.c" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">邀请人联系方式</div>
          <el-input v-model="form.d" style="flex:1;"></el-input>
        </el-col>
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
      options: [
        {
          value: "1",
          label: "因公出国",
        },
        {
          value: "2",
          label: "因公赴港澳",
        },
        {
          value: "3",
          label: "因公赴台",
        },
      ],
      options1: [
        {
          value: "1",
          label: "因公出访",
        },
        {
          value: "2",
          label: "特殊原因持因私证照执行因公任务",
        },
      ],
      options2: [
        {
          value: "1",
          label: "访问",
        },
        {
          value: "2",
          label: "学术交流",
        },
        {
          value: "3",
          label: "学术会议",
        },
      ],
      options3: [
        {
          value: "1",
          label: "我校承担",
        },
        {
          value: "2",
          label: "邀请方承担",
        },
        {
          value: "3",
          label: "我校与邀请方共同承担",
        },
        {
          value: "4",
          label: "其他",
        },
      ],
    };
  },
  watch: {},
  created() {
    // if (this.$store.state.tableName === "因公出国流程") {
    //   this.form = {
    //     name: "张三峰小组",
    //     type: "1",
    //     nature: "1",
    //     classify: "2",
    //     incident: "学习交流",
    //     date: "2020-08-14",
    //     idleDays: "7",
    //     value3: "1",
    //     a: "活动交流-22547897454564654",
    //     b: "加尼福尼亚大学",
    //     c: "大卫-李（秘书）",
    //     d: "13170774560",
    //   };
    // }
  },
  methods: {
    numValid() {
      //只能输入数字
      this.form.idleDays = this.form.idleDays.replace(/[^0-9]/g, "");
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
  max-width: 880px;
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
    }
  }
}
</style>
