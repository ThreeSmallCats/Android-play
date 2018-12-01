// 项目
<template>
  <div
    class="p-project"
    id="p-project"
  >
    <ul class="project-ul">
      <li
        v-for="item in this.$store.state.menuClick.datas"
        :key="item.title"
        :data-link='item.link'
        :data-title="item.title"
        @click="toIframe"
      >
        <img
          :src="item.envelopePic"
          alt=""
          :data-link='item.link'
          :data-title="item.title"
        >
        <div
          class="project-desc"
          :data-link='item.link'
          :data-title="item.title"
        >
          <span
            class="title"
            :data-link='item.link'
            :data-title="item.title"
          >{{ toBest(item.title,42) }}</span>
          <span
            class="desc"
            :data-link='item.link'
            :data-title="item.title"
          >{{ toBest(item.desc,60) }}</span>
          <span
            class="auth"
            :data-link='item.link'
            :data-title="item.title"
          ><i class="iconfont">&#xe604;</i> {{ item.author }}</span>
          <span
            class="time"
            :data-link='item.link'
            :data-title="item.title"
          ><i class="iconfont">&#xe63d;</i> {{ item.niceDate }}</span>
        </div>
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
    } = await this.axios.get("/play/project/tree/json");
    this.setNavClickData(data);
    let cid = data[0].id;
    let {
      status: status1,
      data: { data: data1 }
    } = await this.axios.get(`/play/project/list/0/json?cid=${cid}`);
    this.setMenuClick(data1);
  },
  mounted() {
    let ele = document.querySelector(".p-project");
    scrollToBottom(ele, this.toBottom);
  },
  methods: {
    ...mapMutations([
      "setNavClickData",
      "setMenuClick",
      "setProjectNum",
      "setIframeLink",
      "setTitle"
    ]),
    async toBottom() {
      let num = this.$store.state.projectNum;

      num++;
      this.setProjectNum(num);

      let {
        status,
        data: { data }
      } = await this.axios.get(
        `/play/project/list/${this.$store.state.projectNum}/json?cid=${
          this.$store.state.projectCid
        }`
      );

      let newDataArr = this.$store.state.menuClick.datas.concat(data.datas);

      let newData = this.$store.state.menuClick;
      newData.datas = newDataArr;

      this.setMenuClick(newData);
    },
    toIframe(e) {
      this.setIframeLink(e.target.dataset.link);
      this.setTitle(e.target.dataset.title);
      this.$router.push({ path: "/iframe" });
    },
    toBest(title, n) {
      let src = title.replace(/<\/?.+?\/?>/g, "");
      return src.length > n ? src.slice(0, n) + "..." : src;
    }
  }
};
</script>

<style scoped lang='less'>
@import "../assets/less/project/project.less";
</style>