import DonorAction from './../Actions/donorAction';

const INITIAL_STATE = {
    isDetailUpdated: false,
    isProcessing: false,
    isError: false,
    errorMessage: {},
    donorDetail: {},
    donorList: [],
}
function DonorReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case DonorAction.REGISTER_DONOR:
            return { ...state, isProcessing: true, isError: false, isDetailUpdated: false };
        case DonorAction.REGISTER_DONOR_SUCCESSFULL:
            return { ...state, isProcessing: false, isError: false, errorMessage: {}, isDetailUpdated: true };
        case DonorAction.REGISTER_DONOR_REJECTED:
            return { ...state, isProcessing: false, isError: true, errorMessage: action.payload, isDetailUpdated: false };

        case DonorAction.ADD_DONOR:
            var newDonorList = [...state.donorList];
            newDonorList.push(action.payload);
            return { ...state, isProcessing: false, isError: false, donorList: newDonorList };
            
        case DonorAction.GET_DONOR_LIST:
            return { ...state, isProcessing: true, isError: false, donorList: [] };
        case DonorAction.GET_DONOR_DETAIL_SUCCESSFULL:
            return { ...state, isProcessing: false, isError: false, errorMessage: {}, donorDetail: action.payload }
        case DonorAction.GET_DONOR_LIST_REJECTED:
            return { ...state, isProcessing: false, isError: true, errorMessage: action.payload, donorDetail: {} };
    }
}

export default DonorReducer;