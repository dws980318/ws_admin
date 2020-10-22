<template>
  <div id="app">
    <!--    <div>-->
    <!--      <keep-alive>-->
    <!--        <router-view v-if="$route.meta.keepAlive">-->
    <!--          &lt;!&ndash; 这里是会被缓存的视图组件！ &ndash;&gt;-->
    <!--        </router-view>-->
    <!--      </keep-alive>-->
    <!--      <router-view v-if="!$route.meta.keepAlive">-->
    <!--        &lt;!&ndash; 这里是不被缓存的视图组件！ &ndash;&gt;-->
    <!--      </router-view>-->
    <!--    </div>-->
    <transition name="rotate-fall">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import "vue-transition.css";
// import Layout from "./components/layout/Layout";
export default {
  name: "App",
  components: {
    // layout: Layout
  },
  methods: {
    open2() {
      this.$notify({
        title: "消息",
        message: "这是一条消息",
        position: "bottom-right",
      });
    },
  },
  mounted() {
    var i = 1500;
    const updateTime = () => {
      if (i > 0) {
        // console.log(i);
      }
      if (i == 0) {
        this.open2();
        console.log("25分钟时间到了，但是我还可以继续循环哦");
        i = 1500;
      }
      i--;
    };
    setInterval(updateTime, 1000);
    // this.timer = setTimeout(this.open2(), 1000);
  },
  beforeDestroy() {
    // clearTimeout(this.timer);
  },
};
</script>

<style lang="stylus">
/* 样式改变代码----------------------------------------------------- */
/* 滚动条整体部分 */
::-webkit-scrollbar {
  width: 6px;
  height: 8px;
  background-color: #d0cdc7;
}

/* scroll轨道背景 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #d0cdc7;
}

/* 滚动条中能上下移动的小块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #a09d9d;
}
::-webkit-scrollbar-thumb:hover{
  background: $theme-color;
}

/* 样式改变代码----------------------------------------------------- */
#app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0 auto;

  .center {
    background-color: #dce9f5;
  }

  .center2 {
    background-color: #dce9f5;
  }

  /* background: #ffffff; */
  /deep/ .el-dialog {
    .el-dialog__body {
      p {
        img {
          height: 100% !important;
          width: 100% !important;
        }
      }
    }
  }
}
</style>
<style lang="stylus">
.header_box {
  display: flex;
  align-items: center;

  .btn_red {
    width: 86px;
    // padding 0 20px;
    height: 42px;
    border-radius: 5px;
    background-color: $theme-color;
    // border: 1px solid #c36626;
    color: #fff;
    text-align: center;
    line-height: 42px;
    font-size: 16px;
    margin-right: 30px;
    cursor: pointer;
  }
  

  .btn_red:focus, .btn_red:hover {
    background: #ccc;
    border-color: #333;
    color: #FFF;
  }

  .btn_right {
    display: flex;
    align-items: center;
  }
}

.header_btn {
  display: flex;
  align-items: center;
  margin-top: 10px;

  .list {
    background-color: #cccccc;
    height: 56px;
    text-align: center;
    line-height: 56px;
    font-size: 14px;
    color: #FFF;
    cursor: pointer;

    &:hover {
      background-color: $theme-color;
    }
  }

  p {
    padding: 0 20px;
    border: 1px solid #fff;
  }

  .active {
    background-color: $theme-color;
  }
}

.primary-state {
  cursor: pointer;
  color: $theme-color;
  padding: 0 5px;
}

.el-menu {
  background: $theme-color !important;
}

.el-aside {
  background: $theme-color !important;
}

.el-submenu__title:hover {
  color: #cc0000 !important;
}

.el-menu-item.is-active {
  // color: #cc0000 !important;
  // background: #cc0000 !important;
  // color: #fff !important;

  &:hover {
    // color: #fff !important;
    // background: rgb(193,198,202) !important;
  }
}

.el-menu-item:hover {
  color: #cc0000 !important;
}

.el-menu-item-group__title {
  color: #cccccc !important;
}

.el-menu--popup {
  // background: $theme-color !important;
}

.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: $theme-color;
  border-color: $theme-color;
}

// .el-checkbox__input.is-checked .el-checkbox__inner {
// background-color: $theme-color;
// border-color: $theme-color;
// }
.el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: $theme-color;
}

.el-checkbox__inner:hover {
  border-color: $theme-color;
}

.el-table th {
  color: $theme-color !important;
}

.el-button--primary {
  opacity: 1;
  background-color: $theme-color !important;
  border-color: $theme-color !important;
}

.el-button--primary:hover {
  opacity: 0.8;
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background: $theme-color !important;
}

.header_title {
  font-size: 20px;
  line-height: 40px;
  color: $theme-color;
}
</style>
