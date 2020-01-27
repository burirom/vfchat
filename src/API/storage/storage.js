import firebase from 'firebase'

function get_imgpass(){
    var storageRef = firebase.storage().ref();
    var imgSample = storageRef.child("kouryou1.png");
    imgSample.getDownloadURL().then(url => {
        console.log(url);
    });
};


export default {get_imgpass}