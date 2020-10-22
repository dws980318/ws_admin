<template>
  <div class="details">
    <div class="table">
      <el-row
        style="text-align: left; padding: 20px; border-right: 1px solid #000"
      >
        <img src="../../common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>广东外语外贸大学涉外活动申请表</h2>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">流水号</div>
          <el-input
            v-model="form.date.serialNumber"
            disabled
            style="flex: 1"
          ></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">紧急程度</div>
          <el-select
            v-model="form.date.urgencyDegree"
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
        </el-col>
      </el-row>
      <el-row class="flex">
        <el-col :span="12" class="flex">
          <div class="center">申报单位</div>
          <el-input
            v-model="form.date.replaceApplyUnit"
            style="flex: 1"
          ></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">承办单位</div>
          <el-input v-model="form.date.applyUnit" style="flex: 1"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">申报单位联系人</div>
          <el-input v-model="form.date.applyUser" style="flex: 1"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div :class="['center', { star: star.phone }]">手机号码</div>
          <el-input
            :class="[{ border: border.phone }]"
            @change="phone"
            v-model="form.date.phone"
            style="flex: 1"
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div :class="['center', { star: star.phoneCall }]">办公电话</div>
          <el-input
            :class="[{ border: border.phoneCall }]"
            @change="phoneCall"
            v-model="form.date.phoneCall"
            style="flex: 1"
          ></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">申报时间</div>
          <el-date-picker
            style="flex: 1"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            v-model="form.date.applyDate"
            type="datetime"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">活动名称（中文）</div>
          <el-input v-model="form.date.title" style="flex: 1"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">活动名称（英文）</div>
          <el-input v-model="form.date.titleEnglish" style="flex: 1"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center">活动地点</div>
          <el-input v-model="form.date.address" style="flex: 1"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">活动时间</div>
          <el-date-picker
            @change="dateAction"
            class="date"
            v-model="date"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <!-- <el-date-picker style="flex:1;" v-model="form.startEndDate" type="date" placeholder="选择日期"></el-date-picker> -->
        </el-col>
      </el-row>
      <el-row class="flex">
        <div class="center" style="height: 97px">活动类型</div>
        <el-radio-group
          @change="radioAction"
          v-model="form.date.activityType"
          class="redio_flex"
          style="flex: 1"
        >
          <el-radio
            label="一般性交流活动（不涉及外国驻华使领馆/台湾人士/粤港澳大湾区主题等）"
            >一般性交流活动（不涉及外国驻华使领馆/台湾人士/粤港澳大湾区主题等）</el-radio
          >
          <el-radio label="一般性交流活动（涉外国驻华使领馆人员）"
            >一般性交流活动（涉外国驻华使领馆人员）</el-radio
          >
          <el-radio label="一般性交流活动（涉及台湾人士）"
            >一般性交流活动（涉及台湾人士）</el-radio
          >
          <el-radio label="一般性交流活动（涉及粤港澳大湾区主题）"
            >一般性交流活动（涉及粤港澳大湾区主题）</el-radio
          >
          <el-radio label="一般性交流活动（涉及非政府组织）"
            >一般性交流活动（涉及非政府组织）</el-radio
          >
          <el-radio label="文化类活动">文化类活动</el-radio>
          <el-radio label="双边会议">双边会议</el-radio>
          <el-radio label="国际会议">国际会议</el-radio>
          <el-radio label="涉外讲座">涉外讲座</el-radio>
          <el-radio label="其他">其他</el-radio>
        </el-radio-group>
        <!-- <el-checkbox-group class="redio_flex" style="flex:1;" v-model="form.date.checkedCities">
          <el-checkbox
            v-for="(item, index) in cities"
            :label="item.id"
            :key="index"
          >{{item.title}}</el-checkbox>
        </el-checkbox-group>-->
      </el-row>
      <el-row class="flex">
        <div class="center" style="height: 24px">活动形式</div>
        <el-radio-group
          @change="radioAction2"
          v-model="form.date.activityForm"
          class="redio_flex"
          style="flex: 1"
        >
          <el-radio :label="11">线下活动</el-radio>
          <el-radio :label="12">线上活动</el-radio>
        </el-radio-group>
      </el-row>
      <el-row class="flex" style="height: 73px">
        <div class="center" style="height: 100%; padding: 0 10px">
          活动涉及国/境外机构名称
        </div>
        <el-input
          type="textarea"
          v-model="form.date.orgAddress"
          style="flex: 1; height: 100%; border-left: 1px solid #000"
        ></el-input>
        <!-- <el-input v-model="form.date.name" style="flex:1;"></el-input> -->
      </el-row>
      <el-row style="height: 56px">
        <el-col :span="12" class="flex" style="height: 56px">
          <div class="center" style="height: 100%; padding: 0 10px">
            涉国（境）外国家及地区
          </div>
          <el-input
            type="textarea"
            v-model="form.date.orgName"
            style="flex: 1; height: 100%; border-left: 1px solid #000"
          ></el-input>
          <!-- <el-select class="select" v-model="form.date.orgName" placeholder="请选择涉国（境）外国家及地区">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>-->
        </el-col>
        <el-col :span="12" class="flex" style="height: 100%">
          <div class="center" style="height: 100%; padding: 0 10px">
            涉国（境）外国家及地区所属大洲
          </div>
          <el-input
            type="textarea"
            v-model="form.date.orgContinent"
            style="flex: 1; height: 100%; border-left: 1px solid #000"
          ></el-input>
          <!-- <el-select v-model="form.date.orgContinent" class="select" placeholder="请选择涉国（境）外国家及地区所属大洲">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>-->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center" style="height: 53px; padding: 0 10px">
            是否涉及外国驻华使领馆
          </div>
          <el-radio-group
            v-model="form.date.isConsulate"
            class="redio_flex"
            style="height: 53px; flex: 1"
          >
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center" style="height: 53px; padding: 0 10px">
            是否涉及敏感内容
          </div>
          <el-radio-group
            v-model="form.date.isSensitivity"
            class="redio_flex"
            style="height: 53px; flex: 1"
          >
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row class="flex" style="height: 98px">
        <div class="center" style="height: 100%; padding: 0 10px">
          活动涉及国/境外人员（简介可另附）
        </div>
        <el-input
          type="textarea"
          v-model="form.date.orgAttach"
          style="flex: 1; height: 100%; border-left: 1px solid #000"
        ></el-input>
      </el-row>
      <el-row class="flex" style="height: 64px">
        <div class="center" style="height: 100%; padding: 0 10px">
          预计参加人数
        </div>
        <el-col class="colum" style="flex: 1; border-left: 1px solid #000">
          <el-col class="flex">
            <div class="center">大陆</div>
            <el-input
              class="inp2"
              @input="numValid"
              v-model="form.date.mainlandNum"
            ></el-input>
            <div class="center">台</div>
            <el-input
              class="inp2"
              @input="numValid"
              v-model="form.date.taiwanNum"
            ></el-input>
            <div class="center" style="border-right: 1px solid #000">总数</div>
          </el-col>
          <el-col class="flex">
            <div class="center">港澳</div>
            <el-input
              class="inp2"
              @input="numValid"
              v-model="form.date.hongkongNum"
            ></el-input>
            <div class="center">国外</div>
            <el-input
              class="inp2"
              @input="numValid"
              v-model="form.date.foreignNum"
            ></el-input>
            <el-input
              class="inp3"
              @input="numValid"
              v-model="form.date.sumNum"
            ></el-input>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="flex">
        <div class="center" style="height: 73px; padding: 0 10px">
          是否邀请校领导出席
        </div>
        <el-radio-group
          v-model="form.date.isSchoolUsers"
          class="redio_flex"
          style="height: 73px; flex: 1"
        >
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-row>
      <el-row class="flex" style="height: 118px">
        <div class="center" style="height: 100%; padding: 0 10px">
          我校拟出席人员姓名及职位
        </div>
        <el-input
          type="textarea"
          v-model="form.date.schoolUsers"
          style="flex: 1; height: 100%; border-left: 1px solid #000"
        ></el-input>
      </el-row>
      <el-row class="flex" style="height: 118px">
        <div class="center" style="height: 100%; padding: 0 10px">
          拟邀请新闻单位
        </div>
        <el-input
          type="textarea"
          v-model="form.date.newsUnit"
          style="flex: 1; height: 100%; border-left: 1px solid #000"
        ></el-input>
      </el-row>
      <el-row class="flex" style="height: 118px">
        <div class="center" style="height: 100%; padding: 0 10px">
          活动内容、日程及目的
        </div>
        <el-input
          type="textarea"
          v-model="form.date.content"
          style="flex: 1; height: 100%; border-left: 1px solid #000"
        ></el-input>
      </el-row>
      <el-row class="flex" style="height: 88px">
        <div class="center" style="height: 100%; padding: 0 10px">
          经费预算及目的
        </div>
        <el-input
          type="textarea"
          v-model="form.date.amountPur"
          style="flex: 1; height: 100%; border-left: 1px solid #000"
        ></el-input>
      </el-row>
      <el-row class="flex" style="height: 118px">
        <div class="center" style="height: 100%; padding: 0 10px">
          申报或承办单位对活动参与人员及活动内容的审核意见
        </div>
        <el-input
          type="textarea"
          v-model="form.date.applyOpinion"
          style="flex: 1; height: 100%; border-left: 1px solid #000"
        ></el-input>
      </el-row>
      <el-row class="flex">
        <div class="center" style="padding: 0 10px">经费来源</div>
        <el-radio-group
          v-model="form.date.amountSou"
          class="redio_flex"
          style="height: 32px; flex: 1"
        >
          <el-radio label="学校经费"></el-radio>
          <el-radio label="部门经费"></el-radio>
          <el-radio label="项目经费"></el-radio>
          <el-radio label="其他经费"></el-radio>
        </el-radio-group>
        <el-col
          :span="8"
          class="flex"
          v-if="form.date.amountSou === '其他经费'"
        >
          <div class="center">其他经费：</div>
          <el-input v-model="form.date.amountElse" style="flex: 1"></el-input>
        </el-col>
      </el-row>
      <!-- <el-row>
        <h3 class="p1">审核信息：</h3>
        <el-col
          class="flex"
          style="height: 164px;border-top: 1px solid #000;"
          v-for="(item,index) in opinionList"
          :key="index"
        >
          <div style="width: 100px;">
            <div class="center" style="width: 100%;height: 164px;">{{item.title}}</div>
          </div>
          <div
            style="flex:1;border-left: 1px solid #000;display:flex;flex-direction:column;height: 164px;"
          >
            <el-col :span="24" style="flex:1">
              <el-input type="textarea" v-model="form.date.name" style="height: 100%;"></el-input>
            </el-col>
            <div>
              <el-col :span="12" class="flex">
                <div class="center">{{item.approver}}</div>
                <el-input v-model="form.date.name" style="flex:1;"></el-input>
              </el-col>
              <el-col :span="12" class="flex">
                <div class="center">{{item.date}}</div>
                <el-date-picker
                  style="flex:1;"
                  v-model="form.date.value1"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-col>
            </div>
          </div>
        </el-col>
      </el-row>-->

      <!-- <el-row style="height: 108px;">
        <el-col :span="8" class="flex" style="height: 100%;">
          <div class="center" style="height: 100%;padding: 0 10px;">申报单位负责人意见及公章</div>
          <el-input
            type="textarea"
            v-model="form.date.name"
            style="border-left: 1px solid #000;flex:1;height: 100%;"
          ></el-input>
        </el-col>
        <el-col :span="8" class="flex" style="height: 100%;">
          <div class="center" style="height: 100%;padding: 0 10px;">国际合作及交流处分管领导审批意见</div>
          <el-input
            type="textarea"
            v-model="form.date.name"
            style="border-left: 1px solid #000;flex:1;height: 100%;"
          ></el-input>
        </el-col>
        <el-col :span="8" class="flex" style="height: 100%;">
          <div class="center" style="height: 100%;padding: 0 10px;">国际合作及交流处处长审批意见</div>
          <el-input
            type="textarea"
            v-model="form.date.name"
            style="border-left: 1px solid #000;flex:1;height: 100%;"
          ></el-input>
        </el-col>
      </el-row>-->
      <el-row>
        <el-col :span="24">
          <p
            style="
              font-weight: 600;
              border-right: 1px solid #000;
              line-height: 30px;
            "
          >
            说明:
          </p>
          <div
            style="
              padding-left: 10px;
              font-weight: 600;
              border-bottom: 1px solid #000;
              border-right: 1px solid #000;
            "
          >
            <p>【1】各单位及师生的各类设计涉领活动必须报备并批准后方能开展；</p>
            <p>【2】活动报备所需提交材料及其他注意事项详见涉外活动报批指南；</p>
            <p>
              【3】国际会议、双边、文化类活动、一般性交流活动提交（或交换，交换文件当天请电话联系我处相关负责同事）至国际处交流科（北校区行政楼322，电话：36205303），涉外讲座提交至国际处外专科（北校区行政楼503，电话：36207047），学生项目提交至国际处项目科（北校行政楼319，电话：36317267）。
            </p>
            <p>
              【4】疫情或特殊时期申报材料可经申报单位领导电子签后发送PDF版至相关科室邮箱并告知（交流科：iecs@gduf.edu.cn；外专科：ete_63@126.com）。
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
    <v-opinion v-if="processList !== undefined && processList.length > 0" :list="opinionList"></v-opinion>

    <div class="common">
      <v-table11 :tableData="list"></v-table11>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :show-close="false"
      title="知会书"
      :visible.sync="bookShow"
      top="10vh"
      width="50%"
      center
    >
      <div class="dialog">
        <h2>涉外活动承办单位注意事项知会书</h2>
        <p>
          1.严格按照国际处批准的活动方案开展活动，如时间、地点、议题、境外出席人员等有变动，必须重新向国际处申请批准。
        </p>
        <p>2. 严格控制参加活动的人员范围，未经批准的人员不得参与活动。</p>
        <p>
          3.活动必须指定一名熟悉业务、政治立场坚定的现场控制人员全程参与活动，如参加活动人员存在违反我国现有制度、法规、政策的言行倾向或表现，应及时予以纠正，如有明显挑战我现有制度、法规、政策的行为，应采取有效措施，果断终止活动，并及时消除不良影响。
        </p>
        <p>4.如活动中有非正常情况发生，应第一时间向国际处汇报。</p>
        <p>
          5.活动结束后应留意参加人员、社会舆论对此次活动的反馈信息，如有异常，应第一时间向国际处汇报。活动结束后应留意参加人员、社会舆论对此次活动的反馈信息，如有异常，应第一时间向国际处汇报。
        </p>
        <p>
          6.应在活动结束后5个工作日内向国际处提交活动书面总结（即反馈书、反馈表等）。
        </p>
        <p>
          7.涉及国（境）外使领馆、境外非政府组织、哲学社科议题等的敏感活动，未经学校批准，不得报道。
        </p>
        <h2>确认回执</h2>
        <span class="span"
          >本人已经认证阅读了《涉外活动承办单位注意事项知会书》，承诺及时向所在单位主要负责人和活动具体负责人汇报传达有关文件精神，严格按照注意事项的要求，做好</span
        >
        <span
          >广东外语外贸大学涉外活动申请(活动名称）的组织和管理工作，切实落实政治安全、意识形态安全的防控工作。</span
        >
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="bookShowAction">同意</el-button>
        <el-button @click="cancelAction">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Table11 from "@/components/visit1/table11";
import Table12 from "@/components/visit1/table12";
import Opinion from "@/views/picture/opinion";
import { setTimeout } from "timers";
export default {
  name: "Details",
  components: {
    "v-table11": Table11,
    "v-table12": Table12,
    "v-opinion": Opinion,
  },
  data() {
    return {
      form: {
        formId: "1301554539758166016",
        date: {
          urgencyDegree: "1",
          modelId: "10002",
        },
      },
      options: [
        {
          value: "1",
          label: "是",
        },
        {
          value: "0",
          label: "否",
        },
      ],
      opinionList: [
        { title: "交流科工作人员确认", approver: "审批人", date: "审批时间" },
        {
          title: "学院主要负责人审批书记或院长）",
          approver: "审批人",
          date: "审批时间",
        },
        { title: "国际处交流科职员初审", approver: "审批人", date: "审批时间" },
        { title: "国际处交流科科长审批", approver: "审批人", date: "审批时间" },
        { title: "国际处分管副处长审批", approver: "审批人", date: "审批时间" },
        { title: "国际处处长审批", approver: "审批人", date: "审批时间" },
      ],
      cities: [
        {
          title:
            "一般性交流活动（不涉及外国驻华使领馆/台湾人士/粤港澳大湾区主题等）",
          id: 1,
        },
        {
          title: "一般性交流活动（涉外国驻华使领馆人员）",
          id: 2,
        },
        {
          title: "一般性交流活动（涉及台湾人士）",
          id: 3,
        },
        {
          title: "一般性交流活动（涉及粤港澳大湾区主题）",
          id: 4,
        },
        {
          title: "一般性交流活动（涉及非政府组织）",
          id: 5,
        },
        {
          title: "文化类活动",
          id: 6,
        },
        {
          title: "双边会议",
          id: 7,
        },
        {
          title: "国际会议",
          id: 8,
        },
        {
          title: "涉外讲座",
          id: 9,
        },
        {
          title: "其他",
          id: 10,
        },
      ],
      list: [
        {
          roleCode: "身份证",
          roleName: "张三身份证",
          remark: "500kb",
        },
      ],
      opinionList: [
        {
          name1: "可以，通过",
          name2: "李子柒",
          name3: "书记审批",
          name4: "2020-09-08",
        },
        {
          name1: "内容详细，符合因公出国流程，通过",
          name2: "王小二",
          name3: "国际处外专科科长审批",
          name4: "2020-09-09",
        },
        {
          name1: "符合要求，通过",
          name2: "刘大伟",
          name3: "国际处处长",
          name4: "2020-09-10",
        },
        {
          name1: "符合要求，确认通过",
          name2: "赵华光",
          name3: "外专科工作人员",
          name4: "2020-09-11",
        },
      ],
      bookShow: true,
      border: {
        phone: false,
        phoneCall: false,
      },
      star: {
        phone: true,
        phoneCall: true,
      },
      date: [],
      comformInfo: {
        formId: "1301554539758166016",
        id: "",
      },
      processList: []
    };
  },
  watch: {
    $route(val, oldVal) {
      console.log(val);
      console.log(oldVal);
      if (val && val !== oldVal) {
      }
    },
  },
  created() {
    console.log(this.form);
    if (this.$store.state.tableName === "涉外活动申请流程") {
      this.comformInfo.id = sessionStorage.tableId;
      this.$api.base
        .item({ comformInfo: JSON.stringify(this.comformInfo) })
        .then((res) => {
          this.form = res;
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
          this.form.date.modelId = "10002";
          this.form.date.show = true;
          this.form.date.urgencyDegree = "1";
          this.$store.commit("GET_FROM", this.form);
        });
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
            this.$store.commit("SET_PROCESSLIST", res.data);
          }
        })
        .catch((error) => {
          this.$message.error("失败！");
        });
    } else {
      console.log(1);
      this.serialInit();
      this.$store.commit("GET_FROM", this.form);
    }
  },
  methods: {
    serialInit() {
      this.$api.util().then((res) => {
        this.form.date.serialNumber = res.data;
      });
    },
    dateAction() {
      console.log(this.date);
      this.form.date.activityStartDate = this.date[0];
      this.form.date.activityEndDate = this.date[1];
    },
    bookShowAction() {
      this.bookShow = false;
    },
    cancelAction() {
      this.$store.commit("GET_TOPATH", "/");
      this.$router.replace("/");
    },
    radioAction() {
      console.log(this.form.date.activityType);
      if (this.form.date.activityType === 1) {
        this.list = [
          {
            roleCode: "身份证",
            roleName: "张三身份证",
            remark: "500kb",
            content: "chart_01",
          },
        ];
      } else if (this.form.date.activityType === 2) {
        this.list = [
          {
            roleCode: "word、pdf",
            roleName: "涉及演讲或讲座须上传演讲稿或提纲",
            remark: "500kb",
            content: "chart_02",
          },
        ];
      } else if (this.form.date.activityType === 3) {
        this.list = [
          {
            roleCode: "word、pdf",
            roleName: "港澳台人士个人简历",
            remark: "500kb",
            content: "chart_03",
          },
        ];
      } else if (this.form.date.activityType === 4) {
        this.list = [
          {
            roleCode: "word、pdf",
            roleName: "报批完毕回执扫描件",
            remark: "500kb",
            content: "chart_04",
          },
        ];
      } else if (this.form.date.activityType === 5) {
        this.list = [
          {
            roleCode: "word、pdf",
            roleName: "外方人员护照信息一览表",
            remark: "500kb",
            content: "chart_01",
          },
          {
            roleCode: "word、pdf",
            roleName: "护照复印件",
            remark: "500kb",
            content: "chart_03",
          },
          {
            roleCode: "word、pdf",
            roleName: "外方人员在华行程",
            remark: "500kb",
            content: "chart_04",
          },
          {
            roleCode: "word、pdf",
            roleName: "演出节目单",
            remark: "500kb",
            content: "chart_01",
          },
          {
            roleCode: "word、pdf",
            roleName: "驻穗领馆照会",
            remark: "500kb",
          },
        ];
      } else if (this.form.date.activityType === 6) {
        this.list = [
          {
            roleCode: "word、pdf",
            roleName: "上传会议日程",
            remark: "500kb",
          },
          {
            roleCode: "word、pdf",
            roleName: "境外与会人员名单",
            remark: "500kb",
          },
          {
            roleCode: "word、pdf",
            roleName: "境外发言代表个人简历及发言提纲",
            remark: "500kb",
          },
        ];
      } else if (this.form.date.activityType === 7) {
        this.list = [
          {
            roleCode: "word、pdf",
            roleName: "给省外办发文会议日程",
            remark: "500kb",
          },
          {
            roleCode: "word、pdf",
            roleName: "境外与会人员名单",
            remark: "500kb",
          },
          {
            roleCode: "word、pdf",
            roleName: "外发言代表个人简历及发言提纲",
            remark: "500kb",
            content: "chart_02",
          },
        ];
      }
    },
    radioAction2() {
      if (this.form.date.activityForm === 11) {
        this.list = [];
      }
    },
    numValid() {
      if (this.form.date.mainlandNum) {
        this.form.date.mainlandNum = this.form.date.mainlandNum.replace(
          /[^0-9]/g,
          ""
        );
      }
      if (this.form.date.taiwanNum) {
        this.form.date.taiwanNum = this.form.date.taiwanNum.replace(
          /[^0-9]/g,
          ""
        );
      }
      if (this.form.date.hongkongNum) {
        this.form.date.hongkongNum = this.form.date.hongkongNum.replace(
          /[^0-9]/g,
          ""
        );
      }
      if (this.form.date.foreignNum) {
        this.form.date.foreignNum = this.form.date.foreignNum.replace(
          /[^0-9]/g,
          ""
        );
      }
      if (this.form.date.sumNum) {
        this.form.date.sumNum = this.form.date.sumNum.replace(/[^0-9]/g, "");
      }
    },
    phone() {
      if (
        this.form.date.phone === "" ||
        !/(^[1][34578]\d{9}$)/.test(this.form.date.phone)
      ) {
        this.$message.error("手机号码输入错误，请重新输入！");
        this.border.phone = true;
      } else {
        this.border.phone = false;
      }
    },
    phoneCall() {
      if (
        this.form.date.phoneCall === "" ||
        !/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(this.form.date.phoneCall)
      ) {
        this.$message.error("办公电话输入错误，请重新输入！");
        this.border.phoneCall = true;
      } else {
        this.border.phoneCall = false;
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

    &::before {
      content: '* ';
      color: red;
    }
  }

  .centers {
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
      font-size: 18px;
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
      font-size: 18px;
    }
  }

  .p1 {
    border-right: 1px solid #000;
    line-height: 40px;
  }
}

.common {
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
  margin-bottom: 30px;
}

.dialog {
  h2 {
    text-align: center;
    line-height: 50px;
  }

  p {
    line-height: 30px;
  }

  .p1 {
    line-height: 40px;
  }

  .span {
    text-indent: 25px;
    line-height: 30px;
  }

  /deep/ .el-input__icon {
    line-height: 0;
  }

  .input1 {
    max-width: 200px;
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

  .flex {
    flex-col-center();
  }

  .btn {
    width: 160px;
    text-align: justify;
    height: 6px;

    &::after {
      content: '';
      display: inline-block;
      width: 100%;
      content: '';
      height: 0;
    }
  }
}

.select {
  flex: 1;
  height: 100%;

  /deep/ .el-input {
    height: 100%;

    /deep/ .el-input__inner {
      height: 100%;
    }
  }
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
</style>
