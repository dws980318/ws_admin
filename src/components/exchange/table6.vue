<template>
  <div class="details">
    <div class="table">
      <el-row
        style="text-align: left; padding: 20px; border-right: 1px solid #000"
      >
        <img src="@/common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>广东外语外贸大学万人计划学生申请报名表</h2>
      </el-row>
      <!-- <el-row>
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
      </el-row> -->
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">姓名</div>
          <el-input v-model="form.date.username" style="flex: 1"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">性别</div>
          <el-radio-group class="radio" v-model="form.date.sex">
            <el-radio :label="3">男</el-radio>
            <el-radio :label="6">女</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">出生日期</div>
          <el-date-picker
            style="flex: 1"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            v-model="form.date.birthday"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">宿舍地址</div>
          <el-input v-model="form.date.cadre" style="flex: 1"></el-input>
        </el-col>
      </el-row>
      <el-row class="flex">
        <div class="center">出生地</div>
        <div style="flex: 1">
          <v-distpicker
            class="distpicker"
            v-show="true"
            :province="form.date.birthplaceProvince"
            :city="form.date.birthplace"
            :area="form.date.birthplaceNation"
            @selected="pcdSelect"
          ></v-distpicker>
          <!-- <el-col :span="8">
            <el-select v-model="form.date.birthplaceProvince" class="select" placeholder="请选择省">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select v-model="form.date.birthplace" class="select" placeholder="请选择市">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select v-model="form.date.birthplaceNation" style="width: 100%;" placeholder="请选择县">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>-->
        </div>
      </el-row>
      <el-row class="flex">
        <div :class="['center', { star: star.identity }]">身份证号</div>
        <el-input
          :class="[{ border: border.identity }]"
          v-model="form.date.politics"
          @change="identity"
          style="flex: 1"
        ></el-input>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div :class="['center', { star: star.phone }]">移动电话</div>
          <el-input
            :class="[{ border: border.phone }]"
            @change="phone"
            v-model="form.date.phone"
            style="flex: 1"
          ></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div :class="['center', { star: star.email }]">电子邮箱</div>
          <el-input
            :class="[{ border: border.email }]"
            @change="email"
            v-model="form.date.email"
            style="flex: 1"
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">所属学院</div>
          <!-- <el-select v-model="form.date.college" style="flex:1;" placeholder="请选择所属学院">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>-->
          <el-input v-model="form.date.college" style="flex: 1"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">专业</div>
          <!-- <el-select v-model="form.date.profession" style="flex:1;" placeholder="请选择专业 ">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>-->
          <el-input v-model="form.date.profession" style="flex: 1"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">年级</div>
          <el-input v-model="form.date.grade" style="flex: 1"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">班级</div>
          <el-input v-model="form.date.class1" style="flex: 1"></el-input>
        </el-col>
      </el-row>
      <el-row class="flex">
        <div class="center">申请项目</div>
        <el-input v-model="form.date.pro" style="flex: 1"></el-input>
      </el-row>
      <el-row class="flex">
        <div class="center">项目时间</div>
        <div
          class="flex"
          style="
            flex: 1;
            height: 32px;
            border: 1px solid #000;
            border-top: 0;
            display: flex;
          "
        >
          <!-- <el-date-picker class="input1" v-model="form.date.proDate1" type="date" placeholder="选择日期"></el-date-picker>
          <span>至</span>
          <el-date-picker class="input1" v-model="form.date.proDate2" type="date" placeholder="选择日期"></el-date-picker>
          <span>共</span>-->
          <el-date-picker
            @change="dateAction"
            class="dates"
            v-model="date"
            type="datetimerange"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <el-input
            class="input1"
            style="width: 80px"
            @input="numValid"
            v-model="form.date.dayNum"
          ></el-input>
          <span>天</span>
        </div>
      </el-row>
      <el-row class="flex" style="height: 108px">
        <div class="center" style="height: 100%">学生个人申明</div>
        <el-col style="flex: 1; border-left: 1px solid #000">
          <p class="p1">我保证，以上信息完全符合事实。</p>
          <el-input
            style="height: 79px"
            type="textarea"
            v-model="form.date.applyOpinion"
          ></el-input>
          <!-- <div class="flex">
            <el-col :span="12" class="flex">
              <div class="center">申请人签名：</div>
              <el-input v-model="form.date.applyUser" style="flex:1;"></el-input>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="center">日期</div>
              <el-date-picker
                style="flex:1;"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                v-model="form.date.applyUserDate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-col>
          </div>-->
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
import VDistpicker from "v-distpicker";
import Opinion from "@/views/picture/opinion";
export default {
  name: "Details",
  components: { VDistpicker, "v-opinion": Opinion },
  data() {
    return {
      form: {
        formId: "1300534909179232256",
        date: {
          birthplaceProvince: "",
          birthplace: "",
          birthplaceNation: "",
          modelId: "357503",
        },
      },
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
      border: {
        name: false,
        identity: false,
        phone: false,
        officePhone: false,
        homeTelephone: false,
        email: false,
      },
      star: {
        name: true,
        identity: true,
        phone: true,
        officePhone: true,
        homeTelephone: true,
        email: true,
      },
      date: [],
      opinionList: [
        {
          name1: "可以，通过",
          name2: "李子柒",
          name3: "国际处项目经办人初审",
          name4: "2020-09-08",
        },
        {
          name1: "审批通过",
          name2: "王小二",
          name3: "国际处项目负责人审批",
          name4: "2020-09-09",
        },
        {
          name1: "符合要求，通过",
          name2: "刘大伟",
          name3: "国际处分管副处长审批",
          name4: "2020-09-10",
        },
        {
          name1: "符合万人计划申请流程，确认通过",
          name2: "赵华光",
          name3: "国际处处长审批",
          name4: "2020-09-11",
        },
      ],
      comformInfo: {
        formId: "1300534909179232256",
        id: "",
      },
    };
  },
  watch: {},
  created() {
    if (this.$store.state.tableName === "万人计划流程") {
      this.comformInfo.id = sessionStorage.tableId;
      this.$api.base
        .item({ comformInfo: JSON.stringify(this.comformInfo) })
        .then((res) => {
          this.init(res);
        });
    } else {
      console.log(1);
      this.form.date.createBy = JSON.parse(
        JSON.parse(localStorage.vuex).loginList
      ).id;
      this.$store.commit("GET_FROM", this.form);
      this.$store.commit("SET_PROCESSLIST", []);
    }
  },
  mounted() {},
  methods: {
    init(data) {
      let one = {
        pageNumber: 1,
        pageSize: 10000,
      };
      let two = {
        businessKey: sessionStorage.tableId,
      };
      this.$api.process
        .getthisprocess(one, two)
        .then((res) => {
          this.form = data;
           if (
            this.form.date.proDate1 === null ||
            this.form.date.proDate2 === null
          ) {
            this.date = [];
          } else {
            this.date.push(this.form.date.proDate1);
            this.date.push(this.form.date.proDate2);
          }
          this.form.date.modelId = "357503";
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
        .catch((error) => {
          this.$message.error("失败！");
        });
    },
    dateAction() {
      console.log(this.date);
      if (this.date === null) {
        this.form.date.proDate1 = "";
        this.form.date.proDate2 = "";
      } else {
        this.form.date.proDate1 = this.date[0];
        this.form.date.proDate2 = this.date[1];
        this.form.date.dayNum = this.DateMinus(this.date[0], this.date[1]);
      }
    },
    DateMinus(date1, date2) {
      //date1:小日期   date2:大日期
      var sdate = new Date(date1);
      var now = new Date(date2);
      var days = now.getTime() - sdate.getTime();
      var day = parseInt(days / (1000 * 60 * 60 * 24));
      return day;
    },
    numValid() {
      if (this.form.date.dayNum) {
        this.form.date.dayNum = this.form.date.dayNum.replace(/[^0-9]/g, "");
      }
    },
    identity() {
      if (
        this.form.identity === "" ||
        !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.form.identity)
      ) {
        this.$message.error("身份证号码输入错误，请重新输入！");
        this.border.identity = true;
      } else {
        this.border.identity = false;
      }
    },
    phone() {
      if (
        this.form.phone === "" ||
        !/(^[1][34578]\d{9}$)/.test(this.form.phone)
      ) {
        this.$message.error("手机号码输入错误，请重新输入！");
        this.border.phone = true;
      } else {
        this.border.phone = false;
      }
    },
    email() {
      if (
        this.form.email === "" ||
        !/^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/.test(
          this.form.email
        )
      ) {
        this.$message.error("邮箱输入错误，请重新输入！");
        this.border.email = true;
      } else {
        this.border.email = false;
      }
    },
    pcdSelect(data) {
      this.form.date.birthplaceProvince = data.province.value;
      this.form.date.birthplace = data.city.value;
      this.form.date.birthplaceNation = data.area.value;
    },
  },
};
</script>

<style lang="stylus" scoped>
.star {
  &::before {
    content: '* ';
    color: red;
  }
}

.border {
  /deep/ .el-input__inner {
    border: 1px solid red !important;
  }
}

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

  .dates {
    border-left: 0;
    padding: 0 10px;

    /deep/ .el-input__inner {
      height: 31px;
      border-radius: 0;
      border-left: 0;
      border: 0;
      border-bottom: 1px solid #000;
    }
  }

  .distpicker {
    height: 32px;
    border: 1px solid #000;
    border-top: 0;
    border-right: 0;
    display: flex;

    /deep/ label {
      width: 100%;
      height: 100%;
    }

    /deep/ select {
      height: 31px;
      font-size: 0.6rem;
      padding: 0.4rem 0.75rem;
      width: 100%;
      border: 0;
      border-right: 1px solid #000;
      border-radius: 0;
    }
  }
}
</style>
