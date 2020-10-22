<template>
  <div class="details">
    <div class="table">
      <el-row style="text-align: left;padding: 20px;border-right: 1px solid #000;">
        <img src="../../common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>广东外语外贸大学孔子学院汉语教师志愿者报名申请表</h2>
      </el-row>

      <el-row>
        <el-col :span="20">
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
              <div class="center">姓名</div>
              <el-input v-model="form.date.username" style="flex:1;"></el-input>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="center">性别</div>
              <el-select v-model="form.date.sex" style="flex:1;" placeholder="请选择性别">
                <el-option
                  v-for="item in option"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col>
            <el-col :span="12" class="flex">
              <div class="center">出生日期</div>
              <el-date-picker
                style="flex:1;"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                v-model="form.date.birthday"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="center">民族</div>
              <el-input v-model="form.date.nation" style="flex:1;"></el-input>
            </el-col>
          </el-col>
          <el-col>
            <el-col :span="12" class="flex">
              <div class="center">政治面貌</div>
              <el-select v-model="form.date.cadre" style="flex:1;" placeholder="请选择政治面貌">
                <el-option
                  v-for="item in option1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="center">学生干部职务</div>
              <el-input v-model="form.date.politics" style="flex:1;"></el-input>
            </el-col>
          </el-col>
          <el-col>
            <el-col :span="12" class="flex">
              <div class="center">所在学院</div>
              <el-input v-model="form.date.college" style="flex:1;"></el-input>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="center">专业/班级</div>
              <el-input v-model="form.date.class1" style="flex:1;"></el-input>
            </el-col>
          </el-col>
          <el-col>
            <el-col :span="12" class="flex">
              <div :class="['center', {star: star.email}]">Email</div>
              <el-input
                :class="[{border: border.email}]"
                @change="email"
                v-model="form.date.email"
                style="flex:1;"
              ></el-input>
            </el-col>
            <el-col :span="12" class="flex">
              <div :class="['center', {star: star.phone}]">联系电话</div>
              <el-input
                :class="[{border: border.phone}]"
                @change="phone"
                v-model="form.date.phone"
                style="flex:1;"
              ></el-input>
            </el-col>
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
            <img v-if="form.date.icon" :src="form.date.icon?form.date.icon : ''" class="avatar" />
            <el-avatar v-else>照片</el-avatar>
          </el-upload>
        </el-col>
      </el-row>
      <el-row class="flex">
        <div class="center">学号</div>
        <el-input v-model="form.date.studentCode" @input="numValid" style="flex:1;"></el-input>
      </el-row>
      <el-row class="flex">
        <div class="center">才艺专长</div>
        <el-input v-model="form.date.speciality" style="flex:1;"></el-input>
      </el-row>

      <el-row class="flex">
        <div :style="{height: heightOne + 'px' }">
          <div class="center" style="height: 100%;">获得证书情况</div>
        </div>
        <div style="flex:1;border-left: 1px solid #000;" ref="rightOne">
          <el-col :span="24">
            <el-col :span="7">
              <div class="center2">证书名称</div>
            </el-col>
            <el-col :span="5">
              <div class="center2">获得时间</div>
            </el-col>
            <el-col :span="10">
              <div class="center2">证书名称及等级/成绩</div>
            </el-col>
            <el-col :span="2">
              <div class="center2 btn" @click="addAction1">+</div>
            </el-col>
          </el-col>
          <el-col :span="24" v-for="(item, index) in form.mainformdates[0].dates" :key="index">
            <el-col :span="7">
              <el-input v-model="item.date.certificateName" class="input2"></el-input>
            </el-col>
            <el-col :span="5">
              <el-date-picker
                class="input2"
                v-model="item.date.certificateDate"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择日期"
              ></el-date-picker>
            </el-col>
            <el-col :span="10">
              <el-input v-model="item.date.certificateGrade" class="input2"></el-input>
            </el-col>
            <el-col :span="2">
              <div class="delete input2" @click="deleteAction1(item, index)">-</div>
            </el-col>
          </el-col>
        </div>
      </el-row>
      <el-row class="flex" style="aling-items:starat;">
        <div :style="{height: heightTwo + 'px' }">
          <div class="center" style="height: 100%;">教育背景</div>
        </div>
        <div style="flex:1;border-left: 1px solid #000;aling-items:starat" ref="rightTwo">
          <el-col :span="24">
            <el-col :span="6">
              <div class="center2">学校</div>
            </el-col>
            <el-col :span="4">
              <div class="center2">开始时间</div>
            </el-col>
            <el-col :span="4">
              <div class="center2">结束时间</div>
            </el-col>
            <el-col :span="8">
              <div class="center2">专业及学位</div>
            </el-col>
            <el-col :span="2">
              <div class="center2 btn" @click="addAction2">+</div>
            </el-col>
          </el-col>
          <el-col :span="24" v-for="(item, index) in form.mainformdates[1].dates" :key="index">
            <el-col :span="6">
              <el-input v-model="item.date.educationSchool" class="input2"></el-input>
            </el-col>
            <el-col :span="4">
              <el-date-picker
                class="input2"
                v-model="item.date.educationStartDate"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择开始时间"
              ></el-date-picker>
            </el-col>
            <el-col :span="4">
              <el-date-picker
                class="input2"
                v-model="item.date.educationEndDate"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择结束时间"
              ></el-date-picker>
            </el-col>
            <el-col :span="8">
              <el-input v-model="item.date.educationSpecialty" class="input2"></el-input>
            </el-col>
            <el-col :span="2">
              <div class="delete input2" @click="deleteAction2(item, index)">-</div>
            </el-col>
          </el-col>
        </div>
      </el-row>
      <el-row class="flex">
        <div :style="{height: heightThree + 'px' }">
          <div class="center" style="height: 100%;">工作及社会实践经历</div>
        </div>
        <div style="flex:1;border-left: 1px solid #000;" ref="rightThree">
          <el-col :span="24">
            <el-col :span="6">
              <div class="center2">工作单位</div>
            </el-col>
            <el-col :span="4">
              <div class="center2">开始时间</div>
            </el-col>
            <el-col :span="4">
              <div class="center2">结束时间</div>
            </el-col>
            <el-col :span="8">
              <div class="center2">工作内容</div>
            </el-col>
            <el-col :span="2">
              <div class="center2 btn" @click="addAction3">+</div>
            </el-col>
          </el-col>
          <el-col :span="24" v-for="(item, index) in form.mainformdates[2].dates" :key="index">
            <el-col :span="6">
              <el-input v-model="item.date.societyUnit" class="input2"></el-input>
            </el-col>
            <el-col :span="4">
              <el-date-picker
                class="input2"
                v-model="item.date.societyStartDate"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择开始时间"
              ></el-date-picker>
            </el-col>
            <el-col :span="4">
              <el-date-picker
                class="input2"
                v-model="item.date.societyEndDate"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择结束时间"
              ></el-date-picker>
            </el-col>
            <el-col :span="8">
              <el-input type="textarea" v-model="item.date.societyContent" class="input2"></el-input>
            </el-col>
            <el-col :span="2">
              <div class="delete input2" @click="deleteAction3(item, index)">-</div>
            </el-col>
          </el-col>
        </div>
      </el-row>
      <el-row class="flex">
        <div :style="{height: heightFour + 'px' }">
          <div class="center" style="height: 100%;">获奖情况</div>
        </div>
        <div style="flex:1;border-left: 1px solid #000;" ref="rightFour">
          <el-col :span="24">
            <el-col :span="7">
              <div class="center2">授奖单位</div>
            </el-col>
            <el-col :span="5">
              <div class="center2">获奖时间</div>
            </el-col>
            <el-col :span="10">
              <div class="center2">奖项名称</div>
            </el-col>
            <el-col :span="2">
              <div class="center2 btn" @click="addAction4">+</div>
            </el-col>
          </el-col>
          <el-col :span="24" v-for="(item, index) in form.mainformdates[3].dates" :key="index">
            <el-col :span="7">
              <el-input v-model="item.date.awrdName" class="input2"></el-input>
            </el-col>
            <el-col :span="5">
              <el-date-picker
                class="input2"
                v-model="item.date.awrdDate"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择日期"
              ></el-date-picker>
            </el-col>
            <el-col :span="10">
              <el-input v-model="item.date.awrdUnit" class="input2"></el-input>
            </el-col>
            <el-col :span="2">
              <div class="delete input2" @click="deleteAction4(item, index)">-</div>
            </el-col>
          </el-col>
        </div>
      </el-row>
      <!-- <el-row style="border-bottom: 1px solid #000;border-right: 1px solid #000;padding: 10px;">
        <div class="p1">
          <span style="margin-left: 36px;">本人申请</span>
          <el-input class="input1" v-model="form.h"></el-input>
          <span>，</span>
          <el-input class="input1" v-model="form.i"></el-input>
          <span>（国家）的</span>
          <el-input class="input1" v-model="form.j"></el-input>
          <span>，</span>
          <el-input class="input1" v-model="form.k"></el-input>
          <span>（孔院名称）教师志愿者岗位，该孔院的中方合作院校是</span>
          <el-input class="input1" style="width: 200px;" v-model="form.l"></el-input>
          <span>，</span>
          <el-input class="input1" v-model="form.m"></el-input>
          <span>。本人承诺，以上信息填写属实。</span>
        </div>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">申请人签名：</div>
          <el-input v-model="form.n" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center" style="width: 100px;">日期：</div>
          <el-date-picker style="flex:1;" v-model="form.o" type="date" value-format="yyyy-MM-dd"
          format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        </el-col>
      </el-row>
      <el-row>
        <p
          style="line-height: 40px;text-align: center;font-weight: 600;font-size: 18px;border-bottom: 1px solid #000;border-right: 1px solid #000;"
        >学院审核意见</p>
      </el-row>
      <p
        style="line-height: 30px;text-align: center;border-right: 1px solid #000;"
      >（请对该生的在校表现进行审核并填写意见）</p>
      <el-row>
        <el-input type="textarea" v-model="form.p" style="height: 200px;"></el-input>
      </el-row>
      <el-row style="border-bottom: 1px solid #000;">
        <el-col :span="12" style="border-right: 1px solid #000;padding-left: 10px;">
          <p class="p1">（研究生）导师意见及签字：</p>
          <el-input type="textarea" v-model="form.q" class="text"></el-input>
          <div class="p1 flex" style="width: auto;padding: 0 10px 10px;">
            <el-date-picker
              class="input1"
              style="width: 200px;"
              v-model="form.r"
              type="date" value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="12" style="border-right: 1px solid #000;padding-left: 10px;">
          <p class="p1">（本科生）辅导员意见及签字：</p>
          <el-input type="textarea" v-model="form.s" class="text"></el-input>
          <div class="p1 flex" style="width: auto;padding: 0 10px 10px;">
            <el-date-picker
              class="input1"
              style="width: 200px;padding: 0 10px 10px;"
              v-model="form.value1"
              type="date" value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-row style="border-bottom: 1px solid #000;border-right: 1px solid #000;">
        <el-col :span="12" style="border-right: 1px solid #000;padding-left: 10px;">
          <p class="p1">所在学院院长/书记意见及签字：</p>
          <el-input type="textarea" v-model="form.t" class="text"></el-input>
          <div class="p1 flex" style="width: auto;padding: 0 10px 10px;">
            <div class="flex">
              <el-date-picker
                class="input1"
                style="width: 200px;"
                v-model="form.value1"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
          </div>
        </el-col>
        <el-col :span="12" style="padding-left: 10px;">
          <p class="p1">（学院盖章）</p>
          <el-input type="textarea" v-model="form.u" class="text"></el-input>
        </el-col>
      </el-row>
      <el-row style="border-bottom: 1px solid #000;">
        <el-col :span="12" style="border-right: 1px solid #000;padding-left: 10px;">
          <p class="p1">（研究生）研究生院意见及盖章：</p>
          <el-input type="textarea" v-model="form.v" class="text"></el-input>
          <div class="p1 flex" style="width: auto;padding: 0 10px 10px;">
            <div class="flex">
              <el-date-picker
                class="input1"
                style="width: 200px;"
                v-model="form.value1"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
          </div>
        </el-col>
        <el-col :span="12" style="border-right: 1px solid #000;padding-left: 10px;">
          <p class="p1">（本科生）学生处意见及盖章：</p>
          <el-input type="textarea" v-model="form.w" class="text"></el-input>
          <div class="p1 flex" style="width: auto;padding: 0 10px 10px;">
            <div class="flex">
              <el-date-picker
                class="input1"
                style="width: 200px;"
                v-model="form.value1"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <div class="content">
          <p>
            说明：根据国家汉办的要求，请学院协助考察
            <span style="font-weight: 600;">申请学生在校表现。</span>
          </p>
          <div style="font-weight: 600;">考察内容：</div>
          <div>1.具有良好的政治和业务素质，热爱祖国，志愿从事汉语国际教育工作，具有奉献精神，有较强的组织纪律性和团队协作精神，品行端正；</div>
          <div>2.身体健康，具有良好的心理素质和适应能力。</div>
        </div>
      </el-row>
      <el-row>
        <p
          style="line-height: 40px;text-align: center;font-weight: 600;font-size: 18px;border-bottom: 1px solid #000;border-right: 1px solid #000;"
        >国际交流与合作处、孔子学院办公室意见</p>
      </el-row>
      <el-row style="border-right: 1px solid #000;">
        <el-radio-group v-model="form.resource" style="padding-left: 10px;width: 100%;">
          <el-radio label="同意"></el-radio>
          <el-radio label="不同意"></el-radio>
        </el-radio-group>
        <el-input type="textarea" class="text1" v-model="form.x"></el-input>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center" style="width: auto">国际处、孔院办负责人签字：</div>
          <el-input v-model="form.y" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center" style="width: 100px;">日期：</div>
          <el-date-picker style="flex:1;" v-model="form.z" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
      </el-row>-->
    </div>
    <v-opinion v-if="$store.state.tableName" :list="opinionList"></v-opinion>
    <div class="common">
      <v-table11 :tableData="list3"></v-table11>
    </div>
  </div>
