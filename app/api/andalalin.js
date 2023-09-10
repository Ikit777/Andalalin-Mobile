import environments from "../constants/environments";

const { ENDPOINTS } = environments;

export const andalalinPengajuan = async (
  accessToken,
  pengajuan,
  file,
  andalalinRespone
) => {
  const formData = new FormData();
  formData.append("ktp", {
    uri: file.ktp,
    name: "ktp.pdf",
    type: "application/pdf",
  });
  formData.append("apb", {
    uri: file.akta,
    name: "akta pendirian bangunan.pdf",
    type: "application/pdf",
  });
  formData.append("sk", {
    uri: file.surat,
    name: "surat kuasa.pdf",
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
  andalalinRespone(response);
};

export const andalalinGetById = async (id, accessToken, andalalinRespone) => {
  const response = await fetch(ENDPOINTS.ANDALALIN_GET_BY_ID + "/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  andalalinRespone(response);
};

export const andalalinGetByIdUser = async (accessToken, andalalinRespone) => {
  const response = await fetch(ENDPOINTS.ANDALALIN_GET_BY_ID_USER, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  andalalinRespone(response);
};

export const andalalinGetByTiketLevel1 = async (accessToken, andalalinRespone) => {
  const response = await fetch(ENDPOINTS.ANDALALIN_GET_BY_TIKET_LEVEL_1, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  andalalinRespone(response);
};

export const andalalinPersyaratanTerpenuhi = async (
  accessToken,
  id,
  andalalinRespone
) => {
  const response = await fetch(
    ENDPOINTS.ANDALALIN_PERSYARATAN_TERPENUHI + "/" + id,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    }
  );
  andalalinRespone(response);
};

export const andalalinPersyaratanTidakSesuai = async (
  accessToken,
  id,
  persyaratan,
  andalalinRespone
) => {
  const response = await fetch(
    ENDPOINTS.ANDALALIN_PERSYARATAN_TIDAK_SESUAI + "/" + id,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        persyaratan: persyaratan,
      }),
    }
  );
  andalalinRespone(response);
};

export const andalalinUpdatePersyaratan = async (
  accessToken,
  id,
  file,
  andalalinRespone
) => {
  const formData = new FormData();

  file.ktp != "Kosong"
    ? formData.append("ktp", {
        uri: file.ktp,
        name: "ktp.pdf",
        type: "application/pdf",
      })
    : formData.append("ktp");

  file.akta != "Kosong"
    ? formData.append("apb", {
        uri: file.akta,
        name: "akta pendirian bangunan.pdf",
        type: "application/pdf",
      })
    : formData.append("apb");

  file.surat != "Kosong"
    ? formData.append("sk", {
        uri: file.surat,
        name: "surat kuasa.pdf",
        type: "application/pdf",
      })
    : formData.append("sk");

  const response = await fetch(
    ENDPOINTS.ANDALALIN_UPDATE_PERSYARATAN + "/" + id,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    }
  );
  andalalinRespone(response);
};

export const andalalinPilihPetugas = async (
  id,
  petugas,
  accessToken,
  andalalinRespone
) => {
  const response = await fetch(ENDPOINTS.ANDALALIN_TAMBAH_PETUGAS + "/" + id, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_petugas: petugas.id,
      nama_petugas: petugas.name,
      email_petugas: petugas.email,
    }),
  });
  andalalinRespone(response);
};

export const andalalinGantiPetugas = async (
  id,
  petugas,
  accessToken,
  andalalinRespone
) => {
  const response = await fetch(ENDPOINTS.ANDALALIN_GANTI_PETUGAS + "/" + id, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_petugas: petugas.id,
      nama_petugas: petugas.name,
      email_petugas: petugas.email,
    }),
  });
  andalalinRespone(response);
};

export const andalalinGetByTiketLevel2 = async (
  accessToken,
  status,
  andalalinRespone
) => {
  const response = await fetch(
    ENDPOINTS.ANDALALIN_GET_BY_TIKET_LEVEL_2 + "/" + status,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    }
  );
  andalalinRespone(response);
};

