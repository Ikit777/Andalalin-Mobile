import environments from "../constants/environments";

const { ENDPOINTS } = environments;

export const userMe = async (accessToken, userRespone) => {
  const response = await fetch(ENDPOINTS.USER_ME, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
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

  const response = await fetch(ENDPOINTS.USER_UPDATE_PHOTO, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  userRespone(response);
};

export const notifikasiByIdUser = async (accessToken, userRespone) => {
  const response = await fetch(ENDPOINTS.USER_NOTIFIKASI, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  userRespone(response);
};

export const clearnotifikasiByIdUser = async (accessToken, userRespone) => {
  const response = await fetch(ENDPOINTS.USER_CLEAR_NOTIFIKASI, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  userRespone(response);
};

export const userPetugas = async (accessToken, userRespone) => {
  const response = await fetch(ENDPOINTS.USER_PETUGAS, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  userRespone(response);
};

export const tambahUser = async (accessToken, user, userRespone) => {
  const response = await fetch(ENDPOINTS.TAMBAH_USER, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      name: user.nama,
      role: user.peran,
      password: user.password,
    }),
  });
  userRespone(response);
};

export const userAll = async (accessToken, userRespone) => {
  const response = await fetch(ENDPOINTS.GET_ALL_USER, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  userRespone(response);
};

export const userDelete = async (accessToken, user, userRespone) => {
  const response = await fetch(ENDPOINTS.DELETE_USER, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: user.id,
      role: user.role,
    }),
  });
  userRespone(response);
};

export const health = async (userRespone) => {
  const response = await fetch(ENDPOINTS.CEK_SERVER, {
    method: "GET",
  });
  userRespone(response);
};
