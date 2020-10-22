<template>
  <div class="breadcrumb_main">
    <div class="scroll_left" @click="scrollLeft()">
      <i class="el-icon-caret-left"></i>
    </div>
    <div class="pathTab">
      <div class="scroll_main" ref="headerScroll">
        <transition name="scroll">
          <div class="path_list">
            <span class="path_item" :class="$route.path === '/'? 'active' : ''">
              <span @click="toPath(form.menuUrl)">首页</span>
            </span>
            <span
              class="path_item"
              v-for="(item, index) in $store.state.history"
              :key="index"
              :class="ifActive(item.menuUrl)"
            >
              <span @click="toPath(item.menuUrl)">{{item.menuName}}</span>
              <i class="el-icon-close" @click="delTab(index)"></i>
            </span>
          </div>
        </transition>
      </div>
    </div>
    <div class="scroll_right" @click="scrollRight()">
      <i class="el-icon-caret-right"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      form: {
        menuUrl: "/",
      },
    };
  },
  watch: {
    $route: "getPath",
  },
  methods: {
    getPath() {},
    ifActive(path) {
      // console.log(path);
      // console.log(this.$route);
      // if (path === "/picture/exchange1/1") {
      //   sessionStorage.num = "1";
      // } else if (path === "/picture/exchange1/2") {
      //   sessionStorage.num = "2";
      // } else if (path === "/picture/exchange1/3") {
      //   sessionStorage.num = "3";
      // } else if (path === "/picture/exchange1/4") {
      //   sessionStorage.num = "4";
      // } else if (path === "/picture/exchange1/5") {
      //   sessionStorage.num = "5";
      // }
      // if (path === "/picture/foreign1/1") {
      //   sessionStorage.foreNum = "1";
      // } else if (path === "/picture/foreign1/2") {
      //   sessionStorage.foreNum = "2";
      // } else if (path === "/picture/foreign1/3") {
      //   sessionStorage.foreNum = "3";
      // } else if (path === "/picture/foreign1/4") {
      //   sessionStorage.foreNum = "4";
      // } else if (path === "/picture/foreign1/5") {
      //   sessionStorage.foreNum = "5";
      // } else if (path === "/picture/foreign1/6") {
      //   sessionStorage.foreNum = "6";
      // }
      if (this.$route.matched[1].path === path) {
        return "active";
      } else if (this.$route && this.$route.path === path) {
        return "active";
      } else if (
        this.$route.matched[2] &&
        this.$route.matched[2].path === path
      ) {
        return "active";
      } else {
        return "";
      }
    },
    scrollLeft() {
      let left = this.$refs.headerScroll.scrollLeft;
      this.$refs.headerScroll.scrollLeft = left - 200;
    },
    scrollRight() {
      let left = this.$refs.headerScroll.scrollLeft;
      this.$refs.headerScroll.scrollLeft = left + 200;
    },
    toPath(path) {
      console.log(path);
      this.$store.commit("GET_TOPATH", path);
      let history = this.$store.state.history;
      for (let i in history) {
        if (history[i].menuUrl === path) {
          console.log(i);
          this.$router.replace(history[i].menuUrl);
          return false;
        }
      }
      if (path === "/") {
        console.log(path);
        this.$router.replace(path);
        this.$store.commit("GET_TOPATH", path);
        return false;
      }
      // this.$router.replace(path);
      // sessionStorage.setItem("path", path);
    },
    delTab(index) {
      console.log(this.$route);
      console.log(this.$route.matched[2].path);
      console.log(this.$store.state.history[index].menuUrl);
      if (this.$route.path !== "/") {
        if (
          this.$route.matched[2].path !==
          this.$store.state.history[index].menuUrl
        ) {
          if (
            this.$route.matched[2].path !== this.$store.state.history[index].menuUrl
          ) {
            let back = this.$route.matched[2].path;
            this.$store.commit("GET_TOPATH", back);
            this.$router.replace(back);
          } else {
            this.$router.replace("/");
            this.$store.commit("GET_TOPATH", "/");
          }
        } else {
          if (
            this.$route.matched[2].path ===
              this.$store.state.history[index].menuUrl &&
            index > 0
          ) {
            let back = this.$store.state.history[index - 1].menuUrl;
            this.$store.commit("GET_TOPATH", back);
            this.$router.replace(back);
          } else {
            this.$router.replace("/");
            this.$store.commit("GET_TOPATH", "/");
          }
        }
      }
      this.$store.commit("delHistory", index);
    },
  },
};
</script>
<style scoped lang="stylus">
.scroll-enter-active, .scroll-leave-active {
  transition: all 5s;
}

.scroll-enter, .fade-leave-to { /* .scroll-leave-active below version 2.1.8 */
  opacity: 1;
}

.breadcrumb_main {
  display: flex;
  width: 100%;
  height: 100%;
}

.breadcrumb_main .pathTab {
  flex: 1;
  width: 0;
  height: 100%;
  overflow: hidden;
  border-left: 1px solid #cccccc;
  border-right: 1px solid #cccccc;
}

.pathTab .scroll_main {
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  transition: all 5s;
}

.pathTab .scroll_main::-webkit-scrollbar {
  display: none;
}

.pathTab .scroll_main .path_list {
  white-space: nowrap;
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  /* justify-content: center; */
}

.path_item {
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  border: 1px solid $theme-color;
  background: #ffffff;
  margin: 0 5px;
  border-radius: 4px;
  color: $theme-color;
}

.path_item.active {
  background: $theme-color;
  color: #ffffff;
}

.path_item span {
  cursor: pointer;
  font-size: 12px;
}

.path_item i {
  cursor: pointer;
  color: $theme-color;
  padding: 2px;
  border-radius: 50%;
}

.path_item i:hover {
  background: $theme-color;
  color: #ffffff;
}

.path_item.active i {
  color: #ffffff;
}

.path_item.active i:hover {
  background: #ffffff;
  color: $theme-color;
}

.breadcrumb_main .scroll_left, .breadcrumb_main .scroll_right {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 100%;
}
</style>
