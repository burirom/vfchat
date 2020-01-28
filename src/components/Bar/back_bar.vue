<template>
  <v-toolbar>
    <v-row no-gutters>
      <v-col cols="4"> <v-icon @click="back_btn" color="subcolor">mdi-arrow-left</v-icon></v-col>
      <v-col cols="4"> <v-toolbar-title class="title">{{this.title_name}}</v-toolbar-title></v-col>
    </v-row>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title_name: {
      type: String,
      required: true
    }
  },
  methods: {
    back_btn: function() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.title {
  text-align: center;
  margin: auto;
}
.v-toolbar{
  background: #ffffff;
}
</style>