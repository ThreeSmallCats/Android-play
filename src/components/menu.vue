// 左滑菜单
<template>
  <div
    class="p-menu"
    v-show="showall"
  >
    <transition name='oneBox'>
      <div
        class="one"
        v-show="oneshow"
      >
        <ul
          id="oneChildren"
          @click="toActive"
        >
          <li
            v-for="( item, index ) in list"
            :key="item.name"
            :data-index="index"
          >{{ item.name }}</li>
        </ul>
      </div>
    </transition>
    <transition name="show">
      <div
        v-show="show"
        class="two"
      >
        <ul
          id="twoChildren"
          @click="toTwoActive"
        >
          <li
            v-for="(item,index) in twoList"
            :key="item.name"
            :data-index="index"
          >{{ item.name }}</li>
        </ul>
      </div>
    </transition>
    <transition name="marks">
      <div
        class="mark"
        v-show="markshow"
        @click.self="markback"
      ></div>
    </transition>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import touch from "../api/touch.js";
export default {
  props: ["Mtitle", "someData"],
  data() {
    return {
      oneChildren: [],
      twoChildren: [],
      list: [],
      twoList: [],
      show: false,
      one: "",
      oneshow: false,
      showall: false,
      markshow: false,
      newData: "",
      twoshow: false,
      actshow: false,
      iframesrc: "",
      toClickIdx: "",
      navEle: "",
      toTop: ""
    };
  },
  mounted() {
    touch(this.left, this.right, this.up, this.down);
    this.oneBox = document.querySelector(".one");
    this.oneChildren = document.querySelector("#oneChildren").children;
    this.navEle = document.querySelector("#p-nav");
    this.toTop = document.querySelector("#p-to-top");
  },
  watch: {
    // 监听路由变化控制 /iframe 下的 onebox显示隐藏
    $route() {
      this.iframesrc = window.location.pathname.replace(/\//, "");
      if (this.iframesrc === "iframe") {
        this.oneshow = false;
        this.navEle.classList.add("active");
        this.toTop.classList.add("active");
      } else {
        this.oneshow = true;
        this.navEle.classList.remove("active");
        this.toTop.classList.remove("active");
      }
    },
    Mtitle(val, oldval) {
      if (this.show) {
        this.show = false;
      }
      this.markshow = false;
      if (val === "index" || val === "search") {
        this.oneshow = false;
        this.oneBox.classList.remove("active");
      } else if (
        val === "system" ||
        val === "navigation" ||
        val === "project" ||
        val === "weChat"
      ) {
        this.oneshow = true;
        this.oneBox.classList.remove("active");
      }
    },
    someData(val, oldval) {
      if (
        this.Mtitle === "index" ||
        this.Mtitle === "Android play" ||
        this.Mtitle === "search"
      ) {
        this.oneshow = false;
      } else {
        this.oneshow = true;
      }
      this.newData = val;
      if (
        this.newData instanceof Array &&
        this.newData[0].children &&
        this.newData[0].children.length
      ) {
        this.twoshow = true;
        this.list = val;
      } else {
        this.twoshow = false;
        this.list = val;
      }
      if (val) {
        this.showall = true;
      }
    }
  },
  methods: {
    ...mapMutations([
      "setMenuClick",
      "setTwoMenuClick",
      "setProjectCid",
      "setProjectNum",
      "setWeChatCid",
      "setWeChatNum",
      "setSystemCid",
      "setSystemNum"
    ]),
    async toActive(e) {
      for (let i = 0; i < this.oneChildren.length; i++) {
        this.oneChildren[i].classList.remove("active");
      }
      e.target.classList.add("active");
      // 为了防止onebox 无故返回
      setTimeout(() => {
        this.oneBox.classList.add("active");
      }, 4);
      let idx = e.target.dataset.index;
      this.toClickIdx = idx;
      this.twoList = this.list[idx].children;
      this.actshow = true;
      if (this.actshow && this.twoshow) {
        this.show = true;
      }
      if (this.Mtitle === "navigation") {
        let arr = this.$store.state.navClickData;
        this.setMenuClick(arr[idx]);
      } else if (this.Mtitle === "project") {
        let arr = this.$store.state.navClickData;
        let cid = arr[idx].id;
        this.setProjectCid(cid);
        // 用于切换cid后重置页数
        this.setProjectNum(1);
        let {
          status,
          data: { data }
        } = await this.axios.get(`/play/project/list/1/json?cid=${cid}`);
        this.setMenuClick(data);
      } else if (this.Mtitle === "weChat") {
        let arr = this.$store.state.navClickData;
        let cid = arr[idx].id;
        this.setWeChatCid(cid);
        this.setWeChatNum(1);
        let {
          status,
          data: { data }
        } = await this.axios.get(`/play/wxarticle/list/${cid}/1/json`);
        this.setMenuClick(data);
      } else if (this.Mtitle === "system") {
        let arr = this.$store.state.navClickData;
        this.setMenuClick(arr[idx]);
      }
      this.twoChildren = document.querySelector("#twoChildren").children;
    },
    async toTwoActive(e) {
      for (let i = 0; i < this.twoChildren.length; i++) {
        this.twoChildren[i].classList.remove("active");
      }
      e.target.classList.add("active");
      let idx = e.target.dataset.index;
      let arr = this.$store.state.menuClick;
      let cid = arr.children[idx].id;
      let {
        status,
        data: { data }
      } = await this.axios.get(`/play/article/list/0/json?cid=${cid}`);
      this.setSystemCid(cid);
      this.setSystemNum(0);
      this.setTwoMenuClick(data);
    },
    left() {
      let nowTitle = this.Mtitle;
      if (
        nowTitle === "index" ||
        nowTitle === "Android play" ||
        nowTitle === "search"
      ) {
        this.markshow = false;
        this.oneshow = false;
        return;
      } else if (
        nowTitle === "navigation" ||
        nowTitle === "project" ||
        nowTitle === "weChat"
      ) {
        this.markshow = true;
        this.oneshow = true;
        // 延时的目的是为了防止动画class的active被vue的过度动画class覆盖
        setTimeout(() => {
          this.oneBox.classList.add("active");
        }, 4);
      } else if (nowTitle === "system") {
        this.markshow = true;
        this.oneshow = true;
        setTimeout(() => {
          this.oneBox.classList.add("active");
        }, 4);
      }
    },
    right() {
      this.oneBox.classList.remove("active");
      this.markshow = false;
      if (this.show) {
        this.show = false;
      }
    },
    up() {
      this.navEle.classList.add("active");
      this.toTop.classList.add("active");
    },
    down() {
      this.navEle.classList.remove("active");
      this.toTop.classList.remove("active");
    },
    markback() {
      this.markshow = false;
      this.oneBox.classList.remove("active");
      if (this.show) {
        this.show = false;
      }
    }
  }
};
</script>

<style scoped lang='less'>
@import "../assets/less/menu/menu.less";
</style>