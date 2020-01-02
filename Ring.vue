<template>
  <div class="ring" :style="styleObj"></div>
</template>

<script>
// How to use：
// <Ring :percentage="60" color="#67C23A" />
export default {
  name: "ring",
  props: ["percentage", "color"],
  data() {
    return {
      num: 0
    };
  },
  computed: {
    styleObj() {
      return {
        "--v": this.num,
        "--color": this.color || "#409EFF"
      };
    }
  },
  methods: {
    run(target) {
      const timer = setInterval(() => {
        if (this.num < target) this.num++;
        if (this.num > target) this.num--;
        if (this.num === target) clearInterval(timer);
      }, 20);
    }
  },
  watch: {
    percentage: {
      handler: function(newTarget, oldTarget) {
        this.run(newTarget);
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
.ring {
  --percentage: calc(var(--v) / 100 * 100%);
  --size: 160px;
  --innerSize: 135px;
  display: inline-flex;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: conic-gradient(var(--color) var(--percentage), #eee 0);
  counter-reset: value var(--v);
  margin: 20px;
  transition: all 1s;
}
.ring::before {
  color: #333;
  font-size: 18px;
  content: counter(value)'%';
  text-align: center;
  background: #fff;
  width: var(--innerSize);
  height: var(--innerSize);
  line-height: var(--innerSize);
  border-radius: inherit;
  margin: auto;
}
</style>
