import environments from "../constants/environments";

const { ENDPOINTS } = environments;

export const andalalinPengajuan = async (
  accessToken,
  pengajuan,
  file,
  authRespone
) => {
  const formData = new FormData();
  formData.append("ktp", {
    uri: file.ktp,
    name: 'ktp.pdf',
    type: "application/pdf",
  });
  formData.append("akta", {
    uri: file.akta,
    name: 'akta pendirian bangunan.pdf',
    type: "application/pdf",
  });
  formData.append("sk", {
    uri: file.surat,
    name: 'surat kuasa.pdf',
    type: "application/pdf",
  });
  formData.append("data", JSON.stringify(pengajuan));

  const response = await fetch(ENDPOINTS.ANDALALIN_PENGAJUAN, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  authRespone(response);
};

export const andalalinGetById = async (id, accessToken, authRespone) => {
  const response = await fetch(ENDPOINTS.ANDALALIN_GET_BY_ID + "/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  authRespone(response);
};

export const andalalinGetByIdUser = async (accessToken, authRespone) => {
  const response = await fetch(ENDPOINTS.ANDALALIN_GET_BY_ID_USER, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  authRespone(response);
};

export const andalalinGetByTiketLevel1 = async (accessToken, authRespone) => {
  const response = await fetch(ENDPOINTS.ANDALALIN_GET_BY_TIKET_LEVEL_1, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  authRespone(response);
};
