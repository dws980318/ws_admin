<template>
  <div>
    <el-dropdown trigger="click" @command="handleSetLanguage">
      <i class="iconfont el-icon-setting"></i>
      <el-dropdown-menu slot="dropdown" class="dropMenu">
        <el-dropdown-item :disabled="lang==='zh'" command="zh">中文</el-dropdown-item>
        <el-dropdown-item :disabled="lang==='en'" command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  computed: {
    lang() {
      return this.$store.state.lang;
    }
  },
  methods: {
    handleSetLanguage(command) {
      console.log(command);
      this.$i18n.locale = command;
      this.$store.commit("GET_LANGUAGE", command);
    }
  }
};
</script>
<style lang="stylus" scoped>
.iconfont {
  font-size: 30px;
  padding: 10px;
  cursor: pointer;
}

.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
  color: #fff;
  background-color: $theme-color;
}
</style>

