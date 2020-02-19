import firebase from 'firebase'

function mail_login(username, password, router) {
    firebase.auth().signInWithEmailAndPassword(username, password).then(function () {
        router.push('/Home');
    }
    ).catch(function (error) {
        if (error.code === 'auth/wrong-password') {
            alert('ユーザー名またはパスワードが違います。');
        } else {
            alert('ユーザー名またはパスワードが違います。');
        }
    }
    )
}

function google_login(router) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function () {
        router.push('/Home');
    }).catch(function (error) {
        alert(error.message);
    });
   
}


export default { mail_login, google_login }