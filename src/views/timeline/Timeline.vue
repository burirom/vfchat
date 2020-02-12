<template>
  <div class="about">
   
  <timelineitem class="timelineitem"></timelineitem>
   <top_bar :title_name="title_name" class="topbar"></top_bar>
    <timeline class="timeline"></timeline>
    <bottom_bar class="footer-navbar" :active_btn="active_btn"></bottom_bar>
  </div>
</template>

<script>
import top_bar from "../../components/Bar/top_bar";
import bottom_bar from "../../components/Bar/bottom_bar";
import timeline from "../../components/timeline/timeline";
import timelineitem from "../../components/timeline/timelineitem";

export default {
  components: {
    top_bar,
    bottom_bar,
    timeline,
    timelineitem
    
  },
    data() {
    return {
      title_name:'TimeLine',
      active_btn:1
    };
  },

};
</script>

<style lang="scss" scoped>
.timeline{
  position: fixed;
  bottom: 0;
  right: 0;
  margin-bottom: 70px;
  margin-right: 10px; 
}
.topbar{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}
.timelineitem{
  margin-top: 80px;
  margin-bottom: 80px;
}
</style>
