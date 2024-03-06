import axios from "axios";
import { loginFailure, loginStart, loginSuccess, logout as logoutAction  } from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/login", user);
    
    if (res.data.isAdmin) {
      dispatch(loginSuccess(res.data));
    } else {
      alert("Only access to admin is allowed."); // Display an alert for non-admin users
    }
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch) => {
  // You may need to make an API call to your server to perform logout actions
  // For simplicity, assuming you clear the user session on the client-side only
  dispatch(logoutAction());
};