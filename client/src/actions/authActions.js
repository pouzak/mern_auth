import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../actions/types";

//check token
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res => dispatch({ type: USER_LOADED, payload: res.data }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//register user
export const register = body => dispatch => {
  const config = {
    headers: {
      "Contet-type": "application/json"
    }
  };

  // const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/users", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: REGISTER_FAIL
      });
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
    });
};

//login
export const login = body => dispatch => {
  const config = {
    headers: {
      "Contet-type": "application/json"
    }
  };

  axios
    .post("/api/auth", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: LOGIN_FAIL
      });
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
    });
};

//logout
export const logout = () => dispatch => {
  // return {
  //   type: LOGOUT_SUCCESS
  // };
  dispatch({
    type: LOGOUT_SUCCESS
  });
};

export const tokenConfig = getState => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Contet-type": "application/json"
    }
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
