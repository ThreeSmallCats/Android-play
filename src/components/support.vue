// 主框架
<template>
  <div class="p-support">
    <div class="top-bar">
      <i
        class="to-index iconfont"
        @click="toIndex"
      >&#xe616;</i>
      <span class="title">{{ chineseT }}</span>
      <i
        class="search iconfont"
        @click="toSearch"
      >&#xe61c;</i>
    </div>
    <div class="content">
      <p-menu
        :Mtitle="title"
        :someData="someData"
      />
      <p-nav @whatTitle="thisTitle" />
      <to-top :title="title" />
      <keep-alive>

        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import pNav from "./nav";
import pMenu from "./menu";
import toTop from "./toTop";
export default {
  data() {
    return {
      title: "Android play",
      chineseT: "Android play",
      someData: ""
    };
  },
  created() {
    // 刷新页面时保持title不变 切重新请求数据
    this.title = window.location.pathname.replace(/\//, "");
    if (this.title === "weChat") {
      this.axios
        .get("/play/wxarticle/chapters/json")
        .then(({ status, data: { data } }) => {
          this.someData = data;
        });
    } else if (this.title === "system") {
      this.axios.get("/play/tree/json").then(({ status, data: { data } }) => {
        this.someData = data;
      });
    } else if (this.title === "navigation") {
      this.axios.get("/play/navi/json").then(({ status, data: { data } }) => {
        this.someData = data;
      });
    } else if (this.title === "index") {
      this.axios
        .get("/play/article/list/0/json")
        .then(({ status, data: { data } }) => {
          this.someData = data;
        });
    } else if (this.title === "project") {
      this.axios
        .get("/play/project/tree/json")
        .then(({ status, data: { data } }) => {
          this.someData = data;
        });
    }
  },
  components: {
    pMenu,
    pNav,
    toTop
  },
  watch: {
    $route() {
      this.title = window.location.pathname.replace(/\//, "");
    },
    title(val, oldval) {
      if (this.title === "project") {
        this.chineseT = "项目";
      } else if (this.title === "system") {
        this.chineseT = "体系";
      } else if (this.title === "navigation") {
        this.chineseT = "导航";
      } else if (this.title === "index") {
        this.chineseT = "Android play";
      } else if (this.title === "weChat") {
        this.chineseT = "公众号";
      }
    }
  },
  methods: {
    // 到主页 无history
    toIndex() {
      this.$router.replace("/index");
      this.title = "index";
    },
    // 到搜索 有history
    toSearch() {
      this.$router.push({ path: "/search" });
      this.title = "search";
    },
    thisTitle(data) {
      this.title = data.link.replace(/\//, "");
      this.someData = data.someData;
    }
  }
};
</script>

<style scoped lang='less'>
@import "../assets/less/support/index.less";
</style>