import firebase from 'firebase'



function usercheck(useradr,db){
    db = firebase.firestore();
    var checkflg   =  false;
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.id == useradr){
                checkflg = true;
                console.log("通りました" + checkflg);
            }
       
        });
    });
  
    return checkflg;
}


function useradd(useradr){
    var db = firebase.firestore();
    var users = db.collection("users");

// Add a new document in collection "cities"
users.doc(useradr).set({
    usermail: useradr,
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
}

function userlist(){
    var db = firebase.firestore();
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        }
        );
    });

}

export default{useradd,usercheck,userlist}