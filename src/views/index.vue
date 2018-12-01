<template>
  <div
    class="p-index"
    id="p-index"
  >
    <div class="banner">
      <div
        class="img-box"
        @click="toIframe"
      >

        <img
          v-for="item in imgData"
          :key="item.id"
          :src="item.imagePath"
          :alt="item.desc"
          :data-title="item.title"
          :data-link="item.url"
        >
      </div>
    </div>
    <div class="index-list">
      <ul
        class="ul-list"
        @click="toIframe"
      >
        <li
          v-for="item in newData.datas"
          :key="item.link"
          :data-link="item.link"
          :data-title="item.title"
        >
          <span
            class="auth"
            :data-link="item.link"
            :data-title="item.title"
          ><i
              class="iconfont"
              :data-link="item.link"
              :data-title="item.title"
            >&#xe604;</i> {{ item.author }}</span>
          <span
            class="title"
            :data-link="item.link"
            :data-title="item.title"
          >{{ item.title }}</span>
          <span
            class="time"
            :data-link="item.link"
            :data-title="item.title"
          ><i
              class="iconfont"
              :data-link="item.link"
              :data-title="item.title"
            >&#xe63d;</i> {{ item.niceDate }}</span>
          <span
            class="classify"
            :data-link="item.link"
            :data-title="item.title"
          >{{ item.superChapterName }} / {{ item.chapterName }}</span>
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
      imgData: [],
      newData: [],
      num: 0
    };
  },
  async created() {
    let {
      status,
      data: { data }
    } = await this.axios.get("/play/banner/json");
    if (status === 200) {
      this.imgData = data;
    }
    let {
      status: status1,
      data: { data: newData }
    } = await this.axios.get("/play/article/list/0/json");
    if (status1 === 200) {
      this.newData = newData;
    }
  },
  mounted() {
    let ele = document.querySelector(".p-index");

    scrollToBottom(ele, this.toBottom);
  },
  methods: {
    async toBottom() {
      this.num++;
      let {
        status,
        data: { data }
      } = await this.axios.get(`/play/article/list/${this.num}/json`);
      if (status === 200) {
        let ulList = document.querySelector(".ul-list");
        let newData = data.datas;
        this.newData.datas = this.newData.datas.concat(data.datas);
      }
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
@import "../assets/less/index/index.less";
</style>