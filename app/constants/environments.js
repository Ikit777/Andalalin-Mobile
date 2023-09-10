import Constants from "expo-constants";

const status = Constants.expoConfig.extra.appStatus;
const url = Constants.expoConfig.extra.apiURL;

const environments = {
  DEVELOPMENT: {
    ENDPOINTS: {
      AUTH_REGISTER: url + "/api/v1/auth/register",
      AUTH_LOGIN: url + "/api/v1/auth/login",
      AUTH_LOGOUT: url + "/api/v1/auth/logout",
      AUTH_REFRESH_TOKEN: url + "/api/v1/auth/refresh",
      AUTH_VERIFICATION: url + "/api/v1/auth/verification",
      AUTH_RESEND_VERIFICATION: url + "/api/v1/auth/resend",
      AUTH_FORGOT_PASSWORD: url + "/api/v1/users/forgotpassword",
      AUTH_RESET_PASSWORD: url + "/api/v1/users/resetpassword",

      USER_ME: url + "/api/v1/users/me",
      USER_UPDATE_PHOTO: url + "/api/v1/users/updatephoto",
      USER_NOTIFIKASI: url + "/api/v1/users/notifikasi",
      USER_CLEAR_NOTIFIKASI: url + "/api/v1/users/clearnotifikasi",
      USER_PETUGAS: url + "/api/v1/users/petugas",
      USER_PETUGAS: url + "/api/v1/users/petugas",
      TAMBAH_USER: url + "/api/v1/users/add",
      GET_ALL_USER: url + "/api/v1/users/all",
      DELETE_USER: url + "/api/v1/users/delete",

      ANDALALIN_PENGAJUAN: url + "/api/v1/andalalin/pengajuan",
      ANDALALIN_GET_BY_ID: url + "/api/v1/andalalin/detailpermohonan",
      ANDALALIN_GET_BY_ID_USER: url + "/api/v1/andalalin/userpermohonan",
      ANDALALIN_GET_BY_TIKET_LEVEL_1: url + "/api/v1/andalalin/tiketpermohonan/Buka",
      ANDALALIN_PERSYARATAN_TERPENUHI: url + "/api/v1/andalalin/persyaratanterpenuhi",
      ANDALALIN_PERSYARATAN_TIDAK_SESUAI: url + "/api/v1/andalalin/persyaratantidaksesuai",
      ANDALALIN_UPDATE_PERSYARATAN: url + "/api/v1/andalalin/updatepersyaratan",
      ANDALALIN_TAMBAH_PETUGAS: url + "/api/v1/andalalin/pilihpetugas",
      ANDALALIN_GANTI_PETUGAS: url + "/api/v1/andalalin/gantipetugas",
      ANDALALIN_GET_BY_TIKET_LEVEL_2: url + "/api/v1/andalalin/petugaspermohonan",
      ANDALALIN_SURVEI_LAPANGAN: url + "/api/v1/andalalin/survey",
      ANDALALIN_GET_ALL_SURVEI_LAPANGAN: url + "/api/v1/andalalin/getallsurvey",
      ANDALALIN_GET_SURVEI_LAPANGAN: url + "/api/v1/andalalin/getsurvey",
      ANDALALIN_LAPORAN_BAP: url + "/api/v1/andalalin/bap",
      ANDALALIN_GET_ALL: url + "/api/v1/andalalin/permohonan",
      ANDALALIN_GET_STATUS: url + "/api/v1/andalalin/statuspermohonan",
      ANDALALIN_SIMPAN_PERSETUJUAN: url + "/api/v1/andalalin/persetujuan",
      ANDALALIN_SIMPAN_SK: url + "/api/v1/andalalin/sk",
      ANDALALIN_USULAN_TINDAKAN: url + "/api/v1/andalalin/usulantindakan",
      ANDALALIN_GET_USULAN_TINDAKAN: url + "/api/v1/andalalin/getusulantindakan",
      ANDALALIN_DETAIL_USULAN_TINDAKAN: url + "/api/v1/andalalin/getdetailusulan",
      ANDALALIN_TINDAKAN_USULAN: url + "/api/v1/andalalin/tindakanusulan",
      ANDALALIN_HAPUS_USULAN_TINDAKAN: url + "/api/v1/andalalin/hapususulan",
      ANDALALIN_GET_ALL_BY_TIKET_LEVEL2: url + "/api/v1/andalalin/getallandalalintiket",

      DATA_MASTER_ANDALALIN: url + "/api/v1/master/andalalin",
      TAMBAH_LOKASI_PENGAMBILAN: url + "/api/v1/master/tambahlokasi",
      EDIT_LOKASI_PENGAMBILAN: url + "/api/v1/master/editlokasi",
      HAPUS_LOKASI_PENGAMBILAN: url + "/api/v1/master/hapuslokasi",
      TAMBAH_KATEGORI: url + "/api/v1/master/tambahkategori",
      EDIT_KATEGORI: url + "/api/v1/master/editkategori",
      HAPUS_KATEGORI: url + "/api/v1/master/hapuskategori",
      TAMBAH_RENCANA_PEMBANGUNAN: url + "/api/v1/master/tambahpembangunan",
      HAPUS_RENCANA_PEMBANGUNAN: url + "/api/v1/master/hapuspembangunan",
      EDIT_RENCANA_PEMBANGUNAN: url + "/api/v1/master/editpembangunan",
    },
  },
  STAGING: {},
  PRODUCTION: {},
};

export default { ...environments[status] };
