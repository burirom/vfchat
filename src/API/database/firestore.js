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
        relationroom: []
    }
        , { merge: true })

        ;
}

function setuserimg(useradr, imgurl, collection) {
    var db = firebase.firestore();
    var users = db.collection(collection);
    users.doc(useradr).set({
        userimg: imgurl
    }
        , { merge: true });
}



function createdata(menber, groupname, typegroup) {
    var db = firebase.firestore();
    db
        .collection("chat")
        .add({
            message: {}
        })
        .then(function (docRef) {

            creategroup(docRef.id, menber, groupname, typegroup);
            // relationroom(docRef.id,menber,typegroup);
        })
        .catch(function () { });


}

function creategroup(groupid, groupmenber, groupname, typegroup) {
    var db = firebase.firestore();
    db.collection("groups").doc(groupid).set({
        id: groupid,
        menber: groupmenber,
        groupname: groupname,
        typegroup: typegroup

    }, { merge: true });

}

function writetimeline(message, user) {
    var db = firebase.firestore();
    db.collection('timeline').add({
        postmessage: message,
        date: new Date(),
        senduser: user,
        goodnum: 0,
        goodlist: []
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        db.collection('good').doc(docRef.id).set({
            goodnum: 0,
            goodlist: []
        });
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

   
}

function updatetimeline(docid,userid) {
    var db = firebase.firestore();
    var userlist = db.collection("good").doc(docid);

    userlist.get().then(function(doc) {
        const existing = doc.data().goodlist.some((v) => v === userid);
        if (existing) {
            numchange("good", docid, "goodnum", -1);
            arraychange("good", docid, "goodlist", userid, false);
        }
        else {
            numchange("good", docid, "goodnum", 1);
            arraychange("good", docid, "goodlist", userid, true);
        }
    })
}

function numchange(collectionname, docid, fieldname, num) {
    var db = firebase.firestore();
    var washingtonRef = db.collection(collectionname).doc(docid);
    // Atomically increment the population of the city by 50.
    washingtonRef.update({
        [fieldname]: firebase.firestore.FieldValue.increment(num)
    });

}

function arraychange(collectionname, docid, fieldname, additem, addflg) {
    var db = firebase.firestore();
    var washingtonRef = db.collection(collectionname).doc(docid);
    if (addflg == true) {
        // Atomically add a new region to the "regions" array field.
        washingtonRef.update({
            [fieldname]: firebase.firestore.FieldValue.arrayUnion(additem)
        });
    } else if (addflg == false) {
        // Atomically remove a region from the "regions" array field.
        washingtonRef.update({
            [fieldname]: firebase.firestore.FieldValue.arrayRemove(additem)
        });
    }
}










export default { useradd, usercheck, setuserimg, creategroup, createdata, writetimeline, updatetimeline }