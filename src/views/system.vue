// 体系
<template>
  <div
    class="p-system"
    id="p-system"
  >
    <ul class="system-box">
      <li
        v-for="item in this.$store.state.twoMenuClick.datas"
        :key="item.title"
        :data-link='item.link'
        :data-title="item.title"
        @click="toIframe"
      >
        <span
          class="title"
          :data-link='item.link'
          :data-title="item.title"
        >{{ item.title }}</span>
        <span
          class="auto"
          :data-link='item.link'
          :data-title="item.title"
        ><i class="iconfont">&#xe604;</i> {{ item.author }}</span>
        <span
          class="time"
          :data-link='item.link'
          :data-title="item.title"
        ><i class="iconfont">&#xe63d;</i> {{ item.niceDate }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import scrollToBottom from "../api/scrollToBottom.js";
export default {
  data() {
    return {};
  },
  async created() {
    let {
      status,
      data: { data }
    } = await this.axios.get("/play/tree/json");

    this.setNavClickData(data);
    let cid = this.$store.state.systemCid;
    let {
      status: status1,
      data: { data: data1 }
    } = await this.axios.get(`/play/article/list/0/json?cid=${cid}`);

    this.setTwoMenuClick(data1);
  },
  mounted() {
    let ele = document.querySelector(".p-system");
    scrollToBottom(ele, this.toBottom);
  },
  methods: {
    ...mapMutations([
      "setNavClickData",
      "setTwoMenuClick",
      "setSystemNum",
      "setIframeLink",
      "setTitle"
    ]),
    async toBottom() {
      let num = this.$store.state.systemNum;
      num++;
      this.setSystemNum(num);
      let cid = this.$store.state.systemCid;
      let {
        status,
        data: { data }
      } = await this.axios.get(`/play/article/list/${num}/json?cid=${cid}`);

      let arr = this.$store.state.twoMenuClick.datas.concat(data.datas);
      let newData = this.$store.state.twoMenuClick;
      newData.datas = arr;
      this.setTwoMenuClick(newData);
    },
    toIframe(e) {
      this.setIframeLink(e.target.dataset.link);
      this.setTitle(e.target.dataset.title);
      this.$router.push({ path: "/iframe" });
    }
  }
};
</script>

<style scoped lang='less'>
@import "../assets/less/system/system.less";
</style>