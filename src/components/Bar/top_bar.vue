<template>
  <v-app-bar>
     <v-spacer></v-spacer>
    <v-toolbar-title >{{this.title_name}}</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      activeBtn: 1,
      topbar_name: ""
    };
  },
  props:{
    title_name:{
      type: String,
    required: true
    }
  },
};
</script>

<style lang="scss">
.v-toolbar__title {
  color: $sub-color;
  font-family: $my-font;
   font-weight: $myfont-weight;
}
</style>