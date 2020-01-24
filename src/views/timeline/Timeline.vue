<template>
  <div class="about">
    <top_bar :title_name="title_name"></top_bar>
    <h1>タイムライン</h1>
    <timeline></timeline>
    <bottom_bar class="footer-navbar" :active_btn="active_btn"></bottom_bar>
  </div>
</template>

<script>
import top_bar from "../../components/Bar/top_bar";
import bottom_bar from "../../components/Bar/bottom_bar";
import timeline from "../../components/timeline"
export default {
  components: {
    top_bar,
    bottom_bar,
    timeline
  },
    data() {
    return {
      title_name:'TimeLine',
      active_btn:1
    };
  },

};
</script>

<style lang="scss">
</style>
