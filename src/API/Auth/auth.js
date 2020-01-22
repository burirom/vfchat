import firebase from 'firebase'

function mail_login(username, password, router) {
    firebase.auth().signInWithEmailAndPassword(username, password).then(function () {
        router.push('/Home');
    }
    ).catch(function (error) {
        if (error.code === 'auth/wrong-password') {
            alert('パスワードが違います');
        } else {
            alert(error.message);
        }
    }
    )
}

function google_login(router) {
    var provider = new firebase.auth.GoogleAuthProvider();

    // firebase.auth().signInWithRedirect(provider);

    firebase.auth().signInWithPopup(provider).then(function () {
        router.push('/Home');
    }).catch(function (error) {
        alert(error.message);
    });
    // firebase.auth().getRedirectResult().then(function(result) {   
    //     if (result) {
    //         router.push('/Home');
    //     }
    //   }).catch(function(error) {
    //     alert(error);
    //   });
}


export default { mail_login, google_login }