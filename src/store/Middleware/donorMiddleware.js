import DonorAction from '../Actions/donorAction';
import AuthMiddleware from './authMiddleware';
import * as firebase from 'firebase';

export default class DonorMiddleware {
    static registerDonor(donorDetail) {
        console.log("Donor Detail====", donorDetail);
        return (dispatch) => {
            dispatch(DonorAction.registerDonor());
            DonorMiddleware.updateUserInfoOnFirebase(dispatch, donorDetail);
        }
    }
    static updateUserInfoOnFirebase(dispatch, donorDetail) {
        firebase.database().ref('/')
            .child(`users/${donorDetail.uid}`)
            .update(donorDetail)
            .then(() => {
                dispatch(DonorAction.registerDonorSuccessfull());
                dispatch(AuthMiddleware.updateUser(donorDetail));
            });
    }
    
    //*** Fetch User Detail ***/

    static getDonorList(bloodGroup) {
        console.log("Middleware====Blood Group", bloodGroup);
        return (dispatch) => {
            dispatch(DonorAction.getDonorList());
            DonorMiddleware.getDonorListFromFirebase(dispatch, bloodGroup);
        }
    }
    static getDonorListFromFirebase(dispatch, bloodGroup) {
        //playersRef.orderByChild("name").equalTo("John")
        const donorListRef = firebase.database().ref('/')
            .child('users')
            .orderByChild('isDonor').equalTo(true);
        donorListRef.on("child_added", (snapshot) => {
            dispatch(DonorAction.addDonorToList(snapshot.val()))
        });
    }

    static getDonorDetail(donorId) {
        console.log("GetDonorDetail", donorId);
        return (dispatch) => {
            dispatch(DonorAction.getDonorDetail());
            DonorMiddleware.getDonorDetailFromFirebase(dispatch, donorId);
        }
    }

    static getDonorDetailFromFirebase(dispatch, donorId) {
        firebase.database().ref('/')
            .child(`users/${donorId}`)
            .on("value", (snapshot) => {
                dispatch(DonorAction.getDonorDetailSuccessfull(snapshot.val()))
            });
    }
}

