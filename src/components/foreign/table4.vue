<template>
  <div class="details">
    <div class="table" v-if="selectIndexShow === 0">
      <el-row style="text-align: left;padding: 20px;">
        <img src="@/common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>广东外语外贸大学海外名师讲学项目</h2>
        <h2>申请表</h2>
      </el-row>
      <el-row style="margin-top: 5%;">
        <div class="p3 flex">
          <p style="margin-left: 36px;">
            项目名称：
            <span></span>
          </p>
          <el-input class="input1" style="height: 55px;" v-model="form.date.proName"></el-input>
        </div>
        <div class="p3 flex">
          <p style="margin-left: 36px;">
            项目申报部门：
            <span></span>
          </p>
          <el-input class="input1" style="height: 55px;" v-model="form.date.proDept"></el-input>
        </div>
        <div class="p3 flex">
          <p style="margin-left: 36px;">
            项目申报日期：
            <span></span>
          </p>
          <el-date-picker
            class="input1"
            style="width: 250px;"
            v-model="form.date.proDate"
            type="date"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </div>
      </el-row>
      <el-row>
        <h3>填写说明</h3>
      </el-row>
      <el-row>
        <p style="text-indent: 36px;line-height: 30px;">项目单位在填写申请表时，请注意以下事项：</p>
        <p style="text-indent: 36px;line-height: 30px;">一、“项目名称”需填写具体的讲座项目名称。</p>
        <p
          style="text-indent: 36px;line-height: 30px;"
        >二、“项目联系人”必须如实填写,确保在项目的组织和实施过程可随时联系上项目单位和项目联系人。</p>
        <p
          style="text-indent: 36px;line-height: 30px;"
        >三、“项目经费预算”中“项目经费预算明细”指聘请该专家所需要的所有经费预算，其中包括了需要通过“广东外语外贸大学海外名师讲学”项目申请的经费及审定单位拟支付的经费。该栏目对应的测算依据依照实际情况确定。申请资助经费一栏仅填写需要通过“广东外语外贸大学海外名师讲学”项目申请的经费，该栏目对应的测算依据根据该项目资助标准结合实际情况确定。</p>
      </el-row>
      <h3>一、项目单位基本信息</h3>
      <el-row style="border-left: 1px solid #000;border-top: 1px solid #000;">
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
        <el-col>
          <el-col :span="12" class="flex">
            <div class="center">项目执行院（系）</div>
            <el-input v-model="form.date.proDean" style="flex:1;"></el-input>
          </el-col>
          <el-col :span="12" class="flex">
            <div class="center">所在学科</div>
            <el-input v-model="form.date.subject" style="flex:1;"></el-input>
          </el-col>
        </el-col>
        <el-col>
          <el-col :span="12" class="flex">
            <div class="center">项目联系人</div>
            <el-input v-model="form.date.appleUser" style="flex:1;"></el-input>
          </el-col>
          <el-col :span="12" class="flex">
            <div class="center">职务职称</div>
            <el-input v-model="form.date.appleDept" style="flex:1;"></el-input>
          </el-col>
        </el-col>
        <el-col>
          <el-col :span="12" class="flex">
            <div :class="['center', {star: star.applePhoneCall}]">电 话</div>
            <el-input
              :class="[{border: border.applePhoneCall}]"
              @change="applePhoneCall"
              v-model="form.date.applePhoneCall"
              style="flex:1;"
            ></el-input>
          </el-col>
          <el-col :span="12" class="flex">
            <div :class="['center', {star: star.applePhone}]">手 机</div>
            <el-input
              :class="[{border: border.applePhone}]"
              @change="applePhone"
              v-model="form.date.applePhone"
              style="flex:1;"
            ></el-input>
          </el-col>
        </el-col>
        <el-col>
          <el-col :span="12" class="flex">
            <div :class="['center', {star: star.appleEmail}]">电子邮箱</div>
            <el-input
              :class="[{border: border.appleEmail}]"
              @change="appleEmail"
              v-model="form.date.appleEmail"
              style="flex:1;"
            ></el-input>
          </el-col>
          <el-col :span="12" class="flex">
            <div class="center">传 真</div>
            <el-input v-model="form.date.fax" style="flex:1;"></el-input>
          </el-col>
        </el-col>
      </el-row>
      <h3>二、项目内容和实施计划</h3>
      <el-row class="flex" style="height: 396px;border-left: 1px solid #000;">
        <div style="width: 120px;height: 100%;border-top: 1px solid #000;">
          <div class="center" style="width: 100%;height: 100%;">项目内容及预期效果</div>
        </div>
        <div style="flex:1;height:100%;">
          <el-col :span="24" style="flex:1;height: 100%;">
            <el-input type="textarea" v-model="form.date.proContent" style="height: 100%;"></el-input>
          </el-col>
        </div>
      </el-row>
      <el-row class="flex" style="height: 396px;border-left: 1px solid #000;">
        <div style="width: 120px;height: 100%;">
          <div class="center" style="width: 100%;height: 100%;">项目实施计划</div>
        </div>
        <div style="flex:1;height:100%;">
          <el-input type="textarea" class="text" v-model="form.date.proPlan" style="height: 100%;"></el-input>
        </div>
      </el-row>
      <h3>三、项目经费预算</h3>
      <el-row class="flex" style="border-top: 1px solid #000;border-left: 1px solid #000;">
        <div :style="{height: heightOne + 'px' }">
          <div class="center" style="height: 100%">工作及社会实践经历</div>
        </div>
        <div style="flex:1;border-left: 1px solid #000;" ref="rightOne">
          <el-col :span="24">
            <el-col :span="7">
              <div class="center2">开支科目</div>
            </el-col>
            <el-col :span="3">
              <div class="center2">金额（万元）</div>
            </el-col>
            <el-col :span="12">
              <div class="center2">测 算 依 据</div>
            </el-col>
            <el-col :span="2">
              <div class="center2">操作</div>
            </el-col>
          </el-col>
          <el-col :span="24" v-for="(item, index) in form.mainformdates[0].dates" :key="index">
            <el-col :span="7">
              <el-input v-model="item.date.subject" class="input2"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input v-model="item.date.amount" @input="numValidOne(item)" class="input2"></el-input>
            </el-col>
            <el-col :span="12">
              <el-input v-model="item.date.content" class="input2"></el-input>
            </el-col>
            <el-col :span="2">
              <div class="delete input2" @click="deleteAction1(item, index)">-</div>
            </el-col>
          </el-col>
        </div>
      </el-row>
      <el-row class="flex" style="border-left: 1px solid #000;">
        <div style="width: 120px;">
          <div class="center" style="width: 100%;">合计</div>
        </div>
        <div style="flex:1;border-left: 1px solid #000;">
          <el-col :span="24">
            <el-col :span="7">
              <el-input disabled v-model="form.name1" class="input2"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input v-model="form.date.undergoAmount" @input="numValid2" class="input2"></el-input>
            </el-col>
            <el-col :span="12">
              <el-input disabled v-model="form.name3" class="input2"></el-input>
            </el-col>
            <el-col :span="2">
              <div class="center2 btn" @click="addAction1">+</div>
            </el-col>
          </el-col>
        </div>
      </el-row>
      <el-row class="flex" style="border-left: 1px solid #000;">
        <div :style="{height: heightTwo + 'px' }">
          <div class="center" style="height: 100%;">申请资助经费</div>
        </div>
        <div style="flex:1;border-left: 1px solid #000;" ref="rightTwo">
          <el-col :span="24" v-for="(item, index) in form.mainformdates[1].dates" :key="index">
            <el-col :span="7">
              <el-input v-model="item.date.subject" class="input2"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input v-model="item.date.amount" @input="numValidTwo(item)" class="input2"></el-input>
            </el-col>
            <el-col :span="12">
              <el-input v-model="item.date.content" class="input2"></el-input>
            </el-col>
            <el-col :span="2">
              <div class="delete input2" @click="deleteAction2(item, index)">-</div>
            </el-col>
          </el-col>
        </div>
      </el-row>
      <el-row class="flex" style="border-left: 1px solid #000;">
        <div style="width: 120px;">
          <div class="center" style="width: 100%;">合计</div>
        </div>
        <div style="flex:1;border-left: 1px solid #000;">
          <el-col :span="24">
            <el-col :span="7">
              <el-input disabled v-model="form.name4" class="input2"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input v-model="form.date.fundAmount" @input="numValid3" class="input2"></el-input>
            </el-col>
            <el-col :span="12">
              <el-input disabled v-model="form.name6" class="input2"></el-input>
            </el-col>
            <el-col :span="2">
              <div class="center2 btn" @click="addAction2">+</div>
            </el-col>
          </el-col>
        </div>
      </el-row>
      <h3>四、拟聘请讲座专家情况</h3>
      <el-row style="border-top: 1px solid #000;border-left: 1px solid #000;">
        <el-col :span="20">
          <el-col class="flex">
            <div class="center" style="height: 64px;">
              <span>专家姓名</span>
            </div>
            <el-col style="flex:1;border-left: 1px solid #000;">
              <el-col class="flex">
                <el-col :span="12" class="flex">
                  <div class="center">中文名</div>
                  <el-input v-model="form.date.expertName" style="flex:1;"></el-input>
                </el-col>
                <el-col :span="12" class="flex">
                  <div class="center" style="width: 100px;">性别</div>
                  <el-select v-model="form.date.expertSex" style="flex:1;" placeholder="请选择性别">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-col>
              <el-col class="flex">
                <el-col :span="12" class="flex">
                  <div class="center">外文名</div>
                  <el-input v-model="form.date.expertNameEnglish" style="flex:1;"></el-input>
                </el-col>
                <el-col :span="12" class="flex">
                  <div class="center" style="width: 100px;">出生</div>
                  <el-date-picker
                    style="flex:1;"
                    v-model="form.date.expertDay"
                    type="date"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-col>
              </el-col>
            </el-col>
          </el-col>
          <el-col class="flex">
            <el-col :span="8" class="flex">
              <div class="center">国别地区</div>
              <el-input v-model="form.date.expertCountry" style="flex:1;"></el-input>
            </el-col>
            <el-col :span="8" class="flex">
              <div class="center" style="width: 100px;">职务职称</div>
              <el-input v-model="form.date.expertDept" style="flex:1;"></el-input>
            </el-col>
            <el-col :span="8" class="flex">
              <div class="center" style="width: 100px;">专业</div>
              <el-input v-model="form.date.expertSpecialty" style="flex:1;"></el-input>
            </el-col>
          </el-col>
          <el-col class="flex">
            <div class="center">海外工作单位</div>
            <el-input v-model="form.date.expertUnit" style="flex:1;"></el-input>
          </el-col>
          <el-col class="flex">
            <div class="center">通信地址</div>
            <el-input v-model="form.date.expertAddress" style="flex:1;"></el-input>
          </el-col>
        </el-col>
        <el-col :span="4">
          <el-upload
            class="avatar-uploader"
            style="height: 100%;"
            :action="$api.upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="form.date.expertIcon"
              :src="form.date.expertIcon?form.date.expertIcon : ''"
              class="avatar"
            />
            <el-avatar v-else>照片</el-avatar>
          </el-upload>
        </el-col>
      </el-row>
      <el-row class="flex" style="border-left: 1px solid #000;">
        <el-col :span="12" class="flex">
          <div :class="['center', {star: star.expertCall}]">电话</div>
          <el-input
            :class="[{border: border.expertCall}]"
            @change="expertCall"
            v-model="form.date.expertCall"
            style="flex:1;"
          ></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div :class="['center', {star: star.expertEmail}]">电子邮箱</div>
          <el-input
            :class="[{border: border.expertEmail}]"
            @change="expertEmail"
            v-model="form.date.expertEmail"
            style="flex:1;"
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="flex" style="border-left: 1px solid #000;">
        <el-col :span="12" class="flex">
          <div class="center">传真</div>
          <el-input v-model="form.date.expertGax" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">来粤总天数</div>
          <el-input @input="numValid" v-model="form.date.expertNumDay" style="flex:1;"></el-input>
        </el-col>
      </el-row>

      <el-row class="flex" style="height: 396px;border-left: 1px solid #000;">
        <div style="width: 120px;height: 100%;">
          <div class="center" style="width: 100%;height: 100%;">简述学历 背景、主要工作经 历和主要学术及科研经历、国际公认的学术成就等</div>
        </div>
        <div style="flex:1;height:100%;">
          <el-col :span="24" style="flex:1;height: 100%;">
            <el-input
              type="textarea"
              class="text"
              v-model="form.date.expertContent"
              style="height: 100%;"
            ></el-input>
          </el-col>
        </div>
      </el-row>
      <!-- <h3>五、项目申报部门的审核意见</h3>
      <el-row
        class="flex"
        style="height: 396px;border-left: 1px solid #000;border-top: 1px solid #000;"
      >
        <div style="width: 120px;height: 100%;">
          <div class="center" style="width: 100%;height: 100%;">项目单位的意见</div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;height: 100%;">
          <el-input type="textarea" class="text" v-model="form.t" style="height: 100%;"></el-input>
          <div style="border-left: 1px solid #000;">
            <el-col :span="8" class="flex">
              <div class="center" style="padding: 0 10px;">负责人（签字）：</div>
              <el-input v-model="form.u" style="flex:1;"></el-input>
            </el-col>
            <el-col :span="8" class="flex">
              <div class="center">职务：</div>
              <el-input v-model="form.v" style="flex:1;"></el-input>
            </el-col>
            <el-col :span="8" class="flex">
              <div class="center">单位(公章)：</div>
              <el-input v-model="form.w" style="flex:1;"></el-input>
            </el-col>
            <el-col
              :span="24"
              class="flex"
              style="flex-direction: row-reverse;border-right: 1px solid #000;border-bottom: 1px solid #000;padding-right: 20px;"
            >
              <div style="line-height: 60px;">
                <el-date-picker class="input1" v-model="form.x" type="date" placeholder="选择日期"></el-date-picker>
              </div>
            </el-col>
          </div>
        </div>
      </el-row>
      <h3>六、项目批准部门的审批意见</h3>
      <el-row
        class="flex"
        style="height: 396px;border-left: 1px solid #000;border-top: 1px solid #000;"
      >
        <div style="width: 120px;height: 100%;">
          <div class="center" style="width: 100%;height: 100%;">国际合作与交流处的审批意见</div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;height: 100%;">
          <el-input type="textarea" class="text" v-model="form.y" style="height: 100%;"></el-input>
          <div style="border-left: 1px solid #000;">
            <el-col :span="8" class="flex">
              <div class="center" style="padding: 0 10px;">负责人（签字）：</div>
              <el-input v-model="form.z" style="flex:1;"></el-input>
            </el-col>
            <el-col :span="8" class="flex">
              <div class="center">职务：</div>
              <el-input v-model="form.aa" style="flex:1;"></el-input>
            </el-col>
            <el-col :span="8" class="flex">
              <div class="center">单位(公章)：</div>
              <el-input v-model="form.ab" style="flex:1;"></el-input>
            </el-col>
            <el-col
              :span="24"
              class="flex"
              style="flex-direction: row-reverse;border-right: 1px solid #000;border-bottom: 1px solid #000;padding-right: 20px;"
            >
              <div style="line-height: 60px;">
                <el-date-picker class="input1" v-model="form.ac" type="date" placeholder="选择日期"></el-date-picker>
              </div>
            </el-col>
          </div>
        </div>
      </el-row>
      <el-row class="flex" style="height: 147px;border-left: 1px solid #000;">
        <div class="center" style="height: 100%;padding: 0 10px;">备注</div>
        <el-input type="textarea" class="text" v-model="form.ad" style="flex:1;height: 100%;"></el-input>
      </el-row>-->
    </div>
    <v-table5
      v-if="selectIndexShow === 1"
      :form="form.mainformdates[2].dates[0].date"
      :forms="form.mainformdates[3].dates"
    ></v-table5>
  </div>
