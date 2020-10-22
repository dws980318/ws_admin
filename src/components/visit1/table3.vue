<template>
  <div class="details">
    <div class="table">
      <!-- <el-row style="text-align: left;padding: 20px;border-right: 1px solid #000;">
        <img src="../../common/images/logo.jpg" />
      </el-row>-->
      <el-row>
        <h2>出访成员信息</h2>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-col :span="2">
            <div class="center2">序号</div>
          </el-col>
          <el-col :span="3">
            <div class="center2">姓名</div>
          </el-col>
          <el-col :span="3">
            <div class="center2">性别</div>
          </el-col>
          <el-col :span="3">
            <div class="center2">出生日期</div>
          </el-col>
          <el-col :span="7">
            <div class="center2">工作单位</div>
          </el-col>
          <el-col :span="3">
            <div class="center2">职务</div>
          </el-col>
          <el-col :span="3">
            <div class="center2">操作</div>
          </el-col>
        </el-col>
        <el-col :span="24" v-for="(item, index) in list" :key="index">
          <el-col :span="2">
            <el-input v-model="index" class="input2"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input v-model="item.q" class="input2"></el-input>
          </el-col>
          <el-col :span="3">
            <el-select v-model="item.r" class="input2" placeholder="请选择性别">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-date-picker class="input2" v-model="item.s" type="date" placeholder="选择日期"></el-date-picker>
          </el-col>
          <el-col :span="7">
            <el-input v-model="item.t" class="input2"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input v-model="item.u" class="input2"></el-input>
          </el-col>
          <el-col :span="3" class="btn">
            <el-button size="small" type="primary" @click="editAction">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteAction">删除</el-button>
          </el-col>
        </el-col>
        <el-col
          :span="24"
          class="flex"
          style="border-bottom: 1px solid #000;border-right: 1px solid #000;"
        >
          <el-button @click="addAction">添加出访人员信息</el-button>
        </el-col>
      </el-row>
      <el-dialog
        :modal="false"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        width="60%"
      >
        <div class="table" style="max-width: 1080px;margin: 0 auto;">
          <el-row>
            <h2>出访人员信息</h2>
          </el-row>
          <el-row>
            <el-col :span="12" class="flex">
              <div class="center">工号</div>
              <el-input @change="numValid" v-model="form.a" style="flex:1;"></el-input>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="center">姓名</div>
              <el-input v-model="form.b" style="flex:1;"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="flex">
              <div class="center">性别</div>
              <el-select v-model="form.sex" style="flex:1;" placeholder="请选择性别">
                <el-option
                  v-for="item in option"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="center">出生日期</div>
              <el-date-picker
                style="flex:1;"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                v-model="form.d"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="flex">
              <div :class="['center', {star: star.identity}]">身份证</div>
              <el-input
                :class="[{border: border.identity}]"
                v-model="form.identity"
                @change="identity"
                style="flex:1;"
              ></el-input>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="center">出生地</div>
              <el-input v-model="form.f" style="flex:1;"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="flex">
              <div class="center">户籍地</div>
              <el-input v-model="form.g" style="flex:1;"></el-input>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="center">健康状况</div>
              <el-input v-model="form.h" style="flex:1;"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="flex">
              <div :class="['center', {star: star.phone}]">手机号码</div>
              <el-input
                :class="[{border: border.phone}]"
                @change="phone"
                v-model="form.phone"
                style="flex:1;"
              ></el-input>
            </el-col>
            <el-col :span="12" class="flex">
              <div :class="['center', {star: star.officePhone}]">办公电话</div>
              <el-input
                :class="[{border: border.officePhone}]"
                @change="officePhone"
                v-model="form.officePhone"
                style="flex:1;"
              ></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="flex">
              <div :class="['center', {star: star.email}]">电子邮箱</div>
              <el-input
                :class="[{border: border.email}]"
                @change="email"
                v-model="form.email"
                style="flex:1;"
              ></el-input>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="center">所在单位</div>
              <el-input v-model="form.name" style="flex:1;"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="flex">
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
            <el-col :span="12" class="flex">
              <div class="center">职务职称</div>
              <el-input v-model="form.j" style="flex:1;"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="flex">
              <div class="center">职级</div>
              <el-input v-model="form.k" style="flex:1;"></el-input>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="center">婚姻状况</div>
              <el-select v-model="form.l" style="flex:1;" placeholder="请选择婚姻状况">
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
            <div class="center">是否为涉密人员及涉密等级</div>
            <el-select v-model="form.m" style="flex:1;" placeholder="请选择是否为涉密人员">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-col :span="12" class="flex" v-if="form.m === '1'">
              <div class="center">其他</div>
              <el-select v-model="form.n" style="flex:1;" placeholder="请选择涉密等级">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="flex">
            <div class="center">在团组中拟任职务</div>
            <el-select v-model="form.o" style="flex:1;" placeholder="请选择在团组中拟任职务">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-row>
          <el-row class="flex">
            <div class="center" style="width:241px;">最近一次因公出访时间、所赴国家/地区</div>
            <el-input v-model="form.p" style="flex:1;"></el-input>
          </el-row>
          <el-row>
            <h2>出访成员家庭信息</h2>
          </el-row>
          <el-row class="flex">
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
                      v-for="item in option2"
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
                      v-for="item in option1"
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
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="success" @click="addDialogAction">确 定</el-button>
        </span>
      </el-dialog>
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
      show: false,
      dialogVisible: false,
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
        { value: "1", label: "父亲" },
        { value: "2", label: "母亲" },
        { value: "3", label: "丈夫" },
        { value: "4", label: "妻子" },
        { value: "5", label: "儿子" },
        { value: "6", label: "女儿" },
      ],
      option3: [
        { value: "1", label: "是" },
        { value: "2", label: "否" },
      ],
      option: [
        {
          value: "1",
          label: "男",
        },
        {
          value: "0",
          label: "女",
        },
      ],
      options: [
        {
          value: "1",
          label: "是",
        },
        {
          value: "2",
          label: "否",
        },
      ],
      options1: [
        {
          value: "1",
          label: "一般",
        },
        {
          value: "2",
          label: "重要",
        },
        {
          value: "3",
          label: "核心",
        },
      ],
      options2: [
        {
          value: "1",
          label: "未婚",
        },
        {
          value: "2",
          label: "已婚",
        },
        {
          value: "3",
          label: "离异",
        },
      ],
      options3: [
        {
          value: "1",
          label: "团长",
        },
        {
          value: "2",
          label: "团员",
        },
      ],
      list: [
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
      ],
      list2: [
        { name1: "", name2: "", name3: "", name4: "", name5: "" },
        { name1: "", name2: "", name3: "", name4: "", name5: "" },
        { name1: "", name2: "", name3: "", name4: "", name5: "" },
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
    // this.$store.commit("GET_FROM", this.form);
  },
  mounted() {
    // this.$store.commit("GET_FROM", this.form);
  },
  methods: {
    numValid() {
      if (this.form.a) {
        this.form.a = this.form.a.replace(/[^0-9]/g, "");
      }
    },
    addAction() {
      this.show = false;
      this.dialogVisible = true;
      // this.list.push({ name1: "", name2: "", name3: "", name4: "" });
    },
    editAction() {
      this.show = true;
      this.dialogVisible = true;
    },
    deleteAction() {},
    addDialogAction() {
      if (this.show) {
      } else {
        this.list.push({ name1: "", name2: "", name3: "", name4: "" });
      }
      this.dialogVisible = false;
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
  height: auto;
  border-right: 0;
  border-bottom: 0;
  max-width: 880px;
  margin: 20px auto;
  font-size: 12px;
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

  .btn {
    display: flex;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;

    .el-button {
      height: 31px;
      width: 50%;
      margin-left: 0;
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

  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: auto;
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
      line-height: 32px;
    }
  }

  .one {
    height: 32px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #000;
    padding: 0 30px;
    font-weight: 600;
  }

  .input3 {
    height: 32px;
    border: none;
    border: 1px solid #000;
    border-top: 0;
    border-left: 0;
    border-right: 0;

    /deep/ .el-input__inner {
      border-left: 0;
      border-right: 0;
      padding: 0;
      line-height: 32px;
    }
  }
}
</style>
