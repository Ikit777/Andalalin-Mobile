import environments from "../constants/environments";

const { ENDPOINTS } = environments;

export const masterAndalalin = async (masterRespone) => {
  const response = await fetch(ENDPOINTS.DATA_MASTER_ANDALALIN, {
    method: "GET",
  });
  masterRespone(response);
};

export const checkMaster = async (masterRespone) => {
  const response = await fetch(ENDPOINTS.CEK_MASTER, {
    method: "GET",
  });
  masterRespone(response);
};

export const masterTambahLokasiPengambilan = async (accessToken, id, lokasi, masterRespone) => {
  const response = await fetch(ENDPOINTS.TAMBAH_LOKASI_PENGAMBILAN+ "/" + id + "/" + lokasi, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  
  masterRespone(response);
};

export const masterHapusLokasiPengambilan = async (accessToken, id, lokasi, masterRespone) => {
  const response = await fetch(ENDPOINTS.HAPUS_LOKASI_PENGAMBILAN+ "/" + id + "/" + lokasi, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  
  masterRespone(response);
};

export const masterEditLokasiPengambilan = async (accessToken, id, lokasi, lokasi_baru, masterRespone) => {
  const response = await fetch(ENDPOINTS.EDIT_LOKASI_PENGAMBILAN+ "/" + id + "/" + lokasi + "/" + lokasi_baru, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  
  masterRespone(response);
};

export const masterTambahKategori = async (accessToken, id, kategori, masterRespone) => {
  const response = await fetch(ENDPOINTS.TAMBAH_KATEGORI+ "/" + id + "/" + kategori, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  
  masterRespone(response);
};

export const masterHapusKategori = async (accessToken, id, kategori, masterRespone) => {
  const response = await fetch(ENDPOINTS.HAPUS_KATEGORI+ "/" + id + "/" + kategori, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  
  masterRespone(response);
};

export const masterEditKategori = async (accessToken, id, kategori, kategori_baru, masterRespone) => {
  const response = await fetch(ENDPOINTS.EDIT_KATEGORI+ "/" + id + "/" + kategori + "/" + kategori_baru, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  
  masterRespone(response);
};

export const masterTambahRencanaPembangunan = async (accessToken, id, kategori, rencana, masterRespone) => {
  const response = await fetch(ENDPOINTS.TAMBAH_RENCANA_PEMBANGUNAN+ "/" + id + "/" + kategori + "/" + rencana, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  
  masterRespone(response);
};

export const masterHapusRencanaPembangunan = async (accessToken, id, kategori, rencana, masterRespone) => {
  const response = await fetch(ENDPOINTS.HAPUS_RENCANA_PEMBANGUNAN+ "/" + id + "/" + kategori + "/" + rencana, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  
  masterRespone(response);
};

export const masterEditRencanaPembangunan = async (accessToken, id, kategori, rencana, rencana_baru, masterRespone) => {
  const response = await fetch(ENDPOINTS.EDIT_RENCANA_PEMBANGUNAN+ "/" + id + "/" + kategori + "/" + rencana + "/" + rencana_baru, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  
  masterRespone(response);
};

export const masterTambahKategoriPerlalin = async (accessToken, id, kategori, masterRespone) => {
  const response = await fetch(ENDPOINTS.TAMBAH_KATEGORI_PERLALIN+ "/" + id + "/" + kategori, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  
  masterRespone(response);
};

export const masterHapusKategoriPerlalin = async (accessToken, id, kategori, masterRespone) => {
  const response = await fetch(ENDPOINTS.HAPUS_KATEGORI_PERLALIN+ "/" + id + "/" + kategori, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  
  masterRespone(response);
};

export const masterEditKategoriPerlalin = async (accessToken, id, kategori, kategori_baru, masterRespone) => {
  const response = await fetch(ENDPOINTS.EDIT_KATEGORI_PERLALIN+ "/" + id + "/" + kategori + "/" + kategori_baru, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  
  masterRespone(response);
};

export const masterTambahPerlalin = async (accessToken, id, kategori, perlengkapan, file, masterRespone) => {
  const formData = new FormData();
  formData.append("perlengkapan", {
    uri: file,
    name: "perlengkapan.jpg",
    type: "image/jpeg",
  })
  const response = await fetch(ENDPOINTS.TAMBAH_PERLALIN+ "/" + id + "/" + kategori + "/" + perlengkapan, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  
  masterRespone(response);
}

export const masterHapusPerlalin = async (accessToken, id, kategori, perlengkapan, masterRespone) => {
  const response = await fetch(ENDPOINTS.HAPUS_PERLALIN+ "/" + id + "/" + kategori + "/" + perlengkapan, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  
  masterRespone(response);
}

export const masterEditPerlalin = async (accessToken, id, kategori, perlengkapan, newPerlengkapan, file, masterRespone) => {
  const formData = new FormData();
  file != "Kosong"
    ? formData.append("perlengkapan", {
        uri: file,
        name: "perlengkapan.jpg",
        type: "image/jpeg",
      })
    : formData.append("perlengkapan");
  const response = await fetch(ENDPOINTS.EDIT_PERLALIN+ "/" + id + "/" + kategori + "/" + perlengkapan + "/" + newPerlengkapan, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  
  masterRespone(response);
}

export const masterTambahPersyaratanAndalalin = async (accessToken, id, persyaratan, keterangan, masterRespone) => {
  const response = await fetch(ENDPOINTS.TAMBAH_PERSYARATAN_ANDALALIN+ "/" + id, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      persyaratan: persyaratan,
      keterangan: keterangan,
    }),
  });
  
  masterRespone(response);
};

export const masterHapusPersyaratanAndalalin = async (accessToken, id, persyaratan, masterRespone) => {
  const response = await fetch(ENDPOINTS.HAPUS_PERSYARATAN_ANDALALIN+ "/" + id + "/" + persyaratan, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  
  masterRespone(response);
};

export const masterEditPersyaratanAndalalin = async (accessToken, id, pilih, persyaratan, keterangan, masterRespone) => {
  const response = await fetch(ENDPOINTS.EDIT_PERSYARATAN_ANDALALIN+ "/" + id + "/" + pilih, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      persyaratan: persyaratan,
      keterangan: keterangan,
    }),
  });
  
  masterRespone(response);
};

export const masterTambahPersyaratanPerlalin = async (accessToken, id, persyaratan, keterangan, masterRespone) => {
  const response = await fetch(ENDPOINTS.TAMBAH_PERSYARATAN_PERLALIN+ "/" + id, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      persyaratan: persyaratan,
      keterangan: keterangan,
    }),
  });
  
  masterRespone(response);
};

export const masterHapusPersyaratanPerlalin = async (accessToken, id, persyaratan, masterRespone) => {
  const response = await fetch(ENDPOINTS.HAPUS_PERSYARATAN_PERLALIN+ "/" + id + "/" + persyaratan, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  
  masterRespone(response);
};

export const masterEditPersyaratanPerlalin = async (accessToken, id, pilih, persyaratan, keterangan, masterRespone) => {
  const response = await fetch(ENDPOINTS.EDIT_PERSYARATAN_PERLALIN+ "/" + id + "/" + pilih, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      persyaratan: persyaratan,
      keterangan: keterangan,
    }),
  });
  
  masterRespone(response);
};
