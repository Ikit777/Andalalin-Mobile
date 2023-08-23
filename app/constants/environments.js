const environments = {
  devepolment: {
    ENDPOINTS: {
      AUTH_REGISTER: "https://andalalin-development.up.railway.app/api/v1/auth/register",
      AUTH_LOGIN: "https://andalalin-development.up.railway.app/api/v1/auth/login",
      AUTH_LOGOUT: "https://andalalin-development.up.railway.app/api/v1/auth/logout",
      AUTH_REFRESH_TOKEN: "https://andalalin-development.up.railway.app/api/v1/auth/refresh",
      AUTH_VERIFICATION: "https://andalalin-development.up.railway.app/api/v1/auth/verification",
      AUTH_RESEND_VERIFICATION: "https://andalalin-development.up.railway.app/api/v1/auth/resend",
      AUTH_FORGOT_PASSWORD: "https://andalalin-development.up.railway.app/api/v1/users/forgotpassword",
      AUTH_RESET_PASSWORD: "https://andalalin-development.up.railway.app/api/v1/users/resetpassword",

      USER_UPDATE_PHOTO: "https://andalalin-development.up.railway.app/api/v1/users/updatephoto",
      USER_NOTIFIKASI: "https://andalalin-development.up.railway.app/api/v1/users/notifikasi",
      USER_CLEAR_NOTIFIKASI: "https://andalalin-development.up.railway.app/api/v1/users/clearnotifikasi",

      ANDALALIN_PENGAJUAN: "https://andalalin-development.up.railway.app/api/v1/andalalin/pengajuan",
      ANDALALIN_GET_BY_ID: "https://andalalin-development.up.railway.app/api/v1/andalalin/detailpermohonan",
      ANDALALIN_GET_BY_ID_USER: "https://andalalin-development.up.railway.app/api/v1/andalalin/userpermohonan",
      ANDALALIN_GET_BY_TIKET_LEVEL_1: "https://andalalin-development.up.railway.app/api/v1/andalalin/tiketpermohonan/Buka",
    },
  },
  staging: {},
  production: {},
};

const stage = "devepolment";

export default { ...environments[stage] };
