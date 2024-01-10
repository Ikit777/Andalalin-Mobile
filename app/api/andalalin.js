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
      if (item.tipe == "Pdf"){
        formData.append(item.persyaratan, {
          uri: item.file,
          name: "persyaratan.pdf",
          type: "application/pdf",
        });
      }else{
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
  andalalinRespone
) => {
  const formData = new FormData();

  tambahan.forEach((item) => {
    if (item.file != "") {
      if (item.tipe == "Pdf"){
        formData.append(item.persyaratan, {
          uri: item.file,
          name: "persyaratan.pdf",
          type: "application/pdf",
        });
      }else{
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
    nomor_keputusan: data.keputusan,
    nomor_lampiran: data.lampiran,
    nomor_kesanggupan: data.kesanggupan,
    tanggal_kesanggupan: data.tanggal,
    nama_kadis: data.nama,
    nip_kadis: data.nip,
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
    if (item.tipe == "Pdf"){
      formData.append(item.berkas, {
        uri: item.berkasFile,
        name: "berkas.pdf",
        type: "application/pdf",
      });
    }else{
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

  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "multipart/form-data",
  };
  const body = formData;
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_SURVEI_LAPANGAN + "/" + id,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinGetAllSurvei = async (accessToken, andalalinRespone) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.ANDALALIN_GET_ALL_SURVEI_LAPANGAN,
    headers: headers,
  });
  andalalinRespone(response);
};

export const andalalinGetSurvei = async (accessToken, id, andalalinRespone) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.ANDALALIN_GET_SURVEI_LAPANGAN + "/" + id,
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

export const andalalinSimpanKeputusan = async (
  accessToken,
  id,
  keputusan,
  pertimbangan,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    keputusan: keputusan,
    pertimbangan: pertimbangan,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.PERLALIN_KEPUTUSAN_HASIL + "/" + id,
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

export const andalalinUsulanTindakan = async (
  accessToken,
  id,
  tindakan,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    pertimbangan: tindakan.pertimbangan,
    keterangan: tindakan.keterangan,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_USULAN_TINDAKAN + "/" + id,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinGetUsulanTindakan = async (
  accessToken,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.ANDALALIN_GET_USULAN_TINDAKAN,
    headers: headers,
  });
  andalalinRespone(response);
};

export const andalalinGetDetailUsulan = async (
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
    url: ENDPOINTS.ANDALALIN_DETAIL_USULAN_TINDAKAN + "/" + id,
    headers: headers,
  });
  andalalinRespone(response);
};

export const andalalinTindakan = async (
  accessToken,
  id,
  tindakan,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_TINDAKAN_USULAN + "/" + id + "/" + tindakan,
    headers: headers,
  });
  andalalinRespone(response);
};

export const andalalinHapusUsulan = async (
  accessToken,
  id,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "delete",
    url: ENDPOINTS.ANDALALIN_HAPUS_USULAN_TINDAKAN + "/" + id,
    headers: headers,
  });
  andalalinRespone(response);
};

export const andalalinSimpanLaporanSurvei = async (
  accessToken,
  id,
  file,
  andalalinRespone
) => {
  const formData = new FormData();
  formData.append("ls", {
    uri: file,
    name: "laporan survei.pdf",
    type: "application/pdf",
  });

  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "multipart/form-data",
  };
  const body = formData;
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.PERLALIN_LAPORAN_SURVEI + "/" + id,
    headers: headers,
    data: body,
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
    data: data,
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
  andalalinRespone,  
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.HASIL_SURVEI_KEPUASAN_TERTENTU + "/" + periode ,
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

  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "multipart/form-data",
  };
  const body = formData;
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.PEMASANGAN_PERLALIN + "/" + id,
    headers: headers,
    data: body,
  });
  andalalinRespone(response);
};

export const andalalinGetAllPemasangan = async (
  accessToken,
  andalalinRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.GET_ALL_PEMASANGAN_PERLALIN,
    headers: headers,
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
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_TOLAK_PERMOHONAN + "/" + id + "/" + pertimbangan,
    headers: headers,
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
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.ANDALALIN_TUNDA_PERMOHONAN + "/" + id + "/" + pertimbangan,
    headers: headers,
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
