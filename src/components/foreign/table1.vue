<template>
  <div class="details">
    <div class="table">
      <el-row
        style="text-align: left; padding: 20px; border-right: 1px solid #000"
      >
        <img src="@/common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>后勤维修申请表</h2>
      </el-row>
      <!-- <el-row>
        <el-col :span="12" class="flex">
          <div class="center">流水号</div>
          <el-input
            v-model="form.date.serialNumber"
            disabled
            style="flex:1;"
          ></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">紧急程度</div>
          <el-select
            v-model="form.date.urgencyDegree"
            style="flex:1;"
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
      </el-row> -->
      <el-row class="flex">
        <div class="center">外教姓名：</div>
        <el-input class="inp2" v-model="form.date.applyUser"></el-input>
      </el-row>
      <el-row class="flex">
        <div class="center">住址：</div>
        <el-input class="inp2" v-model="form.date.address"></el-input>
      </el-row>
      <el-row class="flex">
        <div :class="['center', { star: star.phone }]">联系电话：</div>
        <el-input
          :class="['inp2', { border: border.phone }]"
          @change="phone"
          v-model="form.date.phone"
        ></el-input>
      </el-row>
      <el-row class="flex">
        <div class="center">可接受维修时间段：</div>
        <el-date-picker
          @change="dateAction"
          class="date"
          v-model="date"
          type="datetimerange"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-row>
      <el-row class="flex" style="height: 118px">
        <div class="center" style="height: 100%; padding: 0 10px">
          问题描述：
        </div>
        <el-input
          type="textarea"
          v-model="form.date.content"
          style="flex: 1; height: 100%; border-left: 1px solid #000"
        ></el-input>
      </el-row>
      <el-row class="flex" style="height: 264px">
        <div class="center" style="height: 100%; padding: 0 10px">
          上传照片：
        </div>
        <el-col style="flex: 1; height: 100%">
          <el-upload
            class="avatar-uploader"
            style="height: 100%; border-left: 1px solid #000"
            :action="$api.upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="form.date.photo"
              :src="form.date.photo ? form.date.photo : ''"
              class="avatar"
            />
            <el-avatar v-else>user</el-avatar>
          </el-upload>
        </el-col>
      </el-row>
    </div>
    <v-opinion
      v-if="examineList !== undefined && examineList.length > 0"
      :list="opinionList"
    ></v-opinion>
  </div>
</template>

<script>
import Table11 from "@/components/visit1/table11";
import Opinion from "@/views/picture/opinion";
export default {
  name: "Details",
  components: {
    "v-opinion": Opinion,
  },
  data() {
    return {
      form: {
        formId: "1304199878923763712",
        date: {
          photo: "",
          modelId: "287501",
        },
      },
      border: {
        phone: false,
      },
      star: {
        phone: true,
      },
      opinionList: [
        {
          name1: "通过",
          name2: "李梅",
          name3: "国际处",
          name4: "2020-09-09",
        },
        {
          name1: "内容详细，符合",
          name2: "王小鹏",
          name3: "后勤处审批",
          name4: "2020-09-09",
        },
        {
          name1: "符合维修申请要求，通过",
          name2: "王五",
          name3: "维修部审批",
          name4: "2020-09-10",
        },
      ],
      date: [],
      comformInfo: {
        formId: "1304199878923763712",
        id: "",
      },
      processList: [],
      examineList: [],
    };
  },
  watch: {},
  created() {
    if (this.$store.state.tableName === "后勤维修流程") {
      this.comformInfo.id = sessionStorage.tableId;
      this.$api.base
        .item({ comformInfo: JSON.stringify(this.comformInfo) })
        .then((res) => {
          this.init(res);
        });
    } else {
      console.log(1);
      // this.serialInit();
      this.form.date.createBy = JSON.parse(
        JSON.parse(localStorage.vuex).loginList
      ).id;
      this.$store.commit("GET_FROM", this.form);
      this.$store.commit("SET_PROCESSLIST", []);
    }
  },
  methods: {
    init(data) {
      let one = {
        pageNumber: 1,
        pageSize: 10000,
      };
      let two = {
        businessKey: sessionStorage.tableId,
      };
      this.$api.process
        .getthisprocess(one, two)
        .then((res) => {
          this.form = data;
          if (
            this.form.date.startDate === null ||
            this.form.date.endDate === null
          ) {
            this.date = [];
          } else {
            this.date.push(this.form.date.startDate);
            this.date.push(this.form.date.endDate);
          }

          this.form.date.modelId = "287501";
          this.form.date.show = true;
          this.form.date.urgencyDegree = "1";
          if (res.count > 0) {
            this.processList = res.data;
            console.log(this.processList[0].serialNumber);
            this.form.date.serialNumber = this.processList[0].serialNumber;
            this.form.date.urgencyDegree = this.processList[0].urgencyDegree;
            this.$store.commit("SET_PROCESSLIST", res.data);
          }
          console.log(this.form);
          this.$store.commit("GET_FROM", this.form);
        })
        .catch((error) => {
          this.$message.error("失败！");
        });
    },
    serialInit() {
      this.$api.util().then((res) => {
        this.form.date.serialNumber = res.data;
      });
    },
    dateAction() {
      console.log(this.date);
      if (this.date === null) {
        this.form.date.startDate = "";
        this.form.date.endDate = "";
      } else {
        this.form.date.startDate = this.date[0];
        this.form.date.endDate = this.date[1];
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
    handleAvatarSuccess(res, file) {
      this.form.date.photo = res.fileDownloadUri;
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
    font-size: 18px;
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
        color: #fff;
        // background: #c0c4cc;
        width: 100%;
        height: 100%;
        line-height: 264px;
        font-size: 24px;
      }
    }
  }

  .avatar {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: block;
  }

  .date {
    flex: 1;

    /deep/ .el-range-separator {
      line-height: 27px;
    }

    /deep/ .el-input__inner {
      border-right: 0;
    }
  }
}
</style>
