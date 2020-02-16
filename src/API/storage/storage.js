import firebase from 'firebase'
import firestore from '../database/firestore'

function set_img(useradr,imgname,collection){
    var storageRef = firebase.storage().ref();
    //defaultimgディレクトリの中
    var imagesRef = storageRef.child("defaultimg");
    var imgSample = imagesRef.child(imgname);
    imgSample.getDownloadURL().then(url => {
        firestore.setuserimg(useradr,url,collection);   
    });
   
}

function set_groupimg(useradr,imgname){
    var storageRef = firebase.storage().ref();
    var imgSample = storageRef.child(imgname);
    imgSample.getDownloadURL().then(url => {
        firestore.setuserimg(useradr,url);
        
    });
}


export default {set_img ,set_groupimg}