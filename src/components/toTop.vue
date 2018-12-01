// 滚动到最上
<template>
  <div
    class="p-to-top"
    id="p-to-top"
    @click="toTop"
  >
    <i class="iconfont">&#xe729;</i>
  </div>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      otherTitle: ""
    };
  },
  watch: {
    $route() {
      this.otherTitle = window.location.pathname.replace(/\//, "");
    }
  },
  methods: {
    toTop() {
      if (this.title === "index" || this.title === "Android play") {
        let indexEle = document.querySelector("#p-index");
        this.toTopAnimation(indexEle);
      } else if (this.title === "project") {
        let projectEle = document.querySelector("#p-project");
        this.toTopAnimation(projectEle);
      } else if (this.title === "weChat") {
        let weChatEle = document.querySelector("#p-weChat");
        this.toTopAnimation(weChatEle);
      } else if (this.title === "system") {
        let systemEle = document.querySelector("#p-system");
        this.toTopAnimation(systemEle);
      } else if (this.otherTitle === "search") {
        let searchEle = document.querySelector("#search-content");
        this.toTopAnimation(searchEle);
      }
    },
    toTopAnimation(ele) {
      let timer = setInterval(() => {
        let speed = ele.scrollTop / 4;
        ele.scrollTop -= speed;
        if (speed < 2) {
          ele.scrollTop = 0;
          clearInterval(timer);
        }
      }, 20);
    }
  }
};
</script>

<style scoped lang='less'>
@import "../assets/less/toTop/toTop.less";
</style>