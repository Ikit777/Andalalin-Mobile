import environments from "../constants/environments";
import axiosInstance from "../utils/axiosInstance";

const { ENDPOINTS } = environments;

export const masterAndalalin = async (masterRespone) => {
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.DATA_MASTER_ANDALALIN,
  });
  masterRespone(response);
};

export const masterByTipe = async (tipe, masterRespone) => {
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.DATA_MASTER_BY_TIPE + "/" + tipe,
  });
  masterRespone(response);
};

export const checkMaster = async (masterRespone) => {
  const response = await axiosInstance({
    method: "get",
    url: ENDPOINTS.CEK_MASTER,
  });
  masterRespone(response);
};

export const masterTambahLokasiPengambilan = async (
  accessToken,
  id,
  lokasi,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    lokasi: lokasi,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.TAMBAH_LOKASI_PENGAMBILAN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterHapusLokasiPengambilan = async (
  accessToken,
  id,
  lokasi,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    lokasi: lokasi,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.HAPUS_LOKASI_PENGAMBILAN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterEditLokasiPengambilan = async (
  accessToken,
  id,
  lokasi,
  lokasi_baru,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    lokasi: lokasi,
    lokasi_edit: lokasi_baru,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.EDIT_LOKASI_PENGAMBILAN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterTambahKategori = async (
  accessToken,
  id,
  kategori,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kategori: kategori,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.TAMBAH_KATEGORI + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterHapusKategori = async (
  accessToken,
  id,
  kategori,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kategori: kategori,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.HAPUS_KATEGORI + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterEditKategori = async (
  accessToken,
  id,
  kategori,
  kategori_baru,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kategori: kategori,
    kategori_edit: kategori_baru,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.EDIT_KATEGORI + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterTambahRencanaPembangunan = async (
  accessToken,
  id,
  kategori,
  rencana,
  kriteria,
  satuan,
  terbilang,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kategori: kategori,
    jenis: rencana,
    kriteria: kriteria,
    satuan: satuan,
    terbilang: terbilang,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.TAMBAH_RENCANA_PEMBANGUNAN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterHapusRencanaPembangunan = async (
  accessToken,
  id,
  kategori,
  rencana,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kategori: kategori,
    jenis: rencana,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.HAPUS_RENCANA_PEMBANGUNAN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterEditRencanaPembangunan = async (
  accessToken,
  id,
  kategori,
  rencana,
  rencana_baru,
  kriteria,
  satuan,
  terbilang,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kategori: kategori,
    jenis: rencana,
    jenis_edit: rencana_baru,
    kriteria: kriteria,
    satuan: satuan,
    terbilang: terbilang,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.EDIT_RENCANA_PEMBANGUNAN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterTambahKategoriUtamaPerlalin = async (
  accessToken,
  id,
  kategori,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kategori: kategori,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.TAMBAH_KATEGORI_UTAMA_PERLALIN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterHapusKategoriUtamaPerlalin = async (
  accessToken,
  id,
  kategori,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kategori: kategori,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.HAPUS_KATEGORI_UTAMA_PERLALIN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterEditKategoriUtamaPerlalin = async (
  accessToken,
  id,
  kategori,
  kategori_baru,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kategori: kategori,
    kategori_edit: kategori_baru,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.EDIT_KATEGORI_UTAMA_PERLALIN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterTambahKategoriPerlalin = async (
  accessToken,
  id,
  kategori,
  kategori_utama,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kategori: kategori,
    kategori_utama: kategori_utama,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.TAMBAH_KATEGORI_PERLALIN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterHapusKategoriPerlalin = async (
  accessToken,
  id,
  kategori,
  kategori_utama,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kategori: kategori,
    kategori_utama: kategori_utama,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.HAPUS_KATEGORI_PERLALIN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterEditKategoriPerlalin = async (
  accessToken,
  id,
  kategori,
  kategori_utama,
  kategori_baru,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kategori: kategori,
    kategori_utama: kategori_utama,
    kategori_edit: kategori_baru,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.EDIT_KATEGORI_PERLALIN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterTambahPerlalin = async (
  accessToken,
  id,
  kategori,
  kategori_utama,
  perlengkapan,
  file,
  masterRespone
) => {
  const formData = new FormData();
  formData.append("perlengkapan", {
    uri: file,
    name: "perlengkapan.jpg",
    type: "image/jpeg",
  });
  const data = JSON.stringify({
    kategori: kategori,
    kategori_utama: kategori_utama,
    jenis: perlengkapan,
  });
  formData.append("data", data);
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "multipart/form-data",
  };
  const body = formData;
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.TAMBAH_PERLALIN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterHapusPerlalin = async (
  accessToken,
  id,
  kategori,
  kategori_utama,
  perlengkapan,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  }; 
  const body = JSON.stringify({
    kategori: kategori,
    kategori_utama: kategori_utama,
    jenis: perlengkapan,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.HAPUS_PERLALIN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterEditPerlalin = async (
  accessToken,
  id,
  kategori,
  kategori_utama,
  perlengkapan,
  newPerlengkapan,
  file,
  masterRespone
) => {
  const formData = new FormData();
  file != "Kosong"
    ? formData.append("perlengkapan", {
        uri: file,
        name: "perlengkapan.jpg",
        type: "image/jpeg",
      })
    : formData.append("perlengkapan");

  const data = JSON.stringify({
    kategori: kategori,
    kategori_utama: kategori_utama,
    jenis: perlengkapan,
    jenis_edit: newPerlengkapan,
  });
  formData.append("data", data);

  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "multipart/form-data",
  };
  const body = formData;
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.EDIT_PERLALIN + "/" + id,
    headers: headers,
    data: body,
  });
  
  masterRespone(response);
};

export const masterTambahPersyaratanAndalalin = async (
  accessToken,
  id,
  persyaratan,
  keterangan,
  bangkitan,
  kebutuhan,
  tipe,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    bangkitan: bangkitan,
    persyaratan: persyaratan,
    keterangan: keterangan,
    kebutuhan: kebutuhan,
    tipe: tipe,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.TAMBAH_PERSYARATAN_ANDALALIN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterHapusPersyaratanAndalalin = async (
  accessToken,
  id,
  persyaratan,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    persyaratan: persyaratan,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.HAPUS_PERSYARATAN_ANDALALIN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterEditPersyaratanAndalalin = async (
  accessToken,
  id,
  pilih,
  persyaratan,
  keterangan,
  bangkitan,
  kebutuhan,
  tipe,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    bangkitan: bangkitan,
    persyaratan: pilih,
    persyaratan_edit: persyaratan,
    keterangan: keterangan,
    kebutuhan: kebutuhan,
    tipe: tipe,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.EDIT_PERSYARATAN_ANDALALIN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterTambahPersyaratanPerlalin = async (
  accessToken,
  id,
  persyaratan,
  keterangan,
  kebutuhan,
  tipe,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    persyaratan: persyaratan,
    keterangan: keterangan,
    kebutuhan: kebutuhan,
    tipe: tipe,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.TAMBAH_PERSYARATAN_PERLALIN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterHapusPersyaratanPerlalin = async (
  accessToken,
  id,
  persyaratan,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    persyaratan: persyaratan,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.HAPUS_PERSYARATAN_PERLALIN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterEditPersyaratanPerlalin = async (
  accessToken,
  id,
  pilih,
  persyaratan,
  keterangan,
  kebutuhan,
  tipe,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    persyaratan: pilih,
    persyaratan_edit: persyaratan,
    keterangan: keterangan,
    kebutuhan: kebutuhan,
    tipe: tipe,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.EDIT_PERSYARATAN_PERLALIN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterTambahProvinsi = async (
  accessToken,
  id,
  provinsi,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    provinsi: provinsi,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.TAMBAH_PROVINSI + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterHapusProvinsi = async (
  accessToken,
  id,
  provinsi,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    provinsi: provinsi,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.HAPUS_PROVINSI + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterEditProvinsi = async (
  accessToken,
  id,
  provinsi,
  provinsi_baru,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    provinsi: provinsi,
    provinsi_edit: provinsi_baru,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.EDIT_PROVINSI + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterTambahKabupaten = async (
  accessToken,
  id,
  provinsi,
  kabupaten,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    provinsi: provinsi,
    kabupaten: kabupaten,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.TAMBAH_KABUPATEN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterHapusKabupaten = async (
  accessToken,
  id,
  kabupaten,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kabupaten: kabupaten,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.HAPUS_KABUPATEN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterEditKabupaten = async (
  accessToken,
  id,
  kabupaten,
  kabupaten_baru,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kabupaten: kabupaten,
    kabupaten_edit: kabupaten_baru,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.EDIT_KABUPATEN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterTambahKecamatan = async (
  accessToken,
  id,
  kabupaten,
  kecamatan,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kabupaten: kabupaten,
    kecamatan: kecamatan,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.TAMBAH_KECAMATAN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterHapusKecamatan = async (
  accessToken,
  id,
  kecamatan,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kecamatan: kecamatan,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.HAPUS_KECAMATAN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterEditKecamatan = async (
  accessToken,
  id,
  kecamatan,
  kecamatan_baru,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kecamatan: kecamatan,
    kecamatan_edit: kecamatan_baru,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.EDIT_KECAMATAN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterTambahKelurahan = async (
  accessToken,
  id,
  kecamatan,
  kelurahan,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kecamatan: kecamatan,
    kelurahan: kelurahan,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.TAMBAH_KELURAHAN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterHapusKelurahan = async (
  accessToken,
  id,
  kelurahan,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kelurahan: kelurahan,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.HAPUS_KELURAHAN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterEditKelurahan = async (
  accessToken,
  id,
  kelurahan,
  kelurahan_baru,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kelurahan: kelurahan,
    kelurahan_edit: kelurahan_baru,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.EDIT_KELURAHAN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterTambahJenisProyek = async (
  accessToken,
  id,
  proyek,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    jenis: proyek,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.TAMBAH_JENIS_PROYEK + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterHapusJenisProyek = async (
  accessToken,
  id,
  proyek,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    jenis: proyek,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.HAPUS_JENIS_PROYEK + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterEditJenisProyek = async (
  accessToken,
  id,
  proyek,
  proyek_baru,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    jenis: proyek,
    jenis_edit: proyek_baru,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.EDIT_JENIS_PROYEK + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterTambahJalan = async (
  accessToken,
  id,
  jalan,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kode_kecamatan: jalan.kode_kecamatan,
    kode_kelurahan: jalan.kode_kelurahan,
    kode_jalan: jalan.kode_jalan,
    nama: jalan.nama,
    pangkal: jalan.pangkal,
    ujung: jalan.ujung,
    kelurahan: jalan.kelurahan,
    kecamatan: jalan.kecamatan,
    panjang: jalan.panjang,
    lebar: jalan.lebar,
    permukaan: jalan.permukaan,
    fungsi: jalan.fungsi,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.TAMBAH_JALAN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterHapusJalan = async (
  accessToken,
  id,
  kode,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kode: kode,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.HAPUS_JALAN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterEditJalan = async (
  accessToken,
  id,
  kode,
  nama,
  jalan,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    kode: kode,
    jalan: nama,
    kode_kecamatan: jalan.kode_kecamatan,
    kode_kelurahan: jalan.kode_kelurahan,
    kode_jalan: jalan.kode_jalan,
    nama: jalan.nama,
    pangkal: jalan.pangkal,
    ujung: jalan.ujung,
    kelurahan: jalan.kelurahan,
    kecamatan: jalan.kecamatan,
    panjang: jalan.panjang,
    lebar: jalan.lebar,
    permukaan: jalan.permukaan,
    fungsi: jalan.fungsi,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.EDIT_JALAN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterTambahPanduan = async (
  accessToken,
  id,
  tipe,
  file,
  masterRespone
) => {
  const formData = new FormData();
  formData.append("panduan", {
    uri: file,
    name: "panduan.pdf",
    type: "application/pdf",
  });
  const data = JSON.stringify({
    tipe: tipe,
  });
  formData.append("data", data);
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "multipart/form-data",
  };
  const body = formData;
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.TAMBAH_PANDUAN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterHapusPanduan = async (
  accessToken,
  id,
  tipe,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    tipe: tipe,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.HAPUS_PANDUAN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterEditPanduan = async (
  accessToken,
  id,
  tipe,
  file,
  masterRespone
) => {
  const formData = new FormData();
  formData.append("panduan", {
    uri: file,
    name: "panduan.pdf",
    type: "application/pdf",
  });
  const data = JSON.stringify({
    tipe: tipe,
  });
  formData.append("data", data);
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "multipart/form-data",
  };
  const body = formData;
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.EDIT_PANDUAN + "/" + id,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};

export const masterGetPanduan = async (
  accessToken,
  tipe,
  masterRespone
) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    tipe: tipe,
  });
  const response = await axiosInstance({
    method: "post",
    url: ENDPOINTS.GET_PANDUAN,
    headers: headers,
    data: body,
  });
  masterRespone(response);
};