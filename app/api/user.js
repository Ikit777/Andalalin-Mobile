import environments from "../constants/environments";

const { ENDPOINTS } = environments;

export const userUpdatePhoto = async (file, accessToken, authRespone) => {
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
  authRespone(response);
};

export const notifikasiByIdUser = async (accessToken, authRespone) => {
  const response = await fetch(ENDPOINTS.USER_NOTIFIKASI, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  authRespone(response);
};

export const clearnotifikasiByIdUser = async (accessToken, authRespone) => {
  const response = await fetch(ENDPOINTS.USER_CLEAR_NOTIFIKASI, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  authRespone(response);
};
