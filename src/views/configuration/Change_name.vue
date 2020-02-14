<template>
  <div>
   <backbar title_name="ChangeName" class="back_bar"></backbar>
 <changename class="changename"></changename>
   
      
  </div>
</template>

<script>
import backbar from "../../components/Bar/back_bar"
import changename from "../../components/Confg/changename"

export default {
  components:{
    backbar,
    changename,
 
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