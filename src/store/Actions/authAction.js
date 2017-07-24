export default class AuthAction {
    static SIGNIN = "SIGNIN";
    static SIGNIN_SUCCESSFULL = "SIGNIN_SUCCESSFULL";
    static SIGNIN_REJECTED = "SIGNIN_REJECTED";

    static SIGNUP = "SIGNUP";
    static SIGNUP_SUCCESSFULL = "SIGNUP_SUCCESSFULL";
    static SIGNUP_REJECTED = "SIGNUP_REJECTED";

    static LOGOUT = "LOGOUT";
    static LOGOUT_SUCCESSFULL = "LOGOUT_SUCCESSFULL";

    static UPDATE_USER = "UPDATE_USER";

    static ISLOGGED = "ISLOGGED";




    static sigin() {
        return {
            type: AuthAction.SIGNIN
        }
    }
    static signinSuccessfull(authUser) {
        return {
            type: AuthAction.SIGNIN_SUCCESSFULL,
            payload: authUser
        }
    }
    static signinRejected(error) {
        return {
            type: AuthAction.SIGNIN_REJECTED,
            payload: error
        }
    }



    static signup() {
        return {
            type: AuthAction.SIGNUP
        }
    }
    static signupSuccessfull(authUser) {
        return {
            type: AuthAction.SIGNUP_SUCCESSFULL,
            payload: authUser
        }
    }
    static signupRejected(error) {
        return {
            type: AuthAction.SIGNUP_REJECTED,
            payload: error
        }
    }




    static logout() {
        return {
            type: AuthAction.LOGOUT
        }
    }
    static logoutSuccessfull() {
        return {
            type: AuthAction.LOGOUT_SUCCESSFULL
        }
    }
    static isLogged(user) {
        return {
            type: AuthAction.ISLOGGED,
            payload: user
        }
    }



    static updateUser(updateUser) {
        return{
            type: AuthAction.UPDATE_USER,
            payload: updateUser
        }
    }

}