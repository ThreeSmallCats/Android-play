// 公众号
<template>
  <div
    class="p-weChat"
    id="p-weChat"
  >
    <ul class="weChat-box">
      <li
        v-for="item in this.$store.state.menuClick.datas"
        :key="item.title"
        :data-link="item.link"
        :data-title="item.title"
        @click="toIframe"
      >
        <span
          class="title"
          :data-link="item.link"
          :data-title="item.title"
        >{{ item.title }}</span>
        <span
          class="auth"
          :data-link="item.link"
          :data-title="item.title"
        ><i class="iconfont">&#xe604;</i> {{ item.author }}</span>
        <span
          class="time"
          :data-link="item.link"
          :data-title="item.title"
        ><i class="iconfont">&#xe63d;</i> {{ item.niceDate }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import scrollToBottom from "../api/scrollToBottom.js";
import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  async created() {
    let {
      status,
      data: { data }
    } = await this.axios.get("/play/wxarticle/chapters/json");
    this.setNavClickData(data);
    let cid = this.$store.state.weChatCid;
    let {
      status: status1,
      data: { data: data1 }
    } = await this.axios.get(`/play/wxarticle/list/${cid}/1/json`);
    this.setMenuClick(data1);
  },
  mounted() {
    let ele = document.querySelector(".p-weChat");
    scrollToBottom(ele, this.toBottom);
  },
  methods: {
    ...mapMutations([
      "setNavClickData",
      "setMenuClick",
      "setIframeLink",
      "setTitle",
      "setWeChatNum"
    ]),
    toIframe(e) {
      this.setIframeLink(e.target.dataset.link);
      this.setTitle(e.target.dataset.title);
      this.$router.push({ path: "/iframe" });
    },
    async toBottom() {
      let num = this.$store.state.weChatNum;
      num++;
      this.setWeChatNum(num);
      let cid = this.$store.state.weChatCid;
      let {
        status,
        data: { data }
      } = await this.axios.get(`/play/wxarticle/list/${cid}/${num}/json`);
      let arr = this.$store.state.menuClick.datas.concat(data.datas);
      let newData = this.$store.state.menuClick;
      newData.datas = arr;
      this.setMenuClick(newData);
    }
  }
};
</script>

<style scoped lang='less'>
@import "../assets/less/weChat/weChat.less";
</style>