<template>
  <div>
    <div v-for="timeline in reverseItems" :key="timeline.id" class="timelineitem">
      <v-card max-width="350" class="mx-auto">
        <v-list-item class="username">
          <v-list-item-avatar>
            <img :src="timeline.userimg" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{timeline.username}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-card-text>{{timeline.postmessage}}</v-card-text>
        <v-card-actions class="otherinfo">
          <v-btn icon @click="goodbtn(timeline.timelinedocid,timeline.userid)">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-list-item-title class="textdate">{{timeline.date}}</v-list-item-title>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import firestore from "../../API/database/firestore"
export default {
  data() {
    return {
      db: null,
      timeline: [],
    };
  },
  created() {
    this.db = firebase.firestore();

    this.getitem();
  },
  methods: {
    getitem: function() {
      const item = this.db.collection("timeline").orderBy("date", "asc");

      item.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          var timestamp = change.doc.data().date.toDate();
          var y = timestamp.getFullYear();
          var m = ("00" + (timestamp.getMonth() + 1)).slice(-2);
          var d = ("00" + timestamp.getDate()).slice(-2);
          var result = y + "/" + m + "/" + d;
          let timelineinfo = {
            senduser: change.doc.data().senduser,
            postmessage: change.doc.data().postmessage,
            date: result,
            docid: change.doc.id
          };

          this.getuserinfo(timelineinfo, this.timeline);
        });
      });
    },
    getuserinfo: function(timelineinfo, timeline) {
      const info = this.db
        .collection("users")
        .where("usermail", "==", timelineinfo.senduser);
      info
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            let data = {
              userid:doc.id,
              username: doc.data().username,
              userimg: doc.data().userimg,
              postmessage: timelineinfo.postmessage,
              date: timelineinfo.date,
              timelinedocid: timelineinfo.docid
            };
            timeline.push(data);
          });
        })
        // .catch(function(error) {
        //   console.log("Error getting documents: ", error);
        // });
    },

    goodbtn: function(docid,userid){
      // console.log("goodbtn押しました" + docid + userid);
      firestore.updatetimeline(docid,userid);
    }
   
  },
   computed: {
      // 配列の要素順番を逆順にする
      reverseItems() {
        return this.timeline.slice().reverse();
      }
    }
};
</script>

<style lang="scss" scoped>
.textdate {
  text-align: end;
  margin-right: 10px;
}
.username {
  border-bottom: solid 1px #dcdcdc;
}
.otherinfo {
  border-top: solid 1px #dcdcdc;
}
.timelineitem {
  margin-bottom: 50px;
}
</style>