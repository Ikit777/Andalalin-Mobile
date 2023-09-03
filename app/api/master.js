import environments from "../constants/environments";

const { ENDPOINTS } = environments;

export const masterAndalalin = async (authRespone) => {
    const response = await fetch(ENDPOINTS.DATA_MASTER_ANDALALIN, {
      method: "GET",
    });
    authRespone(response);
  };