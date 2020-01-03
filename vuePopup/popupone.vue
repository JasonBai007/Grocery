<template>
  <div class="bg" v-if="isShow">
    <div class="wrap">
      <p>欢迎关注“小白前端杂货铺”</p>
      <button @click="closeMe">关闭</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "popup",
  data() {
    return {
      isShow: true
    };
  },
  methods: {
    closeMe() {
      this.isShow = false;
    }
  }
};
</script>

<style scoped>
.bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
}
.wrap {
  margin: auto;
  padding: 20px 30px;
  text-align: center;
  background: #fff;
  box-shadow: 3px 3px 10px #999;
}
</style>