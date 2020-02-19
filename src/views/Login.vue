<template>
  <v-row align-content="center" justify="center" id="login">
    <v-col cols="11" class="text-center">
      <loginitem class="loginitem"/>
    </v-col>
  </v-row>
</template>

<script>
import loginitem from "../components/Login/loginitem"
export default {
  components:{
    loginitem 
  }
};
</script>

<style lang="scss" scoped>
#login{
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
}

</style>