export const andalalinSurveiLapangan = async (
  accessToken,
  id,
  foto,
  lokasi,
  andalalinRespone
) => {
  const formData = new FormData();

  foto.fotoSurvei1 != "Kosong"
    ? formData.append("foto1", {
        uri: foto.fotoSurvei1,
        name: "foto1.jpg",
        type: "image/jpeg",
      })
    : formData.append("foto1");

  foto.fotoSurvei2 != "Kosong"
    ? formData.append("foto2", {
        uri: foto.fotoSurvei2,
        name: "foto2.jpg",
        type: "image/jpeg",
      })
    : formData.append("foto2");

  foto.fotoSurvei3 != "Kosong"
    ? formData.append("foto3", {
        uri: foto.fotoSurvei3,
        name: "foto3.jpg",
        type: "image/jpeg",
      })
    : formData.append("foto3");

  formData.append("data", JSON.stringify(lokasi));

  const response = await fetch(ENDPOINTS.ANDALALIN_SURVEI_LAPANGAN + "/" + id, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  andalalinRespone(response);
};

export const andalalinGetAllSurvei = async (accessToken, andalalinRespone) => {
  const response = await fetch(ENDPOINTS.ANDALALIN_GET_ALL_SURVEI_LAPANGAN, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  andalalinRespone(response);
};

export const andalalinGetSurvei = async (accessToken, id, andalalinRespone) => {
  const response = await fetch(
    ENDPOINTS.ANDALALIN_GET_SURVEI_LAPANGAN + "/" + id,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    }
  );
  andalalinRespone(response);
};

export const andalalinLaporanBAP = async (
  accessToken,
  id,
  file,
  bap,
  andalalinRespone
) => {
  const formData = new FormData();

  formData.append("bap", {
    uri: file,
    name: "bap.pdf",
    type: "application/pdf",
  });

  formData.append("data", JSON.stringify(bap));

  const response = await fetch(ENDPOINTS.ANDALALIN_LAPORAN_BAP + "/" + id, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  andalalinRespone(response);
};

export const andalalinGetAll = async (accessToken, andalalinRespone) => {
  const response = await fetch(ENDPOINTS.ANDALALIN_GET_ALL, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  andalalinRespone(response);
};

export const andalalinSimpanPersetujuan = async (
  accessToken,
  id,
  persetujuan,
  andalalinRespone
) => {
  const response = await fetch(
    ENDPOINTS.ANDALALIN_SIMPAN_PERSETUJUAN + "/" + id,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        persetujuan: persetujuan.dokumen,
        keterangan: persetujuan.keterangan,
      }),
    }
  );
  andalalinRespone(response);
};

export const andalalinSimpanSK = async (accessToken, id, file, andalalinRespone) => {
  const formData = new FormData();
  formData.append("sk", {
    uri: file,
    name: "surat keputusan.pdf",
    type: "application/pdf",
  });

  const response = await fetch(ENDPOINTS.ANDALALIN_SIMPAN_SK + "/" + id, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  andalalinRespone(response);
};

export const andalalinGetByStatus = async (
  accessToken,
  status,
  andalalinRespone
) => {
  const response = await fetch(ENDPOINTS.ANDALALIN_GET_STATUS + "/" + status, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  andalalinRespone(response);
};

export const andalalinUsulanTindakan = async (
  accessToken,
  id,
  tindakan,
  andalalinRespone
) => {
  const response = await fetch(ENDPOINTS.ANDALALIN_USULAN_TINDAKAN + "/" + id, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pertimbangan: tindakan.pertimbangan,
      keterangan: tindakan.keterangan,
    }),
  });
  andalalinRespone(response);
};

export const andalalinGetUsulanTindakan = async (accessToken, andalalinRespone) => {
  const response = await fetch(ENDPOINTS.ANDALALIN_GET_USULAN_TINDAKAN, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  andalalinRespone(response);
};

export const andalalinGetDetailUsulan = async (
  accessToken,
  id,
  andalalinRespone
) => {
  const response = await fetch(
    ENDPOINTS.ANDALALIN_DETAIL_USULAN_TINDAKAN + "/" + id,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    }
  );
  andalalinRespone(response);
};

export const andalalinTindakan = async (
  accessToken,
  id,
  tindakan,
  andalalinRespone
) => {
  const response = await fetch(
    ENDPOINTS.ANDALALIN_TINDAKAN_USULAN + "/" + id + "/" + tindakan,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    }
  );
  andalalinRespone(response);
};

export const andalalinHapusUsulan = async (accessToken, id, andalalinRespone) => {
  const response = await fetch(
    ENDPOINTS.ANDALALIN_HAPUS_USULAN_TINDAKAN + "/" + id,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    }
  );
  andalalinRespone(response);
};

export const andalalinGetAllByTiketLevel2 = async (
  accessToken,
  status,
  andalalinRespone
) => {
  const response = await fetch(
    ENDPOINTS.ANDALALIN_GET_ALL_BY_TIKET_LEVEL2 + "/" + status,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    }
  );
  andalalinRespone(response);
};