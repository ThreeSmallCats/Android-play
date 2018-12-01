<template>
  <div class="p-search">
    <div class="search-top">
      <i
        class="iconfont back"
        @click="back"
      >&#xe72e;</i>
      <input
        class="inp"
        type="text"
        placeholder="请输入关键词"
        @input="hotHide"
        v-model="val"
      >
      <i
        class="iconfont search"
        @click="search"
      >&#xe61c;</i>
    </div>
    <div
      class="search-content"
      id="search-content"
    >
      <ul
        class="hot-key"
        v-show="hotShow"
        @click="hotToSearch"
      >
        <li
          v-for="item in hotData"
          :key="item.id"
          :data-name="item.name"
        >{{ item.name }}</li>
      </ul>
      <ul
        class="search-ul"
        v-show="show"
      >
        <li
          v-for="item in searchData"
          :key="item.id"
          :data-link="item.link"
          :data-title="item.title"
          @click="toIframe"
        >
          <span
            class="title"
            :data-link="item.link"
            :data-title="item.title"
          >{{ toBest(item.title) }}</span>
          <span
            class="auth"
            :data-link="item.link"
            :data-title="item.title"
          ><i class="iconfont">&#xe604;</i>{{ item.author }}</span>
          <span
            class="time"
            :data-link="item.link"
            :data-title="item.title"
          ><i class="iconfont">&#xe63d;</i>{{ item.niceDate }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import scrollToBottom from "../api/scrollToBottom.js";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      show: false,
      hotShow: true,
      val: "",
      hotData: [],
      searchData: [],
      num: 0
    };
  },
  async created() {
    let {
      status,
      data: { data }
    } = await this.axios.get("/play/hotkey/json");
    this.hotData = data;
  },
  mounted() {
    let ele = document.querySelector(".search-content");
    scrollToBottom(ele, this.toBottom);
  },
  methods: {
    toBest(title) {
      let src = title.replace(/<\/?.+?\/?>/g, "");
      return src.length > 70 ? src.slice(0, 70) + "..." : src;
    },
    back() {
      this.$router.go(-1);
    },
    hotHide() {
      if (this.val === "") {
        this.show = false;
        this.hotShow = true;
      }
    },
    async hotToSearch(e) {
      this.num = 0;
      this.hotShow = false;
      this.show = true;
      this.val = e.target.dataset.name;
      let keyword = {
        k: e.target.dataset.name
      };
      // 一定要用qs序列化post参数，不然请求错误
      keyword = this.qs.stringify(keyword);
      let {
        status,
        data: { data }
      } = await this.axios.post("/play/article/query/0/json", keyword);
      this.searchData = data.datas;
    },
    async search() {
      // 重置页数
      this.num = 0;
      this.show = true;
      this.hotShow = false;
      let keyword = {
        k: this.val
      };
      // 一定要用qs序列化post参数，不然请求错误
      keyword = this.qs.stringify(keyword);
      let {
        status,
        data: { data }
      } = await this.axios.post("/play/article/query/0/json", keyword);

      this.searchData = data.datas;
    },
    async toBottom() {
      this.num++;

      let keyword = {
        k: this.val
      };
      keyword = this.qs.stringify(keyword);
      let {
        status,
        data: { data }
      } = await this.axios.post(
        `/play/article/query/${this.num}/json`,
        keyword
      );
      this.searchData = this.searchData.concat(data.datas);
    },
    toIframe(e) {
      this.setIframeLink(e.target.dataset.link);
      this.setTitle(e.target.dataset.title);
      this.$router.push({ path: "/iframe" });
    },
    ...mapMutations(["setIframeLink", "setTitle"])
  }
};
</script>

<style scoped lang='less'>
@import "../assets/less/search/search.less";
</style>