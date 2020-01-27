import firebase from 'firebase'
import firestore from '../database/firestore'

function set_img(useradr){
    var storageRef = firebase.storage().ref();
    var imgSample = storageRef.child("kouryou1.png");
    imgSample.getDownloadURL().then(url => {
        firestore.setuserimg(useradr,url);
        
    });
}


export default {set_img}