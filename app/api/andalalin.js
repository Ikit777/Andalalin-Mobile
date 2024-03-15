import environments from "../constants/environments";
import axiosInstance from "../utils/axiosInstance";

const { ENDPOINTS } = environments;

export const andalalinPengajuan = async (
  accessToken,
  pengajuan,
  tambahan,
  andalalinRespone
) => {
  const formData = new FormData();

  tambahan.forEach((item) => {
    if (item.file != "") {
      if (item.tipe == "Pdf") {
        formData.append(item.persyaratan, {
          uri: item.file,
          name: "persyaratan.pdf",
          type: "application/pdf",
        });
      } else {
        formData.append(item.persyaratan, {
          uri: item.file,
          name: "persyaratan.docx",
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
      }
    }
  });

  formData.append("data", JSON.stringify(pengajuan));

  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "multipart/form-data",
  };
  const body = formData;
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_PENGAJUAN,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinPengajuanPerlalin = async (
  accessToken,
  pengajuan,
  tambahan,
  perlengkapan,
  andalalinRespone
) => {
  const formData = new FormData();

  tambahan.forEach((item) => {
    if (item.file != "") {
      if (item.tipe == "Pdf") {
        formData.append(item.persyaratan, {
          uri: item.file,
          name: "persyaratan.pdf",
          type: "application/pdf",
        });
      } else {
        formData.append(item.persyaratan, {
          uri: item.file,
          name: "persyaratan.docx",
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
      }
    }
  });

  perlengkapan.forEach((item) => {
    item.foto.map((foto) => {
      formData.append(item.id_perlengkapan, {
        uri: foto.uri,
        name: foto.name,
        type: "image/jpeg",
      });
    });
  });

  formData.append("data", JSON.stringify(pengajuan));

  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "multipart/form-data",
  };
  const body = formData;
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_PENGAJUAN_PERLALIN,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinGetById = async (id, accessToken, andalalinRespone) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.ANDALALIN_GET_BY_ID + "/" + id,
    headers: headers,
  });
  andalalinRespone(response);
};

export const andalalinGetperlengkapan = async (
  id,
  id_perlengkapan,
  accessToken,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url:
      ENDPOINTS.ANDALALIN_GET_PERLENGKAPAN + "/" + id + "/" + id_perlengkapan,
    headers: headers,
  });
  andalalinRespone(response);
};

export const andalalinGetDokumen = async (
  id,
  accessToken,
  dokumen,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.ANDALALIN_GET_DOKUMEN + "/" + id + "/" + dokumen,
    headers: headers,
  });
  andalalinRespone(response);
};

export const andalalinGetByIdUser = async (accessToken, andalalinRespone) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.ANDALALIN_GET_BY_ID_USER,
    headers: headers,
  });
  andalalinRespone(response);
};

export const andalalinCheckAdministrasi = async (
  accessToken,
  id,
  nomor,
  tanggal,
  data,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    nomor: nomor,
    tanggal: tanggal,
    data: data,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_CHECK_ADMINISTRASI + "/" + id,
    headers: headers,
    data: body,
  });

  andalalinRespone(response);
};

export const andalalinCheckAdministrasiPerlalin = async (
  accessToken,
  id,
  data,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    data: data,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_CHECK_ADMINISTRASI_PERLALIN + "/" + id,
    headers: headers,
    data: body,
  });

  andalalinRespone(response);
};

