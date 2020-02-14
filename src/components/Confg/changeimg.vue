<template>
  <div>
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs10 sm8 md4>
              <v-text-field v-model="changename" :counter="10" label="Change img" required></v-text-field>
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
import firebase from "firebase";
import confbtn from "./confbtn"
export default {
  data(){
    return{

    }
  },
  created(){
    
  },
  methods:{

  }
};
</script>

<style>
</style>