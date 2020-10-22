<template>
  <div class="details">
    <div class="table">
      <el-row style="text-align: left;padding: 20px;border-right: 1px solid #000;">
        <img src="@/common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>广东外语外贸大学长期外籍暨港澳台教师聘用审批表</h2>
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
          <div class="center" style="width: 241px">申报单位</div>
          <el-input v-model="form.date.applyUnit" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">申请时间</div>
          <el-date-picker
            style="flex:1;"
            v-model="form.date.applyDate"
            type="date"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
      </el-row>
      <el-row class="flex" style="height: 194px;">
        <div style="width: 120px;height: 100%;">
          <div class="center" style="width: 100%;height: 100%;">拟聘外教基本情况</div>
        </div>
        <div
          style="flex:1;border-left: 1px solid #000;display:flex;flex-direction:column;height: 100%;;"
        >
          <div>
            <el-col :span="12" class="flex">
              <div class="center" style="padding: 0 10px;">姓名</div>
              <el-input v-model="form.date.name" style="flex:1;"></el-input>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="center">国籍/地区</div>
              <el-input v-model="form.date.country" style="flex:1;"></el-input>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="center">护照号</div>
              <el-input v-model="form.date.teacherCode" style="flex:1;"></el-input>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="center">拟任职位及计划聘期</div>
              <el-input v-model="form.date.startEndDate" style="flex:1;"></el-input>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="center">年龄</div>
              <el-input v-model="form.date.age" @input="numValid" style="flex:1;"></el-input>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="center">期望薪酬</div>
              <el-input v-model="form.date.schoolAmount" @input="numValid2" style="flex:1;"></el-input>
            </el-col>
          </div>
          <el-col :span="24" class="flex" style="flex:1">
            <div class="center" style="width:121px;height: 100%;border-right: 1px solid #000;">简历</div>
            <el-col style="flex:1;height: 100%;">
              <el-upload
                class="avatar-uploader"
                style="height: 60%;"
                ref="upload"
                :action="$api.upload"
                :limit="1"
                :on-success="handleAvatarSuccess"
                :on-exceed="handleAvatarExceed"
                :on-preview="handleAvatarPreview"
                :file-list="fileList"
              ></el-upload>
            </el-col>
          </el-col>
        </div>
      </el-row>
      <!-- <el-row class="flex" style="height: 336px;">
        <div style="width: 120px;height: 100%;">
          <div
            class="center"
            style="width: 100%;height: 100%;"
          >二级单位外教聘用审批意见</div>
        </div>
        <div
          style="flex:1;border-left: 1px solid #000;display:flex;flex-direction:column;height: 100%;"
        >
          <el-col :span="24" class="flex">
            <div class="center" style="padding: 0 10px;">教学与学术水平</div>
            <el-radio-group v-model="form.resource" class="redio_flex" style="flex:1;">
              <el-radio label="1">很好</el-radio>
              <el-radio label="2">较好</el-radio>
              <el-radio label="3">一般</el-radio>
              <el-radio label="4">其他</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="24" class="flex">
            <div class="center">品德与性格</div>
            <el-radio-group v-model="form.resource1" class="redio_flex" style="flex:1;">
              <el-radio label="很好"></el-radio>
              <el-radio label="较好"></el-radio>
              <el-radio label="一般"></el-radio>
              <el-radio label="其他"></el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="24" class="flex" style="height:120px;">
            <div class="center" style="height: 100%;">二级单位评估程序及结果</div>
            <el-input
              type="textarea"
              v-model="form.name"
              style="flex:1;height: 100%;border-left: 1px solid #000;"
            ></el-input>
          </el-col>
          <el-col :span="24" class="flex" style="height:120px;">
            <div class="center" style="height: 100%;">二级单位聘用意见</div>
            <el-input
              type="textarea"
              v-model="form.name"
              style="flex:1;height: 100%;border-left: 1px solid #000;"
            ></el-input>
          </el-col>
          <el-col :span="24" class="flex" style="height: 32px;">
            <div class="center" style="height: 100%;">主管负责人签字及公章</div>
            <el-col style="height: 100%;flex:1;border-left: 1px solid #000;">
              <el-col :span="12" class="flex" style="height: 100%;">
                <div class="center" style="height: 100%;">签名：</div>
                <el-input v-model="form.name" class="inp1"></el-input>
              </el-col>
              <el-col :span="12" class="flex" style="height: 100%;">
                <div class="center" style="height: 100%;">日期：</div>
                <el-date-picker class="inp1" v-model="form.value1" type="date" placeholder="选择日期"></el-date-picker>
              </el-col>
            </el-col>
          </el-col>
        </div>
      </el-row>
      <el-row class="flex" style="height: 396px;">
        <div style="width: 120px;height: 100%;">
          <div class="center" style="width: 100%;height: 100%;">国际处审核意见</div>
        </div>
        <div
          style="flex:1;border-left: 1px solid #000;display:flex;flex-direction:column;height: 100%;"
        >
          <el-col :span="24" class="flex" style="height: 132px;">
            <div class="center" style="padding: 0 10px;height: 100%;">国际处外专科审核意见</div>
            <el-col style="border-left: 1px solid #000;flex:1;">
              <el-input type="textarea" v-model="form.name" style="flex:1;height: 100px;"></el-input>
              <el-col :span="12" class="flex">
                <div class="center" style="width: 160px;">拟聘用月薪：</div>
                <el-input v-model="form.name" class="input1" style="flex:1;"></el-input>
              </el-col>
              <el-col :span="12" class="flex">
                <div class="center">签字：</div>
                <el-input v-model="form.name" class="input1" style="flex:1;"></el-input>
              </el-col>
            </el-col>
          </el-col>
          <el-col :span="24" class="flex" style="height: 132px;">
            <div class="center" style="padding: 0 10px;height: 100%;">国际处分管副处长审核意见</div>
            <el-col style="border-left: 1px solid #000;flex:1;">
              <el-input type="textarea" v-model="form.name" style="flex:1;height: 100px;"></el-input>
              <el-col :span="24" class="flex">
                <div class="center" style="width: 160px;">签字：</div>
                <el-input v-model="form.name" class="input1" style="flex:1;"></el-input>
              </el-col>
            </el-col>
          </el-col>
          <el-col :span="24" class="flex" style="height: 132px;">
            <div class="center" style="padding: 0 10px;height: 100%;">国际处处长审核意见</div>
            <el-col style="border-left: 1px solid #000;flex:1;">
              <el-input type="textarea" v-model="form.name" style="flex:1;height: 100px;"></el-input>
              <el-col :span="24" class="flex">
                <div class="center" style="width: 160px;">签字及公章：</div>
                <el-input v-model="form.name" class="input1" style="flex:1;"></el-input>
              </el-col>
            </el-col>
          </el-col>
        </div>
      </el-row>
      <el-row class="flex" style="height: 149px;">
        <div class="center" style="width: 242px;height: 100%;border-right: 1px solid #000;">工作证件办理结果</div>
        <el-input type="textarea" v-model="form.name" style="flex:1;height: 100%;"></el-input>
      </el-row>
      <el-row class="flex">
        <el-col style="width: 241px;" class="flex">
          <div class="center" style="width: 100%;height: 49px;">申报时间提示</div>
        </el-col>
        <el-col style="flex:1" class="flex">
          <div
            class="content"
          >新聘外教申请需在拟上岗日期前至少提前5个月提交，以便按期完成合同签署、来华许可办理、工作证办理、签证办理等手续。如遇材料不全、有误及上级部门对材料有修改意见时，外教来华所需时间将相应延长。</div>
        </el-col>
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
        formId: "1300888721827336192",
        date: {
          urgencyDegree: "1",
        },
      },
      fileList: [],
      opinionList: [],
      date: [],
      comformInfo: {
        formId: "1300888721827336192",
        id: "",
      },
    };
  },
  watch: {},
  created() {
    if (this.$store.state.tableName === "港澳台教师聘用流程") {
      this.comformInfo.id = sessionStorage.tableId;
      this.$api.base
        .item({ comformInfo: JSON.stringify(this.comformInfo) })
        .then((res) => {
          this.form = res;
          this.date.push(this.form.date.startDate);
          this.date.push(this.form.date.endDate);
          console.log(this.form);
          this.$store.commit("GET_FROM", this.form);
        });
    } else {
      console.log(1);
      this.$store.commit("GET_FROM", this.form);
    }
  },
  methods: {
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
      this.form.date.content = this.getFile();
    },
    //上传附件的限制
    handleAvatarExceed() {
      this.$message.error("只能上传一个文件！");
    },
    //附件点击下载
    handleAvatarPreview(file) {
      window.open(this.downloadfileUrl + file.url);
    },
    numValid() {
      if (this.form.date.age) {
        this.form.date.age = this.form.date.age.replace(/[^0-9]/g, "");
      }
    },
    numValid2() {
      if (this.form.date.schoolAmount) {
        this.form.date.schoolAmount = this.form.date.schoolAmount.replace(
          /[^0-9]/g,
          ""
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
    line-height: 64px;
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

  .content {
    height: auto;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    width: 100%;
    padding: 0 10px;
    font-weight: 600;
    line-height: 24px;
    height: 49px;
    border-left: 1px solid #000;
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
        line-height: 189px;
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

  .redio_flex {
    border: 1px solid #000;
    height: 32px;
    border-top: 0;
    line-height: 32px;
    padding-left: 20px;

    /deep/ .el-radio {
      line-height: 32px;
    }
  }

  .inp1 {
    height: 100%;
    flex: 1;

    /deep/ .el-input__inner {
      height: 100%;
    }
  }

  .input2 {
    height: 49px;
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