export const andalalinPembuatanSuratPernyataan = async (
  accessToken,
  id,
  data,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kewajiban: data,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_PEMBUATAN_SURAT_PERNYATAAN + "/" + id,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinPembuatanPenyusunDokumen = async (
  accessToken,
  id,
  data,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    penyusun: data,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_PEMBUATAN_PENYUSUN_DOKUMEN + "/" + id,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinPemeriksaanDokumenAndalalin = async (
  accessToken,
  id,
  status,
  pemeriksaan,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    status: status,
    pemeriksaan: pemeriksaan,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_PEMERIKSAAN_DOKUMEN_ANDALALIN + "/" + id,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinPembuatanSuratKeputusan = async (
  accessToken,
  id,
  data,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    nomor_keputusan: data.nomor_keputusan,
    nomor_lampiran: data.nomor_lampiran,
    nomor_kesanggupan: data.nomor_kesanggupan,
    tanggal_kesanggupan: data.tanggal_kesanggupan,
    nama_kadis: data.nama_kadis,
    nip_kadis: data.nip_kadis,
    data: data.keputusan,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_PEMBUATAN_SURAT_KEPUTUSAN + "/" + id,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinUpdatePersyaratan = async (
  accessToken,
  id,
  file,
  andalalinRespone
) => {
  const formData = new FormData();

  file.forEach((item) => {
    if (item.tipe == "Pdf") {
      formData.append(item.berkas, {
        uri: item.berkasFile,
        name: "berkas.pdf",
        type: "application/pdf",
      });
    } else {
      formData.append(item.berkas, {
        uri: item.berkasFile,
        name: "berkas.docx",
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
    }
  });

  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "multipart/form-data",
  };
  const body = formData;
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_UPDATE_PERSYARATAN + "/" + id,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinPilihPetugas = async (
  id,
  petugas,
  accessToken,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    id_petugas: petugas.id,
    nama_petugas: petugas.name,
    email_petugas: petugas.email,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_TAMBAH_PETUGAS + "/" + id,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinGantiPetugas = async (
  id,
  petugas,
  accessToken,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    id_petugas: petugas.id,
    nama_petugas: petugas.name,
    email_petugas: petugas.email,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_GANTI_PETUGAS + "/" + id,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinGetByTiketLevel2 = async (
  accessToken,
  status,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.ANDALALIN_GET_BY_TIKET_LEVEL_2 + "/" + status,
    headers: headers,
  });
  andalalinRespone(response);
};

export const andalalinSurveiLapangan = async (
  accessToken,
  id,
  id_perlengkapan,
  foto,
  lokasi,
  andalalinRespone
) => {
  const formData = new FormData();

  foto.forEach((item) => {
    formData.append(item.name, {
      uri: item.uri,
      name: item.name,
      type: "image/jpeg",
    });
  });

  formData.append("data", JSON.stringify(lokasi));

  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "multipart/form-data",
  };
  const body = formData;
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_SURVEI_LAPANGAN + "/" + id + "/" + id_perlengkapan,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinGetSurvei = async (
  accessToken,
  id,
  id_perlengkapan,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url:
      ENDPOINTS.ANDALALIN_GET_SURVEI_LAPANGAN +
      "/" +
      id +
      "/" +
      id_perlengkapan,
    headers: headers,
  });
  andalalinRespone(response);
};

export const andalalinGetAll = async (accessToken, andalalinRespone) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.ANDALALIN_GET_ALL,
    headers: headers,
  });
  andalalinRespone(response);
};

export const andalalinSimpanPemeriksaan = async (
  accessToken,
  id,
  hasil,
  catatan,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    hasil: hasil,
    catatan: catatan,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_SIMPAN_PEMERIKSAAN + "/" + id,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinChecklistKelengkapanAkhir = async (
  accessToken,
  id,
  data,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kelengkapan: data,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_CHECKLIST_KELENGKAPAN_AKHIR + "/" + id,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinGetByStatus = async (
  accessToken,
  status,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.ANDALALIN_GET_STATUS + "/" + status,
    headers: headers,
  });
  andalalinRespone(response);
};

export const andalalinSurveiMandiri = async (
  accessToken,
  foto,
  lokasi,
  andalalinRespone
) => {
  const formData = new FormData();

  foto.forEach((item) => {
    formData.append(item.name, {
      uri: item.uri,
      name: item.name,
      type: "image/jpeg",
    });
  });

  formData.append("data", JSON.stringify(lokasi));

  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "multipart/form-data",
  };
  const body = formData;
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.SURVEI_MANDIRI,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinGetSurveiMandiri = async (
  accessToken,
  id,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.DETAIL_SURVEI_MANDIRI + "/" + id,
    headers: headers,
  });
  andalalinRespone(response);
};

export const andalalinGetAllSurveiMandiriPetugas = async (
  accessToken,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.PETUGAS_SURVEI_MANDIRI,
    headers: headers,
  });
  andalalinRespone(response);
};

export const andalalinGetAllSurveiMandiri = async (
  accessToken,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.ALL_SURVEI_MANDIRI,
    headers: headers,
  });
  andalalinRespone(response);
};

export const andalalinTerimaSurveiMandiri = async (
  accessToken,
  id,
  keterangan,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    catatan: keterangan,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.TERIMA_SURVEI_MANDIRI + "/" + id,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinCekSurveiKepuasan = async (
  accessToken,
  id,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.CEK_SURVEI_KEPUASAN + "/" + id,
    headers: headers,
  });
  andalalinRespone(response);
};

export const andalalinHasilSurveiKepuasan = async (
  accessToken,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.HASIL_SURVEI_KEPUASAN,
    headers: headers,
  });
  andalalinRespone(response);
};

export const andalalinHasilSurveiKepuasanTertentu = async (
  accessToken,
  periode,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.HASIL_SURVEI_KEPUASAN_TERTENTU + "/" + periode,
    headers: headers,
  });
  andalalinRespone(response);
};

export const andalalinSurveiKepuasan = async (
  accessToken,
  id,
  kritik,
  data,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    saran: kritik,
    data: data,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.SURVEI_KEPUASAN + "/" + id,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinGetPermohonanPemasangan = async (
  accessToken,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.GET_PERMOHONAN_PEMASANGAN_PERLALIN,
    headers: headers,
  });
  andalalinRespone(response);
};

