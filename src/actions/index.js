import {auth, provider} from '../firebase';

export const signInAPI = () => {
  return (dispatch) => {
    auth
      .signInWithPopup(provider)
      .then((payload) => {
        dispatch({
          type: 'SET_USER',
          user: payload.user,
        });
      })
      .catch((error) => alert(error.message));
  };
};