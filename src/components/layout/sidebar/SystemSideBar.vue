<template>
  <div class="sidebar">
    <el-menu
      class="el-menu-vertical-demo"
      :unique-opened="true"
      :default-active="tabPath"
      text-color="#fff"
      :collapse="isCollapse"
      active-text-color="#c00"
    >
      <!-- @open="navOpen" -->
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
        <template v-if="item.mlist !== undefined && item.mlist.length > 0">
          <el-submenu :index="item.menuUrl" :key="index">
            <template slot="title">
              <i class="iconfont" :class="item.menuIcon"></i>
              <span slot="title">{{ item.menuName }}</span>
            </template>
            <el-menu-item-group>
              <span slot="title">{{ item.menuName }}</span>
              <template v-for="(subItem, subIndex) in item.mlist">
                <el-submenu
                  v-if="subItem.mlist !== undefined && subItem.mlist.length > 0"
                  :index="subItem.menuUrl"
                  :key="subIndex"
                >
                  <template slot="title">
                    <i class="iconfont" :class="subItem.menuIcon"></i>
                    <span slot="title">{{ subItem.menuName }}</span>
                  </template>
                  <el-menu-item
                    v-for="(threeItem, threeIndex) in subItem.mlist"
                    :key="threeIndex"
                    :index="threeItem.menuUrl"
                    @click="toPathAction(threeItem)"
                    >{{ threeItem.menuName }}</el-menu-item
                  >
                </el-submenu>
                <el-menu-item
                  v-else
                  @click="toPathAction(subItem)"
                  :index="subItem.menuUrl"
                  :key="subIndex"
                >
                  <template slot="title">{{ subItem.menuName }}</template>
                </el-menu-item>
              </template>
            </el-menu-item-group>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item
            :index="item.menuUrl"
            :key="index"
            @click="toPathAction(item)"
          >
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
        // { menuUrl: "/server/backlog/list", menuName: "我的待办", menuIcon: "" },
        {
          menuUrl: "/",
          menuName: "首页",
          menuIcon: "",
        },
        {
          menuUrl: "/server/flowQuery",
          menuName: "流程查询",
          menuIcon: "",
        },
        {
          menuUrl: "/server/coupon",
          menuName: "流程一览表",
          menuIcon: "",
        },
        {
          menuUrl: "/server/notice",
          menuName: "公告管理",
          menuIcon: "",
        },

        // {
        //   menuUrl: "/server/information/list",
        //   menuName: "个人信息",
        //   menuIcon: ""
        // },

        // {
        //   menuName: "因公出访",
        //   menuUrl: "/picture1",
        //   menuName: "因公出访",
        //   mlist: [
        //     { menuUrl: "/picture/visit1/list", menuName: "因公出国流程" },
        //     { menuUrl: "/picture/visit2/list", menuName: "因公出港澳流程" },
        //     { menuUrl: "/picture/visit3/list", menuName: "因公出台流程" },
        //     { menuUrl: "/picture/standards/list", menuName: "开支标准" }
        //   ]
        // },
        // {
        //   menuName: "涉外活动",
        //   menuUrl: "/picture2",
        //   menuName: "涉外活动",
        //   mlist: [
        //     {
        //       menuUrl: "/picture/exchange1/1",
        //       menuName: "涉外活动申请流程"
        //     },
        //     {
        //       menuUrl: "/picture/exchange1/2",
        //       menuName: "涉外礼品申领流程"
        //     },
        //     {
        //       menuUrl: "/picture/exchange1/3",
        //       menuName: "来访接待信息管理流程"
        //     }
        //   ]
        // },
        // {
        //   menuName: "资料报送",
        //   menuUrl: "/picture3",
        //   menuName: "资料报送",
        //   mlist: [{ menuUrl: "/picture/exchange1/5", menuName: "资料报送流程" }]
        // },
        // {
        //   menuName: "教师聘用",
        //   menuUrl: "/picture4",
        //   menuName: "教师聘用",
        //   mlist: [
        //     // {
        //     //   menuUrl: "/picture/foreign1/2",
        //     //   menuName: "涉外讲座申报流程"
        //     // },
        //     {
        //       menuUrl: "/picture/foreign1/3",
        //       menuName: "海外名师申报流程"
        //     },
        //     {
        //       menuUrl: "/picture/foreign1/4",
        //       menuName: "港澳台教师聘用流程"
        //     }
        //   ]
        // },
        // {
        //   menuName: "后勤维修",
        //   menuUrl: "/picture5",
        //   menuName: "后勤维修",
        //   mlist: [{ menuUrl: "/picture/foreign1/1", menuName: "后勤维修流程" }]
        // },
        // {
        //   menuName: "万人计划",
        //   menuUrl: "/picture6",
        //   menuName: "万人计划",
        //   mlist: [{ menuUrl: "/picture/exchange1/4", menuName: "万人计划流程" }]
        // },
        // {
        //   menuName: "协议签署",
        //   menuUrl: "/picture7",
        //   menuName: "协议签署",
        //   mlist: [
        //     { menuUrl: "/picture/foreign1/6", menuName: "协议签署申请流程" }
        //   ]
        // },
        // {
        //   menuName: "孔子学院",
        //   menuUrl: "/picture8",
        //   menuName: "孔子学院",
        //   mlist: [
        //     {
        //       menuUrl: "/picture/foreign1/5",
        //       menuName: "总部志愿者报名流程"
        //     }
        //   ]
        // },
        { menuUrl: "/server/present", menuName: "礼品管理", menuIcon: "" },
        {
          menuUrl: "/server/contract",
          menuName: "协议管理",
          menuIcon: "",
        },
        {
          menuUrl: "/server/authorization",
          menuName: "工作授权",
          menuIcon: "",
        },
        {
          menuName: "系统管理",
          menuUrl: "/picture/standards",
          menuName: "系统管理",
          mlist: [
            { menuUrl: "/picture/standards", menuName: "开支标准" },
            { menuUrl: "/article/background", menuName: "菜单管理" },
            { menuUrl: "/article/news", menuName: "角色管理" },
            { menuUrl: "/article/story", menuName: "用户管理" },
            {
              menuUrl: "/article/coupon",
              menuName: "流程配置管理",
              menuIcon: "",
            },
            { menuUrl: "/article/department", menuName: "部门管理" },
            { menuUrl: "/article/duty", menuName: "职务管理" },
            {
              menuUrl: "/article/configuration",
              menuName: "表单配置",
              menuIcon: "",
            },
            { menuUrl: "/article/type", menuName: "数据字典" },
            { menuUrl: "/article/system", menuName: "访问日志" },
          ],
        },
      ],
      searchData: {
        accountname: "",
      },
      URLparams: {
        pageNumber: 1,
        pageSize: 100,
      },
      tabPath: "",
    };
  },
  watch: {
    "$route.path"(val, oldVal) {
      if (val && val !== oldVal) {
        // console.log(this.$store.state.topath);
        // if (sessionStorage.tabPath) {
        this.tabPath = this.$store.state.topath;
        // }
        // this.currentMenu = sessionStorage.getItem("path");
        this.getUrl();
      }
    },
  },
  computed: {
    // tabPath() {
    // console.log(1);
    // return this.$store.state.topath;
    // },
  },
  created() {
    // if (sessionStorage.tabPath) {
    //   console.log(111);
    // this.tabPath = this.$store.state.topath;
    //   this.navOpen(path);
    // }
    // this.init();
    this.getUrl();
  },
  methods: {
    init() {
      this.$api.menu
        .list(this.URLparams)
        .then((res) => {
          this.menu = res.data;
        })
        .catch((err) => {
          this.$message.error("查询失败！");
        });
    },
    toPathAction(route) {
      // console.log(route);
      if (route.menuUrl === "/picture/exchange1/1") {
        sessionStorage.num = "1";
      } else if (route.menuUrl === "/picture/exchange1/2") {
        sessionStorage.num = "2";
      } else if (route.menuUrl === "/picture/exchange1/3") {
        sessionStorage.num = "3";
      } else if (route.menuUrl === "/picture/exchange1/4") {
        sessionStorage.num = "4";
      } else if (route.menuUrl === "/picture/exchange1/5") {
        sessionStorage.num = "5";
      }
      if (route.menuUrl === "/picture/foreign1/1") {
        sessionStorage.foreNum = "1";
      } else if (route.menuUrl === "/picture/foreign1/2") {
        sessionStorage.foreNum = "2";
      } else if (route.menuUrl === "/picture/foreign1/3") {
        sessionStorage.foreNum = "3";
      } else if (route.menuUrl === "/picture/foreign1/4") {
        sessionStorage.foreNum = "4";
      } else if (route.menuUrl === "/picture/foreign1/5") {
        sessionStorage.foreNum = "5";
      } else if (route.menuUrl === "/picture/foreign1/6") {
        sessionStorage.foreNum = "6";
      }
      let history = this.$store.state.history;
      for (let i in history) {
        if (history[i].menuUrl === route.menuUrl) {
          this.$router.replace(history[i].menuUrl);
          this.$store.commit("GET_TOPATH", route.menuUrl);
          return false;
        }
      }
      if (route.menuUrl === "/") {
        this.$router.replace(route.menuUrl);
        this.$store.commit("GET_TOPATH", route.menuUrl);
        return false;
      }
      // if (
      //   route.menuUrl === "/picture1" ||
      //   route.menuUrl === "/picture2" ||
      //   route.menuUrl === "/picture3" ||
      //   route.menuUrl === "/picture4" ||
      //   route.menuUrl === "/picture5"
      // ) {
      //   this.$store.commit("GET_STATENAME", route.menuName);
      //   this.$router.replace("/");
      // } else {
      // console.log(route);
      this.$store.commit("GET_TOPATH", route.menuUrl);
      this.$store.commit("addHistory", route);
      this.$router.replace(route.menuUrl);
      // }
    },
    getUrl() {
      let self = this;
      console.log(self.$route.matched);
      if (self.$route.matched.length > 3) {
        self.tabPath = self.$route.matched[2].path;
      }
      if (self.$route.matched.length == 3) {
        self.tabPath = self.$route.matched[2].path;
      }
      if (self.$route.path == "/") {
        self.tabPath = self.$route.path;
      }
    },
    navOpen(path) {
      console.log(path);
      this.$router.push({ path });
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 181px;
}
</style>
