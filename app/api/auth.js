import environments from "../constants/environments";
import { store } from "../utils/local-storage";
const { ENDPOINTS } = environments;

export const authLogin = async (email, password, token, authRespone) => {
  const response = await fetch(ENDPOINTS.AUTH_LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      push_token: token
    }),
  });
  authRespone(response);
};

export const authRegister = async (
  nama,
  email,
  password,
  confirmPassword,
  authRespone
) => {
  const response = await fetch(ENDPOINTS.AUTH_REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      name: nama,
      password: password,
      passwordConfirm: confirmPassword,
    }),
  });
  authRespone(response);
};

export const authVerification = async (code, authRespone) => {
  const response = await fetch(ENDPOINTS.AUTH_VERIFICATION + "/" + code, {
    method: "GET",
  });
  authRespone(response);
};

export const authResendVerication = async (email, authRespone) => {
  const response = await fetch(ENDPOINTS.AUTH_RESEND_VERIFICATION, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
  authRespone(response);
};

export const authForgotPassword = async (email, authRespone) => {
  const response = await fetch(ENDPOINTS.AUTH_FORGOT_PASSWORD, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
  authRespone(response);
};

export const authResetPassword = async (
  password,
  passwordConfirm,
  code,
  authRespone
) => {
  const response = await fetch(ENDPOINTS.AUTH_RESET_PASSWORD + "/" + code, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      passwordConfirm: passwordConfirm,
    }),
  });
  authRespone(response);
};

export const authLogout = async (accessToken, authRespone) => {
  const response = await fetch(ENDPOINTS.AUTH_LOGOUT, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  authRespone(response);
};

export const authRefreshToken = async (user, authRespone) => {
  const response = await fetch(ENDPOINTS.AUTH_REFRESH_TOKEN, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + user.user.refresh_token,
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  if (response.status === 200) {
    const newAuthState = {
      access_token: result.data.access_token,
      refresh_token: result.data.refresh_token,
      id: user.user.id,
      nama: user.user.nama,
      email: user.user.email,
      role: user.role,
      photo: user.user.photo,
    };
    Object.assign(user.user, newAuthState);
    user.setUser(newAuthState);
    store("authState", newAuthState);
  } else if (response.status === 424) {
    user.setSession(true);
  }
  authRespone(response);
};
