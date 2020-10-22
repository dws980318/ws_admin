<template>
  <div class="details">
    <div>
      <el-button size="small" type="success" @click="addAction1">添加续聘外教基本情况</el-button>
      <el-button size="small" type="danger" @click="deleteAction1">删除续聘外教基本情况</el-button>
      <el-button size="small" type="success" @click="addAction2">添加不再续聘外教名单</el-button>
      <el-button size="small" type="danger" @click="deleteAction2">删除不再续聘外教名单</el-button>
    </div>
    <div class="table">
      <el-row style="text-align: left;padding: 20px;border-right: 1px solid #000;">
        <img src="@/common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>广东外语外贸大学长期外籍暨港澳台教师续聘审批表</h2>
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
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">填报单位</div>
          <el-input v-model="form.date.applyUnit" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">负责人姓名</div>
          <el-input v-model="form.date.name" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <p>拟续聘外教基本情况</p>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-col :span="2">
            <div class="center2">序号</div>
          </el-col>
          <el-col :span="4">
            <div class="center2">姓名</div>
          </el-col>
          <el-col :span="3">
            <div class="center2">国籍</div>
          </el-col>
          <el-col :span="4">
            <div class="center2">性别</div>
          </el-col>
          <el-col :span="3">
            <div class="center2">年龄</div>
          </el-col>
          <el-col :span="8">
            <div class="center2">职务</div>
          </el-col>
        </el-col>
        <el-col :span="24" v-for="(item, index) in form.mainformdates[0].dates" :key="index">
          <el-col :span="2">
            <el-input v-model="index" disabled class="input2"></el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="item.date.name" class="input2"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input v-model="item.date.country" class="input2"></el-input>
          </el-col>
          <el-col :span="4">
            <el-select v-model="item.date.sex" class="input2" placeholder="请选择性别">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-input @input="numValid(item)" v-model="item.date.age" class="input2"></el-input>
          </el-col>
          <el-col :span="8">
            <el-date-picker
              @change="dateAction(item)"
              class="input2"
              style="width: 100%;"
              v-model="item.date.date"
              type="datetimerange"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <p style="border-bottom: 0;">不再续聘外教名单</p>
        <p
          style="border-top: 0;line-height: 20px;"
        >不再续聘的外教，聘用学院需先与外教面谈（或以在线通讯等形式），与外教沟通学院决定不再续聘原因，再以书面形式与外教确认，并将具体情况子啊表格做详细说明，告知国际处。</p>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-col :span="2">
            <div class="center2">序号</div>
          </el-col>
          <el-col :span="4">
            <div class="center2">姓名</div>
          </el-col>
          <el-col :span="18">
            <div class="center2">不续聘原因及与外教面谈书面情况</div>
          </el-col>
        </el-col>
        <el-col
          :span="24"
          v-for="(item, index) in form.mainformdates[1].dates"
          :key="index"
          style="height:120px;"
        >
          <el-col :span="2" style="height: 100%;">
            <el-input v-model="index" disabled class="input3"></el-input>
          </el-col>
          <el-col :span="4" style="height: 100%;">
            <el-input v-model="item.date.username" class="input3"></el-input>
          </el-col>
          <el-col :span="18" style="height: 100%;">
            <el-input type="textarea" v-model="item.date.content" style="flex:1;height: 100%;"></el-input>
            <!-- <el-input v-model="item.name3" class="input2"></el-input> -->
          </el-col>
        </el-col>
      </el-row>
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
        formId: "1300888828056473600",
        date: {
          applyUnit: "",
          name: "",
          urgencyDegree: "1",
        },
        mainformdates: [
          {
            formId: "1300889855946166272",
            dates: [
              {
                date: {
                  name: "",
                  country: "",
                  sex: "",
                  age: "",
                  startDate: "",
                  endDate: "",
                },
              },
            ],
          },
          {
            formId: "1300889481105412096",
            dates: [
              {
                date: {
                  username: "",
                  content: "",
                },
              },
            ],
          },
        ],
      },
      options: [
        {
          value: "1",
          label: "男",
        },
        {
          value: "0",
          label: "女",
        },
      ],
      date: [{ date: {} }],
      opinionList: [],
      comformInfo: {
        formId: "1300888828056473600",
        id: "",
      },
    };
  },
  watch: {},
  created() {
    if (this.$store.state.tableName === "港澳台教师续聘流程") {
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
    dateAction(item) {
      item.date.startDate = item.date.date[0];
      item.date.endDate = item.date.date[1];
      // item.date.date = []
      console.log(item);
    },
    numValid(item) {
      if (item.date.age) {
        item.date.age = item.date.age.replace(/[^0-9]/g, "");
      }
    },
    addAction1() {
      this.form.mainformdates[0].dates.push({
        date: {
          name: "",
          country: "",
          sex: "",
          age: "",
          startDate: "",
          endDate: "",
        },
      });
    },
    addAction2() {
      this.form.mainformdates[1].dates.push({
        date: {
          username: "",
          content: "",
        },
      });
    },
    deleteAction1() {
      if (this.form.mainformdates[0].dates.length < 2) {
        this.$message.error("不能再删了！");
      } else {
        this.form.mainformdates[0].dates.splice(
          this.form.mainformdates[0].dates.length - 1,
          1
        );
      }
    },
    deleteAction2() {
      if (this.form.mainformdates[1].dates.length < 2) {
        this.$message.error("不能再删了！");
      } else {
        this.form.mainformdates[1].dates.splice(
          this.form.mainformdates[1].dates.length - 1,
          1
        );
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
    padding: 0 20px;
    font-weight: 600;
  }

  p {
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    line-height: 34px;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    color: #000;
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
      line-height: 32px;
    }
  }

  .input3 {
    height: 100%;
    border: none;
    border: 1px solid #000;
    border-top: 0;
    border-left: 0;
    border-bottom: 0;

    /deep/ .el-input__inner {
      height: 100%;
      border-left: 0;
      border-right: 0;
    }
  }
}
</style>
