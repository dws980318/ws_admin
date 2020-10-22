<template>
  <div class="sidebar">
    <el-menu
      class="el-menu-vertical-demo"
      :unique-opened="true"
      :default-active="tabPath"
      background-color="#f1f8fc"
      text-color="#000"
      :collapse="isCollapse"
      active-text-color="#2782dd"
    >
      <!-- <div v-for="(item, index) in menu" :key="index">
        <el-menu-item v-if="!item.list" :index="item.path" @click="toPath(item)">
          <i class="iconfont" :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
        <el-submenu v-else :index="item.path">
          <template slot="title">
            <i class="iconfont" :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(menuItem, itemIndex) in item.list"
              :key="itemIndex"
              @click="toPath(menuItem)"
              :index="menuItem.path"
            >{{menuItem.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </div>-->
      <div v-for="(item, index) in menu">
        <template v-if="item.mlist">
          <el-submenu :index="item.menuUrl" :key="index">
            <template slot="title">
              <i class="iconfont" :class="item.menuIcon"></i>
              <span slot="title">{{ item.menuName }}</span>
            </template>
            <el-menu-item-group>
              <span slot="title">{{item.menuName}}</span>
              <template v-for="(subItem, subIndex) in item.mlist">
                <el-menu-item @click="toPath(subItem)" :index="subItem.menuUrl" :key="subIndex">
                  <template slot="title">{{ subItem.menuName }}</template>
                </el-menu-item>
              </template>
            </el-menu-item-group>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.menuUrl" :key="index" @click="toPath(item)">
            <i class="iconfont" :class="item.menuIcon"></i>
            <span slot="title">{{ item.menuName }}</span>
          </el-menu-item>
        </template>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: ["isCollapse"],
  data() {
    return {
      currentMenu: "/",
      menu: [
        { menuUrl: "/article/background/list", menuName: "菜单管理" },
        { menuUrl: "/article/news/list", menuName: "角色管理" },
        { menuUrl: "/article/story/list", menuName: "用户管理" },
        { menuUrl: "/article/department/list", menuName: "部门管理" },
        { menuUrl: "/article/duty/list", menuName: "职务管理" },
        { menuUrl: "/article/type/list", menuName: "数据字典" },
        { menuUrl: "/article/system/list", menuName: "访问日志" }
      ],
      searchData: {
        accountname: ""
      },
      URLparams: {
        pageNumber: 1,
        pageSize: 100
      }
    };
  },
  watch: {
    "$route.path"(val, oldVal) {
      if (val && val !== oldVal) {
        // console.log(val)
        // console.log(oldVal)
        // if (sessionStorage.tabPath) {
        //   this.tabPath = sessionStorage.tabPath;
        // }
        // this.currentMenu = sessionStorage.getItem("path");
        // this.getUrl();
      }
    }
  },
  computed: {
    tabPath() {
      return this.$store.state.topath;
    }
  },
  created() {
    if (sessionStorage.tabPath) {
      this.tabPath = sessionStorage.tabPath;
    }
    // this.getUrl();
  },
  methods: {
    init() {
      this.$api.menu
        .list(this.URLparams, this.searchData)
        .then(res => {
          for (let i in res.data) {
            if (res.data[i].menuName === "用户") {
              this.menu = res.data[i].mlist;
            }
          }
        })
        .catch(err => {
          this.$message.error("查询失败！");
        });
    },
    toPath(route) {
      console.log(route);
      this.$store.commit("GET_TOPATH", route.menuUrl);
      // sessionStorage.tabPath = route.menuUrl;
      // let history = this.$store.state.history;
      // for (let i in history) {
      //   if (history[i].path === route.path) {
      //     this.$router.replace(history[i].path);
      //     return false;
      //   }
      // }
      // if (route.path === "/") {
      //   this.$router.replace(route.path);
      //   return false;
      // }
      // this.$store.commit("addHistory", route);
      this.$router.replace(route.menuUrl);
    },
    getUrl() {
      let self = this;
      // var currentUrl = "/";
      // console.log(this.$route.matched.length);
      if (this.$route.matched.length > 3) {
        self.currentMenu = self.$route.matched[2].path;
      }
      if (this.$route.matched.length == 3) {
        self.currentMenu = self.$route.matched[2].path;
      }
      if (this.$route.path == "/") {
        self.currentMenu = self.$route.path;
      }
      // console.log(this.$route);
      // console.log(currentUrl);
      // self.currentMenu = currentUrl;
    }
  }
};
</script>

<style scoped>
</style>
