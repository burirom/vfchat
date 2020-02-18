<template>
  <div>
    <div v-for="chat in this.messagelist" :key="chat.id">
      <div :class="chat.myother">
        <p class="username">{{chat.username}}</p>
        <div class="imgmessage">
          <div class="f-item">
            <img :src="chat.userimg" />
          </div>
          <div class="balloon f-item">
            <div class="message">{{chat.message}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  // props: {
  //   groupid: {
  //     type: String,
  //     required: true
  //   },
  //   loginuser: {
  //     type: String,
  //     required: true,
  //   }
  // },
  data() {
    return {
      db: null,
      loginuser: "",
      groupid: "",
      userlist: [],
      userinfo: [],
      messagelist: []
    };
  },
  created: async function() {
    this.db = firebase.firestore();
    this.loginuser = await this.setloginuser();
    this.groupid = await this.setgroopid();
    this.userlist = await this.setuserlist();
    await this.setuserinfo();
    this.chatdata();
  },
  updated: function() {
    this.scrollDown();
  },
  methods: {
    setloginuser: function() {
      return new Promise(function(resolve) {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            resolve(user.email);
          }
        });
      });
    },

    setgroopid: function() {
      var users = this.db.collection("users").doc(this.loginuser);
      return new Promise(function(resolve) {
        users
          .get()
          .then(function(doc) {
            if (doc.exists) {
              resolve(doc.data().activeid);
            } 
            // else {
            //   console.log("No such document!");
            // }
          });
          // .catch(function(error) {
          //   console.log("Error getting document:", error);
          // });
      });
    },
    setuserlist: function() {
      var group = this.db.collection("groups").doc(this.groupid);
      return new Promise(function(resolve) {
        group
          .get()
          .then(function(doc) {
            if (doc.exists) {
              resolve(doc.data().menber);
            } 
            
            // else {
            //   console.log("No such document!");
            // }
          });
          // .catch(function(error) {
          //   console.log("Error getting documents: ", error);
          // });
      });
    },
    setuserinfo: async function() {
      for (var item of this.userlist) {
        this.userinfo.push(await this.getuserinfo(item));
      }
    },
    getuserinfo: function(menber) {
      var users = this.db.collection("users").doc(menber);
      return new Promise(function(resolve) {
        users
          .get()
          .then(doc => {
            if (doc.exists) {
              let data = {
                userid: doc.data().usermail,
                username: doc.data().username,
                userimg: doc.data().userimg
              };
              resolve(data);

            } 
            // else {
            //   // doc.data() will be undefined in this case
            //   console.log("No such document!");
            // }
          });
          // .catch(function(error) {
          //   console.log("Error getting document:", error);
          // });
      });
    },
    chatdata: function() {
      // var chat = this.db.collection("chat").doc(this.$route.params.groupId);
      var chat = this.db.collection("chat").doc(this.groupid);
      chat.onSnapshot(doc => {
        this.messagelist = [];
        for (const i in doc.data().message) {
          if (doc.data().message[i].senduser == this.loginuser) {
            let data = {
              userimg: this.getuserimg(doc.data().message[i].senduser),
              username: this.getusername(doc.data().message[i].senduser),
              message: doc.data().message[i].message,
              myother: "my"
            };
            this.messagelist.push(data);
          } else if (doc.data().message[i].senduser != this.loginuser) {
            let data = {
              userimg: this.getuserimg(doc.data().message[i].senduser),
              username: this.getusername(doc.data().message[i].senduser),
              message: doc.data().message[i].message,
              myother: "other"
            };
            this.messagelist.push(data);
          }
        }
      });
    },

    getuserimg: function(userid) {
      var userimg;
      for (var item of this.userinfo) {
        if (item.userid == userid) {
          userimg = item.userimg;
        }
      }
      return userimg;
    },
    getusername: function(userid) {
      var username;
      for (var item of this.userinfo) {
        if (item.userid == userid) {
          username = item.username;
        }
      }
      return username;
    },
    scrollDown() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight);
      });
    }
  },
  computed: {
    // getuseractiveid:function(){
    // },
  }
};

</script>

<style lang="scss" scoped>
.my {
  margin-bottom: 20px;
  > p {
    margin: 0;
  }
  > .imgmessage {
    display: flex;
    align-content: stretch;

    .balloon .message {
      position: relative;
      display: inline-block;
      margin: 0em 0 1.5em 15px;
      padding: 7px 10px;
      min-width: 30px;
      min-height: 40px;
      max-width: $breake-word;
      color: #555;
      font-size: 16px;
      background: #e0edff;
      word-wrap: break-word;
      border-radius: 10px;
      &::before {
        content: "";
        position: absolute;
        top: 45%;
        left: -18px;
        margin-top: -15px;
        border: 10px solid transparent;
        border-right: 15px solid #e0edff;
      }
    }
  }
}

.other {
  margin-bottom: 20px;
  > p {
    margin: 0;
  }
  > .imgmessage {
    display: flex;
    flex-direction: row-reverse;
    > .balloon {
      margin-right: 10px;
    }
    > .balloon .message {
      position: relative;
      display: inline-block;
      margin: 0 0 1.5em 1.5px;
      padding: 7px 10px;
      min-width: 30px;
      min-height: 40px;
      max-width: $breake-word;
      color: #555;
      font-size: 16px;
      background: $chatcolor-other;
      word-wrap: break-word;
      border-radius: 10px;

      &::before {
        content: "";
        position: absolute;
        top: 45%;
        right: -18px;
        margin-top: -15px;
        margin-right: 0;
        border: 10px solid transparent;
        border-left: 15px solid $chatcolor-other;
      }
    }
  }
  > .username {
    text-align: end;
  }
}

.balloon p {
  margin: 0;
  padding: 0;
}
.username {
  font-size: $textsize_xsmall;
}

img {
  max-height: 60px;
  max-width: 60px;
}
</style>