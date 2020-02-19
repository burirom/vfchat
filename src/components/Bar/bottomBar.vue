<template>
  <v-bottom-navigation :value="activeBtn" grow bottom >
     
    <v-btn  to="/home">
      <v-icon large>home</v-icon>
    </v-btn>
    

    <v-btn  to="/timeline">
      <v-icon large>query_builder</v-icon>
    </v-btn>

    <v-btn to="/configuration">
      <v-icon large>settings_applications</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {

  props:{
    active_btn:{
      type: Number,
    required: true
    }
  },
  data() {
    return {
      activeBtn: this.active_btn
    };
  },
  methods: {
  },
   
};
</script>

<style lang="scss" scoped>
.v-item-group.v-bottom-navigation .v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined){
height: 100%;
}
.v-item-group.v-bottom-navigation .v-btn.v-btn--active {
  color: $sub-color;
  
}
</style>