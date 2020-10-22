<template>
  <div class="details">
    <div class="table">
      <el-row style="text-align: left;padding: 20px;border-right: 1px solid #000;">
        <img src="../../common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>广东外语外贸大学教育合作涉外协议签署审批表</h2>
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
      <el-row class="flex">
        <div class="center">申报单位：</div>
        <el-input v-model="form.date.applyUnit" style="flex:1;"></el-input>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">申报时间：</div>
          <el-date-picker
            style="flex:1;"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            v-model="form.date.applyDate"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">协议类型：</div>
          <el-input v-model="form.date.protocolType" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row class="flex">
        <div class="center">协议名称：</div>
        <el-input v-model="form.date.protocolName" style="flex:1;"></el-input>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">合作高校：</div>
          <el-input v-model="form.date.school" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">是否已签署：</div>
          <el-radio-group
            v-model="form.date.isSign"
            class="redio_flex"
            style="height: 32px;flex:1;"
          >
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">协议签署方式说明：</div>
          <el-radio-group
            v-model="form.date.signType"
            class="redio_flex"
            style="height: 32px;flex:1;"
          >
            <el-radio label="1">现场签署</el-radio>
            <el-radio label="2">寄签</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">所需协议份数：</div>
          <el-input v-model="form.date.protocolNum" @input="numValid" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">经办人：</div>
          <el-input v-model="form.date.applyUser" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div :class="['center', {star: star.phone}]">联系电话：</div>
          <el-input
            :class="[{border: border.phone}]"
            @change="phone"
            v-model="form.date.phone"
            style="flex:1;"
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <p class="p1">内容摘要：</p>
        <p class="p1">（请简要概况本协议核心内容）</p>
        <el-input type="textarea" v-model="form.date.content" style="height: 118px;"></el-input>
      </el-row>
      <!-- <el-row style="border-bottom: 1px solid #000;">
        <p class="p1">单位领导审批意见（签字、盖章）：</p>
        <el-input type="textarea" v-model="form.name" class="text"></el-input>
        <div class="p1 flex" style="width: auto;flex-direction: row-reverse;padding-bottom: 10px;">
          <div class="flex">
            <p>日期：</p>
            <el-date-picker
              class="input1"
              style="flex:1;"
              v-model="form.value1"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </div>
        </div>
      </el-row>
      <el-row style="border-bottom: 1px solid #000;">
        <p class="p1">研究生审批意见（签字、盖章）：</p>
        <p class="p1">仅限与研究生有关协议</p>
        <el-input type="textarea" v-model="form.name" class="text"></el-input>
        <div class="p1 flex" style="width: auto;flex-direction: row-reverse;padding-bottom: 10px;">
          <div class="flex">
            <p>日期：</p>
            <el-date-picker
              class="input1"
              style="flex:1;"
              v-model="form.value1"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </div>
        </div>
      </el-row>
      <el-row>
        <p
          style="font-weight: 600;padding-left: 10px;border-right: 1px solid #000;line-height: 30px;"
        >备注:</p>
        <div
          style="padding-left: 10px;padding-bottom: 10px;font-weight: 600;border-bottom: 1px solid #000;border-right: 1px solid #000;"
        >
          <p>1、请将协议纸质版文件打印后，与协议签署审批表一同交至国际合作与交流处项目科，地址：北校区行政楼319，南校区老师可使用文件交换车将文件交换至北校区行政楼319范老师处。</p>
          <p>2、请附学院党政联席会议关于同意签署该协议的会议纪要。</p>
        </div>
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
        formId: "1300535036409249792",
        date: {
          urgencyDegree: "1",
        },
      },
      border: {
        phone: false,
      },
      star: {
        phone: true,
      },
      opinionList: [],
      comformInfo: {
        formId: "1300535036409249792",
        id: "",
      },
    };
  },
  watch: {},
  created() {
     if (this.$store.state.tableName === "港澳台教师聘用流程") {
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
    numValid() {
      if (this.form.date.protocolNum) {
        this.form.date.protocolNum = this.form.date.protocolNum.replace(
          /[^0-9]/g,
          ""
        );
      }
    },
    phone() {
      if (this.form.date.phone) {
        this.form.date.phone = this.form.date.phone.replace(/[^0-9]/g, "");
      }
      if (
        this.form.date.phone === "" ||
        !/(^[1][34578]\d{9}$)/.test(this.form.date.phone)
      ) {
        this.$message.error("手机号码输入错误，请重新输入！");
        this.border.phone = true;
      } else {
        this.border.phone = false;
      }
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

  /deep/ .el-input__icon {
    line-height: 0;
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

  .redio_flex {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 100%;
    border: 1px solid #000;
    border-top: 0;
    text-align: center;
    padding: 0 15px;

    /deep/ .el-radio {
      // height: 100%;
      line-height: 24px;
    }
  }

  .inp2 {
    height: 32px;
    flex: 1;

    /deep/ .el-input__inner {
      border-radius: 0;
      border: 1px solid #000;
      border-top: 0;
      height: 100%;
      font-size: 18px;
    }
  }

  .inp3 {
    height: 32px;
    width: 120px;

    /deep/ .el-input__inner {
      border-radius: 0;
      border: 1px solid #000;
      border-left: 0;
      border-top: 0;
      border-bottom: 1px solid #000;
      height: 100%;
    }
  }

  .input1 {
    max-width: 250px;
    height: 32px;

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

  .p1 {
    font-size: 14px;
    line-height: 20px;
    padding-left: 10px;
    font-weight: 600;
    border-right: 1px solid #000;
  }

  .text {
    height: 78px;
    border-bottom: 0;

    /deep/ .el-textarea__inner {
      height: 100%;
      border: 1px solid #000;
      border-top: 0;
      border-bottom: 0;
      border-left: 0;
      border-radius: 0;
      resize: none;
    }
  }
}
</style>
