import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: authData.idToken,
        userId: authData.localId
    }
}

export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expTime => dispatch => {
    setTimeout(() => {
        dispatch(logout());
    }, expTime * 1000);
}

export const auth = (email, password, isSignup) => dispatch => {
    dispatch(authStart());
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCsDiBsPv4JEJuEDSScB050ACdd_HhZg7c';
    if(!isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCsDiBsPv4JEJuEDSScB050ACdd_HhZg7c'
    }
    axios.post(url, {
            email,
            password,
            returnSecureToken: true
        })
        .then(res => {
            dispatch(authSuccess(res.data));
            dispatch(checkAuthTimeout(res.data.expiresIn));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        })
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
}