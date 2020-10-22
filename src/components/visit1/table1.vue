<template>
  <div class="details">
    <div class="table">
      <el-row style="text-align: left;padding: 20px;border-right: 1px solid #000;">
        <img src="../../common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>广东外语外贸大学因公临时出国（境）申报表</h2>
        <el-row>
          <el-col :span="12" class="flex">
            <div class="center">流水号</div>
            <el-input v-model="form.serialNumber" disabled style="flex:1;"></el-input>
          </el-col>
          <el-col :span="12" class="flex">
            <div class="center">紧急程度</div>
            <el-select v-model="form.urgencyDegree" style="flex:1;" placeholder="请选择紧急程度">
              <el-option
                v-for="item in $baseUrl.degreeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-col :span="8" class="flex">
          <div class="center">姓名</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">性别</div>
          <el-select v-model="form.sex" style="flex:1;" placeholder="请选择性别">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <el-radio-group class="radio" v-model="form.radio">
            <el-radio :label="3">男</el-radio>
            <el-radio :label="6">女</el-radio>
          </el-radio-group>-->
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">出生日期</div>
          <el-date-picker style="flex:1;" v-model="form.date" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
      </el-row>
      <el-row class="flex">
        <div :class="['center', {star: star.identity}]">身份证</div>
        <el-input
          :class="[{border: border.identity}]"
          v-model="form.identity"
          @change="identity"
          style="flex:1;"
        ></el-input>
      </el-row>
      <el-row>
        <el-col :span="8" class="flex">
          <div class="center">出生地</div>
          <el-input v-model="form.birthplace" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">户籍地</div>
          <el-input v-model="form.domicile" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">健康状况</div>
          <el-input v-model="form.physicalCondition" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="flex">
          <div class="center">所在单位</div>
          <el-input v-model="form.unit" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="flex">
          <div class="center">政治面貌</div>
          <el-select v-model="form.politics" style="flex:1;" placeholder="请选择政治面貌">
            <el-option
              v-for="item in option1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">职务职称</div>
          <el-input v-model="form.jobTitle" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">职级</div>
          <el-select v-model="form.jobRank" style="flex:1;" placeholder="请选择职级">
            <el-option
              v-for="item in option2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="flex">
          <div class="center">结婚状况</div>
          <el-select v-model="form.marriageStatus" style="flex:1;" placeholder="请选择结婚状况">
            <el-option
              v-for="item in option4"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="16" class="flex">
          <div class="center">结婚日期</div>
          <el-date-picker
            style="flex:1;"
            v-model="form.marriageDate"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="flex">
          <div class="center">家庭地址</div>
          <el-input v-model="form.houseAddress" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="flex">
          <div :class="['center', {star: star.phone}]">手机号码</div>
          <el-input
            :class="[{border: border.phone}]"
            @change="phone"
            v-model="form.phone"
            style="flex:1;"
          ></el-input>
        </el-col>
        <el-col :span="8" class="flex">
          <div :class="['center', {star: star.officePhone}]">办公电话</div>
          <el-input
            :class="[{border: border.officePhone}]"
            @change="officePhone"
            v-model="form.officePhone"
            style="flex:1;"
          ></el-input>
        </el-col>
        <el-col :span="8" class="flex">
          <div :class="['center', {star: star.homeTelephone}]">家庭电话</div>
          <el-input
            :class="[{border: border.homeTelephone}]"
            @change="homeTelephone"
            v-model="form.homeTelephone"
            style="flex:1;"
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" class="flex">
          <div :class="['center', {star: star.email}]">电子邮箱</div>
          <el-input
            :class="[{border: border.email}]"
            @change="email"
            v-model="form.email"
            style="flex:1;"
          ></el-input>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">预算</div>
          <el-input v-model="form.budget" @input="numValid" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row class="flex">
        <div class="center">出访事由50字以内</div>
        <el-input v-model="form.a" style="flex:1;"></el-input>
      </el-row>
      <el-row>
        <el-col :span="16" class="flex">
          <div class="center">出访日期</div>
          <el-date-picker style="flex:1;" v-model="form.b" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">在外停留天数</div>
          <el-input v-model="form.idleDays" @input="numValid" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="flex">
          <div class="center">出访经费来源说明</div>
          <el-select v-model="form.c" style="flex:1;" placeholder="请选择">
            <el-option
              v-for="item in option3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-col :span="8" class="flex" v-if="form.c === '4'">
            <div class="center">其他</div>
            <el-input v-model="form.d" style="flex:1;"></el-input>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-col :span="7">
            <div class="center2">拟出访国家或地区途径国家或地区</div>
          </el-col>
          <el-col :span="2">
            <div class="center2">出访天数</div>
          </el-col>
          <el-col :span="5">
            <div class="center2">入境日期根据航班</div>
          </el-col>
          <el-col :span="10">
            <div class="center2">邀请/组团单位及邀请人姓名和职务（中文）</div>
          </el-col>
        </el-col>
        <el-col
          :span="24"
          v-for="(item, index) in list"
          :key="index"
          style="border-bottom: 1px solid #000;"
        >
          <el-col :span="7">
            <el-input v-model="item.name1" class="input2"></el-input>
          </el-col>
          <el-col :span="2">
            <el-input @change="numValids(item)" v-model="item.name2" class="input2"></el-input>
          </el-col>
          <el-col :span="5">
            <el-input v-model="item.name3" class="input2"></el-input>
          </el-col>
          <el-col :span="10">
            <el-input v-model="item.name4" class="input2"></el-input>
          </el-col>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24" class="flex">
          <div
            class="content"
          >本人承诺，本次出访的邀请单位及邀请信内容属实，出访不涉及政治敏感问题、无科技涉密问题、无知识产权保护问题。提交材料前已阅读广东外语外贸大学出国（境）的有关规定，已知晓出访时长含离、抵中国大陆境日，不擅自更改出访地和出访日程，不绕道途径或入境其他国家或城市，并将在批准时间内回国。</div>
        </el-col>
      </el-row>

      <!-- <el-row>
        <el-col :span="12" class="flex">
          <div class="center" style="width: 140px;">本人签名：</div>
          <el-input v-model="form.e" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center" style="width: 140px;">日期：</div>
          <el-date-picker style="flex:1;" v-model="form.f" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="flex">
          <div class="content">此次出访事项、出访地、出访预算一神审核，同意报送校国际合作与交流处审核。</div>
        </el-col>
      </el-row>-->

      <!-- <el-row>
        <el-col :span="12" class="flex">
          <div class="center" style="width: 140px;">日期</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center" style="width: 140px;">日期（公章）</div>
          <el-input v-model="form.birthdate" style="flex:1;"></el-input>
        </el-col>
      </el-row>-->
      <!-- <el-row>
        <el-col :span="24" class="flex">
          <div
            class="content"
            style="font-weight: normal;"
          >注：本表必须由本人签名，不得盖签名章或代签。无行政职务人员由本单位负责国际事务领导签名，副处职级干部由单位正处职级干部签名。正处职级干部还需填写“广东外语外贸大学正处职级干部因公出访审批表”。出访预算需包含所有出访费用，“一支笔”为支付出访经费项目卡号负责人。</div>
        </el-col>
      </el-row>-->
    </div>
    <v-table2 :form="form"></v-table2>
    <v-table3 :form="form"></v-table3>

    <v-opinion v-if="$store.state.tableName" :list="opinionList"></v-opinion>
  </div>
