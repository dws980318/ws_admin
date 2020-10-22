<template>
  <el-container>
    <el-aside :width="isCollapse ? '64px' : '180px'" style="height: 100%">
      <div class="company_box" :class="{ isCollapse: isCollapse }">
        <div class="img_box">
          <img v-if="isCollapse" src="@/common/images/logo01.jpg" alt />
          <img v-else src="@/common/images/logo02.png" alt />
        </div>
      </div>
      <sidebar :isCollapse="isCollapse"></sidebar>
    </el-aside>
    <el-container>
      <el-header height="50px" style>
        <!-- <div style="height: 100%;float:left;" class="title">
          <img src="../../common/images/logo01.jpg" alt />
          <span>广东外语外贸大学外事综合管理平台</span>
        </div>-->
        <!-- <div
        style="height: 100%;float:left;"
        :class="['tabs_list', {'active': selectIndex === index}]"
        v-for="(item, index) in tabsList"
        :key="index"
        @click="tabAction(item, index)"
      >
        <div class="tabs">{{$t( 'header.' + item.menuName)}}</div>
        </div>-->
        <!-- <div
        class="hideMenu"
        style="float: left;width: 50px;height: 50px;text-align: center;cursor: pointer;"
        @click="changeMune()"
      >
        <i :class="isCollapse?'el-icon-s-grid':'el-icon-menu'"></i>
        </div>-->
        <div class="breadcrumb">
          <breadcrumb></breadcrumb>
        </div>
        <div style="height: 100%; float: right">
          <el-dropdown
            class="avatar-container"
            trigger="click"
            @command="setting"
          >
            <div class="avatar-wrapper">
              <img
                v-if="userList.photo"
                :src="
                  userList.photo ? $api.download + userList.photo : avatarImg
                "
                class="user-avatar"
              />
            </div>
            <el-dropdown-menu slot="dropdown" style="text-align: center">
              <span class="span">{{ userList.accountname }}</span>
              <el-dropdown-item icon="el-icon-user-solid" command="information"
                >个人信息</el-dropdown-item
              >
              <el-dropdown-item icon="el-icon-edit" command="updatePassword">{{
                $t("header.changePassword")
              }}</el-dropdown-item>
              <!-- <el-dropdown-item
                icon="el-icon-edit-outline"
                command="updateNickname"
              >{{$t('header.modifiedData')}}</el-dropdown-item>-->
              <el-dropdown-item icon="el-icon-warning" command="logout">{{
                $t("header.logout")
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dialog
            title="修改密码"
            :visible.sync="dialogVisiblePass"
            width="30%"
          >
            <update-password></update-password>
          </el-dialog>
          <el-dialog
            title="修改资料"
            :visible.sync="dialogVisibleName"
            width="50%"
          >
            <update-nickname></update-nickname>
          </el-dialog>
        </div>
        <div style="height: 100%; float: right; margin: 0">
          <select-lang></select-lang>
        </div>
        <div style="height: 100%; float: right; margin: 0 15px">
          <theme-picker></theme-picker>
        </div>
      </el-header>
      <el-main style="padding: 0">
        <transition :name="transitionName" mode="out-in">
          <div
            class="page_main"
            :style="isCollapse ? 'min-width:1096px' : 'min-width:910px'"
          >
            <router-view></router-view>
          </div>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import avatarImg from "@/common/images/user.png";
import ThemePicker from "./ThemePicker";
import updatePassword from "@/views/article/update/updatePassword";
import updateNickname from "@/views/article/update/updateNickname";
import selectLang from "./selectLang";
import Breadcrumb from "./sidebar/Breadcrumb";
import Sidebar from "./sidebar/SystemSideBar";
export default {
  name: "Layout",
  components: {
    "theme-picker": ThemePicker,
    "update-nickname": updateNickname,
    "update-password": updatePassword,
    "select-lang": selectLang,
    Breadcrumb: Breadcrumb,
    sidebar: Sidebar,
  },
  data() {
    return {
      dialogVisiblePass: false,
      dialogVisibleName: false,
      isCollapse: false,
      avatarImg: avatarImg,
      tabsList: [
        { menuName: "home", menuUrl: "/" },
        { menuName: "dailyOfficeWork", menuUrl: "/server/backlog/list" },
        // { menuName: "flowApplyFor", menuUrl: "/picture/visit1/list" },
        // { menuName: "systemManagement", menuUrl: "/article/background/list" }
      ],
      transitionName: "fade",
      searchData: {
        accountname: "",
      },
      URLparams: {
        pageNumber: 1,
        pageSize: 100,
      },
      userList: {},
    };
  },
  computed: {
    selectIndex() {
      // console.log(this.$store.state.selectIndex);
      return this.$store.state.selectIndex;
    },
  },
  watch: {
    $route(val, oldVal) {
      // if (val && val !== oldVal) {
      //   console.log(val);
      //   // console.log(oldVal);
      //   if (val.path === "/") {
      //     this.$store.commit("GET_SELECTINDEX", 0);
      //     this.$store.commit("GET_COMMONSHOW", true);
      //     // sessionStorage.selectIndex = 0;
      //     // this.selectIndex = 0;
      //   } else if (val.path === "/server/backlog/list") {
      //     this.$store.commit("GET_COMMONSHOW", true);
      //     this.$store.commit("GET_SELECTINDEX", 1);
      //     // sessionStorage.selectIndex = 1;
      //     // this.selectIndex = 1;
      //   } else if (val.path === "/picture/visit1/list") {
      //     this.$store.commit("GET_SELECTINDEX", 2);
      //     // sessionStorage.selectIndex = 2;
      //     // this.selectIndex = 2;
      //   } else if (val.path === "/article/background/list") {
      //     this.$store.commit("GET_COMMONSHOW", true);
      //     this.$store.commit("GET_SELECTINDEX", 3);
      //     // sessionStorage.selectIndex = 3;
      //     // this.selectIndex = 3;
      //   } else if (val.path === "/picture/exchange1/1") {
      //     sessionStorage.num = "1";
      //   } else if (val.path === "/picture/exchange1/2") {
      //     sessionStorage.num = "2";
      //   } else if (val.path === "/picture/exchange1/3") {
      //     sessionStorage.num = "3";
      //   } else if (val.path === "/picture/exchange1/4") {
      //     sessionStorage.num = "4";
      //   } else if (val.path === "/picture/foreign1/1") {
      //     sessionStorage.foreNum = "1";
      //   } else if (val.path === "/picture/foreign1/2") {
      //     sessionStorage.foreNum = "2";
      //   } else if (val.path === "/picture/foreign1/3") {
      //     sessionStorage.foreNum = "3";
      //   } else if (val.path === "/picture/foreign1/4") {
      //     sessionStorage.foreNum = "4";
      //   } else if (val.path === "/picture/foreign1/5") {
      //     sessionStorage.foreNum = "5";
      //   } else if (val.path === "/picture/foreign1/6") {
      //     sessionStorage.foreNum = "6";
      //   }
      // }
    },
  },
  created() {
    // this.selectIndex = parseInt(sessionStorage.selectIndex);
    this.userList = JSON.parse(JSON.parse(localStorage.vuex).loginList);
    console.log(this.userList);
  },
  methods: {
    init() {
      this.$api.menu
        .list(this.URLparams, this.searchData)
        .then((res) => {
          this.tabsList = res.data;
        })
        .catch((err) => {
          this.$message.error("查询失败！");
        });
    },
    setting(event) {
      if (event === "information") {
        this.$router.push("/server/information/list");
        this.$store.commit("GET_TOPATH", "/server/information/list");
      } else if (event === "updateNickname") {
        this.dialogVisibleName = true;
        // this.$router.push("/article/update/updateNickname");
        // sessionStorage.tabPath = "/article/update/updateNickname";
      } else if (event === "logout") {
        this.$confirm("正在执行退出操作, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$api.logout().then((res) => {
              this.$store.commit("SET_LAYOUT", "");
              sessionStorage.clear();
              this.$message({
                type: "success",
                message: "退出成功!",
              });
              this.$router.replace("/login");
            });
          })
          .catch(() => {
            console.log("取消退出登录");
          });
      } else if (event === "updatePassword") {
        this.dialogVisiblePass = true;
        // sessionStorage.tabPath = "/article/update/updatePassword";
        // this.$router.push("/article/update/updatePassword");
      }
    },
    changeMune() {
      this.isCollapse = !this.isCollapse;
    },
    tabAction(item, index) {
      // this.selectIndex = index;
      // this.$store.commit("GET_SELECTINDEX", index);
      // sessionStorage.selectIndex = this.selectIndex;
      this.$store.commit("GET_TOPATH", item.menuUrl);
      // sessionStorage.tabPath = item.menuUrl;
      this.$router.push(item.menuUrl);
    },
  },
};
</script>

