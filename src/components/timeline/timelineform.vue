<template>
  <div>
     
        <v-textarea
          solo
          label="今何してる？"
          class="inputarea"
          v-model="posttext"
        ></v-textarea>
       
     
  </div>
</template>

<script>
export default {
  data(){
    return{
      posttext: "",

    }
  },
   watch: {
     posttext:function(){
       this.$emit('postmessage', this.posttext);
     }
   }


}
</script>

<style lang="scss" scoped>
.inputarea{
  width: 100%;
  margin-top: 70px;
}
</style>