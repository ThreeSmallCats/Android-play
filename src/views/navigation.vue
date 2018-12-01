// 导航
<template>
  <div class="p-navigation">
    <div class="title">{{ this.$store.state.menuClick.articles[0].chapterName }}</div>
    <ul
      class="item"
      @click="toIframe"
    >
      <li
        v-for="item in this.$store.state.menuClick.articles"
        :key="item.title"
        :data-link="item.link"
        :data-title="item.title"
      >{{ item.title }}</li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  async created() {
    let {
      status,
      data: { data }
    } = await this.axios.get("/play/navi/json");
    this.setNavClickData(data);
    this.setMenuClick(data[0]);
  },
  methods: {
    ...mapMutations([
      "setMenuClick",
      "setNavClickData",
      "setIframeLink",
      "setTitle"
    ]),
    toIframe(e) {
      this.setIframeLink(e.target.dataset.link);
      this.setTitle(e.target.dataset.title);
      this.$router.push({ path: "/iframe" });
    }
  }
};
</script>

<style scoped lang='less'>
@import "../assets/less/navigation/navigation.less";
</style>