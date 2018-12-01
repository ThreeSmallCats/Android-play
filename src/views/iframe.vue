// 详情页
<template>
  <div class="p-iframe">
    <div class="iframe-top">
      <i
        class="iconfont"
        @click="back"
      >&#xe72e;</i>
      <span class="title">{{ toBest(this.$store.state.title) }}</span>
    </div>
    <div class="iframe-box">

      <iframe
        id="iframe"
        :src="this.$store.state.iframeLink"
        frameborder="0"
        sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    toBest(title) {
      let src = title.replace(/<\/?.+?\/?>/g, "");
      return src.length > 16 ? src.slice(0, 16) + "..." : src;
    }
  }
};
</script>

<style scoped lang='less'>
@import "../assets/less/iframe/iframe.less";
</style>