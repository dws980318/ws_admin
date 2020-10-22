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
        {
          menuName: "出访科",
          menuUrl: "/picture",
          title: "出访科",
          mlist: [
            { menuUrl: "/picture/visit1/list", menuName: "因公出国流程" },
            { menuUrl: "/picture/visit2/list", menuName: "因公出港澳流程" },
            { menuUrl: "/picture/visit3/list", menuName: "因公出台流程" }
          ]
        },
        {
          menuName: "交流科",
          menuUrl: "/picture2",
          title: "交流科",
          mlist: [
            { menuUrl: "/picture/exchange1/1", menuName: "涉外活动申请流程" },
            { menuUrl: "/picture/exchange1/2", menuName: "涉外礼品申领流程" },
            {
              menuUrl: "/picture/exchange1/3",
              menuName: "来访接待信息管理流程"
            },
             {
              menuUrl: "/picture/exchange1/5",
              menuName: "资料报送流程"
            }
          ]
        },
        {
          menuName: "外专科",
          menuUrl: "/picture3",
          title: "外专科",
          mlist: [
            { menuUrl: "/picture/foreign1/1", menuName: "后勤维修流程" },
            { menuUrl: "/picture/foreign1/2", menuName: "涉外讲座申报流程" },
            { menuUrl: "/picture/foreign1/3", menuName: "海外名师申报流程" },
            { menuUrl: "/picture/foreign1/4", menuName: "港澳台教师聘用流程" }
          ]
        },
        {
          menuName: "项目科",
          menuUrl: "/picture4",
          title: "项目科",
          mlist: [
            { menuUrl: "/picture/exchange1/4", menuName: "万人计划流程" },
            { menuUrl: "/picture/foreign1/6", menuName: "协议签署申请流程" }
          ]
        },
        {
          menuName: "孔院办",
          menuUrl: "/picture5",
          title: "孔院办",
          mlist: [
            {
              menuUrl: "/picture/foreign1/5",
              menuName: "孔子学院总部志愿者报名流程"
            }
          ]
        }
      ],
      tabPath: '/'
    };
  },
  watch: {
    "$route.path"(val, oldVal) {
      console.log(val);
      if (val && val !== oldVal) {
        // this.$store.commit("GET_COMMONSHOW", true);
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
    // tabPath() {
      // this.$store.commit("GET_COMMONSHOW", true);
      // return this.$store.state.topath;
    // }
  },
  created() {
    // if (sessionStorage.tabPath) {
    //   this.tabPath = sessionStorage.tabPath;
    // }
    // this.getUrl();
  },
  methods: {
    toPath(route) {
      // this.$store.commit("GET_TOPATH", route.menuUrl);
      // sessionStorage.tabPath = route.menuUrl;

      // console.log(route);
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
    }
  }
};
</script>

<style scoped>
</style>
