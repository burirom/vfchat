<template>
  <div>
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs10 sm8 md4>
              <div>
                <v-container fluid>
                  <v-row>
                    <v-col cols="3" sm="3">
                      <v-img
                        src="https://firebasestorage.googleapis.com/v0/b/vf-chat-project.appspot.com/o/defaultimg%2Fcaticon1.jpg?alt=media&token=6f5c5566-c921-44ea-9497-668c6577ce1f"
                        alt
                      />
                    </v-col>

                    <v-col cols="3" sm="3">
                       <v-img
                        src="https://firebasestorage.googleapis.com/v0/b/vf-chat-project.appspot.com/o/defaultimg%2Fcaticon2.jpg?alt=media&token=4e3616fa-b818-43b2-a211-1016b0aca2bc"
                        alt
                      />
                    </v-col>

                    <v-col cols="3" sm="4">
                       <v-img
                        src="https://firebasestorage.googleapis.com/v0/b/vf-chat-project.appspot.com/o/defaultimg%2Fcaticon3.jpg?alt=media&token=c100888b-6f19-435c-aa7e-2e091933606e" 
                        alt
                      />
                    </v-col>

                    <v-col cols="3" sm="4">
                       <v-img
                        src="https://firebasestorage.googleapis.com/v0/b/vf-chat-project.appspot.com/o/defaultimg%2Fcaticon4.jpg?alt=media&token=fd28e708-b938-44cc-b6a0-92adf3dda090"
                        alt
                      />
                    </v-col>
                  </v-row>
                </v-container>
             
                <!-- <img src="https://firebasestorage.googleapis.com/v0/b/vf-chat-project.appspot.com/o/defaultimg%2Fcaticon1.jpg?alt=media&token=6f5c5566-c921-44ea-9497-668c6577ce1f" alt="">
                <img src="https://firebasestorage.googleapis.com/v0/b/vf-chat-project.appspot.com/o/defaultimg%2Fcaticon2.jpg?alt=media&token=4e3616fa-b818-43b2-a211-1016b0aca2bc" alt="">
                <img src="https://firebasestorage.googleapis.com/v0/b/vf-chat-project.appspot.com/o/defaultimg%2Fcaticon3.jpg?alt=media&token=c100888b-6f19-435c-aa7e-2e091933606e" alt="">
                <img src="https://firebasestorage.googleapis.com/v0/b/vf-chat-project.appspot.com/o/defaultimg%2Fcaticon4.jpg?alt=media&token=fd28e708-b938-44cc-b6a0-92adf3dda090" alt="">-->
              </div>
              <div @click="changenamebtn()">
                <confbtn :confname="this.confname"></confbtn>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
// import firebase from "firebase";
import confbtn from "./confbtn";
export default {
  components: {
    confbtn
  },
  data() {
    return {
      confname: "Changeimg"
    };
  },
  created() {},
  methods: {
    changenamebtn: function() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
</style>