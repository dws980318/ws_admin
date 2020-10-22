<template>
  <!-- <el-container>
    <el-aside :width="isCollapse?'64px':'250px'" style="height: 100%">
      <sidebar :isCollapse="isCollapse"></sidebar>
    </el-aside>
    <el-main style="padding: 0;">
      <transition :name="transitionName" mode="out-in"> -->
        <div class="page_main" :style="isCollapse?'min-width:1096px':'min-width:910px'">
          <router-view></router-view>
        </div>
      <!-- </transition>
    </el-main>
  </el-container> -->
</template>

<script>
import Sidebar from "./sidebar/SystemSideBar";

export default {
  name: "Layout",
  components: {
    sidebar: Sidebar
  },
  data() {
    return {
      isCollapse: false,
      transitionName: "fade"
    };
  },
  computed: {},
  watch: {},
  methods: {
    changeMune() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.el-aside {
  background: #f1f8fc;
  transition: all 0.3s;

  &::-webkit-scrollbar {
    display: none;
  }
}

.company_box {
  width: 100%;
  height: auto;
  padding: 10px 0;
}

.company_box.isCollapse {
  padding: 0px;
}

.company_box .img_box {
  width: 100%;
  height: auto;
  padding: 15px 15px;
  text-align: center;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: auto;
  }

  p {
    text-align: center;
    font-size: 16px;
    margin-top: 10px;
    color: #fff;
  }
}

.company_box.isCollapse .img_box {
  padding: 2px;
}

.company_box.isCollapse .img_box img {
  width: 64px;
  height: 64px;
  padding: 10px;
}

.el-header {
  position: relative;
  background-color: #f8f8f8;
  color: #333;
  line-height: 50px;
  padding: 0;
}

.el-header:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: #cccccc;
}

.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
  color: $theme-color;
}

.header {
  display: flex;
  width: 100%;
  height: 50px;
}

.router_tabs {
  flex: 1;
  margin-left: 20px;
  font-size: 14px;
  color: $theme-color;
}

.page_main {
  min-width: 910px;
  width: 100%;
  padding 0 20px;
}

.menu_col {
  float: left;
  width: 50px;
  height: 50px;
  text-align: center;
  cursor: pointer;
  color: $theme-color;
}

.menu_col:hover {
  background: $theme-color;
  color: #ffffff;
}

.drop_title {
  color: $theme-color;
}

.el-dropdown-selfdefine {
  display: flex;
}
</style>
