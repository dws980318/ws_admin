<template>
  <el-col :span="24">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="访问授权" name="1"></el-tab-pane>
      <el-tab-pane label="分类授权" name="2"></el-tab-pane>
      <el-tab-pane label="成员授权" name="3"></el-tab-pane>
    </el-tabs>
    <router-view v-loading="loading"></router-view>
  </el-col>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      loading: false,
      activeName: "1",
      authManagers: ""
      // activeName: "/article/news/authManager"
    };
  },
  created() {
    this.authManagers = sessionStorage.authManagers;
    this.activeName = sessionStorage.authActive;
  },
  watch: {
    $route(val, oldVal) {
      // console.log(this.$route.matched[4]);
      if (
        this.$route.matched[4].path ===
        "/article/news/authManager/access/:access"
      ) {
        this.activeName = "1";
      } else if (
        this.$route.matched[4].path ===
        "/article/news/authManager/category/:category"
      ) {
        this.activeName = "2";
      } else if (
        this.$route.matched[4].path === "/article/news/authManager/user/:user"
      ) {
        this.activeName = "3";
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      this.loading = true;
      // console.log(tab);
      if (tab.name === "1") {
        this.$store.commit("authActiveAction", "1");
        this.$router.push(
          "/article/news/authManager/access/" + this.authManagers
        );
      } else if (tab.name === "2") {
        this.$store.commit("authActiveAction", "2");
        this.$router.push(
          "/article/news/authManager/category/" + this.authManagers
        );
      } else if (tab.name === "3") {
        this.$store.commit("authActiveAction", "3");
        this.$router.push(
          "/article/news/authManager/user/" + this.authManagers
        );
      }
      // this.$router.push(tab.name);
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
