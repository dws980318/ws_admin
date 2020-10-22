<template>
  <div class="details">
    <div class="table">
      <el-row style="text-align: left;padding: 20px;border-right: 1px solid #000;">
        <img src="@/common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>因公临时出港人员备案表</h2>
        <el-col :span="8" class="flex">
          <div class="center">姓名</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">性别</div>
          <el-select v-model="form.value" style="flex:1;" placeholder="请选择性别">
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
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">政治面貌</div>
          <el-select v-model="form.name4" style="flex:1;" placeholder="请选择政治面貌">
            <el-option
              v-for="item in option2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">健康状况</div>
          <el-input v-model="form.birthdate" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row class="flex">
        <div class="center" style="width: auto">工作单位及职务、是否为涉密人员及涉密等级</div>
        <el-input v-model="form.name" style="flex:1;"></el-input>
      </el-row>
      <el-row class="flex">
        <div style="width: 100px;">
          <div class="center" style="width: 100%;height: 192px;">家庭主要成员情况</div>
        </div>
        <div style="flex:1;border-left: 1px solid #000;">
          <el-col :span="24">
            <el-col :span="4">
              <div class="center2">称谓</div>
            </el-col>
            <el-col :span="3">
              <div class="center2">姓名</div>
            </el-col>
            <el-col :span="3">
              <div class="center2">年龄</div>
            </el-col>
            <el-col :span="4">
              <div class="center2">政治面貌</div>
            </el-col>
            <el-col :span="10">
              <div class="center2">工作单位、职务及居住地（是否取得外国国籍、境外长期或永久居留权）</div>
            </el-col>
          </el-col>
          <el-col :span="24" v-for="(item, index) in list" :key="index">
            <el-col :span="4">
              <el-select v-model="item.value3" class="input2" placeholder="请选择称谓">
                <el-option
                  v-for="item in option1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-input v-model="item.name2" class="input2"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input v-model="item.name3" class="input2"></el-input>
            </el-col>
            <el-col :span="4">
              <el-select v-model="item.name4" class="input2" placeholder="请选择政治面貌">
                <el-option
                  v-for="item in option2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="10">
              <el-input v-model="item.name5" class="input2"></el-input>
            </el-col>
          </el-col>
        </div>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">组团单位</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">在团组中拟任职务</div>
          <el-select v-model="form.value4" style="flex:1;" placeholder="请选择职级">
            <el-option
              v-for="item in option4"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="flex">
          <div class="center" style="width: 240px">
            出国任务、所赴国家
            （地区）及停留时间
          </div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="flex">
          <div class="center" style="width: 240px">出国任务审批单位</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="flex">
          <div class="center" style="width: 240px">最近一次因公出国时间、所赴国家（地区）及任务</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
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
          <el-col :span="12" class="flex" v-if="form.value3 === '4'">
            <div class="center">其他</div>
            <el-input v-model="form.birthdate" style="flex:1;"></el-input>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="flex" style="height: 192px;">
        <div style="width: 100px;">
          <div class="center" style="width: 100%;height: 192px;">人员派出单位意见</div>
        </div>
        <div
          style="flex:1;border-left: 1px solid #000;display:flex;flex-direction:column;height: 192px;"
        >
          <el-col :span="24" style="flex:1">
            <el-input type="textarea" v-model="form.name" style="height: 100%;"></el-input>
          </el-col>
          <div>
            <el-col :span="12" class="flex">
              <div class="center">负责人签字：</div>
              <el-input v-model="form.name" style="flex:1;"></el-input>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="center">日期</div>
              <el-date-picker style="flex:1;" v-model="form.value1" type="date" placeholder="选择日期"></el-date-picker>
            </el-col>
          </div>
        </div>
      </el-row>
      <el-row class="flex">
        <el-col style="width: 100px;" class="flex">
          <div class="center" style="width: 100%">说 明</div>
        </el-col>
        <el-col style="flex:1" class="flex">
          <div
            class="content"
            style="height: 32px;border-left: 1px solid #000;"
          >本表由因公临时出国人员所在单位填写，按照干部管理权限，报组织人事部门备案，并抄报外事审批部门。</div>
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
      form: {},
      options: [
        {
          value: "选项1",
          label: "男"
        },
        {
          value: "选项2",
          label: "女"
        }
      ],
      option1: [
        { value: "1", label: "父亲" },
        { value: "2", label: "母亲" },
        { value: "3", label: "丈夫" },
        { value: "4", label: "妻子" },
        { value: "4", label: "儿子" },
        { value: "4", label: "女儿" }
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
        { value: "13", label: "群众" }
      ],
      option3: [
        { value: "1", label: "我校承担" },
        { value: "2", label: "邀请方承担" },
        { value: "3", label: "我校与邀请方共同承担" },
        { value: "4", label: "其他" }
      ],
      option4: [
        { value: "1", label: "团长" },
        { value: "2", label: "团员" }
      ],
      list: [
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" }
      ],
      list2: [
        { name1: "", name2: "", name3: "", name4: "", name5: "" },
        { name1: "", name2: "", name3: "", name4: "", name5: "" },
        { name1: "", name2: "", name3: "", name4: "", name5: "" },
        { name1: "", name2: "", name3: "", name4: "", name5: "" },
        { name1: "", name2: "", name3: "", name4: "", name5: "" },
        { name1: "", name2: "", name3: "", name4: "", name5: "" }
      ]
    };
  },
  watch: {},
  created() {},
  methods: {}
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
