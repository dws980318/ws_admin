<template>
  <div class="error">
    <p class="remind">您访问的页面不存在，请返回主页！</p>
    <p class="button" @click="backAction">返回主页</p>
  </div>
</template>

<script>
export default {
  name: "Undefine",
  methods: {
    backAction() {
      sessionStorage.selectIndex = 0
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.error {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 483px;
  margin: -300px 0 0 -242px;
  padding-top: 199px;
  font-size: 18px;
  color: #666;
  text-align: center;
  background: #f8f8f8 url(../common/images/404.jpg) 0 0 no-repeat;
}
.error .remind {
  margin: 30px 0;
}
.error .button {
  display: inline-block;
  padding: 0 20px;
  line-height: 40px;
  font-size: 14px;
  color: #fff;
  background-color: #f8912d;
  text-decoration: none;
  cursor: pointer;
}
</style>
