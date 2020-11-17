<template>
  <div class="details">
    <!-- <div>
      <el-button size="small" type="success" @click="addAction">添加项目</el-button>
      <el-button size="small" type="danger" @click="deleteAction">删除项目</el-button>
    </div>-->
    <div class="table">
      <el-row
        style="text-align: left; padding: 20px; border-right: 1px solid #000"
      >
        <img src="@/common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>广东外语外贸大学孔子学院经费决算申请表</h2>
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
        <el-col :span="24" class="flex">
          <div class="center">标题</div>
          <el-select
            @change="selectAction"
            v-model="form.date.title"
            style="flex: 1"
            placeholder="请选择标题"
          >
            <el-option
              v-for="item in options2"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <!-- <el-col :span="12" class="flex">
          <div class="center">流水号</div>
          <el-input disabled v-model="form.date.serialCode" style="flex:1;"></el-input>
        </el-col>-->
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">项目属性</div>
          <el-select
            disabled
            v-model="form.date.type"
            style="flex: 1"
            placeholder="请选择礼品名称"
          >
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
          <el-input
            disabled
            v-model="form.date.target"
            style="flex: 1"
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="flex">
        <div class="center">场地安排</div>
        <el-input
          disabled
          v-model="form.date.address"
          style="flex: 1"
        ></el-input>
      </el-row>
      <el-row class="flex">
        <div class="center" style="height: 80px">项目内容</div>
        <el-input
          disabled
          type="textarea"
          v-model="form.date.content"
          style="flex: 1; height: 80px; border-left: 1px solid #000"
        ></el-input>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">参加人数</div>
          <el-input
            disabled
            v-model="form.date.nnt"
            @input="numValid"
            style="flex: 1"
          ></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">项目对应人群</div>
          <el-input
            disabled
            v-model="form.date.proThrong"
            style="flex: 1"
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">执行起止时间</div>
          <el-date-picker
            disabled
            class="date"
            v-model="date"
            type="datetimerange"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">支出明细</div>
          <el-input
            disabled
            v-model="form.date.disburseDetail"
            style="flex: 1"
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">支出金额</div>
          <el-input
            disabled
            v-model="form.date.disburseAmount"
            @input="numValid"
            style="flex: 1"
          ></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">支出总额</div>
          <el-input
            disabled
            v-model="form.date.amount"
            @input="numValid"
            style="flex: 1"
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="flex">
        <div class="center" style="height: 80px">金额发生差异原因</div>
        <el-input
          type="textarea"
          v-model="form.date.editReason"
          style="flex: 1; height: 80px; border-left: 1px solid #000"
        ></el-input>
      </el-row>
      <el-row class="colum">
        <el-col :span="24">
          <el-col :span="9">
            <div class="center2">新增项目</div>
          </el-col>
          <el-col :span="4">
            <div class="center2">实际支出金额</div>
          </el-col>
          <el-col :span="9">
            <div class="center2">原因</div>
          </el-col>
          <el-col :span="2">
            <div class="center2 btn" @click="addAction">+</div>
          </el-col>
        </el-col>
        <el-col
          :span="24"
          v-for="(item, index) in form.mainformdates[0].dates"
          :key="index"
        >
          <el-col :span="9">
            <el-input v-model="item.date.newPro" class="input2"></el-input>
          </el-col>
          <el-col :span="4">
            <el-input
              v-model="item.date.newProAmount"
              @input="numValids(item)"
              class="input2"
            ></el-input>
          </el-col>
          <el-col :span="9">
            <el-input
              v-model="item.date.newProReason"
              class="input2"
            ></el-input>
          </el-col>
          <el-col :span="2">
            <div class="delete input2" @click="deleteAction(item, index)">
              -
            </div>
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
    <v-opinion v-if="$store.state.tableName" :list="opinionList"></v-opinion>
  </div>
</template>

<script>
import Opinion from "@/views/picture/opinion";
export default {
  components: {
    "v-opinion": Opinion,
  },
  data() {
    return {
      form: {
        formId: "1298703738672029696",
        date: {
          modelId: "357501",
        },
        mainformdates: [
          {
            formId: "1303355363651485696",
            dates: [
              {
                date: {
                  newPro: "",
                  newProAmount: "",
                  newProReason: "",
                },
                mainformdates: [],
              },
            ],
          },
        ],
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
      options2: [],
      list: [{ name1: "", name2: "", name3: "", name4: "" }],
      date: [],
      opinionList: [],
      comformInfo: {
        formId: "1298703738672029696",
        id: "",
      },
    };
  },
  watch: {},
  created() {
    this.initType();
    if (this.$store.state.tableName === "经费决算申请流程") {
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
          this.form.date.modelId = "357501";
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
    numValid() {
      if (this.form.e) {
        this.form.e = this.form.e.replace(/[^0-9]/g, "");
      }
      if (this.form.h) {
        this.form.h = this.form.h.replace(/[^0-9]/g, "");
      }
      if (this.form.i) {
        this.form.i = this.form.i.replace(/[^0-9]/g, "");
      }
    },
    numValids(item) {
      item.date.newProAmount = item.date.newProAmount.replace(/[^0-9]/g, "");
    },
    initType() {
      let URLparams = {
        pageNumber: 1,
        pageSize: 10000,
        comformInfo: {
          formId: "1298703620245856256",
          date: {},
        },
      };
      URLparams.comformInfo = JSON.stringify(URLparams.comformInfo);
      this.$api.base
        .list(URLparams)
        .then((res) => {
          this.options2 = res.data;
        })
        .catch((error) => {
          this.$message.error("查询失败！");
        });
    },
    selectAction() {
      console.log(this.form.date.title);
      for (let i in this.options2) {
        if (this.form.date.title === this.options2[i].id) {
          // this.form.date.serialCode = this.options2[i].serialCode;
          this.form.date.type = this.options2[i].type;
          this.form.date.target = this.options2[i].target;
          this.form.date.address = this.options2[i].address;
          this.form.date.content = this.options2[i].content;
          this.form.date.nnt = this.options2[i].nnt;
          this.form.date.proThrong = this.options2[i].proThrong;
          this.form.date.disburseDetail = this.options2[i].disburseDetail;
          this.form.date.disburseAmount = this.options2[i].disburseAmount;
          this.form.date.amount = this.options2[i].amount;
          this.date.push(this.options2[i].startDate);
          this.date.push(this.options2[i].endDate);
          console.log(this.date);
        }
      }
    },
    addAction() {
      this.form.mainformdates[0].dates.push({
        date: {
          newPro: "",
          newProAmount: "",
          newProReason: "",
        },
      });
    },
    deleteAction(item, index) {
      if (this.form.mainformdates[0].dates.length < 2) {
        this.$message.error("不能再删了！");
      } else {
        this.form.mainformdates[0].dates.splice(index, 1);
      }
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

  /deep/ .el-select .el-input.is-disabled .el-input__inner:hover {
    border-color: #000;
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

.btn {
  font-size: 24px;
  cursor: pointer;
  text-align: center;

  &:hover {
    color: #00d0ff;
  }
}

.delete {
  font-size: 40px;
  cursor: pointer;
  text-align: center;
  line-height: 28px;

  &:hover {
    color: red;
  }
}
</style>
