module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      eas: {
        projectId: "415722cd-73d6-4d47-93dc-aa14779aa554",
      },
      appStatus: process.env.APP_STATUS ?? "DEVELOPMENT",
      apiURL: process.env.API_URL ?? "https://app.infra.dewacloud.com",
    },
    android: {
      package: "com.andalalin",
      versionCode: 1,
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./app/assets/image/icon.png",
        backgroundColor: "#ffffff",
      },
      targetSdkVersion: "28",
      permissions: [
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.DOWNLOAD_WITHOUT_NOTIFICATION",
        "android.permission.ACCESS_NETWORK_STATE",
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.FOREGROUND_SERVICE",
        "NOTIFICATIONS",
      ],
    },
  };
};
