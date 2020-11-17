<template>
  <div class="details">
    <div class="table">
      <el-row
        style="text-align: left; padding: 20px; border-right: 1px solid #000"
      >
        <img src="../../common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>涉外礼品申领表</h2>
      </el-row>
      <!-- <el-row>
        <el-col :span="12" class="flex">
          <div class="center">流水号</div>
          <el-input
            v-model="form.date.serialNumber"
            disabled
            style="flex: 1"
          ></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">紧急程度</div>
          <el-select v-model="form.date.urgencyDegree" style="flex: 1">
            <el-option
              v-for="item in $baseUrl.degreeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row> -->
      <el-row class="flex">
        <div class="center">申领时间：</div>
        <el-date-picker
          placeholder="请选择申领时间"
          class="inp2"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          v-model="form.date.applyDate"
          type="date"
        ></el-date-picker>
      </el-row>
      <el-row class="flex">
        <div class="center">申领事由：</div>
        <el-input class="inp2" v-model="form.date.applyThing"></el-input>
      </el-row>
      <el-row class="flex">
        <div class="center">礼品名称：</div>
        <el-input style="flex: 1" v-model="form.date.presentName"></el-input>
        <!-- <el-select v-model="form.date.presentName" style="flex:1;" placeholder="请选择礼品名称">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>-->
      </el-row>
      <el-row class="flex">
        <div class="center">申领数量：</div>
        <el-input
          class="inp2"
          v-model="form.date.presentNum"
          @input="numValid"
        ></el-input>
      </el-row>
      <el-row class="flex">
        <div class="center">领用人：</div>
        <el-input class="inp2" v-model="form.date.username"></el-input>
      </el-row>
      <el-row class="flex" style="height: 118px">
        <div class="center" style="height: 100%; padding: 0 10px">备注：</div>
        <el-input
          type="textarea"
          v-model="form.date.content"
          style="flex: 1; height: 100%; border-left: 1px solid #000"
        ></el-input>
      </el-row>
    </div>
    <v-opinion
      v-if="examineList !== undefined && examineList.length > 0"
      :list="opinionList"
    ></v-opinion>
  </div>
</template>

<script>
import Opinion from "@/views/picture/opinion";
export default {
  name: "Details",
  components: {
    "v-opinion": Opinion
  },
  data() {
    return {
      form: {
        formId: "1298423742407667712",
        date: {
          modelId: "350003"
        }
      },
      options: [
        {
          value: "1",
          label: "礼品1"
        },
        {
          value: "0",
          label: "礼品2"
        }
      ],
      opinionList: [],
      comformInfo: {
        formId: "1298423742407667712",
        id: ""
      },
      processList: [],
      examineList: []
    };
  },
  watch: {},
  created() {
    if (this.$store.state.tableName === "涉外礼品申领流程") {
      this.comformInfo.id = sessionStorage.tableId;
      this.$api.base
        .item({ comformInfo: JSON.stringify(this.comformInfo) })
        .then(res => {
          // setTimeout(() => {
          this.init(res);
          // }, 10);
        });
    } else {
      console.log(1);
      // this.serialInit();
      this.form.date.createBy = JSON.parse(
        JSON.parse(localStorage.vuex).loginList
      ).id;
      this.$store.commit("GET_FROM", this.form);
      this.$store.commit("SET_PROCESSLIST", []);
    }
  },
  methods: {
    init(data) {
      let one = {
        pageNumber: 1,
        pageSize: 10000
      };
      let two = {
        businessKey: sessionStorage.tableId
      };
      this.$api.process
        .getthisprocess(one, two)
        .then(res => {
          this.form = data;
          this.form.date.modelId = "350003";
          this.form.date.show = true;
          this.form.date.urgencyDegree = "1";
          if (res.count > 0) {
            this.processList = res.data;
            console.log(this.processList[0].serialNumber);
            this.form.date.serialNumber = this.processList[0].serialNumber;
            this.form.date.urgencyDegree = this.processList[0].urgencyDegree;
            this.$store.commit("SET_PROCESSLIST", res.data);
          }
          console.log(this.form);
          this.$store.commit("GET_FROM", this.form);
        })
        .catch(error => {
          this.$message.error("失败！");
        });
    },
    serialInit() {
      this.$api.util().then(res => {
        if (res.status === 200) {
          this.form.date.serialNumber = res.data;
        }
      });
    },
    numValid() {
      if (this.form.date.presentNum) {
        this.form.date.presentNum = this.form.date.presentNum.replace(
          /[^0-9]/g,
          ""
        );
      }
    }
  }
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

    /deep/ .el-input__icon {
      line-height: 0;
    }
  }
}
</style>
