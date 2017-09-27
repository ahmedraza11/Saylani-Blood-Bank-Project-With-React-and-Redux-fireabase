export default class DonorAction {
    static REGISTER_DONOR = "REGISTER_DONOR";
    static REGISTER_DONOR_SUCCESSFULL = "REGISTER_DONOR_SUCCESSFULL";
    static REGISTER_DONOR_REJECTED = "REGISTER_DONOR_REJECTED";

    static GET_DONOR_LIST = "GET_DONOR_LIST";
    static GET_DONOR_LIST_SUCCESSFULL = "GET_DONOR_LIST_SUCCESSFULL";
    static GET_DONOR_LIST_REJECTED = "GET_DONOR_LIST_REJECTED";

    static ADD_DONOR = "ADD_DONOR";
    static ADD_DONOR_FAILED = "ADD_DONOR_FAILED";

    static GET_DONOR_DETAIL = "GET_DONOR_DETAIL";
    static GET_DONOR_DETAIL_SUCCESSFULL = "GET_DONOR_DETAIL_SUCCESSFULL";
    static GET_DONOR_DETAIL_REJECTED = "GET_DONOR_DETAIL_REJECTED";

    static SEND_NOTIFICATION = "SEND_NOTIFICATION";
    static SEND_NOTIFICATION_SUCCESSFULL = "SEND_NOTIFICATION_SUCCESSFULL";

    static registerDonor() {
        return {
            type: DonorAction.REGISTER_DONOR
        }
    }

    static registerDonorSuccessfull(donorObj) {
        return {
            type: DonorAction.REGISTER_DONOR_SUCCESSFULL,
            payload: donorObj
        }
    }
    static registerDonorRejected(error) {
        return {
            type: DonorAction.REGISTER_DONOR_REJECTED,
            payload: error
        }
    }
    static getDonorList() {
        return {
            type: DonorAction.GET_DONOR_LIST
        }
    }
    static getDonorListSuccessfull(donorList) {
        return {
            type: DonorAction.GET_DONOR_LIST_SUCCESSFULL,
            payload: donorList
        }
    }
    static getDonorListRejected(error) {
        return {
            type: DonorAction.GET_DONOR_LIST_REJECTED,
            payload: error
        }
    }
    static addDonorToList(donorObj) {
        return {
            type: DonorAction.ADD_DONOR,
            payload: donorObj
        }
    }
    static addDonorToListFailed(donorObj) {
        return {
            type: DonorAction.ADD_DONOR_FAILED,
            payload: donorObj
        }
    }
    static getDonorDetail() {
        return {
            type: DonorAction.GET_DONOR_DETAIL
        }
    }
    static getDonorDetailSuccessfull(donorObj) {
        return {
            type: DonorAction.GET_DONOR_DETAIL_SUCCESSFULL,
            payload: donorObj
        }
    }
    static getDonorDetailRejected(error) {
        return {
            type: DonorAction.getDonorDetailRejected,
            payload: error
        }
    }

    static sendNotification() {
        return {
            type: DonorAction.SEND_NOTIFICATION
        }
    }

    static sendNotificationSuccessfull(obj) {
        return {
            type: DonorAction.SEND_NOTIFICATION,
            payload:obj
        }
    }


}