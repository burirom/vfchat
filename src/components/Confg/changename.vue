<template>
  <div>
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
        <v-text-field
            v-model="changename"        
            :counter="10"
            label="Change name"
            required
          ></v-text-field>
          <div @click="changenamebtn()">
             <confbtn  :confname="this.confname"></confbtn>
          </div>
          </v-flex>
        </v-layout>
        </v-container>
    </v-content>
  </v-app>

  </div>
</template>

<script>
import confbtn from "./confbtn"
import firebase from "firebase"
import firestore from "../../API/database/firestore"
export default {
  components:{
    confbtn
  },
  data(){
    return{
      confname:"ChangeName",
      changename: "",
      loginuser:""
    }
  },
  created(){
    this.getusername();
  },
  methods:{
    changenamebtn:function(){
      var filterflg = this.filtername(this.changename);
      if(filterflg){
        firestore.namechange(this.loginuser,this.changename);
        
        this.back();
      }
    },
    filtername:function(name){
      if(name.length <= 10 && name.length >0){
        return true;
      }
    },
        getusername: function() {
       firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.loginuser = user.email;
        }
      });
    },
    back:function(){
       this.$router.go(-1);
    }
  }

}
</script>

<style>

</style>