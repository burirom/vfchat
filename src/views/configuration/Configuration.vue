<template>
  <div class="about">
    <v-app id="inspire">
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
    <topBar :title_name="title_name" class="topbar"></topBar>
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
    <bottomBar class="footer-navbar" :active_btn="active_btn"></bottomBar>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    </v-app>
  </div>
</template>

<script>
import topBar from "../../components/Bar/topBar";
import bottomBar from "../../components/Bar/bottomBar";
import firebase from "firebase";

export default {
  components: {
    topBar,
    bottomBar
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

</style>