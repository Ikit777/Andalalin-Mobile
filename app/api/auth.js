import environments from "../constants/environments";
import { get, store } from "../utils/local-storage";
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
  const body = JSON.stringify({
    status: "Mobile",
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.AUTH_LOGOUT,
    headers: headers,
    data: body,
  });
  authRespone(response);
};

export const authRefreshToken = async (user, authRespone) => {
  const value = await get("authState");
  const headers = {
    Authorization: "Bearer " + value.refresh_token,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    status: "Mobile",
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.AUTH_REFRESH_TOKEN,
    headers: headers,
    data: body,
  });
  if (response.status === 200) {
    const newAuthState = {
      access_token: response.data.data.access_token,
      refresh_token: response.data.data.refresh_token,
      id: value.id,
      nama: value.nama,
      email: value.email,
      nomor: value.nomor,
      role: value.role,
      photo: value.photo,
      nip: value.nip,
      push_token: value.push_token,
    };
    store("authState", newAuthState);
    user.setUser(newAuthState);
  } else {
    user.setSession(true);
  }
  authRespone(response);
};