</template>

<script>
import Table2 from "@/components/visit1/table2";
import Table3 from "@/components/visit1/table3";
import Table4 from "@/components/visit1/table4";
import Opinion from "@/views/picture/opinion";
export default {
  name: "Details",
  components: {
    "v-table2": Table2,
    "v-table3": Table3,
    "v-table4": Table4,
    "v-opinion": Opinion,
  },
  data() {
    return {
      form: {
        urgencyDegree: "1",
      },
      option1: [
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
      option2: [
        { value: "1", label: "正厅级" },
        { value: "2", label: "副厅级" },
        { value: "3", label: "正处级" },
        { value: "4", label: "副处级" },
        { value: "5", label: "副科级" },
        { value: "6", label: "普通" },
      ],
      option3: [
        { value: "1", label: "我校承担" },
        { value: "2", label: "邀请方承担" },
        { value: "3", label: "我校与邀请方共同承担" },
        { value: "4", label: "其他" },
      ],
      option4: [
        { value: "1", label: "未婚" },
        { value: "2", label: "已婚" },
        { value: "3", label: "离异" },
      ],
      list: [
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
      ],
      opinionList: [
        { name1: "可以，通过", name2: "李四", name3: "出访科经办人审批", name4: "2020-09-08" },
        { name1: "内容详细，符合因公出国流程，通过", name2: "张三", name3: "国际处副处长审批", name4: "2020-09-09" },
        { name1: "符合要求，通过", name2: "王五", name3: "财务处审批", name4: "2020-09-10" },
        { name1: "符合要求，确认通过", name2: "赵六", name3: "书记审批", name4: "2020-09-11" },
      ],
      options: [
        { value: "1", label: "男" },
        { value: "0", label: "女" },
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
    };
  },
  watch: {},
  created() {
    this.$store.commit("GET_FROM", this.form);
    if (this.$store.state.tableName === "因公出国流程") {
      this.form = {
        name: "张三峰",
        sex: "1",
        date: "1968-01-02",
        identity: "362414196801021234",
        birthplace: "广东",
        domicile: "广东",
        physicalCondition: "健康",
        unit: "广东外语外贸大学",
        politics: "1",
        jobTitle: "书记",
        jobRank: "3",
        marriageStatus: "已婚",
        marriageDate: "1992-05-20",
        houseAddress: "广州市白云区白云大道北新网小区2804",
        phone: "13170774707",
        officePhone: "020-1475214",
        homeTelephone: "13170774707",
        email: "13170774707@163.com",
        budget: "100000",
        a: "要跟外国友人一起探讨学术问题",
        b: "2020-08-14",
        idleDays: "30",
        c: "1",
        d: "",
        list: [
          {
            name1: "英国",
            name2: "5",
            name3: "2020-08-15",
            name4: "英国国际交流组织/小刘/秘书",
          },
          {
            name1: "法国",
            name2: "5",
            name3: "2020-08-20",
            name4: "法国国际交流组织/小李/秘书",
          },
          {
            name1: "德国",
            name2: "5",
            name3: "2020-08-25",
            name4: "德国国际交流组织/小王/秘书",
          },
        ],
        e: "张三峰",
        f: "2020-08-13",
        g: "陈青莲",
        h: "2020-08-14",
      };
    }
  },
  mounted() {
    // this.$store.commit("GET_FROM", this.form);
  },
  methods: {
    numValid() {
      if (this.form.budget) {
        this.form.budget = this.form.budget.replace(/[^0-9]/g, "");
      }
      if (this.form.idleDays) {
        this.form.idleDays = this.form.idleDays.replace(/[^0-9]/g, "");
      }
    },
    numValids(item) {
      if (item.name2) {
        item.name2 = item.name2.replace(/[^0-9]/g, "");
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
    officePhone() {
      if (
        this.form.officePhone === "" ||
        !/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(this.form.officePhone)
      ) {
        this.$message.error("办公电话输入错误，请重新输入！");
        this.border.officePhone = true;
      } else {
        this.border.officePhone = false;
      }
    },
    homeTelephone() {
      if (
        this.form.homeTelephone === "" ||
        !/(^[1][34578]\d{9}$)/.test(this.form.homeTelephone)
      ) {
        this.$message.error("电话输入错误，请重新输入！");
        this.border.homeTelephone = true;
      } else {
        this.border.homeTelephone = false;
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
