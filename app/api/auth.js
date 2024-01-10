import environments from "../constants/environments";
import { store } from "../utils/local-storage";
import axiosInstance from "../utils/axiosInstance";

const { ENDPOINTS } = environments;

export const authLogin = async (email, password, token, authRespone) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    email: email,
    password: password,
    push_token: token,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.AUTH_LOGIN,
    headers: headers,
    data: body,
  });
  authRespone(response);
};

export const authRegister = async (
  nama,
  email,
  nomor,
  password,
  confirmPassword,
  authRespone
) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    email: email,
    name: nama,
    nomor: nomor,
    password: password,
    passwordConfirm: confirmPassword,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.AUTH_REGISTER,
    headers: headers,
    data: body,
  });
  authRespone(response);
};

export const authVerification = async (code, authRespone) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.AUTH_VERIFICATION + "/" + code,
    headers: headers,
  });
  authRespone(response);
};

export const authResendVerication = async (email, authRespone) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    email: email,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.AUTH_RESEND_VERIFICATION,
    headers: headers,
    data: body,
  });
  authRespone(response);
};

export const authForgotPassword = async (email, authRespone) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    email: email,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.AUTH_FORGOT_PASSWORD,
    headers: headers,
    data: body,
  });
  authRespone(response);
};

export const authResetPassword = async (
  password,
  passwordConfirm,
  code,
  authRespone
) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    password: password,
    passwordConfirm: passwordConfirm,
  });
  const response = await axiosInstance({
    method: "patch",
    url: ENDPOINTS.AUTH_RESET_PASSWORD + "/" + code,
    headers: headers,
    data: body,
  });
  authRespone(response);
};

export const authLogout = async (accessToken, authRespone) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.AUTH_LOGOUT,
    headers: headers,
  });
  authRespone(response);
};

export const authRefreshToken = async (user, authRespone) => {
  const headers = {
    Authorization: "Bearer " + user.user.refresh_token,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.AUTH_REFRESH_TOKEN,
    headers: headers,
  });
  if (response.status === 200) {
    const newAuthState = {
      access_token: response.data.data.access_token,
      refresh_token: response.data.data.refresh_token,
      id: user.user.id,
      nama: user.user.nama,
      email: user.user.email,
      nomor: user.user.nomor,
      role: user.user.role,
      photo: user.user.photo,
      nip: user.user.nip,
    };
    Object.assign(user.user, newAuthState);
    user.setUser(newAuthState);
    store("authState", newAuthState);
  } else if (response.status === 424) {
    user.setSession(true);
  }
  authRespone(response);
};
