<template>
  <div class="bg" v-if="status" @click="close($event)">
    <div class="wrap">
      <p>欢迎关注“小白前端杂货铺”</p>
      <button @click="closeMe">关闭</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "popup",
  props: {
    status: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    closeMe() {
      this.$emit("changeStatus", false);
    },
    close(e) {
      if (e.target.className === "bg") {
        this.closeMe();
      }
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