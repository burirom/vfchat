<template>
  <div class="about">
   
  <timelineitem class="timelineitem"></timelineitem>
   <topBar :title_name="title_name" class="topbar"></topBar>
    <timeline class="timeline"></timeline>
    <bottomBar class="footer-navbar" :active_btn="active_btn"></bottomBar>
  </div>
</template>

<script>
import topBar from "../../components/Bar/topBar";
import bottomBar from "../../components/Bar/bottomBar";
import timeline from "../../components/timeline/timeline";
import timelineitem from "../../components/timeline/timelineitem";

export default {
  components: {
    topBar,
    bottomBar,
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
