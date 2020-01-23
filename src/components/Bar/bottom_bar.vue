<template>
  <v-bottom-navigation :value="activeBtn" grow bottom >
     
    <v-btn @click="home">
      <v-icon large>home</v-icon>
    </v-btn>
    

    <v-btn  @click="timeline">
      <v-icon large>query_builder</v-icon>
    </v-btn>

    <v-btn @click="configuration">
      <v-icon large>settings_applications</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data() {
    return {
      activeBtn: 0
    };
  },
  methods: {
    home: function() {
        // this.activeBtn = 0;
       this.$emit('headertitle','Home');
       
    },
    timeline: function() {
        // this.activeBtn = 1;
        this.$emit('headertitle','TimeLine');
        
    },
    configuration: function() {
        // this.activeBtn = 2;
        this.$emit('headertitle','Configuration');
       
    }
  }
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