<template>
  <div class="details">
    <div class="table">
      <el-row style="text-align: left;padding: 20px;border-right: 1px solid #000;">
        <img src="../../common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>广东外语外贸大学因公临时出台申报表</h2>
        <el-col :span="8" class="flex">
          <div class="flex">
            <div :class="['center', {star: star.name}]">姓名</div>
            <el-input :class="[{border: border.name}]" v-model="form.name" style="flex:1;"></el-input>
          </div>
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
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">出生日期</div>
          <el-date-picker style="flex:1;" v-model="form.value1" type="date" placeholder="选择日期"></el-date-picker>
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
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">户籍地</div>
          <el-input v-model="form.birthdate" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">健康状况</div>
          <el-input v-model="form.identity" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="flex">
          <div class="center">所在单位</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="flex">
          <div class="center">政治面貌</div>
          <el-select v-model="form.value1" style="flex:1;" placeholder="请选择政治面貌">
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
          <el-input v-model="form.birthdate" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">职级</div>
          <el-select v-model="form.value2" style="flex:1;" placeholder="请选择职级">
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
          <el-select v-model="form.valu1" style="flex:1;" placeholder="请选择结婚状况">
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
          <el-date-picker style="flex:1;" v-model="form.value1" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="flex">
          <div class="center">家庭地址</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="flex">
          <div class="center">手机</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">办公电话</div>
          <el-input v-model="form.birthdate" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">家庭电话</div>
          <el-input v-model="form.identity" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" class="flex">
          <div class="center">电子邮箱</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">预算</div>
          <el-input v-model="form.birthdate" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row class="flex">
        <div class="center">出访事由50字以内</div>
        <el-input v-model="form.name" style="flex:1;"></el-input>
      </el-row>
      <el-row>
        <el-col :span="16" class="flex">
          <div class="center">出访日期</div>
          <el-date-picker style="flex:1;" v-model="form.value1" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">在外停留天数</div>
          <el-input v-model="form.birthdate" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="flex">
          <div class="center">出访经费来源说明</div>
          <el-select v-model="form.value3" style="flex:1;" placeholder="请选择职级">
            <el-option
              v-for="item in option3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-col :span="8" class="flex" v-if="form.value3 === '4'">
            <div class="center">其他</div>
            <el-input v-model="form.birthdate" style="flex:1;"></el-input>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-col :span="6">
            <div class="center2">拟出访国家或地区途径国家或地区</div>
          </el-col>
          <el-col :span="3">
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
          <el-col :span="6">
            <el-input v-model="item.name1" class="input2"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input v-model="item.name2" class="input2"></el-input>
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
        <el-col :span="24">
          <el-col :span="6">
            <div class="center2">航班车次</div>
          </el-col>
          <el-col :span="4">
            <div class="center2">出发城市</div>
          </el-col>
          <el-col :span="4">
            <div class="center2">抵达城市</div>
          </el-col>
          <el-col :span="5">
            <div class="center2">出发时间</div>
          </el-col>
          <el-col :span="5">
            <div class="center2">抵达时间</div>
          </el-col>
        </el-col>
        <el-col
          :span="24"
          v-for="(item, index) in list2"
          :key="index"
          style="border-bottom: 1px solid #000;"
        >
          <el-col :span="6">
            <el-input v-model="item.name1" class="input2"></el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="item.name2" class="input2"></el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="item.name3" class="input2"></el-input>
          </el-col>
          <el-col :span="5">
            <!-- <el-input v-model="item.name4" class="input2"></el-input> -->
            <el-date-picker
              class="input2"
              style="width: 100%;"
              v-model="form.value1"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-col>
          <el-col :span="5">
            <!-- <el-input v-model="item.name5" class="input2"></el-input> -->
            <el-date-picker
              class="input2"
              style="width: 100%;"
              v-model="form.value1"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
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
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center" style="width: 140px;">本人签名：</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center" style="width: 140px;">日期：</div>
          <el-date-picker style="flex:1;" v-model="form.value1" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="flex">
          <div class="content">此次出访事项、出访地、出访预算一神审核，同意报送校国际合作与交流处审核。</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center" style="width: 140px;">审批人</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center" style="width: 140px;">审批时间</div>
          <el-date-picker style="flex:1;" v-model="form.value1" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
      </el-row>
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
      <el-row>
        <el-col :span="24" class="flex">
          <div
            class="content"
            style="font-weight: normal;"
          >注：本表必须由本人签名，不得盖签名章或代签。无行政职务人员由本单位负责国际事务领导签名，副处职级干部由单位正处职级干部签名。正处职级干部还需填写“广东外语外贸大学正处职级干部因公出访审批表”。出访预算需包含所有出访费用，“一支笔”为支付出访经费项目卡号负责人。</div>
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
      form: {
        name1: true,
        identity: "",
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
      options: [
        {
          value: "选项1",
          label: "男",
        },
        {
          value: "选项2",
          label: "女",
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
    };
  },
  watch: {},
  created() {
    this.$store.commit("GET_FROM", this.form);
  },
  mounted() {
    this.$store.commit("GET_FROM", this.form);
  },
  methods: {
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
        this.$message.error("手机号码输入错误，请重新输入！");
        this.border.homeTelephone = true;
      } else {
        this.border.homeTelephone = false;
      }
    },
    email() {
      if (
        this.form.email === "" ||
        !/^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/.test(this.form.email)
      ) {
        this.$message.error("手机号码输入错误，请重新输入！");
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

.demo_form {
  /deep/ .el-form-item {
    .el-form-item__content {
      line-height: 32px;

      .el-form-item__error {
        // display: none;
      }
    }
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
