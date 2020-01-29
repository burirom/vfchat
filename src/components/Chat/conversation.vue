<template>
  <div>
    <div v-for="chat in this.imglist" :key="chat.id">
      <div :class="chat.myother">
        <div class="f-item">
          <img :src="chat.imgurl" />
        </div>
        <div class="balloon f-item">
          <p class="username">{{chat.username}}</p>
          <div class="message">{{chat.message}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  props: {
    message: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      groupid: "",
      messagelist: [],
      imglist: [],
      db: null,
      loginuser: "",
      groupname: ""
    };
  },
  created: function() {
    this.db = firebase.firestore();
    this.read_db();
  },
  updated: function() {
    this.scrollDown();
  },

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
      var groupname = this.$route.params.groupname;
      this.loginuser = this.$route.params.user2;
      this.$emit("loginuser", user2);

      this.db.collection("data").onSnapshot(querySnapshot => {
        // this.messagelist = [];
        this.imglist = [];
        var userflg = false;
        var groupflg = false;
        querySnapshot.forEach(doc => {
          if (user1 + user2 == doc.id || user2 + user1 == doc.id) {
            if (doc.data().messsage) {
              for (var i = 0; i < doc.data().messsage.length; ++i) {
                this.read_img(
                  doc.data().messsage[i].username,
                  doc.data().messsage[i].message
                );
              }
            }
            userflg = true;
            this.groupname = doc.id;
            this.$emit("groupname", this.groupname);
          }else if(groupname == doc.id){
            if (doc.data().messsage) {
              for (var j = 0; j < doc.data().messsage.length; ++j) {
                this.read_img(
                  doc.data().messsage[j].username,
                  doc.data().messsage[j].message
                );
              }
            }

            groupflg = true;
            this.groupname = doc.id;
            this.$emit("groupname", this.groupname);



          }
        });
        if (userflg == false) {
          this.create_group(user1 + user2);
          this.groupname = user1 + user2;
          this.$emit("groupname", this.groupname);
        }else  if(groupflg == false){
          this.create_group(groupname);
          this.groupname = groupname;
          this.$emit("groupname", this.groupname);

        }
      });
    },

    read_img: function(username, message) {
      this.db
        .collection("users")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (username == doc.id && username == this.$route.params.user2) {
              let data = {
                imgurl: doc.data().userimg,
                username: doc.data().username,
                message: message,
                myother: "my"
              };
              this.imglist.push(data);
            } else if (
              username == doc.id &&
              username != this.$route.params.user2
            ) {
              let data = {
                imgurl: doc.data().userimg,
                username: doc.data().username,
                message: message,
                myother: "other"
              };
              this.imglist.push(data);
            }
          });
        });
    },

    scrollDown() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.my {
  display: flex;
  align-content: stretch;
  > .balloon .message {
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
  > .f-container {
    display: flex;
    align-content: stretch;
  }
}

.other {
  display: flex;
  flex-direction: row-reverse;

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

//   > .balloon .message {
//     //   display: flex;
//     //   align-content: stretch;
//   }
}

.balloon p {
  margin: 0;
  padding: 0;
}
.username {
  font-size: $textsize_xsmall;
}
</style>