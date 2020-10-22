<template>
  <el-col :span="24">
    <!-- <el-tabs style="padding: 0 20px;" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="修改昵称" name="/article/update/updateNickname"></el-tab-pane>
      <el-tab-pane label="修改密码" name="/article/update/updatePassword"></el-tab-pane>
    </el-tabs> -->
    <router-view v-loading="loading"></router-view>
  </el-col>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      loading: false,
      activeName: "/article/update/updateNickname"
    };
  },
  created() {
    if (this.$route.matched[3]) {
      this.activeName = this.$route.matched[3].path;
    }
  },
  watch: {
    $route(to, from) {
      if (this.$route.matched[3]) {
        console.log(this.$route.matched[3]);
        this.activeName = this.$route.matched[3].path;
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      this.loading = true;
      sessionStorage.tabPath = tab.name;
      this.$router.push(tab.name);
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.page_main {
  min-width: 910px;
  width: 100%;
}
</style>
