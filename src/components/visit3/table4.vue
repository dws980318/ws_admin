<template>
  <div class="details">
    <div class="table">
      <el-row style="text-align: left;padding: 20px;border-right: 1px solid #000;">
        <img src="../../common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>广东外语外贸大学教职工因公临时访台绩效评估表</h2>
      </el-row>
      <el-row class="flex">
        <el-col
          style="width: 90px;text-align: center;height: 100%;font-size: 20px;font-weight: 600;"
        >
          <p style="padding-left: 3%;">基本情况及评估内容</p>
        </el-col>
        <el-col style="flex:1;border-left: 1px solid #000;">
          <el-col>
            <el-col :span="12" class="flex">
              <div class="center" style="width: 241px">所在部门</div>
              <el-input v-model="form.name" style="flex:1;"></el-input>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="center">团组长</div>
              <el-input v-model="form.birthdate" style="flex:1;"></el-input>
            </el-col>
          </el-col>
          <el-col>
            <el-col :span="12" class="flex">
              <div class="center" style="width: 241px">出访地区</div>
              <el-input v-model="form.name" style="flex:1;"></el-input>
            </el-col>
            <el-col :span="12" class="flex">
              <el-col :span="12" class="flex">
                <div class="center">出访天数</div>
                <el-input v-model="form.name" style="flex:1;"></el-input>
              </el-col>
              <el-col :span="12" class="flex">
                <div class="center">团组人数</div>
                <el-input v-model="form.birthdate" style="flex:1;"></el-input>
              </el-col>
            </el-col>
          </el-col>
          <el-col class="flex">
            <div class="center" style="width: 241px">团组人员姓名</div>
            <el-input v-model="form.name" style="flex:1;"></el-input>
          </el-col>
          <el-col>
            <el-col :span="14" class="flex">
              <div class="center" style="width: 241px;height: 100px;">
                有无未经批准擅自延长在外停留时间、更改行程、增加出访国家（地区）
                （若有，请以附件形式说明原因）
              </div>
              <el-input class="inp100" v-model="form.name"></el-input>
            </el-col>
            <el-col :span="5" class="flex">
              <div class="center" style="height: 100px;">是否履行出访经费先行审核手续</div>
              <el-input class="inp100" v-model="form.name"></el-input>
            </el-col>
            <el-col :span="5" class="flex">
              <div class="center" style="height: 100px;">是否提交出访报告</div>
              <el-input class="inp100" v-model="form.birthdate"></el-input>
            </el-col>
          </el-col>
          <p class="p1">简述出访目的、任务、实际行程：</p>
          <el-col style="height:120px;">
            <el-input style="height: 100%;" type="textarea" v-model="form.name"></el-input>
          </el-col>
          <p class="p1">简述本次出访所取得的直接工作成果（要求尽可能量化说明）：</p>
          <el-col style="height:300px;">
            <el-col :span="24" style="flex:1;height: 100%;">
              <el-col style="height: 100px;" class="colum">
                <p class="p1">1、开展访问交流活动情况</p>
                <el-input class="text" type="textarea" v-model="form.name"></el-input>
              </el-col>
              <el-col style="height: 100px;">
                <p class="p1">2、任务完成情况</p>
                <el-input class="text" type="textarea" v-model="form.name"></el-input>
              </el-col>
              <el-col style="height: 100px;">
                <p class="p1">3、其他出访成果</p>
                <el-input style="height: 70px;" type="textarea" v-model="form.name"></el-input>
              </el-col>
            </el-col>
          </el-col>
          <p class="p1">简述本次出访所延伸的潜在影响和成效（如对本地区、本单位工作部署、计划项目或关联业务的影响、借鉴意义等）：</p>
          <el-col style="height:120px;">
            <el-input style="height: 100%;" type="textarea" v-model="form.name"></el-input>
          </el-col>
          <p class="p1">下一步落实出访合作成果及其他后续工作的对策建议：</p>
          <el-col style="height:100px;">
            <el-input style="height: 100%;" type="textarea" v-model="form.name"></el-input>
          </el-col>
          <p class="p1">团组自评：</p>
          <el-col style="height:132px;">
            <el-input style="height: 100px;" type="textarea" v-model="form.name"></el-input>
            <el-col>
              <div style="flex-direction: row-reverse;display: flex;">
                <div style="display:flex;flex-direction:column;">
                  <div class="p1 flex">
                    <p>团长签名：</p>
                    <el-input
                      class="inp1"
                      style="width: 180px;height: auto;"
                      v-model="form.birthdate"
                    ></el-input>
                  </div>
                </div>
              </div>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
      <el-row
        style="border-top: 1px solid #000;border-bottom: 1px solid #000;border-right: 1px solid #000;"
        class="flex"
      >
        <el-col
          style="width: 90px;text-align: center;height: 90px;font-size: 20px;font-weight: 600;"
        >
          <p style="padding-left: 30%;">备注</p>
        </el-col>
        <el-col
          style="flex:1;width: 100%;border-left: 1px solid #000;line-height: 26px;height: 90px;padding: 10px; text-indent: 32px;"
        >请组团单位对此次出访取得的实际成效进行考核，按三个等次（A.超出预期出访目的、B.达到预期出访目的、C.未达预期出访目的）确定等次，并提出综合评估意见。</el-col>
      </el-row>
      <el-row>
        <el-col class="flex" style="width: 100%;border-bottom: 1px solid #000;">
          <div class="p1" style="line-height:64px;width: 100%;">
            <span style="margin-left: 36px;">填 报 人：</span>
            <el-input class="input1" style="width: 160px;" v-model="form.birthdate"></el-input>
            <span>填报日期：</span>
            <el-date-picker
              class="input1"
              style="width: 160px;"
              v-model="form.value1"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
            <span>联系电话：</span>
            <el-input class="input1" style="width: 160px;" v-model="form.birthdate"></el-input>
          </div>
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
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
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
    width: 100px;
    padding: 0 10px;
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
    padding: 0 15px;
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

  .input4 {
    height: 100%;
    border: none;
    border: 1px solid #000;
    border-top: 0;
    border-left: 0;

    /deep/ .el-input {
      height: 100%;
    }

    /deep/ .el-input__inner {
      height: 100%;
      border-right: 0;
      border-bottom: 0;
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

  .input1 {
    max-width: 250px;
    height: 32px;

    /deep/ .el-input__inner {
      height: 32px;
      border-radius: 0;
      border: 0;
      border-bottom: 1px solid #000;
    }
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

  .p1 {
    font-size: 14px;
    line-height: 30px;
    padding-left: 10px;
    font-weight: 600;
    border-right: 1px solid #000;
  }

  .inp1 {
    height: 32px;

    /deep/ .el-input__inner {
      padding: 0 5px;
      height: 32px;
      border-radius: 0;
      border: 0;
    }
  }

  .inp100 {
    height: 100px;
    flex:1;

    /deep/ .el-input__inner {
      border: none;
      border-radius: 0;
      border: 1px solid #000;
      border-top: 0;
     
      height: 100px;
      font-size: 16px;
    }
  }
   .inp101 {
    height: 100px;
    flex:1;

    /deep/ .el-input__inner {
      border: none;
      border-radius: 0;
      border: 1px solid #000;
      border-top: 0;
      height: 100px;
      font-size: 16px;
    }
  }

  .text {
    height: 70px;

    /deep/ .el-textarea__inner {
      height: 100%;
      border: 1px solid #000;
      border-bottom: 0;
      border-top: 0;
      border-left: 0;
      border-radius: 0;
      resize: none;
    }
  }
}
</style>
