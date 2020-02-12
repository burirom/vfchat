<template>
  <div>
    <backbar title_name="TimeLine" class="back_bar"></backbar>
    <timelineform class="timelineform" @postmessage="posttext"></timelineform>

    <div @click="postbtn">
      <postbtn class="postbtn"/>
    </div>
  </div>
</template>

<script>
import backbar from "../../components/Bar/back_bar";
import postbtn from "../../components/timeline/postbtn";
import timelineform from "../../components/timeline/timelineform";
import firebase from "firebase"
import firestore from "../../API/database/firestore"

export default {
  components: {
    backbar,
    postbtn,
    timelineform,
    
  },
  data() {
    return {
      text: "",
      loginuser:""
    };
  },
  created:function(){
    this.getusername();
  },
  methods: {
    posttext: function(message) {
      this.text = message;
    },
    postbtn: function() {
      firestore.writetimeline(this.text,this.loginuser)
     
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
.back_bar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}
.postbtn {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
}

</style>