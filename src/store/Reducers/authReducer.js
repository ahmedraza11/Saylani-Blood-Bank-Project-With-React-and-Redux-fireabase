import AuthAction from './../Actions/authAction';

const INITIAL_STATE = {
    authUser: {},
    isAuthenticated: false,
    isProcessing: false,
    isRegistered: false,
    isError: false,
    errorMessage: {}
}

function AuthReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case AuthAction.SIGNUP:
            return { ...state, isProcessing: true, isRegistered: false, isError: false };
        case AuthAction.SIGNUP_SUCCESSFULL:
            return { ...state, isProcessing: false, isRegistered: true, isError: false };
        case AuthAction.SIGNUP_REJECTED:
            return { ...state, isProcessing: false, isRegistered: false, isError: true, errorMessage: action.payload };

        case AuthAction.SIGNIN:
            return { ...state, isProcessing: true, isAuthenticated: false, isError: false };
        case AuthAction.SIGNIN_SUCCESSFULL:
            return { ...state, isProcessing: false, isAuthenticated: true, authUser: action.payload, isError: false, errorMessage: {} };
        case AuthAction.SIGNIN_REJECTED:
            return { ...state, isProcessing: false, isAuthenticated: false, authUser: {}, isError: true, errorMessage: action.payload }

        case AuthAction.LOGOUT:
            return { ...state, isProcessing: true };
        case AuthAction.LOGOUT_SUCCESSFULL:
            return { ...state, isProcessing: false, isAuthenticated: false, authUser: {} };

        case AuthAction.ISLOGGED:
            return { ...state, isProcessing: false, isAuthenticated: true, authUser: action.payload };
      
        case AuthAction.UPDATE_USER:
            return {...state, isProcessing:false,isAuthenticated:true,authUser: action.payload};
      
        default:
            return state;
    }
}

export default AuthReducer;