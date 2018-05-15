import {
  PASSWORD_CHANGED,
  EMAIL_CHANGED,
  LOAD_SPINNER,
  SET_AUTH,
  LOGIN_USER_FAILURE,
  LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  user_type: '',
  password: '',
  auth_token: '',
  error: '',
  loading: false
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER_FAILURE:
      return { ...state, password: '', loading: false, error: action.payload.error };
    case SET_AUTH: {
      const { username, auth_token, usertype } = action.payload;
      const newState = { ...state, ...INITIAL_STATE, username, auth_token, usertype };
      return newState;
    }
    case LOAD_SPINNER:
      return { ...state, loading: true };
    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
