<template>
  <div class="details">
    <el-row>
      <el-button type="success" size="small" @click="addAction">添加来访活动</el-button>
      <el-button type="danger" size="small" @click="deleteAction">删除来访活动</el-button>
    </el-row>
    <div class="table">
      <el-row style="text-align: left;padding: 20px;">
        <img src="../../common/images/logo.jpg" />
      </el-row>
      <el-row style="margin: 0 20px">
        <el-row>
          <h2>广东外语外贸大学公务接待方案</h2>
        </el-row>
        <el-row>
          <el-col :span="12" class="flex">
            <div class="center">流水号</div>
            <el-input v-model="form.date.serialNumber" disabled class="date"></el-input>
          </el-col>
          <el-col :span="12" class="flex">
            <div class="center">紧急程度</div>
            <el-select
              style="border-right: 1px solid #000;"
              v-model="form.date.urgencyDegree"
              class="date"
              placeholder="请选择紧急程度"
            >
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
          <el-col class="flex">
            <div class="center">来访团组</div>
            <el-input type="textarea" v-model="form.date.groupName" style="flex:1;height: 100%;"></el-input>
          </el-col>
          <el-col class="flex">
            <div class="center">来访时间</div>
            <el-date-picker
              style="flex:1;height: 100%;"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="form.date.groupDate"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-col>
          <el-col class="flex">
            <div class="center">来访地点</div>
            <el-input type="textarea" v-model="form.date.address" style="flex:1;height: 100%;"></el-input>
          </el-col>
          <el-col class="flex">
            <div class="center">团长</div>
            <el-input type="textarea" v-model="form.date.groupUser" style="flex:1;height: 100%;"></el-input>
          </el-col>
          <el-col class="flex">
            <div class="center">来访团成员</div>
            <el-input type="textarea" v-model="form.date.groupUsers" style="flex:1;height: 100%;"></el-input>
          </el-col>
          <el-col class="flex" style="height: 64px;">
            <div
              class="center"
              style="height: 100%;border-left: 1px solid #000;border-right: 1px solid #000;"
            >来访目的</div>
            <el-input type="textarea" v-model="form.date.groupThing" style="flex:1;height: 100%;"></el-input>
          </el-col>
          <el-col class="flex" style="height: 64px;">
            <div
              class="center"
              style="height: 100%;border-left: 1px solid #000;border-right: 1px solid #000;"
            >内容</div>
            <el-input type="textarea" v-model="form.date.content" style="flex:1;height: 100%;"></el-input>
          </el-col>
          <el-col class="flex">
            <div class="center">国际处联系人</div>
            <el-input v-model="form.date.schoolUser" style="flex:1;height: 100%;"></el-input>
          </el-col>
        </el-row>

        <p class="p1">来访活动</p>
        <el-row
          v-for="(item, index) in form.mainformdates[0].dates"
          :key="index"
          style="margin-bottom: 20px;border-top: 1px solid #000;"
        >
          <el-col class="flex">
            <div class="center">环节{{index + 1}}</div>
            <el-input v-model="item.date.title" style="flex:1;height: 100%;"></el-input>
          </el-col>
          <el-col class="flex">
            <div class="center">时间</div>
            <el-date-picker
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              style="flex:1;height: 100%;"
              v-model="item.date.stratEndDate"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-col>
          <el-col class="flex">
            <div class="center">地点</div>
            <el-input v-model="item.date.address" style="flex:1;height: 100%;"></el-input>
          </el-col>
          <el-col class="flex">
            <div class="center">我校出席者</div>
            <el-input v-model="item.date.schoolUser" style="flex:1;height: 100%;"></el-input>
          </el-col>
          <el-col class="flex">
            <div class="center">会谈语种</div>
            <el-input v-model="item.date.language" style="flex:1;height: 100%;"></el-input>
          </el-col>
          <el-col class="flex">
            <div class="center">着装</div>
            <el-input v-model="item.date.suiting" style="flex:1;height: 100%;"></el-input>
          </el-col>
          <el-col class="flex" style="height: 64px;">
            <div
              class="center"
              style="border-left: 1px solid #000;height: 100%;border-right: 1px solid #000;"
            >备注</div>
            <el-input type="textarea" v-model="item.date.content" style="flex:1;height: 100%;"></el-input>
          </el-col>
        </el-row>
      </el-row>
      <!-- <el-row>
        <el-input class="text" type="textarea" :autosize="{ minRows: 10}" v-model="form.g"></el-input>
      </el-row>-->
      <!-- <el-row class="flex" style="margin-top: 20px;border-top: 1px solid #000;">
        <div class="center" style="border-left: 1px solid #000;">国际处联系人：</div>
        <el-input style="flex:1" class="inp2" v-model="form.h"></el-input>
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
        formId: "1304200030749179904",
        date: {
          urgencyDegree: "1",
          isEnglish: "0",
        },
        mainformdates: [
          {
            formId: "1304200429178699776",
            dates: [
              {
                date: {
                  title: "",
                  stratEndDate: "",
                  address: "",
                  schoolUser: "",
                  language: "",
                  suiting: "",
                  content: "",
                },
              },
            ],
          },
        ],
      },
      list: [
        {
          name1: "",
          name2: "",
          name3: "",
          name4: "",
          name5: "",
          name6: "",
          name7: "",
        },
      ],
      opinionList: [],
      comformInfo: {
        formId: "1304200030749179904",
        id: "",
      },
    };
  },
  watch: {
    "$store.state.visitingShow"(val, oldVal) {
      if (!val) {
        if (this.$store.state.tableName === "来访接待信息管理流程") {
          if (sessionStorage.isEnglish === "0") {
            this.comformInfo.id = sessionStorage.tableId;
            this.$api.base
              .item({ comformInfo: JSON.stringify(this.comformInfo) })
              .then((res) => {
                this.form = res;
                console.log(this.form);
                this.$store.commit("GET_FROM", this.form);
              });
          } else {
          }
        } else {
          console.log(1);
          this.$store.commit("GET_FROM", this.form);
        }
      }
    },
  },
  created() {
    if (!this.$store.state.visitingShow) {
      if (this.$store.state.tableName === "来访接待信息管理流程") {
        if (sessionStorage.isEnglish === "0") {
          this.comformInfo.id = sessionStorage.tableId;
          this.$api.base
            .item({ comformInfo: JSON.stringify(this.comformInfo) })
            .then((res) => {
              this.form = res;
              console.log(this.form);
              this.$store.commit("GET_FROM", this.form);
            });
        } else {
        }
      } else {
        console.log(1);
        this.$store.commit("GET_FROM", this.form);
      }
    }
  },
  methods: {
    addAction() {
      let one = {
        date: {
          title: "",
          stratEndDate: "",
          address: "",
          schoolUser: "",
          language: "",
          suiting: "",
          content: "",
        },
      };
      this.form.mainformdates[0].dates.push(one);
      this.$message.success("添加成功");
    },
    deleteAction() {
      if (this.form.mainformdates[0].dates.length === 1) {
        this.$message.error("不能在删除了！");
      } else {
        this.form.mainformdates[0].dates.splice(
          this.form.mainformdates[0].dates.length - 1,
          1
        );
        this.$message.success("删除成功");
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.details {
  // padding: 20px 0;
}

.table {
  width: 100%;
  max-width: 880px;
  margin: 20px auto;
  height: auto;
  border-right: 0;
  border-bottom: 0;
  font-size: 12px;
  border: 1px solid #000;

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
    padding: 0;
    font-size: 14px;
  }

  /deep/ .el-input__inner {
    border: none;
    border-radius: 0;
    border: 1px solid #000;
    border-top: 0;
    border-left: 0;
    height: 32px;
    font-size: 14px;
    line-height: 32px;
  }

  .text {
    /deep/ .el-textarea__inner {
      height: 100%;
      font-size: 20px;
      padding: 0;
      color: #606266;
      background-color: #FFF;
      border: 1px solid #DCDFE6;
      border-radius: 4px;

      &:focus {
        outline: 0;
        border-color: #2782dd;
      }
    }
  }

  .flex {
    flex-col-center();
    height: 32px;
  }

  .colum {
    flex-ver-center();
  }

  h2 {
    font-size: 26px;
    text-align: center;
    line-height: 54px;
    border-bottom: 1px solid #000;
    // border-right: 1px solid #000;
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
    border-left: 1px solid #000;
    border-right: 1px solid #000;
  }

  .p1 {
    font-size: 20px;
    line-height: 30px;
    padding-left: 10px;
    font-weight: 600;
    text-align: center;
  }

  .date {
    flex: 1;

    /deep/ .el-input__inner {
      border-left: 0;
      border-right: 0;
    }
  }
}
</style>