</template>

<script>
import Table11 from "@/components/visit1/table11";
import Opinion from "@/views/picture/opinion";
export default {
  name: "Details",
  components: {
    "v-table11": Table11,
    "v-opinion": Opinion,
  },
  data() {
    return {
      form: {
        formId: "1305531145798873088",
        date: {
          urgencyDegree: "1",
          icon: ''
        },
        mainformdates: [
          {
            formId: "1305531065498923008",
            dates: [
              {
                date: {},
              },
            ],
          },
          {
            formId: "1305531242393694208",
            dates: [
              {
                date: {},
              },
            ],
          },
          {
            formId: "1305531378733740032",
            dates: [
              {
                date: {},
              },
            ],
          },
          {
            formId: "1305530963816411136",
            dates: [
              {
                date: {},
              },
            ],
          },
        ],
      },
      list3: [
        {
          roleCode: "必传",
          roleName: "学历学位证书",
          remark: "500kb",
        },
        {
          roleCode: "必传",
          roleName: "在读证明",
          remark: "500kb",
        },
        {
          roleCode: "必传",
          roleName: "普通话成绩",
          remark: "500kb",
        },
        {
          roleCode: "必传",
          roleName: "英语成绩",
          remark: "500kb",
        },
        {
          roleCode: "必传",
          roleName: "身份证",
          remark: "500kb",
        },
      ],
      opinionList: [],
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
      heightOne: 0,
      heightTwo: 0,
      heightThree: 0,
      heightFour: 0,
      comformInfo: {
        formId: "1305531145798873088",
        id: "",
      },
    };
  },
  watch: {},
  created() {
    if (this.$store.state.tableName === "志愿者申请流程") {
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
    this.heightOne = this.$refs.rightOne.offsetHeight;
    this.heightTwo = this.$refs.rightTwo.offsetHeight;
    this.heightThree = this.$refs.rightThree.offsetHeight;
    this.heightFour = this.$refs.rightFour.offsetHeight;
      });
  },
  methods: {
    numValid() {
      if (this.form.f) {
        this.form.f = this.form.f.replace(/[^0-9]/g, "");
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
    handleAvatarSuccess(res, file) {
      this.form.date.icon = res.fileDownloadUri;
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
      }
    },
    addAction3() {
      this.$nextTick(() => {
        // 页面渲染完成后的回调
        this.heightThree = this.$refs.rightThree.offsetHeight + 32;
      });
      this.form.mainformdates[2].dates.push({
        date: {},
      });
    },
    deleteAction3(item, index) {
      if (this.form.mainformdates[2].dates.length < 2) {
        this.$message.error("不能再删了！");
      } else {
        this.form.mainformdates[2].dates.splice(index, 1);
        this.heightThree = this.$refs.rightThree.offsetHeight - 32;
      }
    },
    addAction4() {
      this.$nextTick(() => {
        // 页面渲染完成后的回调
        this.heightFour = this.$refs.rightFour.offsetHeight + 32;
      });
      this.form.mainformdates[3].dates.push({
        date: {},
      });
    },
    deleteAction4(item, index) {
      if (this.form.mainformdates[3].dates.length < 2) {
        this.$message.error("不能再删了！");
      } else {
        this.form.mainformdates[3].dates.splice(index, 1);
        this.heightFour = this.$refs.rightFour.offsetHeight - 32;
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

  /deep/ .el-input__icon {
    line-height: 0;
  }

  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: auto;
  }

  /deep/ .el-textarea__inner {
    height: 100%;
    border: 0;
    border-radius: 0;
    resize: none;
    font-size: 14px;
    padding: 0 5px;
  }

  /deep/ .el-input__inner {
    border: none;
    border-radius: 0;
    border: 1px solid #000;
    border-top: 0;
    height: 32px;
    font-size: 14px;
    padding: 0 5px;
  }

  /deep/ .el-input--suffix .el-input__inner {
    padding: 0 0 0 30px;
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

  .content {
    height: auto;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    width: 100%;
    padding: 0 20px;
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
    padding: 0 10px;
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

  .text {
    /deep/ .el-textarea__inner {
      height: 100%;
      border: 0;
      border-radius: 0;
      resize: none;
    }
  }

  .text1 {
    height: 118px;

    /deep/ .el-textarea__inner {
      height: 100%;
      border-right: 0;
      border-radius: 0;
      resize: none;
    }
  }

  .input1 {
    width: 110px;
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
        height: 186px;
        line-height: 186px;
        font-size: 24px;
      }
    }
  }

  .avatar {
    width: 100%;
    height: 186px;
    overflow: hidden;
    display: block;
  }
}

.common {
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
  margin-bottom: 30px;
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