</template>

<script>
import Table5 from "@/components/foreign/table5";
export default {
  name: "Details",
  props: {
    selectIndexShow: {
      type: Number,
      default: "0",
    },
  },
  components: {
    "v-table5": Table5,
  },
  data() {
    return {
      form: {
        formId: "1305607344704249856",
        date: {
          urgencyDegree: "1",
          expertIcon: "",
          undergoAmount: 0,
          fundAmount: 0,
        },
        mainformdates: [
          {
            formId: "1305607611155800064",
            dates: [
              {
                date: {},
              },
            ],
          },
          {
            formId: "1305607707549294592",
            dates: [
              {
                date: {},
              },
            ],
          },
          {
            formId: "1305607443916316672",
            dates: [
              {
                date: {
                  icon: "",
                  amountFund: 0
                },
              },
            ],
          },
          {
            formId: "1305607533649256448",
            dates: [
              {
                date: {},
              },
            ],
          },
        ],
      },
      options: [
        { value: "1", label: "男" },
        { value: "0", label: "女" },
      ],
      list: [
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
      ],
      border: {
        applePhone: false,
        applePhoneCall: false,
        appleEmail: false,
        expertCall: false,
        expertEmail: false,
      },
      star: {
        applePhone: true,
        applePhoneCall: true,
        appleEmail: true,
        expertCall: true,
        expertEmail: true,
      },
      heightOne: 0,
      heightTwo: 0,
      comformInfo: {
        formId: "1305607344704249856",
        id: "",
      },
    };
  },
  watch: {},
  created() {
    if (this.$store.state.tableName === "海外名师申报流程") {
      this.comformInfo.id = sessionStorage.tableId;
      this.$api.base
        .item({ comformInfo: JSON.stringify(this.comformInfo) })
        .then((res) => {
          this.form.date = res.date;
          for (let j in this.form.mainformdates) {
            for (let i in res.mainformdates) {
              if (
                this.form.mainformdates[j].formId ===
                res.mainformdates[i].formId
              ) {
                console.log(this.form.mainformdates[j].formId);
                this.form.mainformdates[j].dates = res.mainformdates[i].dates;
              }
            }
          }
          console.log(this.form);
          this.$store.commit("GET_FROM", this.form);
        });
    } else {
      console.log(1);
      this.$store.commit("GET_FROM", this.form);
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 页面渲染完成后的回调
      this.heightOne = this.$refs.rightOne.offsetHeight;
      this.heightTwo = this.$refs.rightTwo.offsetHeight;
    });
  },
  methods: {
    numValidOne(item) {
      if (item.date.amount) {
        item.date.amount = item.date.amount.replace(/[^0-9]/g, "");
      }
      this.sum1();
    },
    sum1() {
      this.form.date.undergoAmount = 0;
      for (let i in this.form.mainformdates[0].dates) {
        this.form.date.undergoAmount =
          this.form.date.undergoAmount +
          parseInt(this.form.mainformdates[0].dates[i].date.amount);
      }
    },
    numValidTwo(item) {
      if (item.date.amount) {
        item.date.amount = item.date.amount.replace(/[^0-9]/g, "");
      }
      this.sum2();
    },
    sum2() {
      this.form.date.fundAmount = 0;
      for (let i in this.form.mainformdates[1].dates) {
        this.form.date.fundAmount =
          this.form.date.fundAmount +
          parseInt(this.form.mainformdates[1].dates[i].date.amount);
      }
    },
    numValid() {
      if (this.form.date.expertNumDay) {
        this.form.date.expertNumDay = this.form.date.expertNumDay.replace(
          /[^0-9]/g,
          ""
        );
      }
    },
    numValid2() {
      if (this.form.date.undergoAmount) {
        this.form.date.undergoAmount = this.form.date.undergoAmount.replace(
          /[^0-9]/g,
          ""
        );
      }
    },
    numValid3() {
      if (this.form.date.fundAmount) {
        this.form.date.fundAmount = this.form.date.fundAmount.replace(
          /[^0-9]/g,
          ""
        );
      }
    },

    applePhone() {
      if (
        this.form.date.applePhone === "" ||
        !/(^[1][34578]\d{9}$)/.test(this.form.date.applePhone)
      ) {
        this.$message.error("手机号码输入错误，请重新输入！");
        this.border.applePhone = true;
      } else {
        this.border.applePhone = false;
      }
    },
    appleEmail() {
      if (
        this.form.date.appleEmail === "" ||
        !/^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/.test(
          this.form.date.appleEmail
        )
      ) {
        this.$message.error("邮箱输入错误，请重新输入！");
        this.border.appleEmail = true;
      } else {
        this.border.appleEmail = false;
      }
    },
    expertCall() {
      if (
        this.form.date.expertCall === "" ||
        !/(^[1][34578]\d{9}$)/.test(this.form.date.expertCall)
      ) {
        this.$message.error("电话输入错误，请重新输入！");
        this.border.expertCall = true;
      } else {
        this.border.expertCall = false;
      }
    },
    expertEmail() {
      if (
        this.form.date.expertEmail === "" ||
        !/^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/.test(
          this.form.date.expertEmail
        )
      ) {
        this.$message.error("邮箱输入错误，请重新输入！");
        this.border.expertEmail = true;
      } else {
        this.border.expertEmail = false;
      }
    },
    applePhoneCall() {
      if (
        this.form.date.applePhoneCall === "" ||
        !/(^[1][34578]\d{9}$)/.test(this.form.applePhoneCall)
      ) {
        this.$message.error("电话输入错误，请重新输入！");
        this.border.applePhoneCall = true;
      } else {
        this.border.applePhoneCall = false;
      }
    },
    handleAvatarSuccess(res, file) {
      this.form.date.expertIcon = res.fileDownloadUri;
    },
    beforeAvatarUpload(file) {
      const isIMG = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/pjpeg",
        "image/gif",
        "image/bmp",
        "image/x-png",
      ];
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (isIMG.indexOf(file.type) === -1) {
        this.$message.error("上传文件只能是 图片 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
      return isIMG && isLt2M;
    },
    addAction1() {
      this.$nextTick(() => {
        // 页面渲染完成后的回调
        this.heightOne = this.$refs.rightOne.offsetHeight + 32;
      });
      this.form.mainformdates[0].dates.push({
        date: {},
      });
    },
    deleteAction1(item, index) {
      if (this.form.mainformdates[0].dates.length < 2) {
        this.$message.error("不能再删了！");
      } else {
        this.form.mainformdates[0].dates.splice(index, 1);
        this.heightOne = this.$refs.rightOne.offsetHeight - 32;
        this.sum1();
      }
    },
    addAction2() {
      this.$nextTick(() => {
        // 页面渲染完成后的回调
        this.heightTwo = this.$refs.rightTwo.offsetHeight + 32;
      });
      this.form.mainformdates[1].dates.push({
        date: {},
      });
    },
    deleteAction2(item, index) {
      if (this.form.mainformdates[1].dates.length < 2) {
        this.$message.error("不能再删了！");
      } else {
        this.form.mainformdates[1].dates.splice(index, 1);
        this.heightTwo = this.$refs.rightTwo.offsetHeight - 32;
        this.sum2();
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
  width: 100%;
  max-width: 880px;
  margin: 20px auto;
  height: auto;
  padding: 20px;
  border: 1px solid #000;
  font-size: 12px;

  /deep/ .el-input__icon {
    line-height: 0;
  }

  /deep/ .el-textarea__inner {
    height: 100%;
    border: 1px solid #000;
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

  h2 {
    font-size: 26px;
    text-align: center;
    line-height: 54px;
    color: #385b83;
  }

  h3 {
    font-size: 26px;
    text-align: center;
    line-height: 54px;
  }

  .flex {
    flex-col-center();
  }

  .colum {
    flex-ver-center();
  }

  .text {
    /deep/ .el-textarea__inner {
      height: 100%;
      border: 1px solid #000;
      border-top: 0;
      border-radius: 0;
      resize: none;
    }
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

  .p1 {
    // margin-left: 36px;
    line-height: 30px;
    // text-indent: 36px;
  }

  .p3 {
    line-height: 30px;

    p {
      width: 120px;
      text-align: justify;
      height: 32px;

      span {
        width: 100%;
        display: inline-block;
        height: 0;
      }
    }
  }

  .avatar-uploader {
    border: 1px solid #000;
    border-top: 0;
    border-left: 0;

    /deep/ .el-upload {
      border: 1px dashed #d9d9d9;
      width: 100%;
      height: 100%;

      &:hover {
        border-color: $theme-color;
      }

      .el-avatar {
        display: inline-block;
        box-sizing: border-box;
        text-align: center;
        overflow: hidden;
        color: #606266;
        // background: #c0c4cc;
        width: 100%;
        height: 100%;
        line-height: 154px;
        font-size: 24px;
      }
    }
  }

  .avatar {
    width: 100%;
    height: 154px;
    overflow: hidden;
    display: block;
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
