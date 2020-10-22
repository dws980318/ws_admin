<template>
  <div class="details">
    <div class="table">
      <el-row style="text-align: left;padding: 20px;border-right: 1px solid #000;">
        <img src="@/common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>广东外语外贸大学孔子学院经费预算申请表</h2>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">流水号</div>
          <el-input v-model="form.date.serialNumber" disabled style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">紧急程度</div>
          <el-select v-model="form.date.urgencyDegree" style="flex:1;" placeholder="请选择紧急程度">
            <el-option
              v-for="item in $baseUrl.degreeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="flex">
          <div class="center">标题</div>
          <el-input v-model="form.date.title" style="flex:1;"></el-input>
        </el-col>
        <!-- <el-col :span="12" class="flex">
          <div class="center">流水号</div>
          <el-input disabled v-model="form.date.serialCode" style="flex:1;"></el-input>
        </el-col>-->
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">项目属性</div>
          <el-select v-model="form.date.type" style="flex:1;" placeholder="请选择礼品名称">
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
          <el-input v-model="form.date.target" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row class="flex">
        <div class="center">场地安排</div>
        <!-- <el-date-picker style="flex:1;" v-model="form.date.value1" type="date" placeholder="选择日期"></el-date-picker> -->
        <el-input v-model="form.date.address" style="flex:1;"></el-input>
      </el-row>
      <el-row class="flex">
        <div class="center" style="height: 80px;">项目内容</div>
        <el-input
          type="textarea"
          v-model="form.date.content"
          style="flex:1;height: 80px;border-left: 1px solid #000;"
        ></el-input>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">参加人数</div>
          <el-input v-model="form.date.nnt" @input="numValid" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">项目对应人群</div>
          <el-input v-model="form.date.proThrong" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">执行起止时间</div>
          <el-date-picker
            @change="dateAction"
            class="date"
            v-model="date"
            type="datetimerange"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <!-- <el-date-picker
            style="flex:1;"
            v-model="form.date.endDate"
            type="datetimerange"
            value-format="yyyy-MM-dd"
            placeholder="选择结束日期"
          ></el-date-picker>-->
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">支出明细</div>
          <el-input v-model="form.date.disburseDetail" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">支出金额</div>
          <el-input v-model="form.date.disburseAmount" @input="numValid" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">支出总额</div>
          <el-input v-model="form.date.amount" @input="numValid" style="flex:1;"></el-input>
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
    <v-opinion v-if="$store.state.tableName" :list="opinionList"></v-opinion>
  </div>
</template>

<script>
import Opinion from "@/views/picture/opinion";
export default {
  name: "Details",
  components: {
    "v-opinion": Opinion,
  },
  data() {
    return {
      form: {
        formId: "1298703620245856256",
        date: {
          urgencyDegree: "1",
        },
      },
      options: [
        {
          value: "1",
          label: "常规，执行1年及以上",
        },
        {
          value: "2",
          label: "新设项目",
        },
      ],
      date: [],
      opinionList: [],
      comformInfo: {
        formId: "1298703620245856256",
        id: "",
      },
    };
  },
  watch: {},
  created() {
    if (this.$store.state.tableName === "经费预算申请流程") {
      this.comformInfo.id = sessionStorage.tableId;
      this.$api.base
        .item({ comformInfo: JSON.stringify(this.comformInfo) })
        .then((res) => {
          this.form = res;
          console.log(this.form);
          this.$store.commit("GET_FROM", this.form);
        });
    } else {
      console.log(1);
      this.$store.commit("GET_FROM", this.form);
    }
  },
  methods: {
    dateAction() {
      console.log(this.date);
      this.form.date.startDate = this.date[0];
      this.form.date.endDate = this.date[1];
    },
    numValid() {
      if (this.form.date.nnt) {
        this.form.date.nnt = this.form.date.nnt.replace(/[^0-9]/g, "");
      }
      if (this.form.date.disburseAmount) {
        this.form.date.disburseAmount = this.form.date.disburseAmount.replace(
          /[^0-9]/g,
          ""
        );
      }
      if (this.form.date.amount) {
        this.form.date.amount = this.form.date.amount.replace(/[^0-9]/g, "");
      }
    },
    initType() {
      this.$api
        .util()
        .then((res) => {
          this.form.date.serialCode = res.data;
        })
        .catch((err) => {
          this.$message.error("查询失败！");
        });
    },
  },
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

  .date {
    flex: 1;

    /deep/ .el-range-separator {
      line-height: 27px;
    }

    /deep/ .el-input__inner {
      border-right: 0;
    }
  }
}
</style>