<style lang="stylus" scoped>
.span {
  line-height: 40px;
  color: $theme-color;
  pointer-events: none;
}

.el-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.el-aside {
  background: #f1f8fc;
  transition: all 0.3s;

  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}

.company_box {
  width: 100%;
  height: auto;
  padding: 15px 0;
}

.company_box .img_box {
  width: 100%;
  height: auto;
  padding: 15px;
}

.company_box.isCollapse .img_box {
  padding: 2px;
}

.company_box .img_box img {
  width: 100%;
  height: auto;
}

.el-menu {
  border: none;
}

.el-header {
  position: relative;
  // background-color: $theme-color;
  color: #333;
  line-height: 50px;
  padding: 0;
  border-bottom: 2px solid $theme-color;
  display: flex;
}

.el-header .title {
  // width: 219px;
  padding: 0 20px;
  height: 100%;
  background-color: $theme-color;
  display: flex;
  align-items: center;

  img {
    height: 100%;
    width: 50px;
  }

  span {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    color: #fff;
  }
}

.tabs_list {
  width: 82px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;

  &:hover {
    border-bottom: 4px solid #656565;
    // background-color: #656565;
    cursor: pointer;
  }
}

.tabs {
}

.active {
  color: $theme-color;
  // background-color: #333;
  border-bottom: 4px solid #656565;

  &:hover {
    cursor: pointer;
    // color: $theme-color;
    // background-color: $theme-color;
  }
}

.el-header .hideMenu:hover {
  background: #666666;
  color: #ffffff;
}

.el-header .breadcrumb {
  float: left;
  flex: 1;
  height: 100%;
  padding: 5px;
}

.el-header:after {
  // content: '';
  // position: absolute;
  // left: 0;
  // bottom: 0;
  // width: 100%;
  // height: 1px;
  // background: #cccccc;
}

.el-header .avatar-container {
  width: 50px;
  height: 50px;
}

.el-header .avatar-container .avatar-wrapper {
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
  line-height: initial;
  padding: 10px;
  margin: auto;
  text-align: center;
}

.el-header .avatar-container .avatar-wrapper .user-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
  color: #fff;
  background-color: $theme-color;
}

.page_main {
  min-width: 910px;
  width: 100%;
}

.el-main {
  // background: #ffffff;
}

.el-header .el-tabs--border-card {
  background: #383838;
}

.el-header .el-tabs--border-card > .el-tabs__header {
  background: #383838;
}
</style>
