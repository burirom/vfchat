<template>
  <v-btn icon @click="goodbtn(timeline.timelinedocid)">
    <v-icon  :color="this.activegood">mdi-heart</v-icon>
    <div>{{this.goodnum}}</div>
  </v-btn>
</template>

<script>
import firebase from "firebase";
import firestore from "../../API/database/firestore";
export default {
  props: {
    timeline: {}
  },
  data() {
    return {
        goodnum: '',
        activegood: "stop",
        db: null,
        loginuser:"",

    };
  },
  created:function(){
       this.db = firebase.firestore();
       this.getusername();
       this.getgoodinfo();
  },
  methods: {
    goodbtn: function(docid) {
      firestore.updatetimeline(docid, this.loginuser);
    },
    getgoodinfo: function() {
    
      var item = this.db.collection("good");
      item.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            if(change.doc.id == this.timeline.timelinedocid){
                this.goodnum = change.doc.data().goodnum;
                const existing = change.doc.data().goodlist.some((v) => v === this.loginuser);
                if(existing){
                    this.activegood = "active";
                }else{
                    this.activegood = "stop";
                }
            }
        });

      });
    },
     getusername: function() {
       firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.loginuser = user.email;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>