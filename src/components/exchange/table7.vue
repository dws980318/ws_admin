<template>
  <div class="details">
    <div class="table">
      <el-row
        style="text-align: left; padding: 20px; border-right: 1px solid #000"
      >
        <img src="@/common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>资料报送申请表</h2>
      </el-row>
      <!-- <el-row>
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
      </el-row> -->
      <el-row class="flex">
        <div class="center">发起人：</div>
        <el-input class="inp2" v-model="form.date.createUserId"></el-input>
      </el-row>
      <el-row class="flex">
        <div class="center">开始时间：</div>
        <el-date-picker
          class="inp2"
          v-model="form.date.startDate"
          type="date"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期"
        ></el-date-picker>
      </el-row>
      <el-row class="flex">
        <div class="center">资料名称：</div>
        <el-input class="inp2" v-model="form.date.title"></el-input>
      </el-row>
      <el-row class="flex">
        <div class="center">发送人员：</div>
        <el-input class="inp2" v-model="form.date.subUserId"></el-input>
      </el-row>
      <el-row class="flex">
        <div class="center">结束时间：</div>
        <el-date-picker
          class="inp2"
          v-model="form.date.endDate"
          type="date"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期"
        ></el-date-picker>
      </el-row>
      <el-row class="flex" style="height: 118px">
        <div class="center" style="height: 100%; padding: 0 10px">
          内容概要：
        </div>
        <el-input
          type="textarea"
          v-model="form.date.contentSum"
          style="flex: 1; height: 100%; border-left: 1px solid #000"
        ></el-input>
      </el-row>
      <el-row class="flex" style="height: 118px">
        <div class="center" style="height: 100%; padding: 0 10px">备注：</div>
        <el-input
          type="textarea"
          v-model="form.date.content"
          style="flex: 1; height: 100%; border-left: 1px solid #000"
        ></el-input>
      </el-row>
      <el-row class="flex" style="height: 124px">
        <div
          class="center"
          style="
            width: 101px;
            height: 100%;
            padding: 0 10px;
            border-right: 1px solid #000;
          "
        >
          附件：
        </div>
        <el-col
          style="
            flex: 1;
            height: 100%;
            border: 1px solid #000;
            border-top: 0;
            border-left: 0;
          "
        >
          <el-upload
            class="avatar-uploader"
            style="height: 70%"
            ref="upload"
            :action="$api.upload"
            :limit="1"
            :on-success="handleAvatarSuccess"
            :on-exceed="handleAvatarExceed"
            :on-preview="handleAvatarPreview"
            :file-list="fileList"
          ></el-upload>
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
import Opinion from "@/views/picture/opinion";
export default {
  name: "Details",
  components: {
    "v-opinion": Opinion,
  },
  data() {
    return {
      form: {
        formId: "1301278198353408000",
        date: {
          modelId: "352501",
        },
      },
      fileList: [],
      opinionList: [],
      comformInfo: {
        formId: "1301278198353408000",
        id: "",
      },
      examineList: [],
      processList: [],
    };
  },
  watch: {},
  created() {
    if (this.$store.state.tableName === "资料报送流程") {
      this.comformInfo.id = sessionStorage.tableId;
      this.$api.base
        .item({ comformInfo: JSON.stringify(this.comformInfo) })
        .then((res) => {
          this.init(res);
        });
    } else {
      console.log(1);
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
          if (res.count > 0) {
            this.processList = res.data;
            console.log(this.processList[0].serialNumber);
            this.form.date.serialNumber = this.processList[0].serialNumber;
            this.form.date.urgencyDegree = this.processList[0].urgencyDegree;
            this.$store.commit("SET_PROCESSLIST", res.data);
          }
          this.form = data;
          if (
            this.form.date.activityStartDate == null ||
            this.form.date.activityEndDate == null
          ) {
            this.date = [];
          } else {
            this.date.push(this.form.date.activityStartDate);
            this.date.push(this.form.date.activityEndDate);
          }
          console.log(this.form);
          if (this.form.date.attachId) {
            let one = this.form.date.attachId.split("|");
            let file = {
              name: one[0],
              url: one[1],
            };
            this.fileList.push(file);
          }
          console.log(one);
          this.form.date.modelId = "352501";
          this.form.date.show = true;
          this.form.date.urgencyDegree = "1";
          console.log(this.form);
          this.$store.commit("GET_FROM", this.form);
        })
        .catch((error) => {
          this.$message.error("失败！");
        });
    },
    getFile() {
      let files = this.$refs.upload.uploadFiles;
      let fileArr = [];
      files.map((item) => {
        fileArr.push(item.name + "|" + item.url);
      });
      let fileStr = fileArr.join(",");
      return fileStr;
    },
    //上传附件成功
    handleAvatarSuccess(res, file) {
      file.name = res.fileRealName;
      file.url = res.fileName;
      this.form.date.attachId = this.getFile();
    },
    //上传附件的限制
    handleAvatarExceed() {
      this.$message.error("只能上传一个文件！");
    },
    //附件点击下载
    handleAvatarPreview(file) {
      window.open(this.downloadfileUrl + file.url);
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
    // border: 1px solid #000;
    // border-top: 0;
    // border-left: 0;
    /deep/ .is-success {
      margin-top: 5px;
    }

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
}
</style>
