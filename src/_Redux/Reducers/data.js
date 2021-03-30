import {
    // LOGIN_REQUEST,
    // LOGIN_SUCCESS,
    // LOGIN_FAILURE,
    // LOGOUT_REQUEST,
    // LOGOUT_SUCCESS,
    // LOGOUT_FAILURE,
    // VERIFY_REQUEST,
    // VERIFY_SUCCESS,
    // VERIFY_FAIL,
    // IS_ADMIN,
  } from "../Actions";
  
  export default (
    state = {
    //   isLoggingIn: false,
    //   isLoggingOut: false,
    //   loginError: false,
    //   errorObj: { code: "", message: "" },
    //   logoutError: false,
    //   isVerifying: false,
    //   verifyingError: false,
  
    //   isAuthenticated: false,
    //   user: {},
    //   isAdmin: false,
    },
    action
  ) => {
    switch (action.type) {
    //   case LOGIN_REQUEST:
    //     return {
    //       ...state,
    //       isLoggingIn: true,
    //       loginError: false,
    //       errorObj: { code: "", message: "" },
    //     };
    //   case LOGIN_SUCCESS:
    //     return {
    //       ...state,
    //       isLoggingIn: false,
    //       isAuthenticated: true,
    //       user: action.user,
    //     };
    //   case LOGIN_FAILURE:
    //     return {
    //       ...state,
    //       isLoggingIn: false,
    //       isAuthenticated: false,
    //       loginError: true,
    //       errorObj: action.error,
    //     };
    //   case LOGOUT_REQUEST:
    //     return {
    //       ...state,
    //       isLoggingOut: true,
    //       logoutError: false,
    //     };
    //   case LOGOUT_SUCCESS:
    //     return {
    //       ...state,
    //       isLoggingOut: false,
    //       isAuthenticated: false,
    //       user: {},
    //     };
    //   case LOGOUT_FAILURE:
    //     return {
    //       ...state,
    //       isLoggingOut: false,
    //       logoutError: true,
    //     };
    //   case VERIFY_REQUEST:
    //     return {
    //       ...state,
    //       isVerifying: true,
    //       verifyingError: false,
    //     };
    //   case VERIFY_SUCCESS:
    //     return {
    //       ...state,
    //       isVerifying: false,
    //     };
    //   case VERIFY_FAIL:
    //     return {
    //       ...state,
    //       isVerifying: false,
    //     };
    //   case IS_ADMIN:
    //     return {
    //       ...state,
    //       isAdmin: true,
    //     };
  
      default:
        return state;
    }
  };