<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="list_box">
      <div class="circle"></div>
      <i class="el-icon-right"></i>
      <div v-for="(item, index) in list" :key="index" style="display: flex;align-items: center;">
        <div class="list">
          <i class="el-icon-user-solid"></i>
          {{item.title}}
        </div>
        <i class="el-icon-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    return {
      list: [
        { title: "经办人" },
        { title: "处领导审核" },
        { title: "秘书处复核" },
        { title: "秘书处处长审核" },
        { title: "领导审批" },
        { title: "秘书处处理" },
        { title: "秘书处审核" },
        { title: "归档" }
      ]
    };
  },
  created() {
    if (this.$route.params.id) {
      this.init(this.$route.params.id);
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    }
  }
};
</script>

<style scoped lang="stylus">
.list_box {
  padding: 20px 40px;
  display: flex;
  align-items: center;

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

    i {
      position: absolute;
      left: 0;
      top: 0;
      margin: 0;
    }
  }
}
</style>
