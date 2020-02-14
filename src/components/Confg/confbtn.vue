<template>
  <div>  
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs10
            sm8
            md4
          >
        <div class="my-5">
        <v-btn x-large color="subcolor" dark block >{{this.confname}}</v-btn>
      </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    
  </div>
</template>

<script>
export default {
  props:{
    confname: {
    type: String,
    required: true
    }
  }


}
</script>

<style>

</style>