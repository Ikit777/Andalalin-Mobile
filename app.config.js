module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      eas: {
        projectId: "2b044a40-5746-4ede-8008-ca66914cc9c6",
      },
      appStatus: process.env.APP_STATUS,
      apiURL: process.env.API_URL,
    },
    android: {
      package: "com.andalalin",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON, //"./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./app/assets/image/icon.png",
        backgroundColor: "#ffffff",
      },
      permissions: [
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.DOWNLOAD_WITHOUT_NOTIFICATION",
        "android.permission.ACCESS_NETWORK_STATE",
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.FOREGROUND_SERVICE",
      ],
    },
  };
};
