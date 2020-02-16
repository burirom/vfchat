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
                    <v-col
                      cols="3"
                      sm="3"
                      v-for="imgurl in defimgurl"
                      :key="imgurl.id"
                      @click="selectimg(imgurl)"
                    >
                      <div :class="{active:imgurl.active}">
                        <v-img :src="imgurl.url" alt class="imgback" />

                        <div :class="{activeicon:imgurl.active}" class="stopicon">
                          <v-icon class="material-icons" large color="iconcolor">check</v-icon>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
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
import firebase from "firebase";
import storage from "../../API/storage/storage";
export default {
  components: {
    confbtn
  },
  data() {
    return {
      confname: "Changeimg",
      loginuser: "",
      defimgurl: []
    };
  },
  created() {
    this.getusername();
    this.getimgname();
  },
  methods: {
    changenamebtn: function() {
      const index = this.defimgurl.findIndex(v => v.active === true);
      try {
        storage.set_img(this.loginuser, this.defimgurl[index].imgname, "users");
      } catch (error) {
        this.$router.go(-1);
      }
      
      this.$router.go(-1);
    },
    getusername: function() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.loginuser = user.email;
        }
      });
    },
    getimgname: function() {
      var db = firebase.firestore();
      var imgdb = db.collection("img").orderBy("id", "asc");
      imgdb
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.setdefuserurl(doc.data().imgname);
          });

    });
    
    },
    setdefuserurl:function(imgname) {
      var storageRef = firebase.storage().ref();
      //defaultimgディレクトリの中
      var imagesRef = storageRef.child("defaultimg");
      var imgSample = imagesRef.child(imgname);
      imgSample.getDownloadURL().then(url => {
        let data = {
          imgname: imgname,
          url: url,
          active: false
        };
        this.defimgurl.push(data);
      });
    },
    selectimg: function(selectimg) {
      this.resetactive();
      selectimg.active = true;
      
    },
    resetactive: function() {
      this.defimgurl.forEach(item => {
        item.active = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.active {
  background-color: #000000;
  position: relative;
  opacity: 0.6;
  > .activeicon {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    margin: auto;
  }
  > .imgback {
    background-color: #000000;
  }
}
.stopicon {
  display: none;
}
</style>