import firebase from 'firebase'




function usercheck(useradr) {
    var db = firebase.firestore();
    var users = db.collection("users");
    users
        .get()
        .then(querySnapshot => {
            var already_user = false;
            querySnapshot.forEach(doc => {
                if (useradr == doc.id) {
                    already_user = true;
                }
            });
            if (already_user != true) {
                useradd(useradr, users);
            }
        }
        );
}

function useradd(useradr, users) {

    users.doc(useradr).set({
        usermail: useradr,

        username: useradr,

        userimg: '',
        relationroom:[]
    }
        , { merge: true })
   
        ;
}

function setuserimg(useradr, imgurl,collection) {
    var db = firebase.firestore();
    var users = db.collection(collection);
    users.doc(useradr).set({
        userimg: imgurl
    }
        , { merge: true })

        ;
}



function createdata(menber,groupname,typegroup){
    var db = firebase.firestore();
    db
        .collection("chat")
        .add({
          message: {}
        })
        .then(function(docRef) {
            console.log("作成しました");
            creategroup(docRef.id,menber,groupname,typegroup);
            // relationroom(docRef.id,menber,typegroup);
        })
        .catch(function() {});
    

}

function creategroup(groupid,groupmenber,groupname,typegroup){
    var db = firebase.firestore();
    db.collection("groups").doc(groupid).set({
        id: groupid,
        menber: groupmenber,
        groupname: groupname,
        typegroup: typegroup
        
      },{ merge: true });

}

// function relationroom(id,menber,type){
//     var db = firebase.firestore();
//     console.log(type);

//     menber.forEach(function(value) {
//         db.collection('users').doc(value).collection('relationroom').add({
//             relationroom: id,
//             typegroup: type
//           })

//     })
  
    

// }








export default { useradd, usercheck, setuserimg ,creategroup,createdata}