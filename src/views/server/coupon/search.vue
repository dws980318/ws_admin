<template>
  <div style="width: 100%;height: auto">
    <el-form :inline="true" v-show="searchShow === 'searchShow1'">
      <el-form-item style="float: left">
        <el-input clearable type="text" size="small" placeholder="请输入姓名" v-model="searchData.title"></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入所在单位"
          v-model="searchData.title2"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入职级"
          v-model="searchData.title3"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-select size="small" v-model="searchData.title4" placeholder="请选择出访类型">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="float: left;" label>
        <el-date-picker
          style="width: 200px"
          size="small"
          v-model="searchData.title5"
          type="datetime"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          placeholder="请选择出访时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="float: left" label-width="50">
        <el-button type="success" size="small" icon="el-icon-search" @click="hanldeSeach">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" v-show="searchShow === 'searchShow2'">
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入申报单位联系人"
          v-model="searchData.applyUser"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-date-picker
          style="width: 200px"
          size="small"
          v-model="searchData.applyDate"
          type="datetime"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          placeholder="请选择申报时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入申报单位"
          v-model="searchData.replaceApplyUnit"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入涉国（境）外国家及地区"
          v-model="searchData.orgName"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入涉国（境）外国家及地区所属大洲"
          v-model="searchData.orgContinent"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left" label-width="50">
        <el-button type="success" size="small" icon="el-icon-search" @click="hanldeSeach">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" v-show="searchShow === 'searchShow3'">
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入申领人"
          v-model="searchData.username"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-date-picker
          style="width: 200px"
          size="small"
          v-model="searchData.applyDateStart"
          type="datetime"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          placeholder="请选择申领开始时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="float: left">
        <el-date-picker
          style="width: 200px"
          size="small"
          v-model="searchData.applyDateEnd"
          type="datetime"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          placeholder="请选择申领结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入礼品名称"
          v-model="searchData.presentName"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入申领事由"
          v-model="searchData.applyThing"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left" label-width="50">
        <el-button type="success" size="small" icon="el-icon-search" @click="hanldeSeach">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" v-show="searchShow === 'searchShow4'">
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入来访团组"
          v-model="searchData.groupName"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-date-picker
          style="width: 200px"
          size="small"
          v-model="searchData.groupDateStart"
          type="datetime"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          placeholder="请选择开始时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="float: left">
        <el-date-picker
          style="width: 200px"
          size="small"
          v-model="searchData.groupDateEnd"
          type="datetime"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          placeholder="请选择结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入团长"
          v-model="searchData.groupUser"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left" label-width="50">
        <el-button type="success" size="small" icon="el-icon-search" @click="hanldeSeach">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" v-show="searchShow === 'searchShow5'">
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入资料名称"
          v-model="searchData.title"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-date-picker
          style="width: 200px"
          size="small"
          v-model="searchData.startDate"
          type="datetime"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          placeholder="请选择开始时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="float: left">
        <el-date-picker
          style="width: 200px"
          size="small"
          v-model="searchData.endDate"
          type="datetime"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          placeholder="请选择结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入发起人"
          v-model="searchData.createUserId"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left" label-width="50">
        <el-button type="success" size="small" icon="el-icon-search" @click="hanldeSeach">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" v-show="searchShow === 'searchShow6'">
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入专家姓名"
          v-model="searchData.expertName"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入项目名称"
          v-model="searchData.proName"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入项目申报部门"
          v-model="searchData.proDept"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-date-picker
          style="width: 200px"
          size="small"
          v-model="searchData.applyDateStart"
          type="datetime"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          placeholder="请选择开始日期"
        ></el-date-picker>
      </el-form-item>
       <el-form-item style="float: left">
        <el-date-picker
          style="width: 200px"
          size="small"
          v-model="searchData.applyDateEnd"
          type="datetime"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          placeholder="请选择结束日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item style="float: left" label-width="50">
        <el-button type="success" size="small" icon="el-icon-search" @click="hanldeSeach">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" v-show="searchShow === 'searchShow7'">
      <el-form-item style="float: left">
        <el-input clearable type="text" size="small" placeholder="请输入姓名" v-model="searchData.name"></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input clearable type="text" size="small" placeholder="请输入年龄" v-model="searchData.age"></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入申报单位"
          v-model="searchData.applyUnit"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-date-picker
          style="width: 200px"
          size="small"
          v-model="searchData.applyDateStart"
          type="datetime"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          placeholder="请选择开始时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="float: left">
        <el-date-picker
          style="width: 200px"
          size="small"
          v-model="searchData.applyDateEnd"
          type="datetime"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          placeholder="请选择结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="float: left" label-width="50">
        <el-button type="success" size="small" icon="el-icon-search" @click="hanldeSeach">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" v-show="searchShow === 'searchShow8'">
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入填报单位"
          v-model="searchData.applyUnit"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入负责人姓名"
          v-model="searchData.name"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left" label-width="50">
        <el-button type="success" size="small" icon="el-icon-search" @click="hanldeSeach">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" v-show="searchShow === 'searchShow9'">
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入外教姓名"
          v-model="searchData.applyUser"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入联系电话"
          v-model="searchData.phone"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-date-picker
          style="width: 200px"
          size="small"
          v-model="searchData.startDate"
          type="datetime"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          placeholder="请选择可维修开始时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="float: left">
        <el-date-picker
          style="width: 200px"
          size="small"
          v-model="searchData.endDate"
          type="datetime"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          placeholder="请选择可维修结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="float: left" label-width="50">
        <el-button type="success" size="small" icon="el-icon-search" @click="hanldeSeach">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" v-show="searchShow === 'searchShow10'">
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入姓名"
          v-model="searchData.username"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input clearable type="text" size="small" placeholder="请输入性别" v-model="searchData.sex"></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入专业"
          v-model="searchData.profession"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input clearable type="text" size="small" placeholder="请输入年级" v-model="searchData.grade"></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input clearable type="text" size="small" placeholder="请输入申请项目" v-model="searchData.pro"></el-input>
      </el-form-item>
      <el-form-item style="float: left" label-width="50">
        <el-button type="success" size="small" icon="el-icon-search" @click="hanldeSeach">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" v-show="searchShow === 'searchShow11'">
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入申报单位"
          v-model="searchData.applyUnit"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-date-picker
          style="width: 200px"
          size="small"
          v-model="searchData.applyDateStart"
          type="datetime"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          placeholder="请选择申报开始时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="float: left">
        <el-date-picker
          style="width: 200px"
          size="small"
          v-model="searchData.applyDateEnd"
          type="datetime"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          placeholder="请选择申报结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入合作高校"
          v-model="searchData.school"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入经办人"
          v-model="searchData.applyUser"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left" label-width="50">
        <el-button type="success" size="small" icon="el-icon-search" @click="hanldeSeach">搜索</el-button>
      </el-form-item>
    </el-form>
      <el-form :inline="true" v-show="searchShow === 'searchShow12'">
      <el-form-item style="float: left">
        <el-input clearable type="text" size="small" placeholder="请输入姓名" v-model="searchData.username"></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-date-picker
          style="width: 200px"
          size="small"
          v-model="searchData.birthday"
          type="datetime"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          placeholder="请选择出生日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入所在学院"
          v-model="searchData.college"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入专业"
          v-model="searchData.class1"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left" label-width="50">
        <el-button type="success" size="small" icon="el-icon-search" @click="hanldeSeach">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" v-show="searchShow === 'searchShow13'">
      <el-form-item style="float: left">
        <el-input clearable type="text" size="small" placeholder="请输入标题" v-model="searchData.title"></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-date-picker
          style="width: 200px"
          size="small"
          v-model="searchData.startDate"
          type="datetime"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          placeholder="请选择执行开始时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="float: left">
        <el-date-picker
          style="width: 200px"
          size="small"
          v-model="searchData.endDate"
          type="datetime"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          placeholder="请选择执行结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入项目目标"
          v-model="searchData.target"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left" label-width="50">
        <el-button type="success" size="small" icon="el-icon-search" @click="hanldeSeach">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" v-show="searchShow === 'searchShow14'">
      <el-form-item style="float: left">
        <el-input clearable type="text" size="small" placeholder="请输入标题" v-model="searchData.title"></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-date-picker
          style="width: 200px"
          size="small"
          v-model="searchData.startDate"
          type="datetime"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          placeholder="请选择执行开始时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="float: left">
        <el-date-picker
          style="width: 200px"
          size="small"
          v-model="searchData.endDate"
          type="datetime"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          placeholder="请选择执行结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="float: left">
        <el-input
          clearable
          type="text"
          size="small"
          placeholder="请输入项目目标"
          v-model="searchData.target"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: left" label-width="50">
        <el-button type="success" size="small" icon="el-icon-search" @click="hanldeSeach">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    searchData: {
      type: Object,
      default: {},
    },
    searchShow: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    hanldeSeach() {
      this.$emit("searchAction", this.searchData);
    },
  },
};
</script>

<style scoped lang="stylus"></style>