export const andalalinPemasangan = async (
  accessToken,
  id,
  id_perlengkapan,
  foto,
  lokasi,
  andalalinRespone
) => {
  const formData = new FormData();

  foto.forEach((item) => {
    formData.append(item.name, {
      uri: item.uri,
      name: item.name,
      type: "image/jpeg",
    });
  });

  formData.append("data", JSON.stringify(lokasi));

  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "multipart/form-data",
  };
  const body = formData;
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.PEMASANGAN_PERLALIN + "/" + id + "/" + id_perlengkapan,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinGetPemasangan = async (
  accessToken,
  id,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.GET_PEMASANGAN_PERLALIN + "/" + id,
    headers: headers,
  });
  andalalinRespone(response);
};

export const andalalinTolakPermohonan = async (
  accessToken,
  id,
  pertimbangan,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    pertimbangan: pertimbangan,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_TOLAK_PERMOHONAN + "/" + id,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinTundaPermohonan = async (
  accessToken,
  id,
  pertimbangan,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    pertimbangan: pertimbangan,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_TUNDA_PERMOHONAN + "/" + id,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinTundaPemasangan = async (
  accessToken,
  id,
  pertimbangan,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    pertimbangan: pertimbangan,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_TUNDA_PEMASANGAN + "/" + id,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinBatalkanPermohonan = async (
  accessToken,
  id,
  pertimbangan,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    pertimbangan: pertimbangan,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_BATAL_PERMOHONAN + "/" + id,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinLanjutkanPemasangan = async (
  accessToken,
  id,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_LANJUTKAN_PEMASANGAN + "/" + id,
    headers: headers,
  });
  andalalinRespone(response);
};

export const andalalinPengecekanPerlengkapan = async (
  accessToken,
  id,
  data,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    data: data,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_PENGECEKAN_PERLENGKAPAN + "/" + id,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinLanjutkanPermohonan = async (
  accessToken,
  id,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_LANJUTKAN_PERMOHONAN + "/" + id,
    headers: headers,
  });
  andalalinRespone(response);
};

export const andalalinUploadDokumen = async (
  accessToken,
  id,
  file,
  dokumen,
  andalalinRespone
) => {
  const formData = new FormData();

  file.forEach((item) => {
    if (item.file != "") {
      if (item.tipe == "application/pdf") {
        formData.append(item.dokumen, {
          uri: item.file,
          name: "persyaratan.pdf",
          type: item.tipe,
        });
      } else {
        formData.append(item.dokumen, {
          uri: item.file,
          name: "persyaratan.docx",
          type: item.tipe,
        });
      }
    }
  });

  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "multipart/form-data",
  };
  const body = formData;
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_UPLOAD_DOKUMEN + "/" + id + "/" + dokumen,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinPerbaruiLokasi = async (
  accessToken,
  id,
  lokasi,
  latitude,
  longtitude,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    lokasi: lokasi,
    latitude: latitude,
    longtitude: longtitude,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_PERBARUI_LOKASI + "/" + id,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinPembuatanSuratPermohonan = async (
  accessToken,
  data,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    bangkitan: data.bangkitan,
    pemohon: data.pemohon,
    nama: data.nama,
    jabatan: data.jabatan,
    jenis: data.jenis,
    proyek: data.proyek,
    jalan: data.jalan,
    kelurahan: data.kelurahan,
    kecamatan: data.kecamatan,
    kabupaten: data.kabupaten,
    provinsi: data.provinsi,
    status: data.status,
    pengembang: data.pengembang,
    konsultan: data.konsultan,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_PEMBUATAN_SURAT_PERMOHONAN,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinCekKesesuaianSubstansiTeknis = async (
  accessToken,
  id,
  administrasi,
  data,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    administrasi: administrasi,
    pemeriksaan: data,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_KESESUAIAN_SUBSTANSI_TEKNIS + "/" + id,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinPembuatanBeritaAcaraPembahasan = async (
  accessToken,
  id,
  foto,
  data,
  andalalinRespone
) => {
  const formData = new FormData();

  foto.forEach((item) => {
    formData.append(item.name, {
      uri: item.uri,
      name: item.name,
      type: "image/jpeg",
    });
  });

  formData.append("data", JSON.stringify(data));

  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "multipart/form-data",
  };
  const body = formData;
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_PEMBUATAN_BERITA_ACARA_PEMBAHASAN + "/" + id,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinBeritaAcaraPeninjauan = async (
  accessToken,
  id,
  nomor,
  tanggal,
  file,
  andalalinRespone
) => {
  const formData = new FormData();
  formData.append("Berita acara peninjauan", {
    uri: file,
    name: "BAPL.pdf",
    type: "application/pdf",
  });
  formData.append("nomor", nomor);
  formData.append("tanggal", tanggal);
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "multipart/form-data",
  };
  const body = formData;
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_BERITA_ACARA_PENINJAUAN + "/" + id,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};
