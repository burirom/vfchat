<template>
  <div>
    <ul>
      <li
        v-for="chat in this.messagelist"
        :key="chat.id"
      >
      <!-- <img :src="chat.imgurl"> -->
      ユーザー名：{{chat.username}} メッセージ：{{chat.message}}
      </li>
    </ul>

     <ul>
      <li
        v-for="chat in this.imglist"
        :key="chat.id"
      >
      <img :src="chat.imgurl">
      ユーザー名：{{chat.username}} 
      メッセージ:{{chat.message}}
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";


export default {
props:{
    message:{
        type:String,
        required: true
    }
},
  data() {
    return {
      groupid: "",
      messagelist: [],
      imglist:[],
      db: null,
      loginuser: "",
      groupname: ""
    };
  },
  created: function() {
    this.db = firebase.firestore();
    this.read_db();
      
  },
  watch: {},

  methods: {
    create_group(groupname) {
      this.db
        .collection("data")
        .doc(groupname)
        .set({
          message: {}
        })
        .then(function() {})
        .catch(function() {});
    },
    read_db: function() {
      var user1 = this.$route.params.user1;
      var user2 = this.$route.params.user2;
      this.loginuser = this.$route.params.user2;
    this.$emit('loginuser', user2);
       
      


      this.db.collection("data").onSnapshot(querySnapshot => {
        // this.messagelist = [];
        this.imglist = [];
        var flg = false;
        querySnapshot.forEach(doc => {
          if (user1 + user2 == doc.id || user2 + user1 == doc.id) {
            if (doc.data().messsage) {
              for (var i = 0; i < doc.data().messsage.length; ++i) {
                // var data = {
                //   username: doc.data().messsage[i].username,
                //   message: doc.data().messsage[i].message
                // };
                this.read_img(doc.data().messsage[i].username,doc.data().messsage[i].message);
                // this.messagelist.push(data);
              }
            //   this.messagelist.push(doc.data().messsage);
            }
            flg = true;
            this.groupname = doc.id;
            this.$emit('groupname', this.groupname);
            
            
            

          }
        });
        if (flg == false) {
          this.create_group(user1 + user2);
          this.groupname = user1 + user2;
          this.$emit('groupname', this.groupname);
        }
      });
    
    },

    read_img:function(username,message){
       
         this.db.collection("users").get()
        .then(querySnapshot => {
             
        querySnapshot.forEach(doc => {    
            if(username == doc.id){
                let data = {
                    imgurl: doc.data().userimg,
                    username: doc.data().username,
                    message: message
                }
                this.imglist.push(data);
                console.log("通りました");
            }
        });
      });


    }
  }
};
</script>

<style>
</style>