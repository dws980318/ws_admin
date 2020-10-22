<template>
  <div class="details">
    <div class="table">
      <el-row style="text-align: left;padding: 20px;border-right: 1px solid #000;">
        <img src="@/common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>广东外语外贸大学涉外讲座申请表</h2>
      </el-row>
      <el-row class="flex">
        <div class="center">申报单位</div>
        <el-input v-model="form.name" style="flex:1;"></el-input>
      </el-row>
      <el-row>
        <el-col :span="8" class="flex">
          <div class="center">申报单位联系人</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">手机</div>
          <el-input v-model="form.birthdate" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">办公电话</div>
          <el-input v-model="form.identity" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">活动名称（中文）</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">活动名称（英文）</div>
          <el-input v-model="form.birthdate" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">活动地点</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">活动时间</div>
          <el-date-picker style="flex:1;" v-model="form.value1" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
      </el-row>
      <el-row class="flex">
        <div class="center" style="height: 73px;">政治面貌</div>
        <el-radio-group v-model="form.resource" class="redio_flex" style="flex:1;">
          <el-radio label="一般性交流活动（不涉及领事馆/大使馆/港澳台）"></el-radio>
          <el-radio label="一般性交流活动（涉及领事馆/大使馆）"></el-radio>
          <el-radio label="一般性交流活动（涉及港澳台）"></el-radio>
          <el-radio label="涉及非政府组织"></el-radio>
          <el-radio label="文化类活动"></el-radio>
          <el-radio label="双边会议"></el-radio>
          <el-radio label="国际会议"></el-radio>
          <el-radio label="线上讲座"></el-radio>
          <el-radio label="线下讲座"></el-radio>
          <el-radio label="学生短期出国（境）学术类项目"></el-radio>
          <el-radio label="其他"></el-radio>
        </el-radio-group>
      </el-row>
      <el-row class="flex" style="height: 73px">
        <div class="center" style="height: 100%;padding: 0 10px;">活动涉及国/境外机构名称</div>
        <el-input
          type="textarea"
          v-model="form.name"
          style="flex:1;height: 100%;border-left: 1px solid #000;"
        ></el-input>
        <!-- <el-input v-model="form.name" style="flex:1;"></el-input> -->
      </el-row>
      <el-row style="height: 73px">
        <el-col :span="12" class="flex" style="height: 73px">
          <div class="center" style="height: 100%;padding: 0 10px;">涉国（境）外国家及地区</div>
          <el-input
            type="textarea"
            v-model="form.name"
            style="flex:1;height: 100%;border-left: 1px solid #000;"
          ></el-input>
        </el-col>
        <el-col :span="12" class="flex" style="height: 100%;">
          <div class="center" style="height: 100%;padding: 0 10px;">涉国（境）外国家及地区所属大洲</div>
          <el-input
            type="textarea"
            v-model="form.name"
            style="flex:1;height: 100%;border-left: 1px solid #000;"
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center" style="height: 73px;padding: 0 10px;">涉国（境）外国家及地区</div>
          <el-radio-group v-model="form.resource" class="redio_flex" style="height: 73px;flex:1;">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center" style="height: 73px;padding: 0 10px;">涉国（境）外国家及地区所属大洲</div>
          <el-radio-group v-model="form.resource" class="redio_flex" style="height: 73px;flex:1;">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row class="flex" style="height: 98px;">
        <div class="center" style="height: 100%;padding: 0 10px;">活动涉及国/境外人员（简介可另附）</div>
        <el-input
          type="textarea"
          v-model="form.name"
          style="flex:1;height: 100%;border-left: 1px solid #000;"
        ></el-input>
      </el-row>
      <el-row class="flex" style="height: 64px;">
        <div class="center" style="height: 100%;padding: 0 10px;">活动涉及国/境外人员（简介可另附）</div>
        <el-col class="colum" style="flex:1;border-left: 1px solid #000;">
          <el-col class="flex">
            <div class="center">大陆</div>
            <el-input class="inp2" v-model="form.name"></el-input>
            <div class="center">台</div>
            <el-input class="inp2" v-model="form.birthdate"></el-input>
            <div class="center" style="border-right: 1px solid #000;">总数</div>
          </el-col>
          <el-col class="flex">
            <div class="center">港澳</div>
            <el-input class="inp2" v-model="form.name"></el-input>
            <div class="center">国外</div>
            <el-input class="inp2" v-model="form.birthdate"></el-input>
            <el-input class="inp3" v-model="form.birthdate"></el-input>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="flex" style="height: 118px;">
        <div class="center" style="height: 100%;padding: 0 10px;">我校拟出席人员姓名及职位</div>
        <el-input
          type="textarea"
          v-model="form.name"
          style="flex:1;height: 100%;border-left: 1px solid #000;"
        ></el-input>
      </el-row>
      <el-row class="flex" style="height: 118px;">
        <div class="center" style="height: 100%;padding: 0 10px;">拟邀请新闻单位</div>
        <el-input
          type="textarea"
          v-model="form.name"
          style="flex:1;height: 100%;border-left: 1px solid #000;"
        ></el-input>
      </el-row>
      <el-row class="flex" style="height: 118px;">
        <div class="center" style="height: 100%;padding: 0 10px;">活动内容、日程及目的</div>
        <el-input
          type="textarea"
          v-model="form.name"
          style="flex:1;height: 100%;border-left: 1px solid #000;"
        ></el-input>
      </el-row>
      <el-row class="flex" style="height: 88px;">
        <div class="center" style="height: 100%;padding: 0 10px;">经费预算及目的</div>
        <el-input
          type="textarea"
          v-model="form.name"
          style="flex:1;height: 100%;border-left: 1px solid #000;"
        ></el-input>
      </el-row>
      <el-row class="flex">
        <el-col :span="16" class="flex">
          <div class="center" style="padding: 0 10px;">经费来源</div>
          <el-radio-group v-model="form.resource" class="redio_flex" style="height: 32px;flex:1;">
            <el-radio label="学校经费"></el-radio>
            <el-radio label="部门经费"></el-radio>
            <el-radio label="项目经费"></el-radio>
            <el-radio label="其他经费"></el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">其他经费：</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row style="height: 108px;">
        <el-col :span="8" class="flex" style="height: 100%;">
          <div class="center" style="height: 100%;padding: 0 10px;">申报单位负责人意见及公章</div>
          <el-input
            type="textarea"
            v-model="form.name"
            style="border-left: 1px solid #000;flex:1;height: 100%;"
          ></el-input>
        </el-col>
        <el-col :span="8" class="flex" style="height: 100%;">
          <div class="center" style="height: 100%;padding: 0 10px;">国际合作及交流处分管领导审批意见</div>
          <el-input
            type="textarea"
            v-model="form.name"
            style="border-left: 1px solid #000;flex:1;height: 100%;"
          ></el-input>
        </el-col>
        <el-col :span="8" class="flex" style="height: 100%;">
          <div class="center" style="height: 100%;padding: 0 10px;">国际合作及交流处处长审批意见</div>
          <el-input
            type="textarea"
            v-model="form.name"
            style="border-left: 1px solid #000;flex:1;height: 100%;"
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p style="font-weight: 600;border-right: 1px solid #000;line-height: 30px;">说明:</p>
          <div
            style="padding-left: 10px;font-weight: 600;border-bottom: 1px solid #000;border-right: 1px solid #000;"
          >
            <p>【1】各单位及师生的各类设计涉领活动必须报备并批准后方能开展；</p>
            <p>【2】活动报备所需提交材料及其他注意事项详见涉外活动报批指南；</p>
            <p>【3】国际会议、双边、文化类活动、一般性交流活动提交（或交换，交换文件当天请电话联系我处相关负责同事）至国际处交流科（北校区行政楼322，电话：36205303），涉外讲座提交至国际处外专科（北校区行政楼503，电话：36207047），学生项目提交至国际处项目科（北校行政楼319，电话：36317267）。</p>
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
    };
  },
  watch: {},
  created() {},
  methods: {},
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

  .redio_flex {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 100%;
    border: 1px solid #000;
    border-top: 0;
    text-align: center;
    padding: 0 15px;

    /deep/ .el-radio {
      // height: 100%;
      line-height: 24px;
    }
  }

  .inp2 {
    height: 32px;
    flex: 1;

    /deep/ .el-input__inner {
      border-radius: 0;
      border: 1px solid #000;
      border-top: 0;
      height: 100%;
    }
  }

  .inp3 {
    height: 32px;
    width: 100px;

    /deep/ .el-input__inner {
      border-radius: 0;
      border: 1px solid #000;
      border-left: 0;
      border-top: 0;
      border-bottom: 1px solid #000;
      height: 100%;
    }
  }
}
</style>
