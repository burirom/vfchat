<template>
  <div>
    <backbar title_name="UserName" class="backbar"></backbar>
      
  </div>
</template>

<script>
import backbar from "../../components/Bar/back_bar"
export default {
  components:{
    backbar
  }

}
</script>

<style lang="scss" scoped>
.backbar{
   position: fixed;
  top: 0;
  right: 0;
  left:0;
 
}
</style>