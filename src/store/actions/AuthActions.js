import { AsyncStorage, Platform } from 'react-native';
import axios from 'axios';
import qs from 'qs';
import startMainApp from '../../screens/startMainApp';
import {
  PASSWORD_CHANGED,
  EMAIL_CHANGED,
  LOAD_SPINNER,
  SET_AUTH,
  LOGIN_USER_FAILURE,
  LOGOUT_USER
} from './types';
import App from '../../App';


if (__DEV__) {
  axios.defaults.baseURL = Platform.OS === 'ios' ? 
  'http://localhost:3000/api/' : 'http://10.0.2.2:3000/api/';
} else { 
  axios.defaults.baseURL = 'whateverourAPIis'; 
}
/*global fetch:false*/


export const emailChanged = (email) => {
  return {
    type: EMAIL_CHANGED,
    payload: email
  };
};

export const passwordChanged = (password) => {
  return {
    type: PASSWORD_CHANGED,
    payload: password
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({
      type: LOAD_SPINNER
    });
    axios.post('session/create',
      qs.stringify({
        session: { username: email, password }
      })
    )
    .then((response) => {
      if (response.status === 200) {
        dispatch(storeAndSetAuth(response.data));
        // AsyncStorage.getItem();
        startMainApp();
      } else {
        console.log(response);
        dispatch({
          type: LOGIN_USER_FAILURE,
          payload: response.data
        });
      }
    })
    .catch(error => {
      dispatch({
        type: LOGIN_USER_FAILURE,
        payload: error.response.data
      });
    });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_USER
    });
  };
};


export const getAuth = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      if (!token) {
        AsyncStorage.getItem('yopko:auth')
          .catch(() => { reject(); })
          .then((tokenFromAsyncStore) => {
            if (!tokenFromAsyncStore) {
              reject();
              return;
            }
            console.log('toook', tokenFromAsyncStore);
            dispatch(setAuth(JSON.parse(tokenFromAsyncStore)));
            resolve(JSON.parse(tokenFromAsyncStore));
          })
          .catch(() => { reject(); });
      } else {
        resolve(token);
      }
    });
    return promise;
  };
};

export const setAuth = payload => {
  return {
    type: SET_AUTH,
    payload
  };
};

export const storeAndSetAuth = (authStuff) => {
  return (dispatch) => {
    dispatch(setAuth(authStuff));
    console.log(authStuff);
    AsyncStorage.setItem('yopko:auth', JSON.stringify(authStuff.auth_token));
  };
};

export const clearStorage = () => {
  return (dispatch) => {
    dispatch(logoutUser());
    AsyncStorage.removeItem('yopko:auth');
    App();
  };
};

export const autoSignIn = () => {
  console.log('Dispatched');
  return (dispatch) => {
    dispatch(getAuth())
      .then(
        () => {
          startMainApp();
        }
      )
      .catch(
        () => { console.log("Can't get token!"); }
      );
  };
};
