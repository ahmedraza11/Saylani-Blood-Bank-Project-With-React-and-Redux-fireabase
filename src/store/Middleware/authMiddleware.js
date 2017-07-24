import * as firebase from 'firebase';
import LocalStorageManager from '../../services/localStorageManager';
import AuthAction from '../Actions/authAction';

export default class AuthMiddleware {


    //****Signup Function Start's Here//

    static signup(credentials) {
        console.log("test", credentials);
        return (dispatch) => {
            dispatch(AuthAction.signup())
            AuthMiddleware.registerOnFirebase(dispatch, credentials);
        }
    }

    static registerOnFirebase(dispatch, credentials) {
        firebase.auth()
            .createUserWithEmailAndPassword(credentials.email, credentials.password)
            .then((authUser) => {
                console.log("Signup Successfull", authUser);
                console.log("credential Profile-----------------", credentials.profilePic);
                AuthMiddleware.createUserInFirebase(dispatch, credentials, authUser);
            })
            .catch((error) => {
                console.log("Firebase data Signup error", error);
                dispatch(AuthAction.signupRejected(error));
            });
    }

    static createUserInFirebase(dispatch, credentials, authUser) {
        let user = {
            uid: authUser.uid,
            email: credentials.email,
            fullName: credentials.fullName,
            profilePic: credentials.profilePic,
            donor: false,
            profilePhoto: '',
            // webCam: webcam
        };
        console.log("CUrrent value in UserObject createUserInFirebase============== ", user.profilePic);
        firebase.database().ref('/')
            .child(`users/${user.uid}`)
            .set(user)
            .then(() => {
                dispatch(AuthAction.signupSuccessfull())
            }).catch((error) => {
                console.log("error in User set in firebase database", error)
            })
        if (credentials.webcam) {
            firebase.storage().ref('/')
                .child("ProfilePicture/" + authUser.uid + "/profilePic.jpg")
                .putString(user.profilePic, 'data_url').then((snapshot) => {
                    console.log("Webcam photo uploaded successfull");
                    console.log("Webcam status,,,,,", credentials.webcam);
                }).catch((error) => {
                    console.log("Captured Webcame Error -========= ", error);
                });
        } else {
            firebase.storage().ref('/')
                .child("ProfilePicture/" + authUser.uid + "/profilePic.jpg")
                .put(user.profilePic).then((snapshot) => {
                    console.log("fileSuccessfully Uploaded");
                }).catch((error) => {
                    console.log("Uploaded Error -========= ", error);
                })
        }
    }

    //Signup Function End's Here****//


    //****Signin Function Start's Here//

    static signin(credentials) {
        console.log("test", credentials);
        return (dispatch) => {
            dispatch(AuthAction.sigin())
            AuthMiddleware.authenticateUserOnFirebase(dispatch, credentials);
        }
    }

    static authenticateUserOnFirebase(dispatch, credentials) {
        firebase.auth()
            .signInWithEmailAndPassword(credentials.email, credentials.password)
            .then((authUser) => {
                console.log("Signin Successfull", authUser)
                AuthMiddleware.getUserFromFirebase(dispatch, authUser)
            })
            .catch((error) => {
                console.log("signin error", error)
                dispatch(AuthAction.signinRejected(error));
            });
    }

    static getUserFromFirebase(dispatch, authUser) {
        firebase.storage().ref('/').child("ProfilePicture/" + authUser.uid + "/profilePic.jpg")
            .getDownloadURL()
            .then((url) => {
                authUser.updateProfile({
                    photoURL: url
                })
                console.log("url downloaded", url);
                console.log("URL update success", authUser.photoURL);
            }).catch((error) => {
                console.log("photo download Failed ======== ", error)
            })
        firebase.database().ref('/')
            .child(`users/${authUser.uid}`)
            .once('value')
            .then((userObj) => {
                setTimeout(() => {
                    AuthMiddleware.setProfilePhoto(dispatch, authUser, userObj);
                }, 4000);
            })
    }


    static setProfilePhoto(dispatch, authUser, userObj) {
        var updates = {
            profilePhoto: authUser.photoURL
        }
        firebase.database().ref('/').child(`users/${authUser.uid}`).update(updates).then((data) => {
            console.log("update successfull", data);
            //userObj.val().profilePhoto = authUser.photoURL
            console.log("user after login", userObj.val());
            LocalStorageManager.setUser(userObj.val());
            dispatch(AuthAction.signinSuccessfull(authUser));
            console.log("url from firebase", authUser.photoURL);
        })


    }
    //Signin Function End's Here****//

    //****Logout Function Start's Here//

    static logout() {
        return (dispatch) => {
            dispatch(AuthAction.logout());
            AuthMiddleware.logoutFromFirebase(dispatch)
        }
    }
    static logoutFromFirebase(dispatch) {
        LocalStorageManager.removeUser();
        firebase.auth().signOut()
            .then(() => {
                dispatch(AuthAction.logoutSuccessfull())
            })
            .catch((error) => {
                console.log("error in Logout", error)
                dispatch(AuthAction.logoutSuccessfull())
            })
    }
    //Logout Function End's Here****//

    //***IsLoggedIn***//
    static isLoggedIn() {
        return (dispatch) => {
            let user = LocalStorageManager.getUser();
            if (user) {
                dispatch(AuthAction.signinSuccessfull(user))
            } else {
                console.log("not Logged In");
            }
        }
    }

    static updateUser(authUser) {
        return (dispatch) => {
            firebase.database().ref('/')
                .child(`users/${authUser.uid}`)
                .once('value')
                .then((userObj) => {
                    console.log("User after Update", userObj.val());
                    LocalStorageManager.setUser(userObj.val())
                    dispatch(AuthAction.updateUser(userObj.val()))
                });
        }
    }


}
