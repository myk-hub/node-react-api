import 'whatwg-fetch';
import { decrementProgress, incrementProgress } from './progress';

// action creators
export const loginAttempt = () => ({ type: 'AUTHENTICATION_LOGIN_ATTEMPT' });
export const loginFailure = error => ({ type: 'AUTHENTICATION_LOGIN_FAILURE', error });
export const loginSuccess = json => ({ type: 'AUTHENTICATION_LOGIN_SUCCESS', json });
export const sessionCheckFailure = () => ({ type: 'AUTHENTICATION_SESSION_CHECK_FAILURE' });
export const sessionCheckSuccess = json => ({ type: 'AUTHENTICATION_SESSION_CHECK_SUCCESS', json });
export const logoutFailure = error => ({ type: 'AUTHENTICATION_LOGOUT_FAILURE', error });
export const logoutSuccess = () => ({ type: 'AUTHENTICATION_LOGOUT_SUCCESS' });

// Check User Session
export function checkSession() {
  return async (dispatch) => {
    // contact the API
    await fetch(
      // where to contact
      '/api/authentication/checksession',
      // what to send
      {
        method: 'GET',
        credentials: 'same-origin',
      },
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json) => {
        if (json.username) {
          return dispatch(sessionCheckSuccess(json));
        }
        return dispatch(sessionCheckFailure());
      })
      .catch(e => dispatch(sessionCheckFailure(e)));
  };
}

// Log User In
export function logUserIn(userData) {
  return async (dispatch) => {
    // turn on spinner
    dispatch(incrementProgress());

    // register that a login attempt is being made
    dispatch(loginAttempt());

    // contact login API
    await fetch(
      // where to contact
      '/api/authentication/login',
      // what to send
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      },
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return null;
      })
      .then((json) => {
        if (json) {
          dispatch(loginSuccess(json));
        } else {
          dispatch(loginFailure(new Error('Authentication Failed')));
        }
      })
      .catch((e) => {
        dispatch(loginFailure(new Error(e)));
      });

    // turn off spinner
    return dispatch(decrementProgress());
  };
}

// Log User Out
export function logUserOut() {
  return async (dispatch) => {
    // turn on spinner
    dispatch(incrementProgress());

    // contact the API
    await fetch(
      '/api/authentication/logout',
      {
        method: 'GET',
        credentials: 'same-origin',
      },
    )
      .then((res) => {
        if (res.status === 200) {
          dispatch(logoutSuccess());
        } else {
          dispatch(logoutFailure(`Error: ${res.status}`));
        }
      })
      .catch((e) => {
        dispatch(logoutFailure(e));
      });

    // turn off spinner
    return dispatch(decrementProgress());
  };
}
