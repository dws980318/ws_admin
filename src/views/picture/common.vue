<template>
  <div class="header_box" v-show="$store.state.commonShow">
    <el-col :span="6">
      <el-button type="danger" plain @click="showAction">流程图</el-button>
    </el-col>
    <el-col :span="18">
      <div class="btn_right">
        <el-button
          class="back"
          plain
          :disabled="
            ($store.state.processList.length > 0 &&
              $store.state.processList[0].activitiStatus === '005') ||
            ($store.state.processList.length > 0 &&
              $store.state.processList[0].disposeUserId !== userList.id) ||
            ($store.state.processList.length == 0 &&
              $store.state.form.date.createBy !== userList.id)
              ? true
              : false
          "
          @click="nextAction()"
          >转下一步</el-button
        >
        <el-button
          type="success"
          plain
          :disabled="
            ($store.state.processList.length > 0 &&
              $store.state.processList[0].activitiStatus === '005') ||
            ($store.state.processList.length > 0 &&
              $store.state.form.date.createBy !== userList.id &&
              $store.state.processList[0].disposeUserId !== userList.id) ||
            ($store.state.processList.length == 0 &&
              $store.state.form.date.createBy !== userList.id) || show
              ? true
              : false
          "
          @click="saveAction()"
          >保存</el-button
        >
        <el-button type="info" plain @click="printAction()">打印</el-button>
        <el-button type="warning" plain>导出</el-button>
        <!-- <el-button class="back" plain>回退</el-button> -->
      </div>
    </el-col>
    <el-dialog
      :modal="false"
      title="流程图"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <img v-show="flow === '万人计划'" src="@/common/images/flow1.png" alt />
      <img v-show="flow === '合作协议'" src="@/common/images/flow2.png" alt />
      <img v-show="flow === '来访接待'" src="@/common/images/flow3.png" alt />
      <img v-show="flow === '涉外礼品'" src="@/common/images/flow4.png" alt />
      <img v-show="flow === '涉外活动'" src="@/common/images/flow5.png" alt />
      <img v-show="flow === '教师聘用'" src="@/common/images/flow6.png" alt />
      <img v-show="flow === '教师续聘'" src="@/common/images/flow7.png" alt />
      <img v-show="flow === '海外名师'" src="@/common/images/flow8.png" alt />
      <img v-show="flow === '后勤维修'" src="@/common/images/flow9.png" alt />
      <img v-show="flow === '孔子学院'" src="@/common/images/flow10.png" alt />
      <img v-show="flow === '预算申请'" src="@/common/images/flow11.png" alt />
      <img v-show="flow === '决算申请'" src="@/common/images/flow12.png" alt />
      <img v-show="flow === '资料报送'" src="@/common/images/flow13.png" alt />
      <!-- <div class="list_box">
        <div class="circle"></div>
        <div
          v-for="(item, index) in list"
          :key="index"
          style="flex-direction: column;display: flex;align-items: center;"
        >
          <i class="el-icon-right" style="transform: rotate(90deg)"></i>
          <div class="list" :style="{backgroundColor: item.color, color: item.color? '#fff': ''}">
            <i class="el-icon-user-solid"></i>
            {{item.title}}
          </div>
        </div>
      </div>-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :close-on-click-modal="false"
      :modal="false"
      :visible.sync="nextShow"
      width="30%"
      center
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
        :rules="formrules"
      >
        <el-form-item label="下一节点" prop="value">
          <el-select
            v-model="ruleForm.value"
            clearable
            @change="selectAction"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.nextNodeValue"
              :label="item.nextNodeName"
              :value="item.nextNodeValue"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下一节点处理人" prop="age">
          <el-select v-model="ruleForm.age" clearable placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.assigneeValue"
              :label="item.assigneeName"
              :value="item.assigneeValue"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="流水号" prop="age">
          <el-input
            v-model="ruleForm.serialNumber"
            disabled
            style="flex: 1"
          ></el-input>
        </el-form-item>
        <el-form-item label="紧急程度" prop="urgencyDegree">
          <el-select
            v-model="ruleForm.urgencyDegree"
            style="flex: 1"
            placeholder="请选择紧急程度"
          >
            <el-option
              v-for="item in $baseUrl.degreeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="意见" prop="name">
          <el-input
            type="textarea"
            v-model="ruleForm.content"
            :autosize="{ minRows: 4, maxRows: 6 }"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmAction">确 定</el-button>
          <el-button @click="nextShow = false">取 消</el-button>
        </el-form-item>
      </el-form>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="nextShow = false">取 消</el-button>
        <el-button type="primary" @click="nextShow = false">确 定</el-button>
      </span>-->
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["common"],
  data() {
    return {
      dialogVisible: false,
      nextShow: false,
      list: [
        { title: "交流科工作人员确认" },
        { title: "学院主要负责人审批（书记或院长）" },
        { title: "国际处交流科职员初审", color: "#600000" },
        { title: "国际处审核" },
        { title: "国际处交流科职员初审" },
        { title: "国际处分管副处长审批" },
        { title: "国际处处长审批" }
        // { title: "归档" }
      ],
      ruleForm: {
        value: "",
        age: "",
        content: "审批通过！"
      },
      flow: "",
      show: false,
      form: {},
      formrules: {
        value: [
          { required: true, message: "请选择下一节点", trigger: "change" }
        ],
        urgencyDegree: [
          { required: true, message: "请选择紧急程度", trigger: "change" }
        ]
      },
      saveShow: false,
      options: [],
      options2: [],
      taskId: "",
      userList: {}
    };
  },
  mounted() {
    console.log(this.$store.state.form);
  },
  watch: {
    $route: {
      handler(val, oldval) {
        console.log(val); //新路由信息
        console.log(oldval); //老路由信息
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    console.log(this.$store.state.processList);
    this.flow = this.whatFood(this.$route.path);
    console.log();
    this.userList = JSON.parse(JSON.parse(localStorage.vuex).loginList);
  },
  methods: {
    whatFood(mealtime) {
      let food = "";
      switch (mealtime) {
        case "/picture/exchange1/4":
          food = "万人计划";
          break;
        case "/picture/foreign1/6":
          food = "合作协议";
          break;
        case "/picture/exchange1/3":
          food = "来访接待";
          break;
        case "/picture/exchange1/2":
          food = "涉外礼品";
          break;
        case "/picture/exchange1/1":
          food = "涉外活动";
          break;
        case "/picture/foreign1/4":
          food = "教师聘用";
          break;
        case "/picture/foreign1/9":
          food = "教师续聘";
          break;
        case "/picture/foreign1/3":
          food = "海外名师";
          break;
        case "/picture/foreign1/1":
          food = "后勤维修";
          break;
        case "/picture/foreign1/5":
          food = "孔子学院";
          break;
        case "/picture/foreign1/7":
          food = "预算申请";
          break;
        case "/picture/foreign1/8":
          food = "决算申请";
          break;
          case "/picture/exchange1/5":
          food = "资料报送";
          break;
        default:
          food = "";
      }
      return food;
    },
    showAction() {
      this.dialogVisible = true;
    },

    printAction() {
      // window.print();
      // this.visible = true;
      let subOutputRankPrint = this.common;
      console.log(subOutputRankPrint);
      let newContent = subOutputRankPrint.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print();
      window.location.reload();
      document.body.innerHTML = oldContent;
      return false;
    },
    selectAction() {
      console.log(this.ruleForm.value);
      for (let i in this.options) {
        if (this.options[i].nextNodeValue === this.ruleForm.value) {
          this.options2 = this.options[i].assignees;
        }
      }
    },
    confirmAction() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let one = {
            taskId: this.taskId,
            Assignee: this.ruleForm.age,
            nextNode: this.ruleForm.value,
            comformInfo: JSON.stringify(this.$store.state.form),
            comformId: this.$store.state.form.formId,
            businessKey: this.$store.state.form.date.id,
            modelId: this.$store.state.form.date.modelId,
            opinion: this.ruleForm.content,
            serialNumber: this.ruleForm.serialNumber,
            urgencyDegree: this.ruleForm.urgencyDegree
          };
          this.$api.process
            .completeTask(one)
            .then(res => {
              if (res.status === 200) {
                this.$message.success("成功！");
                this.nextShow = false;
                // this.taskId = res.data.taskId;
                this.one();
              } else {
                this.$message.error(res.message);
              }
            })
            .catch(error => {
              this.loading = false;
              this.$message.error("失败！");
            });
        }
      });
    },
    serialInit() {
      this.$api.util().then(res => {
        this.ruleForm.serialNumber = res.data;
      });
    },
    nextAction() {
      console.log(this.$store.state.form);
      if (this.$store.state.processList.length > 0) {
        console.log(1);
        this.taskId = this.$store.state.processList[0].taskId;
        this.ruleForm.serialNumber = this.$store.state.processList[0].serialNumber;
        this.ruleForm.urgencyDegree = this.$store.state.processList[0].urgencyDegree;
        this.getnodeAction();
      } else if (this.show || this.$store.state.form.date.show) {
        console.log(2);
        this.serialInit();
        this.getnodeAction();
      } else {
        this.$message.error("请先点击保存！");
      }
    },
    getnodeAction() {
      let one = {
        taskId: this.taskId,
        businessKey: this.$store.state.form.date.id,
        modelId: this.$store.state.form.date.modelId
      };
      this.$api.process.getnextnode(one).then(res => {
        this.options = res;
      });
      this.nextShow = true;
    },
    saveAction() {
      console.log(this.$store.state.form);
      if (this.$store.state.tableName) {
        this.$api.base
          .edit({ comformInfo: JSON.stringify(this.$store.state.form) })
          .then(res => {
            if (res.status === 200) {
              this.$message.success(res.message);
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(error => {
            this.$message.error(res.message);
          });
      } else {
        // let one = {
        //   comformInfo: JSON.stringify(this.$store.state.form),
        //   modelId: this.$store.state.form.date.modelId,
        //   serialNumber: this.$store.state.form.date.serialNumber,
        //   urgencyDegree: this.$store.state.form.date.urgencyDegree,
        // };
        // this.$api.process
        //   .completeTask(one)
        //   .then((res) => {
        //     this.form = res.data
        //     this.$message.success('保存成功！');
        //   })
        //   .catch((error) => {
        //     this.loading = false;
        //     this.$message.error('保存失败！');
        //   });
        this.$store.commit("SET_PROCESSLIST", []);
        this.$api.base
          .add({ comformInfo: JSON.stringify(this.$store.state.form) })
          .then(res => {
            if (res.status === 200) {
              this.show = true;
              this.$store.state.form.date.id = res.data;
              this.$store.commit("GET_FROM", this.$store.state.form);
              this.$message.success(res.message);
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(error => {
            this.$message.error(res.message);
          });
      }
    },
    one() {
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
          if (res.count > 0) {
            this.$store.commit("SET_PROCESSLIST", res.data);
          }
          console.log(this.form);
        })
        .catch(error => {
          this.$message.error("失败！");
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.list_box {
  padding: 20px 40px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;

  .circle {
    border-radius: 50%;
    height: 30px;
    width: 30px;
    background-color: #24ca58;
  }

  i {
    font-size: 24px;
    margin: 0 10px;
  }

  .list {
    width: 91px;
    height: 74px;
    border: 1px solid #dada96;
    border-radius: 10px;
    background-color: #ffff00;
    position: relative;
    text-align: center;
    line-height: 74px;
    font-size: 12px;
    margin-top: 10px;

    i {
      position: absolute;
      left: 0;
      top: 0;
      margin: 0;
    }
  }
}

.demo-ruleForm {
  .el-input {
    width: 80%;
  }

  .el-select {
    width: 80%;
  }

  .el-textarea {
    width: 80%;
  }
}

img {
  width: 100%;
}

.back {
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;

  &:hover {
    background: #409eff;
    border-color: #409eff;
    color: #fff;
  }
}
</style>
