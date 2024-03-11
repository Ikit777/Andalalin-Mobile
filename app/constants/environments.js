import Constants from "expo-constants";

const status = Constants.expoConfig.extra.appStatus;
const url = Constants.expoConfig.extra.apiURL;

const environments = {
  DEVELOPMENT: {
    ENDPOINTS: {
      //Auth
      AUTH_REGISTER: url + "/v1/auth/register",
      AUTH_LOGIN: url + "/v1/auth/login",
      AUTH_LOGOUT: url + "/v1/auth/logout",
      AUTH_REFRESH_TOKEN: url + "/v1/auth/refresh",
      AUTH_VERIFICATION: url + "/v1/auth/verification",
      AUTH_RESEND_VERIFICATION: url + "/v1/auth/verification/resend",

      //Users
      AUTH_FORGOT_PASSWORD: url + "/v1/users/password/forgot",
      AUTH_RESET_PASSWORD: url + "/v1/users/password/reset",
      USER_ME: url + "/v1/users/me",
      USER_UPDATE_PHOTO: url + "/v1/users/edit/photo",
      USER_EDIT_AKUN: url + "/v1/users/edit/account",
      USER_NOTIFIKASI: url + "/v1/users/notification",
      USER_CLEAR_NOTIFIKASI: url + "/v1/users/notification/delete",
      USER_PETUGAS: url + "/v1/users/petugas",
      TAMBAH_USER: url + "/v1/users/add",
      GET_ALL_USER: url + "/v1/users/all",
      DELETE_USER: url + "/v1/users/delete",

      //Permohonan
      ANDALALIN_PENGAJUAN: url + "/v1/permohonan/pengajuan/andalalin",
      ANDALALIN_PENGAJUAN_PERLALIN: url + "/v1/permohonan/pengajuan/perlalin",
      ANDALALIN_GET_BY_ID: url + "/v1/permohonan/detail",
      ANDALALIN_GET_DOKUMEN: url + "/v1/permohonan/berkas",
      ANDALALIN_GET_BY_ID_USER: url + "/v1/permohonan/user",
      ANDALALIN_CHECK_ADMINISTRASI:
        url + "/v1/permohonan/persyaratan/andalalin/pemeriksaan",
      ANDALALIN_CHECK_ADMINISTRASI_PERLALIN:
        url + "/v1/permohonan/persyaratan/perlalin/pemeriksaan",
      ANDALALIN_UPLOAD_DOKUMEN: url + "/v1/permohonan/upload/dokumen",
      ANDALALIN_UPDATE_PERSYARATAN: url + "/v1/permohonan/berkas/update",
      ANDALALIN_PEMBUATAN_SURAT_PERNYATAAN:
        url + "/v1/permohonan/pembuatan/pernyataan",
      ANDALALIN_PEMBUATAN_SURAT_KEPUTUSAN:
        url + "/v1/permohonan/pembuatan/keputusan",
      ANDALALIN_PEMBUATAN_PENYUSUN_DOKUMEN:
        url + "/v1/permohonan/pembuatan/penyusun",
      ANDALALIN_PEMBUATAN_SURAT_PERMOHONAN:
        url + "/v1/permohonan/pembuatan/surat",
      ANDALALIN_TAMBAH_PETUGAS: url + "/v1/permohonan/survey/petugas/pilih",
      ANDALALIN_TOLAK_PERMOHONAN: url + "/v1/permohonan/tolak",
      ANDALALIN_TUNDA_PERMOHONAN: url + "/v1/permohonan/tunda",
      ANDALALIN_LANJUTKAN_PERMOHONAN: url + "/v1/permohonan/lanjutkan",
      ANDALALIN_GANTI_PETUGAS: url + "/v1/permohonan/survey/petugas/ganti",
      ANDALALIN_GET_BY_TIKET_LEVEL_2: url + "/v1/permohonan/petugas",
      ANDALALIN_PERBARUI_LOKASI: url + "/v1/permohonan/perbarui/lokasi",
      ANDALALIN_SURVEI_LAPANGAN: url + "/v1/permohonan/survey",
      ANDALALIN_GET_SURVEI_LAPANGAN: url + "/v1/permohonan/survey/detail",
      ANDALALIN_GET_ALL: url + "/v1/permohonan/all",
      ANDALALIN_GET_STATUS: url + "/v1/permohonan/status",
      ANDALALIN_SIMPAN_PEMERIKSAAN:
        url + "/v1/permohonan/pemeriksaan/keputusan",
      ANDALALIN_KESESUAIAN_SUBSTANSI_TEKNIS:
        url + "/v1/permohonan/pemeriksaan/substansi",
      ANDALALIN_CHECKLIST_KELENGKAPAN_AKHIR:
        url + "/v1/permohonan/pemeriksaan/kelengkapan",
      ANDALALIN_GET_PERLENGKAPAN: url + "/v1/permohonan/perlalin/perlengkapan",

      ANDALALIN_GET_ALL_BY_TIKET_LEVEL2: url + "/v1/permohonan/tiket/2",
      ANDALALIN_PEMERIKSAAN_DOKUMEN_ANDALALIN:
        url + "/v1/permohonan/pemeriksaan/dokumen",

      ANDALALIN_PENGECEKAN_PERLENGKAPAN:
        url + "/v1/permohonan/pengecekan/perlengkapan",
      ANDALALIN_TUNDA_PEMASANGAN: url + "/v1/permohonan/pemasangan/tunda",
      ANDALALIN_BATAL_PERMOHONAN: url + "/v1/permohonan/batal",
      ANDALALIN_LANJUTKAN_PEMASANGAN:
        url + "/v1/permohonan/pemasangan/lanjutkan",

      //Pemasangan perlalin
      GET_PERMOHONAN_PEMASANGAN_PERLALIN: url + "/v1/permohonan/pemasangan",
      PEMASANGAN_PERLALIN: url + "/v1/permohonan/pemasangan/pasang",
      GET_PEMASANGAN_PERLALIN: url + "/v1/permohonan/pemasangan/detail",

      //Survei kepuasan
      CEK_SURVEI_KEPUASAN: url + "/v1/survey/kepuasan/cek",
      SURVEI_KEPUASAN: url + "/v1/survey/kepuasan",
      HASIL_SURVEI_KEPUASAN: url + "/v1/survey/kepuasan/hasil",
      HASIL_SURVEI_KEPUASAN_TERTENTU: url + "/v1/survey/kepuasan/hasil/periode",

      //Survei mandiri
      SURVEI_MANDIRI: url + "/v1/survey/pengaduan",
      ALL_SURVEI_MANDIRI: url + "/v1/survey/pengaduan/daftar",
      DETAIL_SURVEI_MANDIRI: url + "/v1/survey/pengaduan/detail",
      PETUGAS_SURVEI_MANDIRI: url + "/v1/survey/pengaduan/daftar/petugas",
      TERIMA_SURVEI_MANDIRI: url + "/v1/survey/pengaduan/terima",

      //Master
      DATA_MASTER_ANDALALIN: url + "/v1/master/andalalin",
      DATA_MASTER_BY_TIPE: url + "/v1/master/tipe",

      TAMBAH_LOKASI_PENGAMBILAN: url + "/v1/master/tambah/lokasi",
      EDIT_LOKASI_PENGAMBILAN: url + "/v1/master/edit/lokasi",
      HAPUS_LOKASI_PENGAMBILAN: url + "/v1/master/hapus/lokasi",

      TAMBAH_KATEGORI: url + "/v1/master/tambah/kategori/rencana",
      EDIT_KATEGORI: url + "/v1/master/edit/kategori/rencana",
      HAPUS_KATEGORI: url + "/v1/master/hapus/kategori/rencana",

      TAMBAH_RENCANA_PEMBANGUNAN: url + "/v1/master/tambah/jenis/rencana",
      HAPUS_RENCANA_PEMBANGUNAN: url + "/v1/master/hapus/jenis/rencana",
      EDIT_RENCANA_PEMBANGUNAN: url + "/v1/master/edit/jenis/rencana",

      TAMBAH_KATEGORI_UTAMA_PERLALIN: url + "/v1/master/tambah/kategori/utama",
      HAPUS_KATEGORI_UTAMA_PERLALIN: url + "/v1/master/hapus/kategori/utama",
      EDIT_KATEGORI_UTAMA_PERLALIN: url + "/v1/master/edit/kategori/utama",

      TAMBAH_KATEGORI_PERLALIN: url + "/v1/master/tambah/kategori/perlengkapan",
      HAPUS_KATEGORI_PERLALIN: url + "/v1/master/hapus/kategori/perlengkapan",
      EDIT_KATEGORI_PERLALIN: url + "/v1/master/edit/kategori/perlengkapan",

      TAMBAH_PERLALIN: url + "/v1/master/tambah/jenis/perlengkapan",
      HAPUS_PERLALIN: url + "/v1/master/hapus/jenis/perlengkapan",
      EDIT_PERLALIN: url + "/v1/master/edit/jenis/perlengkapan",

      TAMBAH_PERSYARATAN_ANDALALIN:
        url + "/v1/master/tambah/persyaratan/andalalin",
      HAPUS_PERSYARATAN_ANDALALIN:
        url + "/v1/master/hapus/persyaratan/andalalin",
      EDIT_PERSYARATAN_ANDALALIN: url + "/v1/master/edit/persyaratan/andalalin",

      TAMBAH_PERSYARATAN_PERLALIN:
        url + "/v1/master/tambah/persyaratan/perlalin",
      HAPUS_PERSYARATAN_PERLALIN: url + "/v1/master/hapus/persyaratan/perlalin",
      EDIT_PERSYARATAN_PERLALIN: url + "/v1/master/edit/persyaratan/perlalin",

      TAMBAH_PROVINSI: url + "/v1/master/tambah/provinsi",
      HAPUS_PROVINSI: url + "/v1/master/hapus/provinsi",
      EDIT_PROVINSI: url + "/v1/master/edit/provinsi",

      TAMBAH_KABUPATEN: url + "/v1/master/tambah/kabupaten",
      HAPUS_KABUPATEN: url + "/v1/master/hapus/kabupaten",
      EDIT_KABUPATEN: url + "/v1/master/edit/kabupaten",

      TAMBAH_KECAMATAN: url + "/v1/master/tambah/kecamatan",
      HAPUS_KECAMATAN: url + "/v1/master/hapus/kecamatan",
      EDIT_KECAMATAN: url + "/v1/master/edit/kecamatan",

      TAMBAH_KELURAHAN: url + "/v1/master/tambah/kelurahan",
      HAPUS_KELURAHAN: url + "/v1/master/hapus/kelurahan",
      EDIT_KELURAHAN: url + "/v1/master/edit/kelurahan",

      TAMBAH_JENIS_PROYEK: url + "/v1/master/tambah/jenis/proyek",
      HAPUS_JENIS_PROYEK: url + "/v1/master/hapus/jenis/proyek",
      EDIT_JENIS_PROYEK: url + "/v1/master/edit/jenis/proyek",

      TAMBAH_JALAN: url + "/v1/master/tambah/jalan",
      HAPUS_JALAN: url + "/v1/master/hapus/jalan",
      EDIT_JALAN: url + "/v1/master/edit/jalan",

      TAMBAH_PANDUAN: url + "/v1/master/tambah/panduan",
      HAPUS_PANDUAN: url + "/v1/master/hapus/panduan",
      EDIT_PANDUAN: url + "/v1/master/edit/panduan",
      GET_PANDUAN: url + "/v1/master/get/panduan",

      //Cek
      CEK_SERVER: url + "/v1/healthchecker",
      CEK_MASTER: url + "/v1/master/check",
    },
  },
  STAGING: {
    ENDPOINTS: {
      //Auth
      AUTH_REGISTER: url + "/v1/auth/register",
      AUTH_LOGIN: url + "/v1/auth/login",
      AUTH_LOGOUT: url + "/v1/auth/logout",
      AUTH_REFRESH_TOKEN: url + "/v1/auth/refresh",
      AUTH_VERIFICATION: url + "/v1/auth/verification",
      AUTH_RESEND_VERIFICATION: url + "/v1/auth/verification/resend",

      //Users
      AUTH_FORGOT_PASSWORD: url + "/v1/users/password/forgot",
      AUTH_RESET_PASSWORD: url + "/v1/users/password/reset",
      USER_ME: url + "/v1/users/me",
      USER_UPDATE_PHOTO: url + "/v1/users/edit/photo",
      USER_EDIT_AKUN: url + "/v1/users/edit/account",
      USER_NOTIFIKASI: url + "/v1/users/notification",
      USER_CLEAR_NOTIFIKASI: url + "/v1/users/notification/delete",
      USER_PETUGAS: url + "/v1/users/petugas",
      TAMBAH_USER: url + "/v1/users/add",
      GET_ALL_USER: url + "/v1/users/all",
      DELETE_USER: url + "/v1/users/delete",

      //Permohonan
      ANDALALIN_PENGAJUAN: url + "/v1/permohonan/pengajuan/andalalin",
      ANDALALIN_PENGAJUAN_PERLALIN: url + "/v1/permohonan/pengajuan/perlalin",
      ANDALALIN_GET_BY_ID: url + "/v1/permohonan/detail",
      ANDALALIN_GET_DOKUMEN: url + "/v1/permohonan/berkas",
      ANDALALIN_GET_BY_ID_USER: url + "/v1/permohonan/user",
      ANDALALIN_CHECK_ADMINISTRASI:
        url + "/v1/permohonan/persyaratan/andalalin/pemeriksaan",
      ANDALALIN_CHECK_ADMINISTRASI_PERLALIN:
        url + "/v1/permohonan/persyaratan/perlalin/pemeriksaan",
      ANDALALIN_UPLOAD_DOKUMEN: url + "/v1/permohonan/upload/dokumen",
      ANDALALIN_UPDATE_PERSYARATAN: url + "/v1/permohonan/berkas/update",
      ANDALALIN_PEMBUATAN_SURAT_PERNYATAAN:
        url + "/v1/permohonan/pembuatan/pernyataan",
      ANDALALIN_PEMBUATAN_SURAT_KEPUTUSAN:
        url + "/v1/permohonan/pembuatan/keputusan",
      ANDALALIN_PEMBUATAN_PENYUSUN_DOKUMEN:
        url + "/v1/permohonan/pembuatan/penyusun",
      ANDALALIN_TAMBAH_PETUGAS: url + "/v1/permohonan/survey/petugas/pilih",
      ANDALALIN_TOLAK_PERMOHONAN: url + "/v1/permohonan/tolak",
      ANDALALIN_TUNDA_PERMOHONAN: url + "/v1/permohonan/tunda",
      ANDALALIN_LANJUTKAN_PERMOHONAN: url + "/v1/permohonan/lanjutkan",
      ANDALALIN_GANTI_PETUGAS: url + "/v1/permohonan/survey/petugas/ganti",
      ANDALALIN_GET_BY_TIKET_LEVEL_2: url + "/v1/permohonan/petugas",
      ANDALALIN_SURVEI_LAPANGAN: url + "/v1/permohonan/survey",
      ANDALALIN_GET_SURVEI_LAPANGAN: url + "/v1/permohonan/survey/detail",
      ANDALALIN_GET_ALL: url + "/v1/permohonan/all",
      ANDALALIN_GET_STATUS: url + "/v1/permohonan/status",
      ANDALALIN_SIMPAN_PEMERIKSAAN:
        url + "/v1/permohonan/pemeriksaan/keputusan",
      ANDALALIN_CHECKLIST_KELENGKAPAN_AKHIR:
        url + "/v1/permohonan/pemeriksaan/kelengkapan",
      ANDALALIN_GET_PERLENGKAPAN: url + "/v1/permohonan/perlalin/perlengkapan",

      ANDALALIN_GET_ALL_BY_TIKET_LEVEL2: url + "/v1/permohonan/tiket/2",
      ANDALALIN_PEMERIKSAAN_DOKUMEN_ANDALALIN:
        url + "/v1/permohonan/pemeriksaan/dokumen",

      ANDALALIN_PENGECEKAN_PERLENGKAPAN:
        url + "/v1/permohonan/pengecekan/perlengkapan",
      ANDALALIN_TUNDA_PEMASANGAN: url + "/v1/permohonan/pemasangan/tunda",
      ANDALALIN_BATAL_PERMOHONAN: url + "/v1/permohonan/pemasangan/batal",
      ANDALALIN_LANJUTKAN_PEMASANGAN:
        url + "/v1/permohonan/pemasangan/lanjutkan",

      //Pemasangan perlalin
      GET_PERMOHONAN_PEMASANGAN_PERLALIN: url + "/v1/permohonan/pemasangan",
      PEMASANGAN_PERLALIN: url + "/v1/permohonan/pemasangan/pasang",
      GET_PEMASANGAN_PERLALIN: url + "/v1/permohonan/pemasangan/detail",

      //Survei kepuasan
      CEK_SURVEI_KEPUASAN: url + "/v1/survey/kepuasan/cek",
      SURVEI_KEPUASAN: url + "/v1/survey/kepuasan",
      HASIL_SURVEI_KEPUASAN: url + "/v1/survey/kepuasan/hasil",
      HASIL_SURVEI_KEPUASAN_TERTENTU: url + "/v1/survey/kepuasan/hasil/periode",

      //Survei mandiri
      SURVEI_MANDIRI: url + "/v1/survey/pengaduan",
      ALL_SURVEI_MANDIRI: url + "/v1/survey/pengaduan/daftar",
      DETAIL_SURVEI_MANDIRI: url + "/v1/survey/pengaduan/detail",
      PETUGAS_SURVEI_MANDIRI: url + "/v1/survey/pengaduan/daftar/petugas",
      TERIMA_SURVEI_MANDIRI: url + "/v1/survey/pengaduan/terima",

      //Master
      DATA_MASTER_ANDALALIN: url + "/v1/master/andalalin",
      DATA_MASTER_BY_TIPE: url + "/v1/master/tipe",

      TAMBAH_LOKASI_PENGAMBILAN: url + "/v1/master/tambah/lokasi",
      EDIT_LOKASI_PENGAMBILAN: url + "/v1/master/edit/lokasi",
      HAPUS_LOKASI_PENGAMBILAN: url + "/v1/master/hapus/lokasi",

      TAMBAH_KATEGORI: url + "/v1/master/tambah/kategori/rencana",
      EDIT_KATEGORI: url + "/v1/master/edit/kategori/rencana",
      HAPUS_KATEGORI: url + "/v1/master/hapus/kategori/rencana",

      TAMBAH_RENCANA_PEMBANGUNAN: url + "/v1/master/tambah/jenis/rencana",
      HAPUS_RENCANA_PEMBANGUNAN: url + "/v1/master/hapus/jenis/rencana",
      EDIT_RENCANA_PEMBANGUNAN: url + "/v1/master/edit/jenis/rencana",

      TAMBAH_KATEGORI_UTAMA_PERLALIN: url + "/v1/master/tambah/kategori/utama",
      HAPUS_KATEGORI_UTAMA_PERLALIN: url + "/v1/master/hapus/kategori/utama",
      EDIT_KATEGORI_UTAMA_PERLALIN: url + "/v1/master/edit/kategori/utama",

      TAMBAH_KATEGORI_PERLALIN: url + "/v1/master/tambah/kategori/perlengkapan",
      HAPUS_KATEGORI_PERLALIN: url + "/v1/master/hapus/kategori/perlengkapan",
      EDIT_KATEGORI_PERLALIN: url + "/v1/master/edit/kategori/perlengkapan",

      TAMBAH_PERLALIN: url + "/v1/master/tambah/jenis/perlengkapan",
      HAPUS_PERLALIN: url + "/v1/master/hapus/jenis/perlengkapan",
      EDIT_PERLALIN: url + "/v1/master/edit/jenis/perlengkapan",

      TAMBAH_PERSYARATAN_ANDALALIN:
        url + "/v1/master/tambah/persyaratan/andalalin",
      HAPUS_PERSYARATAN_ANDALALIN:
        url + "/v1/master/hapus/persyaratan/andalalin",
      EDIT_PERSYARATAN_ANDALALIN: url + "/v1/master/edit/persyaratan/andalalin",

      TAMBAH_PERSYARATAN_PERLALIN:
        url + "/v1/master/tambah/persyaratan/perlalin",
      HAPUS_PERSYARATAN_PERLALIN: url + "/v1/master/hapus/persyaratan/perlalin",
      EDIT_PERSYARATAN_PERLALIN: url + "/v1/master/edit/persyaratan/perlalin",

      TAMBAH_PROVINSI: url + "/v1/master/tambah/provinsi",
      HAPUS_PROVINSI: url + "/v1/master/hapus/provinsi",
      EDIT_PROVINSI: url + "/v1/master/edit/provinsi",

      TAMBAH_KABUPATEN: url + "/v1/master/tambah/kabupaten",
      HAPUS_KABUPATEN: url + "/v1/master/hapus/kabupaten",
      EDIT_KABUPATEN: url + "/v1/master/edit/kabupaten",

      TAMBAH_KECAMATAN: url + "/v1/master/tambah/kecamatan",
      HAPUS_KECAMATAN: url + "/v1/master/hapus/kecamatan",
      EDIT_KECAMATAN: url + "/v1/master/edit/kecamatan",

      TAMBAH_KELURAHAN: url + "/v1/master/tambah/kelurahan",
      HAPUS_KELURAHAN: url + "/v1/master/hapus/kelurahan",
      EDIT_KELURAHAN: url + "/v1/master/edit/kelurahan",

      TAMBAH_JENIS_PROYEK: url + "/v1/master/tambah/jenis/proyek",
      HAPUS_JENIS_PROYEK: url + "/v1/master/hapus/jenis/proyek",
      EDIT_JENIS_PROYEK: url + "/v1/master/edit/jenis/proyek",

      TAMBAH_JALAN: url + "/v1/master/tambah/jalan",
      HAPUS_JALAN: url + "/v1/master/hapus/jalan",
      EDIT_JALAN: url + "/v1/master/edit/jalan",

      TAMBAH_PANDUAN: url + "/v1/master/tambah/panduan",
      HAPUS_PANDUAN: url + "/v1/master/hapus/panduan",
      EDIT_PANDUAN: url + "/v1/master/edit/panduan",
      GET_PANDUAN: url + "/v1/master/get/panduan",

      //Cek
      CEK_SERVER: url + "/v1/healthchecker",
      CEK_MASTER: url + "/v1/master/check",
    },
  },
  PRODUCTION: {
    ENDPOINTS: {
      //Auth
      AUTH_REGISTER: url + "/v1/auth/register",
      AUTH_LOGIN: url + "/v1/auth/login",
      AUTH_LOGOUT: url + "/v1/auth/logout",
      AUTH_REFRESH_TOKEN: url + "/v1/auth/refresh",
      AUTH_VERIFICATION: url + "/v1/auth/verification",
      AUTH_RESEND_VERIFICATION: url + "/v1/auth/verification/resend",

      //Users
      AUTH_FORGOT_PASSWORD: url + "/v1/users/password/forgot",
      AUTH_RESET_PASSWORD: url + "/v1/users/password/reset",
      USER_ME: url + "/v1/users/me",
      USER_UPDATE_PHOTO: url + "/v1/users/edit/photo",
      USER_EDIT_AKUN: url + "/v1/users/edit/account",
      USER_NOTIFIKASI: url + "/v1/users/notification",
      USER_CLEAR_NOTIFIKASI: url + "/v1/users/notification/delete",
      USER_PETUGAS: url + "/v1/users/petugas",
      TAMBAH_USER: url + "/v1/users/add",
      GET_ALL_USER: url + "/v1/users/all",
      DELETE_USER: url + "/v1/users/delete",

      //Permohonan
      ANDALALIN_PENGAJUAN: url + "/v1/permohonan/pengajuan/andalalin",
      ANDALALIN_PENGAJUAN_PERLALIN: url + "/v1/permohonan/pengajuan/perlalin",
      ANDALALIN_GET_BY_ID: url + "/v1/permohonan/detail",
      ANDALALIN_GET_DOKUMEN: url + "/v1/permohonan/berkas",
      ANDALALIN_GET_BY_ID_USER: url + "/v1/permohonan/user",
      ANDALALIN_CHECK_ADMINISTRASI:
        url + "/v1/permohonan/persyaratan/andalalin/pemeriksaan",
      ANDALALIN_CHECK_ADMINISTRASI_PERLALIN:
        url + "/v1/permohonan/persyaratan/perlalin/pemeriksaan",
      ANDALALIN_UPLOAD_DOKUMEN: url + "/v1/permohonan/upload/dokumen",
      ANDALALIN_UPDATE_PERSYARATAN: url + "/v1/permohonan/berkas/update",
      ANDALALIN_PEMBUATAN_SURAT_PERNYATAAN:
        url + "/v1/permohonan/pembuatan/pernyataan",
      ANDALALIN_PEMBUATAN_SURAT_KEPUTUSAN:
        url + "/v1/permohonan/pembuatan/keputusan",
      ANDALALIN_PEMBUATAN_PENYUSUN_DOKUMEN:
        url + "/v1/permohonan/pembuatan/penyusun",
      ANDALALIN_TAMBAH_PETUGAS: url + "/v1/permohonan/survey/petugas/pilih",
      ANDALALIN_TOLAK_PERMOHONAN: url + "/v1/permohonan/tolak",
      ANDALALIN_TUNDA_PERMOHONAN: url + "/v1/permohonan/tunda",
      ANDALALIN_LANJUTKAN_PERMOHONAN: url + "/v1/permohonan/lanjutkan",
      ANDALALIN_GANTI_PETUGAS: url + "/v1/permohonan/survey/petugas/ganti",
      ANDALALIN_GET_BY_TIKET_LEVEL_2: url + "/v1/permohonan/petugas",
      ANDALALIN_SURVEI_LAPANGAN: url + "/v1/permohonan/survey",
      ANDALALIN_GET_SURVEI_LAPANGAN: url + "/v1/permohonan/survey/detail",
      ANDALALIN_GET_ALL: url + "/v1/permohonan/all",
      ANDALALIN_GET_STATUS: url + "/v1/permohonan/status",
      ANDALALIN_SIMPAN_PEMERIKSAAN:
        url + "/v1/permohonan/pemeriksaan/keputusan",
      ANDALALIN_CHECKLIST_KELENGKAPAN_AKHIR:
        url + "/v1/permohonan/pemeriksaan/kelengkapan",
      ANDALALIN_GET_PERLENGKAPAN: url + "/v1/permohonan/perlalin/perlengkapan",

      ANDALALIN_GET_ALL_BY_TIKET_LEVEL2: url + "/v1/permohonan/tiket/2",
      ANDALALIN_PEMERIKSAAN_DOKUMEN_ANDALALIN:
        url + "/v1/permohonan/pemeriksaan/dokumen",

      ANDALALIN_PENGECEKAN_PERLENGKAPAN:
        url + "/v1/permohonan/pengecekan/perlengkapan",
      ANDALALIN_TUNDA_PEMASANGAN: url + "/v1/permohonan/pemasangan/tunda",
      ANDALALIN_BATAL_PERMOHONAN: url + "/v1/permohonan/pemasangan/batal",
      ANDALALIN_LANJUTKAN_PEMASANGAN:
        url + "/v1/permohonan/pemasangan/lanjutkan",

      //Pemasangan perlalin
      GET_PERMOHONAN_PEMASANGAN_PERLALIN: url + "/v1/permohonan/pemasangan",
      PEMASANGAN_PERLALIN: url + "/v1/permohonan/pemasangan/pasang",
      GET_PEMASANGAN_PERLALIN: url + "/v1/permohonan/pemasangan/detail",

      //Survei kepuasan
      CEK_SURVEI_KEPUASAN: url + "/v1/survey/kepuasan/cek",
      SURVEI_KEPUASAN: url + "/v1/survey/kepuasan",
      HASIL_SURVEI_KEPUASAN: url + "/v1/survey/kepuasan/hasil",
      HASIL_SURVEI_KEPUASAN_TERTENTU: url + "/v1/survey/kepuasan/hasil/periode",

      //Survei mandiri
      SURVEI_MANDIRI: url + "/v1/survey/pengaduan",
      ALL_SURVEI_MANDIRI: url + "/v1/survey/pengaduan/daftar",
      DETAIL_SURVEI_MANDIRI: url + "/v1/survey/pengaduan/detail",
      PETUGAS_SURVEI_MANDIRI: url + "/v1/survey/pengaduan/daftar/petugas",
      TERIMA_SURVEI_MANDIRI: url + "/v1/survey/pengaduan/terima",

      //Master
      DATA_MASTER_ANDALALIN: url + "/v1/master/andalalin",
      DATA_MASTER_BY_TIPE: url + "/v1/master/tipe",

      TAMBAH_LOKASI_PENGAMBILAN: url + "/v1/master/tambah/lokasi",
      EDIT_LOKASI_PENGAMBILAN: url + "/v1/master/edit/lokasi",
      HAPUS_LOKASI_PENGAMBILAN: url + "/v1/master/hapus/lokasi",

      TAMBAH_KATEGORI: url + "/v1/master/tambah/kategori/rencana",
      EDIT_KATEGORI: url + "/v1/master/edit/kategori/rencana",
      HAPUS_KATEGORI: url + "/v1/master/hapus/kategori/rencana",

      TAMBAH_RENCANA_PEMBANGUNAN: url + "/v1/master/tambah/jenis/rencana",
      HAPUS_RENCANA_PEMBANGUNAN: url + "/v1/master/hapus/jenis/rencana",
      EDIT_RENCANA_PEMBANGUNAN: url + "/v1/master/edit/jenis/rencana",

      TAMBAH_KATEGORI_UTAMA_PERLALIN: url + "/v1/master/tambah/kategori/utama",
      HAPUS_KATEGORI_UTAMA_PERLALIN: url + "/v1/master/hapus/kategori/utama",
      EDIT_KATEGORI_UTAMA_PERLALIN: url + "/v1/master/edit/kategori/utama",

      TAMBAH_KATEGORI_PERLALIN: url + "/v1/master/tambah/kategori/perlengkapan",
      HAPUS_KATEGORI_PERLALIN: url + "/v1/master/hapus/kategori/perlengkapan",
      EDIT_KATEGORI_PERLALIN: url + "/v1/master/edit/kategori/perlengkapan",

      TAMBAH_PERLALIN: url + "/v1/master/tambah/jenis/perlengkapan",
      HAPUS_PERLALIN: url + "/v1/master/hapus/jenis/perlengkapan",
      EDIT_PERLALIN: url + "/v1/master/edit/jenis/perlengkapan",

      TAMBAH_PERSYARATAN_ANDALALIN:
        url + "/v1/master/tambah/persyaratan/andalalin",
      HAPUS_PERSYARATAN_ANDALALIN:
        url + "/v1/master/hapus/persyaratan/andalalin",
      EDIT_PERSYARATAN_ANDALALIN: url + "/v1/master/edit/persyaratan/andalalin",

      TAMBAH_PERSYARATAN_PERLALIN:
        url + "/v1/master/tambah/persyaratan/perlalin",
      HAPUS_PERSYARATAN_PERLALIN: url + "/v1/master/hapus/persyaratan/perlalin",
      EDIT_PERSYARATAN_PERLALIN: url + "/v1/master/edit/persyaratan/perlalin",

      TAMBAH_PROVINSI: url + "/v1/master/tambah/provinsi",
      HAPUS_PROVINSI: url + "/v1/master/hapus/provinsi",
      EDIT_PROVINSI: url + "/v1/master/edit/provinsi",

      TAMBAH_KABUPATEN: url + "/v1/master/tambah/kabupaten",
      HAPUS_KABUPATEN: url + "/v1/master/hapus/kabupaten",
      EDIT_KABUPATEN: url + "/v1/master/edit/kabupaten",

      TAMBAH_KECAMATAN: url + "/v1/master/tambah/kecamatan",
      HAPUS_KECAMATAN: url + "/v1/master/hapus/kecamatan",
      EDIT_KECAMATAN: url + "/v1/master/edit/kecamatan",

      TAMBAH_KELURAHAN: url + "/v1/master/tambah/kelurahan",
      HAPUS_KELURAHAN: url + "/v1/master/hapus/kelurahan",
      EDIT_KELURAHAN: url + "/v1/master/edit/kelurahan",

      TAMBAH_JENIS_PROYEK: url + "/v1/master/tambah/jenis/proyek",
      HAPUS_JENIS_PROYEK: url + "/v1/master/hapus/jenis/proyek",
      EDIT_JENIS_PROYEK: url + "/v1/master/edit/jenis/proyek",

      TAMBAH_JALAN: url + "/v1/master/tambah/jalan",
      HAPUS_JALAN: url + "/v1/master/hapus/jalan",
      EDIT_JALAN: url + "/v1/master/edit/jalan",

      TAMBAH_PANDUAN: url + "/v1/master/tambah/panduan",
      HAPUS_PANDUAN: url + "/v1/master/hapus/panduan",
      EDIT_PANDUAN: url + "/v1/master/edit/panduan",
      GET_PANDUAN: url + "/v1/master/get/panduan",

      //Cek
      CEK_SERVER: url + "/v1/healthchecker",
      CEK_MASTER: url + "/v1/master/check",
    },
  },
};

export default { ...environments[status] };
