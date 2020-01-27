import firebase from 'firebase'




function useradd(useradr) {
    var db = firebase.firestore();
    var users = db.collection("users");

    // Add a new document in collection "cities"
    users.doc(useradr).set({
        usermail: useradr,
        username: useradr,
        userimg: 'https://firebasestorage.googleapis.com/v0/b/vf-chat-project.appspot.com/o/kouryou1.png?alt=media&token=313bb9d1-560f-49c7-bcd2-468b80698bc0'

    })
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}



function userset(useradr) {
    var db = firebase.firestore();
    var users = db.collection("users");

    // Add a new document in collection "cities"
    users.doc(useradr).set({
        usermail: useradr,
        username: useradr,
        userimg: 'https://firebasestorage.googleapis.com/v0/b/vf-chat-project.appspot.com/o/kouryou1.png?alt=media&token=313bb9d1-560f-49c7-bcd2-468b80698bc0'

    })
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}

function usercheck(){
    
}



export default { useradd,userset,usercheck}