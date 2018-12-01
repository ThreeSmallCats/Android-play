// 圆圈菜单，路由到 主页 项目 体系 导航 公众号
<template>
  <div
    class="p-nav"
    id="p-nav"
  >
    <div
      class="out-nav"
      @click="tocenter"
    >
      <i class="iconfont nav-icon">&nbsp;&#xe606;</i>
    </div>
    <ul
      class="ul-item"
      @click="toOrigin"
    >
      <li
        id="index"
        to="/index"
        tag="li"
        data-link='/index'
      >首页</li>
      <li
        id="navigation"
        to="/navigation"
        tag="li"
        data-link="/navigation"
      >导航</li>
      <li
        id="system"
        to="/system"
        tag="li"
        data-link="/system"
      >体系</li>
      <li
        id="weChat"
        to="/weChat"
        tag="li"
        data-link="/weChat"
      >公众号</li>
      <li
        id="project"
        to="/project"
        tag="li"
        data-link="/project"
      >项目</li>
    </ul>
    <transition name="show">
      <div
        class="mark"
        v-show="show"
        @click="toOrigin"
      ></div>
    </transition>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      outNav: "",
      navIcon: "",
      ulItem: "",
      openOrclose: 1,
      timer: "",
      show: false,
      someData: ""
    };
  },
  mounted() {
    this.outNav = document.querySelector(".out-nav");
    this.navIcon = document.querySelector(".nav-icon");
    this.ulItem = document.querySelector(".ul-item");
    this.liArr = this.ulItem.children;
  },
  methods: {
    ...mapMutations(["setNavClickData"]),
    tocenter() {
      if (this.openOrclose) {
        this.outNav.classList.add("active");
        this.ulItem.classList.add("active");
        this.navIcon.innerHTML = `&#xe62c;`;
        this.openOrclose = 0;
        for (let i = 0; i < this.liArr.length; i++) {
          this.liArr[i].classList.add("active");
        }
        this.show = true;
        return;
      } else {
        for (let i = 0; i < this.liArr.length; i++) {
          this.liArr[i].classList.remove("active");
        }
        this.outNav.classList.remove("active");
        this.ulItem.classList.remove("active");
        this.navIcon.innerHTML = `&nbsp;&#xe606;`;
        this.openOrclose = 1;
        this.show = false;
      }
    },
    toOrigin(e) {
      clearTimeout(this.timer);
      // 不用router-link 而使用这个是因为 router-link会清除class，导致动画会无端发生，这个问题暂时无法解决，所以直接用li代替router-link
      if (e.target.dataset.link) {
        let link = e.target.dataset.link;
        this.$router.replace(`${link}`);

        if (link === "/weChat") {
          this.axios
            .get("/play/wxarticle/chapters/json")
            .then(({ status, data: { data } }) => {
              this.someData = data;
              this.$emit("whatTitle", { link, someData: this.someData });
              this.setNavClickData(this.someData);
            });
        } else if (link === "/system") {
          this.axios
            .get("/play/tree/json")
            .then(({ status, data: { data } }) => {
              this.someData = data;
              this.$emit("whatTitle", { link, someData: this.someData });
              this.setNavClickData(this.someData);
            });
        } else if (link === "/navigation") {
          this.axios
            .get("/play/navi/json")
            .then(({ status, data: { data } }) => {
              this.someData = data;
              this.$emit("whatTitle", { link, someData: this.someData });
              this.setNavClickData(this.someData);
            });
        } else if (link === "/index") {
          this.axios
            .get("/play/article/list/0/json")
            .then(({ status, data: { data } }) => {
              this.someData = data;
              this.$emit("whatTitle", { link, someData: this.someData });
              this.setNavClickData(this.someData);
            });
        } else if (link === "/project") {
          this.axios
            .get("/play/project/tree/json")
            .then(({ status, data: { data } }) => {
              this.someData = data;
              this.$emit("whatTitle", { link, someData: this.someData });
              this.setNavClickData(this.someData);
            });
        }
      }
      this.timer = setTimeout(() => {
        for (let i = 0; i < this.liArr.length; i++) {
          this.liArr[i].classList.remove("active");
        }
        this.outNav.classList.remove("active");
        this.ulItem.classList.remove("active");
        this.navIcon.innerHTML = `&nbsp;&#xe606;`;
        this.openOrclose = 1;
        this.show = false;
      }, 100);
    }
  }
};
</script>

<style scoped lang='less'>
@import "../assets/less/nav/nav.less";
</style>