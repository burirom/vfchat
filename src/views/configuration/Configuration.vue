<template>
  <div class="about">
    <top_bar :title_name="title_name" class="topbar"></top_bar>
    <div class="aboutitem">
      <div class="my-5">
        <v-btn x-large color="subcolor" dark block to="/configuration/changename">UserName</v-btn>
      </div>

      <div class="my-5">
        <v-btn x-large color="subcolor" dark block to="/configuration/changeimg">Img</v-btn>
      </div>

      <div class="my-5">
        <v-btn x-large color="subcolor" dark block @click="signout">Logout</v-btn>
      </div>
    </div>

    <bottom_bar class="footer-navbar" :active_btn="active_btn"></bottom_bar>
  </div>
</template>

<script>
import top_bar from "../../components/Bar/top_bar";
import bottom_bar from "../../components/Bar/bottom_bar";
import firebase from "firebase";

export default {
  components: {
    top_bar,
    bottom_bar
  },
  data() {
    return {
      title_name: "Configuration",
      active_btn: 2
    };
  },
  methods: {
    signout: function() {
      firebase.auth().signOut();
    }
  }
};
</script>

<style lang="scss" scped>
.topbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}
.aboutitem{
  margin-top: 50%;
  
}
</style>