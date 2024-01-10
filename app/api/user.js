import environments from "../constants/environments";
import axiosInstance from "../utils/axiosInstance";

const { ENDPOINTS } = environments;

export const userMe = async (accessToken, userRespone) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };

  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.USER_ME,
    headers: headers,
  });
  userRespone(response);
};

export const userUpdatePhoto = async (file, accessToken, userRespone) => {
  const formData = new FormData();
  formData.append("profile", {
    uri: file,
    name: "profile.jpg",
    type: "image/jpeg",
  });

  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "multipart/form-data",
  };
  const body = formData;

  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.USER_UPDATE_PHOTO,
    headers: headers,
    data: body,
  });
  userRespone(response);
};

export const notifikasiByIdUser = async (accessToken, userRespone) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.USER_NOTIFIKASI,
    headers: headers,
  });
  userRespone(response);
};

export const clearnotifikasiByIdUser = async (accessToken, userRespone) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "delete",
    url: ENDPOINTS.USER_CLEAR_NOTIFIKASI,
    headers: headers,
  });
  userRespone(response);
};

export const userPetugas = async (accessToken, userRespone) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.USER_PETUGAS,
    headers: headers,
  });
  userRespone(response);
};

export const tambahUser = async (accessToken, user, userRespone) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    email: user.email,
    name: user.nama,
    nomor: user.nomor,
    role: user.peran,
    nip: user.nip,
    password: user.password,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.TAMBAH_USER,
    headers: headers,
    data: body,
  });
  userRespone(response);
};

export const userAll = async (accessToken, userRespone) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.GET_ALL_USER,
    headers: headers,
  });
  userRespone(response);
};

export const userDelete = async (accessToken, user, userRespone) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    id: user.id,
    role: user.role,
  });

  const response = await axiosInstance({
    method: "delete",
    url: ENDPOINTS.DELETE_USER,
    headers: headers,
    data: body,
  });
  userRespone(response);
};

export const health = async (userRespone) => {
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.CEK_SERVER,
  });
  userRespone(response);
};

export const editUser = async (accessToken, user, userRespone) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    email: user.email,
    name: user.nama,
    nip: user.nip,
    nomor: user.nomor,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.USER_EDIT_AKUN,
    headers: headers,
    data: body,
  });
  userRespone(response);
};
