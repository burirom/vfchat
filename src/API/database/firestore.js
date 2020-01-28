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

        userimg: ''
    }
        , { merge: true })
   
        ;
}

function setuserimg(useradr, imgurl) {
    var db = firebase.firestore();
    var users = db.collection("users");
    users.doc(useradr).set({
        userimg: imgurl
    }
        , { merge: true })

        ;
}








export default { useradd, usercheck, setuserimg }